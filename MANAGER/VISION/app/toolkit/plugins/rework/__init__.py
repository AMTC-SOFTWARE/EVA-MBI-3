# -*- coding: utf-8 -*-
"""
Created on Thu Mar 12 14:42:42 2020

@author: trovar
"""

from PyQt5.QtWidgets import QApplication, QLabel, QDialog
from PyQt5.QtGui import QPixmap
from PyQt5.QtCore import pyqtSlot, QTimer
import array as arr 
import json
from toolkit.plugins.rework import icons_rc, form

inputs = arr.array('b', [0]) 

class Rework (QDialog):
    
    def __init__(self, model = None, client = None, parent = None):
        super().__init__(parent)
        
        self.model = model
        self.client = client
        self.ui = form.Ui_Form()
        self.ui.setupUi(self)  
        
        self.pixmap_yellow   = QPixmap(":/icons/iconfinder_Circle_Yellow_34215.png")
        self.pixmap_gray     = QPixmap(":/icons/iconfinder_Circle_Grey_34212.png")
        self.pixmap_red      = QPixmap(":/icons/iconfinder_Circle_Red_34214.png")
        self.pixmap_blue     = QPixmap(":/icons/iconfinder_Circle_Blue_34210.png")
        self.pixmap_green    = QPixmap(":/icons/iconfinder_Circle_Green_34211.png")
                
        self.inputs=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        self.analog_in=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        self.outputs=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        self.analog_out=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

        QTimer.singleShot(100, self.pub)
        self.show()

    def pub (self):
        self.client.publish("plc/set",'{"status" : true}', qos = 2)
        
    def clamp1(self, state):
        if state == True:
            self.ui.label_clamp_1.setPixmap(self.pixmap_blue)
            self.ui.label_clamp_1_1.setPixmap(self.pixmap_blue)
        else:
            self.ui.label_clamp_1.setPixmap(self.pixmap_gray)      
            self.ui.label_clamp_1_1.setPixmap(self.pixmap_gray)

    def clamp2(self, state):
        if state == True:
            self.ui.label_clamp_2.setPixmap(self.pixmap_blue)
            self.ui.label_clamp_2_1.setPixmap(self.pixmap_blue)
        else:
            self.ui.label_clamp_2.setPixmap(self.pixmap_gray)
            self.ui.label_clamp_2_1.setPixmap(self.pixmap_gray)

    def clamp3(self, state):
        if state == True:
            self.ui.label_clamp_3.setPixmap(self.pixmap_blue)
            self.ui.label_clamp_3_1.setPixmap(self.pixmap_blue)
        else:
            self.ui.label_clamp_3.setPixmap(self.pixmap_gray)
            self.ui.label_clamp_3_1.setPixmap(self.pixmap_gray)

    def clamp4(self, state):
        if state == True:
            self.ui.label_clamp_4.setPixmap(self.pixmap_blue)
            self.ui.label_clamp_4_1.setPixmap(self.pixmap_blue)
        else:
            self.ui.label_clamp_4.setPixmap(self.pixmap_gray) 
            self.ui.label_clamp_4_1.setPixmap(self.pixmap_gray) 

    def switch1_1(self, state):
        if state == True:
            self.ui.label_switch1_1.setPixmap(self.pixmap_green)
            self.ui.label_switch1_1_1.setPixmap(self.pixmap_green)
        else:
            self.ui.label_switch1_1.setPixmap(self.pixmap_gray)
            self.ui.label_switch1_1_1.setPixmap(self.pixmap_gray)

    def switch1_2(self, state):
        if state == True:
            self.ui.label_switch1_2.setPixmap(self.pixmap_green)
            self.ui.label_switch1_2_1.setPixmap(self.pixmap_green)
        else:
            self.ui.label_switch1_2.setPixmap(self.pixmap_gray)
            self.ui.label_switch1_2_1.setPixmap(self.pixmap_gray)      
            
    def switch1_3(self, state):
        if state == True:
            self.ui.label_switch1_3.setPixmap(self.pixmap_green)
            self.ui.label_switch1_3_1.setPixmap(self.pixmap_green)
        else:
            self.ui.label_switch1_3.setPixmap(self.pixmap_gray)
            self.ui.label_switch1_3_1.setPixmap(self.pixmap_gray)

    def switch1_4(self, state):
        if state == True:
            self.ui.label_switch1_4.setPixmap(self.pixmap_green)
            self.ui.label_switch1_4_1.setPixmap(self.pixmap_green)
        else:
            self.ui.label_switch1_4.setPixmap(self.pixmap_gray)
            self.ui.label_switch1_4_1.setPixmap(self.pixmap_gray)

    def switch2_1(self, state):
        if state == True:
            self.ui.label_switch2_1.setPixmap(self.pixmap_green)
            self.ui.label_switch2_1_1.setPixmap(self.pixmap_green)
        else:
            self.ui.label_switch2_1.setPixmap(self.pixmap_gray)
            self.ui.label_switch2_1_1.setPixmap(self.pixmap_gray)

    def switch2_2(self, state):
        if state == True:
            self.ui.label_switch2_2.setPixmap(self.pixmap_green)
            self.ui.label_switch2_2_1.setPixmap(self.pixmap_green)
        else:
            self.ui.label_switch2_2.setPixmap(self.pixmap_gray)
            self.ui.label_switch2_2_1.setPixmap(self.pixmap_gray)  
            
    def switch2_3(self, state):
        if state == True:
            self.ui.label_switch2_3.setPixmap(self.pixmap_green)
            self.ui.label_switch2_3_1.setPixmap(self.pixmap_green)
        else:
            self.ui.label_switch2_3.setPixmap(self.pixmap_gray)
            self.ui.label_switch2_3_1.setPixmap(self.pixmap_gray)

    def switch2_4(self, state):
        if state == True:
            self.ui.label_switch2_4.setPixmap(self.pixmap_green)
            self.ui.label_switch2_4_1.setPixmap(self.pixmap_green)
        else:
            self.ui.label_switch2_4.setPixmap(self.pixmap_gray)
            self.ui.label_switch2_4_1.setPixmap(self.pixmap_gray)    
            
    def pushbutton(self, state):
        if state == True:
            self.ui.label_pushbutton.setPixmap(self.pixmap_green)
            self.ui.label_pushbutton_1.setPixmap(self.pixmap_green)
        else:
            self.ui.label_pushbutton.setPixmap(self.pixmap_gray)
            self.ui.label_pushbutton_1.setPixmap(self.pixmap_gray)

    def resetswitch(self, state):
        if state == True:
            self.ui.label_reset_switch.setPixmap(self.pixmap_green)
            self.ui.label_reset_switch_1.setPixmap(self.pixmap_green)
        else:
            self.ui.label_reset_switch.setPixmap(self.pixmap_gray)
            self.ui.label_reset_switch_1.setPixmap(self.pixmap_gray)

    def eStop(self, state):
        if state == True:
            self.ui.label_eStop.setPixmap(self.pixmap_red)
        else:
            self.ui.label_eStop.setPixmap(self.pixmap_gray)
            
    @pyqtSlot()   
    def input(self):
        if self.model.input_message.topic == "plc/status":
            payload = json.loads(self.model.input_message.payload)
            print("\n\Rework", payload, "\n")
            if "input" in payload and "output" in payload:
                for x in range(0, 24):
                    self.inputs[x]=payload["input"][x]
                    self.outputs[x]=payload["output"][x]
                
                    if self.analog_in[0] != self.inputs[0] and self.inputs[0]==1:
                        eStop(True)
                    elif self.analog_in[0]!=self.inputs[0] and self.inputs[0]==0:
                        eStop(False)
                   
                    if self.analog_in[1] != self.inputs[1] and self.inputs[1]==1:
                        resetswitch(True)
                    elif self.analog_in[1]!=self.inputs[1] and self.inputs[1]==0:
                        resetswitch(False)

                    if self.analog_in[2] != self.inputs[2] and self.inputs[2]==1:
                        pushbutton(True)
                    elif self.analog_in[2]!=self.inputs[2] and self.inputs[2]==0:
                        pushbutton(False)
                    
                    if self.analog_in[4] != self.inputs[4] and self.inputs[4]==1:
                        switch1_3(1)
                    elif self.analog_in[4]!=self.inputs[4] and self.inputs[4]==0:
                        switch1_3(0)
                    
                    if self.analog_in[5] != self.inputs[5] and self.inputs[5]==1:
                        switch2_3(1)
                    elif self.analog_in[5]!=self.inputs[5] and self.inputs[5]==0:
                        switch2_3(0)
                    
                    if self.analog_in[6] != self.inputs[6] and self.inputs[6]==1:
                        switch1_4(1)
                    elif self.analog_in[6]!=self.inputs[6] and self.inputs[6]==0:
                        switch1_4(0)
                    
                    if self.analog_in[7] != self.inputs[7] and self.inputs[7]==1:
                        switch2_4(1)
                    elif self.analog_in[7]!=self.inputs[7] and self.inputs[7]==0:
                        switch2_4(0)
                    
                    if self.analog_in[8] != self.inputs[8] and self.inputs[8]==1:
                        switch1_1(True)
                    elif self.analog_in[8]!=self.inputs[8] and self.inputs[8]==0:
                        switch1_1(False)

                    if self.analog_in[9] != self.inputs[9] and self.inputs[9]==1:
                        switch2_1(True)
                    elif self.analog_in[9]!=self.inputs[9] and self.inputs[9]==0:
                        switch2_1(False) 
                    
                    if self.analog_in[10] != self.inputs[10] and self.inputs[10]==1:
                        switch1_2(True)
                    elif self.analog_in[10]!=self.inputs[10] and self.inputs[10]==0:
                        switch1_2(False)

                    if self.analog_in[11] != self.inputs[11] and self.inputs[11]==1:
                        switch2_2(True)
                    elif self.analog_in[11]!=self.inputs[11] and self.inputs[11]==0:
                        switch2_2(False)        
                    
                    self.analog_in[x]=self.inputs[x]
                    self.analog_out[x]=self.outputs[x]
            
                self.ui.spinBox_encoder.setValue(payload["analog"][0])
                QTimer.singleShot(100, self.pub)

    def closeEvent(self, event):
        self.model.plugins["rework"] = False
        self.deleteLater()
        event.accept()

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Escape:
            print("Escape key was pressed")

if __name__ == "__main__":
    import sys
    app = QApplication(sys.argv)
    MainWindow = Rework()
    MainWindow.show()
    sys.exit(app.exec_())
    
