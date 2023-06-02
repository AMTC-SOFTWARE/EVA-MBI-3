from PyQt5.QtCore import QObject, QStateMachine, QState, pyqtSlot, pyqtSignal, QTimer, QThread
from manager.view.comm import MqttClient
from manager.model import Model
from paho.mqtt import publish
from datetime import datetime, timedelta
from threading import Timer
from time import strftime, sleep
from copy import copy
from os import system
import requests
import json
import os
from os.path import exists

from manager.controller import inspections
from toolkit.admin import Admin       

class Controller (QObject):

    def __init__(self, parent = None):
        super().__init__(parent)
        self.model              = Model(parent = self)
        self.client             = MqttClient(self.model, parent = self)
        self.model.transitions  = self.client
        self.model.mainWindow   = parent
        self.stateMachine       = QStateMachine(self)

        self.startup        = Startup(model = self.model)
        self.show_login     = Login(model = self.model)
        self.check_login    = CheckLogin(model = self.model)
        self.process        = QState()
        self.standby        = QState(parent = self.process)
        self.start_cycle    = StartCycle(model = self.model, parent = self.process)
        self.config         = Config(model = self.model)
        self.scan_qr        = ScanQr(model = self.model, parent = self.process)
        self.reset          = Reset(model = self.model)
        self.check_qr       = CheckQr(model = self.model, parent = self.process)
        self.qr_rework      = QrRework(model = self.model)
        self.inspections    = inspections.Inspections(model = self.model, ID = "1", parent = self.process)
        self.finish         = Finish(model = self.model, parent = self.process)
        
        self.check_pdcr             = CheckPDCR(model = self.model, parent = self.process)
        self.enable_clamps          = EnableClamps(model = self.model, parent = self.process)
        self.scan_pdcr              = ScanPDCR(model = self.model, parent = self.process)
        self.scan_quality           = ScanQr(model = self.model, parent = self.process)
        self.quality_validation     = QualityValidation(model = self.model, parent = self.process)


        self.startup.addTransition(self.startup.ok, self.show_login)
        self.show_login.addTransition(self.client.ID, self.check_login)
        self.show_login.addTransition(self.client.login, self.show_login)
        self.check_login.addTransition(self.check_login.nok, self.show_login)
        self.check_login.addTransition(self.check_login.ok, self.start_cycle)
        self.start_cycle.addTransition(self.start_cycle.ok, self.scan_qr)
        self.scan_qr.addTransition(self.client.logout, self.startup)
        self.scan_qr.addTransition(self.client.code, self.check_qr)
        self.scan_qr.addTransition(self.client.config, self.config)
        self.config.addTransition(self.client.config_ok, self.start_cycle)
        self.check_qr.addTransition(self.check_qr.nok, self.scan_qr)
        self.check_qr.addTransition(self.check_qr.rework, self.qr_rework)
        self.qr_rework.addTransition(self.qr_rework.ok, self.check_qr)
        
        self.check_qr.addTransition(self.check_qr.ok, self.scan_pdcr)
        self.scan_pdcr.addTransition(self.client.code, self.check_pdcr)
        #self.scan_pdcr.addTransition(self.scan_pdcr.emptypdcr, self.enable_clamps)
        self.check_pdcr.addTransition(self.check_pdcr.nok, self.scan_pdcr)
        self.check_pdcr.addTransition(self.check_pdcr.max_tries, self.scan_quality)
        self.check_pdcr.addTransition(self.check_pdcr.ok, self.enable_clamps)
        self.scan_quality.addTransition(self.client.code, self.quality_validation)
        self.quality_validation.addTransition(self.quality_validation.nok, self.scan_quality)
        self.quality_validation.addTransition(self.quality_validation.ok, self.scan_pdcr)
        self.enable_clamps.addTransition(self.enable_clamps.continuar, self.standby)

        #################################################################
        self.standby.addTransition(self.client.clamp, self.inspections)
        self.inspections.addTransition(self.inspections.finished, self.finish)
        #################################################################
        self.finish.addTransition(self.finish.ok, self.start_cycle)
        self.process.addTransition(self.client.key, self.reset)
        self.reset.addTransition(self.reset.ok, self.start_cycle)
                                                                   
        self.stateMachine.addState(self.startup)
        self.stateMachine.addState(self.show_login)
        self.stateMachine.addState(self.check_login)
        self.stateMachine.addState(self.process)
        self.stateMachine.addState(self.config)
        self.stateMachine.addState(self.reset)
        self.stateMachine.addState(self.qr_rework)

        self.process.setInitialState(self.start_cycle)
        self.stateMachine.setInitialState(self.startup)

        #self.client.qr_box.connect(self.chkQrBoxes)

    @pyqtSlot(str)
    #def chkQrBoxes(self, qr_box):
    #    try:
    #        if len(self.model.input_data["database"]["pedido"]):
    #            master_qr_boxes = json.loads(self.model.input_data["database"]["pedido"]["QR_BOXES"])
    #            ok = False
    #            for i in master_qr_boxes:
    #                if qr_box == master_qr_boxes[i][0] and master_qr_boxes[i][1]:
    #                    if not(i in self.model.input_data["plc"]["clamps"]) and i in self.model.input_data["database"]["modularity"]:
    #                        ok = True
    #                        self.client.client.publish(self.model.pub_topics["plc"],json.dumps({i: True}), qos = 2)
    #                        command = {
    #                            "lbl_steps" : {"text": f"Coloca la caja {i} en su lugar", "color": "black"}
    #                            }
    #                        Timer(5, self.boxTimeout, args = (i, qr_box)).start()
    #                    break
    #            if not(ok):
    #                command = {
    #                    "lbl_steps" : {"text": "Vuelve a escanear la caja", "color": "black"}
    #                    }
    #            for item in self.model.torque_data:
    #                if not(len(self.model.torque_data[item]["queue"])):
    #                   #self.client.client.publish(self.model.torque_data[item]["gui"],json.dumps(command), qos = 2)
    #                   pass
    #    except Exception as ex:
    #        print ("manager.controller.chkQrBoxes Exception: ", ex)

    @pyqtSlot()
    #def boxTimeout(self, i, qr_box):
    #    if not(i in self.model.input_data["plc"]["clamps"]):
    #        self.client.client.publish(self.model.pub_topics["plc"],json.dumps({i: False}), qos = 2)
    #        command = {
    #            "lbl_steps" : {"text": f"Vuelve a escanear la caja {i}", "color": "black"},
    #            }
    #        #for item in self.model.torque_data:
    #            #if not(len(self.model.torque_data[item]["queue"])):
    #                #self.client.client.publish(self.model.torque_data[item]["gui"],json.dumps(command), qos = 2)
    #                #pass
    #    else:
    #        self.model.qr_codes[i] = qr_box

    @pyqtSlot()
    def start(self):
        self.client.setup()
        self.stateMachine.start()
          
 
class Startup(QState):
    ok  = pyqtSignal()

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, event):

        print("############################## ESTADO: Startup ############################")

        if self.model.local_data["user"]["type"] != "":
            Timer(0.05, self.logout, args = (copy(self.model.local_data["user"]),)).start()

        self.model.local_data["user"]["type"] = ""
        self.model.local_data["user"]["name"] = ""
        self.model.local_data["user"]["pass"] = ""
        command = {
            "lbl_info1" : {"text": "", "color": "black"},
            "lbl_info2" : {"text": "", "color": "green"},
            "lbl_info3" : {"text": "", "color": "black"},
            "lbl_info4" : {"text": "", "color": "black"},
            "lbl_nuts"  : {"text": "", "color": "black"},
            ##############################################
            "lbl_box1"  : {"text": "", "color": "black"},
            "lbl_box2"  : {"text": "", "color": "black"},
            "lbl_box3"  : {"text": "", "color": "black"},
            "lbl_box4"  : {"text": "", "color": "black"},
            "lbl_box5"  : {"text": "", "color": "black"},
            "lbl_box6"  : {"text": "", "color": "black"},
            "lbl_box7"  : {"text": "", "color": "black"}, ######### Modificación para F96 #########
            ##############################################
            "lbl_result" : {"text": "Se requiere un login para continuar", "color": "green"},
            "lbl_steps" : {"text": "Ingresa tu código de acceso", "color": "black"},
            "lbl_user" : {"type":"", "user": "", "color": "black"},
            "img_user" : "blanco.jpg",
            "img_nuts" : "blanco.jpg",
            "img_center" : "logo.jpg"
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        
        #tratar de crear carpetas principales por si no existen
        try:
            carpeta_nueva = "C:/images/"
            if not(exists(carpeta_nueva)):
                os.mkdir(carpeta_nueva)
            else:
                print("ya existe carpeta: ",carpeta_nueva)

            carpeta_nueva = "C:/images/DATABASE/"
            if not(exists(carpeta_nueva)):
                os.mkdir(carpeta_nueva)
            else:
                print("ya existe carpeta: ",carpeta_nueva)

        except OSError as error:
            print("ERROR AL CREAR CARPETA:::\n",error)
        

        QTimer.singleShot(15, self.kioskMode)
        self.model.robot.stop()
        self.ok.emit()

    def kioskMode(self):
        system("taskkill /f /im explorer.exe")
        #publish.single("modules/set",json.dumps({"window" : False}),hostname='127.0.0.1', qos = 2)
        #publish.single("visycam/set",json.dumps({"window" : False}),hostname='127.0.0.1', qos = 2)

    def logout(self, user):
        try:
            data = {
                "NAME": user["name"],
                "GAFET": user["pass"],
                "TYPE": user["type"],
                "LOG": "LOGOUT",
                "DATETIME": strftime("%Y/%m/%d %H:%M:%S"),
                }
            resp = requests.post(f"http://{self.model.server}/api/post/login",data=json.dumps(data))
        except Exception as ex:
            print("Logout Exception: ", ex)

class Login (QState):
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model
    def onEntry(self, event):

        print("############################## ESTADO: Login ############################")

        command = {
            "show":{"login": True},
            "allow_close": True
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

class CheckLogin (QState):
    ok      = pyqtSignal()
    nok     = pyqtSignal()

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, event):

        print("############################## ESTADO: CheckLogin ############################")

        command = {
            "lbl_result" : {"text": "ID recibido", "color": "green"},
            "lbl_steps" : {"text": "Validando usuario...", "color": "black"},
            "show":{"login": False}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        Timer(0.05,self.API_requests).start()

    def API_requests (self):
        try:
            endpoint = ("http://{}/api/get/usuarios/GAFET/=/{}/ACTIVE/=/1".format(self.model.server, self.model.input_data["gui"]["ID"]))
            response = requests.get(endpoint).json()

            if "TYPE" in response:
                self.model.local_data["user"]["type"] = response["TYPE"]
                self.model.local_data["user"]["name"] = response["NAME"]
                self.model.local_data["user"]["pass"] = copy(self.model.input_data["gui"]["ID"])
                data = {
                    "NAME": self.model.local_data["user"]["name"],
                    "GAFET":  self.model.local_data["user"]["pass"],
                    "TYPE": self.model.local_data["user"]["type"],
                    "LOG": "LOGIN",
                    "DATETIME": strftime("%Y/%m/%d %H:%M:%S"),
                    }
                resp = requests.post(f"http://{self.model.server}/api/post/login",data=json.dumps(data))

                command = {
                    "lbl_user" : {"type":self.model.local_data["user"]["type"],
                                  "user": self.model.local_data["user"]["name"], 
                                  "color": "black"
                                  },
                    "img_user" : self.model.local_data["user"]["name"] + ".jpg"
                    }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                self.ok.emit()
            else:
                 command = {
                    "lbl_result" : {"text": "Intentalo de nuevo", "color": "red"},
                    "lbl_steps" : {"text": "Ingresa tu código de acceso", "color": "black"}
                    }
                 publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                 self.nok.emit()
        except Exception as ex:
            print("Login request exception: ", ex)
            command = {
                "lbl_result" : {"text": "Intentalo de nuevo", "color": "red"},
                "lbl_steps" : {"text": "Ingresa tu código de acceso", "color": "black"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.nok.emit()

class StartCycle (QState):
    ok = pyqtSignal()
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, event):

        print("############################## ESTADO: StartCycle ############################")

        self.model.reset()
        command = {
            "lbl_info1" : {"text": "", "color": "black"},
            "lbl_info2" : {"text": "", "color": "green"},
            "lbl_info3" : {"text": "", "color": "black"},
            "lbl_nuts" : {"text": "", "color": "orange"},
            #############################################
            "lbl_box1" : {"text": "", "color": "orange"},
            "lbl_box2" : {"text": "", "color": "orange"},
            "lbl_box3" : {"text": "", "color": "orange"},
            "lbl_box4" : {"text": "", "color": "orange"},
            "lbl_box5" : {"text": "", "color": "orange"},
            "lbl_box6" : {"text": "", "color": "orange"},
            "lbl_box7" : {"text": "", "color": "orange"},######### Modificación para F96 #########
            #############################################
            "lbl_result" : {"text": "Nuevo ciclo iniciado", "color": "green"},
            "lbl_steps" : {"text": "Escanea el numero HM", "color": "black"},
            "img_nuts" : "blanco.jpg",
            "img_center" : "logo.jpg",
            "allow_close": False,
            "cycle_started": False,
            "statusBar": "clear"
            }
        if self.model.shutdown == True:
            Timer(0.05, self.logout, args = (copy(self.model.local_data["user"]),)).start()
            command["lbl_result"] = {"text": "Apagando equipo...", "color": "green"}
            command["lbl_steps"] = {"text": ""}
            command["shutdown"] = True
            QTimer.singleShot(3000, self.fuseBoxesClamps)
        if self.model.config_data["trazabilidad"]:
            command["lbl_info3"] = {"text": "Trazabilidad\n\nActivada", "color": "green"}
        else:
            command["lbl_info3"] = {"text": "Trazabilidad\nDesactivada", "color": "red"}

        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        if not(self.model.shutdown):
            self.ok.emit()

    def fuseBoxesClamps (self):
        command = {}
        for i in self.model.fuses_BB:
             command[i] = False
        print(command)
        publish.single(self.model.pub_topics["plc"],json.dumps(command),hostname='127.0.0.1', qos = 2)

    def logout(self, user):
        try:
            data = {
                "NAME": user["name"],
                "GAFET": user["pass"],
                "TYPE": user["type"],
                "LOG": "LOGOUT",
                "DATETIME": strftime("%Y/%m/%d %H:%M:%S"),
                }
            resp = requests.post(f"http://{self.model.server}/api/post/login",data=json.dumps(data))
        except Exception as ex:
            print("Logout Exception: ", ex)

class Config (QState):
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.admin = None

    def onEntry(self, event):

        print("############################## ESTADO: Config ############################")

        admin = Admin(data = self.model)

        command = {
            "lbl_result" : {"text": "Sistema en configuración", "color": "green"},
            "lbl_steps" : {"text": "Ciclo de operación deshabilitado", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

class ScanQr (QState):
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, event):

        print("############################## ESTADO: ScanQr ############################")

        command = {
            "show":{"scanner": True}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

    def onExit(self, QEvent):
        command = {
            "show":{"scanner": False}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

class CheckQr (QState):
    ok      = pyqtSignal()
    nok     = pyqtSignal()
    rework  = pyqtSignal()

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, event):

        print("############################## ESTADO: CheckQr ############################")

        command = {
            "lbl_result" : {"text": "Datamatrix escaneado", "color": "green"},
            "lbl_steps" : {"text": "Validando", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        Timer(0.05, self.API_requests).start()

    def API_requests (self):
        try:
            print("||||||Estado de Sistema de Trazabilidad: ",self.model.config_data["trazabilidad"])
            pedido = None
            dbEvent = None
            coincidencias = 0
            self.model.qr_codes["FET"] = self.model.input_data["gui"]["code"]
            temp = self.model.input_data["gui"]["code"].split (" ")
            self.model.qr_codes["HM"] = "--"
            self.model.qr_codes["REF"] = "--"
            correct_lbl = False
            for i in temp:
                if "HM" in i:
                    self.model.qr_codes["HM"] = i
                if "IL" in i or "IR" in i:
                    self.model.qr_codes["REF"] = i
                if "EL." in i:
                    correct_lbl = True

            if not(correct_lbl):
                command = {
                        "lbl_result" : {"text": "Datamatrix incorrecto", "color": "red"},
                        "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                        }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                self.nok.emit()
                return


            #### Trazabilidad FAMX2
            if self.model.config_data["trazabilidad"]:
                try:
                    print("||||||||||||Consulta de HM a FAMX2...")
                    endpoint = "http://{}/server_famx2/get/seghm/NAMEPREENSAMBLE/=/INTERIOR/HM/=/{}".format(self.model.server,self.model.qr_codes["HM"])
                    famx2response = requests.get(endpoint).json()
                    print("Respuesta de FAMX2: \n",famx2response)
                    #No existen coincidencias del HM en FAMX2
                    if "items" in famx2response:
                        print("ITEMS por que no se encontraron coincidencias en FAMX2")
                        command = {
                            "lbl_result" : {"text": "HM no registrado en Sistema de Trazabilidad", "color": "red"},
                            "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                            }
                        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                        self.nok.emit()
                        return
                    #Si existe el HM en FAMX2
                    else:
                        print("FAMX2 Salida de Inserción: \n",famx2response["SALINSERCION"])
                        print("FAMX2 Ubicación: \n",famx2response["UBICACION"])
                        #Esto se hace por que la info extraída desde el Sist. de Trazabilidad, contiene un espacio largo de carácteres vacíos al final, por lo que los reemplazamos para que se vea bien en la interfaz
                        ubicFamx2 = famx2response["UBICACION"]
                        ubicFamx2 = ubicFamx2.replace(" ","")
                        #Para continuar, la bandera de Ubicación, debe estar colocada en "SALIDA_DE_INSERCION" ó "ENTRADA_A_VISION"
                        if ubicFamx2 == "SALIDA_DE_INSERCION" or ubicFamx2 == "ENTRADA_A_VISION":
                            #Si la estación anterior a visión publicó su fecha de salida, puede continuar.
                            if famx2response["SALINSERCION"] != None:
                                print("El arnés ya salió de INSERCIÓN")
                                #Se guarda el id del arnés de FAMX2 en el modelo para realizar updates en el servidor de FAMX2.
                                self.model.id_HM = famx2response["id"]
                                self.model.datetime = datetime.now()
                                #### Trazabilidad FAMX2 Update de Información
                                print("||Realizando el Update de ENTRADA a Trazabilidad en FAMX2")
                                print("ID a la que se realizará el Update para Trazabilidad",self.model.id_HM)
                                entTrazabilidad = {
                                    "ENTVISION": self.model.datetime.strftime("%Y/%m/%d %H:%M:%S"),
                                    "UBICACION": "ENTRADA_A_VISION",
                                    "NAMEVISION": "EVA-MBI-3"
                                    }
                                endpointUpdate = "http://{}/server_famx2/update/seghm/{}".format(self.model.server,self.model.id_HM)
                                
                                respTrazabilidad = requests.post(endpointUpdate, data=json.dumps(entTrazabilidad))
                                respTrazabilidad = respTrazabilidad.json()
                                sleep(0.1)
                                respTrazabilidad = requests.post(endpointUpdate, data=json.dumps(entTrazabilidad))
                                respTrazabilidad = respTrazabilidad.json()
                                sleep(0.1)
                                respTrazabilidad = requests.post(endpointUpdate, data=json.dumps(entTrazabilidad))
                                respTrazabilidad = respTrazabilidad.json()
                                print("respTrazabilidad del update: ",respTrazabilidad)
                            #Si la columna que indica la hora de salida de INSERCIÓN es None, significa que no ha completado esa estación y NO puede entrar aún a Visión.
                            else:
                                print("El Arnés no ha pasado por la estación anterior (INSERCION) por lo que no puede entrar a Visión")
                                command = {
                                "lbl_result" : {"text": "Arnés sin Historial de INSERCIÓN", "color": "red"},
                                "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                                }
                                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                                self.nok.emit()
                                return
                        else:
                            print("UBICACIÓN INCORRECTA, NO puede entrar a Visión")
                            command = {
                            "lbl_result" : {"text": "Ubicación de HM :"+ubicFamx2, "color": "red"},
                            "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                            }
                            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                            self.nok.emit()
                            return
                except Exception as ex:
                    print("Conexión con FAMX2 exception: ", ex)
                    command = {
                            "lbl_result" : {"text": "Error de Conexión con Sistema de Trazabilidad", "color": "red", "font": "40pt"},
                            "lbl_steps" : {"text": "Verifique su conexión o deshabilite el Sistema de Trazabilidad", "color": "black", "font": "22pt"}
                            }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    self.nok.emit()
                    return
            ####

            endpoint = "http://{}/api/get/eventos".format(self.model.server)
            eventos = requests.get(endpoint).json()
            #print("Lista eventos:\n",eventos)
            #print("Eventos: ",eventos["eventos"])
            #print("Eventos KEYS: ",eventos["eventos"].keys())
            for key in eventos["eventos"].keys():
                print("++++++++++++++Evento Actual++++++++++++++++:\n ",key)
                print("Valor Activo del Evento actual: ",eventos["eventos"][key][1])
                if eventos["eventos"][key][1] == 1:
                    endpoint = "http://{}/api/get/{}/pedidos/PEDIDO/=/{}/ACTIVE/=/1".format(self.model.server, key, self.model.qr_codes["REF"])
                    response = requests.get(endpoint).json()
                    #print("Response: ",response)
                    if "PEDIDO" in response:
                        dbEvent = key
                        coincidencias += 1
                        print("En este Evento se encuentra la modularidad \n")
                        pedido = response
            print("Coincidencias = ",coincidencias)
            if dbEvent != None:
                print("La Modularidad pertenece al Evento: ",dbEvent)
                if coincidencias != 1:
                    print("Datamatrix Redundante")
                    command = {
                        "lbl_result" : {"text": "Datamatrix redundante", "color": "red"},
                        "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                        }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    self.nok.emit()
                    return
                else:
                    print("Datamatrix Correcto")
            else:
                print("La Modularidad NO pertenece a ningún evento")
                command = {
                    "lbl_result" : {"text": "Datamatrix no registrado", "color": "green"},
                    "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                    }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                self.nok.emit()
                return


            if not(self.ETIQUETA(self.model.qr_codes["HM"])):
                command = {
                        "lbl_result" : {"text": "Arnés sin historial de torque", "color": "red"},
                        "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                        }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                self.nok.emit()
                return

            print("\nINICIO PROCESAMIENTO DE ARNÉS: ",strftime("%Y/%m/%d %H:%M:%S"))

            #Consulta a la API para ver cuales son los módulos Determinantes de cajas PDC-R y guardarlas en una variable que se utilizará más adelante.
            endpoint = "http://{}/api/get/{}/pdcr/variantes".format(self.model.server, dbEvent)
            pdcrVariantes = requests.get(endpoint).json()
            print("Lista Final de Variantes PDC-R:\n",pdcrVariantes)

            endpoint = "http://{}/api/get/historial/HM/=/{}/RESULTADO/=/2".format(self.model.server, self.model.qr_codes["HM"])
            response = requests.get(endpoint).json()


            #si response tiene items ... y esta es response["items"] = True  .... o si está qr_rework en  True...  se emite self.rework.emit (vas a qr_rework, a esperar llave para confirmar)
            if ("items" in response and not(response["items"])) or self.model.local_data["qr_rework"]: # or True:
                modules = json.loads(pedido["MODULOS_VISION"])
                modules = modules[list(modules)[0]]
                flag_s = False
                flag_m = False
                flag_l = False

                print(f"\n\t\tMODULOS_VISION:\n{modules}")

                for i in pdcrVariantes["small"]:
                    if i in modules:
                       self.model.pdcrvariant = "PDC-RS"
                       flag_s = True

                for i in pdcrVariantes["medium"]:
                    if i in modules:
                       self.model.pdcrvariant = "PDC-RMID"
                       flag_m = True

                for i in pdcrVariantes["large"]:
                    if i in modules:
                       self.model.pdcrvariant = "PDC-R"
                       flag_l = True

                print("\t\tFLAGS:\n Flag S - ",flag_s," Flag M - ",flag_m," Flag L - ",flag_l)
                print("PDC-R VARIANT: "+self.model.pdcrvariant)

                #variable para guardar toda la información de la configuración del arnés
                arnes_data = {}
                
                #variable para guardar la infromación de las cavidades que no están vacías para el arnés
                self.model.input_data["database"]["modularity"].clear()

                #recorremos los modulos del arnés
                for i in modules:
                    #petición a la base de datos local para ver que fusibles lleva cada modulo
                    endpoint = "http://{}/api/get/{}/modulos_fusibles/MODULO/=/{}/_/=/_".format(self.model.server, dbEvent, i)
                    response = requests.get(endpoint).json()
                    #si encuentra el módulo en la respuesta (que si existe en la base de datos local)...
                    if "MODULO" in response:
                        #si la respuesta para ese módulo no es de tipo lista ( esto quiere decir que no hay más de un módulo de este tipo)
                        if type(response["MODULO"]) != list:
                            current_module = {}
                            for j in response:
                                #si j tiene "CAJA_" y además no está vacío el objeto
                                if "CAJA_" in j and len(response[j]):
                                    #a current_module le añades esa información
                                    current_module.update(json.loads(response[j]))
                            #recorremos las cajas en current_module
                            for box in current_module:
                                #Si la caja contiene "PDC-R"... se realiza el siguiente fragmento para (en base a la variable pdcrvariant del modelo) dejar finalmente una sola variante de la PDC-R y asignarle fusibles.
                                if "PDC-R" in box:
                                    #recorremos las cavidades de los datos del modulo que tienen esa misma caja
                                    for cavity in current_module[box]:
                                        #nunca debería de llega una información de la base de datos de los modulos con un vacío, pero si llegara, no entrará al if
                                        if current_module[box][cavity] != "vacio":
                                            #si no esta la caja en arnes_data, agregar llave
                                            if not(self.model.pdcrvariant in arnes_data):
                                                arnes_data[self.model.pdcrvariant] = {}
                                            #si la caja no está, agregar lista vacía para dicha caja
                                            if not(self.model.pdcrvariant in self.model.input_data["database"]["modularity"]):
                                                self.model.input_data["database"]["modularity"][self.model.pdcrvariant] = []
                                            #si la cavidad no se encuentra en esa caja... y no es una cavidad vacía...
                                            if not(cavity in self.model.input_data["database"]["modularity"][self.model.pdcrvariant]):
                                                self.model.input_data["database"]["modularity"][self.model.pdcrvariant].append(cavity)
                                            #si la caja no tiene esa cavidad entonces se agrega al diccionario
                                            if not(cavity in arnes_data[self.model.pdcrvariant]):
                                                arnes_data[self.model.pdcrvariant][cavity] =  current_module[box][cavity]
                                ##########
                                else:
                                    #recorremos las cavidades de los datos del modulo que tienen esa misma caja
                                    for cavity in current_module[box]:
                                        #nunca debería de llega una información de la base de datos de los modulos con un vacío, pero si llegara, no entrará al if
                                        if current_module[box][cavity] != "vacio":
                                            #si no esta la caja en arnes_data, agregar llave
                                            if not(box in arnes_data):
                                                arnes_data[box] = {}
                                            #si la caja no está, encender bandera de que es una nueva caja
                                            if not(box in self.model.input_data["database"]["modularity"]):
                                                self.model.input_data["database"]["modularity"][box] = []
                                            #si la cavidad no se encuentra en esa caja... y no es una cavidad vacía...
                                            if not(cavity in self.model.input_data["database"]["modularity"][box]):
                                                self.model.input_data["database"]["modularity"][box].append(cavity)
                                                print("quiero este formato",cavity)
                                                print("el tipo,")
                                            #si la caja no tiene esa cavidad entonces se agrega al diccionario
                                            if not(cavity in arnes_data[box]):
                                                arnes_data[box][cavity] =  current_module[box][cavity]
                            
                        else:
                            command = {
                                    "lbl_result" : {"text": "Módulos de visión redundantes", "color": "red"},
                                    "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                                  }
                            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                            self.nok.emit()
                            return
                    else:
                        command = {
                                "lbl_result" : {"text": "Modulos de visión no encontrados", "color": "red"},
                                "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                                }
                        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                        self.nok.emit()
                        return 

                self.model.input_data["database"]["pedido"] = pedido


                ################################
                
                #se llena la variable modularity_fuses con todas las cavidades con fusibles vacíos
                
                self.model.modularity_fuses.update(copy(self.model.fuses_base))
                
                try:
                    for caja in arnes_data:
                        for cavidad in arnes_data[caja]:
                            self.model.modularity_fuses[caja][cavidad] = arnes_data[caja][cavidad]

                except Exception as ex:
                    print (ex)

                ################################
                #Se agrega nueva inspeccion obligatoria para todos los arneses la caja PDC-P2
                self.model.input_data["database"]["modularity"]["PDC-P2"] = ['CONECTOR1', 'CONECTOR2']
                
                
                
                print("\t\tCOLECCIÓN:\n", self.model.input_data["database"]["modularity"])
                print("\t\tmodularity_fuses:\n", self.model.modularity_fuses) #Temporal solo para ver los fusibles cuando sea un vehículo Z296 (MAXI 30A VERDE Nuevo)
                
                
                self.model.datetime = datetime.now()

                #se regresa la variable de rework a False para preguntar en cada arnés...
                if self.model.local_data["qr_rework"]:
                    self.model.local_data["qr_rework"] = False
                event = dbEvent.upper()
                evento = event.replace('_',' ')
                command = {
                    "lbl_result" : {"text": "Datamatrix validado", "color": "green"},
                    "lbl_steps" : {"text": "Obteniendo Contenido de Arnés", "color": "black"},
                    "statusBar" : pedido["PEDIDO"]+" "+self.model.qr_codes["HM"]+" "+evento,
                    "cycle_started": True
                    }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                
                self.model.contador_scan_pdcr = 1
                ################################################################################################################################# OK EMIT
                self.ok.emit()
            else:
                #se va a el estado rework
                self.rework.emit()
                return

        except Exception as ex:
            print("Datamatrix request exception: ", ex) 
            current_module = f"Database Exception: {ex.args}"
            command = {
                        "lbl_result" : {"text": current_module, "color": "red"},
                        "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                        }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.model.input_data["database"]["modularity"].clear()
            self.nok.emit()


    #Función para buscar el HM obtenido de la etiqueta (Consulta para saber si tiene historial de torque, y jalar sus resultados)
    def ETIQUETA(self, ID):
        #Si la Trazabilida está ACTIVADA, busca los resultados de torque en el servidor de FAMX2
        print("BUSCANDO RESULTADOS DE TORQUE EN |||SISTEMA DE TRAZABILIDAD|||")
        try:
            endpoint = "http://{}/server_famx2/get/seghm_valores/HM/=/{}/RESULTADO/=/1".format(self.model.server, ID)
            response = requests.get(endpoint).json()
            print("Respuesta de Etiqueta a Trazabilidad: \n",response)
            qr_codes = {}
            #Si la API NO tiene conexión a la red, regresa una excepción
            if "exception" in response:
                #Si la Trazabilidad está ACTIVADA, mostrará un mensaje de error en pantalla evitando así que continúe el ciclo.
                if self.model.config_data["trazabilidad"]:
                    command = {
                    "lbl_result" : {"text": "Error de Conexión a Sistema de Trazabilidad", "color": "red"},
                    "lbl_steps" : {"text": "Compruebe su conexión a la red", "color": "black"},
                    }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    sleep(3)
                    return False
                #Si la Trazabilidad está DESACTIVADA, permitirá continuar con el ciclo pero al imprimir la etiqueta, los valores de los torques dirán "NoResults"
                else:
                    results = ["PDC-R","PDC-D","PDC-P","BATTERY","BATTERY-2","MFB-P1","MFB-P2"]
                    print("Results predeterminados por ausencia de resultados: ",results)
                    lbl = {}
                    for i in results:
                        print("i: ",i)

                        #variable para dar formato de etiquetas
                        lbl[i] = ['No Results']

                        #para el formato de etiqueta se pide que el inicio siempre sea _PDC-R_
                        #por ejemplo: _PDC-R_:"PDC-RMID:[16.6]"
                        key = "_" + i + "_"
                        if "PDC-RMID" in key:
                            #si el key que tiene valor es PDC-RMID, se cambia la palabra para que quede _PDC-R_
                            key = key.replace("PDC-RMID", "PDC-R")
                        elif "PDC-RS" in key:
                            #si el key que tiene valor es PDC-RS, se cambia la palabra para que quede _PDC-R_
                            key = key.replace("PDC-RS", "PDC-R")

                        value = i + ": " + str(lbl[i]).replace(' ', '')

                        #ejemplo de un key:  '_MFB-P1_': "MFB-P1: [16.2,8.2,8.1,'-','-',16.2,'-']"
                        self.model.t_results_lbl[key] = value

                        #finalmente queda todo el formato de valores de torque en la etiqueta acomodado
                        # en self.model.t_results_lbl

                    print("self.model.t_results_lbl FINAL: \n")
                    print(self.model.t_results_lbl)
                    command = {
                        "lbl_result" : {"text": "Arnés sin Trazabilidad", "color": "red"},
                        "lbl_steps" : {"text": "La etiqueta final no incluirá torques", "color": "black"}
                        }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    sleep(3)
                    return True
            #Si la api SI tiene conexión a la red continúa el proceso y regresa un valor True
            else:
                #Si la respuesta contiene "items" y el valor de esa llave es 0 ó False, significa que no halló ninguna coincidencia, permitirá continuar con el ciclo pero al imprimir la etiqueta, los valores de los torques dirán "NoResults"
                if ("items" in response and not(response["items"])):
                    results = ["PDC-R","PDC-D","PDC-P","BATTERY","BATTERY-2","MFB-P1","MFB-P2"]
                    print("Results predeterminados por ausencia de resultados: ",results)
                    lbl = {}
                    for i in results:
                        print("i: ",i)

                        #variable para dar formato de etiquetas
                        lbl[i] = ['No Results']

                        #para el formato de etiqueta se pide que el inicio siempre sea _PDC-R_
                        #por ejemplo: _PDC-R_:"PDC-RMID:[16.6]"
                        key = "_" + i + "_"
                        if "PDC-RMID" in key:
                            #si el key que tiene valor es PDC-RMID, se cambia la palabra para que quede _PDC-R_
                            key = key.replace("PDC-RMID", "PDC-R")
                        elif "PDC-RS" in key:
                            #si el key que tiene valor es PDC-RS, se cambia la palabra para que quede _PDC-R_
                            key = key.replace("PDC-RS", "PDC-R")

                        value = i + ": " + str(lbl[i]).replace(' ', '')

                        #ejemplo de un key:  '_MFB-P1_': "MFB-P1: [16.2,8.2,8.1,'-','-',16.2,'-']"
                        self.model.t_results_lbl[key] = value

                        #finalmente queda todo el formato de valores de torque en la etiqueta acomodado
                        # en self.model.t_results_lbl

                    print("self.model.t_results_lbl FINAL: \n")
                    print(self.model.t_results_lbl)
                    command = {
                        "lbl_result" : {"text": "Arnés sin historial de torque", "color": "red"},
                        "lbl_steps" : {"text": "La etiqueta final no incluirá torques", "color": "black"}
                        }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    sleep(3)
                    return True
                #Si existen más de una coincidencia, utiliza la información del último registro
                if type(response["ID"]) == list:
                    index = response["ID"].index(max(response["ID"]))
                    results = json.loads(response["TORQUE"][index])
                    resultsAngle = json.loads(response["ANGULO"][index])
                    self.model.t_tries.update(json.loads(response["INTENTOS_T"][index]))
                    self.model.t_scrap.update(json.loads(response["SCRAP"][index]))
                    qr_codes.update(json.loads(response["SERIALES"][index]))
                #Si encuentra una sola coincidencia, utiliza la información de ese registro
                else:
                    results = json.loads(response["TORQUE"])
                    resultsAngle = json.loads(response["ANGULO"])
                    self.model.t_tries.update(json.loads(response["INTENTOS_T"]))
                    self.model.t_scrap.update(json.loads(response["SCRAP"]))
                    qr_codes.update(json.loads(response["SERIALES"]))

                for i in qr_codes:
                    if i in self.model.qr_codes:
                        pass
                    else:
                        self.model.qr_codes[i] = qr_codes[i]
 
                r_temp = copy(results)
                a_temp = copy(resultsAngle)
                self.model.t_result.update(r_temp)
                self.model.t_resultAngle.update(a_temp)
                lbl = {}

                #se quita de results los que valgan None, ya que no lleva esa caja
                try:
                    if results["PDC-R"]["E1"] == None:
                        results.pop("PDC-R", None)
                    if results["PDC-RMID"]["E1"] == None:
                        results.pop("PDC-RMID", None)
                    if results["PDC-RS"]["E1"] == None:
                        results.pop("PDC-RS", None)
                except Exception as ex:
                    print("Label exception: ", ex)

                print("results de Torques (solo debe estar caja correspondiente): \n")
                print(results)
                print("###########################################################\n")
        
                for i in results:
                    print("i: ",i)
                    #temp es el resultado de los valores de la caja actual (pueden ser varios por ejemplo: 'MFB-P1': {'A47': None, 'A46': 16.23, 'A45': None, 'A44': None, 'A43': 8.14, 'A41': 16.2, 'A42': 8.2}
                    temp = results[i]
                    #temp2 es una lista de las llaves de la caja actual
                    temp2 = list(temp)
                    #se ordena la lista de llaves
                    temp2.sort()

                    if "_" in i:
                        print("#############entró aquí _ , -")
                        i = i.replace("_","-")

                    #variable para dar formato de etiquetas
                    lbl[i] = []
                    for j in temp2: 
                        #cuando el valor sea None, se guarda en lbl[i] un '-' para el formato requerido de las etiquetas
                        if temp[j] == None:
                            lbl[i].append('-')
                        #si hay un valor para esa llave, se redondea el resultado y se guarda en lbl[i] a 1 decimal
                        else:
                            lbl[i].append(round(temp[j],1))

                    #para el formato de etiqueta se pide que el inicio siempre sea _PDC-R_
                    #por ejemplo: _PDC-R_:"PDC-RMID:[16.6]"
                    key = "_" + i + "_"
                    if "PDC-RMID" in key:
                        #si el key que tiene valor es PDC-RMID, se cambia la palabra para que quede _PDC-R_
                        key = key.replace("PDC-RMID", "PDC-R")
                    elif "PDC-RS" in key:
                        #si el key que tiene valor es PDC-RS, se cambia la palabra para que quede _PDC-R_
                        key = key.replace("PDC-RS", "PDC-R")

                    value = i + ": " + str(lbl[i]).replace(' ', '')

                    #ejemplo de un key:  '_MFB-P1_': "MFB-P1: [16.2,8.2,8.1,'-','-',16.2,'-']"
                    self.model.t_results_lbl[key] = value

                    #finalmente queda todo el formato de valores de torque en la etiqueta acomodado
                    # en self.model.t_results_lbl

                print("self.model.t_results_lbl FINAL: \n")
                print(self.model.t_results_lbl)
                return True
        except Exception as ex:
            print("Etiqueta Trazabilidad: ", ex)
            return False

class ScanPDCR (QState):

    emptypdcr = pyqtSignal()

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, event):
        print("############################## ESTADO: ScanPDCR ############################")

        #self.model.pdcrvariant puede valer: 
        #"PDC-R"     para esta caja corresponde el QR: A2239061602
        #"PDC-RMID"  para esta caja corresponde el QR: A2239061502
        #"PDC-RS"    para esta caja corresponde el QR: A2239061402

        if self.model.pdcrvariant == "PDC-R":
            self.model.qr_esperado = "2239061602"
        elif self.model.pdcrvariant == "PDC-RMID":
            self.model.qr_esperado = "2239061502"
        elif self.model.pdcrvariant == "PDC-RS":
            self.model.qr_esperado = "2239061402"

        command = {
            "lbl_result" : {"text": "Escanear caja " + self.model.pdcrvariant, "color": "green"},
            "lbl_steps" : {"text": "QR: A" + self.model.qr_esperado, "color": "black"},
            "show":{"scanner": True}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

    def onExit(self, QEvent):
        print("Saliendo de ScanPDCR")
        command = {
            "show":{"scanner": False}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

class CheckPDCR (QState):

    ok = pyqtSignal()
    nok = pyqtSignal()
    max_tries = pyqtSignal()

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, QEvent):
        print("############################## ESTADO: CheckPDCR ############################")

        #se guarda el qr leído de la caja PDCR
        qr_leido = copy(self.model.input_data["gui"]["code"])

        if self.model.contador_scan_pdcr >= self.model.max_pdcr_try:
            command = {
                "lbl_result" : {"text": "Demasiados Intentos, para reiniciar los intentos", "color": "red", "font": "35pt"},
                "lbl_steps" : {"text": "Llamar a un SUPERVISOR de CALIDAD. Llave deshabilitada.", "color": "red", "font": "35pt"},
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.model.disable_key = True

            self.max_tries.emit()

        else:

            if self.model.qr_esperado in qr_leido:
                print("Qr Correcto")
                command = {
                    "lbl_result" : {"text": "Qr de Caja Correcto", "color": "green"},
                    "lbl_steps" : {"text": "Iniciando Ciclo", "color": "black"},
                    }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                Timer(1.2,self.ok.emit).start()

            else:
                #se agrega uno al contador de intentos
                self.model.contador_scan_pdcr += 1
                command = {
                    "lbl_result" : {"text": "Qr Incorrecto, Esperado: A" + self.model.qr_esperado, "color": "red"},
                    "lbl_steps" : {"text": "Intento " + str(self.model.contador_scan_pdcr) + " de " + str(self.model.max_pdcr_try), "color": "orange"},
                    }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                print("Qr Incorrecto, se espera: ",self.model.qr_esperado)
                Timer(2.4,self.nok.emit).start()


    def onExit(self, QEvent):
        print("Saliendo de CheckPDCR")

class EnableClamps (QState):

    continuar = pyqtSignal()

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, QEvent):
        print("############################## ESTADO: EnableClamps ############################")

        self.model.disable_key = False

        command = {}
        for i in self.model.input_data["database"]["modularity"]:
            command[i] = True
        print(command)
        publish.single(self.model.pub_topics["plc"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        command = {
            "lbl_result" : {"text": "Información de Arnés Validada", "color": "green"},
            "lbl_steps" : {"text": "Coloca las cajas en los nidos para continuar", "color": "navy"},
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        Timer(1,self.continuar.emit).start()

    def onExit(self, QEvent):
        print("Saliendo de EnableClamps")

class QualityValidation (QState):

    ok = pyqtSignal()
    nok = pyqtSignal()

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, QEvent):
        print("############################## ESTADO: QualityValidation ############################")

        command = {
            "lbl_result" : {"text": "Validando Usuario", "color": "orange"},
            "lbl_steps" : {"text": "Revisando Permisos", "color": "black"},
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        Timer(0.05,self.consulta_usuarios).start()


    def consulta_usuarios (self):
        try:
            #se guarda el usuario ingresado
            usuario_ingresado = copy(self.model.input_data["gui"]["code"])

            endpoint = ("http://{}/api/get/usuarios/GAFET/=/{}/ACTIVE/=/1".format(self.model.server, usuario_ingresado))
            response = requests.get(endpoint).json()

            if "TYPE" in response:
                tipo_usuario = response["TYPE"]
                nombre_usuario = copy(response["NAME"])

                if tipo_usuario == "SUPCALIDAD":

                    command = {
                        "lbl_result" : {"text": nombre_usuario + " Autorizó", "color": "green"},
                        "lbl_steps" : {"text": "Vuelva a Intentar, o Llave para Finalizar", "color": "green", "font": "35pt"},
                        }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    
                    self.model.disable_key = False
                    self.model.contador_scan_pdcr = 1
                    Timer(2.4,self.ok.emit).start()

                else:
                    command = {
                        "lbl_result" : {"text": "Usuario Sin Permiso", "color": "red"},
                        "lbl_steps" : {"text": "Llamar a un SUPERVISOR de CALIDAD. Llave deshabilitada.", "color": "black", "font": "35pt"},
                        }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    Timer(1.2,self.nok.emit).start()

            else:
                 command = {
                    "lbl_result" : {"text": "Código Incorrecto", "color": "red"},
                    "lbl_steps" : {"text": "Llamar a un SUPERVISOR de CALIDAD. Llave deshabilitada.", "color": "black", "font": "35pt"},
                    }
                 publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                 Timer(1.2,self.nok.emit).start()

        except Exception as ex:
            print("Login request exception: ", ex)
            command = {
                "lbl_result" : {"text": "Código Incorrecto", "color": "red"},
                "lbl_steps" : {"text": "Llamar a un SUPERVISOR de CALIDAD. Llave deshabilitada.", "color": "black", "font": "35pt"},
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            Timer(1.2,self.nok.emit).start()


    def onExit(self, QEvent):
        print("Saliendo de QualityValidation")

class QrRework (QState):
    ok = pyqtSignal()
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

        self.model.transitions.key.connect(self.rework)
        self.model.transitions.code.connect(self.noRework)

    def onEntry(self, QEvent):

        print("############################## ESTADO: QrRework ############################")

        command = {
            "lbl_result" : {"text": "Datamatrix procesado anteriormente", "color": "green"},
            "lbl_steps" : {"text": "Escanea otro código o gira la llave para continuar", "color": "black"},
            "show":{"scanner": True}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

    def onExit(self, QEvent):
        command = {
            "show":{"scanner": False}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

    def rework (self):
        self.model.local_data["qr_rework"] = True
        Timer(0.05, self.ok.emit).start()

    def noRework(self):
        Timer(0.05, self.ok.emit).start()

class Finish (QState):
    ok      = pyqtSignal()
    nok     = pyqtSignal()

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, event):

        print("############################## ESTADO: Finish ############################")

        print("HM: ",self.model.qr_codes["HM"])
        print("RESULTADO: 2")
        #print("VISION: ",self.model.v_result)
        #print("ALTURA: ",self.model.h_result)
        print("INTENTOS_VA: ",self.model.tries)
        print("TORQUE: ",self.model.t_result)
        print("ANGULO: ",self.model.t_resultAngle)
        #print("INTENTOS_T: ",self.model.t_tries)
        print("SERIALES: ",self.model.qr_codes)
        print("INICIO: ",self.model.datetime.isoformat())
        print("FIN: ",strftime("%Y/%m/%d %H:%M:%S"))
        print("USUARIO: ",self.model.local_data["user"]["type"] + ": " + self.model.local_data["user"]["name"])
        #print("NOTAS: TORQUE OK, VISION OK, ALTURA OK, ETIQUETA OK",)
        #print("SCRAP: ",self.model.t_scrap)

        historial = {
            "HM": self.model.qr_codes["HM"],
            "RESULTADO": "2",
            "VISION": self.model.v_result,
            "ALTURA":self.model.h_result,
            "INTENTOS_VA": self.model.tries,
            "TORQUE": self.model.t_result,
            "ANGULO": self.model.t_resultAngle,
            "INTENTOS_T": self.model.t_tries,
            "SERIALES": self.model.qr_codes,
            "INICIO": self.model.datetime.isoformat(),
            "FIN": strftime("%Y/%m/%d %H:%M:%S"),
            "USUARIO": self.model.local_data["user"]["type"] + ": " + self.model.local_data["user"]["name"],
            "NOTAS": {"TORQUE": ["OK"], "VISION": ["OK"], "ALTURA": ["OK"], "ETIQUETA": ["OK"]},
            "SCRAP": self.model.t_scrap
            }

        resp = requests.post(f"http://{self.model.server}/api/post/historial",data=json.dumps(historial))
        resp = resp.json()

        if "items" in resp:
            if resp["items"] == 1:
                label = {
                    "_DATE_":  self.model.datetime.strftime("%Y/%m/%d %H:%M:%S"),
                    "_REF_":   self.model.qr_codes["REF"],
                    "_QR_":    self.model.input_data["database"]["pedido"]["PEDIDO"]+" "+self.model.qr_codes["HM"]+" V.",
                    "_TITLE_": " Vision-Torque-Altura Interior",
                    "_HM_":    self.model.qr_codes["HM"],
                    "_RESULT_": "Fusibles y torques OK"
                }
                label.update(self.model.t_results_lbl)

                print("ETIQUETA:::::::::::::::::::::::::::::::::::::")
                print("update(t_results_lbl): ",self.model.t_results_lbl)
                print("_DATE_: ",self.model.datetime.strftime("%Y/%m/%d %H:%M:%S"))
                print("_REF_: ",self.model.qr_codes["REF"])
                print("_QR_: ",self.model.input_data["database"]["pedido"]["PEDIDO"]+" "+self.model.qr_codes["HM"]+" V.")
                print("_TITLE_: Vision-Torque-Altura Interior",)
                print("_HM_: ",self.model.qr_codes["HM"])
                print("_RESULT_: Fusibles y torques OK")

                print("FORMATO PARA GDI:::::::::::::::::::::::::::::::::::::::::::::::::::::")
                print(self.model.pub_topics["printer"])
                print(label)

                publish.single(self.model.pub_topics["printer"], json.dumps(label), hostname='127.0.0.1', qos = 2)
                QTimer.singleShot(100, self.finalMessage)
                QTimer.singleShot(1500,self.ok.emit)
                
            else:
                command = {
                    "lbl_result" : {"text": "Error al guardar los datos", "color": "red"},
                    "lbl_steps" : {"text": "Gire la llave de reset", "color": "black"}
                    }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        else:
            command = {
                "lbl_result" : {"text": "Error de conexión con la base de datos", "color": "red"},
                "lbl_steps" : {"text": "Gire la llave de reset", "color": "black"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        #### Trazabilidad FAMX2 Update de Información
        if self.model.config_data["trazabilidad"]:
            try:
                print("Realizando el Update de Trazabilidad en FAMX2")
                print("ID a la que se realizará el Update para Trazabilidad",self.model.id_HM)
                trazabilidad = {
                    "SALVISION": historial["FIN"],
                    "UBICACION": "SALIDA_DE_VISION",
                    "NAMEVISION": "EVA-MBI-3"
                    }
                endpoint = "http://{}/server_famx2/update/seghm/{}".format(self.model.server,self.model.id_HM)
                
                resp = requests.post(endpoint, data=json.dumps(trazabilidad))
                resp = resp.json()
                sleep(0.1)
                resp = requests.post(endpoint, data=json.dumps(trazabilidad))
                resp = resp.json()
                sleep(0.1)
                resp = requests.post(endpoint, data=json.dumps(trazabilidad))
                resp = resp.json()





                print("Resp de Update Trazabilidad: ",resp)
            except Exception as ex:
                print("Conexión con FAMX2 exception: ", ex)
                command = {
                        "lbl_result" : {"text": "Error de Conexión con Sistema de Trazabilidad", "color": "red", "font": "40pt"},
                        "lbl_steps" : {"text": "Gire la llave de reset", "color": "black", "font": "22pt"}
                        }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

    def finalMessage(self):
        command = {
            "lbl_result" : {"text": "Ciclo terminado", "color": "green"},
            "lbl_steps" : {"text": "Retira las cajas", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

class Reset (QState):
    ok      = pyqtSignal()
    nok     = pyqtSignal()
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, event):

        print("############################## ESTADO: Reset ############################")

        command = {
            "lbl_result" : {"text": "Se giró la llave de reset", "color": "green"},
            "lbl_steps" : {"text": "Reiniciando", "color": "black"},
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        command = {}
        for i in self.model.fuses_BB:
             command[i] = False
        publish.single(self.model.pub_topics["plc"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        if self.model.datetime != None:
            historial = {
                "HM": self.model.qr_codes["HM"],
                "RESULTADO": "0",
                "VISION": self.model.v_result,
                "ALTURA":self.model.h_result,
                "INTENTOS_VA": self.model.tries,
                "TORQUE": {},
                "INTENTOS_T": {},
                "SERIALES": self.model.qr_codes,
                "INICIO": self.model.datetime.isoformat(),
                "FIN": strftime("%Y/%m/%d %H:%M:%S"),
                "USUARIO": self.model.local_data["user"]["type"] + ": " + self.model.local_data["user"]["name"],
                "NOTAS": {"VISION": ["RESET"], "ALTURA": ["RESET"]},
                "SCRAP": {}
                }

            resp = requests.post(f"http://{self.model.server}/api/post/historial",data=json.dumps(historial))
            resp = resp.json()
            
            if "items" in resp:
                if resp["items"] == 1:
                    pass
                else:
                    command = {
                        "lbl_result" : {"text": "Error de conexión", "color": "red"},
                        "lbl_steps" : {"text": "Datos no guardados", "color": "black"}
                        }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        QTimer.singleShot(500,self.ok.emit)


#EJECUCIÓN EN PARALELO
class MyThread(QThread):
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model  = model
        
        print("se crea un objeto de la clase MyThread con padre QThread")
        print("con entrada del objeto model de la clase model que está en model.py")
        print("y el objeto client de la clase MqttClient que está en comm.py")
        
    def run(self):

        while 1:

            sleep(5)
            command = {"lcdNumber": {"visible": False}}
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            command = {"lcdNumber": {"visible": True}}
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

            try:
                print("Corriendo en Paralelo")

                ############################################ CONTADOR DE PIEZAS #####################################
                #fecha actual
                fechaActual = datetime.today()
                #delta time de un día
                td = timedelta(1)
                #afterfechaActual es la fecha actual mas un día (mañana)
                afterfechaActual = fechaActual + td
                #beforefechaActual es la fecha actual menos un día (ayer)
                beforefechaActual = fechaActual - td

                #se obtiene la hora actual (int)
                horaActual = datetime.today().hour
                print("hora Actual: ",horaActual)
                dia_inicial =''
                dia_final =''

                #si la hora actual es mayor de las 7am   
                if horaActual >= 19 or horaActual < 7:
                    print("Segundo turno")

                    if horaActual < 7:
                       dia_inicial = beforefechaActual.strftime('%Y-%m-%d')
                       #print('BEFORE: ',dia_inicial)
                       dia_final = fechaActual.strftime('%Y-%m-%d')
                       #print('AFTER: ',dia_final)
                       dia_inicial = str(dia_inicial) + "-19"
                       ##Estamos hablando que ayer ya paso y estamos en el dia que sigue el turno de la tarde
                       dia_final = str(dia_final) + "-07"
                       endpoint = "http://{}//json2/historial/fin/>/{}/</{}".format(self.model.server,dia_inicial,dia_final)
                    else: 
                       dia_inicial = fechaActual.strftime('%Y-%m-%d')

                       dia_final = fechaActual.strftime('%Y-%m-%d')
                       #print('AFTER: ',dia_final)
                       dia_inicial = str(dia_inicial) + "-19"
                       ##Estamos hablando que ayer ya paso y estamos en el dia que sigue el turno de la tarde
                       dia_final = str(dia_final) + "-07"
                       endpoint = "http://{}//json2/historial/fin/>=/{}/_/_".format(self.model.server,dia_inicial)

                    
                    print("dia_inicial",dia_inicial)
                    print("dia_final", dia_final)
                    ########################################## Consulta Local ##################################
                    #endpoint = "http://{}/api/get/et_mbi_2/historial/fin/>/{}/</{}_/_".format(self.model.server,dia_inicial,dia_final)
                    #contresponse = requests.get(endpoint).json()
                elif horaActual < 19 or horaActual >= 7:
                    print("Primer turno")
                    dia_inicial = fechaActual.strftime('%Y-%m-%d')
                    dia_final = fechaActual.strftime('%Y-%m-%d')

                    dia_inicial = str(dia_inicial) + "-7"
                    dia_final = str(dia_final) + "-7"
                    print("dia_inicial",dia_inicial)
                    print("dia_final", dia_final)
                    endpoint = "http://{}//json2/historial/fin/>/{}/</{}".format(self.model.server,dia_inicial,dia_final)

                    ########################################## Consulta Local ##################################
                #endpoint = "http://{}/api/get/historial/fin/>/{}/</{}_/_".format(self.model.server,dia_inicial,dia_final)
                #endpoint = "http://{}//json2/historial/fin/>/{}/</{}".format(self.model.server,dia_inicial,dia_final)
                print(endpoint)
                contresponse = requests.get(endpoint).json()

                #print("dia_inicial: ",dia_inicial)
                #print("dia_final: ",dia_final)
                
                

                #No existen coincidencias
                if "items" in contresponse: ## LOCAL
                    print("No se han liberado arneses el día de hoy")
                    command = {
                            "lcdNumber" : {"value": 0}
                            }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

                #si la respuesta es un entero, quiere decir que solo hay un arnés
                elif isinstance(contresponse["ID"],int):
                    command = {
                            "lcdNumber" : {"value": 1}
                            }   
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

                #Si existe más de un registro (contresponse["ID"] es una lista)
                else:
                    #se eliminan los que se repiten en la búsqueda, para solo contar los arneses diferentes que hayan pasado
                    result = 0
                    for item in contresponse["RESULTADO"]:
                        print (item)
                        #si el arnés no está en la lista anteriormente, no suma

                        if item > 0:
                            result += 1
                    #si el contador revasa los 999, se seguirá mostrando este número, ya que si no se reinicia a 0
                    if result > 999:
                        command = {
                                "lcdNumber" : {"value": 999}
                                }
                    else:
                        command = {
                                "lcdNumber" : {"value": result} ## cantidad de arneses sin repetirse que han liberado el día de hoy
                                }
                        
                        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                ############################################################################################################
              
            except Exception as ex:
                print("Excepción al consultar los tableros en DB LOCAL Paralelo: ", ex)
