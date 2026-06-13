# -*- coding: utf-8 -*-
"""
Comunicación MQTT de la interfaz gráfica EVA-MBI-3.

Este módulo contiene la implementación del cliente MQTT utilizado
por la GUI para intercambiar información con los diferentes
componentes del sistema.
"""

from PyQt5.QtCore import pyqtSignal, pyqtSlot
from PyQt5.QtCore import QObject
from paho.mqtt.client import Client
from threading import Timer
import json

class MqttClient (QObject):
    """
    Cliente MQTT principal de la interfaz gráfica.

    Responsable de establecer la conexión con el broker,
    gestionar las suscripciones y distribuir los mensajes
    recibidos entre los componentes de la GUI.

    Señales principales
    -------------------

    - ``subscribe``:
      Emitida cuando se recibe un mensaje MQTT válido.

    - ``connected``:
      Emitida cuando el cliente establece correctamente
      la conexión con el broker MQTT.
    """
    subscribe = pyqtSignal(dict)
    connected = pyqtSignal()


    def __init__(self, model = None, parent = None):
        """
        Constructor de MqttClient
        -------------------------

        Inicializa el cliente MQTT utilizado por la interfaz gráfica
        y configura los mecanismos necesarios para la comunicación
        con los diferentes componentes del sistema.

        Configuraciones realizadas:

        - Asociación con el modelo de datos.
        - Creación de la instancia MQTT.
        - Registro de callbacks de conexión y recepción.
        - Programación del intento inicial de conexión al broker.

        Args:
            model:
                Instancia del modelo de datos utilizada para obtener
                parámetros de configuración y tópicos MQTT.

            parent:
                Objeto padre de Qt.
        """
        super().__init__(parent)
        self.model = model
        self.client = Client()
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        Timer(5, self.setup).start()
        
    def setup(self):
        """
        Establece la conexión inicial con el broker MQTT.

        Intenta conectar el cliente MQTT de la interfaz gráfica al broker
        local y activa el ciclo de recepción de mensajes.

        En caso de falla, notifica el error a la GUI mediante la señal
        ``subscribe`` y programa el cierre automático del mensaje emergente.
        """
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
        """
        Gestiona la conexión de la interfaz gráfica con el broker MQTT.

        Una vez establecida la conexión, realiza la suscripción a los
        tópicos necesarios para la operación de EVA-MBI-3 y notifica
        el resultado de la comunicación.

        En caso de éxito se habilita el intercambio de mensajes entre
        la GUI, el controlador y los dispositivos externos. En caso
        de error, se muestra un error mediante la interfaz gráfica.

        Args:
            client:
                Cliente MQTT que originó el evento.

            userdata:
                Datos de usuario asociados al cliente.

            flags:
                Indicadores de conexión proporcionados por MQTT.

            rc:
                Código de resultado de la conexión.
        """
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
        """
        Procesa los mensajes recibidos durante la operación de EVA-MBI-3.

        Este método recibe y distribuye la información proveniente de los
        diferentes componentes del sistema, permitiendo mantener
        sincronizada la interfaz gráfica con el estado actual de la estación.

        Los mensajes recibidos pueden incluir:

        - Actualización de indicadores de producción.
        - Instrucciones para el operador.
        - Cambios de estado de la interfaz.
        - Eventos generados por el controlador.
        - Información proveniente del robot y dispositivos externos.
        - Notificaciones relacionadas con la trazabilidad del proceso.

        Una vez procesado el mensaje, la información es distribuida a la
        interfaz gráfica mediante señales Qt para actualizar los componentes
        visuales correspondientes.

        Args:
            client:
                Cliente MQTT que recibió el mensaje.

            userdata:
                Datos asociados al cliente MQTT.

            message:
                Mensaje recibido desde alguno de los tópicos suscritos.
        """
        try:
            payload = json.loads(message.payload)
            #print ("   " + message.topic + " ", payload)
            self.subscribe.emit(payload)
        except Exception as ex:
            print(ex.args)

    @pyqtSlot(dict)
    def publish (self, message):
        """
        Publica información de estado de la interfaz gráfica.

        Envía eventos generados por la GUI hacia los demás componentes
        del sistema para mantener sincronizada la operación de la estación.

        Entre los mensajes publicados pueden encontrarse:

        - Solicitudes de autenticación.
        - Códigos escaneados por el operador.
        - Cambios de visibilidad de ventanas.
        - Eventos de interacción con la interfaz.
        - Actualizaciones de estado de operación.

        Args:
            message:
                Información que será enviada mediante MQTT.
        """
        try:
            self.client.publish(self.model.statusTopic,json.dumps(message), qos = 2)
        except Exception as ex:
            print (ex.args)

    @pyqtSlot(dict)
    def plc_publish (self, message):
        """
        Envía comandos destinados al PLC de la estación.

        Permite transmitir instrucciones relacionadas con el control
        del proceso productivo y la interacción con los dispositivos
        industriales conectados al sistema.

        Args:
            message:
                Comando o información destinada al PLC.
        """
        try:
            self.client.publish(self.model.plcTopic,json.dumps(message), qos = 2)
        except Exception as ex:
            print (ex.args)
            
    @pyqtSlot(dict)
    def rbt_publish (self, message):
        """
        Envía comandos destinados al robot de la estación.

        Permite iniciar acciones, movimientos o secuencias de trabajo
        requeridas durante la ejecución del ciclo de producción.

        Args:
            message:
                Comando o información destinada al robot.
        """
        try:           
            self.client.publish(self.model.rbtTopic,json.dumps(message), qos = 2)         
        except Exception as ex:
            print (ex.args)

    def closePopout (self):
        """
        Solicita el cierre automático de mensajes emergentes.

        Utilizado principalmente durante la gestión de errores de
        comunicación para retirar de la interfaz las notificaciones
        temporales una vez transcurrido el tiempo de visualización.
        """
        try:
            self.subscribe.emit({"popOut": "close"})
        except Exception as ex:
            print (ex.args)
