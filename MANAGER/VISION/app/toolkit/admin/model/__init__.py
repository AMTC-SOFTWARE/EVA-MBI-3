from cv2 import imread, rectangle
from PyQt5.QtCore import QObject
from pickle import load, dumps

class Model (QObject):

    def __init__(self, parent = None):
        super().__init__(parent)  
        self.input_message = None
        self.plugins = {
            "rework": False
            }
        with open("data\pts_torque", "rb") as f:
            self.torque_BB = load(f)
        self.torque_img = imread('data/imgs/logo.jpg')

    def drawBB (self, img = [], BB = [(0,0), (100,100)], color = (255,255,255)):
        #red     = (255, 0, 0)
        #orange  = (31, 186, 226)
        #green   = (0, 255, 0)
        #White   = (255, 255, 255)
        try:
            if len(img) == 0:
                img = imread('imgs/workspace.jpg')
            rectangle(img, BB[0], BB[1], color, 3)
        except Exception as ex:
            print("Model.drawBB exception: ", ex)
        return img