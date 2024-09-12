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
import pandas as pd
from manager.controller import inspections
from toolkit.admin import Admin       
import math
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
        self.reloj_mythread         = MyThreadReloj(self.model, self.process)
        self.reloj_mythread.start()

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

    #@pyqtSlot(str)
    #def chkQrBoxes(self, qr_box):
    #    pass

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

        self.model.cajas_a_desclampear = []
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
            "img_center" : "logo.jpg",
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
            "lcdNumber": {"value": 0, "visible": False},
            "lcdNumtiempo": {"value": 0, "visible": False},
            "lcdcronometro": {"visible": False},
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

        command["lcdNumber"] = {"value": 0, "visible": True}
        command["lcdNumtiempo"] = {"value": 0, "visible": True}
        command["lcdcronometro"] = {"visible": True}
        
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)


        if self.model.saliendo_config == True:
            self.model.saliendo_config = False
        else:

            print("CALCULO DE CONTEO ARNESES")

            try:
            
                turnos = {
                "1":["07-00","18-59"],
                "2":["19-00","06-59"],
                }
                horario_turno1={"7":0,
                            "8":0,
                            "9":0,
                            "10":0,
                            "11":0,
                            "12":0,
                            "13":0,
                            "14":0,
                            "15":0,
                            "16":0,
                            "17":0,
                            "18":0,
                            "19":0,
                            "20":0,
                            "21":0,
                            "22":0,
                            "23":0,
                            "00":0,
                            "01":0,
                            "02":0,
                            "03":0,
                            "04":0,
                            "05":0,
                            "06":0,
                            }
                print("endpoint = http://{}/contar/historial/FIN.format(self.model.server)")
                endpoint = "http://{}/contar/historial/FIN".format(self.model.server)
                response = requests.get(endpoint, data=json.dumps(turnos))
                response = response.json()
                print("response: ",response)
                print("Startup para mostrar conteo de arneses")
                command["lcdNumber"] = {"value": response["conteo"]}
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

                print("endpoint = http://{}/horaxhora/historial/FIN".format(self.model.server))
                endpoint = "http://{}/horaxhora/historial/FIN".format(self.model.server)
                response = requests.get(endpoint, data=json.dumps(turnos))
                response = response.json()
            
                print("calculando promedios con pd")

                arneses_turno=pd.DataFrame({'HM': response['HM'],
                        'INICIO': response['INICIO'],
                        'FIN': response['FIN'],
                        'RESULTADO': response['RESULTADO'],
                        'USUARIO': response['USUARIO']})
            
            
                arneses_turno['INICIO']=pd.to_datetime(arneses_turno['INICIO'])
                arneses_turno['FIN']=pd.to_datetime(arneses_turno['FIN'])
                arneses_turno['RESULTADO']=arneses_turno['RESULTADO'].astype("string")

                #Calcula Duración de ciclo de los arneses
                arneses_turno["INTERVALO"]=arneses_turno['FIN']-arneses_turno['INICIO']
            
                promedio_ciclo_turno=arneses_turno["INTERVALO"].mean().total_seconds() / 60
            
                # Obtener la parte entera y decimal
                parte_entera = int(promedio_ciclo_turno)
                parte_decimal = promedio_ciclo_turno - parte_entera
            
                # Convertir la parte decimal a segundos
                segundos = round(parte_decimal * 60)
                if segundos<10:
                    segundos="0"+str(segundos)
                tiempo_ciclo_promedio=str(parte_entera)+":"+str(segundos)

                command = {
                "lcdNumtiempo": {"label_name": "Tiempo Ciclo\n Promedio", "color":"#68FD94", "value": tiempo_ciclo_promedio}
                }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

            except Exception as ex:
                print("Error en el conteo ", ex)

            ############ FIN DE CALCULO DE CONTEO ARNESES

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

    def onExit(self, event):
        self.model.saliendo_config = True
        print("Saliendo de Config")

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
            "lbl_steps" : {"text": "Validando", "color": "black"},
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        self.model.cronometro_ciclo=True
        Timer(0.05, self.API_requests).start()

    def API_requests (self):
        try:

            ##################################### Formato Etiqueta ##########################################################

            print("||||||Estado de Sistema de Trazabilidad: ",self.model.config_data["trazabilidad"])
            self.model.pedido = None
            self.model.dbEvent = None
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

            ##################################################################################################################
            ##################################### Trazabilidad FAMX2 #########################################################

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

                                if "exception" in respTrazabilidad:
                                    sleep(0.1)
                                    respTrazabilidad = requests.post(endpointUpdate, data=json.dumps(entTrazabilidad))
                                    respTrazabilidad = respTrazabilidad.json()

                                    if "exception" in respTrazabilidad:
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

            ##################################################################################################################
            ################################## HISTORIAL PROCESADO ANTERIORMENTE #############################################
            procesado = False

            procesado = self.procesado_anteriormente()
            if procesado == True:
                return

            ##################################################################################################################
            ######################################### BUSQUEDA DE EVENTOS ####################################################

            print("Buscando evento de arnés")
            command = {
                "lbl_result" : {"text": "Buscando Evento de Arnés", "color": "green"},
                "lbl_steps" : {"text": "Encontrando Nivel Técnico", "color": "black"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

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
                        self.model.dbEvent = key
                        coincidencias += 1
                        print("En este Evento se encuentra la modularidad \n")
                        self.model.pedido = response
                        #self.model.pedido = {
                        #"PEDIDO"             : "ILX294243B1016847",
                        #"DATETIME"           : 2023-09-07 06:15:49,
                        #"MODULOS_VISION"     : {"INTERIOR": ["A2239060302", "A2239060602", "A2239061002", "A2943202701", "A2945400211", "A2945400312", "A2945400609", "A2945400808", "A2945400811", "A2945400913", "A2945401011", "A2945401112", "A2945401211", "A2945401303", "A2945401312", "A2945401405", "A2945401413", "A2945401512", "A2945401606", "A2945401608", "A2945401609", "A2945401808", "A2945401810", "A2945402005", "A2945402010", "A2945402103", "A2945402109", "A2945402200", "A2945402205", "A2945402210", "A2945402309", "A2945402410", "A2945402502", "A2945402505", "A2945402611", "A2945402810", "A2945402902", "A2945402905", "A2945403000", "A2945403011", "A2945403100", "A2945403105", "A2945403106", "A2945403109", "A2945403211", "A2945403300", "A2945403402", "A2945403405", "A2945403510", "A2945403511", "A2945403601", "A2945403805", "A2945403811", "A2945403900", "A2945404001", "A2945404109", "A2945404111", "A2945404205", "A2945404300", "A2945404311", "A2945404402", "A2945404511", "A2945404802", "A2945404805", "A2945404909", "A2945405102", "A2945405212", "A2945405300", "A2945405312", "A2945405314", "A2945405400", "A2945405402", "A2945405615", "A2945405908", "A2945406008", "A2945406108", "A2945406209", "A2945406302", "A2945406312", "A2945406313", "A2945406315", "A2945406500", "A2945406508", "A2945406608", "A2945406702", "A2945406808", "A2945406813", "A2945406902", "A2945406905", "A2945406912", "A2945407000", "A2945407001", "A2945407102", "A2945407108", "A2945407112", "A2945407113", "A2945407200", "A2945407210", "A2945407300", "A2945407308", "A2945407408", "A2945407410", "A2945407800", "A2945407810", "A2945408208", "A2945408308", "A2945408406", "A2945408507", "A2945408818", "A2945408901", "A2945409007", "A2945409010", "A2945409210", "A2945409311", "A2945409410", "A2945409610", "A2945409708", "A2945409800", "A2945409808", "A2948210600", "A2948210700", "A2948210800", "A2948210900", "A2948211000", "A2948211100", "A2948605800", "A2955452900", "A2975402001", "A2975407930", "A2975848403"]},
                        #"MODULOS_TORQUE"     : {"INTERIOR": ["A2239060302", "A2239060602", "A2239061002", "A2943202701", "A2945400211", "A2945400312", "A2945400609", "A2945400808", "A2945400811", "A2945400913", "A2945401011", "A2945401112", "A2945401211", "A2945401303", "A2945401312", "A2945401405", "A2945401413", "A2945401512", "A2945401606", "A2945401608", "A2945401609", "A2945401808", "A2945401810", "A2945402005", "A2945402010", "A2945402103", "A2945402109", "A2945402200", "A2945402205", "A2945402210", "A2945402309", "A2945402410", "A2945402502", "A2945402505", "A2945402611", "A2945402810", "A2945402902", "A2945402905", "A2945403000", "A2945403011", "A2945403100", "A2945403105", "A2945403106", "A2945403109", "A2945403211", "A2945403300", "A2945403402", "A2945403405", "A2945403510", "A2945403511", "A2945403601", "A2945403805", "A2945403811", "A2945403900", "A2945404001", "A2945404109", "A2945404111", "A2945404205", "A2945404300", "A2945404311", "A2945404402", "A2945404511", "A2945404802", "A2945404805", "A2945404909", "A2945405102", "A2945405212", "A2945405300", "A2945405312", "A2945405314", "A2945405400", "A2945405402", "A2945405615", "A2945405908", "A2945406008", "A2945406108", "A2945406209", "A2945406302", "A2945406312", "A2945406313", "A2945406315", "A2945406500", "A2945406508", "A2945406608", "A2945406702", "A2945406808", "A2945406813", "A2945406902", "A2945406905", "A2945406912", "A2945407000", "A2945407001", "A2945407102", "A2945407108", "A2945407112", "A2945407113", "A2945407200", "A2945407210", "A2945407300", "A2945407308", "A2945407408", "A2945407410", "A2945407800", "A2945407810", "A2945408208", "A2945408308", "A2945408406", "A2945408507", "A2945408818", "A2945408901", "A2945409007", "A2945409010", "A2945409210", "A2945409311", "A2945409410", "A2945409610", "A2945409708", "A2945409800", "A2945409808", "A2948210600", "A2948210700", "A2948210800", "A2948210900", "A2948211000", "A2948211100", "A2948605800", "A2955452900", "A2975402001", "A2975407930", "A2975848403"]},
                        #"MODULOS_ALTURA"     : {"INTERIOR": ["A2239060302", "A2239060602", "A2239061002", "A2943202701", "A2945400211", "A2945400312", "A2945400609", "A2945400808", "A2945400811", "A2945400913", "A2945401011", "A2945401112", "A2945401211", "A2945401303", "A2945401312", "A2945401405", "A2945401413", "A2945401512", "A2945401606", "A2945401608", "A2945401609", "A2945401808", "A2945401810", "A2945402005", "A2945402010", "A2945402103", "A2945402109", "A2945402200", "A2945402205", "A2945402210", "A2945402309", "A2945402410", "A2945402502", "A2945402505", "A2945402611", "A2945402810", "A2945402902", "A2945402905", "A2945403000", "A2945403011", "A2945403100", "A2945403105", "A2945403106", "A2945403109", "A2945403211", "A2945403300", "A2945403402", "A2945403405", "A2945403510", "A2945403511", "A2945403601", "A2945403805", "A2945403811", "A2945403900", "A2945404001", "A2945404109", "A2945404111", "A2945404205", "A2945404300", "A2945404311", "A2945404402", "A2945404511", "A2945404802", "A2945404805", "A2945404909", "A2945405102", "A2945405212", "A2945405300", "A2945405312", "A2945405314", "A2945405400", "A2945405402", "A2945405615", "A2945405908", "A2945406008", "A2945406108", "A2945406209", "A2945406302", "A2945406312", "A2945406313", "A2945406315", "A2945406500", "A2945406508", "A2945406608", "A2945406702", "A2945406808", "A2945406813", "A2945406902", "A2945406905", "A2945406912", "A2945407000", "A2945407001", "A2945407102", "A2945407108", "A2945407112", "A2945407113", "A2945407200", "A2945407210", "A2945407300", "A2945407308", "A2945407408", "A2945407410", "A2945407800", "A2945407810", "A2945408208", "A2945408308", "A2945408406", "A2945408507", "A2945408818", "A2945408901", "A2945409007", "A2945409010", "A2945409210", "A2945409311", "A2945409410", "A2945409610", "A2945409708", "A2945409800", "A2945409808", "A2948210600", "A2948210700", "A2948210800", "A2948210900", "A2948211000", "A2948211100", "A2948605800", "A2955452900", "A2975402001", "A2975407930", "A2975848403"]},
                        #"QR_BOXES"           : {"PDC-R": ["", false], "PDC-RMID": ["12239061502", true], "PDC-RS": ["", false], "PDC-D": ["12239060402", true], "PDC-P": ["12239060702", true], "MFB-P1": ["12975402001", true], "MFB-S": ["12235403215", true], "MFB-E": ["12975403015", true], "MFB-P2": ["12975407316", true]},
                        #"ACTIVE"             : 1}

            print("Coincidencias = ",coincidencias)
            if self.model.dbEvent != None:
                print("La Modularidad pertenece al Evento: ",self.model.dbEvent)
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

            ##################################################################################################################
            ############################################ PREPARACIÓN DE INFORMACIÓN DE ETIQUETA ###############################

            if not(self.ETIQUETA(self.model.qr_codes["HM"])): #de aquí se obtiene la información de la ETIQUETA y se llena la variable self.model.t_result
                command = {
                        "lbl_result" : {"text": "Arnés sin historial de torque", "color": "red"},
                        "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                        }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                self.nok.emit()
                return
            
            print("\nINICIO PROCESAMIENTO DE ARNÉS: ",strftime("%Y/%m/%d %H:%M:%S"))
            print("##############################################################################################################################")

            self.model.input_data["database"]["modularity_nuts"].clear() #se limpia la variable que guarda las tuercas a inspeccionar (sin cavidades de  tuercas vacías)
            self.model.input_data["database"]["modularity"].clear() #variable para guardar la infromación de los fusibles en las cavidades que no están vacías para el arnés

            ############################################ SE GENERAN TUERCAS QUE SE INSPECCIONARÁN ###############################
            
            #estado actual de cajas para inspección de tuercas habilitadas
            print("self.model.inspeccion_tuercas: ",self.model.inspeccion_tuercas)

            #variable para saber si al menos una tuerca está habilitada
            tuercas_habilitadas = False
            for caja in self.model.inspeccion_tuercas:
                if self.model.inspeccion_tuercas[caja] == True:
                    tuercas_habilitadas = True

            #si al menos una inspección de tuercas está habilitada...
            if tuercas_habilitadas == True:

                #aquí se revisa que se hayan leído datos de qué torques lleva, de lo contrario se deben consultar para armar las cajas de torque...
                #(En ambos casos se debe terminar con el contenido necesario para las cajas de torque)
                if self.model.valores_torques_red == False: #se revisa esta variable en la función ETIQUETA para saber si el arnés tiene esta información o no
                    print("se generan los torques que llevará el arnés a partir de la base de datos cargada en la estación...")
                    self.build_contenido_torques()

                else:
                    print("se generan los torques que llevará el arnés a partir de la tabla seghm_valores en servidor donde se guardaron resultados")
                    self.build_contenido_torques_from_results()
            else:
                print("no hay inspecciones de tuercas habilitadas")
            
            #EJEMPLO:::::::::::::::::::: self.model.input_data["database"]["modularity_nuts"]
            #{
            #    'MFB-P1': ['A41', 'A42', 'A43', 'A46'],
            #    'MFB-P2': ['A20', 'A21', 'A22', 'A23', 'A24', 'A25', 'A26', 'A29', 'A30'],
            #    'MFB-E': ['A1', 'A2', 'E1']
            #}

            ############################################ SE GENERAN FUSIBLES QUE SE INSPECCIONARÁN ###############################
            ##################################################################################################################
            
            print("se generan fusibles del arnés con DB local")
            self.build_contenido_fusibles()
            self.model.input_data["database"]["pedido"] = self.model.pedido

            # EJEMPLO:::::::::::::::::::: self.model.input_data["database"]["modularity"]
            #self.model.input_data["database"]["modularity"]:
            #{
            #    'PDC-S': ['1', '2', '3', '6'],
            #    'PDC-RMID': ['F401', 'F411', 'F413', 'F415', 'F416', 'F417', 'F418', 'F419', 'F420', 'F421', 'F430', 'F431', 'F432', 'F438', 'F439', 'F441', 'F443', 'F446', 'RELT', 'RELX'],
            #    'PDC-P': ['F300', 'F304', 'F305', 'F318', 'F319', 'F320', 'F321', 'F322', 'F323', 'F324', 'F326', 'F327', 'F328', 'F329', 'F332', 'F333', 'F335', 'MF1', 'MF2'],
            #    'PDC-D': ['F200', 'F204', 'F205', 'F209', 'F211', 'F213', 'F214', 'F215', 'F216', 'F217', 'F218', 'F219', 'F220', 'F221', 'F222', 'F223', 'F225', 'F226', 'F227', 'F229', 'F230', 'F231', 'F232'],
            #    'F96': ['F96'],
            #    'PDC-P2': ['CONECTOR1', 'CONECTOR2'],
            #    'PDC-Dbracket': ['bracket']
            #}

            # EJEMPLO:::::::::::::::::::: self.model.arnes_data:
            # {
            #     'PDC-S': {
            #         '3': 'azul',
            #         '1': 'beige',
            #         '6': 'beige',
            #         '2': 'verde'
            #     },
            #     'PDC-RMID': {
            #         'F419': 'naranja',
            #         'F441': 'beige',
            #         'F431': 'rojo',
            #         'F416': 'verde',
            #         'F417': 'verde',
            #         'F411': 'cafe',
            #         'F443': 'beige',
            #         'F446': 'beige',
            #         'F418': 'naranja',
            #         'F420': 'naranja',
            #         'F439': 'azul',
            #         'F438': 'cafe',
            #         'RELX': '1008695',
            #         'F430': 'azul',
            #         'RELT': '1010733',
            #         'F432': 'cafe',
            #         'F413': 'verde',
            #         'F415': 'verde',
            #         'F401': 'natural',
            #         'F421': 'verde'
            #     },
            #     'PDC-P': {
            #         'F305': 'beige',
            #         'F319': 'cafe',
            #         'MF1': 'cafe',
            #         'F321': 'cafe',
            #         'F328': 'verde',
            #         'F329': 'verde',
            #         'F333': 'verde',
            #         'F323': 'cafe',
            #         'F324': 'cafe',
            #         'F327': 'verde',
            #         'F304': 'beige',
            #         'F318': 'cafe',
            #         'F300': 'rojo',
            #         'F320': 'cafe',
            #         'F322': 'rojo',
            #         'F326': 'verde',
            #         'F332': 'rojo',
            #         'F335': 'natural',
            #         'MF2': 'beige'
            #     },
            #     'PDC-D': {
            #         'F216': 'natural',
            #         'F200': 'beige',
            #         'F204': 'rojo',
            #         'F209': 'verde',
            #         'F211': 'verde',
            #         'F213': 'beige',
            #         'F214': 'verde',
            #         'F215': 'verde',
            #         'F217': 'azul',
            #         'F218': 'beige',
            #         'F219': 'rojo',
            #         'F220': 'beige',
            #         'F221': 'azul',
            #         'F222': 'rojo',
            #         'F225': 'azul',
            #         'F226': 'cafe',
            #         'F227': 'beige',
            #         'F229': 'beige',
            #         'F230': 'beige',
            #         'F231': 'beige',
            #         'F232': 'beige',
            #         'F223': 'cafe',
            #         'F205': 'beige'
            #     },
            #     'F96': {
            #         'F96': 'cafe'
            #     }
            # }
            ################################ SE AGREGAN CAVIDADES VACÍAS ################################
                
            #se llena la variable modularity_fuses con todas las cavidades con fusibles vacíos
            self.model.modularity_fuses.update(copy(self.model.fuses_base))

            #AGREGAR TUERCAS de modularity_nuts EN modularity
            #si al menos una inspección de tuercas está habilitada...
            if tuercas_habilitadas == True:
                # Combinación de diccionarios
                combined_dict = self.model.input_data["database"]["modularity"].copy()
                for key, value in self.model.input_data["database"]["modularity_nuts"].items(): #modularity_nuts ya solamente trae las cajas de tuercas habilitadas
                    if key in combined_dict:
                        combined_dict[key] = list(set(combined_dict[key] + value))
                    else:
                        combined_dict[key] = value

                self.model.input_data["database"]["modularity"] = combined_dict

                for caja in self.model.input_data["database"]["modularity_nuts"]: # solo se agregarán los vacíos de las cajas con contenido de tuercas
                    if (not caja in self.model.modularity_fuses) and (self.model.inspeccion_tuercas[caja] == True): # de los que tienen contenido solamente los que estén habilitados para su inspección
                        self.model.modularity_fuses[caja] = self.model.nuts_base[caja]
                
                #modularity_nuts = {
                #   "caja1":["A21","A22"],
                #   "caja2":["A43"]
                #}
                #nuts_base = {
                #    "caja1" : {"A21":"nonut", "A22":"nonut"},
                #    "caja2" : {"A43":"nonut", "A44":"nonut"},
                #    "caja3" : {"E1":"nonut", "A1": "nonut", "A2"; "nonut"}
                #}
                #modularity_fuses = {
                #    "cajaR" : {"F300":"vacio", "F301":"vacio"},
                #    "cajaP" : {"F200":"vacio", "F205":"vacio"},
                #}
                ##cajas extra habilitadas para inspección:
                #inspeccion_tuercas = {
                #    "caja1": True,
                #    "caja2": False
                #}
                #for caja in modularity_nuts:
                #    if (not caja in modularity_fuses) and (inspeccion_tuercas[caja] == True):
                #        modularity_fuses[caja] = nuts_base[caja]

                #se agrega todo el contenido de tuercas obtenidas del datamatrix
                try:
                    for caja in self.model.input_data["database"]["modularity_nuts"]:
                        if self.model.inspeccion_tuercas[caja] == True:
                            for cavidad in self.model.input_data["database"]["modularity_nuts"][caja]:
                                if not(caja in self.model.arnes_data):
                                    self.model.arnes_data[caja] = {}
                                if not(cavidad in self.model.arnes_data[caja]):
                                    #self.model.arnes_data[caja][cavidad] = cavidad #se agrega contenido con su misma tuerca, "MFB-P2": {"A20" : "A20", "A21" : "A21"...}
                                    if (caja in self.model.nuts_fill) and (cavidad in self.model.nuts_fill[caja]):
                                        self.model.arnes_data[caja][cavidad] = self.model.nuts_fill[caja][cavidad] #se agrega contenido correspondiente, "MFB-P2": {"A20" : "conTuerca", "A21" : "conTuerca"...}
                                    else:
                                        self.model.arnes_data[caja][cavidad] = "conTuerca" #en cualquier caso extra se llenaría con el string "conTuerca"

                except Exception as ex:
                    print (ex)

                print("\n\nself.model.arnes_data ya con info de tuercas:\n",self.model.arnes_data)
                #EJEMPLO::::::: self.model.arnes_data ya con tuercas
                #{'PDC-S': {'3': 'azul', '1': 'beige', '6': 'beige', '2': 'verde'}, 'PDC-RMID': {'F419': 'naranja', 'F441': 'beige', 'F431': 'rojo', 'F416': 'verde', 'F417': 'verde', 'F411': 'cafe', 'F443': 'beige', 'F446': 'beige', 'F418': 'naranja', 'F420': 'naranja', 'F439': 'azul', 'F438': 'cafe', 'RELX': '1008695', 'F430': 'azul', 'RELT': '1010733', 'F432': 'cafe', 'F413': 'verde', 'F415': 'verde', 'F401': 'natural', 'F421': 'verde'}, 'PDC-P': {'F305': 'beige', 'F319': 'cafe', 'MF1': 'cafe', 'F321': 'cafe', 'F328': 'verde', 'F329': 'verde', 'F333': 'verde', 'F323': 'cafe', 'F324': 'cafe', 'F327': 'verde', 'F304': 'beige', 'F318': 'cafe', 'F300': 'rojo', 'F320': 'cafe', 'F322': 'rojo', 'F326': 'verde', 'F332': 'rojo', 'F335': 'natural', 'MF2': 'beige'}, 'PDC-D': {'F216': 'natural', 'F200': 'beige', 'F204': 'rojo', 'F209': 'verde', 'F211': 'verde', 'F213': 'beige', 'F214': 'verde', 'F215': 'verde', 'F217': 'azul', 'F218': 'beige', 'F219': 'rojo', 'F220': 'beige', 'F221': 'azul', 'F222': 'rojo', 'F225': 'azul', 'F226': 'cafe', 'F227': 'beige', 'F229': 'beige', 'F230': 'beige', 'F231': 'beige', 'F232': 'beige', 'F223': 'cafe', 'F205': 'beige'}, 'F96': {'F96': 'cafe'}, 'MFB-P2': {'A20': 'A20', 'A21': 'A21', 'A22': 'A22', 'A23': 'A23', 'A24': 'A24', 'A25': 'A25', 'A26': 'A26', 'A29': 'A29', 'A30': 'A30'}}
               

            #aquí modularity_fuses ya tiene todas la cavidades vacías que se inspeccionarán incluyendo fusibles y tuercas
            #se reemplaza todo el contenido de tuercas y fusibles vacíos por el que se obtuvo del datamatrix
            try:
                for caja in self.model.arnes_data:
                    for cavidad in self.model.arnes_data[caja]:
                        self.model.modularity_fuses[caja][cavidad] = self.model.arnes_data[caja][cavidad]

            except Exception as ex:
                print (ex)

            ################################ CONECTORES PDC-P2 & PDC-Dbracket ################################

            #Se agrega nueva inspeccion obligatoria para todos los arneses la caja 
            self.model.input_data["database"]["modularity"]["PDC-P2"] = ['CONECTOR1', 'CONECTOR2']
            #Se agrega nueva inspeccion obligatoria para todos los arneses el bracket de la caja PDCD
            self.model.input_data["database"]["modularity"]["PDC-Dbracket"] = ['bracket']
                
            ##################################################################################################

            #self.model.input_data["database"]["modularity"]    # variable que guarda un diccionario con las cajas de fusibles encontradas, pero cada clave contiene una lista de los fusibles (solamente el nombre de la cavidad)
            #self.model.arnes_data                              # variable que guarda un diccionario con cada caja del arnés, y cada una con claves de sus fusibles (cavidades) con valor de su color correspondiente
            #self.model.modularity_fuses                        # variable de diccionario con cada caja con el valor del color deseado para cada fusible y contando ya las cavidades vacías

            print("\n\n\n-------------------------------------TAREAS FINALES -----------------------------------")
            print("\n\n\t\tCOLECCIÓN:\n\t\tself.model.input_data[database][modularity]:\n\n", self.model.input_data["database"]["modularity"])
            print("\n\n\t\tself.model.arnes_data:\n\n ",self.model.arnes_data)
            print("\n\n\t\tmodularity_fuses:\n\n", self.model.modularity_fuses)
                
            # EJEMPLO::::::::::::::::::::
            #self.model.input_data["database"]["modularity"]:
            #{'PDC-S': ['1', '2', '3', '6'], 'PDC-RMID': ['F401', 'F411', 'F413', 'F415', 'F416', 'F417', 'F418', 'F419', 'F420', 'F421', 'F430', 'F431', 'F432', 'F438', 'F439', 'F441', 'F443', 'F446', 'RELT', 'RELX'], 'PDC-P': ['F300', 'F304', 'F305', 'F318', 'F319', 'F320', 'F321', 'F322', 'F323', 'F324', 'F326', 'F327', 'F328', 'F329', 'F332', 'F333', 'F335', 'MF1', 'MF2'], 'PDC-D': ['F200', 'F204', 'F205', 'F209', 'F211', 'F213', 'F214', 'F215', 'F216', 'F217', 'F218', 'F219', 'F220', 'F221', 'F222', 'F223', 'F225', 'F226', 'F227', 'F229', 'F230', 'F231', 'F232'], 'F96': ['F96'], 'PDC-P2': ['CONECTOR1', 'CONECTOR2'], 'PDC-Dbracket': ['bracket']}
            #self.model.arnes_data:
            #{'PDC-S': {'3': 'azul', '1': 'beige', '6': 'beige', '2': 'verde'}, 'PDC-RMID': {'F419': 'naranja', 'F441': 'beige', 'F431': 'rojo', 'F416': 'verde', 'F417': 'verde', 'F411': 'cafe', 'F443': 'beige', 'F446': 'beige', 'F418': 'naranja', 'F420': 'naranja', 'F439': 'azul', 'F438': 'cafe', 'RELX': '1008695', 'F430': 'azul', 'RELT': '1010733', 'F432': 'cafe', 'F413': 'verde', 'F415': 'verde', 'F401': 'natural', 'F421': 'verde'}, 'PDC-P': {'F305': 'beige', 'F319': 'cafe', 'MF1': 'cafe', 'F321': 'cafe', 'F328': 'verde', 'F329': 'verde', 'F333': 'verde', 'F323': 'cafe', 'F324': 'cafe', 'F327': 'verde', 'F304': 'beige', 'F318': 'cafe', 'F300': 'rojo', 'F320': 'cafe', 'F322': 'rojo', 'F326': 'verde', 'F332': 'rojo', 'F335': 'natural', 'MF2': 'beige'}, 'PDC-D': {'F216': 'natural', 'F200': 'beige', 'F204': 'rojo', 'F209': 'verde', 'F211': 'verde', 'F213': 'beige', 'F214': 'verde', 'F215': 'verde', 'F217': 'azul', 'F218': 'beige', 'F219': 'rojo', 'F220': 'beige', 'F221': 'azul', 'F222': 'rojo', 'F225': 'azul', 'F226': 'cafe', 'F227': 'beige', 'F229': 'beige', 'F230': 'beige', 'F231': 'beige', 'F232': 'beige', 'F223': 'cafe', 'F205': 'beige'}, 'F96': {'F96': 'cafe'}}
            #modularity_fuses:
            #{'PDC-D': {'F200': 'beige', 'F201': 'vacio', 'F202': 'vacio', 'F203': 'vacio', 'F204': 'rojo', 'F205': 'beige', 'F206': 'vacio', 'F207': 'vacio', 'F208': 'vacio', 'F209': 'verde', 'F210': 'vacio', 'F211': 'verde', 'F212': 'vacio', 'F213': 'beige', 'F214': 'verde', 'F215': 'verde', 'F216': 'natural', 'F217': 'azul', 'F218': 'beige', 'F219': 'rojo', 'F220': 'beige', 'F221': 'azul', 'F222': 'rojo', 'F223': 'cafe', 'F224': 'vacio', 'F225': 'azul', 'F226': 'cafe', 'F227': 'beige', 'F228': 'vacio', 'F229': 'beige', 'F230': 'beige', 'F231': 'beige', 'F232': 'beige'}, 'PDC-Dbracket': {'bracket': 'bracket1'}, 'PDC-P': {'MF1': 'cafe', 'MF2': 'beige', 'F301': 'vacio', 'F302': 'vacio', 'F303': 'vacio', 'F304': 'beige', 'F305': 'beige', 'F300': 'rojo', 'F318': 'cafe', 'F319': 'cafe', 'F320': 'cafe', 'F321': 'cafe', 'F322': 'rojo', 'F323': 'cafe', 'F324': 'cafe', 'F325': 'vacio', 'F326': 'verde', 'F327': 'verde', 'F328': 'verde', 'F329': 'verde', 'F330': 'vacio', 'F331': 'vacio', 'F332': 'rojo', 'F333': 'verde', 'F334': 'vacio', 'F335': 'natural', 'conector': 'conector'}, 'PDC-P2': {'CONECTOR1': 'conector1', 'CONECTOR2': 'conector2'}, 'PDC-R': {'F405': 'vacio', 'F404': 'vacio', 'F403': 'vacio', 'F402': 'vacio', 'F401': 'vacio', 'F400': 'vacio', 'F411': 'vacio', 'F410': 'vacio', 'F409': 'vacio', 'F408': 'vacio', 'F407': 'vacio', 'F406': 'vacio', 'F412': 'vacio', 'F413': 'vacio', 'F414': 'vacio', 'F415': 'vacio', 'F416': 'vacio', 'F417': 'vacio', 'F420': 'vacio', 'F419': 'vacio', 'F418': 'vacio', 'F421': 'vacio', 'F422': 'vacio', 'F423': 'vacio', 'F424': 'vacio', 'F425': 'vacio', 'F426': 'vacio', 'F430': 'vacio', 'F431': 'vacio', 'F437': 'vacio', 'F438': 'vacio', 'F439': 'vacio', 'F440': 'vacio', 'F441': 'vacio', 'F432': 'vacio', 'F433': 'vacio', 'F436': 'vacio', 'F442': 'vacio', 'F443': 'vacio', 'F444': 'vacio', 'F445': 'vacio', 'F446': 'vacio', 'F449': 'vacio', 'F448': 'vacio', 'F447': 'vacio', 'F450': 'vacio', 'F451': 'vacio', 'F452': 'vacio', 'F453': 'vacio', 'F454': 'vacio', 'F455': 'vacio', 'F456': 'vacio', 'F457': 'vacio', 'F458': 'vacio', 'F459': 'vacio', 'F460': 'vacio', 'F461': 'vacio', 'F462': 'vacio', 'F463': 'vacio', 'F464': 'vacio', 'F465': 'vacio', 'F466': 'vacio', 'F467': 'vacio', 'F468': 'vacio', 'F469': 'vacio', 'F470': 'vacio', 'F471': 'vacio', 'F472': 'vacio', 'F473': 'vacio', 'F474': 'vacio', 'F475': 'vacio', 'F476': 'vacio', 'F477': 'vacio', 'F478': 'vacio', 'F479': 'vacio', 'F480': 'vacio', 'F481': 'vacio', 'F482': 'vacio', 'RELU': 'vacio', 'RELT': 'vacio', 'RELX': 'vacio'}, 'PDC-RMID': {'F400': 'vacio', 'F401': 'natural', 'F402': 'vacio', 'F403': 'vacio', 'F404': 'vacio', 'F405': 'vacio', 'F411': 'cafe', 'F410': 'vacio', 'F409': 'vacio', 'F408': 'vacio', 'F407': 'vacio', 'F406': 'vacio', 'F412': 'vacio', 'F413': 'verde', 'F414': 'vacio', 'F415': 'verde', 'F416': 'verde', 'F417': 'verde', 'F420': 'naranja', 'F419': 'naranja', 'F418': 'naranja', 'F421': 'verde', 'F422': 'vacio', 'F423': 'vacio', 'F424': 'vacio', 'F425': 'vacio', 'F426': 'vacio', 'F430': 'azul', 'F431': 'rojo', 'F437': 'vacio', 'F438': 'cafe', 'F439': 'azul', 'F440': 'vacio', 'F441': 'beige', 'F432': 'cafe', 'F433': 'vacio', 'F436': 'vacio', 'F442': 'vacio', 'F443': 'beige', 'F444': 'vacio', 'F445': 'vacio', 'F446': 'beige', 'F450': 'vacio', 'F451': 'vacio', 'F452': 'vacio', 'F453': 'vacio', 'F454': 'vacio', 'F455': 'vacio', 'F456': 'vacio', 'F457': 'vacio', 'F458': 'vacio', 'F459': 'vacio', 'F460': 'vacio', 'F461': 'vacio', 'RELU': 'vacio', 'RELT': '1010733', 'F449': 'vacio', 'F448': 'vacio', 'F447': 'vacio', 'RELX': '1008695'}, 'PDC-RS': {'F400': 'vacio', 'F401': 'vacio', 'F402': 'vacio', 'F403': 'vacio', 'F404': 'vacio', 'F405': 'vacio', 'F411': 'vacio', 'F410': 'vacio', 'F409': 'vacio', 'F408': 'vacio', 'F407': 'vacio', 'F406': 'vacio', 'F412': 'vacio', 'F413': 'vacio', 'F414': 'vacio', 'F415': 'vacio', 'F416': 'vacio', 'F417': 'vacio', 'F420': 'vacio', 'F419': 'vacio', 'F418': 'vacio', 'F421': 'vacio', 'F422': 'vacio', 'F423': 'vacio', 'F424': 'vacio', 'F425': 'vacio', 'F426': 'vacio', 'F430': 'vacio', 'F431': 'vacio', 'F437': 'vacio', 'F438': 'vacio', 'F439': 'vacio', 'F440': 'vacio', 'F441': 'vacio', 'F432': 'vacio', 'F433': 'vacio', 'F436': 'vacio', 'F442': 'vacio', 'F443': 'vacio', 'F444': 'vacio', 'F445': 'vacio', 'F446': 'vacio', 'F450': 'vacio', 'F451': 'vacio', 'F452': 'vacio', 'F453': 'vacio', 'F454': 'vacio', 'F455': 'vacio', 'F456': 'vacio', 'F457': 'vacio', 'F458': 'vacio', 'F459': 'vacio', 'F460': 'vacio', 'F461': 'vacio', 'RELU': 'vacio', 'RELT': 'vacio', 'F449': 'vacio', 'F448': 'vacio', 'F447': 'vacio', 'RELX': 'vacio'}, 'PDC-S': {'1': 'beige', '2': 'verde', '3': 'azul', '4': 'vacio', '5': 'vacio', '6': 'beige'}, 'TBLU': {'1': 'vacio', '2': 'vacio', '3': 'vacio', '4': 'vacio', '5': 'vacio', '6': 'vacio', '7': 'vacio', '8': 'vacio', '9': 'vacio'}, 'F96': {'F96': 'cafe'}}

            self.model.datetime = datetime.now()

            #se regresa la variable de rework a False para preguntar en cada arnés...
            if self.model.local_data["qr_rework"]:
                self.model.local_data["qr_rework"] = False
            event = self.model.dbEvent.upper()
            evento = event.replace('_',' ')
            command = {
                "lbl_result" : {"text": "Datamatrix validado", "color": "green"},
                "lbl_steps" : {"text": "Iniciando Ciclo", "color": "black"},
                "statusBar" : self.model.pedido["PEDIDO"]+" "+self.model.qr_codes["HM"]+" "+evento,
                "cycle_started": True
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                
            self.model.contador_scan_pdcr = 1
            ###### OK EMIT
            self.ok.emit()

            ##################################################################################################################

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

    def procesado_anteriormente (self):
        print("buscando procesado_anteriormente")

        if self.model.local_data["qr_rework"] == False:
            command = {
                    "lbl_result" : {"text": "Revisando Historial de Arnés", "color": "green"},
                    "lbl_steps" : {"text": "Buscando HM Procesado", "color": "black"},
                    }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

            print(datetime.now())

            endpoint = "http://{}/api/get/historial/HM/=/{}/RESULTADO/=/2".format(self.model.server, self.model.qr_codes["HM"])
            response = requests.get(endpoint).json()

            print(datetime.now())

            #si response tiene items y esta es response["items"] = False (NO se encontró un arnés previamente en el historial),
            #o si está qr_rework en True (ya fue aprobado), entonces NO se emite self.rework (esto te llevaría a esperar llave para confirmar).
            #si no entra a rework.emit, quiere decir que no tiene historial y continúa normalmente...
            if not(("items" in response and response["items"] == False) or (self.model.local_data["qr_rework"] == True)):
                #se va a el estado rework
                print("se trata de un retrabajo, yendo a estado rework para pedir llave")
                self.rework.emit()
                return True
            else:
                print("no se encontró arnés procesado anteriormente, continunando normalmente...")

    def build_contenido_torques_from_results (self):
        print("\nbuild_contenido_torques_from_results")
        try:
            print("se acomodan los queue necesarios para las cajas de torque con la información de la tabla en red: valores")
            print("self.model.t_result: ",self.model.t_result)

            #EJEMPLO DE CONTENIDO DE VARIABLES:
            #self.model.t_result:  
            #{'PDC-P': {'E1': 8.02}, 
            #'PDC-D': {'E1': 8.0}, 
            #'BATTERY': {'BT': 6.54}, 
            #'BATTERY-2': {'BT': None}, 
            #'MFB-P1': {'A47': None, 'A46': 16.04, 'A45': None, 'A44': None, 'A43': 8.02, 'A41': 16.1, 'A42': 7.99}, 
            #'MFB-S': {'A51': None, 'A52': None, 'A53': None, 'A54': None, 'A55': None, 'A56': None}, 
            #'MFB-E': {'E1': None, 'A1': None, 'A2': None}, 
            #'MFB-P2': {'A20': 16.13, 'A21': 8.04, 'A22': 8.0, 'A23': None, 'A24': 8.02, 'A25': 16.07, 
            #           'A26': 8.04, 'A27': None, 'A28': None, 'A29': 8.0, 'A30': 16.0}, 
            #'PDC-R': {'E1': None}, 'PDC-RS': {'E1': None}, 'PDC-RMID': {'E1': 16.19}}

            #self.model.t_resultAngle:  {'PDC-P': {'E1': 31.0}, 'PDC-D': {'E1': 37.7}, 'BATTERY': {'BT': 21.5}, 'BATTERY-2': {'BT': None}, 'MFB-P1': {'A47': None, 'A46': 46.1, 'A45': None, 'A44': None, 'A43': 24.0, 'A41': 46.6, 'A42': 34.5}, 'MFB-S': {'A51': None, 'A52': None, 'A53': None, 'A54': None, 'A55': None, 'A56': None}, 'MFB-E': {'E1': None, 'A1': None, 'A2': None}, 'MFB-P2': {'A20': 35.1, 'A21': 34.7, 'A22': 23.0, 'A23': None, 'A24': 26.9, 'A25': 31.4, 'A26': 22.5, 'A27': None, 'A28': None, 'A29': 22.3, 'A30': 43.3}, 'PDC-R': {'E1': None}, 'PDC-RS': {'E1': None}, 'PDC-RMID': {'E1': 31.3}}

            #self.model.lista_cajas_torque = ["MFB-P2","MFB-P1","MFB-S","MFB-E"]
            lista_cajas = self.model.lista_cajas_torque
            queue_tuercas = self.model.input_data["database"]["modularity_nuts"] #inicia vacío queue_tuercas = {}

            for caja in lista_cajas:
                if (caja in self.model.t_result) and (self.model.inspeccion_tuercas[caja] == True): #si se encuentra la caja en los resultados, y está habilitada su inspección
                    for tuerca in self.model.t_result[caja]:
                        if str(self.model.t_result[caja][tuerca]).upper() != "NONE":
                            if not(caja in queue_tuercas):
                                queue_tuercas[caja] = []
                            queue_tuercas[caja].append(tuerca)

            command = {
                "lbl_result" : {"text": "Torques Generados Correctamente", "color": "green"},
                "lbl_steps" : {"text": "Generando Combinación de Fusibles", "color": "black"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

            print("-------------------------------------TAREAS: TUERCAS -----------------------------------")
            print("self.model.input_data[database][modularity_nuts]: ",self.model.input_data["database"]["modularity_nuts"])

            print("modularity_nuts terminado correctamente desde seghm_valores, continuando...")

        except Exception as ex:
            self.model.input_data["database"]["modularity_nuts"].clear()
            print("build_content_torques_from_results exception: ", ex)
            command = {
                    "lbl_result" : {"text": "Error de Carga en Tuercas de Arnés", "color": "red", "font": "40pt"},
                    "lbl_steps" : {"text": "Generando desde DB local...", "color": "black", "font": "22pt"}
                    }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.build_contenido_torques()
            return

    def build_contenido_torques (self):
        print("\nbuild_contenido_torques")
        try:
                #se leen los módulos de Torque cargados en la estación
                modules = json.loads(self.model.pedido["MODULOS_TORQUE"])
                modules = modules[list(modules)[0]]

                print("\n\t+++++++++++MODULARIDAD REFERENCIA+++++++++++\n",self.model.qr_codes["REF"])
                print(f"\n\t\tMODULOS_TORQUE PARA ESTA REFERENCIA:\n{modules}")

                #################################################################### TORQUE CONSULTA ####################################################################

                endpoint = "http://{}/api/get/{}/modulos_torques/all/_/_/_/_/_".format(self.model.server, self.model.dbEvent)
                response = requests.get(endpoint).json()

                if "MODULO" in response:
                    pass
                else:
                    command = {
                            "lbl_result" : {"text": "Modulos de torque no encontrados", "color": "red"},
                            "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                            }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    self.nok.emit()
                    return

                modulos_de_evento = {} #se inicializa variable vacía para guardar contenido de evento

                contenido = list(response.keys())
                contenido.pop(contenido.index("ID"))
                contenido.pop(contenido.index("MODULO"))
                print("contenido: ",contenido) #se deja la lista contenido solamente con las cajas
                
                #response[MODULO] contiene una lista de los modulos que existen para este evento
                for modulo in response['MODULO']:
                    modulo = modulo.replace(" ","") #se eliminan los espacios
                    modulos_de_evento[modulo] = {} #se crea el diccionario vacío para ese módulo
                    indice_modulo = response['MODULO'].index(modulo) #se obtiene el indice en la lista del módulo
                    for caja in contenido:
                        #si la caja en su indice igual al del módulo está vacío, no hace nada, de lo contrario se agrega el dato
                        if response[caja][indice_modulo] != "" and response[caja][indice_modulo] != "{}" and response[caja][indice_modulo] != 0:
                            modulos_de_evento[modulo][caja] = response[caja][indice_modulo]

                #los modulos vacíos deben ir en el resultado final para saber cuando un módulo que lleve la modularidad no significa torque o fusible
                #print("modulos_de_evento")
                #pprint.pprint(modulos_de_evento)

                for modulo in modules:
                    if modulo in modulos_de_evento:
                        temp = {} #se reinicia temp en cada modulo
                        for elemento in modulos_de_evento[modulo]: #elemento son los valores de las columnas CAJA_1,CAJA_2,etc de la tabla de modulos del evento correspondientes al módulo actual
                            if "CAJA_" in elemento:
                                #se agregan a la variable temp todos los contenidos de CAJA_1,CAJA_2,etc. del módulo que se está evaluando
                                temp.update(json.loads(modulos_de_evento[modulo][elemento]))
                        for caja in temp:
                            caja_nueva = False
                            #ejemplo: temp = { CAJA_1:{}, CAJA_2:{"MFB-P2": {"A22": true,"A23": true}} }
                            #si el contenido del elemento es vacío: CAJA_1:{} entonces se inspecciona el siguiente: CAJA_2:{"MFB-P2": {"A22": true,"A23": true}}
                            if len(temp[caja]) == 0:
                                continue
                            #si la caja actual dentro de temp si tiene contenido...
                            else:
                                #si se trata de una de las cajas válidas para inspección de torque, y está habilitada la inspección de esta caja
                                if (caja in self.model.lista_cajas_torque) and (self.model.inspeccion_tuercas[caja] == True):

                                    #se recorren las tuercas de la caja: MFB-P2": {"A22": true,"A23": true}
                                    for tuerca in temp[caja]:
                                        #si la tuerca está activa, tiene true...
                                        if temp[caja][tuerca] == True:

                                            #si la caja no existe aún en la variable del modelo...
                                            if not(caja in self.model.input_data["database"]["modularity_nuts"]):
                                                self.model.input_data["database"]["modularity_nuts"][caja] = [] #se agrega la nueva caja

                                            #si no existe la tuerca en la caja de modularity_nuts...
                                            if not(tuerca in self.model.input_data["database"]["modularity_nuts"][caja]):
                                                self.model.input_data["database"]["modularity_nuts"][caja].append(tuerca)#se agrega la tuerca en esta caja

                                    self.model.input_data["database"]["modularity_nuts"][caja].sort()

                    else:
                        command = {
                                "lbl_result" : {"text": "Modulo de Torque NO encontrado", "color": "red"},
                                "lbl_steps" : {"text": f"{modulo}, Inténtalo de nuevo", "color": "black"}
                                }
                        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                        self.nok.emit()
                        return
                    
                print("-------------------------------------TAREAS: TUERCAS -----------------------------------")
                print("\n\n\t\tself.model.input_data[database][modularity_nuts]:\n",self.model.input_data["database"]["modularity_nuts"])

                command = {
                    "lbl_result" : {"text": "Torques Generados Correctamente", "color": "green"},
                    "lbl_steps" : {"text": "Generando Combinación de Fusibles", "color": "black"}
                    }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                print("modularity_nuts terminado correctamente, continuando...")

        except Exception as ex:
            self.model.input_data["database"]["modularity_nuts"].clear()
            print("build_content_torques exception: ", ex)
            command = {
                    "lbl_result" : {"text": "Error de Carga en Tuercas de Arnés", "color": "red", "font": "40pt"},
                    "lbl_steps" : {"text": "Intentelo de Nuevo", "color": "black", "font": "22pt"}
                    }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.nok.emit()
            return

    def build_contenido_fusibles (self):
        print("\nbuild_contenido_fusibles")
        try:

            #se leen los módulos de Torque cargados en la estación
            modules = json.loads(self.model.pedido["MODULOS_VISION"])
            modules = modules[list(modules)[0]]

            print("\n\t+++++++++++MODULARIDAD REFERENCIA+++++++++++\n",self.model.qr_codes["REF"])
            print(f"\n\t\tMODULOS_FUSIBLES PARA ESTA REFERENCIA:\n{modules}")

            #Consulta a la API para ver cuales son los módulos Determinantes de cajas PDC-R y guardarlas en una variable que se utilizará más adelante.
            endpoint = "http://{}/api/get/{}/pdcr/variantes".format(self.model.server, self.model.dbEvent)
            pdcrVariantes = requests.get(endpoint).json()
            print("Lista Final de Variantes PDC-R:\n",pdcrVariantes)

            flag_s = False
            flag_m = False
            flag_l = False

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

            #################################################################### FUSIBLES CONSULTA ####################################################################

            endpoint = "http://{}/api/get/{}/modulos_fusibles/all/_/_/_/_/_".format(self.model.server, self.model.dbEvent)
            response = requests.get(endpoint).json()

            if "MODULO" in response:
                pass
            else:
                command = {
                        "lbl_result" : {"text": "Modulos de fusibles no encontrados", "color": "red"},
                        "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                        }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                self.nok.emit()
                return

            modulos_de_evento = {} #se inicializa variable vacía para guardar contenido de evento

            contenido = list(response.keys())
            contenido.pop(contenido.index("ID"))
            contenido.pop(contenido.index("MODULO"))
            print("contenido: ",contenido) #se deja la lista contenido solamente con las cajas
                
            #response[MODULO] contiene una lista de los modulos que existen para este evento
            for modulo in response['MODULO']:
                modulo = modulo.replace(" ","") #se eliminan los espacios
                modulos_de_evento[modulo] = {} #se crea el diccionario vacío para ese módulo
                indice_modulo = response['MODULO'].index(modulo) #se obtiene el indice en la lista del módulo
                for caja in contenido:
                    #si la caja en su indice igual al del módulo está vacío, no hace nada, de lo contrario se agrega el dato
                    if response[caja][indice_modulo] != "" and response[caja][indice_modulo] != "{}" and response[caja][indice_modulo] != 0:
                        modulos_de_evento[modulo][caja] = response[caja][indice_modulo]

            #los modulos vacíos deben ir en el resultado final para saber cuando un módulo que lleve la modularidad no significa torque o fusible
            #print("modulos_de_evento")

            #variable para guardar toda la información de la configuración del arnés (Fusibles que sí lleva, en forma de diccionario)
            self.model.arnes_data = {}

            for modulo in modules:
                if modulo in modulos_de_evento:
                    temp = {} #se reinicia temp en cada modulo
                    for elemento in modulos_de_evento[modulo]: #elemento son los valores de las columnas CAJA_1,CAJA_2,etc de la tabla de modulos del evento correspondientes al módulo actual
                        if "CAJA_" in elemento:
                            #se agregan a la variable "temp" todos los contenidos de CAJA_1,CAJA_2,etc. del módulo que se está evaluando
                            #(cada contenido de cada CAJA_ es un diccionario con una caja, sus fusibles y valores)

                            elemento_dict = json.loads(modulos_de_evento[modulo][elemento]) #se convierte el string en diccionario ej: '{"PDC-R": {"F416": "verde", "F417": "verde"}}'
                            if len(elemento_dict): #ya que puede tratarse de una caja vacía con "{}"
                                old_key = list(elemento_dict.keys())[0] #cada CAJA_ solamente tiene una caja, equivalente a una key
                                if "PDC-R" in old_key:
                                    value = elemento_dict[old_key]
                                    if "F96" in value:
                                        elemento_dict = {"F96": value} #obteniendo del string: '{"PDC-RMID": {"F96": "cafe"}}' un diccionario: {'F96': {'F96': 'cafe'}}
                                    else:
                                        elemento_dict = {self.model.pdcrvariant: value} #se reemplaza lo que tenga que ver con PDC-R por la variante dominante

                            temp.update(elemento_dict) #se agrega diccionario a temp

                    for caja in temp:
                        caja_nueva = False
                        #ejemplo: temp = { CAJA_1:{}, CAJA_2:{"PDC-P": {"F328": "verde", "F329": "verde"}} }
                        #si el contenido del elemento es vacío: CAJA_1:{} entonces se inspecciona el siguiente: CAJA_2:{"PDC-P": {"F328": "verde", "F329": "verde"}}
                        if len(temp[caja]) == 0:
                            continue
                        #si la caja actual dentro de temp si tiene contenido...
                        else:
                            #si se trata de una de las cajas válidas para inspección de fusibles
                            if caja in self.model.lista_cajas_fusibles:

                                #se recorren los fusibles de la caja: PDC-P": {"PDC-P": {"F328": "verde", "F329": "verde"}}
                                for cavidad in temp[caja]:

                                    #nunca debería de llega una información de la base de datos de los modulos con un vacío, pero si llegara, no entrará al if
                                    if temp[caja][cavidad] != "vacio":

                                        #si la caja no existe aún en el diccionario
                                        if not(caja in self.model.arnes_data):
                                            self.model.arnes_data[caja] = {} #se agrega la nueva caja como diccionario

                                        #si la caja no existe aún en la variable del modelo...
                                        if not(caja in self.model.input_data["database"]["modularity"]):
                                            self.model.input_data["database"]["modularity"][caja] = [] #se agrega la nueva caja como lista

                                        ############ aquí ya nos aseguramos que exista la caja ############

                                        #si no existe la cavidad en la lista de la caja de modularity...
                                        if not(cavidad in self.model.arnes_data[caja]):
                                            self.model.arnes_data[caja][cavidad] =  temp[caja][cavidad] #se agrega "F328": "verde"

                                        #si no existe la cavidad en la lista de la caja de modularity...
                                        if not(cavidad in self.model.input_data["database"]["modularity"][caja]):
                                            self.model.input_data["database"]["modularity"][caja].append(cavidad)#se agrega la cavidad "F328"

                                self.model.input_data["database"]["modularity"][caja].sort()

                else:
                    command = {
                            "lbl_result" : {"text": "Modulo de Fusible NO encontrado", "color": "red"},
                            "lbl_steps" : {"text": f"{modulo}, Inténtalo de nuevo", "color": "black"}
                            }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    self.nok.emit()
                    return
                    
            print("-------------------------------------TAREAS: FUSIBLES A INSPECCIONAR -----------------------------------")
            print("\n\n\t\tself.model.input_data[database][modularity]:\n", self.model.input_data["database"]["modularity"])
            print("\n\n\t\tself.model.arnes_data:\n ",self.model.arnes_data)

            command = {
                "lbl_result" : {"text": "Fusibles Generados Correctamente", "color": "green"},
                "lbl_steps" : {"text": "Generando Arnés", "color": "green"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

            print("modularity terminado correctamente, continuando...")

        except Exception as ex:
            self.model.input_data["database"]["modularity"].clear()
            print("build_content_fusibles exception: ", ex)
            command = {
                    "lbl_result" : {"text": "Error de Carga en Fusibles de Arnés", "color": "red", "font": "40pt"},
                    "lbl_steps" : {"text": "Intentelo de Nuevo", "color": "black", "font": "22pt"}
                    }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.nok.emit()
            return

    def ETIQUETA(self, ID):
        #Función para buscar el HM obtenido de la etiqueta (Consulta para saber si tiene historial de torque, y jalar sus resultados)

        print("self.ETIQUETA()")
        command = {
                "lbl_result" : {"text": "Buscando Historial para Etiqueta", "color": "green"},
                "lbl_steps" : {"text": "Incluir en Etiqueta Final", "color": "black"}
                }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        #Si la Trazabilida está ACTIVADA, busca los resultados de torque en el servidor de FAMX2
        print("BUSCANDO RESULTADOS DE TORQUE EN |||SISTEMA DE TRAZABILIDAD|||")
        try:
            endpoint = "http://{}/server_famx2/get/seghm_valores/HM/=/{}/RESULTADO/=/1".format(self.model.server, ID)
            response = requests.get(endpoint).json()

            if ("exception" in response):
                print("No se encontraron valores en el arnés por lo tanto no se podrán generar las cajas que lleva desde aquí...")
                self.model.valores_torques_red = False
            else:
                print("Sí se encontraros valores en el arnés, se generarán las cajas desde estos valores de torque del servidor")
                self.model.valores_torques_red = True

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
                if "HM" in qr_leido or "EL." in qr_leido:
                    command = {
                    "lbl_result" : {"text": "Qr Incorrecto, Esperado: A" + self.model.qr_esperado, "color": "red"},
                    "lbl_steps" : {"text": "Intento " + str(self.model.contador_scan_pdcr) + " de " + str(self.model.max_pdcr_try), "color": "orange"},
                    }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

                else:
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
        self.model.cronometro_ciclo=False
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
                if "exception" in respTrazabilidad:
                    sleep(0.1)
                    resp = requests.post(endpoint, data=json.dumps(trazabilidad))
                    resp = resp.json()

                    if "exception" in respTrazabilidad:
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
        self.model.reset()
        self.model.cronometro_ciclo=False

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

class MyThreadReloj(QThread):

    #check_material = pyqtSignal()

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model  = model

        print("MyThreadReloj")
        print("se crea un objeto de la clase MyThread con padre QThread")
        print("con entrada del objeto model de la clase model que está en model.py")
        print("y el objeto client de la clase MqttClient que está en comm.py")
        
    def run(self):

        fechaActual = self.model.get_currentTime() #se obtiene la fecha desde el servidor por primera vez
        print("update pedido desde MyThreadReloj inicial")
        segundos=0
        minutos=0
        while 1:

            #tiempo de espera para no alentar las ejecuciones de otros procesos
            sleep(1)
            if self.model.cronometro_ciclo==True:
                 segundos+=1
                 if segundos >= 60:
                     segundos=0
                     minutos+=1 
                 if segundos<10:
                     segundos_str="0"+str(segundos)
                 else:
                     segundos_str=str(segundos)
                 tiempo_transcurrido=str(minutos)+":"+str(segundos_str)
                 
                 command = {
                     "lcdcronometro" : {"value": str(tiempo_transcurrido)},
                           }
            #    ##command["lcdNumbertiempo"] = {"value": tiempo_transcurrido}
            #    ##command["label_name"] = {"cronómetro": tiempo_transcurrido}
            #    #
                 publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            else:
                segundos=0
                minutos=0
            fechaLocalActual = datetime.now() #se actualiza la fecha local Actual
            fechaActual = self.model.update_fecha_actual(fechaLocalActual,fechaActual)

            #td = timedelta(1)
            #beforefechaActual = fechaActual - td
            #afterfechaActual = fechaActual + td
            #hoy = fechaActual.strftime('%Y-%m-%d')
            #mañana = afterfechaActual.strftime('%Y-%m-%d')
            #hora_actual = fechaActual.time()

            command = {
                    "lbl_clock":{"fecha":str(fechaActual)},
                    }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)      
            
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
                
       
                ############################################################################################################
              
            except Exception as ex:
                print("Excepción al consultar los tableros en DB LOCAL Paralelo: ", ex)
