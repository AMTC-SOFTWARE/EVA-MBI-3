# -*- coding: utf-8 -*-
"""
@author: MSc. Marco Rutiaga Quezada
"""

class Model (object):
    def __init__(self):   
        self.name = "GUI"
        self.imgsPath = "data/imgs/"
        self.centerImage = ":/images/images/blanco.png"
        self.user = {"type":"", "pass":"", "user":""}
        self.setTopic = "gui/set"
        self.statusTopic = "gui/status"
        self.inBuffer = {}
        self.server = "127.0.0.1:5000" #para correr localmente
        self.mejor_tiempo=1000
        self.status = {
            "visible": {
                "gui": False, 
                "login": False,
                "scanner": False,
                "pop_out": False
                }
            }

