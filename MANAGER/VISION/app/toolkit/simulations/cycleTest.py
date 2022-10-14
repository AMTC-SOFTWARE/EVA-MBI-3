# -*- coding: utf-8 -*-
"""
Created on Thu Dec 19 10:36:34 2019

@author: marco

"""

import paho.mqtt.client as mqtt
import json
from time import sleep
import random


def on_connect(client, userdata, flags, rc):
    print("Connected with result code {}".format(rc))
    client.subscribe("#")
    
def on_message(client, userdata, message):
    payload = message.payload.decode("utf-8")
    print (payload)
    
def publish (topic = None, message = None, qos = 2):
    global client
    if topic == None :
        topic = "plc/status"
    if message == None :
        message = {"boxest" : True}
    payload = json.dumps(message)
    client.publish(topic,payload, qos = qos)

def setup (host = "localhost", port = "1883"):
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
    
    delay = 1

    FUSES = {
        'PDC-R': {
            'S1-1': 0, 'S1-2': 0, 'S1-3': 0, 'S1-4': 0, 'S1-5': 0, 'S1-6': 0, 'S2-1': 0, 'S2-2': 0, 'S2-3': 0, 
            'S2-4': 0, 'S2-5': 0, 'S2-6': 0, 'S3-1': 0, 'S3-2': 0, 'S3-3': 0, 'S3-4': 0, 'S3-5': 0, 'S3-6': 0, 
            'S4-1': 0, 'S4-2': 0, 'S4-3': 0, 'S5-1': 0, 'S5-2': 0, 'S5-3': 0, 'S5-4': 0, 'S5-5': 0, 'S5-6': 0, 
            'S6-1': 0, 'S6-2': 0, 'S6-3': 0, 'S6-4': 0, 'S6-5': 0, 'S6-6': 0, 'S6-7': 0, 'S6-8': 0, 'S6-9': 0, 
            'S6-10': 0, 'S7-1': 0, 'S7-2': 0, 'S7-3': 0, 'S7-4': 0, 'S7-5': 0, 'S7-6': 0, 'S7-7': 0, 'S7-8': 0, 
            'S7-9': 0, 'S7-10': 0, 'S8-1': 0, 'S8-2': 0, 'S8-3': 0, 'S9-1': 0, 'S9-2': 0, 'S9-3': 0, 'S9-4': 0, 
            'S9-5': 0, 'S9-6': 0, 'S10-1': 0, 'S10-2': 0, 'S10-3': 0, 'S10-4': 0, 'S10-5': 0, 'S10-6': 0, 
            'S11-1': 0, 'S11-2': 0, 'S11-3': 0, 'A1-1': 0, 'A1-2': 0, 'A1-3': 0, 'A1-4': 0, 'A1-5': 0, 'A1-6': 0, 
            'A2-1': 0, 'A2-2': 0, 'A2-3': 0, 'A2-4': 0, 'A2-5': 0, 'A2-6': 0, 'A3-1': 0, 'A3-2': 0, 'A3-3': 0, 
            'A3-4': 0, 'A3-5': 0, 'A3-6': 0, 'R-1': 0, 'R-2': 0, 'R-3': 0
            }, 
        'PDC-S': {
            'A1-1': 0, 'A1-2': 0, 'A1-3': 0, 'A1-4': 0, 'A1-5': 0, 'A1-6': 0
            }, 
        'TBL-U': {
            'A1-1': 0, 'A1-2': 0, 'A1-3': 0, 'A1-4': 0, 'A1-5': 0, 'A1-6': 0, 'A1-7': 0, 'A1-8': 0, 'A1-9': 0
            }, 
        'PDC-D': {
            'A1-1': "YES", 'A1-2': "YES", 'A1-3': "YES", 'A1-4': "YES", 'A1-5': "YES", 'A1-6': "YES", 'A1-7': "YES", 'A1-8': "YES", 'A1-9': "YES", 
            'A2-1': "YES", 'A2-2': "YES", 'A2-3': "YES", 'A2-4': "YES", 'A2-5': "YES", 'A2-6': "YES", 'A2-7': "YES", 'A2-8': "YES", 'S1-1': "YES", 
            'S1-2': "YES", 'S1-3': "YES", 'S1-4': "YES", 'S1-5': "YES", 'S1-6': "YES", 'S1-7': "YES", 'S1-8': "YES", 'S1-9': "YES", 'S1-10': "YES", 
            'S2-1': 0, 'S2-2': "YES", 'S2-3': "YES", 'S2-4': "YES", 'S2-5': "YES", 'S2-6': "YES"
            }, 
        'PDC-P': {
            'S1-1': "YES", 'S2-1': "YES", 'A1-1': "YES", 'A1-2': "YES", 'A1-3': "YES", 'A1-4': "YES", 'A1-5': 0, 'A1-6': 0, 'A2-1': 0, 
            'A2-2': 0, 'A2-3': 0, 'A2-4': 0, 'A2-5': 0, 'A2-6': 0, 'A2-7': 0, 'A2-8': 0, 'A3-1': 0, 'A3-2': 0, 
            'A3-3': 0, 'A3-4': 0, 'A3-5': 0, 'A3-6': 0, 'A3-7': 0, 'A3-8': 0, 'A3-9': 0, 'A3-10': 0, 'E2-1': 0
            }
        } 
        
    setup()
    sleep(0.5)
    
    #Simulación para inserción de fusibles EIAF
    #input("\n\tPress any key to start\n")
    #client.publish("PLC/1/status", '{"start": true}', qos = 2)
    #client.publish("PLC/1/status", '{"TBLU": true}', qos = 2)
    #client.publish("PLC/1/status", '{"PDC-P": true}', qos = 2)
    #client.publish("PLC/1/status", '{"PDC-RMID": true}', qos = 2)
    #client.publish("PLC/1/status", '{"PDC-D": true}', qos = 2)
    #client.publish("PLC/1/status", '{"PDC-S": true}', qos = 2)
    #client.publish("PLC/1", '{"out4": true}', qos = 2)
    #sleep(1.5)
    #client.publish("PLC/1/status", '{"clamp_PDC-P": true}', qos = 2)
    #client.publish("PLC/1/status", '{"clamp_PDC-RMID": true}', qos = 2)
    #client.publish("PLC/1/status", '{"clamp_PDC-D": true}', qos = 2)
    #client.publish("PLC/1/status", '{"clamp_PDC-S": true}', qos = 2)
    #client.publish("PLC/1/status", '{"clamp_TBLU": true}', qos = 2)

    #k = input("\n\tPress any key to start\n")
    #if k == "k":
    #    client.publish("PLC/1/status", '{"key": true}', qos = 2)
    #else:
    #    client.publish("PLC/1/status", '{"start": true}', qos = 2)
    
    #input("\n\tPress any key to start\n")
    #client.publish("RobotEpson/3/status", '{"response": "READY"}', qos = 2)
    #sleep(0.5)
    #client.publish("RobotEpson/4/status", '{"response": "READY"}', qos = 2)
    #while True:
    #    input("\n\tPress any key to continue\n")
    #    client.publish("RobotEpson/3/status", '{"response": "LOADED"}', qos = 2)
    #    input("\n\tPress any key to continue\n")
    #    client.publish("RobotEpson/3/status", '{"response": "INSERTED"}', qos = 2)


    #Simulación para visión (sin considerar altura)
    #"PLC":     "PLC/1/status",
    #"robot":   "RobotEpson/2",
    #"vision":  "Camera/4",    

    client.publish("PLC/1/status", '{"key": true}', qos = 2)

    input("\n\tPress any key to start\n")
    client.publish("PLC/1/status", '{"clamp_PDC-R": true}', qos = 2)
    sleep(1.5)
    client.publish("PLC/1/status", '{"start": true}', qos = 2)
    sleep(1)

    input("\n\tPress any key to continue\n")
    client.publish("RobotEpson/2/status", '{"response": "position_reached"}', qos = 2), sleep(1)

    input("\n\tPress any key to continue\n")
    client.publish("Camera/4/status", '{"F421": "verde", "F422": "natural", "F423": "vacio", "F424": "vacio", "F425": "vacio", "F426": "vacio", "F430": "azul", "F431": "rojo", "F437": "vacio", "F438": "cafe", "F439": "azul", "F440": "cafe", "F441": "beige", "F450": "vacio", "F451": "vacio", "F452": "vacio", "F453": "vacio", "F454": "vacio", "F455": "verde"}', qos = 2), sleep(1)
    
    input("\n\tPress any key to continue\n")
    client.publish("RobotEpson/2/status", '{"response": "position_reached"}', qos = 2), sleep(1)
   
    input("\n\tPress any key to continue\n")
    client.publish("Camera/4/status", '{"F400": "vacio", "F401": "natural", "F402": "vacio", "F403": "vacio", "F404": "vacio", "F405": "vacio", "F412": "vacio", "F413": "verde", "F414": "vacio", "F415": "verde", "F416": "verde", "F417": "verde", "RELX": "1008695"}')
    
    input("\n\tPress any key to continue\n")
    client.publish("RobotEpson/2/status", '{"response": "position_reached"}', qos = 2), sleep(1)
    
    input("\n\tPress any key to continue\n")
    client.publish("Camera/4/status", '{"F406": "vacio", "F407": "vacio", "F408": "rojo", "F409": "vacio", "F410": "vacio", "F411": "vacio", "RELU": "vacio", "RELT": "1010733"}')
    
    input("\n\tPress any key to continue\n")
    client.publish("RobotEpson/2/status", '{"response": "position_reached"}', qos = 2), sleep(1)
    
    input("\n\tPress any key to continue\n")
    client.publish("Camera/4/status", '{"F432": "cafe", "F433": "vacio", "F436": "beige", "F442": "vacio", "F443": "beige", "F444": "vacio", "F445": "vacio", "F446": "beige", "F456": "verde", "F457": "natural", "F458": "vacio", "F459": "vacio", "F460": "vacio", "F461": "vacio"}')
    
    input("\n\tPress any key to continue\n")
    client.publish("RobotEpson/2/status", '{"response": "position_reached"}', qos = 2), sleep(1)
    
    input("\n\tPress any key to continue\n")
    client.publish("Camera/4/status", '{"F418": "vacio", "F419": "naranja", "F420": "naranja"}')
    
    input("\n\tPress any key to continue\n")
    client.publish("RobotEpson/2/status", '{"response": "position_reached"}', qos = 2), sleep(1)
    
    input("\n\tPress any key to continue\n")
    client.publish("Camera/4/status", '{"F447": "naranja", "F448": "vacio", "F449": "vacio"}')

    input("\n\tPress any key to continue\n")
    client.publish("RobotEpson/2/status", '{"response": "position_reached"}', qos = 2), sleep(1)

    input("\n\tPress any key to continue\n")
    client.publish("Camera/4/status", '{"F96": "azul"}')


    sleep(1)
    stop()

    
    
