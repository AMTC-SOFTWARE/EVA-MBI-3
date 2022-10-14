from PyQt5.QtCore import QState, pyqtSignal, QTimer
from paho.mqtt import publish
from datetime import datetime
from threading import Timer
from os.path import exists
from time import strftime
from pickle import load
from copy import copy
import requests
import json

from toolkit.admin import Admin
"""
#se comenta basics.py, ya que no está en uso

class Startup(QState):
    ok  = pyqtSignal()

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, event):

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
            "lbl_result" : {"text": "Se requiere un login para continuar", "color": "green"},
            "lbl_steps" : {"text": "Ingresa tu código de acceso", "color": "black"},
            "lbl_user" : {"type":"", "user": "", "color": "black"},
            "img_user" : "blanco.jpg",
            "img_nuts" : "blanco.jpg",
            "img_center" : "logo.jpg"
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        #QTimer.singleShot(5000, self.kioskMode)
        QTimer.singleShot(11000, self.hidenVisycam)
        self.robot.stop()
        self.ok.emit()

    def kioskMode(self):
        system("taskkill /f /im explorer.exe")

    def hidenVisycam(self):
        publish.single("visycam/set",json.dumps({"window" : False}),hostname='127.0.0.1', qos = 2)

    def logout(self, user):
        try:
            data = {
                "NAME": user["name"],
                "GAFET": user["pass"],
                "TYPE": user["type"],
                "LOG": "LOGOUT",
                "DATETIME": strftime("%Y/%m/%d %H:%M:%S"),
                }
            resp = requests.post("http://localhost:5000/api/post/login",data=json.dumps(data))
        except Exception as ex:
            print("Logout Exception: ", ex)


class Login (QState):
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model
    def onEntry(self, event):
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
        command = {
            "lbl_result" : {"text": "ID recibido", "color": "green"},
            "lbl_steps" : {"text": "Validando usuario...", "color": "black"},
            "show":{"login": False}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        Timer(0.05,self.API_requests).start()

    def API_requests (self):
        try:
            endpoint = ("http://localhost:5000/api/get/usuarios/GAFET/=/{}/ACTIVE/=/1".format(self.model.input_data["gui"]["ID"]))
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
                resp = requests.post("http://localhost:5000/api/post/login",data=json.dumps(data))

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
        self.clamps = True

    def onEntry(self, event):
        self.model.reset()
        command = {
            "lbl_info1" : {"text": "", "color": "black"},
            "lbl_info2" : {"text": "", "color": "green"},
            "lbl_info3" : {"text": "", "color": "black"},
            "lbl_nuts" : {"text": "", "color": "orange"},
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
            self.clamps = False
            QTimer.singleShot(3000, self.fuseBoxesClamps)

        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        if not(self.model.shutdown):
            self.ok.emit()

    def fuseBoxesClamps (self):
        command = {}
        for i in self.model.torque_cycles:
             command[i] = self.clamps
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
            resp = requests.post("http://localhost:5000/api/post/login",data=json.dumps(data))
        except Exception as ex:
            print("Logout Exception: ", ex)


class Config (QState):
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.admin = None

    def onEntry(self, event):

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
        command = {
            "lbl_result" : {"text": "Datamatrix escaneado", "color": "green"},
            "lbl_steps" : {"text": "Validando", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        Timer(0.05, self.API_requests).start()

    def API_requests (self):
        try:
            pedido = None
            self.model.qr_codes["FET"] = self.model.input_data["gui"]["code"]
            temp = self.model.input_data["gui"]["code"].split (" ")
            self.model.qr_codes["HM"] = "--"
            self.model.qr_codes["REF"] = "--"
            for i in temp:
                if "HM" in i:
                    self.model.qr_codes["HM"] = i
                if "ILX" in i:
                    self.model.qr_codes["REF"] = i
            endpoint = "http://localhost:5000/api/get/pedidos/PEDIDO/=/{}/ACTIVO/=/1".format(self.model.qr_codes["HM"])
            response = requests.get(endpoint).json()
            if "PEDIDO" in response:
                if type(response["PEDIDO"]) != list: 
                    if response["ACTIVO"]:
                        pedido = response
                    else:
                        command = {
                                    "lbl_result" : {"text": "Datamatrix desactivado", "color": "red"},
                                    "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                                  }
                        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                        self.nok.emit()
                        return
                else: 
                    command = {
                                "lbl_result" : {"text": "Datamatrix redundante", "color": "red"},
                                "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                              }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    self.nok.emit()
                    return
            
            else:
                command = {
                        "lbl_result" : {"text": "Datamatrix no registrado", "color": "green"},
                        "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                        }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                self.nok.emit()
                return

            endpoint = "http://localhost:5000/api/get/historial/PEDIDO/=/{}/RESULTADO/=/1".format(pedido["ID"])
            response = requests.get(endpoint).json()

            if ("items" in response and not(response["items"])) or self.model.local_data["qr_rework"]:
                modules = json.loads(pedido["MODULOS_VISION"])
                modules = modules[list(modules)[0]]
                print(f"\n\t\tMODULOS_VISION:\n{modules}")
                for i in modules:
                    endpoint = "http://localhost:5000/api/get/modulos_fusibles/MODULO/=/{}/_/=/_".format(i)
                    response = requests.get(endpoint).json()
                    if "MODULO" in response:
                        if type(response["MODULO"]) != list:
                            temp = {}
                            for i in response:
                                if "CAJA_" in i:
                                    temp.update(json.loads(response[i]))
                            for i in temp:
                                if len(temp[i]) == 0:
                                    continue
                                if not(i in self.model.input_data["database"]["modularity"]):
                                    newBox = True
                                for j in temp[i]:
                                    if temp[i][j] == True:
                                        if newBox:
                                            self.model.input_data["database"]["modularity"][i] = []
                                            newBox = False
                                        if not(j in self.model.input_data["database"]["modularity"][i]):
                                            self.model.input_data["database"]["modularity"][i].append(j)
                                if not(newBox):
                                    self.model.input_data["database"]["modularity"][i].sort()
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
                print("\t\tCOLECCIÓN:\n", self.model.input_data["database"]["modularity"])
                self.model.input_data["database"]["pedido"] = pedido
                self.model.datetime = datetime.now()
                if self.model.local_data["qr_rework"]:
                    self.model.local_data["qr_rework"] = False
                command = {
                    "lbl_result" : {"text": "Datamatrix OK", "color": "green"},
                    "lbl_steps" : {"text": "Comenzando inspección", "color": "black"},
                    "statusBar" : pedido["PEDIDO"],
                    "cycle_started": True
                    }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                Timer(0.1, self.fuseBoxesClamps).start()
                self.ok.emit()
            else:
                self.rework.emit()
                return

        except Exception as ex:
            print("Datamatrix request exception: ", ex) 
            temp = f"Database Exception: {ex.args}"
            command = {
                        "lbl_result" : {"text": temp, "color": "red"},
                        "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                        }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.model.input_data["database"]["modularity"].clear()
            self.nok.emit()


    def fuseBoxesClamps (self):
        command = {}
        for i in self.model.torque_cycles:
             command[i] = self.clamps
        publish.single(self.model.pub_topics["plc"],json.dumps(command),hostname='127.0.0.1', qos = 2)


    def fuseBoxesClamps (self):
        command = {}
        master_qr_boxes = json.loads(self.model.input_data["database"]["pedido"]["QR_BOXES"])
        print(f"\t\tQR_BOXES:\n{master_qr_boxes}\n")
        for i in self.model.BB:
            command[i] = False
            if i in self.model.input_data["database"]["modularity"]:
                if i in master_qr_boxes:
                    if not(master_qr_boxes[i][1]):
                        command[i] = True
                else:
                    command[i] = True
        publish.single(self.model.pub_topics["plc"],json.dumps(command),hostname='127.0.0.1', qos = 2)


class QrRework (QState):
    ok = pyqtSignal()
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

        self.model.transitions.key.connect(self.rework)
        self.model.transitions.code.connect(self.noRework)

    def onEntry(self, QEvent):
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
        historial = {
            "PEDIDO": self.model.input_data["database"]["pedido"]["ID"],
            "RESULTADO": "1",
            "VISION": self.model.v_result,
            "ALTURA":self.model.h_result,
            "INTENTOS_VA": self.model.tries,
            "TORQUE": {},
            "INTENTOS_T": {},
            "SERIALES": self.model.qr_codes,
            "INICIO": self.model.datetime.isoformat(),
            "FIN": strftime("%Y/%m/%d %H:%M:%S"),
            "USUARIO": self.model.local_data["user"]["type"] + ": " + self.model.local_data["user"]["name"],
            "NOTAS": {"VISION": ["OK"], "ALTURA": ["OK"]},
            "SCRAP": {}
            }

        resp = requests.post("http://localhost:5000/api/post/historial",data=json.dumps(historial))
        resp = resp.json()

        if "items" in resp:
            if resp["items"] == 1:
                label = {
                    "DATE":  "FECHA"+ self.model.datetime.strftime("%Y/%m/%d %H:%M:%S"),
                    "REF":   "REF" + self.model.qr_codes["REF"],
                    "QR":    self.model.input_data["database"]["pedido"]["PEDIDO"],
                    "TITLE": "Estación de vision-altura en arnes Interior",
                    "HM":    self.model.qr_codes["HM"],
                    "RESULT": "Visión-Altura OK"
                }
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
        command = {
            "lbl_result" : {"text": "Se giró la llave de reset", "color": "green"},
            "lbl_steps" : {"text": "Reiniciando", "color": "black"},
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        command = {}
        for i in self.model.BB:
             command[i] = False
        publish.single(self.model.pub_topics["plc"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        if self.model.datetime != None:
            historial = {
                "PEDIDO": self.model.input_data["database"]["pedido"]["ID"],
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
                "NOTAS": {"VISION": ["OK"], "ALTURA": ["OK"]},
                "SCRAP": {}
                }

            resp = requests.post("http://localhost:5000/api/post/historial",data=json.dumps(historial))
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


class setRobot(QState):
    ok     =   pyqtSignal()
    def __init__(self, model = None, parent = None):
        super.__init__(parent)
        self.model = model
    def onEntry(self, QEvent):
        if self.model.robot.enable():
            self.ok.emit()
"""