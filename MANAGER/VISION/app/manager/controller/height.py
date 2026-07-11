"""
Procesamiento de alturas del sistema EVA-MBI-3.

Este módulo contiene la lógica principal de operación de inspeccion de alturas basada en
máquina de estados mediante QState y QStateMachine.
"""
from PyQt5.QtCore import QState, pyqtSignal
from cv2 import imwrite, imread
from paho.mqtt import publish
from threading import Timer
from shutil import copyfile
from time import strftime
from copy import copy, deepcopy
from math import ceil
import threading
import json
from time import sleep #para poder usar sleep()

class Height(QState):
    """
    Estado compuesto para la validación de altura.

    Coordina el flujo completo de inspección de altura durante el ciclo
    de producción. Este estado administra la ejecución de la inspección,
    el manejo de errores y el reintento solicitado por el operador.

    El flujo interno está compuesto por los siguientes subestados:

    - ``Process``: Ejecuta la inspección de altura y procesa el resultado.
    - ``Error``: Muestra la condición de error cuando la inspección falla.
    - ``Standby``: Espera la solicitud de un nuevo intento de inspección.


    Señales
    -------

    - ``retry``:
      Solicita al controlador principal ejecutar nuevamente la inspección
      de altura.

    - ``finished``:
      Indica que la validación de altura concluyó y el flujo puede
      continuar con el siguiente estado de la máquina.
    """
    retry = pyqtSignal() 
    finished = pyqtSignal()

    def __init__(self, module = "height1", model = None, parent = None):
        """
        Constructor de Height
        ---------------------

        Inicializa el estado compuesto encargado de la validación de altura,
        creando los subestados internos y configurando las transiciones entre
        ellos.

        Args:
            module (str):
                Identificador del módulo o estación de altura que será
                controlado.

            model:
                Modelo compartido utilizado por la máquina de estados.

            parent:
                Estado padre dentro de la jerarquía de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model
        self.module = module

        self.process    = Process(module = self.module, model = self.model, parent = self)
        self.error      = Error(module = self.module, model = self.model, parent = self)
        self.standby    = QState(self)

        self.process.addTransition(self.process.nok, self.error)
        self.error.addTransition(self.model.transitions.retry_btn, self.standby)

        self.standby.entered.connect(self.retry.emit)
        self.process.finished.connect(self.finished)
        self.setInitialState(self.process)


class Process (QState):
    """
    Estado compuesto encargado del proceso de validación de altura.

    Coordina la ejecución completa de la inspección de altura,
    administrando el posicionamiento del robot, la adquisición de
    mediciones, el procesamiento de resultados, el manejo de errores,
    los reintentos y la detención del proceso.

    Este estado encapsula y coordina los siguientes subestados:

    - Pose
    - Triggers
    - Receiver
    - Reintento
    - Stop

    Señales:
        finished:
            Emitida cuando el proceso de validación concluye
            correctamente.

        nok:
            Emitida cuando ocurre un error que impide continuar el
            proceso de inspección.
    """
    nok         = pyqtSignal()
    finished    = pyqtSignal()

    def __init__(self, module = "height1", model = None, parent = None):
        """
        Inicializa el proceso de validación de altura.

        Crea los subestados internos y configura las transiciones de la
        máquina de estados para ejecutar el flujo completo de inspección.

        Args:
            module (str): Identificador del módulo de altura.
            model: Modelo compartido de la aplicación.
            parent: Estado padre.
        """
        super().__init__(parent)
        self.model = model
        self.module = module

        self.pose       = Pose(self.module, self.model, self)
        self.triggers   = Triggers( module = self.module, model = self.model, parent = self)
        self.receiver   = Receiver( module = self.module, model = self.model, parent = self)
        self.stop       = Stop(module = self.module, model = self.model, parent = self)
        self.reintento  = Reintento(module = self.module, model = self.model, parent = self)
        
        self.pose.addTransition(self.model.transitions.rbt_pose, self.triggers)
        #triggers.finished se emite cuando ya se terminó toda la cola de secciones correctamente
        self.triggers.addTransition(self.triggers.finished, self.pose)

        self.pose.addTransition(self.model.transitions.retry_btn, self.reintento)
        self.triggers.addTransition(self.model.transitions.retry_btn, self.reintento)

        self.reintento.addTransition(self.model.transitions.retry_btn, self.reintento)

        self.reintento.addTransition(self.model.transitions.rbt_home, self.pose)
        #height.emit() se hace como respuesta cuando se reciven los resultados del sensor de altura
        self.triggers.addTransition(self.model.transitions.height, self.receiver)

        #señal de la bandera de una mala comunicación con sensor de altura habilita señal retry
        self.triggers.addTransition(self.triggers.retry, self.triggers)

        self.receiver.addTransition(self.receiver.ok, self.triggers)
        self.addTransition(self.model.transitions.rbt_stop, self.stop)
        self.stop.addTransition(self.model.transitions.start, self.pose)

        self.triggers.nok.connect(self.nok)
        self.pose.nok.connect(self.nok)

        self.pose.finished.connect(self.finished.emit)
        self.setInitialState(self.pose)    


class Stop(QState):
    """
    Estado de detención del proceso de validación de altura.

    Suspende temporalmente la inspección cuando el robot entra en modo
    STOP. Durante este estado se notifica al operador que el proceso se
    encuentra detenido y se espera una orden de inicio para reanudar la
    validación.

    Al abandonar este estado se restablece el contexto de trabajo del
    módulo de altura, eliminando la información temporal utilizada
    durante la inspección.

    Notes:
        La transición de salida es activada mediante la señal de inicio
        del robot, permitiendo reiniciar el flujo de inspección.
    """
    def __init__(self, module = "height1", model = None, parent = None):
        """
        Inicializa el estado de detención.

        Args:
            module (str):
                Identificador del módulo de altura asociado.

            model:
                Modelo compartido de la aplicación.

            parent:
                Estado padre dentro de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):
        """
        Ejecuta las acciones al entrar al estado.

        Muestra en la interfaz gráfica que el robot se encuentra en modo
        STOP y solicita al operador presionar el botón START para continuar
        con el proceso.
        """
        print("############################## ESTADO: Stop HEIGHT ############################")

        command = {
            "lbl_result" : {"text": "Robot en modo STOP", "color": "red"},
            "lbl_steps" : {"text": "Presiona START para continuar", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

    def onExit(self, QEvent):
        """
        Ejecuta las acciones al salir del estado.

        Limpia la información temporal utilizada durante la inspección,
        incluyendo la caja procesada, la cola de inspecciones, el disparo
        actual, los resultados obtenidos y la solicitud pendiente.
        """
        self.model.height_data[self.module]["box"] = ""
        self.model.height_data[self.module]["queue"].clear()
        self.model.height_data[self.module]["current_trig"] = None
        self.model.height_data[self.module]["results"].clear()
        self.model.height_data[self.module]["rqst"] = None


class Triggers (QState):
    """
    Administra la secuencia de disparos (triggers) enviados al sensor
    para inspeccionar las distintas secciones de una caja.

    Durante su ejecución obtiene cada sección pendiente de la cola,
    envía el comando de medición correspondiente y espera la respuesta
    del sensor. Además, implementa un mecanismo de reintento cuando no
    se recibe respuesta dentro del tiempo establecido.

    Notes:
        La lista de secciones a inspeccionar es obtenida del modelo
        compartido y se procesa de forma secuencial hasta completar
        todas las mediciones.

    Señales:
        finished:
            Emitida cuando todas las secciones fueron inspeccionadas.

        nok:
            Emitida cuando ocurre un error que impide continuar la
            inspección.

        retry:
            Emitida cuando expira el tiempo de espera para recibir una
            respuesta del sensor.
    """
    finished    = pyqtSignal()
    nok         = pyqtSignal()
    retry       = pyqtSignal()
    

    def __init__(self, module = "height1", model = None, parent = None):
        """
        Inicializa el estado encargado de controlar los disparos del
        sensor de altura.

        Args:
            module (str):
                Identificador del módulo de altura.

            model:
                Modelo compartido de la aplicación.

            parent:
                Estado padre dentro de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model
        self.module = module
        self.pub_topic = self.model.pub_topics["height"]
        self.queue = self.model.height_data[self.module]["queue"]
        self.BB = self.model.fuses_BB

    def onEntry(self, event):
        """
        Ejecuta las acciones al entrar al estado.

        Inicia el proceso de inspección llamando al método encargado de
        enviar el siguiente disparo al sensor de altura.
        """
        print("############################## ESTADO: Triggers HEIGHT ############################")
        #se llama al método triggers de la clase Triggers
        self.triggers()

    def triggers(self):
        """
        Procesa la siguiente sección pendiente de inspección.

        Obtiene el siguiente elemento de la cola de inspección y envía el
        comando correspondiente al sensor de altura. Si no existen más
        secciones pendientes, finaliza el proceso de inspección.

        Después de enviar el disparo, inicia un temporizador que permitirá
        detectar una falta de respuesta del sensor y solicitar un
        reintento.
        """
        # si hay cola de secciones a revisar (esta cola de "secciones de inspección de fusibles" se genera desde las modularidades)
        if len(self.queue) > 0:
            #se iguala la variable model.height_data["height1"]["current_trig"] a la sección de la cola
            self.model.height_data[self.module]["current_trig"] = self.queue[0]
            print("model.height_data[height1][current_trig]: ",self.queue[0])
        else:
            #si ya se leyó el Trigger actual se accede al método finish
            self.finish()
            return

        command = {
                    "trigger": self.model.height_data[self.module]["current_trig"]
                    }
        #se manda mensaje {"trigger": model.height_data["height1"]["current_trig"] }, esto es: {"trigger": "R5"}
        #pub_topic viene de ...self.model.pub_topics["height"].. que es: LaserSensor/3

        #se hace trigger de sensor de altura
        publish.single(self.pub_topic, json.dumps(command), hostname='127.0.0.1', qos = 2)
        
        #codigo para hacer una segunda petición de trigger para comenzar medición
        #Timer(2.5,self.second_attempt).start()

        self.model.height_data["rqst"] = True #CREEMOS QUE SE HACE TRUE PARA EL BYPASSEADO
        self.model.fuses_parser["box"] = self.model.height_data[self.module]["box"]

        print("esperando respuesta de sensor de altura")

        #se manda señal de reintento en 15 segundos
        self.model.tiempo = threading.Timer(15,self.retry.emit)
        self.model.tiempo.start()
            
    def second_attempt (self):
        """
        Reenvía el último disparo al sensor de altura.

        Este método realiza un segundo intento de medición utilizando el
        mismo trigger cuando la primera solicitud no produjo la respuesta
        esperada.
        """
        print("second attempt para: ",self.model.height_data[self.module]["current_trig"])
        command = {"trigger": self.model.height_data[self.module]["current_trig"]}
        publish.single(self.pub_topic, json.dumps(command), hostname='127.0.0.1', qos = 2)


    #A ESTE MÉTODO SOLO SE ACCEDE SI YA SE RECIBIÓ EL TRIGGER ACTUAL DE INSPECCIÓN DE ALTURAS
    #(EN Receiver SE HACE UN POP DEL TRIGGER ACTUAL QUE SE ESTÁ REVISANDO, si da NOK en trigger )
    def finish (self):
        """
        Finaliza la validación del trigger actual.

        Compara los resultados obtenidos por el sensor de altura con la
        configuración esperada para la caja inspeccionada.

        Durante este proceso:

        - Verifica que cada cavidad inspeccionada coincida con la
        configuración definida en la modularidad.

        - Actualiza los resultados de la inspección en el modelo.

        - Resalta mediante *bounding boxes* los elementos correctos e
        incorrectos sobre la imagen de inspección.

        - Registra los intentos fallidos de cada cavidad cuando se detectan
        discrepancias.

        - Comprueba, al finalizar el último trigger de la caja, que todas
        las cavidades esperadas hayan sido inspeccionadas.

        Si la inspección finaliza sin errores, la imagen resultante se
        publica en la interfaz gráfica y se emite la señal ``finished`` para
        continuar con el siguiente trigger o finalizar el proceso.

        Si se detectan errores, la interfaz muestra las cavidades con
        inconsistencias y se emite la señal ``nok`` para iniciar el flujo de
        manejo de errores.

        Notes:
        La validación utiliza la información de ``model.modularity_fuses``
        como referencia para determinar la configuración esperada de cada
        cavidad.

        """
        print("########## FUNCION: Finish de Triggers de Height ##########")

        #se reinicia la variable que guarda expected_fuses
        self.model.expected_fuses = "\tLectura\n"
        #se guarda la sección de inspección de fusibles actual
        current_trig = self.model.height_data[self.module]["current_trig"]
        #copia de los resultados de la inspección de esa sección
        results = self.model.height_data[self.module]["results"]
        #copia de imagen
        img = self.model.height_data["img"]
        error = False
        #copia de la caja que se está inspeccionando
        box = self.model.height_data[self.module]["box"]

        print("current_trig: ",current_trig)
        print("self.model.robot_data[h_queue][box]: ",self.model.robot_data["h_queue"][box])
        print("len(self.model.robot_data[h_queue][box]): ",len(self.model.robot_data["h_queue"][box]))

        ################################## SE REVISA QUE LOS FUSIBLES LEÍDOS CORRESPONDAN A LOS ESPERADOS #####################################

        if box in self.model.modularity_fuses:

            print("___________________________________________________________________________________")
            print("___________________________________________________________________________________")

            fusibles_a_inspeccionar = deepcopy(self.model.modularity_fuses[box])
            fusibles_ordenados = dict(sorted(fusibles_a_inspeccionar.items()))

            print("self.model.modularity_fuses[box]: ",fusibles_ordenados)

            print("___________________________________________________________________________________")
            print("___________________________________________________________________________________")

            for fuse in self.model.modularity_fuses[box]:
                #height_d es una copia elemento a elemento de la base de datos que te indica si hay fusible o no
                height_d = True if self.model.modularity_fuses[box][fuse] != "vacio" else False

                #revisando si el fusible está en los resultados del sensor de altura (si está en esta sección de inspección)
                if fuse in results[box]:
                    self.model.history_fuses.append(fuse) #Variable que va guardando cada fusible que llega en "results"
                    print(f"Box: {box} Fuse: {fuse}")
                    print("results (Leído): ",results[box][fuse])
                    print("Height_d (Esperado): ",height_d)

                    #se guarda el nombre de la caja y el nombre del fusible para poderlo modificar en bounding box
                    temp = [box, fuse]

                    if len(results[box][fuse])>=1:

                        #si el resultado de la inspección (true/false) == true/false (dependiendo de si debe llevar o no fusible)
                        if results[box][fuse][-1] == height_d:
                            #si es lo que debe ser, se pinta verde
                            img = self.model.drawBB(img = img, BB = temp, color = (0, 255, 0))
                            self.model.h_result[box][fuse] = self.model.modularity_fuses[box][fuse]
                        else:
                            error = True
                            img = self.model.drawBB(img = img, BB = temp, color = (0, 0, 255))
                            self.model.h_result[box][fuse] = not(height_d)

                            self.model.expected_fuses = self.model.expected_fuses + str(fuse) + ":\tALTURA NOK\n"
                            print("||||||||||Cavidad en la que hubo error: ",fuse, " Caja: ",box)
                            print("Modelo: ",self.model.tries)
                            if fuse in self.model.tries["ALTURA"][box]:
                                self.model.tries["ALTURA"][box][fuse] += 1
                            else:
                                self.model.tries["ALTURA"][box][fuse] = 1
                            print("Modelo Final: ",self.model.tries)

                    else:
                        #si el resultado de la inspección (true/false) == true/false (dependiendo de si debe llevar o no fusible)
                        if results[box][fuse] == height_d:
                            #si es lo que debe ser, se pinta verde
                            img = self.model.drawBB(img = img, BB = temp, color = (0, 255, 0))
                            self.model.h_result[box][fuse] = self.model.modularity_fuses[box][fuse]
                        else:
                            error = True
                            img = self.model.drawBB(img = img, BB = temp, color = (0, 0, 255))
                            self.model.h_result[box][fuse] = not(height_d)
                            self.model.expected_fuses = self.model.expected_fuses + str(fuse) + ":\tALTURA NOK\n"
                            print("||||||||||Cavidad en la que hubo error: ",fuse, " Caja: ",box)
                            print("Modelo: ",self.model.tries)
                            if fuse in self.model.tries["ALTURA"][box]:
                                self.model.tries["ALTURA"][box][fuse] += 1
                            else:
                                self.model.tries["ALTURA"][box][fuse] = 1
                            print("Modelo Final: ",self.model.tries)

                ############################################# EN EL ÚLTIMO TRIGGER DE LA CAJA ########################################################
                ################################# SE REVISA QUE SE HAYAN INSPECCIONADO TODOS LOS FUSIBLES DE LA CAJA ##################################
                if len(self.model.robot_data["h_queue"][box]) == 1: #cuando sea el último trigger solo queda este en robot_data
                    #Si el fuse no estra dentro de model.history_fuses, se emite un error = True y se muestra en pantalla las cavidades faltantes por inspeccionar
                    if fuse not in self.model.history_fuses:
                        #SOLAMENTE SE EXCLUYEN DE ALTURAS DE FUSIBELS EXTERNOS DE PDC-R, SIEMPRE Y CUANDO TODOS SEAN VACIOS
                        if (fuse not in self.model.external_fuses) or (self.model.eliminar_inspeccion_externos == False): #se excluyen los fusibles ya que pueden faltar de inspeccionar si se requiere (PDC-R fusibles externos de caja grande)
                            error = True
                            BB = [box, fuse]
                            img = self.model.drawBB(img = img, BB = BB, color = (0, 0, 255))
                            print("||||||||||Alturas faltantes en: ",fuse, " Caja: ",box)

                            self.model.missing_fuses += "Inspección de alturas faltante: " + str(fuse) + "\n"

        print("Finalizó inspección de trigger...")
        ###################################################################################

        #guardando imagen generada final en imgs_path + module + .jpg
        imwrite(self.model.imgs_path + self.module + ".jpg", img)

        print("___________________________________________________________________________________")
        print("___________________________________________________________________________________")
        print("\n Resultados:", results[box])
        print("___________________________________________________________________________________")
        print("___________________________________________________________________________________")

        if error == False:

            self.model.revisando_resultado_height = True #para no salir de Triggers si llega otro resultado de alturas y aún no se manda el finished
            command = {
                "img_center" : self.module + ".jpg"
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.model.height_data[self.module]["results"].clear()
            self.model.robot_data["h_queue"][box].pop(self.model.robot_data["h_queue"][box].index(self.model.robot_data["current_trig"]))
            self.model.height_data[self.module]["current_trig"] = None

            print("self.finished.emit de Trigger actual para height.py")
            self.finished.emit()
            #Timer(1,self.finished.emit).start()
        else:
            command = {
                "img_center" : self.module + ".jpg",
                "lbl_info1" : {"text": f"{self.model.expected_fuses}", "color": "blue"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.nok.emit()

class Reintento (QState):
    """
    Estado encargado de reiniciar la inspección de alturas tras una solicitud
    de reintento.

    Cuando el operador presiona el botón de reintento, este estado limpia
    la información temporal de la inspección actual y ordena al robot regresar
    a la posición HOME para iniciar nuevamente el proceso de medición.

    Señales
    --------

    - ``ok``: Indica que el reintento concluyó correctamente.
    - ``nok``: Indica que ocurrió un error durante el proceso de reintento.
    """
    ok      = pyqtSignal()
    nok     = pyqtSignal()

    def __init__(self, module = "height1", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, event):
        """
        Ejecuta el procedimiento de reinicio de la inspección.

        Al entrar en este estado se notifica al operador que el sistema está
        preparando el reintento, se eliminan los datos temporales de la inspección
        actual (trigger, resultados, solicitudes y datos recibidos del sensor) y
        finalmente se ordena al robot regresar a la posición HOME para iniciar
        nuevamente la inspección.

        Parametros
        ----------
        event : QEvent
            Evento de entrada al estado.
        """

        print("############################## ESTADO: reintento HEIGHT ############################")

        box = self.model.height_data[self.module]["box"]
        command = {
            "lbl_result" : {"text": "ESPERE", "color": "green"},
            "lbl_steps" : {"text": "Boton de reintento presionado", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        #Descomentar si se quiere pasar por vision de nuevo
        #self.model.height_data[self.module]["box"] = ""
        #self.model.height_data[self.module]["queue"].clear()
        self.model.height_data[self.module]["current_trig"] = None
        self.model.height_data[self.module]["results"].clear()
        self.model.height_data[self.module]["rqst"] = None
        self.model.input_data["height"].clear()
        self.model.robot.home()

    def onExit(self, QEvent):
        """
        Actualiza la interfaz indicando que la inspección de alturas será
        ejecutada nuevamente.

        Parameters
        ----------
        event : QEvent
            Evento de salida del estado.
        """
        command = {
            "lbl_result" : {"text": "Reintentando inspección de alturas", "color": "green"},
            "lbl_steps" : {"text": "Espera el resultado", "color": "black"},
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)


class Receiver (QState):
    """
    Estado encargado de recibir y almacenar los resultados de las
    mediciones del sensor de altura.

    Al entrar en este estado se procesa la información recibida del
    sensor, asociando cada resultado con la caja y la sección de
    inspección correspondientes.

    Una vez almacenadas las mediciones, el trigger procesado se elimina
    de la cola de inspección y se notifica a la máquina de estados para
    continuar con la siguiente etapa del proceso.

    Hereda de
        QState

    Señales
    --------
    ok : pyqtSignal
        Emitida cuando los resultados del sensor fueron procesados y
        almacenados correctamente.

    Parámetros
    ----------
    module : str, opcional
        Identificador del módulo de inspección de alturas.
        Por defecto es ``"module1"``.

    model : Model, opcional
        Modelo principal de la aplicación que contiene la información
        compartida del proceso de inspección.

    parent : QObject, opcional
        Objeto padre dentro de la máquina de estados.
    """
    ok      = pyqtSignal()
    #nok     = pyqtSignal()

    def __init__(self, module = "module1", model = None, parent = None):
        """
        Inicializa el estado encargado de recibir los resultados del sensor
        de altura.

        Obtiene las referencias a las estructuras de datos compartidas que
        almacenarán las mediciones y configura los parámetros utilizados
        durante la recepción de resultados.

        Parámetros
        ----------
        module : str, opcional
            Identificador del módulo de alturas.

        model : Model, opcional
            Modelo principal de la aplicación.

        parent : QObject, opcional
            Estado padre dentro de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model
        self.module = module
        self.queue = self.model.height_data[self.module]["queue"]
        self.pub_topic = self.model.pub_topics["height"]
        self.epoches = self.model.height_data[self.module]["epoches"]
        self.thresh = ceil(self.epoches/2)
        self.epoch_cnt = 0
        self.score = 0
        

    def onEntry(self, event):
        """
        Procesa los resultados recibidos del sensor de altura.

        Al entrar en este estado se cancela el temporizador de espera,
        se almacenan las mediciones recibidas para la sección actual,
        se actualiza la estructura de resultados del modelo y se elimina
        el trigger procesado de la cola de inspección.

        Finalmente se emite la señal ``ok`` para continuar con el flujo
        de la máquina de estados.

        Parámetros
        ----------
        event : QEvent
            Evento de entrada al estado.
        """
        print("############################## ESTADO: Receiver HEIGHT ############################")

        print("self.model.tiempo.cancel()")
        self.model.tiempo.cancel()

        try:
            #bypass:::::::::
            #if not(self.model.height_data["rqst"]):
            #    self.ok.emit()
            #    return

            #variable para saber si algún fusible de esa sección tiene al menos una altura NOK
            ok = True

            #sección actual de inspección de fusibles se guarda en trigger
            trigger = self.model.height_data[self.module]["current_trig"]
            #se hace una copia de los resultados que se han estado generando (donde ya vienen las cajas con fusibles y true o false correspondientes)
            results = self.model.height_data[self.module]["results"]
            #caja actual que se está inspeccionando
            box = self.model.height_data[self.module]["box"]

            if not(box in results):
                #si no tienes registro de esa caja, creas un espacio dentro de la variable resultados para las inspecciones de esa caja
                results[box] = {}

            #self.model.input_data["height"] contiene la lectura actual del sensor de altura para la seccion de inspección actual
            for item in self.model.input_data["height"]:
                if not(item in results[box]):
                    #si no hay registro de un fusible "x" para esa caja, se genera el espacio de variable
                    results[box][item] = []
                #posteriormente agregas el fusible con su correspondiente resultado
                results[box][item].append(self.model.input_data["height"][item])
                
                #si el resultado del fusible es falso...
                if item == False:
                    #tu variable para inspección ok, se hace false
                    ok = False
            
            #se retira el trigger de la cola una vez que se hizo correctamente
            self.queue.pop(self.queue.index(trigger))

            #se guardan los resultados de inspección ya actualizados con las correspondientes inspecciones nuevas agregadas
            self.model.height_data[self.module]["results"] = results

            self.model.height_data[self.module]["rqst"] = False

            #se emite el ok de inspección
            self.ok.emit()

        except Exception as ex:
            print("Height.Receiver exception: ", ex)
            self.ok.emit()


class Error (QState):
    """
    Estado que gestiona los errores detectados durante la inspección de
    alturas.

    Se activa cuando la validación de una o más cavidades falla o cuando
    existen cavidades que no pudieron ser inspeccionadas.

    Al entrar en este estado se informa al operador del motivo del error,
    se habilita la interacción necesaria para realizar un reintento o
    solicitar asistencia técnica y se restablece el contexto de la
    inspección actual.

    Al abandonar el estado se actualiza la interfaz para indicar que la
    inspección será ejecutada nuevamente.

    Hereda de
        QState

    Señales
    --------
    ok : pyqtSignal
        Señal disponible para indicar que el error fue resuelto.

    nok : pyqtSignal
        Señal disponible para indicar que el error persiste.

    Parámetros
    ----------
    module : str, opcional
        Identificador del módulo de inspección de alturas.
        Por defecto es ``"height1"``.

    model : Model, opcional
        Modelo principal de la aplicación que almacena la información
        compartida del proceso.

    parent : QObject, opcional
        Objeto padre dentro de la máquina de estados.
    """
    ok      = pyqtSignal()
    nok     = pyqtSignal()

    def __init__(self, module = "height1", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, event):
        """
        Ejecuta las acciones al entrar al estado de error.

        Muestra en la interfaz gráfica el motivo del fallo detectado durante la
        inspección. Dependiendo del tipo de error, informa las cavidades
        pendientes de inspeccionar o aquellas cuya validación fue incorrecta.

        Posteriormente limpia la información temporal de la inspección actual,
        habilita la disponibilidad del indicador luminoso (*raffi*) y envía el
        robot a la posición Home para preparar un posible reintento.

        Parámetros
        ----------
        event : QEvent
            Evento de entrada al estado.
        """
        print("############################## ESTADO: Error HEIGHT ############################")

        box = self.model.height_data[self.module]["box"]

        self.model.raffi_disponible = True

        if len(self.model.missing_fuses) > 0:
            command = {
                "lbl_info1" : {"text": f"{self.model.missing_fuses}", "color": "blue"},
                "lbl_result" : {"text": f"{box} vision NOK, Faltan Fusibles por inspeccionar", "color": "red"},
                "lbl_steps" : {"text": "Llame al centro técnico", "color": "black"}
            }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        else:
            command = {
                "lbl_info1" : {"text": f"{self.model.expected_fuses}", "color": "blue"},
                 "lbl_result" : {"text": f"{box} vision NOK", "color": "red"},
                 "lbl_steps" : {"text": "Presiona el boton de reintento", "color": "black"}
                 }

            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        self.model.height_data[self.module]["box"] = ""
        self.model.height_data[self.module]["queue"].clear()
        self.model.height_data[self.module]["current_trig"] = None
        self.model.height_data[self.module]["results"].clear()
        self.model.height_data[self.module]["rqst"] = None
        self.model.missing_fuses=""
        self.model.robot.home()

    def onExit(self, QEvent):
        """
        Ejecuta las acciones al salir del estado.

        Deshabilita la disponibilidad del indicador luminoso (*raffi*) y
        actualiza la interfaz gráfica para informar al operador que la
        inspección de alturas será ejecutada nuevamente.

        Parámetros
        ----------
        event : QEvent
            Evento de salida del estado.
        """

        self.model.raffi_disponible = False

        command = {
            "lbl_result" : {"text": "Reintentando inspección de alturas", "color": "green"},
            "lbl_steps" : {"text": "Espera el resultado", "color": "black"},
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)


class Pose(QState):
    """
    Estado encargado de posicionar el robot en la siguiente sección de
    inspección de alturas.

    Este estado obtiene la siguiente caja pendiente, determina el trigger
    correspondiente y ordena al robot desplazarse a la posición adecuada.
    Cuando una caja termina completamente su inspección, actualiza la GUI,
    libera las tareas asociadas y notifica la finalización del proceso.

    Señales:
        finished: Emitida cuando todas las inspecciones de la caja actual
            han concluido.
        nok: Emitida cuando la caja requerida no se encuentra correctamente
            clampeada.
    """
    finished    = pyqtSignal()
    nok         = pyqtSignal()

    def __init__(self, module = "height1", model = None, parent = None):
        """
        Inicializa el estado Pose.

        Args:
            module (str, opcional):
                Nombre del módulo de alturas asociado al estado.
                Por defecto ``"height1"``.

            model (Model):
                Modelo principal de la aplicación.

            parent (QObject, opcional):
                Objeto padre del estado.

        Atributos:
            model: Referencia al modelo principal.
            module: Nombre del módulo de alturas.
            queue: Cola de cajas pendientes por inspeccionar.
            pub_topic: Tema MQTT utilizado para enviar comandos al robot.
        """
        super().__init__(parent)
        self.model = model
        self.module = module
        self.queue = self.model.robot_data["h_queue"]
        self.pub_topic = self.model.pub_topics["robot"]

    def onEntry(self, QEvent):
        """
        Ejecuta la lógica al entrar al estado.

        Flujo principal:

        - Reinicia la bandera que permite recibir resultados del sensor
          de alturas.
        - Limpia los mensajes de error mostrados en la interfaz.
        - Obtiene la siguiente caja pendiente de inspección.
        - Verifica que la caja se encuentre correctamente clampeada.
        - Determina el siguiente trigger que debe ejecutar el robot.
        - Actualiza la interfaz mostrando la caja que será inspeccionada.
        - Envía al robot la orden para desplazarse a la siguiente posición.

        Si la caja ya no tiene más triggers pendientes:

        - Oculta la caja correspondiente en la GUI.
        - Actualiza las listas de cajas inspeccionadas.
        - Marca las cajas listas para desclampeo.
        - Actualiza los indicadores especiales
          (PDC-D, PDC-Dbracket y F96).
        - Limpia la cola de inspección.
        - Emite la señal ``finished``.
        """
        ...
        print("############################## ESTADO: Pose HEIGHT ############################")

        self.model.revisando_resultado_height = False #para poder recibir resultados de trigger de altura

        #se borran los errores en pantalla de alturas
        command = {"lbl_info1" : {"text": "", "color": "blue"}}
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        box = list(self.queue)[0]
        if not(box in self.model.input_data["plc"]["clamps"]):
            self.model.height_data[self.module]["box"] = box
            self.nok.emit()
            return
        if len(self.queue[box]) > 0:
            current_trig = self.queue[box][0]
            self.model.robot_data["current_trig"] = current_trig
            if box != self.model.height_data[self.module]["box"]:
                self.model.height_data["img"] = imread(self.model.imgs_path + "boxes/" + box + ".jpg")
                command = {
                    "lbl_result" : {"text": "Procesando alturas en " +box, "color": "green"},
                    "lbl_steps" : {"text": "Por favor espere", "color": "black"},
                    "img_center" : "boxes/" + box + ".jpg"
                    }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            #aquí guardas la caja a inspeccionar en height_data
            self.model.height_data[self.module]["box"] = box
            self.model.height_data[self.module]["queue"].append(self.model.h_triggers[box][self.model.rh_triggers[box].index(current_trig)])
        else:

            #######################################################################################
            ################## INSPECCIÓN DE CAJAS SIEMPRE LLEGA AQUÍ AL TERMINAR ALTURAS #########
            ################## O SI LA CAJA NO TENÍA ALTURAS TAMBIÉN LLEGA AQUÍ ###################
            ###Se hace un pop de la tarea de -- self.model.input_data["database"]["modularity"] ###
            print("CAJA TERMINADA, ELIMINANDO TAREA DE MODULARITY: ", box)
            
            labels = {
            "PDC-Dbracket" : {"lbl_box0" : {"text": "", "color": "darkgray", "hidden": True}},
            "PDC-D" : {"lbl_box1" : {"text": "", "color": "darkgray", "hidden": True}},                    
            "PDC-P" : {"lbl_box2" : {"text": "", "color": "darkgray", "hidden": True}},                    
            "PDC-RMID" : {"lbl_box3" : {"text": "", "color": "darkgray", "hidden": True}},                   
            "PDC-RS" : {"lbl_box3" : {"text": "", "color": "darkgray", "hidden": True}},                   
            "PDC-R" : {"lbl_box3" : {"text": "", "color": "darkgray", "hidden": True}},                   
            "PDC-S" : {"lbl_box4" : {"text": "", "color": "darkgray", "hidden": True}},                   
            "TBLU" : {"lbl_box5" : {"text": "", "color": "darkgray", "hidden": True}},                   
            "PDC-P2" : {"lbl_box6" : {"text": "", "color": "darkgray", "hidden": True}},                   
            "F96" : {"lbl_box7" : {"text": "", "color": "darkgray", "hidden": True}},                   
            "F96-1" : {"lbl_box17" : {"text": "", "color": "darkgray", "hidden": True}},                   
            "MFB-P2" : {"lbl_box8" : {"text": "", "color": "darkgray", "hidden": True}},                   
            "MFB-P1" : {"lbl_box9" : {"text": "", "color": "darkgray", "hidden": True}},                   
            "MFB-S" : {"lbl_box10" : {"text": "", "color": "darkgray", "hidden": True}},                   
            "MFB-E" : {"lbl_box11" : {"text": "", "color": "darkgray", "hidden": True}},
            "PDC-S9" : {"lbl_box12" : {"text": "", "color": "darkgray", "hidden": True}},
            "PDC-S19" : {"lbl_box13" : {"text": "", "color": "darkgray", "hidden": True}},
            "PDC-S20" : {"lbl_box14" : {"text": "", "color": "darkgray", "hidden": True}},
            "PDC-S17" : {"lbl_box15" : {"text": "", "color": "darkgray", "hidden": True}},
            "PDC-S21" : {"lbl_box16" : {"text": "", "color": "darkgray", "hidden": True}},
        }
            
            """
                *** Remover el label de la pantalla cuando termine de inspeccionar la vision y alturas ***
                
                1) Hacemos un recorrido de cada caja[key] y su lbl[value].
                
                2) Si la caja actual se encuentra dentro del diccionario[key], se manda un hidden:True para que esta se oculte 
                y ademas se hace pop(remueve) de las tareas.
            """
            for key,value in labels.items():
                if box == key:  # Comparación exacta para evitar que por ejemplo "PDC-P" elimine a "PDC-P2"
                    command = value
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)       
                
            command = {
                "lbl_result" : {"text": "Caja " + box + " Terminada", "color": "green"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

            clamps = self.model.input_data["plc"]["clamps"]
            #se elimina de las cajas clampeadas actualmente
            clamps.pop(clamps.index(box))
            
            #se guardan las cajas terminadas actuales en una variable para posteriormente desclampearlas cuando el robot esté en home
            self.model.cajas_a_desclampear.append(box)

            #se elimina de las tareas de modularity
            self.model.input_data["database"]["modularity"].pop(box)
            self.model.height_data[self.module]["box"] = ""

            #se asegura que la condición clamps no afecte cuando len(clamps)<1 al momento de desclampear la PDC-D
            #se eliminan los boxextra detectados, en caso contrario a len(clamps)>=1 significa que aún hay cajas clampeadas por inspeccionar
            if len(clamps)>=1:
                print("clamps, si hay más de 1",clamps)
                #se eliminan todas las cajas agregadas a clamps que no estén en las cajas pendientes por inspeccionar (en modularity)
                #por ejemplo si llegó un mensaje clamp_PDC-P2 y la PDC-P2 ya había terminado su inspección, o alguna diferente clamp_cajaexterna
                for boxextra in clamps:
                    if boxextra not in self.model.input_data["database"]["modularity"]:
                        clamps.pop(clamps.index(boxextra))
                        print("había un boxextra",boxextra)

            #(también se condiciona esto mismo desde comm.py para no permitir agregar cajas que no aparezcan ya en modularity -> if box in modularity: self.model.input_data["plc"]["clamps"].append(box))
            if "PDC-D" in self.model.cajas_a_desclampear and len(clamps)<1:
                self.model.PDCD_bracket_pendiente=True

            if "PDC-Dbracket" in self.model.cajas_a_desclampear:
                self.model.PDCD_bracket_terminado=True
                command = {
                    "lbl_box0" : {"text": "", "color": "green", "hidden" : True}
                    }
                publish.single(self.model.pub_topics["gui"], json.dumps(command), hostname='127.0.0.1', qos = 2)


            #si ya no le quedan cajas por inspeccionar de las que se clampearon
            if len(clamps) == 0:
                self.model.desclampear_ready = True


            self.model.F96_pendiente=False
            if len(self.model.input_data["database"]["modularity"])<=1 and "F96" in self.model.input_data["database"]["modularity"]:
                self.model.F96_pendiente=True
            self.queue.clear()
            self.finished.emit()
            return
        self.model.robot.setPose(current_trig)
