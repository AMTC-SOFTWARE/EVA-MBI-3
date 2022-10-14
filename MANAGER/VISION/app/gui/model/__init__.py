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
        self.status = {
            "visible": {
                "gui": False, 
                "login": False,
                "scanner": False,
                "pop_out": False
                }
            }
