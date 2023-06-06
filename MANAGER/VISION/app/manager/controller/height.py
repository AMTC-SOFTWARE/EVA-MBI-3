from PyQt5.QtCore import QState, pyqtSignal
from cv2 import imwrite, imread
from paho.mqtt import publish
from threading import Timer
from shutil import copyfile
from time import strftime
from copy import copy
from math import ceil
import threading
import json
from time import sleep #para poder usar sleep()

class Height (QState):
    retry       = pyqtSignal()
    finished    = pyqtSignal()

    def __init__(self, module = "height1", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

        self.process    = Process(module = self.module, model = self.model, parent = self)
        self.error      = Error(module = self.module, model = self.model, parent = self)
        self.standby    = QState(self)

        self.process.addTransition(self.process.nok, self.error)
        self.error.addTransition(self.model.transitions.retry_btn, self.standby)

        self.standby.entered.connect(self.retry.emit)
        self.process.finished.connect(self.finished)
        self.setInitialState(self.process)


class Process (QState):
    nok         = pyqtSignal()
    finished    = pyqtSignal()

    def __init__(self, module = "height1", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

        self.pose       = Pose(self.module, self.model, self)
        self.triggers   = Triggers( module = self.module, model = self.model, parent = self)
        self.receiver   = Receiver( module = self.module, model = self.model, parent = self)
        self.stop       = Stop(module = self.module, model = self.model, parent = self)
        
        
        self.pose.addTransition(self.model.transitions.rbt_pose, self.triggers)
        #triggers.finished se emite cuando ya se terminó toda la cola de secciones correctamente
        self.triggers.addTransition(self.triggers.finished, self.pose)

        #height.emit() se hace como respuesta cuando se reciven los resultados del sensor de altura
        self.triggers.addTransition(self.model.transitions.height, self.receiver)

        #señal de la bandera de una mala comunicación con sensor de altura habilita señal retry
        self.triggers.addTransition(self.triggers.retry, self.triggers)

        self.receiver.addTransition(self.receiver.ok, self.triggers)
        self.addTransition(self.model.transitions.rbt_stop, self.stop)
        self.stop.addTransition(self.model.transitions.start, self.pose)

        self.triggers.nok.connect(self.nok)
        self.pose.nok.connect(self.nok)
        self.pose.finished.connect(self.finished.emit)
        self.setInitialState(self.pose)    


class Stop(QState):
    def __init__(self, module = "height1", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):

        print("############################## ESTADO: Stop HEIGHT ############################")

        command = {
            "lbl_result" : {"text": "Robot en modo STOP", "color": "red"},
            "lbl_steps" : {"text": "Presiona START para continuar", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

    def onExit(self, QEvent):
        self.model.height_data[self.module]["box"] = ""
        self.model.height_data[self.module]["queue"].clear()
        self.model.height_data[self.module]["current_trig"] = None
        self.model.height_data[self.module]["results"].clear()
        self.model.height_data[self.module]["rqst"] = None


class Triggers (QState):
    finished    = pyqtSignal()
    nok         = pyqtSignal()
    retry       = pyqtSignal()
    

    def __init__(self, module = "height1", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module
        self.pub_topic = self.model.pub_topics["height"]
        self.queue = self.model.height_data[self.module]["queue"]
        self.BB = self.model.fuses_BB

    def onEntry(self, event):

        print("############################## ESTADO: Triggers HEIGHT ############################")
        #se llama al método triggers de la clase Triggers
        self.triggers()

    def triggers(self):

        #reiniciar variable para monitorear respuesta de sensor de altura
        self.model.height_trigger = False

        # si hay cola de secciones a revisar (esta cola de "secciones de inspección de fusibles" se genera desde las modularidades)
        if len(self.queue) > 0:
            #se iguala la variable model.height_data["height1"]["current_trig"] a la sección de la cola
            self.model.height_data[self.module]["current_trig"] = self.queue[0]
            print("model.height_data[height1][current_trig]: ",self.queue[0])
        else:
            #si no hay más secciones se accede al método finish
            self.finish()
            return
        command = {
                    "trigger": self.model.height_data[self.module]["current_trig"]
                    }
        #se manda mensaje {"trigger": model.height_data["height1"]["current_trig"] }, esto es: {"trigger": "R5"}
        #pub_topic viene de ...self.model.pub_topics["height"].. que es: LaserSensor/3

        #se hace trigger de sensor de altura
        publish.single(self.pub_topic, json.dumps(command), hostname='127.0.0.1', qos = 2)
        
        #codigo para hacer una segunda petición de trigger para comenzar medición
        Timer(2.5,self.second_attempt).start()

        self.model.height_data["rqst"] = True #CREEMOS QUE SE HACE TRUE PARA EL BYPASSEADO
        self.model.fuses_parser["box"] = self.model.height_data[self.module]["box"]

        print("esperando respuesta de sensor de altura")

        #se manda señal de reintento en 18 segundos
        self.model.tiempo = threading.Timer(18,self.retry.emit)
        self.model.tiempo.start()
            
    def second_attempt (self):

        print("second attempt para: ",self.model.height_data[self.module]["current_trig"])
        command = {"trigger": self.model.height_data[self.module]["current_trig"]}
        publish.single(self.pub_topic, json.dumps(command), hostname='127.0.0.1', qos = 2)


    #A ESTE MÉTODO SOLO SE ACCEDE SI YA SE REVISARON TODAS LAS SECCIONES DE INSPECCIÓN DE ALTURAS
    #SOLO SE HABILITAN LAS SECCIONES QUE EXISTEN PARA LAS CAJAS QUE LLEVA EL ARNÉS CONSTRUIDO
    def finish (self):

        #se reinicia la variable que guarda expected_fuses
        self.model.expected_fuses = "\tLectura\n"
        #se guarda la sección de inspección de fusibles actual
        current_trig = self.model.height_data[self.module]["current_trig"]
        #copia de los resultados de la inspección de esa sección
        results = self.model.height_data[self.module]["results"]
        #copia de imagen
        img = self.model.height_data["img"]
        error = False
        #copia de la caja que se está inspeccionando
        box = self.model.height_data[self.module]["box"]

        if box in self.model.modularity_fuses:
            for fuse in self.model.modularity_fuses[box]:
                #height_d es una copia elemento a elemento de la base de datos que te indica si hay fusible o no
                height_d = [True] if self.model.modularity_fuses[box][fuse] != "vacio" else [False]

                #revisando si el fusible está en los resultados del sensor de altura (si está en esta sección de inspección)
                if fuse in results[box]:
                    print(f"Box: {box} Fuse: {fuse}")
                    print("results (Leído): ",results[box][fuse])
                    print("Height_d (Esperado): ",height_d)

                    #se guarda el nombre de la caja y el nombre del fusible para poderlo modificar en bounding box
                    temp = [box, fuse]

                    #si el resultado de la inspección (true/false) == true/false (dependiendo de si debe llevar o no fusible)
                    if results[box][fuse] == height_d:
                        #si es lo que debe ser, se pinta verde
                        img = self.model.drawBB(img = img, BB = temp, color = (0, 255, 0))
                        self.model.h_result[box][fuse] = self.model.modularity_fuses[box][fuse]
                    else:
                        error = True
                        img = self.model.drawBB(img = img, BB = temp, color = (0, 0, 255))
                        self.model.h_result[box][fuse] = not(height_d)
                        self.model.expected_fuses = self.model.expected_fuses + str(fuse) + ":\tALTURA NOK\n"
                        print("||||||||||Cavidad en la que hubo error: ",fuse, " Caja: ",box)
                        print("Modelo: ",self.model.tries)
                        if fuse in self.model.tries["ALTURA"][box]:
                            self.model.tries["ALTURA"][box][fuse] += 1
                        else:
                            self.model.tries["ALTURA"][box][fuse] = 1
                        print("Modelo Final: ",self.model.tries)

        imwrite(self.model.imgs_path + self.module + ".jpg", img)


        print("\nINSPECTION:", results[box])
        print("MASTER    :", self.model.modularity_fuses[box], "\n")

        if error == False:
            command = {
                "img_center" : self.module + ".jpg"
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.model.height_data[self.module]["results"].clear()
            self.model.robot_data["h_queue"][box].pop(self.model.robot_data["h_queue"][box].index(self.model.robot_data["current_trig"]))
            self.model.height_data[self.module]["current_trig"] = None
            Timer(1,self.finished.emit).start()
        else:
            command = {
                "img_center" : self.module + ".jpg",
                "lbl_info1" : {"text": f"{self.model.expected_fuses}", "color": "blue"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.nok.emit()


class Receiver (QState):
    ok      = pyqtSignal()
    #nok     = pyqtSignal()

    def __init__(self, module = "module1", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module
        self.queue = self.model.height_data[self.module]["queue"]
        self.pub_topic = self.model.pub_topics["height"]
        self.epoches = self.model.height_data[self.module]["epoches"]
        self.thresh = ceil(self.epoches/2)
        self.epoch_cnt = 0
        self.score = 0
        

    def onEntry(self, event):

        print("############################## ESTADO: Receiver HEIGHT ############################")

        self.model.tiempo.cancel()

        try:
            #bypass:::::::::
            #if not(self.model.height_data["rqst"]):
            #    self.ok.emit()
            #    return

            #variable para saber si algún fusible de esa sección tiene al menos una altura NOK
            ok = True

            #sección actual de inspección de fusibles se guarda en trigger
            trigger = self.model.height_data[self.module]["current_trig"]
            #se hace una copia de los resultados que se han estado generando (donde ya vienen las cajas con fusibles y true o false correspondientes)
            results = self.model.height_data[self.module]["results"]
            #caja actual que se está inspeccionando
            box = self.model.height_data[self.module]["box"]

            if not(box in results):
                #si no tienes registro de esa caja, creas un espacio dentro de la variable resultados para las inspecciones de esa caja
                results[box] = {}

            #self.model.input_data["height"] contiene la lectura actual del sensor de altura para la seccion de inspección actual
            for item in self.model.input_data["height"]:
                if not(item in results[box]):
                    #si no hay registro de un fusible "x" para esa caja, se genera el espacio de variable
                    results[box][item] = []
                #posteriormente agregas el fusible con su correspondiente resultado
                results[box][item].append(self.model.input_data["height"][item])
                
                #si el resultado del fusible es falso...
                if item == False:
                    #tu variable para inspección ok, se hace false
                    ok = False
            
            #se retira el trigger de la cola una vez que se hizo correctamente
            self.queue.pop(self.queue.index(trigger))

            #se guardan los resultados de inspección ya actualizados con las correspondientes inspecciones nuevas agregadas
            self.model.height_data[self.module]["results"] = results

            self.model.height_data[self.module]["rqst"] = False

            #se emite el ok de inspección
            self.ok.emit()

        except Exception as ex:
            print("Height.Receiver exception: ", ex)
            self.ok.emit()


class Error (QState):
    ok      = pyqtSignal()
    nok     = pyqtSignal()

    def __init__(self, module = "height1", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, event):

        print("############################## ESTADO: Error HEIGHT ############################")

        box = self.model.height_data[self.module]["box"]
        command = {
            "lbl_result" : {"text": f"{box} alturas NOK", "color": "red"},
            "lbl_steps" : {"text": "Presiona el boton de reintento", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        self.model.height_data[self.module]["box"] = ""
        self.model.height_data[self.module]["queue"].clear()
        self.model.height_data[self.module]["current_trig"] = None
        self.model.height_data[self.module]["results"].clear()
        self.model.height_data[self.module]["rqst"] = None
        self.model.robot.home()

    def onExit(self, QEvent):
        command = {
            "lbl_result" : {"text": "Reintentando inspección de alturas", "color": "green"},
            "lbl_steps" : {"text": "Espera el resultado", "color": "black"},
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)


class Pose(QState):
    finished    = pyqtSignal()
    nok         = pyqtSignal()

    def __init__(self, module = "height1", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module
        self.queue = self.model.robot_data["h_queue"]
        self.pub_topic = self.model.pub_topics["robot"]

    def onEntry(self, QEvent):

        print("############################## ESTADO: Pose HEIGHT ############################")

        #se borran los errores en pantalla de alturas
        command = {"lbl_info1" : {"text": "", "color": "blue"}}
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        box = list(self.queue)[0]
        if not(box in self.model.input_data["plc"]["clamps"]):
            self.model.height_data[self.module]["box"] = box
            self.nok.emit()
            return
        if len(self.queue[box]) > 0:
            current_trig = self.queue[box][0]
            self.model.robot_data["current_trig"] = current_trig
            if box != self.model.height_data[self.module]["box"]:
                self.model.height_data["img"] = imread(self.model.imgs_path + "boxes/" + box + ".jpg")
                command = {
                    "lbl_result" : {"text": "Procesando alturas en " +box, "color": "green"},
                    "lbl_steps" : {"text": "Por favor espere", "color": "black"},
                    "img_center" : "boxes/" + box + ".jpg"
                    }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            #aquí guardas la caja a inspeccionar en height_data
            self.model.height_data[self.module]["box"] = box
            self.model.height_data[self.module]["queue"].append(self.model.h_triggers[box][self.model.rh_triggers[box].index(current_trig)])
        else:
            command = {
                "lbl_result" : {"text": "Caja " + box + " Terminada", "color": "green"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            clamps = self.model.input_data["plc"]["clamps"]
             #se elimina de las cajas clampeadas actualmente
            clamps.pop(clamps.index(box))
            
            #se guardan las cajas terminadas actuales en una variable para posteriormente desclampearlas cuando el robot esté en home
            self.model.cajas_a_desclampear.append(box)

            #si ya no le quedan cajas por inspeccionar de las que se clampearon
            if len(clamps) == 0:
                self.model.desclampear_ready = True

            #se elimina de todas las tareas
            self.model.input_data["database"]["modularity"].pop(box)
            self.model.height_data[self.module]["box"] = ""
            
            self.queue.clear()
            self.finished.emit()
            return
        self.model.robot.setPose(current_trig)
