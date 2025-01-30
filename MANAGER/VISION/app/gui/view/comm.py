
# -*- coding: utf-8 -*-
"""
@author: MSc. Marco Rutiaga Quezada
"""

from PyQt5.QtCore import pyqtSignal, pyqtSlot
from PyQt5.QtCore import QObject

from paho.mqtt.client import Client
from threading import Timer
import json

class MqttClient (QObject):
    subscribe = pyqtSignal(dict)
    connected = pyqtSignal()


    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.client = Client()
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        Timer(5, self.setup).start()
        
    def setup(self):
        try:
            self.client.connect(host = "127.0.0.1", port = 1883, keepalive = 60)
            self.client.loop_start()
        except Exception as ex:
            print("GUI MQTT client stup fail. Exception:\n", ex.args)
            self.subscribe.emit(
                    {
                        "popOut": "GUI MQTT setup fail",
                        "lbl_result" : {"text": "GUI MQTT connection fail", "color": "red"}, 
                        "lbl_steps" : {"text": "Check broker and restart", "color": "black"}
                    })
            Timer(2, self.closePopout).start()

    def on_connect(self, client, userdata, flags, rc):
        try:
            #Generamos una lista con los topicos a los que nos vamos a subscribir (gui y robot)
            topics = [self.model.setTopic, self.model.statusrbtTopic]
            
            #Generamos un for para recorrar cada topico y asi el cliente pueda subscribirse individualmente a cada uno.
            for topic in topics:
                client.subscribe(topic)
                if rc == 0:
                    print("GUI MQTT client connected with code [{}]".format(rc))
                    self.connected.emit()
                else:
                    print("GUI MQTT client connection fail, code [{}]".format(rc))
                    self.subscribe.emit(
                        {
                            "popOut": "GUI MQTT connection fail",
                            "lbl_result" : {"text": "GUI MQTT connection fail", "color": "red"}, 
                            "lbl_steps" : {"text": "Check broker and restart", "color": "black"}
                        })
        except Exception as ex:
            print("GUI MQTT client connection fail. Exception: ", ex.args)
            self.subscribe.emit(
                    {
                        "popOut": "GUI MQTT connection fail",
                        "lbl_result" : {"text": "GUI MQTT connection fail", "color": "red"}, 
                        "lbl_steps" : {"text": "Check broker and restart", "color": "black"}
                    })
            Timer(2, self.closePopout).start()

    def on_message(self, client, userdata, message):
        try:
            payload = json.loads(message.payload)
            #print ("   " + message.topic + " ", payload)
            self.subscribe.emit(payload)
        except Exeption as ex:
            print(ex.args)

    @pyqtSlot(dict)
    def publish (self, message):
        try:
            self.client.publish(self.model.statusTopic,json.dumps(message), qos = 2)
        except Exception as ex:
            print (ex.args)

    @pyqtSlot(dict)
    def plc_publish (self, message):
        try:
            self.client.publish(self.model.plcTopic,json.dumps(message), qos = 2)
        except Exception as ex:
            print (ex.args)
            
    @pyqtSlot(dict)
    def rbt_publish (self, message):
        try:           
            self.client.publish(self.model.rbtTopic,json.dumps(message), qos = 2)         
        except Exception as ex:
            print (ex.args)

    def closePopout (self):
        try:
            self.subscribe.emit({"popOut": "close"})
        except Exception as ex:
            print (ex.args)
