# -*- coding: utf-8 -*-
"""
Created on Wed May 13 9:27:34 2020

@author: MSc. Marco Rutiaga Quezada

pyinstaller --icon=icon.ico  manager.py

####################################################################################################
	Tópicos y mensajes para probar el funcionamiento de la General-GUI
####################################################################################################

#######################################   mensajes de salida: ###################################### 
Tópico:
    interfaz/status
    
mensajes (json):
    1.- {"interfaz": "open"}
    2.- {"interfaz": "closed"}
    3.- {"WEB": "open"}
    4.- {"request":"login"}
    5.- {"request":"logout"}
    6.- {"login": "escanned text"}
    7.- {"scanner": "escanned text"}
    8.- {
            "interfaz": [bool], 
            "admin": [bool], 
            "login": [bool],
            "scanner": [bool],
            "torqueTest": [bool],
            "imgs": [bool]
        }
    
#######################################   mensajes de entrada: ##################################### 
Tópico:
    interfaz/set

mensajes (json):
    1.- {"lbl_info1" : {"text": "Torques", "color": "black"}}
    2.- {"lbl_info2" : {"text": "TorqueReceived", "color": "green"}}
    3.- {"lbl_nuts" : {"text": "Nut", "color": "orange"}}
    4.- {"lbl_result" : {"text": "Torque T1 OK", "color": "green"}}
    5.- {"lbl_steps" : {"text": "Next Torque: T2", "color": "red"}}
    6.- {"lbl_user" : {"type":"SUPERUSUARIO", "user": "Marco Rutiaga", "color": "black"}}
    7.- {"img_user" : "usuario_x.jpg"}
    8.- {"img_nuts" : "tuerca_x.jpg"}
    9.- {"img_center" : "hello.jpg"}
    10.- {"show":{
                    "admin": [bool],
                    "login": [bool],
                    "scanner": [bool],
                    "torqueTest": [bool],
                    "imgs": [bool]
                 }}
    11.- {"popOut": "text"} --> if "text" == "close" then popOut will close if is visible
    12.- {"request" : "status"}
         response-->{
                        "interfaz": [bool], 
                        "admin": [bool], 
                        "login": [bool],
                        "scanner": [bool],
                        "torqueTest": [bool],
                        "imgs": [bool]
                   }
    15.- {"allow_close": false}
    16.- {"img_results": {
                            "img_1": path_img_1,
                            "img_2": path_img_2,
                            "img_3": path_img_3,
                            "img_4": path_img_4,
                            "img_5": path_img_5,
                            "img_6": path_img_6
                        }}

                        --> EXAMPLE: {"img_results": { "img_1": "../imgs/hello.jpg"}}
"""


import paho.mqtt.client as mqtt
import json, shutil
from time import sleep

def on_connect(client, userdata, flags, rc):
    print("Connected with result code {}".format(rc))
    client.subscribe("#")
    

def on_message(client, userdata, message):
    payload = json.loads(message.payload)
    print (message.topic, payload)
    
def publish (topic = None, message = None, qos = 2):
    global client
    if topic == None :
        topic = "gui/set"
    if message == None :
        message = '{"login" : true}'
    client.publish(topic,message, qos = qos)

def setup (host = "127.0.0.1", port = "1883"):
    global client
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(host)
    client.loop_start()
    
def stop ():
    global client
    sleep(0.5)
    client.loop_stop()
    client.disconnect()
    print("Good bye...")
    
if __name__ == "__main__":    
      
    setup()
    sleep(0.5)
    while True:
        msj = input("\nWrite a .json messaje or press enter to exit:\n")
        if msj == "":
            stop()
            break
        else:
            publish(message = msj)  


    
    
