#EVA-MBI-3
from datetime import datetime, timedelta, date, time

host = "127.0.0.1"
user = "admin"
password = "4dm1n_001"
database = "eva_mbi_3"

serverp2 = "naapnx-famx2"
dbp2 = "agrucomb_prod"
userp2 = "pnx_agrucomb_prod"
passwordp2 = "pJ0rge2021"

class model(object):
    def __init__(self, parent=None):
        self.host = "127.0.0.1"
        self.user = "admin"
        self.password = "4dm1n_001"
        self.database = "eva_mbi_3"

        self.serverp2 = "NAAPNX-FAMX4"
        self.dbp2 = "agrucomb_prod"
        self.userp2 = "pnx_agrucomb_prod"
        self.passwordp2 = "pJ0rge2021"

    def datos_acceso(self):
        #self.servidor_FAMX4()
        return self.host, self.user,self.password,self.database,self.serverp2,self.dbp2,self.userp2,self.passwordp2
    
    #def servidor_FAMX4(self):
    #    inicio="2023-3-5-12" #formato año-mes-dia-hora 
    #    inicio_split = inicio.split("-")
    #    año_inicio = int(inicio_split[0])
    #    mes_inicio = int(inicio_split[1])
    #    dia_inicio = int(inicio_split[2])
    #    hora_inicio = int(inicio_split[3])

    #    #Se obtiene la Hora actual (int)
    #    horaActual = datetime.now().hour

    #    #Minutos Actuales
    #    minActual = datetime.now().minute

    #    #Fecha Actual
    #    fechaActual = datetime.today()

    #    hoy_year =  datetime.now().year
    #    hoy_month = datetime.now().month
    #    hoy_day =   datetime.now().day
    #    #Si pasa mas de un año que comienze la condicion desde el dia 1 y mes 1 de ese año
    #    if hoy_year>=año_inicio+1:
    #        mes_inicio=1
    #        dia_inicio=1
    #        #si pasa un mes despues del inicio, que inicie desde el dia 1
    #    if hoy_year>=año_inicio and hoy_month>=mes_inicio+1:
    #        dia_inicio=1
    #        #si pasa un dia despues del inicio, que inicie desde la hora 0
    #    if hoy_year>=año_inicio and hoy_month>=mes_inicio and hoy_day>=dia_inicio+1:
    #        hora_inicio=0

    #    print("horaActual",horaActual,"hora inicio",hora_inicio)
    #    if hoy_year>=año_inicio and hoy_month>=mes_inicio and hoy_day>=dia_inicio and horaActual>=hora_inicio:
    #        print("ya es hora")
    #        self.serverp2 = "NAAPNX-FAMX4"
    #        self.dbp2 = "agrucomb_prod"
    #        self.userp2 = "pnx_agrucomb_prod"
    #        self.passwordp2 = "pJ0rge2021"
    #        return self.serverp2,self.dbp2,self.userp2,self.passwordp2
        
        
    #    else:
    #        print("todavia no es hora")
    #        self.serverp2 = "naapnx-famx2"
    #        self.dbp2 = "agrucomb_prod"
    #        self.userp2 = "pnx_agrucomb_prod"
    #        self.passwordp2 = "pJ0rge2021"
    #        return self.serverp2,self.dbp2,self.userp2,self.passwordp2

"""
user = "root"
password = "root_amtc_001"
"""