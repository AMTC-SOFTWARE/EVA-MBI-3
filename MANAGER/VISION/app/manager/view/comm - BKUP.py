
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
    vision      =   pyqtSignal()
    height      =   pyqtSignal()
    start       =   pyqtSignal()

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.client = Client()
        QTimer.singleShot(100, self.setup)

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
                            "popOut":"Paro de emergencia activado"
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
                    if "clamp_" in i:
                        box = i[6:]
                        if payload[i] == True:
                            if not(box in self.model.input_data["plc"]["clamps"]):
                                self.model.input_data["plc"]["clamps"].append(box)
                                self.clamp.emit() 
                        else:
                            if box in self.model.input_data["plc"]["clamps"]:
                                self.model.input_data["plc"]["clamps"].pop(self.model.input_data["plc"]["clamps"].index(box))

                if "key" in payload:
                    if payload["key"] == True:
                        self.key.emit()
                        
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
                        self.retry_btn.emit()

                if "Rbt-EStop" in payload:
                    self.model.robot_data["stop"] = True
                    self.rbt_stop.emit()

                if "start" in payload:
                     if payload["start"] == True:
                        self.start.emit()

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

            if message.topic == self.model.sub_topics["vision"]:
                self.model.input_data["vision"] = payload
                self.vision.emit()

            if message.topic == self.model.sub_topics["height"]:
                self.model.input_data["height"] = payload
                self.height.emit()
            
            Timer(0.1, self.model.log, args = ({"topic": message.topic, "message": payload},)).start() 

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

