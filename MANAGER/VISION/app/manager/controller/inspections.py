"""
Procesamiento de inspecciones del sistema EVA-MBI-3.

Este módulo contiene la lógica principal de operación de inspeccion basada en
máquina de estados mediante QState y QStateMachine.
"""
from PyQt5.QtCore import QState, pyqtSignal, QObject
from paho.mqtt import publish
from threading import Timer
from cv2 import imread, imwrite
from copy import copy, deepcopy
import json
from time import sleep #para poder usar sleep()
from manager.controller import vision, height
#self.QState.assignProperty(self.button, 'text', 'Off')

class Inspections(QState):
    """
    Estado compuesto encargado de coordinar el proceso completo de inspección
    de visión y alturas.

    Este estado administra el flujo principal de inspección, desde la
    configuración inicial del robot hasta la liberación de las cajas
    inspeccionadas. Además, coordina la ejecución de los módulos de visión
    y alturas, así como la actualización de disparadores (triggers) y la
    sincronización con el robot.

    El flujo de inspección incluye la preparación del robot, la espera de
    condiciones para iniciar el proceso, la ejecución de las inspecciones,
    la liberación de cajas y la notificación cuando todas las inspecciones
    han finalizado.

    Señales
    --------

    - ``finished``:
    Indica que todas las inspecciones de visión y alturas han finalizado
    correctamente y el flujo puede continuar con el siguiente estado de
    la máquina de estados.
    """
    finished  = pyqtSignal()
    def __init__(self, model = None, ID = "1", parent = None):
        """
        Inicializa el controlador de inspecciones.

        Parameters
        ----------
        model : Model, optional
            Modelo compartido que contiene la información del proceso,
            configuración de los módulos y comunicación entre estados.

        ID : str, optional
            Identificador del conjunto de inspección. Se utiliza para
            seleccionar los módulos de visión y alturas correspondientes
            (por ejemplo ``vision1`` y ``height1``).

        parent : QObject, optional
            Estado padre dentro de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model
        self.ID = ID
        self.v_module = "vision"+self.ID
        self.h_module = "height"+self.ID

        self.setup_robot        = SetRobot(model = self.model, parent = self)
        self.update_triggers    = UpdateTriggers(model = self.model, parent = self)
        self.waiting_home       = WaitingHome(model = self.model, parent = self)
        self.liberar_cajas      = LiberarCajas(model = self.model, parent = self)
        self.vision             = vision.Vision(module = self.v_module, model = self.model, parent = self)
        self.height             = height.Height(module = self.h_module, model = self.model, parent = self)
        self.wait_start         = WaitStart(model = self.model, parent = self)
        self.standby            = Standby(model = self.model, parent = self)
        self.stop               = Stop(model = self.model, parent = self)

        #Estado inicial para esperar boton de start en la inspección
        self.wait_start.addTransition(self.model.transitions.start, self.setup_robot)
       
        self.setup_robot.addTransition(self.model.transitions.rbt_home, self.update_triggers)

        # --- if "position_reached" in payload["response"]: ---- self.rbt_pose.emit() --- 
        self.setup_robot.addTransition(self.model.transitions.rbt_home, self.update_triggers)

        #self.update_triggers.addTransition(self.model.transitions.start, self.setup_robot)
        self.setup_robot.addTransition(self.model.transitions.retry_btn, self.setup_robot)

        self.update_triggers.addTransition(self.model.transitions.clamp, self.update_triggers)
        self.update_triggers.addTransition(self.update_triggers.nok, self.standby)
        self.update_triggers.addTransition(self.update_triggers.ok, self.vision)

        self.standby.addTransition(self.model.transitions.clamp, self.wait_start)
        self.standby.addTransition(self.model.transitions.start, self.setup_robot)     
        ##con f96 sin instrumentar
        self.update_triggers.addTransition(self.update_triggers.F96_espera,self.wait_start)
        ##
        self.update_triggers.addTransition(self.update_triggers.BRACKET_PDCD,self.wait_start)
        self.vision.addTransition(self.vision.retry, self.setup_robot)
        self.vision.addTransition(self.vision.finished, self.height)
        self.height.addTransition(self.height.retry, self.setup_robot)
        self.height.addTransition(self.height.finished, self.update_triggers)

        self.update_triggers.addTransition(self.update_triggers.esperar_robot_home,self.waiting_home)
        self.waiting_home.addTransition(self.model.transitions.rbt_home,self.liberar_cajas)
        self.liberar_cajas.addTransition(self.liberar_cajas.ok,self.update_triggers)

        self.update_triggers.finished.connect(self.finished.emit)
        self.setInitialState(self.wait_start)  


class Stop(QState):
    """
    Estado de detención del proceso de inspección.

    Responsable de detener temporalmente la secuencia de inspección
    cuando el robot entra en modo STOP.

    Mientras este estado permanezca activo, la interfaz informa al
    operador que el robot está detenido y que es necesario presionar
    el botón START para reanudar la operación.

    Señales
    --------

    Este estado no define señales propias.
    """
    def __init__(self, model = None, parent = None):
        """
        Inicializa el estado STOP.

        Parameters
        ----------
        model : object, optional
            Modelo principal de la aplicación. Contiene la configuración
            MQTT y referencias utilizadas durante la ejecución del estado.

        parent : QState, optional
            Estado padre dentro de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model

    def onEntry(self, QEvent):
        """
        Ejecuta las acciones al entrar al estado.

        Muestra en la interfaz un mensaje indicando que el robot se
        encuentra en modo STOP y que el operador debe presionar START
        para continuar con la inspección.

        Parameters
        ----------
        QEvent : QEvent
            Evento generado al ingresar al estado.
        """

        print("############################## ESTADO: Stop INSPECTIONS ############################")

        command = {
            "lbl_result" : {"text": "Robot en modo STOP", "color": "red"},
            "lbl_steps" : {"text": "Presiona START para continuar", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)


class WaitStart(QState):
    """
    Estado de espera para iniciar el proceso de inspección.

    Responsable de mantener el sistema en espera hasta que el operador
    presione el botón START para comenzar el ciclo de inspección.

    Mientras este estado permanece activo, se habilitan los controles de
    Raffi y se informa a la interfaz gráfica que el sistema está preparado
    para iniciar la operación.

    Si existe un bracket PDC-D pendiente de colocar, este estado solicita
    al operador realizar la colocación antes de iniciar la inspección.

    Señales
    --------

    Este estado no define señales propias.
    """

    def __init__(self, model = None, parent = None):
        """
        Inicializa el estado WaitStart.

        Parameters
        ----------
        model : object, optional
            Modelo principal de la aplicación. Contiene las variables
            de control del proceso, configuración MQTT y estados de
            operación utilizados durante la ejecución.

        parent : QState, optional
            Estado padre dentro de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model

    def onEntry(self, QEvent):
        """
        Ejecuta las acciones al entrar al estado.

        Habilita la disponibilidad de los controles de Raffi y activa
        la bandera que indica que el sistema se encuentra esperando la
        acción del botón START.

        Dependiendo de la condición del bracket PDC-D, muestra en la
        interfaz gráfica el mensaje correspondiente al operador.

        Parameters
        ----------
        QEvent : QEvent
            Evento generado al ingresar al estado.
        """
        print("############################## ESTADO: WaitStart INSPECTIONS ############################")
        
        #solamente se pueden usar los botones de raffi cuando raffi_disponible sea True
        self.model.raffi_disponible = True

        #variable para indicar que está en el mensaje que pide presionar START
        self.model.start_btn_status = True

        if self.model.PDCD_bracket_pendiente and self.model.PDCD_bracket_terminado==False:

            command = {
                "lbl_result" : {"text": "Coloca el bracket de la caja PDC-D"},
                "lbl_steps" : {"text": "Presiona START para comenzar", "color": "green"},
                "img_center" : "boxes/PDC-Dbracket.jpg"
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        else:
            command = {
                "lbl_result" : {"text": ""},
                "lbl_steps" : {"text": "Presiona START para comenzar", "color": "green"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

    def onExit(self, QEvent):

        print("saliendo de WaitStart, self.model.start_btn_status = False, self.model.raffi_disponible = False")
        self.model.start_btn_status = False
        self.model.raffi_disponible = False


class SetRobot(QState):
    """
    Estado encargado de reiniciar la comunicación con el robot.

    Responsable de realizar la secuencia de reinicio del robot antes de
    continuar con el proceso de inspección.

    Al ingresar a este estado, se informa al operador que el robot está
    siendo reiniciado. Posteriormente se envía una orden de detención y
    después una orden de inicio mediante comunicación MQTT.

    Señales
    --------

    ok : pyqtSignal
        Señal emitida para indicar que la configuración o reinicio del
        robot fue completado correctamente.
    """
    ok     =   pyqtSignal()
    def __init__(self, model = None, parent = None):
        """
        Inicializa el estado SetRobot.

        Parameters
        ----------
        model : object, optional
            Modelo principal de la aplicación. Contiene la configuración
            MQTT y referencias utilizadas durante la ejecución del estado.

        parent : QState, optional
            Estado padre dentro de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model
    def onEntry(self, QEvent):
        """
        Ejecuta las acciones al entrar al estado.

        Envía una notificación a la interfaz gráfica indicando que el robot
        está siendo reiniciado.

        Posteriormente ejecuta la secuencia de reinicio del robot mediante
        MQTT, enviando primero la orden de STOP y después la orden START.

        Parameters
        ----------
        QEvent : QEvent
            Evento generado al ingresar al estado.
        """

        print("############################## ESTADO: SetRobot INSPECTIONS ############################")

        command = {
            "lbl_result" : {"text": "Reiniciando robot", "color": "green"},
            "lbl_steps" : {"text": "Por favor espere", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        publish.single(self.model.pub_topics["robot"],json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
        
        sleep(1)
        publish.single(self.model.pub_topics["robot"],json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)


class WaitingHome(QState):
    """
    Estado de espera del robot en posición Home.

    Responsable de mantener el sistema en espera mientras el robot se
    desplaza a la posición Home para liberar las cajas del proceso.

    Mientras este estado permanece activo, se informa al operador que el
    robot está realizando el movimiento hacia Home y que debe esperar o
    utilizar el botón amarillo para reintentar la operación.

    La variable de control waiting_home permite identificar que el sistema
    se encuentra esperando la confirmación de llegada del robot a la
    posición Home.

    Señales
    --------

    Este estado no define señales propias.
    """
    def __init__(self, model = None, parent = None):
        """
        Inicializa el estado WaitingHome.

        Parameters
        ----------
        model : object, optional
            Modelo principal de la aplicación. Contiene las variables de
            control del proceso, configuración MQTT y estados utilizados
            durante la ejecución.

        parent : QState, optional
            Estado padre dentro de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model

    def onEntry(self, QEvent):
        """
        Ejecuta las acciones al entrar al estado.

        Activa la bandera waiting_home para indicar que el sistema está
        esperando la confirmación de posición Home del robot.

        Envía una notificación a la interfaz gráfica indicando que el robot
        está siendo enviado a Home para liberar las cajas del proceso.

        Parameters
        ----------
        QEvent : QEvent
            Evento generado al ingresar al estado.
        """
        print("############################## ESTADO: WaitingHome INSPECTIONS ############################")
        self.model.waiting_home = True
        command = {
            "lbl_result" : {"text": "Enviando Robot a Home para liberar cajas", "color": "green"},
            "lbl_steps" : {"text": "Espere o reintente con botón amarillo", "color": "navy"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        
    def onExit(self, QEvent):
        #self.model.waiting_home = False, desde comm.py cuando robot manda mensaje de home_reached
        print("saliendo de WaitingHome")

    def onExit(self, QEvent):
        print("saliendo de WaitingHome")
        self.model.waiting_home = False

class LiberarCajas(QState):
    """
    Estado encargado de liberar las cajas sujetadas durante el proceso
    de inspección.

    Responsable de enviar las señales necesarias al PLC para desactivar
    los elementos de sujeción de las cajas cuando las condiciones del
    proceso permiten su liberación.

    Antes de realizar la liberación, valida que el proceso de colocación
    del bracket PDC-D haya finalizado o que no exista un bracket pendiente.
    Si la condición no se cumple, las cajas permanecen sujetas y el estado
    continúa el flujo sin ejecutar la liberación.

    Señales
    --------

    ok : pyqtSignal
        Señal emitida al finalizar el proceso de liberación o cuando la
        operación no puede ejecutarse debido a condiciones del proceso.
    """
    ok     =   pyqtSignal()
    def __init__(self, model = None, parent = None):
        """
        Inicializa el estado LiberarCajas.

        Parameters
        ----------
        model : object, optional
            Modelo principal de la aplicación. Contiene las variables
            de control del proceso, configuración MQTT y comunicación
            con dispositivos externos.

        parent : QState, optional
            Estado padre dentro de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model

    def onEntry(self, QEvent):
        """
        Ejecuta las acciones al entrar al estado.

        Verifica si las condiciones del bracket PDC-D permiten liberar
        las cajas.

        Cuando la liberación está autorizada, envía comandos al PLC para
        desactivar los sujetadores correspondientes a las cajas almacenadas
        en la variable cajas_a_desclampear.

        Después de enviar las señales al PLC, limpia las variables de
        control asociadas al proceso de liberación y emite la señal de
        finalización del estado.

        Si el bracket PDC-D aún no ha sido terminado, no se realiza la
        liberación de cajas y se continúa el flujo del proceso.

        Parameters
        ----------
        QEvent : QEvent
            Evento generado al ingresar al estado.
        """
        print("############################## ESTADO: LiberarCajas INSPECTIONS ############################")

        if self.model.PDCD_bracket_terminado or self.model.PDCD_bracket_pendiente==False:
            print("liberando cajas, enviando señal a plc")
            print("self.model.cajas_a_desclampear: ", self.model.cajas_a_desclampear)

            for box in self.model.cajas_a_desclampear:
                publish.single(self.model.pub_topics["plc"],json.dumps({box : False}),hostname='127.0.0.1', qos = 2)

            #se limpia la variable
            self.model.cajas_a_desclampear = []
            self.model.desclampear_ready = False
            self.ok.emit()
        else:
            print("bracket no terminado, no se liberan cajas")
            self.model.desclampear_ready = False
            self.ok.emit()


class UpdateTriggers(QState):
    """
    Estado encargado de actualizar los triggers de inspección del robot.

    Responsable de preparar la información necesaria para ejecutar las
    inspecciones de visión y altura durante el ciclo de producción.

    Este estado valida las condiciones actuales del proceso, administra
    las cajas disponibles en los clamps, genera las colas de inspección
    del robot y prepara los datos necesarios para las siguientes etapas
    del ciclo.

    También gestiona condiciones especiales del proceso como:

    - Liberación de cajas pendientes.
    - Colocación de bracket PDC-D.
    - Colocación de fusible F96.
    - Finalización del ciclo cuando no existen cajas pendientes.

    Señales
    --------

    ok : pyqtSignal
        Señal emitida cuando una caja queda preparada correctamente para
        iniciar su proceso de inspección.

    finished : pyqtSignal
        Señal emitida cuando todas las inspecciones pendientes han sido
        completadas.

    nok : pyqtSignal
        Señal emitida cuando no existe una caja válida disponible para
        inspección y es necesario solicitar una nueva colocación.

    esperar_robot_home : pyqtSignal
        Señal emitida cuando el robot debe regresar a posición Home antes
        de continuar el proceso.

    F96_espera : pyqtSignal
        Señal emitida cuando el proceso requiere esperar la colocación y
        validación del fusible F96.

    BRACKET_PDCD : pyqtSignal
        Señal emitida cuando el bracket PDC-D ha sido colocado y validado.
    """
    ok          = pyqtSignal()
    finished    = pyqtSignal()
    nok         = pyqtSignal()
    esperar_robot_home = pyqtSignal()
    F96_espera  = pyqtSignal()
    BRACKET_PDCD     = pyqtSignal()
    def __init__(self, model = None, parent = None):
        """
        Inicializa el estado UpdateTriggers.

        Parameters
        ----------
        model : object, optional
            Modelo principal de la aplicación. Contiene la información
            del proceso, configuración de inspecciones, datos del robot,
            estados de clamps y comunicación MQTT.

        parent : QState, optional
            Estado padre dentro de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model

    def onEntry(self, QEvent):
        """
        Ejecuta las acciones al entrar al estado.

        Actualiza la configuración de inspección de acuerdo con las cajas
        disponibles en los clamps y prepara las colas de ejecución del robot.

        Durante su ejecución realiza las siguientes validaciones:

        - Verifica si existen cajas pendientes de liberar.
        - Solicita al robot regresar a Home cuando es necesario.
        - Gestiona la colocación del bracket PDC-D.
        - Gestiona la colocación del fusible F96.
        - Valida cajas disponibles contra la modularidad actual.
        - Actualiza las colas de inspección de visión y altura.
        - Notifica a la interfaz gráfica el estado actual del proceso.

        Las colas generadas son almacenadas en:

        - robot_data["v_queue"] para inspecciones de visión.
        - robot_data["h_queue"] para inspecciones de altura.

        Parameters
        ----------
        QEvent : QEvent
            Evento generado al ingresar al estado.
        """
        print("############################## ESTADO: UpdateTriggers INSPECTIONS ############################")

        if self.model.desclampear_ready == True:
            command = {"trigger": "HOME"}
            publish.single(self.model.pub_topics["robot"], json.dumps(command), hostname='127.0.0.1', qos = 2)
            self.esperar_robot_home.emit()
            return
        if self.model.PDCD_bracket_pendiente and self.model.BRACKET_PDCD_clampeado==False:
            self.model.BRACKET_PDCD_clampeado=True

            #se agrega caja a clamps simulando la acción de clamp_PDC-Dbracket
            self.model.input_data["plc"]["clamps"].append("PDC-Dbracket")
            command = {
                "lbl_box0" : {"text": "PDC-Dbracket:\n clamp correcto", "color": "green", "hidden" : False}
                }
            publish.single(self.model.pub_topics["gui"], json.dumps(command), hostname='127.0.0.1', qos = 2)

            self.BRACKET_PDCD.emit()
            print("va a return de update triggers por pdc dbracket")
            return
        if self.model.F96_pendiente and self.model.F96_clampeado==False:
            self.model.input_data["plc"]["clamps"].append("F96")
            self.model.F96_clampeado=True
            self.F96_espera.emit()
            return
        modularity = self.model.input_data["database"]["modularity"]
        clamps = self.model.input_data["plc"]["clamps"]

        #ya se ha terminado la inspección de todas las cajas
        if not(len(modularity)):
            Timer(0.05,self.finished.emit).start()
            return


        #revisar cajas que tiene modularity pendientes por hacer inspección, PARA ELIMINAR LAS QUE NO SON VÁLIDAS
        print("\n\n-------------------- cajas pendientes... --------------------")
        for caja in modularity:
            print("\n\t" + caja)
            #si la caja actual no está en el arreglo de clamps actuales entonces... (o sea no es una caja válida)
            if not(caja in clamps):

                print("\t(esta caja no está en clamps)")

                #quitar del modelo los puntos de vision y altura de esa caja que no se encontró
                #none, si la llave está en el diccionario la remueve y retorna su valor, si no retorna un default
                #si la llave no está y el default no está definido manda error, entonces se usa un none para decir que no se encontró
                self.model.robot_data["v_queue"].pop(caja, None)
                self.model.robot_data["h_queue"].pop(caja, None)


        #se hace una limpieza de los datos de v_queue y h_queue actuales para volver a agregar y que no se mezclen
        print("se limpian variables... ")
        print("self.model.robot_data[v_queue].clear()")
        print("self.model.robot_data[h_queue].clear()")
        self.model.robot_data["v_queue"].clear()
        self.model.robot_data["h_queue"].clear()

        #si se llega este punto ya se sabe que aún quedan cajas pendientes por hacer, se revisa cuáles de esas están clampeadas
        if len(clamps):

            print("clamps: ",clamps)

            for caja_clampeada in clamps:
                #si la caja está en las modularidades...
                if caja_clampeada in modularity:

                    #si la caja está en el listado del modelo de triggers de visión
                    if caja_clampeada in self.model.v_triggers:

                        print(f"self.model.v_triggers[{caja_clampeada}] = ",self.model.v_triggers[caja_clampeada])

                        #aquí se agregan los triggers a robot_data usando de base lo de rv_triggers del modelo
                        self.model.robot_data["v_queue"][caja_clampeada] = deepcopy(self.model.rv_triggers[caja_clampeada])

                        print(f"self.model.robot_data[v_queue][{caja_clampeada}] = ",self.model.robot_data["v_queue"][caja_clampeada])

                    #si la caja está en el listado del modelo de triggers de alturas
                    if caja_clampeada in self.model.rh_triggers:

                        print(f"self.model.h_triggers[{caja_clampeada}] = ",self.model.h_triggers[caja_clampeada])

                        ############################################################
                        #se agrega revisión de altura solamente si hay contenido de fusibles diferentes a vacío en los fusibles externos de PDC-R
                        if caja_clampeada == "PDC-R":
                            print("se trata de alturas en PDC-R grande")
                            self.model.eliminar_inspeccion_externos = True

                            for fusible in self.model.external_fuses:
                                if self.model.modularity_fuses[caja_clampeada][fusible] != "vacio": #si cualquier fusible externo es diferente de vacío, se hacen inspecciones
                                    self.model.eliminar_inspeccion_externos = False

                            if self.model.eliminar_inspeccion_externos == False:
                                self.model.robot_data["h_queue"][caja_clampeada] = deepcopy(self.model.rh_triggers[caja_clampeada])
                            else:
                                self.model.robot_data["h_queue"][caja_clampeada] = deepcopy(self.model.rh_trigger_pdcr[caja_clampeada])

                        else:
                        ############################################################
                            #FUNCIONAMIENTO NORMAL para agregar inspección de alturas...

                            #aquí se agregan triggers a robot_data usando de base lo de rh_triggers del modelo
                            self.model.robot_data["h_queue"][caja_clampeada] = deepcopy(self.model.rh_triggers[caja_clampeada])

                        print(f"self.model.robot_data[h_queue][{caja_clampeada}] = ",self.model.robot_data["h_queue"][caja_clampeada])

                    else:
                        #se agrega la caja con contenido vacío
                        self.model.robot_data["h_queue"][caja_clampeada] = []
                        print(f"self.model.robot_data[h_queue][{caja_clampeada}] = []")

                    command = {
                        "lbl_result" : {"text": "Inspección en " + caja_clampeada + " preparada", "color": "green"},
                        "lbl_steps" : {"text": "Por favor espere", "color": "black"},
                        "img_center" : "boxes/" + caja_clampeada + ".jpg"
                        }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    #self.model.tries[caja_clampeada] += 1
                     # self.model.robot_data Sale listo y recién horneado de aquí 
                    self.ok.emit()
                    break
                else:
                    clamps.pop(clamps.index(i))
                    command = {
                        "lbl_result" : {"text": ""},
                        "lbl_steps" : {"text": "Coloca la siguiente caja en los nidos", "color": "black"}
                        }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    Timer(0.05, self.model.robot.home).start()
                    self.nok.emit()
                    break
        else:
            command = {
                "lbl_result" : {"text": ""},
                "lbl_steps" : {"text": "Coloca la siguiente caja en los nidos", "color": "black"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            Timer(0.05, self.model.robot.home).start()
            self.nok.emit()

    def onExit(self, QEvent):
        """
        Ejecuta las acciones al salir del estado.

        Finaliza la ejecución del estado UpdateTriggers.

        Parameters
        ----------
        QEvent : QEvent
            Evento generado al abandonar el estado.
        """
        print("Saliendo de UpdateTriggers (inspections.py)")

class Standby(QState):
    """
    Estado de espera del sistema de inspección.

    Responsable de mantener el sistema en estado de espera mientras no se
    ejecuta un ciclo activo de inspección.

    Mientras este estado permanece activo, se habilitan los controles de
    Raffi para permitir la interacción del operador con el sistema.

    Al abandonar este estado, los controles de Raffi son deshabilitados
    para evitar acciones manuales durante la ejecución de otros estados
    del proceso.

    Señales
    --------

    Este estado no define señales propias.
    """
    def __init__(self, model = None, parent = None):
        """
        Inicializa el estado Standby.

        Parameters
        ----------
        model : object, optional
            Modelo principal de la aplicación. Contiene las variables
            de control del proceso y estados utilizados durante la
            ejecución.

        parent : QState, optional
            Estado padre dentro de la máquina de estados.
        """
        super().__init__(parent)
        self.model = model

    def onEntry(self, QEvent):
        """
        Ejecuta las acciones al entrar al estado.

        Habilita la disponibilidad de los controles de Raffi indicando que
        el sistema se encuentra en un estado donde el operador puede
        interactuar manualmente.

        Parameters
        ----------
        QEvent : QEvent
            Evento generado al ingresar al estado.
        """
        print("############################## ESTADO: Standby INSPECTIONS ############################")
        
        print("self.model.raffi_disponible = True")
        #solamente se pueden usar los botones de raffi cuando raffi_disponible sea True
        self.model.raffi_disponible = True

    def onExit(self, QEvent):
        print("saliendo de Standby, self.model.raffi_disponible = False")
        #solamente se pueden usar los botones de raffi cuando raffi_disponible sea True
        self.model.raffi_disponible = False