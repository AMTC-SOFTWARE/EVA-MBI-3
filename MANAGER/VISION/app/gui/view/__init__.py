# -*- coding: utf-8 -*-
"""
@author: MSc. Marco Rutiaga Quezada
"""

from PyQt5 import QtCore
from PyQt5 import QtGui
from PyQt5.QtWidgets import QDialog, QMainWindow, QPushButton, QMessageBox, QLineEdit, QAction, QTableWidgetItem
from PyQt5.QtCore import QPropertyAnimation, pyqtSignal, pyqtSlot, Qt, QTimer, QSize, QObject
from PyQt5.QtGui import QMovie, QPixmap, QColor
from threading import Timer
from os.path import exists
from os import system 
import json 
from datetime import datetime, timedelta
from threading import Timer
from time import strftime, sleep
from copy import copy
import requests
import pandas as pd
from gui.view import resources_rc, main, login, scanner, img_popout, Tabla_horas
from gui.view.comm import MqttClient
from manager.model import Model
import math
import re
import sys
class MainWindow (QMainWindow):

    output = pyqtSignal(dict)
    plc_output = pyqtSignal(dict)
    rbt_output = pyqtSignal(dict)
    
    ready =  pyqtSignal()
    def quitar_numeros_enteros(self,cadena):
        # Utilizar una expresión regular para encontrar y reemplazar números enteros
        resultado = re.sub(r'\d+', '', cadena)
        return resultado
    
    def __init__(self, name = "GUI", topic = "gui", parent = None):
        super().__init__(parent)

        self.model = Model()
        self.ui = main.Ui_main()
        self.qw_login = Login(parent = self)
        self.qw_scanner = Scanner(parent = self)
        self.qw_img_popout = Img_popout(parent = self)
        self.pop_out = PopOut(self)
        self.qw_Tabla_horas = Tabla_hora_w(parent = self)

        self.client = MqttClient(self.model, self)
        self.client.subscribe.connect(self.input)        
        self.output.connect(self.client.publish)
        self.plc_output.connect(self.client.plc_publish)
        self.rbt_output.connect(self.client.rbt_publish)
        self.client.connected.connect(self.ready.emit)

        

        self.model.name = name
        self.model.setTopic = topic.lower() + "/set"
        self.model.statusTopic = topic.lower() + "/status"
        self.ui.setupUi(self)
        self.ui.lbl_result.setText("")
        self.ui.lbl_steps.setText("")
        self.ui.lbl_nuts.setText("")
        #############################
        self.ui.lbl_box1.setText("")
        self.ui.lbl_box2.setText("")
        self.ui.lbl_box3.setText("")
        self.ui.lbl_box4.setText("")
        self.ui.lbl_box5.setText("")
        self.ui.lbl_box6.setText("")
        self.ui.lbl_box7.setText("")
        #############################
        self.ui.lbl_user.setText("")
        self.ui.lbl_info1.setText("")
        self.ui.lbl_info2.setText("")
        self.ui.lbl_info3.setText("")
        self.ui.lbl_info4.setText("")
        self.setWindowTitle(self.model.name)
        self.ui.lineEdit.setPlaceholderText("Fuse boxes QR")
        self.ui.lineEdit.setFocus()
        self.ui.lineEdit.setVisible(False)

        self.ui.lbl_cant.setVisible(False)
        self.ui.lbl_cant2.setVisible(False)
        self.ui.lbl_cant3.setVisible(False)
        
        self.ui.lcdNumber.setVisible(False)
        self.ui.lcdNumtiempo.setVisible(False)
        self.ui.lcdcronometro.setVisible(False)

        menu = self.ui.menuMenu
        actionLogin = QAction("Login",self)
        actionLogout = QAction("Logout",self)
        actionConfig = QAction("Config",self)
        actionWEB = QAction("WEB",self)
        menu.addAction(actionLogin)
        menu.addAction(actionLogout)
        menu.addAction(actionConfig)
        menu.addAction(actionWEB)
        menu.triggered[QAction].connect(self.menuProcess)
        self.ui.btn_hxh.setFocusPolicy(Qt.NoFocus)

        #self.ui.lineEdit.returnPressed.connect(self.qrBoxes)
        self.qw_login.ui.lineEdit.returnPressed.connect( self.login)
        self.qw_login.ui.btn_ok.clicked.connect(self.login)
        self.qw_scanner.ui.btn_ok.clicked.connect(self.scanner)
        self.qw_scanner.ui.lineEdit.returnPressed.connect(self.scanner)
        self.qw_scanner.ui.btn_cancel.clicked.connect(self.qw_scanner.ui.lineEdit.clear)
        self.ui.btn_hxh.clicked.connect(self.horaxhora)
        
        #Botones para Clamp/Desclamp (lambda para darles entrada de un string a los connect)
        self.ui.lbl_box0.clicked.connect(lambda: self.raffi_activation("PDC-Dbracket"))
        self.ui.lbl_box1.clicked.connect(lambda: self.raffi_activation("PDC-D"))
        self.ui.lbl_box2.clicked.connect(lambda: self.raffi_activation("PDC-P"))
        self.ui.lbl_box3.clicked.connect(lambda: self.raffi_activation("PDC-R"))
        self.ui.lbl_box4.clicked.connect(lambda: self.raffi_activation("PDC-S"))
        self.ui.lbl_box5.clicked.connect(lambda: self.raffi_activation("TBLU"))
        self.ui.lbl_box6.clicked.connect(lambda: self.raffi_activation("PDC-P2"))
        self.ui.lbl_box7.clicked.connect(lambda: self.raffi_activation("F96"))
        self.ui.lbl_box8.clicked.connect(lambda: self.raffi_activation("MFB-P2"))
        self.ui.lbl_box9.clicked.connect(lambda: self.raffi_activation("MFB-P1"))
        self.ui.lbl_box10.clicked.connect(lambda: self.raffi_activation("MFB-S"))
        self.ui.lbl_box11.clicked.connect(lambda: self.raffi_activation("MFB-E"))
        
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.status)
        #self.timer.start(200)
        
        
        self.allow_close        = True
        self.cycle_started      = False
        self.shutdown           = False
        self.rbt_home           = False

        
   #Funcion para iniciar la animacion gif
    def start_raffi_animation(self, box):
        print("EJECUTANDO START_RAFFI_ANIMATION")
        print(f"ACTIVANDO ANIMACION PARA: {box}")
        print("*********************************************** \n")
        
        if box == "PDC-Dbracket":
            self.ui.lbl_box0.setIcon(QtGui.QIcon(self.ui.lbl_box_0movie.currentPixmap()))
            self.ui.lbl_box_0movie.start()
        elif box == "PDC-D":
            self.ui.lbl_box1.setIcon(QtGui.QIcon(self.ui.lbl_box_1movie.currentPixmap()))
            self.ui.lbl_box_1movie.start()
        elif box == "PDC-P":
            self.ui.lbl_box2.setIcon(QtGui.QIcon(self.ui.lbl_box_2movie.currentPixmap()))
            self.ui.lbl_box_2movie.start()
        elif box == "PDC-R":
            self.ui.lbl_box3.setIcon(QtGui.QIcon(self.ui.lbl_box_3movie.currentPixmap()))
            self.ui.lbl_box_3movie.start()
        elif box == "PDC-S":
            self.ui.lbl_box4.setIcon(QtGui.QIcon(self.ui.lbl_box_4movie.currentPixmap()))
            self.ui.lbl_box_4movie.start()
        elif box == "TBLU":
            self.ui.lbl_box5.setIcon(QtGui.QIcon(self.ui.lbl_box_5movie.currentPixmap()))
            self.ui.lbl_box_5movie.start()  
        elif box == "PDC-P2":
            self.ui.lbl_box6.setIcon(QtGui.QIcon(self.ui.lbl_box_6movie.currentPixmap()))
            self.ui.lbl_box_6movie.start() 
        elif box == "F96":
            self.ui.lbl_box7.setIcon(QtGui.QIcon(self.ui.lbl_box_7movie.currentPixmap()))
            self.ui.lbl_box_7movie.start() 
        elif box == "MFB-P2":
            self.ui.lbl_box8.setIcon(QtGui.QIcon(self.ui.lbl_box_8movie.currentPixmap()))
            self.ui.lbl_box_8movie.start()
        elif box == "MFB-P1":
            self.ui.lbl_box9.setIcon(QtGui.QIcon(self.ui.lbl_box_9movie.currentPixmap()))
            self.ui.lbl_box_9movie.start() 
        elif box == "MFB-S":
            self.ui.lbl_box10.setIcon(QtGui.QIcon(self.ui.lbl_box_10movie.currentPixmap()))
            self.ui.lbl_box_10movie.start() 
        elif box == "MFB-E":
            self.ui.lbl_box11.setIcon(QtGui.QIcon(self.ui.lbl_box_11movie.currentPixmap()))
            self.ui.lbl_box_11movie.start()      
        
        
              
    def stop_raffi_animation(self, box):
        print("EJECUTANDO STOP_RAFFI_ANIMATION")
        print(f"DETENIENDO ANIMACION PARA: {box}")
        print("*********************************************** \n")
        
        if box == "PDC-Dbracket":
            self.ui.lbl_box0.setIcon(QtGui.QIcon())
            self.ui.lbl_box_0movie.stop()
        elif box == "PDC-D":
            self.ui.lbl_box1.setIcon(QtGui.QIcon())
            self.ui.lbl_box_1movie.stop()
        elif box == "PDC-P":
            self.ui.lbl_box2.setIcon(QtGui.QIcon())
            self.ui.lbl_box_2movie.stop()
        elif box == "PDC-R":
            self.ui.lbl_box3.setIcon(QtGui.QIcon())
            self.ui.lbl_box_3movie.stop()
        elif box == "PDC-S":
            self.ui.lbl_box4.setIcon(QtGui.QIcon())
            self.ui.lbl_box_4movie.stop()
        elif box == "TBLU":
            self.ui.lbl_box5.setIcon(QtGui.QIcon())
            self.ui.lbl_box_5movie.stop()  
        elif box == "PDC-P2":
            self.ui.lbl_box6.setIcon(QtGui.QIcon())
            self.ui.lbl_box_6movie.stop() 
        elif box == "F96":
            self.ui.lbl_box7.setIcon(QtGui.QIcon())
            self.ui.lbl_box_7movie.stop() 
        elif box == "MFB-P2":
            self.ui.lbl_box8.setIcon(QtGui.QIcon())
            self.ui.lbl_box_8movie.stop()
        elif box == "MFB-P1":
            self.ui.lbl_box9.setIcon(QtGui.QIcon())
            self.ui.lbl_box_9movie.stop() 
        elif box == "MFB-S":
            self.ui.lbl_box10.setIcon(QtGui.QIcon())
            self.ui.lbl_box_10movie.stop() 
        elif box == "MFB-E":
            self.ui.lbl_box11.setIcon(QtGui.QIcon())
            self.ui.lbl_box_11movie.stop()  
        
    def start_robot(self):
        print("EJECUTANDO START_ROBOT")
        print("ENVIANDO COMMAND:START")
        print("*********************************************** \n")
 
        #Comando para enviar al topico del Robot
        self.rbt_output.emit({"command": "start"})
            
    def raffi_activation(self, box):
        print("\n ***** EJECUTANDO RAFFI_ACTIVATION *****")
        print(f"CAJA CLICKEADA: {box}")
        print("*********************************************** \n")

        #Primero en una lista guardamos cada texto contenido de los botones que se llenan al momento de escanear el ARNES
        text_buttons = [self.ui.lbl_box0.text(),self.ui.lbl_box1.text(), self.ui.lbl_box2.text(),
                        self.ui.lbl_box3.text(), self.ui.lbl_box4.text(),
                        self.ui.lbl_box5.text(), self.ui.lbl_box6.text(),
                        self.ui.lbl_box7.text(), self.ui.lbl_box8.text(),
                        self.ui.lbl_box9.text(), self.ui.lbl_box10.text(),
                        self.ui.lbl_box11.text()]
        
        print("Texto actual de los lbl ",text_buttons," \n")
 
        #Hacemos un recorrido de cada texto en la lista text_buttons
        flag = False
        
        for i in text_buttons:
            if box in i:
                if "correcto" in i:
                    print("Correcto en: ",box)
                    
                    #Iniciamos la animacion de carga
                    self.start_raffi_animation(box)

                    #Si el robot no esta en HOME se envia el comando para enviarlo antes de desclampear una caja.
                    if self.rbt_home == False:
                        print("rbt_home == False")
                        print("Enviando stop a robot: command:stop")
                        self.rbt_output.emit({"command":"stop"})
                        Timer(0.5, self.start_robot).start()
                        print("*********************************************** \n")
                    
                    #En model.cajas_raffi se van agregando las cajas que queremos desclampear
                    if box in self.model.cajas_raffi:
                        print(f"la caja: {box} se encuentra agregada a la lista para desclampear \n")
                        
                        #Si el Robot esta en Home, entra y si no, no desclampea la caja
                        if self.rbt_home == True:
                            print("***********************************************")
                            print("rbt_home == True \n")
                            
                            print("***********************************************")
                            print(f"Caja: {box} fue removida de la lista para desclampear")
                            
                            #Como no sabemos que indice tiene la caja X, guardamos en una variable el valor del indice enviandole el string de la caja
                            indx_pdcd = self.model.cajas_raffi.index(box)

                            #Le hacemos un pop con el indice obtenido para removerla y evitar multiples agregados cada vez que presionan el boton
                            self.model.cajas_raffi.pop(indx_pdcd)
                            
                            box_pdcrs = False
                            #Se hace una condicion para la caja R y habilitar el nido correcto
                            if box == "PDC-R" and "PDC-RMID" in self.model.input_data["database"]["modularity"]:
                                box = "PDC-RMID"
                            elif box == "PDC-R" and "PDC-RS" in self.model.input_data["database"]["modularity"]:
                                print("es una caja PDC-RS pero se está convirtiendo a PDC-RMID en gui porque en GDI no hay PDC-RS")
                                box_pdcrs = True
                                box = "PDC-RMID" #esto es solamente para habilitar el nido

                            print(f"Enviando señal {box}:False a PLC \n")
                            self.plc_output.emit({box:False})

                            if box_pdcrs == True:
                                box_pdcrs = False
                                print("regresando PDC-RMID a PDC-RS")
                                box = "PDC-RS"

                            if box in self.model.input_data["plc"]["clamps"]:
                                print(f"Removiendo {box} de model.input_data[plc][clamps] \n")
                                
                                self.model.input_data["plc"]["clamps"].pop(self.model.input_data["plc"]["clamps"].index(box))
                                print("Lista actualizada despues de remover la caja... ",self.model.input_data["plc"]["clamps"])
                            else:
                                print("la caja " + box + " no se encuentra dentro de model.input_data[plc][clamps]")
                                
                            if box == "PDC-Dbracket":
                                self.ui.lbl_box0.setText("PDC-Dbracket:\n Habilitar") #tiene que decir Habilitar para su funcionamiento
                                self.ui.lbl_box0.setStyleSheet("color: red;")

                            if len(self.model.input_data["plc"]["clamps"]) > 0:
                                print("Aun hay cajas puestas en los nidos: ",self.model.input_data["plc"]["clamps"])
                                self.ui.lbl_steps.setText("Presiona START o REINTENTO para comenzar")
                                self.ui.lbl_steps.setStyleSheet("color: green;")
                                
                            else:
                                print("¡No hay ninguna caja puesta en los nidos! \n")
                                self.ui.lbl_steps.setText("Coloca las cajas en los nidos para continuar")
                                self.ui.lbl_steps.setStyleSheet("color: navy;")
                            
                            #Si ya no quedan mas cajas en la lista, se manda a false la variable rbt_home
                            if len(self.model.cajas_raffi) > 0:
                                print("Aun quedan cajas:", self.model.cajas_raffi)
                            else:
                                self.rbt_home = False
                    else:
                        #Se agrega una vez a la lista
                        self.model.cajas_raffi.append(box) 
                        print("Caja agregada a la lista para desclampear: ",self.model.cajas_raffi)
                        
                    flag = True
                        
                elif box in i and "Habilitar" in i:
    
                    if box == "PDC-Dbracket" and box not in self.model.input_data["plc"]["clamps"]:
                        self.model.input_data["plc"]["clamps"].append(box)
                        
                        self.ui.lbl_box0.setText(" PDC-Dbracket:\n clamp correcto")
                        self.ui.lbl_box0.setStyleSheet("color: green;") 

                    #Se hace una condicion para la caja R y habilitar el nido correcto
                    if box == "PDC-R" and "PDC-RMID" in self.model.input_data["database"]["modularity"]:
                        box = "PDC-RMID"
                    elif box == "PDC-R" and "PDC-RS" in self.model.input_data["database"]["modularity"]:
                        print("es una caja PDC-RS pero se está convirtiendo a PDC-RMID en gui porque en GDI no hay PDC-RS")
                        box_pdcrs = True
                        box = "PDC-RMID" #esto es solamente para habilitar el nido

                    print(f"entró a Habilitar de {box}, enviando señal {box}:True a PLC")      
                    self.plc_output.emit({box:True})
                    
                    flag = True
                    
        if flag == False:
            print("No se envio ninguna accion")
                
    def horaxhora(self):
        #self.qw_Tabla_horas.show()
        print("vamos a calcular los hora por hora")
        horario_turno1={"7":0,
                        "8":0,
                        "9":0,
                        "10":0,
                        "11":0,
                        "12":0,
                        "13":0,
                        "14":0,
                        "15":0,
                        "16":0,
                        "17":0,
                        "18":0,
                        "19":0,
                        "20":0,
                        "21":0,
                        "22":0,
                        "23":0,
                        "00":0,
                        "01":0,
                        "02":0,
                        "03":0,
                        "04":0,
                        "05":0,
                        "06":0,
                        }


        
        try:
            turnos = {
            "1":["07-00","18-59"],
            "2":["19-00","06-59"],
            }

            endpoint = "http://{}/horaxhora/historial/FIN".format(self.model.server)
            response = requests.get(endpoint, data=json.dumps(turnos))
            response = response.json()
            
            arneses_turno=pd.DataFrame({'HM': response['HM'],
                   'INICIO': response['INICIO'],
                   'FIN': response['FIN'],
                   'RESULTADO': response['RESULTADO'],
                   'USUARIO': response['USUARIO']})
            
            
            arneses_turno['INICIO']=pd.to_datetime(arneses_turno['INICIO'])
            arneses_turno['FIN']=pd.to_datetime(arneses_turno['FIN'])
            arneses_turno['RESULTADO']=arneses_turno['RESULTADO'].astype("string")

            #Calcula Duración de ciclo de los arneses
            arneses_turno["INTERVALO"]=arneses_turno['FIN']-arneses_turno['INICIO']
            total_minutos_perdidos={}
            Arneses_cada_hora={}
            promedio_ciclo={}
            mejor_tiempo_hora={}
            mejor_tiempo_hora_usuario={}
            mejor_tiempo = pd.to_timedelta('1 hours')
            peor_tiempo = pd.to_timedelta('0 hours')
            usuario=""
            for hora in horario_turno1:
                hora_inicio = pd.to_datetime(f'{hora}:00:00').time()
                
                if hora=="23":
                    hora_fin = pd.to_datetime('23:59:59').time()
                else:
                    hora_siguiente=str(int(hora)+1)
                    hora_fin = pd.to_datetime(f'{hora_siguiente}:00:00').time()
                
                # Aplicamos el filtro para seleccionar las filas dentro del intervalo de horas.
                #horario_turno1[hora] = arneses_turno[(arneses_turno['FIN'].dt.time >= hora_inicio) & (arneses_turno['FIN'].dt.time <= hora_fin) & (arneses_turno['RESULTADO']=="2")]
                
                base_temporal = arneses_turno[(arneses_turno['FIN'].dt.time >= hora_inicio) & (arneses_turno['FIN'].dt.time <= hora_fin) & (arneses_turno['RESULTADO']=="2")]
                
                promedio_ciclo[hora]=base_temporal['INTERVALO'].mean().total_seconds() / 60
                
                mejor_tiempo_hora_usuario[hora]=base_temporal['INTERVALO'].min(skipna=True)
                mejor_tiempo_hora[hora]=base_temporal['INTERVALO'].min(skipna=True).total_seconds() / 60

                nuevo_usuario=base_temporal.loc[base_temporal['INTERVALO'] == mejor_tiempo_hora_usuario[hora], 'USUARIO']
                

                nuevo_mejor_tiempo=base_temporal['INTERVALO'].min(skipna=True)
                nuevo_peor_tiempo=base_temporal['INTERVALO'].max(skipna=True)
                

                # Verificamos si el resultado no es None o NaN antes de imprimir o usar el valor.

                if pd.notna(nuevo_mejor_tiempo):
                    if nuevo_mejor_tiempo<=mejor_tiempo:
                        mejor_tiempo=nuevo_mejor_tiempo
                        usuario=nuevo_usuario
                else:
                    print("No hay valores válidos en la columna 'intervalo'.")
                if pd.notna(nuevo_peor_tiempo):
                    if nuevo_peor_tiempo>=peor_tiempo:
                        peor_tiempo=nuevo_peor_tiempo

                else:
                    print("No hay valores válidos en la columna 'intervalo'.")
                #Se suman los tiemos de cada hora para saber cuanto tiempo estuvo la maquina sin trabajar
                # Convertimos la columna 'tiempos' a tipo timedelta.
                base_temporal['INTERVALO'] = pd.to_timedelta(base_temporal['INTERVALO'])
                # Sumamos los tiempos y lo convertimos a minutos.
                total_minutos_perdidos[hora] =60 - base_temporal['INTERVALO'].sum().total_seconds() / 60
                
                Arneses_cada_hora[hora] = base_temporal.shape[0]
                #horario_turno1[hora]["Arneses_cada_hora"] =base_temporal.shape[0]

            
            
            #self.qw_scanner.setVisible(show["scanner"])
            #item = self.tableWidget.horizontalHeaderItem(1)
            #item.setText(_translate("Ui_Tabla_h", "Mejor Tiempo"))
            fila=0
            for hora in Arneses_cada_hora:
                
                # Rellena la cantidad de arneses en la tabla
                celda_cantidad_arneses = QTableWidgetItem("                 "+str(Arneses_cada_hora[hora]))
                if Arneses_cada_hora[hora]> 0:

                   celda_cantidad_arneses.setBackground(QColor("cyan"))
                
                self.qw_Tabla_horas.ui.tableWidget.setItem(fila,0,celda_cantidad_arneses)
                
                #Rellena el mejor tiempo en la tabla
                if isinstance(mejor_tiempo_hora[hora], float) and not (math.isnan(mejor_tiempo_hora[hora]) or math.isinf(mejor_tiempo_hora[hora])):
                    # Obtener la parte entera y decimal
                    parte_entera = int(mejor_tiempo_hora[hora])
                    parte_decimal = mejor_tiempo_hora[hora] - parte_entera
                    
                    # Convertir la parte decimal a segundos
                    segundos = round(parte_decimal * 60)
                    

                    celda_mejor_tiempo=QTableWidgetItem(f"   {parte_entera} minutos, {segundos} s." )
                else:
                    celda_mejor_tiempo=QTableWidgetItem("0")
                
                self.qw_Tabla_horas.ui.tableWidget.setItem(fila,1,celda_mejor_tiempo)
                
                #Rellena elpromedio de tiempo ciclo en la tabla
                if isinstance(promedio_ciclo[hora], float) and not (math.isnan(promedio_ciclo[hora]) or math.isinf(promedio_ciclo[hora])):
                    # Obtener la parte entera y decimal
                    parte_entera = int(promedio_ciclo[hora])
                    parte_decimal = promedio_ciclo[hora] - parte_entera
                    
                    # Convertir la parte decimal a segundos
                    segundos = round(parte_decimal * 60)
                    

                    celda_promedio_ciclo=QTableWidgetItem(f"   {parte_entera} minutos, {segundos} s." )
                else:
                    celda_promedio_ciclo=QTableWidgetItem("0")
                self.qw_Tabla_horas.ui.tableWidget.setItem(fila,2,celda_promedio_ciclo)


                #Rellena los minutos perdidos cada hora en la tabla
                if isinstance(total_minutos_perdidos[hora], float) and not (math.isnan(total_minutos_perdidos[hora]) or math.isinf(total_minutos_perdidos[hora])):
                    # Obtener la parte entera y decimal
                    parte_entera = int(total_minutos_perdidos[hora])
                    parte_decimal = total_minutos_perdidos[hora] - parte_entera
                    
                    # Convertir la parte decimal a segundos
                    segundos = round(parte_decimal * 60)
                    

                    celda_minutos_perdidos=QTableWidgetItem(f"   {parte_entera} minutos, {segundos} s." )
                else:
                    celda_minutos_perdidos=QTableWidgetItem("0")
                
                self.qw_Tabla_horas.ui.tableWidget.setItem(fila,3,celda_minutos_perdidos)


                fila+=1
            if mejor_tiempo.total_seconds() < self.model.mejor_tiempo:
                self.model.mejor_tiempo=float(mejor_tiempo.total_seconds())
            # Obtener la parte entera y decimal
            parte_entera = int(self.model.mejor_tiempo / 60)
            parte_decimal = (self.model.mejor_tiempo / 60) - parte_entera
            
            # Convertir la parte decimal a segundos
            segundos = round(parte_decimal * 60)
            
            self.qw_Tabla_horas.ui.label_3.setText(f"Tiempo record: {parte_entera} minutos, {segundos} s.")

            
            mejor_tiempo_str=str(mejor_tiempo.total_seconds() / 60)
            usuario=str(usuario)
            usuario=usuario.replace("Name: USUARIO, dtype: object","")

            usuario_sin_numeros = self.quitar_numeros_enteros(usuario)
            
            
            self.qw_Tabla_horas.ui.label_2.setText(f"{usuario_sin_numeros}     con el mejor Tiempo")

            
            
            
            self.qw_Tabla_horas.show()
            

        except Exception as ex:
            print("Error en el conteo ", ex)
        
    def menuProcess(self, q):
        try:
            case = q.text()               
            if case == "Login":
                self.qw_login.ui.lineEdit.setText("")
                self.qw_login.ui.lineEdit.setPlaceholderText("Escanea o escribe tu codigo")
                self.output.emit({"request":"login"})
            elif case == "Logout":
                if self.cycle_started == False:
                    self.qw_login.ui.lineEdit.setText("")
                    self.qw_login.ui.lineEdit.setPlaceholderText("Escanea o escribe tu codigo")
                    self.output.emit({"request":"logout"})
                else:
                    self.pop_out.setText("Ciclo en proceso no se permite el logout")
                    self.pop_out.setWindowTitle("Warning")
                    QTimer.singleShot(2000, self.pop_out.button(QMessageBox.Ok).click)
                    self.pop_out.exec()
            elif case == "Config":
                if self.cycle_started == False:
                    self.output.emit({"request":"config"})
                else:
                    self.pop_out.setText("Ciclo en proceso no se permite la configuración")
                    self.pop_out.setWindowTitle("Warning")
                    QTimer.singleShot(2000, self.pop_out.button(QMessageBox.Ok).click)
                    self.pop_out.exec()
            elif case == "WEB":
                if exists("C:\BIN\WEB.url"):
                    Timer(0.05, self.launchWEB).start()
                else:   
                    self.pop_out.setText("No se encontró la página WEB")
                    self.pop_out.setWindowTitle("Error")
                    QTimer.singleShot(2000, self.pop_out.button(QMessageBox.Ok).click)
                    self.pop_out.exec()
        except Exception as ex:
            print("menuProcess() exceptión: ", ex)

    def launchWEB(self):
        try:
            self.output.emit({"WEB": "open"})
            system("C:\BIN\WEB.url")
        except Exception as ex:
            print("launchWEB() exception: ", ex)

    @pyqtSlot()
    def status (self):
        try:
            if self.isVisible() != self.model.status["visible"]["gui"]:
                self.model.status["visible"]["gui"] = self.isVisible()
                self.output.emit({"visible": {"gui": self.isVisible()}})
        
            if self.qw_login.isVisible() != self.model.status["visible"]["login"]:
                self.model.status["visible"]["login"] = self.qw_login.isVisible()
                self.output.emit({"visible": {"login": self.qw_login.isVisible()}})

            if self.qw_scanner.isVisible() != self.model.status["visible"]["scanner"]:
                self.model.status["visible"]["scanner"] = self.qw_scanner.isVisible()
                self.output.emit({"visible": {"scanner": self.qw_scanner.isVisible()}})

            if self.pop_out.isVisible() != self.model.status["visible"]["pop_out"]:
                self.model.status["visible"]["pop_out"] = self.pop_out.isVisible()
                self.output.emit({"visible": {"pop_out": self.pop_out.isVisible()}})

        except Exception as ex:
            print("status() exception: ", ex)

    @pyqtSlot()
    def login (self):
        try:
            text = self.qw_login.ui.lineEdit.text()
            if len(text) > 0: 
                self.output.emit({"ID":text})
                self.qw_login.ui.lineEdit.setPlaceholderText("Código de acceso")
            else:
                self.qw_login.ui.lineEdit.setPlaceholderText("Código vacío intenta de nuevo.")
            self.qw_login.ui.lineEdit.clear()
            self.qw_login.ui.lineEdit.setFocus()
        except Exception as ex:
            print("login() exception: ", ex)

    @pyqtSlot()
    def scanner (self):
        try:
            text = self.qw_scanner.ui.lineEdit.text().upper()
            if len(text) > 0: 
                self.output.emit({"code":text})
                self.qw_scanner.ui.lineEdit.setPlaceholderText("Código Qr")
            else:
                self.qw_scanner.ui.lineEdit.setPlaceholderText("Código vacío intenta de nuevo.")
            self.qw_scanner.ui.lineEdit.clear()
            self.qw_scanner.ui.lineEdit.setFocus()
        except Exception as ex:
            print("scanner exception:", ex)

    @pyqtSlot()
    def qrBoxes (self):
        try:
            text = self.ui.lineEdit.text().upper()
            if len(text) > 0: 
                self.output.emit({"qr_box":text})
                self.ui.lineEdit.setPlaceholderText("Fuse boxes QR")
            else:
                self.ui.lineEdit.setPlaceholderText("Fuse boxes QR")
            self.ui.lineEdit.clear()
            #self.ui.lineEdit.setFocus()
        except Exception as ex:
            print("qrBoxes exception:", ex)

    @pyqtSlot(dict)
    def input(self, message):
        try:
            #Respuesta del Robot
            if "response" in message:
                if "home_reached" in message["response"]:
                    print("########## ROBOT : HOME REACHED ##########")
                    
                    #Verificamos si hay alguna caja en la lista
                    if len(self.model.cajas_raffi) > 0:
                        print("Caja dentro de model.cajas_raffi: ",self.model.cajas_raffi)
                        
                        #Se hace true la variable en caso de que si hay cajas dentro de la lista
                        print("Cambiando valor de rbt_home a True \n")
                        self.rbt_home = True
                        
                        if "PDC-Dbracket" in self.model.cajas_raffi:
                            print("Llamando a la funcion raffi_activation para desclampear caja...")
                            self.raffi_activation("PDC-Dbracket")
                            self.stop_raffi_animation("PDC-Dbracket")
                            
                        if "PDC-D" in self.model.cajas_raffi:
                            print("Llamando a la funcion raffi_activation para desclampear caja...")
                            self.raffi_activation("PDC-D")
                            self.stop_raffi_animation("PDC-D")
                            
                        elif "PDC-P" in self.model.cajas_raffi:
                            print("Llamando a la funcion raffi_activation para desclampear caja...")
                            self.raffi_activation("PDC-P")
                            self.stop_raffi_animation("PDC-P")

                        elif "PDC-R" in self.model.cajas_raffi:
                            print("Llamando a la funcion raffi_activation para desclampear caja...")
                            self.raffi_activation("PDC-R")
                            self.stop_raffi_animation("PDC-R")
                            
                        elif "PDC-S" in self.model.cajas_raffi:
                            print("Llamando a la funcion raffi_activation para desclampear caja...")
                            self.raffi_activation("PDC-S")
                            self.stop_raffi_animation("PDC-S")
                            
                        elif "TBLU" in self.model.cajas_raffi:
                            print("Llamando a la funcion raffi_activation para desclampear caja...")
                            self.raffi_activation("TBLU")
                            self.stop_raffi_animation("TBLU")
                            
                        elif "PDC-P2" in self.model.cajas_raffi:
                            print("Llamando a la funcion raffi_activation para desclampear caja...")
                            self.raffi_activation("PDC-P2")
                            self.stop_raffi_animation("PDC-P2")

                        elif "F96" in self.model.cajas_raffi:
                            print("Llamando a la funcion raffi_activation para desclampear caja...")
                            self.raffi_activation("F96")
                            self.stop_raffi_animation("F96")
                            
                        elif "MFB-P2" in self.model.cajas_raffi:
                            print("Llamando a la funcion raffi_activation para desclampear caja...")
                            self.raffi_activation("MFB-P2")
                            self.stop_raffi_animation("MFB-P2")
                            
                        elif "MFB-P1" in self.model.cajas_raffi:
                            print("Llamando a la funcion raffi_activation para desclampear caja...")
                            self.raffi_activation("MFB-P1")
                            self.stop_raffi_animation("MFB-P1")
                            
                        elif "MFB-S" in self.model.cajas_raffi:
                            print("Llamando a la funcion raffi_activation para desclampear caja...")
                            self.raffi_activation("MFB-S")
                            self.stop_raffi_animation("MFB-S")
                            
                        elif "MFB-E" in self.model.cajas_raffi:
                            print("Llamando a la funcion raffi_activation para desclampear caja...")
                            self.raffi_activation("MFB-E")    
                            self.stop_raffi_animation("MFB-E")    
                    else:
                        print("No hay cajas en la lista ...")
                        print("rbt_home = False")
                        self.rbt_home = False
                    
            #print(message)
            if "shutdown" in message:
                if message["shutdown"] == True:
                    self.shutdown = True
                    QTimer.singleShot(4000, self.close)
            if "allow_close" in message:
                if type(message["allow_close"]) == bool:
                    self.allow_close = message["allow_close"]
                else:
                    raise ValueError('allow_close must a boolean.')
            if "cycle_started" in message:
                if type(message["cycle_started"]) == bool:
                    self.cycle_started = message["cycle_started"]
                else:
                    raise ValueError('allow_close must a boolean.')
            if "request" in message:
                if message["request"] == "status":
                    QTimer.singleShot(100, self.sendStatus)
            if "lbl_info1" in message:
                self.ui.lbl_info1.setText(message["lbl_info1"]["text"])
                if "color" in message["lbl_info1"]:
                    self.ui.lbl_info1.setStyleSheet("color: " + message["lbl_info1"]["color"])
            if "lbl_info2" in message:
                self.ui.lbl_info2.setText(message["lbl_info2"]["text"])
                if "color" in message["lbl_info2"]:
                    self.ui.lbl_info2.setStyleSheet("color: " + message["lbl_info2"]["color"])
            if "lbl_info3" in message:
                self.ui.lbl_info3.setText(message["lbl_info3"]["text"])
                if "color" in message["lbl_info3"]:
                    self.ui.lbl_info3.setStyleSheet("color: " + message["lbl_info3"]["color"])
            if "lbl_info4" in message:
                self.ui.lbl_info4.setText(message["lbl_info4"]["text"])
                if "color" in message["lbl_info4"]:
                    self.ui.lbl_info4.setStyleSheet("color: " + message["lbl_info4"]["color"])
                if "ancho" in message["lbl_info4"]:
                    if "alto" in message["lbl_info4"]:

                        ancho = int(message["lbl_info4"]["ancho"])
                        alto = int(message["lbl_info4"]["alto"])

                        #self.ui.lbl_info4.setMinimumSize(QSize(ancho, alto))
                        #self.ui.lbl_info4.setMaximumSize(QSize(ancho, alto))

            if "lbl_nuts" in message:
                self.ui.lbl_nuts.setText(message["lbl_nuts"]["text"])
                if "color" in message["lbl_nuts"]:
                    self.ui.lbl_nuts.setStyleSheet("color: " + message["lbl_nuts"]["color"])

            if "lcdNumber" in message:
                if "value" in message["lcdNumber"]:

                    print("mememe mensaje: ",message["lcdNumber"])
                    self.ui.lcdNumber.display(message["lcdNumber"]["value"])
                if "visible" in message["lcdNumber"]:
                    #### Visualizacion del LCD
                    self.ui.lbl_cant.setVisible(message["lcdNumber"]["visible"])
                    self.ui.lcdNumber.setVisible(message["lcdNumber"]["visible"])

            if "lcdNumtiempo" in message:
                
                if "label_name" in message["lcdNumtiempo"]:
                    self.ui.lbl_cant2.setText(message["lcdNumtiempo"]["label_name"])
                if "value" in message["lcdNumtiempo"]:
                    self.ui.lcdNumtiempo.display(message["lcdNumtiempo"]["value"])
                if "visible" in message["lcdNumtiempo"]:
                    #### Visualizacion del LCD
                    self.ui.lbl_cant2.setVisible(message["lcdNumtiempo"]["visible"])
                    self.ui.lcdNumtiempo.setVisible(message["lcdNumtiempo"]["visible"])
                if "color" in message["lcdNumtiempo"]:
                     color_back=message["lcdNumtiempo"]["color"]
                     self.ui.lbl_cant2.setStyleSheet("color: #214562; font-size:20px;background-color:" + message["lcdNumtiempo"]["color"]+ "; border-radius:20px; margin-bottom: 5px")

            if "lcdcronometro" in message:
                
                if "label_name" in message["lcdcronometro"]:
                    self.ui.lbl_cant3.setText(message["lcdcronometro"]["label_name"])
                if "value" in message["lcdcronometro"]:
                    self.ui.lcdcronometro.display(message["lcdcronometro"]["value"])
                if "visible" in message["lcdcronometro"]:
                    #### Visualizacion del LCD
                    self.ui.lbl_cant3.setVisible(message["lcdcronometro"]["visible"])
                    self.ui.lcdcronometro.setVisible(message["lcdcronometro"]["visible"])
                if "color" in message["lcdcronometro"]:
                     color_back=message["lcdcronometro"]["color"]
                     self.ui.lbl_cant3.setStyleSheet("color: #214562; font-size:20px;background-color:" + message["lcdcronometro"]["color"]+ "; border-radius:20px; margin-bottom: 5px")
            ###########################################################################
            #Modificacion para PDC-D Bracket         
            if "lbl_box0" in message:
                self.ui.lbl_box0.setText(message["lbl_box0"]["text"])
                if "color" in message["lbl_box0"]:
                    self.ui.lbl_box0.setStyleSheet("color: " + message["lbl_box0"]["color"])
                if "hidden" in message["lbl_box0"]:
                    self.ui.lbl_box0.setHidden(message["lbl_box0"]["hidden"])
                    
            if "lbl_box1" in message:
                self.ui.lbl_box1.setText(message["lbl_box1"]["text"])
                if "color" in message["lbl_box1"]:
                    self.ui.lbl_box1.setStyleSheet("color: " + message["lbl_box1"]["color"])
                if "hidden" in message["lbl_box1"]:
                    self.ui.lbl_box1.setHidden(message["lbl_box1"]["hidden"])
                    
            if "lbl_box2" in message:
                self.ui.lbl_box2.setText(message["lbl_box2"]["text"])
                if "color" in message["lbl_box2"]:
                    self.ui.lbl_box2.setStyleSheet("color: " + message["lbl_box2"]["color"])
                if "hidden" in message["lbl_box2"]:
                    self.ui.lbl_box2.setHidden(message["lbl_box2"]["hidden"])
                    
            if "lbl_box3" in message:
                self.ui.lbl_box3.setText(message["lbl_box3"]["text"])
                if "color" in message["lbl_box3"]:
                    self.ui.lbl_box3.setStyleSheet("color: " + message["lbl_box3"]["color"])
                if "hidden" in message["lbl_box3"]:
                    self.ui.lbl_box3.setHidden(message["lbl_box3"]["hidden"])
                    
            if "lbl_box4" in message:
                self.ui.lbl_box4.setText(message["lbl_box4"]["text"])
                if "color" in message["lbl_box4"]:
                    self.ui.lbl_box4.setStyleSheet("color: " + message["lbl_box4"]["color"])
                if "hidden" in message["lbl_box4"]:
                    self.ui.lbl_box4.setHidden(message["lbl_box4"]["hidden"])
                    
            if "lbl_box5" in message:
                self.ui.lbl_box5.setText(message["lbl_box5"]["text"])
                if "color" in message["lbl_box5"]:
                    self.ui.lbl_box5.setStyleSheet("color: " + message["lbl_box5"]["color"])
                if "hidden" in message["lbl_box5"]:
                    self.ui.lbl_box5.setHidden(message["lbl_box5"]["hidden"])
                    
            if "lbl_box6" in message:
                self.ui.lbl_box6.setText(message["lbl_box6"]["text"])
                if "color" in message["lbl_box6"]:
                    self.ui.lbl_box6.setStyleSheet("color: " + message["lbl_box6"]["color"])
                if "hidden" in message["lbl_box6"]:
                    self.ui.lbl_box6.setHidden(message["lbl_box6"]["hidden"])
                    
            ######### Modificación para F96 #########
            if "lbl_box7" in message:
                self.ui.lbl_box7.setText(message["lbl_box7"]["text"])
                if "color" in message["lbl_box7"]:
                    self.ui.lbl_box7.setStyleSheet("color: " + message["lbl_box7"]["color"])
                if "hidden" in message["lbl_box7"]:
                    self.ui.lbl_box7.setHidden(message["lbl_box7"]["hidden"])
                    
            ######### Modificación para F96 #########
            if "lbl_box8" in message:
                self.ui.lbl_box8.setText(message["lbl_box8"]["text"])
                if "color" in message["lbl_box8"]:
                    self.ui.lbl_box8.setStyleSheet("color: " + message["lbl_box8"]["color"])
                if "hidden" in message["lbl_box8"]:
                    self.ui.lbl_box8.setHidden(message["lbl_box8"]["hidden"])
                    
            if "lbl_box9" in message:
                self.ui.lbl_box9.setText(message["lbl_box9"]["text"])
                if "color" in message["lbl_box9"]:
                    self.ui.lbl_box9.setStyleSheet("color: " + message["lbl_box9"]["color"])
                if "hidden" in message["lbl_box9"]:
                    self.ui.lbl_box9.setHidden(message["lbl_box9"]["hidden"])

                    
            if "lbl_box10" in message:
                self.ui.lbl_box10.setText(message["lbl_box10"]["text"])
                if "color" in message["lbl_box10"]:
                    self.ui.lbl_box10.setStyleSheet("color: " + message["lbl_box10"]["color"])
                if "hidden" in message["lbl_box10"]:
                    self.ui.lbl_box10.setHidden(message["lbl_box10"]["hidden"])

                    
            if "lbl_box11" in message:
                self.ui.lbl_box11.setText(message["lbl_box11"]["text"])
                if "color" in message["lbl_box11"]:
                    self.ui.lbl_box11.setStyleSheet("color: " + message["lbl_box11"]["color"])
                if "hidden" in message["lbl_box11"]:
                    self.ui.lbl_box11.setHidden(message["lbl_box11"]["hidden"])

                    
            ###########################################################################
            if "lbl_result" in message:
                self.ui.lbl_result.setText(message["lbl_result"]["text"])
                if "color" in message["lbl_result"]:
                    self.ui.lbl_result.setStyleSheet("color: " + message["lbl_result"]["color"])
            if "lbl_steps" in message:
                self.ui.lbl_steps.setText(message["lbl_steps"]["text"])
                if "color" in message["lbl_steps"]:
                    self.ui.lbl_steps.setStyleSheet("color: " + message["lbl_steps"]["color"])   
            if "lbl_user" in message:
                self.ui.lbl_user.setText(message["lbl_user"]["type"] + "\n" + message["lbl_user"]["user"])
                if "color" in message["lbl_user"]:
                    self.ui.lbl_user.setStyleSheet("color: " + message["lbl_user"]["color"])
                self.model.user = message["lbl_user"]
                self.qw_login.setVisible(False)
            if "img_user" in message:
                 if message["img_user"] != "":
                    if exists(self.model.imgsPath + message["img_user"]):
                        self.ui.img_user.setPixmap(QPixmap(self.model.imgsPath + message["img_user"]).scaled(110, 110, Qt.KeepAspectRatio))
                    else:
                        self.ui.img_user.setPixmap(QPixmap(":/images/images/usuario_x.jpg").scaled(110, 110, Qt.KeepAspectRatio))
            if "img_nuts" in message:
                if message["img_nuts"] != "":
                    if exists(self.model.imgsPath + message["img_nuts"]):
                        self.ui.img_nuts.setPixmap(QPixmap(self.model.imgsPath + message["img_nuts"]).scaled(110, 110, Qt.KeepAspectRatio))
            if "img_center" in message: 
               if message["img_center"] != "":
                    if exists(self.model.imgsPath + message["img_center"]):
                        self.model.centerImage = self.model.imgsPath + message["img_center"]
                        self.ui.img_center.setPixmap(QPixmap(self.model.centerImage).scaled(self.ui.img_center.width(), self.ui.img_center.height(), Qt.KeepAspectRatio))
            ######### Modificación para F96 #########
            if "img_fuse" in message: 
               if message["img_fuse"] != "":
                    if exists(self.model.imgsPath + message["img_fuse"]):
                        self.model.img_fuse = self.model.imgsPath + message["img_fuse"]
                        self.ui.img_fuse.setPixmap(QPixmap(self.model.img_fuse).scaled(self.ui.img_fuse.width(), self.ui.img_center.height(), Qt.KeepAspectRatio))
            ######### Modificación para F96 #########
            if "show" in message:
                self.launcher(message["show"])         
            if "popOut" in message:
                self.launcher(message) 
            if "statusBar" in message:
                if type(message["statusBar"]) == str:
                    if message["statusBar"] == "clear":
                        self.ui.statusbar.clearMessage()
                    else:
                        self.ui.statusbar.showMessage(message["statusBar"])
            if "lbl_clock" in message:

                if "text" in message["lbl_clock"]:
                    self.ui.lbl_clock.setText(message["lbl_clock"]["text"])
                elif "fecha" in message["lbl_clock"]:

                    #<p style="background-color: #000033;">

                    texto = """
                    <head/>
                    <body>
                        <p>
                            <br>  <!-- Salto de línea -->    
                            <span style="font-size:11pt; font-style:Monospace; color:lightblue;">&nbsp;&nbsp;&nbsp;Fecha Fujikura:&nbsp; <!-- &nbsp; es un espacio vacío -->
                            </span>
                            <span style="font-size:11pt; font-style:Helvetica; color:#ffffff;">daay&nbsp;&nbsp;&nbsp;
                            </span>
                            <br>  <!-- Salto de línea -->
                            <span style="font-size:26pt; font-style:Helvetica; font-weight:bold; color:#ffffff;">&nbsp;&nbsp;&nbsp;&nbsp;daate&nbsp;&nbsp;&nbsp;</span>
                            <br>  <!-- Salto de línea -->
                        </p>
                    </body>
                    """

                    fecha = message["lbl_clock"]["fecha"]
                    fecha = fecha.split(" ")
                    fecha[1] = fecha[1][0:8]
                    fecha_mes = fecha[0].split("-")
                    if fecha_mes[1] == "1" or fecha_mes[1] == "01":
                        fecha_mes[1] = "Enero"
                    elif fecha_mes[1] == "2" or fecha_mes[1] == "02":
                        fecha_mes[1] = "Febrero"
                    elif fecha_mes[1] == "3" or fecha_mes[1] == "0":
                        fecha_mes[1] = "Marzo"
                    elif fecha_mes[1] == "4" or fecha_mes[1] == "0":
                        fecha_mes[1] = "Abril"
                    elif fecha_mes[1] == "5" or fecha_mes[1] == "0":
                        fecha_mes[1] = "Mayo"
                    elif fecha_mes[1] == "6" or fecha_mes[1] == "0":
                        fecha_mes[1] = "Junio"
                    elif fecha_mes[1] == "7" or fecha_mes[1] == "0":
                        fecha_mes[1] = "Julio"
                    elif fecha_mes[1] == "8" or fecha_mes[1] == "0":
                        fecha_mes[1] = "Agosto"
                    elif fecha_mes[1] == "9" or fecha_mes[1] == "0":
                        fecha_mes[1] = "Septiembre"
                    elif fecha_mes[1] == "10":
                        fecha_mes[1] = "Octubre"
                    elif fecha_mes[1] == "11":
                        fecha_mes[1] = "Noviembre"
                    elif fecha_mes[1] == "12":
                        fecha_mes[1] = "Diciembre"
                    fecha[0] = fecha_mes[2] + "-" + fecha_mes[1] + "-" + fecha_mes[0]
                    texto = texto.replace("daay",fecha[0])

                    formato_hora = ""
                    nueva_hora = "12"
                    string_hora = str(fecha[1]).split(":")
                    if int(string_hora[0]) < 12:
                        if int(string_hora[0]) != 12:
                            nueva_hora = str(int(string_hora[0]))
                        formato_hora = " am"
                    else:
                        if int(string_hora[0]) != 12:
                            nueva_hora = str(int(string_hora[0])-12)
                        formato_hora = " pm"

                    string_hora = nueva_hora + ":" + string_hora[1] + ":" + string_hora[2] + formato_hora

                    texto = texto.replace("daate",string_hora)
                    self.ui.lbl_clock.setStyleSheet("background-color: #000033; border-top-left-radius: 15px; border-top-right-radius: 15px; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px;")
                    self.ui.lbl_clock.setText(texto)
        except Exception as ex:
            print("\ninput() exception : \nMessage: ", message, "\nException: ", ex)
            self.output.emit({"Exception":"Input error"})
    
    @pyqtSlot()
    def launcher(self, show):
        try:
            if "login" in show:
                self.qw_login.ui.lineEdit.setPlaceholderText("Escanea o escribe tu codigo")
                self.qw_login.setVisible(show["login"])
            if "scanner" in show:
                self.qw_scanner.ui.lineEdit.setPlaceholderText("Escanea el Código Qr")
                self.qw_scanner.setVisible(show["scanner"])
            if "popOut" in show:
                if show["popOut"] == "close" and self.pop_out.isVisible: 
                    self.pop_out.button(QMessageBox.Ok).click()
                else:
                    self.pop_out.setText(show["popOut"])
                    self.pop_out.setWindowTitle("Info")
                    self.pop_out.exec()
            if "img_popOut" in show:
                if show["img_popOut"] == "close":
                    self.qw_img_popout.ui.label.setPixmap(QPixmap(":/images/images/blanco.png"))
                    self.qw_img_popout.close()
                else:
                    self.qw_img_popout.ui.label.setPixmap(QPixmap(self.model.imgsPath + show["img_popOut"]))
                    self.qw_img_popout.show()
        except Exception as ex:
            print("launcher exception: ", ex)

    @pyqtSlot()
    def sendStatus (self):
        try:
            self.output.emit(self.model.status)
        except Exception as ex:
            print("sendStatus() exception: ", ex)

    @pyqtSlot()
    def resizeEvent(self, event):
        try:
            self.ui.img_center.setPixmap(QPixmap(self.model.centerImage).scaled(self.ui.img_center.width(), self.ui.img_center.height(), Qt.KeepAspectRatio))
            ### F96 ###
            if self.model.img_fuse != "":
                self.ui.img_fuse.setPixmap(QPixmap(self.model.img_fuse).scaled(self.ui.img_fuse.width(), self.ui.img_fuse.height(), Qt.KeepAspectRatio))
            self.ui.frame.setMaximumWidth(self.width() - 328)
        except Exception as ex:
            print("resizeEvent() exception: ", ex)

    @pyqtSlot()
    def closeEvent(self, event):
        if self.shutdown == True:
            #self.shutdown = False
            self.timer.stop()
            self.output.emit({"gui": False})
            print ("Bye...")
            event.accept()
            self.deleteLater()
        elif self.allow_close == True:
            choice = QMessageBox.question(self, 'Salir', "Estas seguro de cerrar la aplicacion?",QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
            if choice == QMessageBox.Yes:
                self.timer.stop()
                self.output.emit({"gui": False})
                self.deleteLater()
                print ("Bye...")
                event.accept()
            else:
                event.ignore()
        else:
            event.ignore()
            self.pop_out.setText("No se permite cerrar esta ventana")
            self.pop_out.setWindowTitle("Warning")
            QTimer.singleShot(2000, self.pop_out.button(QMessageBox.Ok).click)
            self.pop_out.exec()

class Login (QDialog):
    def __init__(self, parent = None):
        super().__init__(parent)
        self.ui = login.Ui_login()
        self.ui.setupUi(self)
        self.ui.lineEdit.setEchoMode(QLineEdit.Password)
        self.ui.lineEdit.setStyleSheet('lineedit-password-character: 9679')
        self.ui.btn_ok.setFocusPolicy(Qt.NoFocus)
        self.ui.lineEdit.setFocus()

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Escape:
            print("Escape key was pressed")
           
class Scanner (QDialog):
    def __init__(self, parent = None):
        super().__init__(parent)
        self.ui = scanner.Ui_scanner()
        self.ui.setupUi(self) 
        self.ui.lineEdit.setEchoMode(QLineEdit.Password)
        self.ui.lineEdit.setStyleSheet('lineedit-password-character: 9679')
        self.ui.btn_ok.setFocusPolicy(Qt.NoFocus)
        self.ui.btn_cancel.setFocusPolicy(Qt.NoFocus)
        self.ui.lineEdit.setFocus()

    def closeEvent(self, event):
        event.ignore() 

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Escape:
            print("Escape key was pressed")

class Tabla_hora_w (QDialog):
    def __init__(self, parent = None):
        super().__init__(parent)
        self.ui = Tabla_horas.Ui_Ui_Tabla_h()
        self.ui.setupUi(self) 
        

    def closeEvent(self, event):
        #event.ignore() 
        #self.uimain.lineEdit.setFocus()
        print("close event")
    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Escape:
            print("Escape key was pressed")

class Img_popout (QDialog):
    def __init__(self, parent = None):
        super().__init__(parent)
        self.ui = img_popout.Ui_img_popout()
        self.ui.setupUi(self) 
        self.ui.label.setText("")
        
class PopOut (QMessageBox):
    def __init__(self, parent = None):
        super().__init__(parent)
        self.setIcon(QMessageBox.Information)
        self.setStandardButtons(QMessageBox.Ok)
        self.button(QMessageBox.Ok).setVisible(False)

    def closeEvent(self, event):
        event.ignore() 

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Escape:
            print("Escape key was pressed")

if __name__ == "__main__":
    from PyQt5.QtWidgets import QApplication
    import sys
    app = QApplication(sys.argv)
    Window = Login()
    Window.show()
    sys.exit(app.exec_())
    

    
