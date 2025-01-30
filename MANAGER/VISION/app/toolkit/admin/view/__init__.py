from PyQt5.QtWidgets import QDialog, QMessageBox
from PyQt5.QtCore import pyqtSignal, pyqtSlot, QTimer, QObject, Qt
from paho.mqtt.client import Client
from pickle import load, dump
from os.path import exists
from cv2 import imwrite
from time import sleep
from os import system
from copy import copy
import json

from toolkit.admin.view import admin
from toolkit.admin.model import Model

from PyQt5.QtWidgets import QDialog, QMainWindow, QPushButton, QMessageBox, QLineEdit, QAction, QTableWidgetItem

#from toolkit.plugins.rework import Rework

class PopOut (QMessageBox):
    def __init__(self, parent = None):
        super().__init__(parent)
        self.setIcon(QMessageBox.Information)
        self.setStandardButtons(QMessageBox.Ok)
        self.button(QMessageBox.Ok).setVisible(False)

    def closeEvent(self, event):
        event.ignore() 

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Escape:
            print("Escape key was pressed")


class Admin (QDialog):
    rcv     = pyqtSignal()

    def __init__(self, data):

        print("creando objeto de config")

        self.data = data
        super().__init__(data.mainWindow)
        self.ui = admin.Ui_admin()

        self.ui.setupUi(self)
        self.model = Model()
        self.user_type = self.data.local_data["user"]["type"]
        self.client = Client()
        self.config = {}
        self.kiosk_mode = True
        self.pop_out = PopOut(self) 

        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        QTimer.singleShot(100, self.startClient)

        #empieza sin utilizar inspecciones de tuercas
        self.ui.checkBox_5.setChecked(False)
        #se deshabilita el checkbox4
        self.ui.checkBox_4.setEnabled(False)
        #se esconde checkbox4
        self.ui.checkBox_4.setVisible(False) 

        self.ui.checkBox_6.setChecked(self.data.config_data["trazabilidad"])

        self.ui.checkBoxMFBP2.setChecked(self.data.inspeccion_tuercas["MFB-P2"])
        self.ui.checkBoxMFBP1.setChecked(self.data.inspeccion_tuercas["MFB-P1"])
        self.ui.checkBoxMFBS.setChecked(self.data.inspeccion_tuercas["MFB-S"])
        self.ui.checkBoxMFBE.setChecked(self.data.inspeccion_tuercas["MFB-E"])

        self.ui.btn_reset.clicked.connect(self.resetMachine)

        self.ui.checkBox_1.stateChanged.connect(self.onClicked_1)
        self.ui.checkBox_2.stateChanged.connect(self.onClicked_2)
        self.ui.checkBox_3.stateChanged.connect(self.onClicked_3)
        self.ui.checkBox_4.stateChanged.connect(self.onClicked_4)
        self.ui.checkBox_5.stateChanged.connect(self.onClicked_5)
        self.ui.checkBox_6.stateChanged.connect(self.onClicked_6)
        
        self.ui.checkBoxMFBP2.stateChanged.connect(self.onClicked_5)
        self.ui.checkBoxMFBP1.stateChanged.connect(self.onClicked_5)
        self.ui.checkBoxMFBS.stateChanged.connect(self.onClicked_5)
        self.ui.checkBoxMFBE.stateChanged.connect(self.onClicked_5)

        self.permissions()

######################################### Plugins #######################################

    def permissions (self):
        if self.user_type == "SUPERUSUARIO":
            self.ui.btn_reset.setEnabled(True)
            self.ui.checkBox_1.setEnabled(True)
            self.ui.checkBox_2.setEnabled(True)
            self.ui.checkBox_3.setEnabled(True)
            self.ui.checkBox_4.setEnabled(False)
            self.ui.checkBox_5.setEnabled(True)
            self.ui.checkBox_6.setEnabled(True)
        elif self.user_type == "CALIDAD":
            self.ui.btn_reset.setEnabled(True)
            self.ui.checkBox_1.setEnabled(True)
            self.ui.checkBox_2.setEnabled(False)
            self.ui.checkBox_3.setEnabled(False)
            self.ui.checkBox_4.setEnabled(False)
            self.ui.checkBox_5.setEnabled(False)
        elif self.user_type == "MANTENIMIENTO":
            self.ui.btn_reset.setEnabled(True)
            self.ui.checkBox_1.setEnabled(True)
            self.ui.checkBox_2.setEnabled(False)
            self.ui.checkBox_3.setEnabled(True)
            self.ui.checkBox_4.setEnabled(False)
            self.ui.checkBox_5.setEnabled(False)
        elif self.user_type == "PRODUCCION":
            self.ui.btn_reset.setEnabled(True)
            self.ui.checkBox_1.setEnabled(True)
            self.ui.checkBox_2.setEnabled(False)
            self.ui.checkBox_3.setEnabled(False)
            self.ui.checkBox_4.setEnabled(False)
            self.ui.checkBox_5.setEnabled(False)
        self.show()

##################################################################################################

    def startClient(self):
        try:
            self.client.connect(host = "127.0.0.1", port = 1883, keepalive = 60)
            self.client.loop_start()
        except Exception as ex:
            print("Admin MQTT client connection fail. Exception:\n", ex.args)

    def stopClient (self):
        self.client.loop_stop()
        self.client.disconnect()
        
    def resetClient (self):
        self.stop()
        self.start()

    def on_connect(self, client, userdata, flags, rc):
        client.subscribe("#")
        print("Admin MQTT client connected with code [{}]".format(rc))

    def on_message(self, client, userdata, message):
        try:
            self.model.input_message = message
            self.rcv.emit()
        except Exception as ex:
            print("Admin MQTT client on_message() Exception:\n", ex.args)
     
    def resetMachine(self):
        choice = QMessageBox.question(self, 'Reiniciar', "Estas seguro de reiniciar la estación?",QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
        if choice == QMessageBox.Yes:
            system("shutdown /r")
            self.client.publish("config/status", '{"shutdown": true}')
            self.close()
        else:
            pass

    def onClicked_1(self):
        if self.ui.checkBox_1.isChecked() and self.kiosk_mode:
            system("start explorer.exe")
            self.kiosk_mode = False

    def onClicked_2(self):
        if self.ui.checkBox_2.isChecked():
            self.client.publish("modules/set",json.dumps({"window" : True}), qos = 2)
        else:
            self.client.publish("modules/set",json.dumps({"window" : False}), qos = 2)

    def onClicked_3(self):
        if self.ui.checkBox_3.isChecked():
            self.client.publish("visycam/set",json.dumps({"window" : True}), qos = 2)
        else:
            self.client.publish("visycam/set",json.dumps({"window" : False}), qos = 2)
            
    def onClicked_4(self):
        if self.ui.checkBox_4.isChecked():
            self.data.config_data["untwist"] = True
        else:
            self.data.config_data["untwist"] = False

    def onClicked_5(self):
        
        if self.ui.checkBox_5.isChecked():

            self.ui.checkBoxMFBP2.setEnabled(True)
            self.ui.checkBoxMFBP1.setEnabled(True)
            self.ui.checkBoxMFBS.setEnabled(True)
            self.ui.checkBoxMFBE.setEnabled(True)

        else:
            
            self.ui.checkBoxMFBP2.setChecked(False)
            self.ui.checkBoxMFBP1.setChecked(False)
            self.ui.checkBoxMFBS.setChecked(False)
            self.ui.checkBoxMFBE.setChecked(False)


        self.data.inspeccion_tuercas["MFB-P2"] = self.ui.checkBoxMFBP2.isChecked()
        self.data.inspeccion_tuercas["MFB-P1"] = self.ui.checkBoxMFBP1.isChecked()
        self.data.inspeccion_tuercas["MFB-S"]  = self.ui.checkBoxMFBS.isChecked()
        self.data.inspeccion_tuercas["MFB-E"]  = self.ui.checkBoxMFBE.isChecked()

        print("cambio en tuercas a inspeccionar: ",self.data.inspeccion_tuercas)

    def onClicked_6(self):     #Descomentar el día que se habilite el envío de info al servidor de P2
        if self.ui.checkBox_6.isChecked():
            self.data.config_data["trazabilidad"] = True
            print("Sistema de Trazabilidad Habilitado")
            self.pop_out.setText("El Sistema de Trazabilidad ha sido Habilitado")
            self.pop_out.setWindowTitle("Acción Realizada")
            QTimer.singleShot(1000, self.pop_out.button(QMessageBox.Ok).click)
            self.pop_out.exec()
        else:
            self.data.config_data["trazabilidad"] = False
            print("Sistema de Trazabilidad Deshabilitado")
            self.pop_out.setText("El Sistema de Trazabilidad ha sido Deshabilitado")
            self.pop_out.setWindowTitle("Acción Realizada")
            QTimer.singleShot(1000, self.pop_out.button(QMessageBox.Ok).click)
            self.pop_out.exec()

    def closeEvent(self, event):
        self.client.publish("config/status", '{"finish": true}')
        with open("data\config", "wb") as f:
            dump(self.config, f, protocol=3)
        #self.client.publish("modules/set",json.dumps({"window" : False}), qos = 2)
        #self.client.publish("visycam/set",json.dumps({"window" : False}), qos = 2)
        #system("taskkill /f /im explorer.exe")
        self.stopClient()
        event.accept()
        self.deleteLater()

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Escape:
            print("Escape key was pressed")

if __name__ == "__main__":
    from PyQt5.QtWidgets import QApplication
    import sys
    app = QApplication(sys.argv)
    Window = Admin()
    sys.exit(app.exec_())

