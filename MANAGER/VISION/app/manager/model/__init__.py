from cv2 import imread, imwrite, rectangle
from time import strftime
from pickle import load
import requests
import json
from datetime import datetime, timedelta, date, time
from time import sleep
import pprint

from PyQt5.QtCore import QState, pyqtSignal, QObject
from paho.mqtt import publish
from threading import Timer


class Model (object):

    def __init__(self, parent = None):

        self.shutdown = False
        self.main_window = None
        self.transitions = None
        self.datetime = None
        self.imgs_path = "data/imgs/"
        self.server = "127.0.0.1:5000" #para correr localmente
        #self.server = "192.168.1.10:5000" #IP de estación

        self.id_HM = None
        self.fechaAnterior = self.get_currentTime() #se inicializa con la fecha del servidor
        self.fechaLocalAnterior = datetime.now() #se inicializa con la fecha local actual
        #variable para guardar el qr esperado de la caja PDCR
        self.qr_esperado = ""
        #variable para llevar conteo de intentos de escaneo de caja PDCR
        self.contador_scan_pdcr = 1
        #máximo número de intentos de escaneo de caja PDCR correcta
        self.max_pdcr_try = 3
        #variable para inhabilitar la llave
        self.disable_key = False

        #variable para avisar que se está saliendo de config y no es necesario re-calcular el conteo de arneses
        self.saliendo_config = False

        #variable para guardar el pedido
        self.pedido = ""
        #variable para guardar el evento del arnés
        self.dbEvent = ""
        #variable para buscar contenido de torque solamente en estas cajas
        self.lista_cajas_torque = ["MFB-P2","MFB-P1","MFB-S","MFB-E"]

        #variable para buscar contenido de fusibles solamente en estas cajas
        self.lista_cajas_fusibles = ["PDC-R","PDC-RMID","PDC-RS","PDC-D","PDC-P","PDC-S","TBLU","F96"]

        #variable para guardar toda la información de la configuración del arnés sin los fusibles vacíos
        self.arnes_data = {}

        #se verifica que el arnés tenga valores guardados en el servidor
        self.valores_torques_red = False

        #variable para no volver a entrara a reciver, si estás en trigger visión (y ya quitaste el trigger de la lista con un pop)
        # y ya te había llegado un resultado de la visión y te vuelve a llegar nuevamente (por volver a abrir la GDI o mandar un trigger manual)
        self.revisando_resultado = False
        self.revisando_resultado_height = False

        self.pdcrvariant = ""
        self.expected_fuses = ""
        
        self.cronometro_ciclo=False
        #lista para guardar las cajas que han terminado su inspección para poderlas desclampear
        self.cajas_a_desclampear = []
        #bandera para avisar que ya se terminaron las cajas actuales que se colocaron y es hora de desclampear (luego de que el robot vaya a home)
        self.desclampear_ready = False
        self.F96_pendiente=False
        self.tiempo = ""

        self.history_fuses = []
        self.missing_fuses = ""

        self.BRACKET_PDCD_clampeado=False
        self.PDCD_bracket_pendiente=False
        self.PDCD_bracket_terminado=False

        self.BB = {
            'BATTERY': {
                'BT': ((169, 157), (231, 212))}, 
            'BATTERY_2': {
                'BT': ((169, 157), (231, 212))},
            'MFB-P1': {
                'A41': ((533, 349), (575, 393)), 
                'A42': ((597, 389), (631, 421)), 
                'A43': ((479, 352), (513, 389)), 
                'A44': ((431, 354), (466, 386)), 
                'A45': ((391, 356), (420, 384)), 
                'A46': ((334, 349), (373, 384)), 
                'A47': ((266, 352), (310, 388))}, 
            'MFB-P2': {
                'A20': ((527, 272), (576, 313)), 
                'A21': ((258, 463), (292, 497)), 
                'A22': ((312, 464), (343, 493)), 
                'A23': ((362, 464), (393, 493)), 
                'A24': ((409, 465), (442, 493)), 
                'A25': ((470, 466), (512, 509)), 
                'A26': ((538, 463), (572, 497)), 
                'A27': ((587, 464), (622, 498)), 
                'A28': ((638, 466), (674, 499)), 
                'A29': ((687, 464), (725, 496)), 
                'A30': ((403, 267), (449, 308))}, 
            'MFB-S': {
                'A51': ((447, 265), (493, 311)), 
                'A52': ((315, 402), (357, 442)), 
                'A53': ((379, 410), (415, 444)), 
                'A54': ((430, 411), (464, 447)), 
                'A55': ((478, 410), (513, 443)), 
                'A56': ((528, 409), (564, 441))}, 
            'PDC-D': {
                'E1': ((358, 467), (396, 507))}, 
            'PDC-P': {
                'E1': ((361, 460), (396, 495))}, 
            'PDC-R': {
                'E1': ((408, 330), (443, 358))}
            }

        self.imgs = {}
        for i in list(self.BB):
            temp = self.imgs_path +"boxes/" + i + ".jpg"
            self.imgs[i] = imread(temp)

        self.tries = {
            "VISION": {},
            "ALTURA": {}
            }

        self.qr_codes = {
            "FET": "--",
            "HM": "--",
            "REF": "--"
            }

        self.sub_topics = {
                        "plc": "PLC/1/status",  
                        "torque_1": "torque/1/status",
                        "torque_2": "torque/2/status",
                        "torque_3": "torque/3/status",
                        "gui": "gui/status",
                        "gui_2": "gui_2/status",
                        "config": "config/status",
                        "robot": "RobotEpson/2/status",
                        "vision": "Camera/4/status",
                        "height": "LaserSensor/3/status"
                        }

        self.pub_topics = {
                        "gui": "gui/set",
                        "gui_2": "gui_2/set",
                        "plc": "PLC/1",
                        "torque": {
                                   "tool1": "torque/1/set",
                                   "tool2": "torque/2/set",
                                   "tool3": "torque/3/set"
                                   },
                        "printer": "Printer/5",
                        "config": "config/set",
                        "robot": "RobotEpson/2",
                        "vision": "Camera/4",
                        "height": "LaserSensor/3"
                        }

        self.config_data = {
            "encoder_feedback": {
                "tool1": True,
                "tool2": True,
                "tool3": True
            },
            "retry_btn_mode": {
                "tool1": False,
                "tool2": False,
                "tool3": False  
            },
            "constraints": {
                "tools": [["tool1", "tool3"]]
            },
            "untwist": False,
            "flexible_mode": False,
            "trazabilidad": True
        }
        self.local_data = {
                            "user": {"type":"", "pass":"", "name":""},
                            "lbl_info1_text": "",
                            "lbl_info1.2_text": "",
                            "lbl_info2_text": "",
                            "lbl_info3_text": "",
                            "lbl_info4_text": "",
                            "qr_rework" : False,
                            "nuts_scrap":{}
            }
        self.input_data = {
            "database":{
                "modularity": {},
                "modularity_nuts": {},
                "pedido": {}},
            "plc": {
                "emergency": True,
                "encoder_1": {"zone": "0"},# el valor de "zone" debe ser de la forma: '{"caja": "torque_name"}'
                "encoder_2": {"zone": "0"},
                "encoder_3": {"zone": "0"},
                "retry_btn": False,
                "clamps": ["PDC-P", "PDC-D", "BATTERY", "MFB-P1", "MFB-S", "MFB-P2", "PDC-R"]}, # Debe inicializarce vacío
            "torque":{
                "tool1": {},
                "tool2": {},
                "tool3": {}},
            "gui": {
                "request": "", 
                "ID": "", 
                "code": "", 
                "visible":{}},
            "robot": {},
            "vision": {},
            "height": {}
            }

        self.t_result = {}
        self.t_resultAngle = {}
        self.t_results_lbl = {}
        self.t_tries = {}
        self.t_scrap = {}

    #################### Vision-Altura #####################
        self.fuses_base = {}
        #Se usan como coordenadas para dibujar el cuadro de inspeccion en la imagen de las cajas
        self.fuses_BB = {
            'PDC-D': {
                'F200': [(271, 572), (300, 583)], 'F201': [(270, 555), (301, 567)], 'F202': [(274, 540), (304, 548)], 'F203': [(272, 523), (301, 533)], 
                'F204': [(270, 504), (300, 516)], 'F205': [(271, 490), (300, 499)], 'F206': [(272, 471), (302, 483)], 'F207': [(270, 455), (302, 465)], 
                'F208': [(274, 438), (302, 451)], 'F209': [(367, 573), (418, 584)], 'F210': [(368, 553), (417, 567)], 'F211': [(367, 536), (417, 551)], 
                'F212': [(369, 520), (417, 533)], 'F213': [(370, 504), (417, 515)], 'F214': [(368, 486), (416, 498)], 'F215': [(367, 470), (417, 482)], 
                'F216': [(366, 451), (417, 466)], 'F217': [(292, 401), (307, 411)], 'F218': [(292, 385), (308, 395)], 'F219': [(291, 368), (307, 379)], 
                'F220': [(293, 351), (306, 360)], 'F221': [(293, 334), (308, 344)], 'F222': [(342, 402), (356, 413)], 'F223': [(342, 383), (355, 395)], 
                'F224': [(343, 366), (354, 377)], 'F225': [(344, 349), (355, 362)], 'F226': [(343, 332), (356, 343)], 'F227': [(377, 417), (388, 427)], 
                'F228': [(376, 401), (388, 413)], 'F229': [(377, 386), (388, 392)], 'F230': [(378, 367), (390, 377)], 'F231': [(374, 350), (388, 362)], 
                'F232': [(376, 333), (389, 344)]
                },
            'PDC-Dbracket':{
                'bracket': [(273, 304), (420, 447)]
                },
            'F96':{
                'F96': [(253, 337), (483, 425)]
                },
            'PDC-P': {
                'MF1': [(279, 276), (369, 288)], 'MF2': [(279, 295), (369, 307)], 'F300': [(282, 395), (326, 408)], 'F301': [(289, 380), (315, 390)], 
                'F302': [(289, 365), (314, 375)], 'F303': [(292, 350), (314, 361)], 'F304': [(291, 335), (315, 347)], 'F305': [(292, 322), (314, 331)], 
                'F318': [(341, 428), (365, 437)], 'F319': [(342, 415), (366, 423)], 'F320': [(343, 400), (365, 408)], 'F321': [(342, 384), (367, 393)], 
                'F322': [(344, 368), (366, 379)], 'F323': [(342, 354), (366, 364)], 'F324': [(344, 340), (366, 348)], 'F325': [(343, 326), (368, 335)], 
                'F326': [(378, 427), (422, 438)], 'F327': [(379, 413), (422, 425)], 'F328': [(379, 398), (423, 409)], 'F329': [(380, 384), (424, 395)], 
                'F330': [(380, 369), (422, 380)], 'F331': [(380, 354), (422, 364)], 'F332': [(381, 339), (422, 349)], 'F333': [(380, 324), (422, 335)], 
                'F334': [(380, 309), (422, 319)], 'F335': [(380, 294), (422, 307)], 'E21': [(287, 423), (295, 441)], 'E22': [(295, 442), (302, 460)],
                'conector': [(275, 422), (304, 462)]
                }, 
            'PDC-P2': {
                'CONECTOR1': [(395, 1060), (910, 1390)], 'CONECTOR2': [(1180, 780), (1585, 1110)], 'CONECTOR3': [(282, 395), (326, 408)], 'CONECTOR4': [(289, 380), (315, 390)], 
                'CONECTOR5': [(295, 442), (302, 460)]
                }, 
            'PDC-R': {
                'F400': [(510, 214), (519, 246)], 'F401': [(499, 214), (508, 246)], 'F402': [(487, 214), (497, 246)], 'F403': [(477, 214), (485, 246)], 
                'F404': [(467, 214), (475, 246)], 'F405': [(455, 214), (464, 246)], 'F411': [(385, 220), (392, 241)], 'F410': [(395, 220), (402, 241)], 
                'F409': [(403, 220), (412, 241)], 'F408': [(414, 220), (421, 241)], 'F407': [(423, 220), (432, 241)], 'F406': [(434, 220), (443, 241)], 
                'F412': [(527, 222), (558, 231)], 'F413': [(527, 211), (558, 220)], 'F414': [(527, 204), (558, 213)], 'F415': [(527, 193), (558, 202)], 
                'F416': [(527, 182), (558, 191)], 'F417': [(527, 171), (558, 180)], 'F420': [(326, 171), (374, 186)], 'F419': [(326, 195), (374, 210)], 
                'F418': [(326, 217), (374, 232)], 'F421': [(527, 144), (558, 153)], 'F422': [(527, 133), (558, 142)], 'F423': [(527, 122), (558, 131)], 
                'F424': [(527, 111), (558, 120)], 'F425': [(527, 102), (558, 111)], 'F426': [(527, 91),  (558, 100)], 'F427': [(495, 133), (504, 153)], 
                'F428': [(485, 133), (494, 153)], 'F429': [(475, 133), (484, 153)], 'F430': [(465, 133), (474, 153)], 'F431': [(453, 133), (462, 153)], 
                'F437': [(496, 111), (505, 130)], 'F438': [(487, 111), (495, 130)], 'F439': [(476, 111), (485, 130)], 'F440': [(465, 111), (474, 130)], 
                'F441': [(455, 111), (464, 130)], 'F432': [(432, 133), (441, 153)], 'F433': [(421, 133), (430, 153)], 'F434': [(410, 133), (419, 153)], 
                'F435': [(399, 133), (408, 153)], 'F436': [(388, 133), (397, 153)], 'F442': [(431, 111), (440, 130)], 'F443': [(420, 111), (429, 130)], 
                'F444': [(410, 111), (419, 129)], 'F445': [(399, 111), (408, 130)], 'F446': [(389, 111), (398, 130)], 'F449': [(326, 88),  (374, 104)], 
                'F448': [(326, 112), (374, 128)], 'F447': [(326, 137), (374, 153)], 'F450': [(512, 72),  (521, 103)], 'F451': [(501, 72),  (510, 103)], 
                'F452': [(490, 72),  (499, 103)], 'F453': [(479, 72),  (488, 103)], 'F454': [(469, 72),  (478, 103)], 'F455': [(458, 72),  (467, 103)], 
                'F456': [(435, 72),  (444, 103)], 'F457': [(424, 72),  (433, 103)], 'F458': [(413, 72),  (422, 103)], 'F459': [(402, 72),  (411, 103)], 
                'F460': [(391, 72),  (400, 103)], 'F461': [(380, 72),  (389, 103)], 'F462': [(240, 166), (256, 215)], 'F463': [(215, 166), (231, 215)], 
                'F464': [(191, 166), (207, 215)], 'F465': [(277, 107), (297, 115)], 'F466': [(277, 97),  (297, 105)], 'F467': [(277, 86),  (297, 94)], 
                'F468': [(277, 75),  (297, 83)],  'F469': [(277, 64),  (297, 72)],  'F470': [(277, 53),  (297, 61)],  'F471': [(231, 107), (264, 115)], 
                'F472': [(231, 97),  (264, 105)], 'F473': [(231, 86),  (264, 94)],  'F474': [(231, 75),  (264, 83)],  'F475': [(231, 64),  (264, 72)], 
                'F476': [(231, 53),  (264, 61)],  'F477': [(187, 107), (220, 115)], 'F478': [(187, 97),  (220, 105)], 'F479': [(187, 86),  (220, 94)], 
                'F480': [(187, 75),  (220, 83)],  'F481': [(187, 64),  (220, 71)],  'F482': [(187, 53),  (220, 61)],  'RELX': [(478, 162), (525, 206)], 
                'RELU': [(427, 162), (476, 206)], 'RELT': [(378, 162), (425, 206)], 'F96': [(253, 337), (483, 425)]
                }, 
            'PDC-RMID': {
                'F400': [(613, 350), (627, 388)], 'F401': [(601, 350), (612, 388)], 'F402': [(587, 350), (599, 388)], 'F403': [(577, 350), (588, 388)], 
                'F404': [(565, 350), (576, 388)], 'F405': [(553, 350), (564, 388)], 'F411': [(463, 357), (474, 378)], 'F410': [(475, 357), (486, 378)], 
                'F409': [(487, 357), (496, 378)], 'F408': [(497, 357), (510, 378)], 'F407': [(512, 357), (523, 378)], 'F406': [(525, 357), (534, 378)], 
                'F412': [(633, 360), (673, 371)], 'F413': [(633, 348), (673, 359)], 'F414': [(633, 335), (673, 346)], 'F415': [(633, 323), (673, 334)], 
                'F416': [(633, 311), (673, 322)], 'F417': [(633, 297), (673, 308)], 'F420': [(398, 300), (455, 318)], 'F419': [(398, 330), (455, 348)], 
                'F418': [(398, 358), (455, 376)], 'F421': [(634, 272), (671, 284)], 'F422': [(634, 256), (671, 269)], 'F423': [(634, 244), (671, 255)], 
                'F424': [(634, 229), (671, 241)], 'F425': [(634, 217), (671, 228)], 'F426': [(634, 204), (671, 216)], 'F427': [(597, 256), (607, 280)], 
                'F428': [(585, 256), (595, 280)], 'F429': [(573, 256), (583, 280)], 'F430': [(561, 256), (571, 280)], 'F431': [(547, 256), (557, 280)], 
                'F437': [(600, 228), (610, 252)], 'F438': [(587, 228), (597, 252)], 'F439': [(575, 228), (585, 252)], 'F440': [(563, 228), (573, 252)], 
                'F441': [(550, 228), (560, 252)], 'F432': [(520, 256), (530, 280)], 'F433': [(508, 256), (518, 280)], 'F434': [(496, 256), (506, 280)], 
                'F435': [(484, 256), (494, 280)], 'F436': [(472, 256), (482, 280)], 'F442': [(518, 228), (528, 252)], 'F443': [(506, 228), (516, 252)], 
                'F444': [(494, 228), (504, 252)], 'F445': [(481, 228), (491, 252)], 'F446': [(469, 228), (479, 252)], 'F450': [(616, 180), (628, 218)], 
                'F451': [(604, 180), (615, 218)], 'F452': [(592, 180), (602, 218)], 'F453': [(577, 180), (589, 218)], 'F454': [(564, 180), (576, 218)], 
                'F455': [(553, 180), (563, 218)], 'F456': [(525, 180), (535, 218)], 'F457': [(514, 180), (524, 218)], 'F458': [(500, 180), (513, 218)], 
                'F459': [(487, 180), (497, 218)], 'F460': [(473, 180), (486, 218)], 'F461': [(463, 180), (474, 218)], 'RELX': [(578, 291), (629, 348)], 
                'RELU': [(517, 291), (573, 348)], 'RELT': [(461, 291), (512, 348)], 'F449': [(398, 200), (455, 224)], 'F448': [(398, 232), (455, 250)], 
                'F447': [(398, 260), (455, 278)], 'F96': [(253, 337), (483, 425)]
                },
            'PDC-RS': {
                'F400': [(613, 350), (627, 388)], 'F401': [(601, 350), (612, 388)], 'F402': [(587, 350), (599, 388)], 'F403': [(577, 350), (588, 388)], 
                'F404': [(565, 350), (576, 388)], 'F405': [(553, 350), (564, 388)], 'F411': [(463, 357), (474, 378)], 'F410': [(475, 357), (486, 378)], 
                'F409': [(487, 357), (496, 378)], 'F408': [(497, 357), (510, 378)], 'F407': [(512, 357), (523, 378)], 'F406': [(525, 357), (534, 378)], 
                'F412': [(633, 360), (673, 371)], 'F413': [(633, 348), (673, 359)], 'F414': [(633, 335), (673, 346)], 'F415': [(633, 323), (673, 334)], 
                'F416': [(633, 311), (673, 322)], 'F417': [(633, 297), (673, 308)], 'F420': [(398, 300), (455, 318)], 'F419': [(398, 330), (455, 348)], 
                'F418': [(398, 358), (455, 376)], 'F421': [(634, 272), (671, 284)], 'F422': [(634, 256), (671, 269)], 'F423': [(634, 244), (671, 255)], 
                'F424': [(634, 229), (671, 241)], 'F425': [(634, 217), (671, 228)], 'F426': [(634, 204), (671, 216)], 'F427': [(597, 256), (607, 280)], 
                'F428': [(585, 256), (595, 280)], 'F429': [(573, 256), (583, 280)], 'F430': [(561, 256), (571, 280)], 'F431': [(547, 256), (557, 280)], 
                'F437': [(600, 228), (610, 252)], 'F438': [(587, 228), (597, 252)], 'F439': [(575, 228), (585, 252)], 'F440': [(563, 228), (573, 252)], 
                'F441': [(550, 228), (560, 252)], 'F432': [(520, 256), (530, 280)], 'F433': [(508, 256), (518, 280)], 'F434': [(496, 256), (506, 280)], 
                'F435': [(484, 256), (494, 280)], 'F436': [(472, 256), (482, 280)], 'F442': [(518, 228), (528, 252)], 'F443': [(506, 228), (516, 252)], 
                'F444': [(494, 228), (504, 252)], 'F445': [(481, 228), (491, 252)], 'F446': [(469, 228), (479, 252)], 'F450': [(616, 180), (628, 218)], 
                'F451': [(604, 180), (615, 218)], 'F452': [(592, 180), (602, 218)], 'F453': [(577, 180), (589, 218)], 'F454': [(564, 180), (576, 218)], 
                'F455': [(553, 180), (563, 218)], 'F456': [(525, 180), (535, 218)], 'F457': [(514, 180), (524, 218)], 'F458': [(500, 180), (513, 218)], 
                'F459': [(487, 180), (497, 218)], 'F460': [(473, 180), (486, 218)], 'F461': [(463, 180), (474, 218)], 'RELX': [(578, 291), (629, 348)], 
                'RELU': [(517, 291), (573, 348)], 'RELT': [(461, 291), (512, 348)], 'F449': [(398, 200), (455, 224)], 'F448': [(398, 232), (455, 250)], 
                'F447': [(398, 260), (455, 278)], 'F96': [(253, 337), (483, 425)]
                }, 
            'PDC-S': {
                '1': [(439, 218), (486, 392)], '2': [(494, 218), (540, 389)], '3': [(550, 218), (596, 387)], '4': [(607, 219), (653, 387)], 
                '5': [(661, 218), (711, 382)], '6': [(719, 218), (763, 380)]
                }, 
            'TBLU': {
                '9': [(79, 531), (117, 600)], '8': [(125, 532), (159, 599)], '7': [(167, 532), (207, 599)], '6': [(212, 532), (251, 600)], 
                '5': [(257, 531), (296, 600)], '4': [(300, 530), (338, 601)], '3': [(347, 533), (385, 600)], '2': [(388, 531), (428, 598)], 
                '1': [(435, 531), (472, 600)]
                }
            }

        self.v_result = {}
        
        self.h_result = {}

        for box in self.fuses_BB:
            self.v_result[box] = {}
            self.h_result[box] = {}
            for fuse in self.fuses_BB[box]:
                self.v_result[box][fuse] = None
                self.h_result[box][fuse] = None

        #triggers extra para visión de F96
        self.v_F96_trigger = "F96"
        self.rv_F96_trigger = "F96_vision_1"
                
        #nombre de programas a llamar para inspección de zonas(por bloque) en visycam (visión) en cada punto del robot
        self.v_triggers = {
            "PDC-P2": ["P2"],
            "PDC-P": ["P1"],
            "PDC-D": ["D1","D2"],
            "PDC-S": ["S1"], 
            "TBLU": ["TB1","TB2"],
            "PDC-R": ["R1","R2","R3","R4","R5","R6","R7","R8"],
            "PDC-RMID": ["R1","R2","R3","R4","R5","R6"],
            "PDC-RS": ["R1","R2","R3","R4","R5","R6"],
            "F96": ["F96"],
            "PDC-Dbracket": ["Db1"]
            }
        #puntos guardados en robot a los que irá para sus inspecciones de visión
        self.rv_triggers = {
            "PDC-P2": ["PDCP2_vision_1"],
            "PDC-P": ["PDCP_vision_1"],
            "PDC-D": ["PDCD_vision_1","PDCD_vision_2"],
            "PDC-S": ["PDCS_vision_1"], 
            "TBLU": ["TBLU_vision_1","TBLU_vision_2"],
            "PDC-R": ["PDCR_vision_1","PDCR_vision_2","PDCR_vision_3","PDCR_vision_4","PDCR_vision_5","PDCR_vision_6","PDCR_vision_7","PDCR_vision_8"],
            "PDC-RMID": ["PDCRMID_vision_1","PDCRMID_vision_2","PDCRMID_vision_3","PDCRMID_vision_4","PDCRMID_vision_5","PDCRMID_vision_6"],
            "PDC-RS": ["PDCRMID_vision_1","PDCRMID_vision_2","PDCRMID_vision_3","PDCRMID_vision_4","PDCRMID_vision_5","PDCRMID_vision_6"],
            "F96": ["F96_vision_1"],
            "PDC-Dbracket": ["PDCDbracket_vision_1"]
            }
        #nombre de programas a llamar para inspección de zonas(por bloque) en sensor (altura) en cada punto del robot
        self.h_triggers = {
            "PDC-P": ["P1","P2","P3"],
            "PDC-D": ["D1","D2","D3","D4"],
            "PDC-S": ["S1"], 
            "TBLU": ["TB1","TB2","TB3"],
            "PDC-R": ["R1","R6","R10","R2","R4","R5","R3","R7","R8","R9","R11","R12","R13","R14"],
            "PDC-RMID": ["R1","R6","R10","R2","R4","R5","R3","R7","R8","R9"],
            "PDC-RS": ["R1","R6","R10","R2","R4","R5","R3","R7","R8","R9"],
            "F96": ["F96"],
            "PDC-Dbracket": ["Db1"]
            }
        
        #puntos guardados en robot a los que irá para sus inspecciones de alturas
        self.rh_triggers = {
            "PDC-P": ["PDCP_pa1","PDCP_pa2","PDCP_pa3"],
            "PDC-D": ["PDCD_pa1","PDCD_pa2","PDCD_pa3","PDCD_pa4"],
            "PDC-S": ["PDCS_pa1"], 
            "TBLU": ["TBLU_pa1","TBLU_pa2","TBLU_pa3"],
            "PDC-R": ["PDCR_pa1","PDCR_pa6","PDCR_pa10","PDCR_pa2","PDCR_pa4","PDCR_pa5","PDCR_pa3","PDCR_pa7","PDCR_pa8","PDCR_pa9","PDCR_pa11","PDCR_pa12","PDCR_pa13","PDCR_pa14"],
            "PDC-RMID": ["PDCR_pa1","PDCR_pa6","PDCR_pa10","PDCR_pa2","PDCR_pa4","PDCR_pa5","PDCR_pa3","PDCR_pa7","PDCR_pa8","PDCR_pa9"],
            "PDC-RS": ["PDCR_pa1","PDCR_pa6","PDCR_pa10","PDCR_pa2","PDCR_pa4","PDCR_pa5","PDCR_pa3","PDCR_pa7","PDCR_pa8","PDCR_pa9"],
            "F96": ["F96_pa1"],
            "PDC-Dbracket": ["PDCDbracket_pa1"]
            }

        print("v_triggers:\n",self.v_triggers)
        print("rv_triggers:\n",self.rv_triggers)
        print("h_triggers:\n",self.h_triggers)
        print("rh_triggers:\n",self.rh_triggers)


        self.vision_data = {
            "vision1": {
                "box": "",
                "queue": [],
                "epoches": 1,
                "current_trig": None,
                "results": {},
                "rqst": False,
                "img": None
                }
            }
        self.height_data = {
            "height1": {
                "box": "",
                "queue": [],
                "epoches": 1,
                "current_trig": None,
                "results": {},
                "rqst": False,
                "img": None,
                }
            }
        self.robot_data = {
            "stop": True,
            "v_queue": {},
            "h_queue": {},
            "current_trig": None,
            "box": ""
            }

        self.amperaje = {
            "beige": ' 5 A',
            "cafe": ' 7.5 A',
            "azul": ' 15 A',
            "amarillo": ' 20 A',
            "verde": ' 30 A',
            "naranja": ' 40 A',
            "natural": ' 25 A',
            "rojo": ['F418','F419','F420','F447','F448','F449'],
            "1008695": ' 60 A',#Rosa
            "1010733": ' 70 A',#Gris
            "vacio": '',
            "conector":" PDCP",
            "conector1":" PDCP2",
            "conector2":" PDCP2",
            "conector3":" PDCP2",
            "conector4":" PDCP2",
            "conector5":" PDCP2",
            "bracket1":" PDCD"

            }

        self.robot = Robot(self.pub_topics["robot"], self.robot_data)
        self.master_fuses = {}
        self.modularity_fuses = {}

        with open("data/BB/cavity_to_fuses", "rb") as f:
            self.fuses_parser = load(f)
        self.fuses_parser["box"] = ""

    ###########################################################

    def reset (self):
        self.valores_torques_red = False
        self.revisando_resultado_height = False
        self.revisando_resultado = False
        self.BRACKET_PDCD_clampeado=False
        self.PDCD_bracket_terminado=False
        self.PDCD_bracket_pendiente=False
        self.cajas_a_desclampear=[]
        self.F96_clampeado=False
        self.cajas_a_desclampear = []
        self.datetime = None
        
        #for i in self.result:
        #    for j in self.result[i]:
        #        self.result[i][j] = None

        for box in self.fuses_BB:
            self.tries["VISION"][box] = {}
            self.tries["ALTURA"][box] = {}
        
        self.qr_codes.clear()
        self.qr_codes["FET"]    = "--"
        self.qr_codes["HM"]     = "--"
        self.qr_codes["REF"]    = "--"

        self.local_data["lbl_info1_text"]   = ""
        self.local_data["lbl_info1.2_text"] = ""
        self.local_data["lbl_info2_text"]   = ""
        self.local_data["lbl_info3_text"]   = ""
        self.local_data["lbl_info4_text"]   = ""
        self.local_data["qr_rework"]        = False
        self.local_data["nuts_scrap"].clear()

        self.input_data["database"]["modularity"].clear()
        self.input_data["database"]["pedido"].clear()
        self.input_data["plc"]["emergency"]         = True
        self.input_data["plc"]["encoder_1"]["zone"] = "0"
        self.input_data["plc"]["encoder_2"]["zone"] = "0"
        self.input_data["plc"]["encoder_3"]["zone"] = "0"
        self.input_data["plc"]["retry_btn"]         = False
        self.input_data["gui"]["request"]           = ""
        self.input_data["gui"]["ID"]                = ""
        self.input_data["gui"]["code"]              = ""
        self.input_data["plc"]["clamps"].clear()
        self.input_data["gui"]["visible"].clear()

        self.vision_data["vision1"]["results"].clear()
        self.vision_data["vision1"]["queue"].clear()
        self.vision_data["vision1"]["box"] = ""
        self.vision_data["vision1"]["current_trig"] = None
        self.vision_data["vision1"]["rqst"] = None
        self.vision_data["vision1"]["img"] = None


        self.height_data["height1"]["results"].clear()
        self.height_data["height1"]["queue"].clear()
        self.height_data["height1"]["box"] = ""
        self.height_data["height1"]["current_trig"] = None
        self.height_data["height1"]["rqst"] = None
        self.height_data["height1"]["img"] = None
        self.F96_clampeado=False

        self.master_fuses.clear()
        self.modularity_fuses .clear()
        for box in self.fuses_BB:
            for fuse in self.fuses_BB[box]:
                self.v_result[box][fuse] = None
                self.h_result[box][fuse] = None

        self.t_result.clear()
        self.t_resultAngle.clear()
        self.t_results_lbl.clear()
        self.t_tries.clear()
        self.t_scrap.clear()

        self.robot_data["v_queue"].clear()
        self.robot_data["h_queue"].clear()
        self.robot_data["current_trig"] = None
        self.robot_data["box"] = ""

        self.fuses_base = {
            'PDC-D': {
                'F200': 'vacio', 'F201': 'vacio', 'F202': 'vacio', 'F203': 'vacio', 'F204': 'vacio', 'F205': 'vacio', 'F206': 'vacio', 'F207': 'vacio', 'F208': 'vacio',
                'F209': 'vacio', 'F210': 'vacio', 'F211': 'vacio', 'F212': 'vacio', 'F213': 'vacio', 'F214': 'vacio', 'F215': 'vacio', 'F216': 'vacio', 'F217': 'vacio',
                'F218': 'vacio', 'F219': 'vacio', 'F220': 'vacio', 'F221': 'vacio', 'F222': 'vacio', 'F223': 'vacio', 'F224': 'vacio', 'F225': 'vacio', 'F226': 'vacio',
                'F227': 'vacio', 'F228': 'vacio', 'F229': 'vacio', 'F230': 'vacio', 'F231': 'vacio', 'F232': 'vacio'
                }, 
            'PDC-Dbracket': {
                'bracket': 'bracket1'
                },
            'PDC-P': {
                'MF1': 'vacio', 'MF2': 'vacio', 'F301': 'vacio', 'F302': 'vacio', 'F303': 'vacio', 'F304': 'vacio', 'F305': 'vacio', 'F300': 'vacio', 'F318': 'vacio',
                'F319': 'vacio', 'F320': 'vacio', 'F321': 'vacio', 'F322': 'vacio', 'F323': 'vacio', 'F324': 'vacio', 'F325': 'vacio', 'F326': 'vacio', 'F327': 'vacio',
                'F328': 'vacio', 'F329': 'vacio', 'F330': 'vacio', 'F331': 'vacio', 'F332': 'vacio', 'F333': 'vacio', 'F334': 'vacio', 'F335': 'vacio','conector': 'conector'
                },
            'PDC-P2': {
                'CONECTOR1': 'conector1', 'CONECTOR2': 'conector2'
                },
            'PDC-R': {
                'F405': 'vacio', 'F404': 'vacio', 'F403': 'vacio', 'F402': 'vacio', 'F401': 'vacio', 'F400': 'vacio', 'F411': 'vacio', 'F410': 'vacio', 'F409': 'vacio',
                'F408': 'vacio', 'F407': 'vacio', 'F406': 'vacio', 'F412': 'vacio', 'F413': 'vacio', 'F414': 'vacio', 'F415': 'vacio', 'F416': 'vacio', 'F417': 'vacio',
                'F420': 'vacio', 'F419': 'vacio', 'F418': 'vacio', 'F421': 'vacio', 'F422': 'vacio', 'F423': 'vacio', 'F424': 'vacio', 'F425': 'vacio', 'F426': 'vacio',
                'F430': 'vacio', 'F431': 'vacio', 'F437': 'vacio', 'F438': 'vacio', 'F439': 'vacio', 'F440': 'vacio',
                'F441': 'vacio', 'F432': 'vacio', 'F433': 'vacio', 'F436': 'vacio', 'F442': 'vacio', 'F443': 'vacio', 'F444': 'vacio',
                'F445': 'vacio', 'F446': 'vacio', 'F449': 'vacio', 'F448': 'vacio', 'F447': 'vacio', 'F450': 'vacio', 'F451': 'vacio', 'F452': 'vacio', 'F453': 'vacio',
                'F454': 'vacio', 'F455': 'vacio', 'F456': 'vacio', 'F457': 'vacio', 'F458': 'vacio', 'F459': 'vacio', 'F460': 'vacio', 'F461': 'vacio', 'F462': 'vacio',
                'F463': 'vacio', 'F464': 'vacio', 'F465': 'vacio', 'F466': 'vacio', 'F467': 'vacio', 'F468': 'vacio', 'F469': 'vacio', 'F470': 'vacio', 'F471': 'vacio',
                'F472': 'vacio', 'F473': 'vacio', 'F474': 'vacio', 'F475': 'vacio', 'F476': 'vacio', 'F477': 'vacio', 'F478': 'vacio', 'F479': 'vacio', 'F480': 'vacio',
                'F481': 'vacio', 'F482': 'vacio', 'RELU': 'vacio', 'RELT': 'vacio', 'RELX': 'vacio'
                }, 
            'PDC-RMID': {
                'F400': 'vacio', 'F401': 'vacio', 'F402': 'vacio', 'F403': 'vacio', 'F404': 'vacio', 'F405': 'vacio', 'F411': 'vacio', 'F410': 'vacio', 'F409': 'vacio',
                'F408': 'vacio', 'F407': 'vacio', 'F406': 'vacio', 'F412': 'vacio', 'F413': 'vacio', 'F414': 'vacio', 'F415': 'vacio', 'F416': 'vacio', 'F417': 'vacio',
                'F420': 'vacio', 'F419': 'vacio', 'F418': 'vacio', 'F421': 'vacio', 'F422': 'vacio', 'F423': 'vacio', 'F424': 'vacio', 'F425': 'vacio', 'F426': 'vacio',
                'F430': 'vacio', 'F431': 'vacio', 'F437': 'vacio', 'F438': 'vacio', 'F439': 'vacio', 'F440': 'vacio',
                'F441': 'vacio', 'F432': 'vacio', 'F433': 'vacio', 'F436': 'vacio', 'F442': 'vacio', 'F443': 'vacio', 'F444': 'vacio',
                'F445': 'vacio', 'F446': 'vacio', 'F450': 'vacio', 'F451': 'vacio', 'F452': 'vacio', 'F453': 'vacio', 'F454': 'vacio', 'F455': 'vacio', 'F456': 'vacio',
                'F457': 'vacio', 'F458': 'vacio', 'F459': 'vacio', 'F460': 'vacio', 'F461': 'vacio', 'RELU': 'vacio', 'RELT': 'vacio', 'F449': 'vacio',
                'F448': 'vacio', 'F447': 'vacio', 'RELX': 'vacio'
                },
            'PDC-RS': {
                'F400': 'vacio', 'F401': 'vacio', 'F402': 'vacio', 'F403': 'vacio', 'F404': 'vacio', 'F405': 'vacio', 'F411': 'vacio', 'F410': 'vacio', 'F409': 'vacio',
                'F408': 'vacio', 'F407': 'vacio', 'F406': 'vacio', 'F412': 'vacio', 'F413': 'vacio', 'F414': 'vacio', 'F415': 'vacio', 'F416': 'vacio', 'F417': 'vacio',
                'F420': 'vacio', 'F419': 'vacio', 'F418': 'vacio', 'F421': 'vacio', 'F422': 'vacio', 'F423': 'vacio', 'F424': 'vacio', 'F425': 'vacio', 'F426': 'vacio',
                'F430': 'vacio', 'F431': 'vacio', 'F437': 'vacio', 'F438': 'vacio', 'F439': 'vacio', 'F440': 'vacio',
                'F441': 'vacio', 'F432': 'vacio', 'F433': 'vacio', 'F436': 'vacio', 'F442': 'vacio', 'F443': 'vacio', 'F444': 'vacio',
                'F445': 'vacio', 'F446': 'vacio', 'F450': 'vacio', 'F451': 'vacio', 'F452': 'vacio', 'F453': 'vacio', 'F454': 'vacio', 'F455': 'vacio', 'F456': 'vacio',
                'F457': 'vacio', 'F458': 'vacio', 'F459': 'vacio', 'F460': 'vacio', 'F461': 'vacio', 'RELU': 'vacio', 'RELT': 'vacio', 'F449': 'vacio',
                'F448': 'vacio', 'F447': 'vacio', 'RELX': 'vacio'
                }, 
            'PDC-S': {
                '1': 'vacio', '2': 'vacio', '3': 'vacio', '4': 'vacio', '5': 'vacio', '6': 'vacio'
                }, 
            'TBLU': {
                '1': 'vacio', '2': 'vacio', '3': 'vacio', '4': 'vacio', '5': 'vacio', '6': 'vacio', '7': 'vacio', '8': 'vacio', '9': 'vacio'
                },
            'F96': {
                'F96': 'vacio'
                }
            }

        Timer(1, self.robot.home).start()

    def drawBB (self, img = None, BB = ["PDC-P", "E1"], color = (255,255,255)):
        #red     = (255, 0, 0)
        #orange  = (31, 186, 226)
        #green   = (0, 255, 0)
        #White   = (255, 255, 255)
        try:
            if type(BB[0]) == list:
                for i in BB:
                    pts = self.fuses_BB[i[0]][i[1]]
                    rectangle(img, pts[0], pts[1], color, 2)
                    if BB[0]=="PDC-P2" or BB[0]=="PDC-Dbracket":
                        rectangle(img, pts[0], pts[1], color, 20)
            else:
                pts = self.fuses_BB[BB[0]][BB[1]]
                rectangle(img, pts[0], pts[1], color, 2)
                if BB[0]=="PDC-P2" or BB[0]=="PDC-Dbracket":
                    rectangle(img, pts[0], pts[1], color, 20)
        except Exception as ex:
            print("Model.drawBB exception: ", ex)
        return img

    def log(self, state):
        try:
            pedido = "--"
            if len(self.input_data["database"]["pedido"]):
                pedido = self.input_data["database"]["pedido"]["PEDIDO"]
            data = {
                "PEDIDO":pedido,
                "ESTADO": state,
                "DATETIME": self.get_currentTime().strftime("%Y/%m/%d %H:%M:%S"),
                }
            resp = requests.post("http://localhost:5000/api/post/log",data=json.dumps(data))
        except Exception as ex:
            print("Log request Exception: ", ex)

    def get_currentTime(self):

        fecha_actuaal = None
        try:
            endpoint = "http://{}/server_famx/hora_servidor".format(self.server) #self.model.server
            respuesta_hora = requests.get(endpoint).json()
            if "exception" in respuesta_hora:
                fecha_actuaal = datetime.now() #se toma la hora local de la PC
                print("////////// fecha_local")
            else:
                fecha_actuaal = datetime.strptime(respuesta_hora["HORA_ACTUAL"], "%Y-%m-%d %H:%M:%S") #se toma la hora del servidor en el formato deseado
                print("////////// fecha_servidor")
        except Exception as ex:
            print("exception hora_servidor: ",ex)
            fecha_actuaal = datetime.now()
            print("////////// fecha_local")
        print("//////// Actualizando Fecha: ",fecha_actuaal)
        return fecha_actuaal

    def update_fecha_actual(self,fechaLocalActual,fechaActual):

        #print("fechaActual: ",fechaActual)
        segundos_transcurridos = fechaLocalActual - self.fechaLocalAnterior #se obtiene la diferencia del tiempo transcurrido en cada iteración de la ejecución paralela

        self.fechaLocalAnterior = fechaLocalActual
        #print("segundos_transcurridos por iteración: ",segundos_transcurridos)
        
        diferencia = fechaActual - self.fechaAnterior #se obtiene el tiempo total que ha transcurrido desde la última actualización de la hora desde el servidor (donde se han ido acumulando los segundos transcurridos de cada iteración y la fecha original obtenida del servidor)
        # Compara si han pasado más de 3 minutos (180 segundos)
        #print("diferenciaLocalAcumulada: ",diferencia)

        if diferencia > timedelta(minutes=3) or diferencia < timedelta(minutes=0):
            #print("Han pasado más de 3 minutos. Actualizando hora desde servidor...")
            fechaActual = self.get_currentTime() #se actualiza del servidor la fecha
            print("update pedido desde update_fecha_actual")
            self.fechaAnterior = fechaActual #se guarda la última fecha obtenida de la actualización del servidor
        else:
            fechaActual = fechaActual + segundos_transcurridos
            #print("tiempo transcurrido: ",diferencia)

        return fechaActual

class Robot (object):

    def __init__(self, topic = "robot/set", data = {"stop": False}):
        self.topic = topic
        self.data = data

    #def start(self):
    #    publish.single("plc/set/robot", json.dumps({"start":True}),hostname='127.0.0.1', qos = 2)

    def stop(self):
        publish.single("PLC/1", json.dumps({"stop":True}),hostname='127.0.0.1', qos = 2)

    #def reset(self):
    #    publish.single("plc/set/robot", json.dumps({"reset":True}),hostname='127.0.0.1', qos = 2)
    #    Timer(1, self.start).start()
    #    publish.single("plc/set", json.dumps({"Flash": False}),hostname='127.0.0.1', qos = 2)

    def setPose(self, pose):
        publish.single(self.topic, json.dumps({"trigger": pose}),hostname='127.0.0.1', qos = 2)

    def home(self):
        publish.single("PLC/1", json.dumps({"Flash": False}), hostname='127.0.0.1', qos = 2)

        publish.single(self.topic, json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
        sleep(0.5)
        publish.single(self.topic, json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)
        sleep(0.2)
        self.setPose("HOME")

    def enable(self):
        state = False
        if self.data["stop"]:
            self.reset()
        else:
            state = True
        return state
       
    
class MyClass(QState):
    def __init__(self, model = None, parent = None):
        super.__init__(parent)
        self.model = model
    def onEntry(self, QEvent):
        print("Actions")