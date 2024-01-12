#EVA-MBI-3
from datetime import datetime, timedelta, date, time

class model(object):
    def __init__(self, parent=None):
        self.host = "127.0.0.1"
        self.user = "admin"
        self.password = "4dm1n_001"
        self.database = "eva_mbi_3"
        self.host = "10.71.83.57"
        self.user = "dedicado"
        self.serverp2 = "NAAPNX-FAMX4"
        self.dbp2 = "agrucomb_prod"
        self.userp2 = "pnx_agrucomb_prod"
        self.passwordp2 = "pJ0rge2021"

    def datos_acceso(self):
        return self.host, self.user,self.password,self.database,self.serverp2,self.dbp2,self.userp2,self.passwordp2
