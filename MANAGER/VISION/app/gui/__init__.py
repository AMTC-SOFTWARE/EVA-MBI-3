# -*- coding: utf-8 -*-
"""

@author: MSc. Marco Rutiaga Quezada


##########################################   info general: #########################################

Este proyecto corresponde a la interfaz genérica de las EVTAs (Estacion de Visión, Torque y Alturas).
El funcionamiento de la interfaz se basa en mensajes de entrada y salida sobre MQTT y en forma JSON.
En los mensajes de entrada pueden existir el total de los atributos soportados o solo una parte de ellos,
es decir, se pueden enviar los atributos del json que se requieran para modificar solo las partes de
interez y no necesariamente refrescar toda la interfaz.

#######################################   mensajes de salida: ###################################### 
Tópico:
    gui/status
    
mensajes (json):
    {"WEB": "open"}
    {"request":"login"}
    {"request":"logout"}
    {"request":"config"}
    {"ID": "escanned text from login form"}
    {"code": "escanned text from scanner form"}
    {"visible": {
            "gui": [bool], 
            "login": [bool],
            "scanner": [bool],
            }
        }
    
#######################################   mensajes de entrada: ##################################### 
Tópico:
    gui/set

mensajes (json):
    {"lbl_info1" : {"text": "Status", "color": "black"}}
    {"lbl_info2" : {"text": "TorqueReceived", "color": "green"}}
    {"lbl_info3" : {"text": "info3", "color": "green"}}
    {"lbl_info4" : {"text": "History", "color": "black"}}
    {"lbl_nuts" : {"text": "Nut", "color": "orange"}}
    {"lbl_result" : {"text": "Torque T1 OK", "color": "green"}}
    {"lbl_steps" : {"text": "Next Torque: T2", "color": "red"}}
    {"lbl_user" : {"type":"SUPERUSUARIO", "user": "Marco Rutiaga", "color": "black"}}
    {"img_user" : "usuario_x.jpg"}
    {"img_nuts" : "tuerca_x.jpg"}
    {"img_center" : "logo.jpg"}
    {"show":{
            "login": [bool],
            "scanner": [bool],
         }}
    {"popOut": "text"} --> if "text" == "close" then popOut will close if is visible
    {"request" : "status"}
         response-->{
                        "gui": [bool], 
                        "login": [bool],
                        "scanner": [bool],
                   }
    {"allow_close": false}
    
"""


from gui.view import MainWindow

if __name__ == "__main__":
    from PyQt5.QtWidgets import QApplication
    import sys
    app = QApplication(sys.argv)
    gui = MainWindow()
    gui.show()
    sys.exit(app.exec_())
