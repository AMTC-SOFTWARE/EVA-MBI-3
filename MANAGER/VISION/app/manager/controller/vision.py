"""
Procesamiento de vision del sistema EVA-MBI-3.

Este módulo contiene la lógica principal de operación de vision basada en
máquina de estados mediante QState y QStateMachine.
"""
from PyQt5.QtCore import QState, pyqtSignal
from cv2 import imwrite, imread
from paho.mqtt import publish
from threading import Timer
from shutil import copyfile
from time import strftime
from copy import copy
from math import ceil
#librería para ordenar diccionarios
from collections import OrderedDict
import json
import os
from os.path import exists

class Vision (QState):
    """
    Estado principal encargado de ejecutar el proceso de inspección visual.

    Este estado funciona como un contenedor de subestados que administran
    el ciclo completo de una inspección de visión.

    Durante su ejecución controla los siguientes estados internos:

    - Process:
        Ejecuta la inspección visual del módulo seleccionado.

    - Error:
        Administra las condiciones de error durante la inspección y permite
        reintentar el proceso mediante la acción correspondiente.

    - Standby:
        Estado de espera utilizado después de una condición de error antes
        de volver a ejecutar la inspección.

    El estado Vision inicia siempre en Process y permanece activo hasta que
    la inspección finaliza correctamente o requiere una acción de
    recuperación.

    Señales
    --------

    retry : pyqtSignal
        Señal emitida cuando el estado interno Standby solicita volver a
        ejecutar la inspección.

    finished : pyqtSignal
        Señal emitida cuando el proceso de inspección visual termina
        correctamente.
    """
    retry       = pyqtSignal()
    finished    = pyqtSignal()

    def __init__(self, module = "vision1", model = None, parent = None):
        """
        Inicializa el estado Vision.

        Parameters
        ----------
        module : str, optional
            Nombre del módulo de visión que será inspeccionado.

        model : object, optional
            Modelo principal de la aplicación. Contiene la configuración
            del proceso, estados globales y referencias utilizadas por los
            subestados.

        parent : QState, optional
            Estado padre dentro de la máquina de estados.
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
         #Estado Inicial Process
        self.setInitialState(self.process)

class Process (QState):
    """
    Estado encargado de ejecutar el flujo principal de inspección visual.

    Este estado administra la secuencia completa de inspección de un módulo
    de visión, coordinando el movimiento del robot, generación de triggers,
    recepción de resultados y recuperación ante reintentos.

    El flujo interno está compuesto por los siguientes estados:

    - Pose:
        Solicita al robot desplazarse a la posición requerida para la
        inspección y espera la confirmación de movimiento.

    - Triggers:
        Prepara y administra los triggers necesarios para ejecutar las
        inspecciones de visión.

    - Receiver:
        Recibe y procesa las respuestas generadas durante la inspección.

    - Stop:
        Estado preparado para gestionar una condición de paro durante el
        proceso de inspección.

    - Reintento:
        Administra la repetición del ciclo cuando se solicita un nuevo
        intento de inspección.

    El estado inicia siempre en Pose y continúa el flujo dependiendo de
    los eventos generados por el robot y los resultados de inspección.

    Señales
    --------

    nok : pyqtSignal
        Señal emitida cuando ocurre una condición no válida durante el
        proceso de inspección.

    finished : pyqtSignal
        Señal emitida cuando el ciclo de inspección termina correctamente.
    """
    nok         = pyqtSignal()
    finished    = pyqtSignal()

    def __init__(self, module = "vision1", model = None, parent = None):
        """
        Inicializa el estado Process.

        Parameters
        ----------
        module : str, optional
            Nombre del módulo de visión asociado al proceso.

        model : object, optional
            Modelo principal de la aplicación. Contiene estados globales,
            transiciones y configuraciones utilizadas por los subestados.

        parent : QState, optional
            Estado padre dentro de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model
        self.module = module

        self.pose       = Pose(self.module, self.model, self)
        self.triggers   = Triggers( module = self.module, model = self.model, parent = self)
        self.receiver   = Receiver( module = self.module, model = self.model, parent = self)
        self.stop       = Stop(module = self.module, model = self.model, parent = self)
        self.reintento  = Reintento(module = self.module, model = self.model, parent = self)
        
        # entra a triggers con el mensaje de posición alcanzada del robot, el estado pose manda el mensaje mqtt para que el robot vaya ahí
        self.pose.addTransition(self.model.transitions.rbt_pose, self.triggers)

        self.pose.addTransition(self.model.transitions.rbt_home, self.pose)
        self.pose.addTransition(self.model.transitions.retry_btn, self.reintento)

        self.reintento.addTransition(self.model.transitions.retry_btn, self.reintento)

        self.reintento.addTransition(self.model.transitions.rbt_home, self.pose)

        self.triggers.addTransition(self.triggers.finished, self.pose)
        self.triggers.addTransition(self.model.transitions.vision, self.receiver)
        self.receiver.addTransition(self.receiver.ok, self.triggers)
        #self.addTransition(self.model.transitions.rbt_stop, self.stop)
        #self.stop.addTransition(self.model.transitions.start, self.pose)
        
        self.triggers.nok.connect(self.nok)
        self.pose.nok.connect(self.nok)

        self.pose.finished.connect(self.finished.emit)
        self.setInitialState(self.pose)   

class Stop(QState):
    """
    Estado de detención del proceso de visión.

    Responsable de detener temporalmente el flujo de inspección visual del
    módulo actual cuando el robot entra en condición STOP.

    Mientras este estado permanece activo, la interfaz gráfica informa al
    operador que el robot se encuentra detenido y que debe presionar START
    para continuar con la operación.

    Al abandonar este estado, se limpian los datos temporales asociados al
    proceso de visión para evitar conservar información de una inspección
    incompleta.

    Señales
    --------

    Este estado no define señales propias.
    """
    def __init__(self, module = "vision1", model = None, parent = None):
        """
        Inicializa el estado Stop de visión.

        Parameters
        ----------
        module : str, optional
            Nombre del módulo de visión asociado al estado.

        model : object, optional
            Modelo principal de la aplicación. Contiene los datos globales
            del proceso de inspección y configuración MQTT.

        parent : QState, optional
            Estado padre dentro de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):
        """
        Ejecuta las acciones al entrar al estado.

        Notifica a la interfaz gráfica que el módulo de visión se encuentra
        detenido y solicita al operador presionar START para continuar.

        Parameters
        ----------
        QEvent : QEvent
            Evento generado al ingresar al estado.
        """
        print("############################## ESTADO: Stop VISION ############################")

        command = {
            "lbl_result" : {"text": "Robot en modo STOP", "color": "red"},
            "lbl_steps" : {"text": "Presiona START para continuar", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

    def onExit(self, QEvent):
        """
        Ejecuta las acciones al salir del estado.

        Limpia la información temporal almacenada del módulo de visión
        actual para preparar una nueva ejecución del ciclo de inspección.

        Se restablecen los siguientes datos:

        - Caja actualmente inspeccionada.
        - Cola de triggers pendientes.
        - Trigger actual en ejecución.
        - Resultados obtenidos.
        - Solicitudes pendientes.

        Parameters
        ----------
        QEvent : QEvent
            Evento generado al abandonar el estado.
        """
        self.model.vision_data[self.module]["box"] = ""
        self.model.vision_data[self.module]["queue"].clear()
        self.model.vision_data[self.module]["current_trig"] = None
        self.model.vision_data[self.module]["results"].clear()
        self.model.vision_data[self.module]["rqst"] = None

class Triggers (QState):
    """
    Estado encargado de ejecutar los triggers de inspección visual.

    Responsable de administrar la secuencia de disparos de cámara durante
    la inspección de una caja.

    Este estado controla la activación de iluminación mediante PLC, envía
    los comandos de captura al sistema de visión y procesa los resultados
    obtenidos para determinar si los fusibles detectados corresponden con
    la configuración esperada de la modularidad.

    Durante su ejecución realiza las siguientes acciones:

    - Activa la iluminación necesaria para la captura.
    - Envía triggers individuales al sistema de visión.
    - Administra la cola de inspecciones pendientes.
    - Valida los fusibles detectados contra los fusibles esperados.
    - Genera evidencia de inspección.
    - Determina el resultado PASS o FAIL de la inspección.

    Señales
    --------

    finished : pyqtSignal
        Señal emitida cuando la inspección del trigger actual finaliza
        correctamente.

    nok : pyqtSignal
        Señal emitida cuando la inspección detecta errores o diferencias
        entre los resultados obtenidos y la configuración esperada.
    """
    finished    = pyqtSignal()
    nok         = pyqtSignal()

    def __init__(self, module = "vision1", model = None, parent = None):
        """
        Inicializa el estado Triggers.

        Parameters
        ----------
        module : str, optional
            Nombre del módulo de visión asociado al proceso.

        model : object, optional
            Modelo principal de la aplicación. Contiene la información de
            inspección, configuración de fusibles, comunicación MQTT y
            datos utilizados durante el proceso.

        parent : QState, optional
            Estado padre dentro de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model
        self.module = module
        self.pub_topic = self.model.pub_topics["vision"]
        self.queue = self.model.vision_data[self.module]["queue"]
        self.BB = self.model.fuses_BB

    def onEntry(self, event):
        """
        Ejecuta las acciones al entrar al estado.

        Inicia el proceso de inspección visual revisando si existen
        triggers pendientes en la cola del módulo actual.

        Si existen inspecciones pendientes:

        - Activa la iluminación mediante el PLC.
        - Define el trigger actual que será enviado a la cámara.
        - Programa el envío del comando después del tiempo de espera
          establecido.

        Si no existen triggers pendientes, desactiva la iluminación y
        finaliza el proceso de inspección.

        Parameters
        ----------
        event : QEvent
            Evento generado al ingresar al estado.
        """
        print("############################## ESTADO: Triggers VISION ############################")

        topic = self.model.pub_topics["plc"]
        if len(self.queue) > 0:
            publish.single(topic, json.dumps({"Flash":True}), hostname='127.0.0.1', qos = 2)
            self.model.vision_data[self.module]["current_trig"] = self.queue[0]
        else:
            publish.single(topic, json.dumps({"Flash": False}), hostname='127.0.0.1', qos = 2)

            print("se terminaron los triggers para esta caja")
            self.finish()
            return

        print("aquí debe estar prendida la luz 1 seg antes de mandar el trigger")
        Timer(1, self.delay).start()
        
    def delay(self):
        """
        Envía el trigger de inspección al sistema de visión.

        Después del tiempo de espera requerido para estabilizar la
        iluminación, envía la solicitud de captura al módulo de visión.

        Actualiza la información asociada a la solicitud actual y prepara
        los datos necesarios para el procesamiento posterior de resultados.
        """
        print("trigger:+++++++++++++++",self.model.vision_data[self.module]["current_trig"])
        command = {
            "trigger": self.model.vision_data[self.module]["current_trig"],
            "path": "C:/images/LASTINSPECTION.jpg"
            }
        publish.single(self.pub_topic, json.dumps(command), hostname='127.0.0.1', qos = 2)
        self.model.vision_data["rqst"] = True
        self.model.fuses_parser["box"] = self.model.vision_data[self.module]["box"]
        print("fuses parser+++++",self.model.fuses_parser["box"])

    def finish (self):
        """
        Procesa el resultado de una inspección visual.

        Analiza los resultados obtenidos por la cámara y compara los
        fusibles detectados contra la configuración esperada de la
        modularidad.

        Durante este proceso se realizan las siguientes validaciones:

        - Comparación de color de fusibles.
        - Detección de fusibles faltantes.
        - Validación de cavidades inspeccionadas.
        - Generación del resultado de inspección.
        - Actualización de intentos de inspección.
        - Creación de evidencia visual.

        La evidencia generada se almacena localmente y en el servidor
        de trazabilidad.

        Dependiendo del resultado obtenido:

        - PASS:
            Limpia los datos temporales, elimina el trigger procesado y
            emite la señal finished.

        - FAIL:
            Guarda la evidencia de fallo y emite la señal nok.
        """
        #try
        current_trig = self.model.vision_data[self.module]["current_trig"]
        results = self.model.vision_data[self.module]["results"]
        img = self.model.vision_data["img"]
        error = False
        box = self.model.vision_data[self.module]["box"]
        print("current_trig-------",current_trig)
        print("results-------\n",results)
        print("box-------",box)

        epoches = self.model.vision_data[self.module]["epoches"]
        thresh = ceil(epoches/2)

        #diccionario2 = self.model.modularity_fuses[box]
        #diccionario3 = OrderedDict(sorted(diccionario2.items()))
        #self.model.modularity_fuses[box] = diccionario3
        # Aquí se ordenan las cavidades con sus respectivos fusibles.
        self.model.modularity_fuses[box] = OrderedDict(sorted(self.model.modularity_fuses[box].items()))

        #variable para guardar la lectura de color del fusible actual vs la esperada para esa cavidad

        self.model.expected_fuses = "\tLectura\t         Esperado\n"

        #print("Modelo Amperaje Arreglo:\n",self.model.amperaje)
        amp_keys = self.model.amperaje.keys()
        #print("Modelo Amperaje Arreglo KEYS:\n",amp_keys)

        print("current_trig: ",current_trig)
        print("self.model.robot_data[v_queue][box]: ",self.model.robot_data["v_queue"][box])
        print("len(self.model.robot_data[v_queue][box]): ",len(self.model.robot_data["v_queue"][box]))
        ################################## SE REVISA QUE LOS FUSIBLES LEÍDOS CORRESPONDAN A LOS ESPERADOS #####################################

        for fuse in self.model.modularity_fuses[box]:
            score = 0

            if fuse in results[box]:
                self.model.history_fuses.append(fuse) #Variable que va guardando cada fusible que llega en "results"
                print(fuse, " ", results[box][fuse], " -- ", self.model.modularity_fuses[box][fuse])
                #revisar color "i" en box, fuse de los resultados de visión
                for i in results[box][fuse]:
                    #si el color leído es igual al esperado (de la modularidad del arnés)
                    print("color leído: ",i)
                    print("color esperado: ",self.model.modularity_fuses[box][fuse])

                    if i == self.model.modularity_fuses[box][fuse]:
                        score += 1
                    else:
                        temp = i
                        print("||||||||||Cavidad en la que hubo error: ",fuse, " Caja: ",box)
                        if fuse in self.model.tries["VISION"][box]:
                            self.model.tries["VISION"][box][fuse] += 1
                        else:
                            self.model.tries["VISION"][box][fuse] = 1
                        #para guardar fusible actual vs esperado para mostrar en pantalla
                        #self.model.expected_fuses.append(fuse+":\t["+i+"]\t["+self.model.modularity_fuses[box][fuse]+"]\n")
                        print("self.model.modularity_fuses[box][fuse]",self.model.modularity_fuses[box][fuse])
                        if self.model.modularity_fuses[box][fuse] in amp_keys:
                            if self.model.modularity_fuses[box][fuse] == "rojo":
                                if fuse in self.model.amperaje["rojo"]:
                                    print("Fusible MAXI Rojo de 50 A")
                                    amperaje = ' 50 A'
                                else:
                                    print("Fusible MINI Rojo de 10 A")
                                    amperaje = ' 10 A'
                            else:
                                if exists(self.model.amperaje[self.model.modularity_fuses[box][fuse]]):
                                    amperaje = self.model.amperaje[self.model.modularity_fuses[box][fuse]]
                                else:
                                    amperaje =""
                        else:
                            amperaje = ""


                            #print("****DB-Este color se encuentra en el modelo de Amperaje****: ",self.model.modularity_fuses[box][fuse],amperaje)

                        #Este fragmento de código es para mostrar el amperaje del fusible detectado por la cámara del Robot,
                        #pero está comentado pues al agregar el amperaje en el label, este se hace más grande y provoca que el label donde aparece la instrucción se mueva y no se vea estético...
                        #No es nada Grave, pero en cualquier momento se puede descomentar y agregar "+amperaje_VISY" al lado de "str(i)" para mostrar en el resultado final el amperaje del lado izquierdo también.
                        #if i in amp_keys:
                        #    if i == "rojo":
                        #        if fuse in self.model.amperaje["rojo"]:
                        #            print("Fusible MAXI Rojo de 50 A")
                        #            amperaje_VISY = ' 50 A'
                        #        else:
                        #            print("Fusible MINI Rojo de 10 A")
                        #            amperaje_VISY = ' 10 A'
                        #    else:
                        #        amperaje_VISY = self.model.amperaje[i]
                        #    print("****CAMARA-Este color se encuentra en el modelo de Amperaje****: ",i,amperaje_VISY)


                        self.model.expected_fuses = self.model.expected_fuses + str(fuse) + ":\t" + str(i)+ "\t----    " + str(self.model.modularity_fuses[box][fuse])+amperaje + "\n"

                #Validaccion de inspeccion por zonas
                BB = [box, fuse]
                 
                if score >= thresh:
                    img = self.model.drawBB(img = img, BB = BB, color = (0, 255, 0))
                    self.model.v_result[box][fuse] = self.model.modularity_fuses[box][fuse]
                else:
                    error = True
                    img = self.model.drawBB(img = img, BB = BB, color = (0, 0, 255))
                    self.model.v_result[box][fuse] = temp

            ############################################## EN EL ÚLTIMO TRIGGER DE LA CAJA ########################################################
            ################################# SE REVISA QUE SE HAYAN INSPECCIONADO TODOS LOS FUSIBLES DE LA CAJA ##################################
            if len(self.model.robot_data["v_queue"][box]) == 1: #cuando sea el último trigger solo queda este en robot_data
                #Si la cavidad no está dentro de model.history_fuses, se emite un error = True y se muestra en pantalla las cavidades faltantes por inspeccionar
                if fuse not in self.model.history_fuses:
                    error = True
                    BB = [box, fuse]
                    img = self.model.drawBB(img = img, BB = BB, color = (0, 0, 255))
                    print("||||||||||Fusible faltante: ",fuse, " Caja: ",box)
                    self.model.missing_fuses += "Inspecciones faltantes: " + str(fuse) + "\n"

        print("Finalizó inspección de trigger...")
        ###################################################################################

        current_day = self.model.datetime.strftime("%d")
        current_month = self.model.datetime.strftime("%m")
        year = self.model.datetime.strftime("%Y")
        current_time = self.model.datetime.strftime("_%H;%M;%S")

        while(current_day == None or current_month == None or year == None or current_time == None):
            print("dentro de: while(current_day == None or current_month == None or year == None or current_time == None):")
            current_day = self.model.datetime.strftime("%d")
            current_month = self.model.datetime.strftime("%m")
            year = self.model.datetime.strftime("%Y")
            current_time = self.model.datetime.strftime("_%H;%M;%S")


        meses = {
            "01":"Enero",
            "02":"Febrero",
            "03":"Marzo",
            "04":"Abril",
            "05":"Mayo",
            "06":"Junio",
            "07":"Julio",
            "08":"Agosto",
            "09":"Septiembre",
            "10":"Octubre",
            "11":"Noviembre",
            "12":"Diciembre",
            }

        for elemento in meses:
            if elemento == current_month:
                current_month = meses[elemento]
                print("mes actual: ",current_month)


        imwrite(self.model.imgs_path + self.module + ".jpg", img)
        name = self.model.qr_codes["HM"]#self.model.input_data["database"]["pedido"]["PEDIDO"]
        name += "_" + self.model.qr_codes["REF"]
        name += "_" + current_day + current_month + year + current_time
        name += "_" + box
        name += "_" + current_trig

        nombre_carpeta = year + current_month+ current_day
        print("nombre_carpeta: ",nombre_carpeta)

        #tratar de crear carpeta por si no existe aún
        try:
            carpeta_nueva = "C:/images/DATABASE/" + nombre_carpeta

            if not(exists(carpeta_nueva)):
                os.mkdir(carpeta_nueva)
            else:
                print("ya existe carpeta LOCAL: ",carpeta_nueva)

            #command = {
            #    "lbl_result" : {"text": "Creando Carpeta en RED...", "color": "navy"},
            #}
            #publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

            carpeta_nueva = "//naapnx-tra04/AMTC_Trazabilidad/INTERIOR-3/" + nombre_carpeta

            if not(exists(carpeta_nueva)):
                os.mkdir(carpeta_nueva)
            else:
                print("ya existe carpeta EN RED: ",carpeta_nueva)

        except OSError as exception:
            print("ERROR AL CREAR CARPETA:::\n",exception)

        name = nombre_carpeta + "/" + name

        print("\nINSPECTION:", self.model.v_result[box])
        print("MASTER    :", self.model.modularity_fuses[box], "\n")


        print("expected fuses: ")
        print(self.model.expected_fuses)

        #crear en C: una carpeta /images/ con una imagen> LASTINSPECTION.jpg
        #esta es la que irá actualizando VISYCAM
        #además dentro de images/ otra carpeta llamada /DATABASE/
        #esta carpeta para ir almacenando las inspecciones

        #import cv2
        #imgpath = "C:/images/MUESTRA.jpg"
        #img = cv2.imread(imgpath)
        #display the image
        #cv2.imshow('IMAGEN DE PRUEBA', img)
        # save the image in JPEG format with 15% quality
        #outpath_jpeg = "C:/images/COPIA_JPG.jpg"
        #cv2.imwrite(outpath_jpeg, img, [int(cv2.IMWRITE_JPEG_QUALITY), 15])
        #img_jpg = cv2.imread(outpath_jpeg)
        #cv2.imshow('JPG QUALITY', img_jpg)
        ##cv2.imwrite(outpath_webp, img, [int(cv2.IMWRITE_WEBP_QUALITY), 70])
        
        #cv2.IMWRITE_WEBP_QUALITY = 64
        IMWRITE_WEBP_QUALITY = 64
        quality_percent = 70
        imgpath_last = "C:/images/LASTINSPECTION.jpg"
        img_last = imread(imgpath_last)

        if error == False:

            self.model.revisando_resultado = True #para no salir de Triggers si llega otro resultado de visión y aún no se manda el finished

            #copyfile("C:/images/LASTINSPECTION.jpg", "C:/images/DATABASE/" + name  + "-PASS.jpg")

            #se tiene que guardar como .webp para que haga la conversión
            outpath_webp_LOCAL = "C:/images/DATABASE/" + name  + "-PASS.webp" 
            imwrite(outpath_webp_LOCAL, img_last, [IMWRITE_WEBP_QUALITY, quality_percent])
            outpath_webp_SERVIDOR = "//naapnx-tra04/AMTC_Trazabilidad/INTERIOR-3/" + name  + "-PASS.webp" 
            imwrite(outpath_webp_SERVIDOR, img_last, [IMWRITE_WEBP_QUALITY, quality_percent])

            command = {
                "img_center" : self.module + ".jpg"
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.model.vision_data[self.module]["results"].clear()
            self.model.robot_data["v_queue"][box].pop(self.model.robot_data["v_queue"][box].index(self.model.robot_data["current_trig"]))
            self.model.vision_data[self.module]["current_trig"] = None

            print("self.finished.emit de Trigger actual para vision.py")
            self.finished.emit()
            #Timer(1.5,self.finished.emit).start()

        else:
            #copyfile("C:/images/LASTINSPECTION.jpg", "C:/images/DATABASE/" + name  + "-FAIL.jpg")

            #se tiene que guardar como .webp para que haga la conversión
            outpath_webp_LOCAL = "C:/images/DATABASE/" + name  + "-FAIL.webp" 
            imwrite(outpath_webp_LOCAL, img_last, [IMWRITE_WEBP_QUALITY, quality_percent])
            outpath_webp_SERVIDOR = "//naapnx-tra04/AMTC_Trazabilidad/INTERIOR-3/" + name  + "-FAIL.webp" 
            imwrite(outpath_webp_SERVIDOR, img_last, [IMWRITE_WEBP_QUALITY, quality_percent])

            command = {
                "img_center" : self.module + ".jpg"
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.nok.emit()

class Receiver (QState):
    """
    Estado encargado de recibir y procesar los resultados de inspección
    enviados por el sistema de visión.

    Responsable de recopilar las respuestas generadas por la cámara para
    cada trigger ejecutado y almacenar los resultados obtenidos dentro de
    la estructura de datos del módulo de visión.

    Durante su ejecución realiza las siguientes acciones:

    - Verifica la existencia de una solicitud de inspección pendiente.
    - Recibe la lectura obtenida por el sistema de visión.
    - Almacena los resultados asociados a la caja inspeccionada.
    - Compara los valores detectados contra la configuración esperada.
    - Calcula el resultado parcial de la inspección.
    - Controla la cantidad de intentos requeridos para validar un trigger.

    Cuando se alcanza la cantidad de validaciones necesarias, elimina el
    trigger procesado de la cola de inspección.

    Señales
    --------

    ok : pyqtSignal
        Señal emitida cuando el procesamiento del resultado de visión
        termina correctamente.

    nok : pyqtSignal
        Señal emitida cuando ocurre una condición no válida durante el
        procesamiento del resultado.
    """
    ok      = pyqtSignal()
    nok     = pyqtSignal()

    def __init__(self, module = "module1", model = None, parent = None):
        """
        Inicializa el estado Receiver.

        Parameters
        ----------
        module : str, optional
            Nombre del módulo de visión asociado al proceso.

        model : object, optional
            Modelo principal de la aplicación. Contiene los datos de
            inspección, configuración de fusibles y resultados obtenidos
            por el sistema de visión.

        parent : QState, optional
            Estado padre dentro de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model
        self.module = module
        self.queue = self.model.vision_data[self.module]["queue"]
        self.pub_topic = self.model.pub_topics["vision"]
        self.epoches = self.model.vision_data[self.module]["epoches"]
        self.thresh = ceil(self.epoches/2)
        self.epoch_cnt = 0
        self.score = 0
        

    def onEntry(self, event):
        """
        Ejecuta las acciones al entrar al estado.

        Procesa la respuesta generada por el sistema de visión para el
        trigger actual.

        Primero valida si existe una solicitud pendiente de procesamiento.
        Si no existe una solicitud activa, continúa el flujo sin realizar
        cambios.

        Cuando recibe información válida:

        - Obtiene el trigger actual.
        - Almacena los resultados obtenidos para la caja inspeccionada.
        - Compara los valores detectados contra la configuración esperada.
        - Actualiza el contador de validaciones.
        - Determina si el trigger puede ser eliminado de la cola.

        Parameters
        ----------
        event : QEvent
            Evento generado al ingresar al estado.
        """
        print("############################## ESTADO: Receiver VISION ############################")

        print("self.queue; ",self.queue)

        try:
            if not(self.model.vision_data["rqst"]):
                self.ok.emit()
                return
            self.model.vision_data[self.module]["rqst"] = False

            ok = True
            trigger = self.model.vision_data[self.module]["current_trig"]
            results = self.model.vision_data[self.module]["results"]
            box = self.model.vision_data[self.module]["box"]

            print("trigger de Receiver:",trigger)
            print("results de Receiver:",results)
            print("box de Receiver:",box)

            if not(box in results):
                results[box] = {}

            for item in self.model.input_data["vision"]:
                if not(item in results[box]):
                    results[box][item] = []
                results[box][item].append(self.model.input_data["vision"][item])

                try:

                    if item in self.model.modularity_fuses[box]:
                        if self.model.input_data["vision"][item] != self.model.modularity_fuses[box][item]:
                            print("ok = False")
                            ok = False
                except Exception as ex:
                    print(ex)

            self.epoch_cnt += 1
            if ok:
                self.score += 1

            if self.score == self.thresh or self.epoch_cnt == self.epoches:
                self.score = 0
                self.epoch_cnt = 0
                print("pop de queue - trigger: ",trigger)
                self.queue.pop(self.queue.index(trigger))

            self.ok.emit()

        except Exception as ex:
            print("Vision.Receiver exception: ", ex)
            self.ok.emit()

class Error (QState):
    """
    Estado encargado de gestionar errores durante la inspección visual.

    Responsable de administrar las condiciones de fallo detectadas durante
    el proceso de visión y proporcionar información al operador sobre el
    resultado de la inspección.

    Este estado se activa cuando una inspección visual no cumple con los
    criterios esperados, mostrando la información correspondiente en la
    interfaz gráfica y preparando el sistema para un posible reintento.

    Durante su ejecución realiza las siguientes acciones:

    - Habilita los controles de Raffi para permitir interacción manual.
    - Muestra información de error al operador.
    - Indica fusibles faltantes cuando existen errores de inspección.
    - Limpia los datos temporales del proceso de visión.
    - Restablece la información de inspección actual.
    - Envía el robot a posición Home antes de un nuevo intento.

    Señales
    --------

    ok : pyqtSignal
        Señal emitida para indicar una finalización correcta del estado.

    nok : pyqtSignal
        Señal emitida cuando la condición de error permanece activa.
    """
    ok      = pyqtSignal()
    nok     = pyqtSignal()

    def __init__(self, module = "vision1", model = None, parent = None):
        """
        Inicializa el estado Error.

        Parameters
        ----------
        module : str, optional
            Nombre del módulo de visión asociado al proceso.

        model : object, optional
            Modelo principal de la aplicación. Contiene los datos del
            proceso de inspección, comunicación MQTT y estados globales.

        parent : QState, optional
            Estado padre dentro de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, event):
        """
        Ejecuta las acciones al entrar al estado.

        Obtiene la información de la caja inspeccionada y notifica al
        operador el resultado negativo de la inspección visual.

        Dependiendo del tipo de error detectado:

        - Muestra las cavidades faltantes cuando existen fusibles sin
          inspeccionar.
        - Muestra la comparación entre valores detectados y esperados
          cuando existe una diferencia de inspección.

        Posteriormente limpia la información temporal del módulo de visión
        y envía el robot a posición Home para preparar un nuevo intento.

        Parameters
        ----------
        event : QEvent
            Evento generado al ingresar al estado.
        """
        print("############################## ESTADO: Error VISION ############################")

        box = self.model.vision_data[self.module]["box"]

        #solamente se pueden usar los botones de raffi cuando raffi_disponible sea True
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
                 "lbl_steps" : {"text": "Presiona el botón de Reintento", "color": "black"}
                 }

            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        self.model.vision_data[self.module]["box"] = ""
        self.model.vision_data[self.module]["queue"].clear()
        self.model.vision_data[self.module]["current_trig"] = None
        self.model.vision_data[self.module]["results"].clear()
        self.model.vision_data[self.module]["rqst"] = None
        self.model.history_fuses.clear()
        self.model.missing_fuses=""
        self.model.robot.home()
        
    def onExit(self, QEvent):
        """
        Ejecuta las acciones al salir del estado.

        Deshabilita los controles de Raffi y actualiza la interfaz gráfica
        indicando que se realizará un nuevo intento de inspección visual.

        Parameters
        ----------
        QEvent : QEvent
            Evento generado al abandonar el estado.
        """
        self.model.raffi_disponible = False

        command = {
            "lbl_info1" : {"text": "", "color": "black"},
            "lbl_result" : {"text": "Reintentando inspección por visión", "color": "green"},
            "lbl_steps" : {"text": "Espera el resultado", "color": "black"},
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

class Pose(QState):
    """
    Estado encargado de posicionar el robot para ejecutar una inspección
    visual.

    Responsable de seleccionar la siguiente posición de inspección del
    robot y preparar la información necesaria para ejecutar los triggers
    de visión asociados a una caja.

    Este estado administra la sincronización entre la trayectoria del robot
    y el sistema de visión, determinando la caja y el punto de inspección
    actual antes de enviar la posición correspondiente al robot.

    Durante su ejecución realiza las siguientes acciones:

    - Obtiene la siguiente caja pendiente de inspección.
    - Valida que la caja se encuentre correctamente colocada en los clamps.
    - Selecciona el trigger actual de inspección.
    - Actualiza la información del módulo de visión.
    - Carga la imagen de referencia de la caja en la interfaz gráfica.
    - Prepara la cola de triggers para el sistema de visión.
    - Envía la posición al robot cuando corresponde.

    Señales
    --------

    finished : pyqtSignal
        Señal emitida cuando no existen más inspecciones pendientes.

    nok : pyqtSignal
        Señal emitida cuando la caja requerida para inspección no se
        encuentra disponible en los clamps.
    """
    finished    = pyqtSignal()
    nok         = pyqtSignal()

    def __init__(self, module = "vision1", model = None, parent = None):
        """
        Inicializa el estado Pose.

        Parameters
        ----------
        module : str, optional
            Nombre del módulo de visión asociado al proceso.

        model : object, optional
            Modelo principal de la aplicación. Contiene los datos del robot,
            configuración de inspección, triggers y comunicación MQTT.

        parent : QState, optional
            Estado padre dentro de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model
        self.module = module
        self.queue = self.model.robot_data["v_queue"]
        self.pub_topic = self.model.pub_topics["robot"]

    def onEntry(self, QEvent):
        """
        Ejecuta las acciones al entrar al estado.

        Prepara el sistema para iniciar una nueva posición de inspección.

        Durante la ejecución:

        - Habilita la recepción de nuevos resultados de visión.
        - Limpia mensajes anteriores de error en la interfaz.
        - Obtiene la siguiente caja pendiente de inspección.
        - Verifica que la caja se encuentre dentro de los clamps activos.
        - Selecciona el trigger actual asociado a la posición del robot.
        - Actualiza la información utilizada por el módulo de visión.
        - Envía la posición correspondiente al robot cuando es necesario.

        Si la caja requerida no se encuentra disponible, emite la señal nok
        para iniciar el flujo de recuperación.

        Si no existen inspecciones pendientes, limpia la información del
        proceso y emite la señal finished.

        Parameters
        ----------
        QEvent : QEvent
            Evento generado al ingresar al estado.
        """
        print("############################## ESTADO: Pose VISION ############################")

        self.model.revisando_resultado = False #para poder recibir resultados de trigger de visión

        #se borran los errores de pantalla de visión
        command = {"lbl_info1" : {"text": "", "color": "blue"}}
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        print("self.queue: ",self.queue)

        #caja igual a el primer elemento de la lista de la copia de rv_triggers (que viene de inspections.py - UpdateTriggers)
        box = list(self.queue)[0]
        #si la caja no está en las cajas clampeadas
        if not(box in self.model.input_data["plc"]["clamps"]):
            #se agrega la caja a la variable del modelo y se emite el ok negado
            self.model.vision_data[self.module]["box"] = box
            self.nok.emit()
            return
        # si hay al menos un elemento en la v_queue (copia de rv_triggers) para la caja actual...
        if len(self.queue[box]) > 0:
             #current trig es igual al primer elemento de la v_queue para la caja actual
            current_trig = self.queue[box][0]
            #copia del punto actual en el modelo
            self.model.robot_data["current_trig"] = current_trig

            #si la caja actual es diferente a la del modelo...
            #self.vision_data = {
            #"vision1": {
            #    "box": "",
            #    "queue": [],
            #    "epoches": 1,
            #    "current_trig": None,
            #    "results": {},
            #    "rqst": False,
            #    "img": None
            #         }

            #revisa que la imagen proyectada sea la misma que la caja actual, en caso contrario se actualiza
            if box != self.model.vision_data[self.module]["box"]:

                #ejemplo: "data/imgs/boxes/PDC-RMID.jpg
                self.model.vision_data["img"] = imread(self.model.imgs_path + "boxes/" + box + ".jpg")
                command = {
                    "lbl_result" : {"text": "Procesando vision en " +box, "color": "green"},
                    "lbl_steps" : {"text": "Por favor espere", "color": "black"},
                    "img_center" : "boxes/" + box + ".jpg"
                    }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)


            if current_trig == self.model.rv_F96_trigger:
                    self.model.vision_data["img"] = imread(self.model.imgs_path + "boxes/" + "F96" + ".jpg")
                    command = {
                        "lbl_result" : {"text": "Procesando vision en " +box, "color": "green"},
                        "lbl_steps" : {"text": "Por favor espere", "color": "black"},
                        "img_center" : "boxes/" + "F96" + ".jpg"
                    }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            
                

            #actualiza en el modelo la caja actual
            self.model.vision_data[self.module]["box"] = box

            #print("self.model.vision_data*******",self.model.vision_data)
            print("current_trig*******",current_trig)

            #en modelo, en vision1,  en queue, se agrega; (de los triggers de esa caja para VISYCAM, de los puntos del robot para esa caja, el
            # valor del indice del v_trigger que coincide con el indice del valor de current_trig en rv_trigger)
            #model.v_triggers se llena desde _init_.py(manager.model) utilizando un for self.v_triggers[i].append(f"R{j + 1}")
            #después de crear esta variable
            self.model.vision_data[self.module]["queue"].append(self.model.v_triggers[box][self.model.rv_triggers[box].index(current_trig)])

            #self.model.vision_data[self.module]["queue"] 
            print(" self.model.vision_data[self.module][queue]:   ****", self.model.vision_data[self.module]["queue"])
        
        #si ya no hay más que revisar
        else:
            self.model.vision_data[self.module]["box"] = ""
            self.queue.clear()
            self.model.history_fuses.clear()
            self.finished.emit()
            return

        # self.model.vision_data Sale listo y recién horneado de aquí (AQUI ES DONDE VAMOS-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-**-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-**)
        # Ejemplo de current_trig : "PDC_R_pv1"
        if len(self.model.vision_data[self.module]["queue"])<2:
            self.model.robot.setPose(current_trig)

class Reintento (QState):
    """
    Estado encargado de ejecutar un nuevo intento de inspección visual.

    Responsable de gestionar la recuperación manual del proceso de visión
    cuando el operador solicita repetir una inspección que previamente
    terminó con error.

    Este estado se activa mediante la acción del operador utilizando el
    botón de reintento y prepara nuevamente el sistema para ejecutar el
    ciclo de inspección desde una condición limpia.

    Durante su ejecución realiza las siguientes acciones:

    - Informa al operador que se realizará un nuevo intento.
    - Limpia los datos temporales de inspección del módulo de visión.
    - Elimina triggers pendientes del ciclo anterior.
    - Restablece resultados y solicitudes activas.
    - Envía el robot a posición Home antes de reiniciar la inspección.

    Después de completar la recuperación, permite que el flujo continúe
    nuevamente hacia la ejecución de una nueva inspección visual.

    Señales
    --------

    ok : pyqtSignal
        Señal emitida cuando el proceso de recuperación finaliza
        correctamente.

    nok : pyqtSignal
        Señal emitida cuando ocurre una condición no válida durante el
        proceso de reintento.
    """
    ok      = pyqtSignal()
    nok     = pyqtSignal()

    def __init__(self, module = "vision1", model = None, parent = None):
        """
        Inicializa el estado Reintento.

        Parameters
        ----------
        module : str, optional
            Nombre del módulo de visión asociado al proceso.

        model : object, optional
            Modelo principal de la aplicación. Contiene los datos del robot,
            inspección visual y comunicación MQTT.

        parent : QState, optional
            Estado padre dentro de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, event):
        """
        Ejecuta las acciones al entrar al estado.

        Inicia el proceso de recuperación para repetir una inspección
        visual.

        Durante la entrada al estado:

        - Obtiene la caja asociada al intento anterior.
        - Notifica al operador que el reintento fue solicitado.
        - Limpia la información temporal del módulo de visión.
        - Restablece la cola de triggers.
        - Elimina resultados obtenidos previamente.
        - Envía el robot a posición Home.

        Parameters
        ----------
        event : QEvent
            Evento generado al ingresar al estado.
        """
        print("############################## ESTADO: reintento VISION ############################")

        box = self.model.vision_data[self.module]["box"]

        command = {
            "lbl_result" : {"text": "ESPERE", "color": "green"},
            "lbl_steps" : {"text": "Botón de reintento presionado", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        self.model.vision_data[self.module]["box"] = ""
        self.model.vision_data[self.module]["queue"].clear()
        self.model.vision_data[self.module]["current_trig"] = None
        self.model.vision_data[self.module]["results"].clear()
        self.model.vision_data[self.module]["rqst"] = None
        self.model.robot.home()
        
    def onExit(self, QEvent):
        """
        Ejecuta las acciones al salir del estado.

        Actualiza la interfaz gráfica indicando que el proceso de inspección
        visual será ejecutado nuevamente y solicita esperar el resultado.

        Parameters
        ----------
        QEvent : QEvent
            Evento generado al abandonar el estado.
        """
        command = {
            "lbl_info1" : {"text": "", "color": "black"},
            "lbl_result" : {"text": "Reintentando inspección por visión", "color": "green"},
            "lbl_steps" : {"text": "Espera el resultado", "color": "black"},
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)