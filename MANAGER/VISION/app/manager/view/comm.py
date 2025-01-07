
from PyQt5.QtCore import QObject, pyqtSignal, QTimer
from paho.mqtt.client import Client
from threading import Timer
from copy import copy
import json

class MqttClient (QObject):
    
    conn_ok     =   pyqtSignal()
    conn_nok    =   pyqtSignal()
    clamp       =   pyqtSignal()
    emergency   =   pyqtSignal()
    recovery    =   pyqtSignal()
    key         =   pyqtSignal()
    zone        =   pyqtSignal()
    retry_btn   =   pyqtSignal()
    torque      =   pyqtSignal()
    login       =   pyqtSignal()
    logout      =   pyqtSignal()
    config      =   pyqtSignal()
    config_ok   =   pyqtSignal()
    ID          =   pyqtSignal()
    code        =   pyqtSignal()
    visible     =   pyqtSignal()
    qr_box      =   pyqtSignal(str)
    rbt_init    =   pyqtSignal()
    rbt_pose    =   pyqtSignal()
    rbt_stop    =   pyqtSignal()
    rbt_home    =   pyqtSignal()
    vision      =   pyqtSignal()
    height      =   pyqtSignal()
    start       =   pyqtSignal()
    
    #error_cortina   =   pyqtSignal()

    nido_PDCDB = ""
    nido_PDCD = ""
    nido_PDCP = ""
    nido_PDCR = ""
    nido_PDCS = ""
    nido_TBLU = ""
    nido_PDCP2= ""
    nido_F96= ""
    nido_MFBP2 = ""
    nido_MFBP1 = ""
    nido_MFBS = ""
    nido_MFBE = ""

    color_PDCDB = "blue"
    color_PDCD = "blue"
    color_PDCP = "blue"
    color_PDCR = "blue"
    color_PDCS = "blue"
    color_TBLU = "blue"
    color_PDCP2 = "blue"
    color_F96 = "blue"
    color_MFBP2 = "blue"
    color_MFBP1 = "blue"
    color_MFBS  = "blue"
    color_MFBE  = "blue"

    puertaA = ""
    puertaB = ""
    puertaC = ""

    cortina = ""

    plural = ""
    plural2 = ""

    modbusIO = ""
    modbusRA = ""
    modbusRB = ""

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.client = Client()
        #QTimer.singleShot(100, self.setup)

    def setup(self):
        try:
            self.client.on_connect = self.on_connect
            self.client.on_message = self.on_message
            self.client.connect(host = "127.0.0.1", port = 1883, keepalive = 60)
            self.client.loop_start()
        except Exception as ex:
            print("Manager MQTT client connection fail. Exception: ", ex)

    def stop (self):
        self.client.loop_stop()
        self.client.disconnect()
        
    def reset (self):
        self.stop()
        self.setup()

    def on_connect(self, client, userdata, flags, rc):
        try:
            connections = {
               "correct": True,
               "fails": "" 
               }
            for topic in self.model.sub_topics:
                client.subscribe(self.model.sub_topics[topic])
                if rc == 0:
                    print(f"Manager MQTT client connected to {topic} with code [{rc}]")
                else:
                    connections["correct"] = False
                    connection["fails"] += topic + "\n"
                    print("Manager MQTT client connection to " + topic + " fail, code [{}]".format(rc))
            if connections["correct"] == True:
               self.conn_ok.emit()
            else:
                print("Manager MQTT client connections fail:\n" + connection["fails"])
                self.conn_nok.emit()
        except Exception as ex:
            print("Manager MQTT client connection fail. Exception: ", ex)
            self.conn_nok.emit()


    def start_robot(self):

        self.client.publish(self.model.pub_topics["robot"], json.dumps({"command": "start"}), qos = 2)

    def on_message(self, client, userdata, message):
        try:
            payload = json.loads(message.payload)
            if "Panel-RedLight" in payload or "encoder" in payload:
                return

            print ("   " + message.topic + " ", payload) 

            if message.topic == self.model.sub_topics["plc"]:
                if "emergency" in payload:
                    self.model.input_data["plc"]["emergency"] = payload["emergency"]
                    if payload["emergency"] == False:
                        self.emergency.emit()
                        command = {
                            "popOut":"PARO DE EMERGENCIA ACTIVADO"
                            }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                        self.client.publish(self.model.pub_topics["plc"], json.dumps({"Flash": False}), qos = 2)
                        self.model.robot_data["stop"] = True
                    else:
                        #QTimer.singleShot(1000, self.closePopout)
                        self.closePopout()
                        self.recovery.emit()

            if self.model.input_data["plc"]["emergency"] == False:
                return

            if message.topic == self.model.sub_topics["plc"]:
                
                for i in list(payload):
                    #Mensaje de respuesta de cajas clampeadas correctamente (enviado desde GDI)
                    if "clamp_" in i:
                        box = i[6:]
                        if box == "PDC-R" and "PDC-RMID" in self.model.input_data["database"]["modularity"]:
                            box = "PDC-RMID"
                        ########################################################## PDC-RS
                        elif box == "PDC-R" and "PDC-RS" in self.model.input_data["database"]["modularity"]:
                            box = "PDC-RS"
                        ########################################################## PDC-RS
                        if payload[i] == True:
                            if not(box in self.model.input_data["plc"]["clamps"]):
                                print("box: ",box)
                                modularity = self.model.input_data["database"]["modularity"]

                                #si el mensaje de la caja clampeada aparece en las cajas de tareas pendientes del arnés (modularity), se agrega a clamps
                                if box in modularity:

                                    self.model.input_data["plc"]["clamps"].append(box)

                                    # AGREGAR CODIGO PARA ORDENAR CAJAS CLAMPEADAS, primero PDCR, luego PDCS, luego TBLU, luego PDCD, y PDCP al final
                                    # si es que las lleva en ese momento (de lo que se ha clampeado antes de dar start)
                                    
                                    print("se agrega box a clamps, self.clamp.emit")
                                    self.clamp.emit()

                                else:
                                    print("box ya no está en modularity, no se agrega a clamps")
                                    print("modularity: ", modularity)
                        else:
                            #Si clamp_box == False
                            if box in self.model.input_data["plc"]["clamps"]:
                                self.model.input_data["plc"]["clamps"].pop(self.model.input_data["plc"]["clamps"].index(box))
                                
                        if len(self.model.input_data["database"]["modularity"]) > 0:
                            
                            print("Cajas con TAREAS pendientes",self.model.input_data["database"]["modularity"])
                            
                            if len(self.model.input_data["plc"]["clamps"]) > 0:
                                print("revisión de cajas restantes desde comm.py, aún hay cajas puestas en input_data[PLC][clamps]")
                                
                                if self.model.retry_btn_status == False:
                                    command = { "lbl_steps" : {"text": "Presiona START para comenzar", "color": "green"}}
                                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                                else:
                                    command = { "lbl_steps" : {"text": "Presiona el boton de reintento", "color": "black"}}
                                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                            else:
                                print("revisión de cajas restantes desde comm.py, NO hay cajas puestas en input_data[PLC][clamps]")
                                command = { "lbl_steps" : {"text": "Coloca las cajas en los nidos para continuar", "color": "navy"}}
                                self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                               

                if "Candado_PDCS" in payload:
                    if payload["Candado_PDCS"] == True:
                        command = {
                                "lbl_result" : {"text": "Conector de PDC-S NOK", "color": "red"},
                                "lbl_steps" : {"text": "Coloca el Conector de la caja PDC-S", "color": "red"}
                              }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                    else:
                        command = {
                                "lbl_result" : {"text": "", "color": "red"},
                                "lbl_steps" : {"text": "", "color": "red"}
                              }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                
                if "key" in payload:
                    if payload["key"] == True:
                        if self.model.disable_key == False:
                            self.key.emit()
                        else:
                            print("llave deshabilitada, llame a un supervisor de calidad o un AMTC")
                        
                if "encoder" in payload and "name" in payload and "value" in payload:
                    encoder = "encoder_" + str(payload["encoder"])
                    if not(payload["value"]):
                        payload["name"] = payload["name"][:payload["name"].find(":") + 1] + '"0"}'
                    if self.model.input_data["plc"][encoder]["zone"] != payload["name"]:
                        self.model.input_data["plc"][encoder]["zone"] = payload["name"]
                        self.zone.emit() 

                if "retry_btn" in payload:
                    self.model.input_data["plc"]["retry_btn"] = bool(payload["retry_btn"])
                    if payload["retry_btn"] == True:
                         
                        if self.model.waiting_home == True:
                            print("reenviando a home por self.model.waiting_home = True")
                            self.client.publish(self.model.pub_topics["robot"], json.dumps({"command": "stop"}), qos = 2)
                            Timer(0.8, self.start_robot).start()
                        
                        self.retry_btn.emit()

                if "Rbt-EStop" in payload:
                    if payload["Rbt-EStop"]:
                        self.model.robot_data["stop"] = True
                        self.rbt_stop.emit()

                if "start" in payload:
                     if payload["start"] == True:
                        #####################################################################################
                        ############# necesario para esto:############
                        #from cv2 import imwrite, imread
                        ##############################################

                        ## Prueba para ubicar Bounding box de fusible F96
                        #self.model.vision_data["img"] = imread(self.model.imgs_path + "boxes/" + "F96_box" + ".jpg")
                        #img = self.model.vision_data["img"]
                        #BB = ["PDC-RMID", "F96"]
                        #img = self.model.drawBB(img=img, BB=BB,color=(0, 255, 0))
                        ##self.imgs_path = "data/imgs/"
                        #imwrite(self.model.imgs_path + "vision1"+ ".jpg", img)
                        #command = {
                        #    "lbl_result" : {"text": "Procesando vision en " + "F96_box", "color": "green"},
                        #    "lbl_steps" : {"text": "Por favor espere", "color": "black"},
                        #    "img_center" : "vision1" + ".jpg"
                        # }
                        #self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                        #####################################################################################
                        self.start.emit()

                payload_str = json.dumps(payload)       # convertir diccionario payload a string y guardarlo
                print("payload_str: ",payload_str)
                
                if "PDC-Dbracket" in payload_str: #busca en el string PDC-D
                    
                    #dependiendo del arnés cargado
                    if "PDC-Dbracket" in self.model.input_data["database"]["modularity"]:

                        if "PDC-Dbracket" in payload:
                            if payload["PDC-Dbracket"] == True:
                                self.nido_PDCDB = "PDC-Dbracket:\n Habilitada"
                                self.color_PDCDB = "blue"
                                
                            if payload["PDC-Dbracket"] == False:
                                self.nido_PDCDB = "PDC-Dbracket:\n Habilitar"
                                self.color_PDCDB = "red"
                    
                        if "PDC-Dbracket_ERROR" in payload:
                            if payload["PDC-D_ERROR"] == True:
                                self.nido_PDCDB = "PDC-Dbracket:\n clamp incorrecto"
                                self.color_PDCDB = "red"

                        if "clamp_PDC-Dbracket" in payload:
                            if payload["clamp_PDC-Dbracket"] == True:
                                self.nido_PDCDB = " PDC-Dbracket:\n clamp correcto"
                                self.color_PDCDB = "green"

                        command = {
                            "lbl_box0" : {"text": f"{self.nido_PDCDB}", "color": f"{self.color_PDCDB}", "hidden" : False}
                            }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                
                    else:
                        self.nido_PDCDB = ""
                        self.color_PDCDB = ""
                        command = {
                            "lbl_box0" : {"text": f"{self.nido_PDCDB}", "color": f"{self.color_PDCDB}", "hidden" : True}
                            }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                if "PDC-D" in payload_str: #busca en el string PDC-D
                    
                    #dependiendo del arnés cargado
                    if "PDC-D" in self.model.input_data["database"]["modularity"]:
                        
                        if "PDC-D" in payload:
                            if payload["PDC-D"] == True:
                                self.nido_PDCD = "PDC-D:\n Habilitada"
                                self.color_PDCD = "blue"
                           
                            if payload["PDC-D"] == False:
                                self.nido_PDCD = "PDC-D:\n Habilitar"
                                self.color_PDCD = "red"
                          

                        if "PDC-D_ERROR" in payload:
                            if payload["PDC-D_ERROR"] == True:
                                self.nido_PDCD = "PDC-D:\n clamp incorrecto"
                                self.color_PDCD = "red"

                        if "clamp_PDC-D" in payload:
                            if payload["clamp_PDC-D"] == True:
                                self.nido_PDCD = " PDC-D:\n clamp correcto"
                                self.color_PDCD = "green"
                            else:
                                self.nido_PDCD = "PDC-D:\n Habilitar"
                                self.color_PDCD = "red"

                        command = {
                            "lbl_box1" : {"text": f"{self.nido_PDCD}", "color": f"{self.color_PDCD}", "hidden" : False}
                            }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                    else:
                        self.nido_PDCD = ""
                        self.color_PDCD = ""
                        command = {
                            "lbl_box1" : {"text": f"{self.nido_PDCD}", "color": f"{self.color_PDCD}", "hidden" : True}
                            }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                if "PDC-P2" in payload_str:
                    
                    #dependiendo del arnés cargado
                    if "PDC-P2" in self.model.input_data["database"]["modularity"]:
                        
                        if "PDC-P2" in payload:
                            if payload["PDC-P2"] == True:
                                self.nido_PDCP2 = "PDC-P2:\n Habilitada"
                                self.color_PDCP2 = "blue"

                            if payload["PDC-P2"] == False:
                                self.nido_PDCP2 = "PDC-P2:\n Habilitar"
                                self.color_PDCP2 = "red"

                        if "PDC-P2_ERROR" in payload:
                            if payload["PDC-P2_ERROR"] == True:
                                self.nido_PDCP2 = "PDC-P2:\n clamp incorrecto"
                                self.color_PDCP2 = "red"
                        if "clamp_PDC-P2" in payload:
                            if payload["clamp_PDC-P2"] == True:
                                self.nido_PDCP2 = " PDC-P2:\n clamp correcto"
                                self.color_PDCP2 = "green"
                            else:
                                self.nido_PDCP2 = "PDC-P2:\n Habilitar"
                                self.color_PDCP2 = "red"


                        command = {
                                    "lbl_box6" : {"text": f"{self.nido_PDCP2}", "color": f"{self.color_PDCP2}", "hidden" : False}
                                  }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                    else:
                        self.nido_PDCP2 = ""
                        self.color_PDCP2 = ""
                        command = {
                            "lbl_box6" : {"text": f"{self.nido_PDCP2}", "color": f"{self.color_PDCP2}", "hidden" : True}
                            }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                if "PDC-P" in payload_str:
                    
                    #dependiendo del arnés cargado
                    if "PDC-P" in self.model.input_data["database"]["modularity"]:

                        if "PDC-P" in payload:
                            if payload["PDC-P"] == True:
                                self.nido_PDCP = "PDC-P:\n Habilitada"
                                self.color_PDCP = "blue"

                            if payload["PDC-P"] == False:
                                self.nido_PDCP = "PDC-P:\n Habilitar"
                                self.color_PDCP = "red"

                        if "PDC-P_ERROR" in payload:
                            if payload["PDC-P_ERROR"] == True:
                                self.nido_PDCP = "PDC-P:\n clamp incorrecto"
                                self.color_PDCP = "red"
                    
                        if "clamp_PDC-P" in payload:
                            if payload["clamp_PDC-P"] == True:
                                self.nido_PDCP = " PDC-P:\n clamp correcto"
                                self.color_PDCP = "green"
                            else:
                                self.nido_PDCP = "PDC-P:\n Habilitar"
                                self.color_PDCP = "red"

                        command = {
                                    "lbl_box2" : {"text": f"{self.nido_PDCP}", "color": f"{self.color_PDCP}", "hidden" : False}
                                  }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                
                    else:
                        self.nido_PDCP = ""
                        self.color_PDCP = ""
                        command = {
                            "lbl_box2" : {"text": f"{self.nido_PDCP}", "color": f"{self.color_PDCP}", "hidden" : True}
                            }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                if "PDC-R" in payload_str:
                    PDCR = ""
                    #detectar qué caja de PDC-R lleva el arnés
                    if "PDC-R" in self.model.input_data["database"]["modularity"].keys():
                        PDCR = "PDC-R"
                    elif "PDC-RMID" in self.model.input_data["database"]["modularity"].keys():
                        PDCR = "PDC-RMID"
                    elif "PDC-RS" in self.model.input_data["database"]["modularity"].keys():
                        print("En realidad es una PDC-RS pero se cambia a PDC-RMID para GDI ya que es mismo nido")
                        PDCR = "PDC-RMID"
                    else: #si no hay ninguna caja PDCR en el contenido del arnés...
                        self.nido_PDCR = ""
                        self.color_PDCR = ""
                        command = {
                            "lbl_box3" : {"text": f"{self.nido_PDCR}", "color": f"{self.color_PDCR}", "hidden" : True}
                            }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                    
                    
                    #si se encontró cualquier caja PDCR en el contenido del arnés...
                    if PDCR != "":
                        #no importa si es PDC-R o PDC-RMID los mensajes de ERROR y clamp no cambian (siempre se manda así desde GDI)
                        if "PDC-R_ERROR" in payload:
                                if payload["PDC-R_ERROR"] == True:
                                    self.nido_PDCR = f"{PDCR}:\n clamp incorrecto"
                                    self.color_PDCR = "red"
                                    
                        if "clamp_PDC-R" in payload:
                            if payload["clamp_PDC-R"] == True:
                                self.nido_PDCR = f" {PDCR}:\n clamp correcto"
                                self.color_PDCR = "green"
                            else:
                                self.nido_PDCR = f"{PDCR}:\n Habilitar"
                                self.color_PDCR = "red"
                                                   

                        if "PDC-R" in payload or "PDC-RS" in payload or PDCR in payload:
                            
                            if "True" in str(payload):
                                payload = {PDCR:True}
                            elif "False" in str(payload):
                                payload = {PDCR:False}
                            
                            if payload[PDCR] == True:
                                self.nido_PDCR = f"{PDCR}:\n Habilitada"
                                self.color_PDCR = "blue"

                            if payload[PDCR] == False:
                                self.nido_PDCR = f"{PDCR}:\n Habilitar"
                                self.color_PDCR = "red"
 
                        command = {"lbl_box3" : {"text": f"{self.nido_PDCR}", "color": f"{self.color_PDCR}", "hidden" : False}}
                        print("COMMANDO PDCR",command)
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                if "PDC-S" in payload_str:
                    
                    #dependiendo del arnés cargado
                    if "PDC-S" in self.model.input_data["database"]["modularity"]:

                        if "PDC-S" in payload:
                            if payload["PDC-S"] == True:
                                self.nido_PDCS = "PDC-S:\n Habilitada"
                                self.color_PDCS = "blue"

                            if payload["PDC-S"] == False:
                                self.nido_PDCS = "PDC-S:\n Habilitar"
                                self.color_PDCS = "red"

                        if "clamp_PDC-S" in payload:
                            if payload["clamp_PDC-S"] == True:
                                self.nido_PDCS = " PDC-S:\n clamp correcto"
                                self.color_PDCS = "green"
                                            
                        if "clamp_PDC-S" in payload:
                            if payload["clamp_PDC-S"] == False:
                                self.nido_PDCS = "PDC-S:\n Habilitar"
                                self.color_PDCS = "red"


                        command = {
                                    "lbl_box4" : {"text": f"{self.nido_PDCS}", "color": f"{self.color_PDCS}", "hidden" : False}
                                  }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                    else:
                        self.nido_PDCS = ""
                        self.color_PDCS = ""
                        command = {
                            "lbl_box4" : {"text": f"{self.nido_PDCS}", "color": f"{self.color_PDCS}", "hidden" : True}
                            }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                if "TBLU" in payload_str:
                    
                    #dependiendo del arnés cargado
                    if "TBLU" in self.model.input_data["database"]["modularity"]:

                        if "TBLU" in payload:
                            if payload["TBLU"] == True:
                                self.nido_TBLU = "TBLU:\n Habilitada"
                                self.color_TBLU = "blue"

                            if payload["TBLU"] == False:
                                self.nido_TBLU = "TBLU:\n Habilitar"
                                self.color_TBLU = "red"

                        if "TBLU_ERROR" in payload:
                            if payload["TBLU_ERROR"] == True:
                                self.nido_TBLU = "TBLU:\n clamp incorrecto"
                                self.color_TBLU = "red"

                        if "clamp_TBLU" in payload:
                            if payload["clamp_TBLU"] == True:
                                self.nido_TBLU = " TBLU:\n clamp correcto"
                                self.color_TBLU = "green"
                            else:
                                self.nido_TBLU = "TBLU:\n Habilitar"
                                self.color_TBLU = "red"


                        command = {
                                    "lbl_box5" : {"text": f"{self.nido_TBLU}", "color": f"{self.color_TBLU}", "hidden" : False}
                                  }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                
                    else:
                        self.nido_TBLU = ""
                        self.color_TBLU = ""
                        command = {
                            "lbl_box5" : {"text": f"{self.nido_TBLU}", "color": f"{self.color_TBLU}", "hidden" : True}
                            }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                
                if "F96" in payload_str:
                    
                    #dependiendo del arnés cargado
                    if "F96" in self.model.input_data["database"]["modularity"]:

                        if "F96" in payload:
                            if payload["F96"] == True:
                                self.nido_F96 = "F96:\n Habilitada"
                                self.color_F96 = "blue"

                            if payload["F96"] == False:
                                self.nido_F96 = "F96:\n Habilitar"
                                self.color_F96 = "red"

                        if "F96_ERROR" in payload:
                            if payload["F96_ERROR"] == True:
                                self.nido_F96 = "F96:\n clamp incorrecto"
                                self.color_F96 = "red"
                        if "clamp_F96" in payload:
                            if payload["clamp_F96"] == True:
                                self.nido_F96 = " F96:\n clamp correcto"
                                self.color_F96 = "green"
                            else:
                                self.nido_F96 = "F96:\n Habilitar"
                                self.color_F96 = "red"


                        command = {
                                    "lbl_box7" : {"text": f"{self.nido_F96}", "color": f"{self.color_F96}", "hidden" : False}
                                  }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                        
                    else:
                        self.nido_F96 = ""
                        self.color_F96 = ""
                        command = {
                            "lbl_box7" : {"text": f"{self.nido_F96}", "color": f"{self.color_F96}", "hidden" : True}
                            }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                if "MFB-P2" in payload_str:
                    
                    #dependiendo del arnés cargado
                    if "MFB-P2" in self.model.input_data["database"]["modularity"]:

                        if "MFB-P2" in payload:
                            if payload["MFB-P2"] == True:
                                self.nido_MFBP2 = "MFB-P2:\n Habilitada"
                                self.color_MFBP2 = "blue"

                            if payload["MFB-P2"] == False:
                                self.nido_MFBP2 = "MFB-P2:\n Habilitar"
                                self.color_MFBP2 = "red"

                        if "MFB-P2_ERROR" in payload:
                            if payload["MFB-P2_ERROR"] == True:
                                self.nido_MFBP2 = "MFB-P2:\n clamp incorrecto"
                                self.color_MFBP2 = "red"

                        if "clamp_MFB-P2" in payload:
                            if payload["clamp_MFB-P2"] == True:
                                self.nido_MFBP2 = " MFB-P2:\n clamp correcto"
                                self.color_MFBP2 = "green"

                        if "clamp_MFB-P2" in payload:
                            if payload["clamp_MFB-P2"] == False:
                                self.nido_MFBP2 = "MFB-P2:\n Habilitar"
                                self.color_MFBP2 = "red"
                        command = {
                                    "lbl_box8" : {"text": f"{self.nido_MFBP2}", "color": f"{self.color_MFBP2}", "hidden" : False}
                                  }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                    
                    else:
                        self.nido_MFBP2 = ""
                        self.color_MFBP2 = ""
                        command = {
                            "lbl_box8" : {"text": f"{self.nido_MFBP2}", "color": f"{self.color_MFBP2}", "hidden" : True}
                            }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                if "MFB-P1" in payload_str:
                    
                    #dependiendo del arnés cargado
                    if "MFB-P1" in self.model.input_data["database"]["modularity"]:

                        if "MFB-P1" in payload:
                            if payload["MFB-P1"] == True:
                                self.nido_MFBP1 = "MFB-P1:\n Habilitada"
                                self.color_MFBP1 = "blue"

                            if payload["MFB-P1"] == False:
                                self.nido_MFBP1 = "MFB-P1:\n Habilitar"
                                self.color_MFBP1 = "red"

                        if "MFB-P1_ERROR" in payload:
                            if payload["MFB-P1_ERROR"] == True:
                                self.nido_MFBP1 = "MFB-P1:\n clamp incorrecto"
                                self.color_MFBP1 = "red"

                        if "clamp_MFB-P1" in payload:
                            if payload["clamp_MFB-P1"] == True:
                                self.nido_MFBP1 = " MFB-P1:\n clamp correcto"
                                self.color_MFBP1 = "green"

                        if "clamp_MFB-P1" in payload:
                            if payload["clamp_MFB-P1"] == False:
                                self.nido_MFBP1 = "MFB-P1:\n Habilitar"
                                self.color_MFBP1 = "red"
                        command = {
                                    "lbl_box9" : {"text": f"{self.nido_MFBP1}", "color": f"{self.color_MFBP1}", "hidden" : False}
                                  }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                    else:
                        self.nido_MFBP1 = ""
                        self.color_MFBP1 = ""
                        command = {
                            "lbl_box9" : {"text": f"{self.nido_MFBP1}", "color": f"{self.color_MFBP1}", "hidden" : True}
                            }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                if "MFB-S" in payload_str:
                    
                    #dependiendo del arnés cargado
                    if "MFB-S" in self.model.input_data["database"]["modularity"]:

                        if "MFB-S" in payload:
                            if payload["MFB-S"] == True:
                                self.nido_MFBS = "MFB-S:\n Habilitada"
                                self.color_MFBS = "blue"

                            if payload["MFB-S"] == False:
                                self.nido_MFBS = "MFB-S:\n Habilitar"
                                self.color_MFBS = "red"

                        if "MFB-S_ERROR" in payload:
                            if payload["MFB-S_ERROR"] == True:
                                self.nido_MFBS = "MFB-S:\n clamp incorrecto"
                                self.color_MFBS = "red"

                        if "clamp_MFB-S" in payload:
                            if payload["clamp_MFB-S"] == True:
                                self.nido_MFBS = " MFB-S:\n clamp correcto"
                                self.color_MFBS = "green"

                        if "clamp_MFB-S" in payload:
                            if payload["clamp_MFB-S"] == False:
                                self.nido_MFBS = "MFB-S:\n Habilitar"
                                self.color_MFBS = "red"
                        command = {
                                    "lbl_box10" : {"text": f"{self.nido_MFBS}", "color": f"{self.color_MFBS}", "hidden" : False}
                                  }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                    else:
                        self.nido_MFBS = ""
                        self.color_MFBS = ""
                        command = {
                            "lbl_box10" : {"text": f"{self.nido_MFBS}", "color": f"{self.color_MFBS}", "hidden" : True}
                            }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                if "MFB-E" in payload_str:
                    
                    #dependiendo del arnés cargado
                    if "MFB-E" in self.model.input_data["database"]["modularity"]:

                        if "MFB-E" in payload:
                            if payload["MFB-E"] == True:
                                self.nido_MFBE = "MFB-E:\n Habilitada"
                                self.color_MFBE = "blue"

                            if payload["MFB-E"] == False:
                                self.nido_MFBE = "MFB-E:\n Habilitar"
                                self.color_MFBE = "red"

                        if "MFB-E_ERROR" in payload:
                            if payload["MFB-E_ERROR"] == True:
                                self.nido_MFBE = "MFB-E:\n clamp incorrecto"
                                self.color_MFBE = "red"

                        if "clamp_MFB-E" in payload:
                            if payload["clamp_MFB-E"] == True:
                                self.nido_MFBE = " MFB-E:\n clamp correcto"
                                self.color_MFBE = "green"

                        if "clamp_MFB-E" in payload:
                            if payload["clamp_MFB-E"] == False:
                                self.nido_MFBE = "MFB-E:\n Habilitar"
                                self.color_MFBE = "red"
                        command = {
                                    "lbl_box11" : {"text": f"{self.nido_MFBE}", "color": f"{self.color_MFBE}", "hidden" : False}
                                  }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                    else:
                        self.nido_MFBE = ""
                        self.color_MFBE = ""
                        command = {
                            "lbl_box11" : {"text": f"{self.nido_MFBE}", "color": f"{self.color_MFBE}", "hidden" : True}
                            }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                if "ERROR_cortina" in payload: # para payload, tiene que ser exactamente la llave del diccionario
                        if payload["ERROR_cortina"] == True:
                            command = {"lbl_info4" : {"text": "Cortina\nInterrumpida", "color": "red", "ancho":400,"alto":400}}  
                        if payload["ERROR_cortina"] == False:
                            command = {"lbl_info4" : {"text": "", "color": "red", "ancho":10,"alto":10}}  
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                if "revisando_resultado" in payload:
                    if payload["revisando_resultado"] == True:
                        self.model.revisando_resultado = True
                    else:
                        self.model.revisando_resultado = False

                if "revisando_resultado_height" in payload:
                    if payload["revisando_resultado_height"] == True:
                        self.model.revisando_resultado_height = True
                    else:
                        self.model.revisando_resultado_height = False
            
            ##############################################################################################

            if "torque/" in message.topic and "/status" in message.topic:
                if "result" in payload: 
                    for item in payload:
                        payload[item] = float(payload[item])
                    tool = "tool" + message.topic[7]
                    if tool in self.model.input_data["torque"]:
                        self.model.input_data["torque"][tool] = copy(payload)
                        self.torque.emit() 

            if message.topic == self.model.sub_topics["gui"]:
                if "request" in payload:
                    self.model.input_data["gui"]["request"] = payload["request"]
                    if payload["request"] == "login":
                        self.login.emit()
                    elif payload["request"] == "logout":
                        self.logout.emit()
                    elif payload["request"] == "config":
                        self.config.emit()
                if "ID" in payload:
                    self.model.input_data["gui"]["ID"] = payload["ID"]
                    self.ID.emit()
                if "code" in payload:
                    self.model.input_data["gui"]["code"] = payload["code"]
                    self.code.emit()
                if "visible" in payload:
                    self.model.input_data["gui"]["visible"] = payload["visible"]
                    self.visible.emit()

            if message.topic == self.model.sub_topics["config"]:
                if "finish" in payload:
                    if payload["finish"] == True:
                        self.config_ok.emit()
                if "shutdown" in payload:
                    if payload["shutdown"] == True:
                        self.model.shutdown = True

            if message.topic == self.model.sub_topics["gui"] or message.topic == self.model.sub_topics["gui_2"]:
                if "qr_box" in payload:
                    self.qr_box.emit(payload["qr_box"])  

            if message.topic == self.model.sub_topics["robot"]:
                if "response" in payload:
                    if "program_initiated" in payload["response"]:
                        self.model.robot_data["stop"] = False
                        self.rbt_init.emit()
                    if "position_reached" in payload["response"]:
                        self.rbt_pose.emit()

                    #if "Error, is Safety OK?" in payload["response"]:
                    #    print("cortina interrumpida signal")
                    #    self.error_cortina.emit()

                    if "home_reached" in payload["response"]:
                        self.rbt_home.emit()

            #variable para guardar los resultados obtenidos al hacer una inspección con visycam desde la GDI
            if message.topic == self.model.sub_topics["vision"]:

                #EJEMPLO:::::::::::
                #Camera/4/status  {
                #    "F200": "rojo",
                #    "F201": "cafe",
                #    "F202": "cafe",
                #    "F203": "cafe",
                #    "F204": "cafe",
                #    "F205": "cafe",
                #    "F206": "beige",
                #    "F207": "beige",
                #    "F208": "beige",
                #    "F209": "beigeclear",
                #    "F210": "beigeclear",
                #    "F211": "beigeclear",
                #    "F212": "beigeclear",
                #    "F213": "beigeclear",
                #    "F214": "beigeclear",
                #    "F215": "beigeclear",
                #    "F216": "beigeclear"
                #}

                if self.model.revisando_resultado == False: #para no leer resultados si ya se estaba revisando un resultado correcto
                    print("Llegó resultado de visión guardado en self.model.input_data[vision], vision.emit()")
                    self.model.input_data["vision"] = payload
                    self.vision.emit()
                else:
                    print("resultado ignorado por self.model.revisando_resultado = True, para mandarlo a True hacer PLC/1/status {'revisando_resultado':true}")

            #variable para guardar los resultados obtenidos al hacer una inspección con sensor de altura keyence desde la GDI
            if message.topic == self.model.sub_topics["height"]:

                if self.model.revisando_resultado_height == False: #para no leer resultados si ya se estaba revisando un resultado correcto
                    self.model.input_data["height"].clear()
                    self.model.input_data["height"] = payload
                    print("*******************************************************")
                    print("model.input_data[height] en comm.py: \n",payload)
                    print("*******************************************************")
                    self.height.emit()
                else:
                    print("resultado ignorado por self.model.revisando_resultado_height = True, para mandarlo a True hacer PLC/1/status {'revisando_resultado_height':true}")

        except Exception as ex:
            print("input exception", ex)

    def closePopout (self):
        command = {
            "popOut":"close"
            }
        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

if __name__ == "__main__":
    from PyQt5.QtWidgets import QApplication
    from manager.model import model
    import sys
    app = QApplication(sys.argv)
    model = model.manager()
    client = mqttClient(model)
    sys.exit(app.exec_())


##################
# comandos para correr simulación
"""
    PLC/1/status
    {"key":true}
    {"clamp_PDC-R":true}
    {"start":true}

    RobotEpson/2/status
    {"response":"position_reached"}

    ILX29620221000966 HMDEMO EL.
    Puntos de inspección visual PDC-R

    Camera/4/status
    R1:
    {"F421": "verde", "F422": "natural", "F423": "vacio", "F424": "vacio", "F425": "vacio", "F426": "vacio", "F430": "azul", "F431": "rojo", "F437": "vacio", "F438": "cafe", "F439": "azul", "F440": "cafe", "F441": "beige", "F450": "vacio", "F451": "vacio", "F452": "vacio", "F453": "vacio", "F454": "vacio", "F455": "verde"}
    R2:
    {"F400": "vacio", "F401": "natural", "F402": "vacio", "F403": "vacio", "F404": "vacio", "F405": "vacio", "F412": "vacio", "F413": "verde", "F414": "vacio", "F415": "verde", "F416": "verde", "F417": "verde", "RELX": "1008695"}
    R3:
    {"F406": "vacio", "F407": "vacio", "F408": "rojo", "F409": "vacio", "F410": "vacio", "F411": "vacio", "RELU": "vacio", "RELT": "1010733"}
    R4:
    {"F432": "cafe", "F433": "vacio", "F436": "beige", "F442": "vacio", "F443": "beige", "F444": "vacio", "F445": "vacio", "F446": "beige", "F456": "verde", "F457": "natural", "F458": "vacio", "F459": "vacio", "F460": "vacio", "F461": "vacio"}
    R5:
    {"F418": "vacio", "F419": "naranja", "F420": "naranja"}
    R6:
    {"F447": "naranja", "F448": "vacio", "F449": "vacio"}
    F96:
    {"F96": "azul"}
"""
##################