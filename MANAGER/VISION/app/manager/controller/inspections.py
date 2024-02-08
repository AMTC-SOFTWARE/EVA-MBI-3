from PyQt5.QtCore import QState, pyqtSignal, QObject
from paho.mqtt import publish
from threading import Timer
from cv2 import imread, imwrite
from copy import copy
import json
from time import sleep #para poder usar sleep()
from manager.controller import vision, height
#self.QState.assignProperty(self.button, 'text', 'Off')

class Inspections(QState):
    finished  = pyqtSignal()
    def __init__(self, model = None, ID = "1", parent = None):
        super().__init__(parent)
        self.model = model
        self.ID = ID
        self.v_module = "vision"+self.ID
        self.h_module = "height"+self.ID

        self.setup_robot        = SetRobot(model = self.model, parent = self)
        self.update_triggers    = UpdateTriggers(model = self.model, parent = self)
        self.waiting_home       = WaitingHome(model = self.model, parent = self)
        self.liberar_cajas      = LiberarCajas(model = self.model, parent = self)
        self.vision             = vision.Vision(module = self.v_module, model = self.model, parent = self)
        self.height             = height.Height(module = self.h_module, model = self.model, parent = self)
        self.wait_start         = WaitStart(model = self.model, parent = self)
        self.standby            = QState(parent = self)
        self.stop               = Stop(model = self.model, parent = self)

        #Estado inicial para esperar boton de start en la inspección
        self.wait_start.addTransition(self.model.transitions.start, self.setup_robot)
       
        self.setup_robot.addTransition(self.model.transitions.rbt_home, self.update_triggers)

        # --- if "position_reached" in payload["response"]: ---- self.rbt_pose.emit() --- 
        self.setup_robot.addTransition(self.model.transitions.rbt_home, self.update_triggers)

        #self.update_triggers.addTransition(self.model.transitions.start, self.setup_robot)
        self.setup_robot.addTransition(self.model.transitions.retry_btn, self.setup_robot)

        self.update_triggers.addTransition(self.model.transitions.clamp, self.update_triggers)
        self.update_triggers.addTransition(self.update_triggers.nok, self.standby)
        self.update_triggers.addTransition(self.update_triggers.ok, self.vision)

        self.standby.addTransition(self.model.transitions.clamp, self.wait_start)
        self.standby.addTransition(self.model.transitions.start, self.setup_robot)     
        ##con f96 sin instrumentar
        self.update_triggers.addTransition(self.update_triggers.F96_espera,self.wait_start)
        ##
        self.vision.addTransition(self.vision.retry, self.setup_robot)
        self.vision.addTransition(self.vision.finished, self.height)
        self.height.addTransition(self.height.retry, self.setup_robot)
        self.height.addTransition(self.height.finished, self.update_triggers)

        self.update_triggers.addTransition(self.update_triggers.esperar_robot_home,self.waiting_home)
        self.waiting_home.addTransition(self.model.transitions.rbt_home,self.liberar_cajas)
        self.liberar_cajas.addTransition(self.liberar_cajas.ok,self.update_triggers)

        self.update_triggers.finished.connect(self.finished.emit)
        self.setInitialState(self.wait_start)  


class Stop(QState):
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, QEvent):

        print("############################## ESTADO: Stop INSPECTIONS ############################")

        command = {
            "lbl_result" : {"text": "Robot en modo STOP", "color": "red"},
            "lbl_steps" : {"text": "Presiona START para continuar", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)



class WaitStart(QState):

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, QEvent):

        print("############################## ESTADO: WaitStart INSPECTIONS ############################")

        command = {
            "lbl_result" : {"text": ""},
            "lbl_steps" : {"text": "Presiona START para comenzar", "color": "green"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)


class SetRobot(QState):
    ok     =   pyqtSignal()
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model
    def onEntry(self, QEvent):

        print("############################## ESTADO: SetRobot INSPECTIONS ############################")

        command = {
            "lbl_result" : {"text": "Reiniciando robot", "color": "green"},
            "lbl_steps" : {"text": "Por favor espere", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        publish.single(self.model.pub_topics["robot"],json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
        
        sleep(1)
        publish.single(self.model.pub_topics["robot"],json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)

class WaitingHome(QState):
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, QEvent):

        print("############################## ESTADO: WaitingHome INSPECTIONS ############################")
        command = {
            "lbl_result" : {"text": "Enviando Robot a Home para liberar cajas", "color": "green"},
            "lbl_steps" : {"text": "Por favor espere", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)


class LiberarCajas(QState):
    ok     =   pyqtSignal()
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, QEvent):
        print("############################## ESTADO: LiberarCajas INSPECTIONS ############################")

        for box in self.model.cajas_a_desclampear:
            publish.single(self.model.pub_topics["plc"],json.dumps({box : False}),hostname='127.0.0.1', qos = 2)

        #se limpia la variable
        self.model.cajas_a_desclampear = []
        self.model.desclampear_ready = False
        self.ok.emit()


class UpdateTriggers(QState):
    ok          = pyqtSignal()
    finished    = pyqtSignal()
    nok         = pyqtSignal()
    esperar_robot_home = pyqtSignal()
    F96_espera  = pyqtSignal()
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, QEvent):

        print("############################## ESTADO: UpdateTriggers INSPECTIONS ############################")
        if self.model.desclampear_ready == True:
            command = {"trigger": "HOME"}
            publish.single(self.model.pub_topics["robot"], json.dumps(command), hostname='127.0.0.1', qos = 2)
            self.esperar_robot_home.emit()
            return
        if self.model.F96_pendiente and self.model.F96_clampeado==False:
            self.model.input_data["plc"]["clamps"].append("F96")
            self.model.F96_clampeado=True
            self.F96_espera.emit()
            return
        modularity = self.model.input_data["database"]["modularity"]
        clamps = self.model.input_data["plc"]["clamps"]
        if not(len (modularity)):
   ##################################### Reuslts doble check IN CONSTRUCTION ##########################
   ####################################################################################################
            Timer(0.05,self.finished.emit).start()
            return

         #revisar las llaves que tiene modularity (o sea las cajas)
        for j in modularity:
            #si la llave actual no está en el arreglo de clamps entonces... (o sea no es una caja válida)
            if not(j in clamps):
                #quitar del modelo los puntos de vision y altura de esa caja que no se encontró
                #none, si la llave está en el diccionario la remueve y retorna su valor, si no retorna un default
                #si la llave no está y el default no está definido manda error, entonces se usa un none para decir que no se encontró
                self.model.robot_data["v_queue"].pop(j, None)
                self.model.robot_data["h_queue"].pop(j, None)
        if len(clamps):
            for i in clamps:
                #si la caja está en las modularidades...
                if i in modularity:

                    print("v_triggers \n")
                    print(self.model.v_triggers[i])
                    ################################################################################################################
                    #al leer un arnés, se llena modularity con los fusibles asignados y se rellena con los demás fusibles vacios
                    #entonces siempre habrá una cavidad F96 pero no siempre llevará el fusible. Entonces cuando sea diferente de vacio...
                    #if self.model.modularity_fuses[self.model.pdcrvariant]["F96"] != "vacio":
                    #    print("F96 es diferente de vacio \n")
                    #    #si ya trae el trigger (porque un arnés anterior lo traía y se modificó el vector)
                    #    if "F96" in self.model.v_triggers[self.model.pdcrvariant]:
                    #        print("pass porque ya trae el trigger \n")
                    #        #no se agrega para evitar duplicados
                    #        pass
                    #    #si no trae el trigger, pero si hay un valor para F96, lo agregas al vector
                    #    else:
                    #        print("no trae trigger pero si hay F96, se agrega a la lista (append): \n")
                    #        
                    #        self.model.rv_triggers[self.model.pdcrvariant].append(self.model.rv_F96_trigger)
                    #        self.model.v_triggers[self.model.pdcrvariant].append(self.model.v_F96_trigger)
                    ##si no lleva el F96, asegurarse de que el vector no lleve este trigger por arneses anteriores
                    #else:
                    #    print("F96 es vacio \n")
                    #    if "F96" in self.model.v_triggers[self.model.pdcrvariant]:
                    #        print("F96 es vacio pero si está agegado el punto, se hace un pop: \n")
                    #        #self.model.rv_triggers[self.model.pdcrvariant].pop(self.model.rv_triggers[self.model.pdcrvariant].index("F96_pv1"))
                    #        self.model.rv_triggers[self.model.pdcrvariant].pop(-1)
                    #        #self.model.v_triggers[self.model.pdcrvariant].pop(self.model.v_triggers[self.model.pdcrvariant].index("F96"))
                    #        self.model.v_triggers[self.model.pdcrvariant].pop(-1)
                    ################################################################################################################

                    #aquí se modifica robot_data usando de base lo de rv_triggers y rh_triggers del modelo
                    self.model.robot_data["v_queue"][i] = copy(self.model.rv_triggers[i])
                    print(i)
                    if i=='PDC-P2':
                        self.model.robot_data["h_queue"][i]=[]
                    else:
                       self.model.robot_data["h_queue"][i] = copy(self.model.rh_triggers[i])

                    print("self.model.robot_data[v_queue]-------",self.model.robot_data["v_queue"])
                    print("self.model.robot_data[v_queue][i]",self.model.robot_data["v_queue"][i])

                    command = {
                        "lbl_result" : {"text": "Inspección en " + i + " preparada", "color": "green"},
                        "lbl_steps" : {"text": "Por favor espere", "color": "black"},
                        "img_center" : "boxes/" + i + ".jpg"
                        }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    #self.model.tries[i] += 1
                     # self.model.robot_data Sale listo y recién horneado de aquí 
                    self.ok.emit()
                    break
                else:
                    clamps.pop(clamps.index(i))
                    command = {
                        "lbl_result" : {"text": ""},
                        "lbl_steps" : {"text": "Coloca la siguiente caja en los nidos", "color": "black"}
                        }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    Timer(0.05, self.model.robot.home).start()
                    self.nok.emit()
                    break
        else:
            command = {
                "lbl_result" : {"text": ""},
                "lbl_steps" : {"text": "Coloca la siguiente caja en los nidos", "color": "black"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            Timer(0.05, self.model.robot.home).start()
            self.nok.emit()

