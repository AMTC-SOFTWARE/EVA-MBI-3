# -*- coding: utf-8 -*-
"""
Modelo de datos de la interfaz gráfica EVA-MBI-3.

Este módulo contiene la estructura de datos utilizada por la interfaz
gráfica para almacenar configuraciones, estados de operación,
información de usuario y parámetros de comunicación.
"""

class Model (object):
    """
    Modelo de datos principal de la interfaz gráfica EVA-MBI-3.

    Centraliza la información compartida utilizada por los
    componentes visuales y de comunicación del sistema.
    """
    def __init__(self):
        """
        Constructor de Model
        --------------------

        Inicializa la configuración base utilizada por la interfaz
        gráfica, incluyendo parámetros de comunicación, recursos
        visuales, información de usuario y estados de operación.

        Configuraciones iniciales:

        - Tópicos MQTT de comunicación.
        - Dirección del servidor.
        - Recursos gráficos por defecto.
        - Estado de visibilidad de ventanas.
        - Variables auxiliares.
        """
        self.name = "GUI"
        self.imgsPath = "data/imgs/"
        self.img_fuse = ""
        self.centerImage = ":/images/images/blanco.png"
        self.user = {"type":"", "pass":"", "user":""}
        self.setTopic = "gui/set"
        self.statusTopic = "gui/status"
        self.plcTopic = "PLC/1"
        self.rbtTopic = "RobotEpson/2"
        self.statusrbtTopic = "RobotEpson/2/status"
        self.inBuffer = {}
        self.server = "127.0.0.1:5000" #para correr localmente
        self.mejor_tiempo=1000
        self.cajas_raffi = [] #Lista para evaluar cajas a desclampear
        self.status = {
            "visible": {
                "gui": False, 
                "login": False,
                "scanner": False,
                "pop_out": False
                }
            }

