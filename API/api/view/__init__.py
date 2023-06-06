#EVA-MBI-3

#from model import model
from model import model
from werkzeug.utils import secure_filename
from flask import Flask, request
from datetime import datetime, timedelta, date, time
from flask_cors import CORS
from time import strftime
from pickle import load
import pymysql
import json
import os
from os.path import exists  #para saber si existe una carpeta o archivo
from shutil import rmtree   #para eliminar carpeta con archivos dentro: rmtree("carpeta_con_archivos")
from os import remove       #para eliminar archivo único: remove("archivo.txt")
from os import rmdir        #para eliminar carpeta vacía: rmdir("carpeta_vacia")
import requests
from paho.mqtt import publish
import pyodbc
import auto_modularities

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), '..\\')
datos_conexion=model()
host,user,password,database,serverp2,dbp2,userp2,passwordp2=datos_conexion.datos_acceso()
#####################################  Servicio para Etiquetas desde WEB ####################################
@app.route("/printer/etiqueta",methods=["POST"])
def etiqueta():
    datos_conexion=model()
    host, user,password,database,serverp2,dbp2,userp2,passwordp2=datos_conexion.datos_acceso()
    response = {"items": 0}
    print("Dentro de Servicio para Etiqueta MANUAL")
    date = request.form['DATE']
    print("||||Fecha del registro: ",date)
    ref = request.form['REF']
    print("||||Referencia del registro: ",ref)
    hm = request.form['HM']
    print("||||HM del registro: ",hm)
    torques = request.form['TORQUES']
    print("||||Torques del registro: ",torques)
    #print("||||TIPO DE DATO: ",type(torques))
    torquesJson = json.loads(torques)
    #print("Torques convertido en JSON: ",torquesJson)
    #print("TIPO DE DATO: ",type(torquesJson))
    t_results_final = {}
    t_results = {}
    BoxIgnorar = ["MFB-S","MFB-E"] # Eliminar cuando se decida agregar el valor de estos torques a la estiquetas... además de modificarlo en el manager de visión para permitir dicha acción.
    for i in torquesJson:
        #print("i de Torques Json: ",i)
        #print("Valor de i: ",torquesJson[i])
        if i not in BoxIgnorar:
            t_results[i] = []
            for j in torquesJson[i]:
                #print("j dentro de torquesJson[i]: ",j)
                #print("valores internos del json: ",torquesJson[i][j])
                if torquesJson[i][j] == None:
                    torquesJson[i][j] = '-'
                t_results[i].append(torquesJson[i][j])
    #print("|||||||||Valores a agregar al valor FINAL: ",t_results)
    for i in t_results:
        #print("Caja: ",i," - Torques: ",t_results[i])
        if "PDC-R" in i:
            if t_results[i][0] != "-":
                #print("Este es el Bueno!")
                t_results_final["_PDC-R_"] = i+": "+str(t_results[i])
        else:
            t_results_final["_"+i+"_"] = i+": "+str(t_results[i])
    #print("|||||||||t_results FINAL: ",t_results_final)

    label = {
        "_DATE_":  date,
        "_REF_":   ref,
        "_QR_":    ref+" "+hm+" V.",
        "_TITLE_": " Vision-Torque-Altura Interior",
        "_HM_":    hm,
        "_RESULT_": "Fusibles y torques OK"
    }
    label.update(t_results_final)

    print("ETIQUETA:::::::::::::::::::::::::::::::::::::")
    print(label)
    #print("update(t_results_lbl): ",self.model.t_results_lbl)
    #print("_DATE_: ",self.model.datetime.strftime("%Y/%m/%d %H:%M:%S"))
    #print("_REF_: ",self.model.qr_codes["REF"])
    #print("_QR_: ",self.model.input_data["database"]["pedido"]["PEDIDO"])
    #print("_TITLE_: Vision-Torque-Altura Interior",)
    #print("_HM_: ",self.model.qr_codes["HM"])
    #print("_RESULT_: Fusibles y torques OK")
    try:
        #192.168.1.103 IP Maquina Vision
        publish.single("Printer/5", json.dumps(label), hostname='127.0.0.1', qos = 2)
        response["items"] = 1
    except Exception as ex:
        print("ETIQUETA MANUAL Exception: ",ex)
        response = {"exception" : ex.args}
    finally:
        return response

#####################################  Upload Files Services ####################################
@app.route('/delete/filesmodularities', methods=['POST'])
def delRef():
    response = {"items": 0}
    try:
        path_carpeta = "..\\ILX";
        #se obtiene true si existe la carpeta
        existe_carpeta = os.path.isdir(path_carpeta)
        if existe_carpeta == True:
            try:
                #Eliminar la carpeta (con archivos dentro) anteriormente generada, (pueden quedarse por algún error de la matriz al tratar de cargar un formato inválido)
                rmtree(path_carpeta)#para eliminar archivo único: from os import remove | remove("archivo.txt") ; para eliminar carpeta vacía: from os import rmdir | rmdir("carpeta_vacia")
                print("se elimina la carpeta")
                response = {"path" : 'Eliminado desde la API, mi Pana'}
            except OSError as error:
                print("ERROR AL ELIMINAR CARPETA:::\n",error)
                response = {"exception" : ex.args}
        return response
    except Exception as ex:
        print("DeleteRef Exception: ", ex)
        response = {"exception" : ex.args}
        return response

@app.route('/upload/modularities', methods=['POST'])
def uploadRef():
    datos_conexion=model()
    host, user,password,database,serverp2,dbp2,userp2,passwordp2=datos_conexion.datos_acceso()
    response = {"items": 0}
    allowed_file = False
    file = None

    #se asigna el path de la carpeta que se quiere limpiar y crear
    path_carpeta = "..\\ILX"
    #se obtiene true si existe la carpeta
    existe_carpeta = os.path.isdir(path_carpeta)
    if existe_carpeta == True:
        try:
            #Eliminar la carpeta (con archivos dentro) anteriormente generada, (pueden quedarse por algún error de la matriz al tratar de cargar un formato inválido)
            #rmtree(path_carpeta) #para eliminar archivo único: from os import remove | remove("archivo.txt") ; para eliminar carpeta vacía: from os import rmdir | rmdir("carpeta_vacia")
            print("se elimina la carpeta")
        except OSError as error:
            print("ERROR AL ELIMINAR CARPETA:::\n",error)
    #mientras la carpeta no esté creada, se estará tratando de crear
    while(not(os.path.isdir(path_carpeta))):
        try:
            os.mkdir(path_carpeta)
        except OSError as error:
            print("ERROR AL CREAR CARPETA:::\n",error)

    try:

        if 'file' in request.files:
            file = request.files['file']
            if file.filename != '':
                filename = file.filename
                allowed_file = '.' in filename and \
                    filename.rsplit('.', 1)[1].lower() == "dat"
        if file and allowed_file:
            filename = secure_filename(file.filename)
            print("se guardan los archivos en el folder temporal")
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], "ILX", filename))
            response["items"] = 1

    except Exception as ex:
        print("uploadRef Exception: ", ex)
        response = {"exception" : ex.args}
    finally:
        return response

@app.route('/update/modularities', methods=['POST'])
def updateRef():
    datos_conexion=model()
    host, user,password,database,serverp2,dbp2,userp2,passwordp2=datos_conexion.datos_acceso()
    data = request.form['DBEVENT']
    print("DB a la que se cargan los DAT: ",data)
    print("se actualizarán los DATS en la base de datos, ingresando a función auto_modularities.makeModularities")
    ilxfaltantes = auto_modularities.makeModularities(data)
    return ilxfaltantes

@app.route('/update/modules', methods=['POST'])
def updateModules():
    datos_conexion=model()
    host, user,password,database,serverp2,dbp2,userp2,passwordp2=datos_conexion.datos_acceso()
    response = {"items": 0}
    allowed_file = False
    file = None

    #se asigna el path de la carpeta que se quiere limpiar y crear
    path_carpeta = "..\\modules"
    #se obtiene true si existe la carpeta
    existe_carpeta = os.path.isdir(path_carpeta)
    if existe_carpeta == True:
        try:
            #Eliminar la carpeta (con archivos dentro) anteriormente generada, (pueden quedarse por algún error de la matriz al tratar de cargar un formato inválido)
            rmtree(path_carpeta) #para eliminar archivo único: from os import remove | remove("archivo.txt") ; para eliminar carpeta vacía: from os import rmdir | rmdir("carpeta_vacia")
            print("se elimina la carpeta")
        except OSError as error:
            print("ERROR AL ELIMINAR CARPETA:::\n",error)
    #mientras la carpeta no esté creada, se estará tratando de crear
    while(not(os.path.isdir(path_carpeta))):
        try:
            os.mkdir(path_carpeta)
        except OSError as error:
            print("ERROR AL CREAR CARPETA:::\n",error)

    try:
        data = request.form['DBEVENT']
        print("DB a la que se carga la Info: ",data)
        usuario = request.form['USUARIO']
        print("Usuario que carga la info: ",usuario)
        if 'file' in request.files:
            file = request.files['file']
            if file.filename != '':
                filename = file.filename
                allowed_file = '.' in filename and \
                    filename.rsplit('.', 1)[1].lower() in ['xls', 'xlsx']
        if file and allowed_file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], "modules", filename))
            auto_modularities.refreshModules(data)
            excelnew = {
                'DBEVENT': data,
                'ARCHIVO': filename,
                'USUARIO': usuario,
                'DATETIME': 'AUTO'
                }
            #print("Información que se manda al POST DE EVENTOS HISTORIAL: ",excelnew)
            endpoint = f"http://{host}:5000/api/post/historial"
            responseHistorial = requests.post(endpoint, data = json.dumps(excelnew))
            response["items"] = 1

    except Exception as ex:
        print("updateModules Exception: ", ex)
        response = {"exception" : ex.args}

    finally:
        return response

@app.route('/update/determinantes', methods=['POST'])
def updateDeterminantes():
    datos_conexion=model()
    host, user,password,database,serverp2,dbp2,userp2,passwordp2=datos_conexion.datos_acceso()
    response = {"items": 0}
    allowed_file = False
    file = None

    #se asigna el path de la carpeta que se quiere limpiar y crear
    path_carpeta = "..\\determinantes"
    #se obtiene true si existe la carpeta
    existe_carpeta = os.path.isdir(path_carpeta)
    if existe_carpeta == True:
        try:
            #Eliminar la carpeta (con archivos dentro) anteriormente generada, (pueden quedarse por algún error de la matriz al tratar de cargar un formato inválido)
            rmtree(path_carpeta) #para eliminar archivo único: from os import remove | remove("archivo.txt") ; para eliminar carpeta vacía: from os import rmdir | rmdir("carpeta_vacia")
            print("se elimina la carpeta")
        except OSError as error:
            print("ERROR AL ELIMINAR CARPETA:::\n",error)
    #mientras la carpeta no esté creada, se estará tratando de crear
    while(not(os.path.isdir(path_carpeta))):
        try:
            os.mkdir(path_carpeta)
        except OSError as error:
            print("ERROR AL CREAR CARPETA:::\n",error)

    try:
        data = request.form['DBEVENT']
        print("DB a la que se carga la Info: ",data)
        usuario = request.form['USUARIO']
        print("Usuario que carga la info: ",usuario)
        if 'file' in request.files:
            file = request.files['file']
            if file.filename != '':
                filename = file.filename
                allowed_file = '.' in filename and \
                    filename.rsplit('.', 1)[1].lower() in ['xls', 'xlsx']
        if file and allowed_file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], "determinantes", filename))
            auto_modularities.refreshDeterminantes(data,usuario)
            response["items"] = 1
    except Exception as ex:
        print("updateDeterminantes Exception: ", ex)
        response = {"exception" : ex.args}
    finally:
        return response

#########################################  CRUD Services ########################################
@app.route("/api/get/<table>/<column_1>/<operation_1>/<value_1>/<column_2>/<operation_2>/<value_2>",methods=["GET"])
def generalGET(table, column_1, operation_1, value_1, column_2, operation_2, value_2):

    if column_1=='all':
        query='SELECT * FROM ' +table+';'
    else:
        if value_2=='_':
            query = "SELECT * FROM " + table + " WHERE " + column_1 + operation_1 + "'{}';".format(value_1)
        else:
            query = "SELECT * FROM " + table + " WHERE " + column_1 + operation_1 + "'{}'".format(value_1)
            query += " AND " + column_2 + operation_2 + "'{}';".format(value_2)
    try:
        connection = pymysql.connect(host = host, user = user, passwd = password, database = database, cursorclass=pymysql.cursors.DictCursor)
    except Exception as ex:
        print("myJsonResponse connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        with connection.cursor() as cursor:
            items = cursor.execute(query)
            result = cursor.fetchall()
            if len(result) == 1:
                response = result[0]
            elif len(result) > 1:
                response = {}
                keys = list(result[0])
                for key in keys:
                    response[key] = []
                    for item in result:
                        response[key].append(item.pop(key))         
            else:
                response = {"items": items}
    except Exception as ex:
        print("myJsonResponse cursor Exception: ", ex)
        response = {"exception" : ex.args}
    finally:
        connection.close()
        return response

@app.route("/api/post/<table>",methods=["POST"])
def generalPOST(table):

    def escape_name(s):
        name = '`{}`'.format(s.replace('`', '``'))
        return name
    data = request.get_json(force=True)
    #print("Data -*-*-*--*-*-*-**: ",data)
    try:
        if ("DBEVENT" in data):
            #print("True SI HAY DBEVENT")
            print("DBEVENT: ",data["DBEVENT"])
            connection = pymysql.connect(host = host, user = user, passwd = password, database = data["DBEVENT"])
            del data["DBEVENT"]
        else:
            #print ("False NO HAY DBEVENT, TODO FLUYE NORMAL")
            connection = pymysql.connect(host = host, user = user, passwd = password, database = database)
    except Exception as ex:
        print("generalPOST connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        query = "INSERT INTO " + table
        keys = list(data)
        cols = ', '.join(map(escape_name, keys))
        placeholders = ', '.join(['%({})s'.format(key) for key in keys])
        query += ' ({}) VALUES ({})'.format(cols, placeholders)
        for key in data:
            try:
                if key == "DATETIME":
                    if data[key] == "AUTO":
                        data[key] = datetime.now().isoformat()
                if type(data[key]) == dict:
                    data[key] = json.dumps(data[key])
            except Exception as ex:
                print("keys inspection Exception: ", ex)
        with connection.cursor() as cursor:
            items = cursor.execute(query, data)
        connection.commit()
        response = {"items": items}
    except Exception as ex:
        print("generalPOST Exception: ", ex)
        response = {"exception": ex.args}
    finally:
        connection.close()
        return response

@app.route("/api/delete/<table>/<int:ID>",methods=["POST"])
def delete(table, ID):

    try:
        connection = pymysql.connect(host = host, user = user, passwd = password, database = database)
    except Exception as ex:
        print("delete connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        with connection.cursor() as cursor:
            items = cursor.execute(f"DELETE FROM {table} WHERE ID={ID}")
        connection.commit()
        response = {"items": items}
    except Exception as ex:
        print("dele Exception: ", ex)
        response = {"exception": ex.args}
    finally:
        connection.close()
        return response

@app.route("/api/update/<table>/<int:ID>",methods=["POST"])
def update(table, ID):

    def escape_name(s):
        name = '`{}`'.format(s.replace('`', '``'))
        return name
    data = request.get_json(force=True)
    try:
        if ("DBEVENT" in data):
            #print("True SI HAY DBEVENT")
            print("DBEVENT: ",data["DBEVENT"])
            connection = pymysql.connect(host = host, user = user, passwd = password, database = data["DBEVENT"])
            del data["DBEVENT"]
        else:
            #print ("False NO HAY DBEVENT, TODO FLUYE NORMAL")
            connection = pymysql.connect(host = host, user = user, passwd = password, database = database)
        #connection = pymysql.connect(host = host, user = user, passwd = password, database = database)
    except Exception as ex:
        print("generalPOST connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        query = "UPDATE " + table + f" SET"
        for i in data:
            if i == "DATETIME":
                if data[i] == "AUTO":
                    data[i] = datetime.now().isoformat()
            key = escape_name(i)
            if type(data[i]) == dict:
                data[i] = json.dumps(data[i])
            query += f' {key}=%({i})s,'
        query = query[:-1]
        query += f" WHERE ID={ID}"
        with connection.cursor() as cursor:
            items = cursor.execute(query,data)
        connection.commit()
        response = {"items": items}
    except Exception as ex:
        print("delete Exception: ", ex)
        response = {"exception": ex.args}
    finally:
        connection.close()
        return response

@app.route("/api/get/pdcr/variantes",methods=["GET"])
def variantes():
    datos_conexion=model()
    host, user,password,database,serverp2,dbp2,userp2,passwordp2=datos_conexion.datos_acceso()
    pdcrVariantes = {
    "small": [],
    "medium": [],
    "large": [],
    }
    endpoint = f"http://{host}:5000/api/get/definiciones/ACTIVE/=/1/_/_/_"
    pdcrVariantesDB = requests.get(endpoint).json()
    #print("pdcrVariantesDB-------",pdcrVariantesDB)
    if len(pdcrVariantesDB["MODULO"]) > 0:
        #print("Cantidad de Módulos: ",len(pdcrVariantesDB["MODULO"]))
        #print("Lista de Módulos: ",pdcrVariantesDB["MODULO"])
        #print("Lista de Variantes: ",pdcrVariantesDB["VARIANTE"])
        for i in pdcrVariantesDB["MODULO"]:
            #print("Modulo Actual (i)",i)
            #print("Index de Modulo Actual (i)",pdcrVariantesDB["MODULO"].index(i))
            #print("Variante correspondiente a Modulo Actual: ",pdcrVariantesDB["VARIANTE"][pdcrVariantesDB["MODULO"].index(i)])
            if pdcrVariantesDB["VARIANTE"][pdcrVariantesDB["MODULO"].index(i)] == "PDC-R":
                pdcrVariantes["large"].append(i)
                #print("ES UNA PDC-R LARGE")
            elif pdcrVariantesDB["VARIANTE"][pdcrVariantesDB["MODULO"].index(i)] == "PDC-RMID":
                #print("ES UNA PDC-R MEDIUM")
                pdcrVariantes["medium"].append(i)
            elif pdcrVariantesDB["VARIANTE"][pdcrVariantesDB["MODULO"].index(i)] == "PDC-RS":
                #print("ES UNA PDC-R SMALL")
                pdcrVariantes["small"].append(i)
    return pdcrVariantes

@app.route("/api/get/preview/modularity/<ILX>",methods=["GET"])
def preview(ILX):
    endpoint = f"http://{host}:5000/api/get/pdcr/variantes"
    pdcrVariantes = requests.get(endpoint).json()
    print("Lista Final de Variantes PDC-R: \n",pdcrVariantes)
    flag_l = False
    flag_m = False
    flag_s = False
    endpoint = f"http://{host}:5000/api/get/pedidos/PEDIDO/=/{ILX}/ACTIVE/=/1"
    response = requests.get(endpoint).json()
    #print("RESPONSE ",response)
    #print("RESPONSE ",response["MODULOS_VISION"])
    response_json = json.loads(response["MODULOS_VISION"])
    #print("RESPONSE JSON ",response_json)
    #print("RESPONSE JSON ",response_json["INTERIOR"][0])
    #arrayModules = response["MODULOS_FUSIBLES"][0].split(",")
    modules = response_json["INTERIOR"]
    print(f"\n\t\tMODULOS_FUSIBLES:\n{modules}")
    #print("Modulos SPLIT: ",arrayModules)
    modularity = {
        'vision': {
            'PDC-P': {},
            'PDC-D': {},
            'PDC-R': {},
            'PDC-RMID': {},
            'PDC-RS': {},
            'PDC-S': {}, 
            'TBLU': {}
        },
        'torque': {
            'PDC-P':{},
            'PDC-D':{},
            'MFB-P1':{},
            'MFB-S':{},
            'MFB-E':{},
            'MFB-P2':{},
            'PDC-R':{},
            'PDC-RMID':{},
            'PDC-RS': {},
            'BATTERY':{},
            'BATTERY-2':{}
            },
        'variante': {}
    }
    cajas = modularity["vision"].keys()
    cajas_torque = modularity["torque"].keys()
    #print("CAJAS: ",cajas)
    for module in modules:
        if module in pdcrVariantes["large"]:
            flag_l = True
        if module in pdcrVariantes["medium"]:
            flag_m = True
        if module in pdcrVariantes["small"]:
            flag_s = True
        #print("Module i de la Lista: "+module)
        endpoint_Module= f"http://{host}:5000/api/get/modulos_fusibles/MODULO/=/{module}/_/=/_"
        #print("Endpoint del módulo"+endpoint_Module)
        resultado = requests.get(endpoint_Module).json()
        #print("Modulo Informacion",resultado)
        if "MODULO" in resultado:
            modulos_cant = resultado["MODULO"].split(sep = ",")
            #print("creacion de array: ",modulos_cant)
            if len(modulos_cant) == 1: 
                for j in resultado:
                    if j == "ID" or j == "MODULO" or j == "CAJA_6" or j == "CAJA_7" or j == "CAJA_8":
                        pass
                        #resultado[j] = resultado[j][0]
                    else:
                        #print(j)
                        resultado_json = json.loads(resultado[j])
                        #print(resultado_json)
                        #print(type(resultado_json))
                        for box in cajas:
                            #print("BOX: ",box)
                            if box in resultado_json:
                                #print("Si existe la caja dentro del JSON: ",resultado_json[box])
                                for k in resultado_json[box]:
                                    if resultado_json[box][k] != "vacio":
                                         #print("K: ",k)
                                         #print("Valor de la cavidad: ",resultado_json[box][k])
                                         modularity["vision"][box][k] = [resultado_json[box][k],module] 
                            else:
                                pass
    print("\t\t+++++++++++ FLAGS de",ILX,":+++++++++++\n Flag S - ",flag_s," Flag M - ",flag_m," Flag L - ",flag_l)
    if flag_l == True:
        variante = "PDC-R"
    if flag_m == True and flag_l == False:
        variante = "PDC-RMID"
    if flag_s == True and flag_m == False:
        variante = "PDC-RS"
    if flag_s == False and flag_m == False and flag_l == False:
        variante = "N/A"
        print("La caja no contiene módulos pertenecientes a las categorías.")
    modularity["variante"] = variante
    print("Variante de Caja: ",variante)
    #print("Response Modulos Torque: ",response["MODULOS_TORQUE"])
    response_torque = json.loads(response["MODULOS_TORQUE"])
    #print("Response Modulos Torque: ",response_torque)
    modules_torque = response_torque["INTERIOR"]
    #print("Response Modulos Torque: ",modules_torque)
    print(f"\n\t\tMODULOS_TORQUE:\n{modules_torque}")
    for modulet in modules_torque:
        #print("Module i de la Lista: "+module)
        endpoint_Modulet= f"http://{host}:5000/api/get/modulos_torques/MODULO/=/{modulet}/_/=/_"
        #print("Endpoint del módulo"+endpoint_Module)
        resultadot = requests.get(endpoint_Modulet).json()
        #print("Modulo Informacion",resultadot)
        if "MODULO" in resultadot:
            modulos_cant_t = resultadot["MODULO"].split(sep = ",")
            #print("creacion de array: ",modulos_cant_t)
            if len(modulos_cant_t) == 1: 
                for j in resultadot:
                    if j == "ID" or j == "MODULO":
                        pass
                        #resultado[j] = resultado[j][0]
                    else:
                        #print(j)
                        resultadot_json = json.loads(resultadot[j])
                        #print(resultado_json)
                        #print(type(resultado_json))
                        for box_torque in cajas_torque:
                            #print("BOX: ",box_torque)
                            if box_torque in resultadot_json:
                                #print("Si existe la caja dentro del JSON de Torques: ",resultadot_json[box_torque])
                                for k in resultadot_json[box_torque]:
                                    if resultadot_json[box_torque][k] == 1 or resultadot_json[box_torque][k] == True:
                                         #print("K: ",k)
                                         #print("Aplica torque?: ",resultadot_json[box_torque][k])
                                         modularity["torque"][box_torque][k] = [resultadot_json[box_torque][k],modulet]
                            else:
                                pass
    return modularity

################################################## Respaldos de Base de Datos Endpoint  ####################################################
@app.route("/api/get/bkup",methods=["GET"])
def bkup():

    items = {
        "status": False,
        "dir": "",
        "nombre": ""
        }
    ####### Cambiar Dirección de la carpeta destino donde se guardarán los Backups, dependiendo de la máquina o computadora en la que se correrá la API #######
    dest_folder = "C:/Users/administrador/Documents/Respaldos/DATABASE"
    print("Petición de BACKUP")
    try:
        if os.path.isdir(dest_folder):
            print("La Carpeta para respaldos SI existe!")
            path = os.getcwd()   # show current working directory (cwd)
            print("path",path)
            os.chdir('C:/xampp/mysql/bin')
            filestamp = strftime('%Y%m%d-%H%M%S')
            filename = "%s/%s-%s.sql" % (dest_folder, filestamp, database)
            db_dump = "mysqldump --single-transaction -h " + host + " -u " + user + " -p" + password + " " + database + " > " + filename
            os.system(db_dump)
            items["status"] = True
            items["dir"] = filename
            items["nombre"] = filestamp+"-"+database
            print("DATABASE BACKUP EXITOSO")
        else:
            print("La Carpeta para respaldos NO existe!")
            items["dir"] = dest_folder
    except Exception as ex:
        print("DB BKUP Exception: ",ex)
    return items

################################################## Crear Base de Datos (Evento)  ####################################################
@app.route("/api/post/newEvent",methods=["POST"])
def newEvent():
    charSet = "utf8mb4_bin"
    historial = {
        "DBEVENT": "",
        "ARCHIVO": "",
        "USUARIO": "",
        "DATETIME": "",
    }
    activo = {
        "DBEVENT": "",
        "ACTIVE": ""
    }

    data = request.get_json(force=True)
    print("Data: ",data)
    event_name = 'evento_'+data["EVENTO"]+"_"+data["NUMERO"]+"_"+data["CONDUCCION"]
    historial["USUARIO"] = data["USUARIO"]
    historial["DATETIME"] = data["DATETIME"]
    historial["DBEVENT"] = event_name

    activo["ACTIVE"] = data["ACTIVE"]
    activo["DBEVENT"] = event_name
    try:
        connection = pymysql.connect(host = host, user = user, passwd = password)
    except Exception as ex:
        print("generalPOST connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        with connection.cursor() as cursor:
            items = cursor.execute("create database "+event_name)
            sql = "use "+event_name
            cursor.execute(sql)
            definicionesTable = """CREATE TABLE definiciones (
            ID int primary key AUTO_INCREMENT, 
            MODULO text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL, 
            VARIANTE text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            DATETIME datetime NOT NULL,
            USUARIO text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            ACTIVE tinyint NOT NULL
            )"""
            cursor.execute(definicionesTable)
            fusiblesTable = """CREATE TABLE modulos_fusibles (
            ID int primary key AUTO_INCREMENT, 
            MODULO text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL, 
            CAJA_1 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_2 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_3 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_4 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_5 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_6 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_7 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_8 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
            )"""
            cursor.execute(fusiblesTable)
            alturaTable = """CREATE TABLE modulos_alturas (
            ID int primary key AUTO_INCREMENT, 
            MODULO text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL, 
            CAJA_1 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_2 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_3 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_4 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_5 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_6 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_7 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_8 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
            )"""
            cursor.execute(alturaTable)
            torquesTable = """CREATE TABLE modulos_torques (
            ID int primary key AUTO_INCREMENT, 
            MODULO text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL, 
            CAJA_1 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_2 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_3 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_4 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_5 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_6 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_7 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_8 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            CAJA_9 longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
            )"""
            cursor.execute(torquesTable)
            pedidosTable = """CREATE TABLE pedidos (
            ID int primary key AUTO_INCREMENT, 
            PEDIDO text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            DATETIME datetime NOT NULL,
            MODULOS_VISION longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            MODULOS_TORQUE longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            MODULOS_ALTURA longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            QR_BOXES longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            ACTIVE tinyint NOT NULL
            )"""
            cursor.execute(pedidosTable)
            historialTable = """CREATE TABLE historial (
            ID int primary key AUTO_INCREMENT, 
            ARCHIVO longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL, 
            USUARIO text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            DATETIME datetime NOT NULL
            )"""
            cursor.execute(historialTable)
            activoTable = """CREATE TABLE activo (
            ID int primary key AUTO_INCREMENT, 
            ACTIVE tinyint NOT NULL
            )"""
            cursor.execute(activoTable)
        connection.commit()
        response = {"items": items}
    except Exception as ex:
        print("generalPOST Exception: ", ex)
        response = {"exception": ex.args}
    finally:
        #print("Información que se manda al POST DE EVENTOS HISTORIAL: ",historial)
        endpoint = f"http://{host}:5000/api/post/historial"
        responseHistorial = requests.post(endpoint, data = json.dumps(historial))
        #print("Información que se manda al POST DE EVENTOS ACTIVO: ",activo)
        endpoint = f"http://{host}:5000/api/post/activo"
        responseActivo = requests.post(endpoint, data = json.dumps(activo))
        connection.close()
        return response

################################################## Eliminar Base de Datos (Evento)  ####################################################
@app.route("/api/delete/event",methods=["POST"])
def delEvent():
    charSet = "utf8mb4_bin"
    response = {"delete": 0}

    data = request.get_json(force=True)
    print("Data: ",data)
    #EVENTDELETE = data["DBEVENT"]
    try:
        connection = pymysql.connect(host = host, user = user, passwd = password, database = data["DBEVENT"])
    except Exception as ex:
        print("Delete Event connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        with connection.cursor() as cursor:
            items = cursor.execute("DROP DATABASE "+data["DBEVENT"])
        connection.commit()
        response["delete"] = 1
    except Exception as ex:
        print("Delete Event Exception: ", ex)
        response = {"exception": ex.args}
    finally:
        connection.close()
        return response
################################################## Consultar Bases de Datos (Eventos)  ####################################################
@app.route("/api/get/eventos",methods=["GET"])
def eventos():
    lista = {
        "eventos": {}
        }
    try:
        connection = pymysql.connect(host = host, user = user, passwd = password)
    except Exception as ex:
        print("GET EVENTOS connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        with connection.cursor() as cursor:
            items = cursor.execute("SHOW DATABASES")
            l = cursor.fetchall()
            #print ("Lista de dbs: ",l)
            x = []
            for i in l:
                #print("imprimiendo I 0 ",i[0])
                if 'evento' in i[0]:
                    #print("Este contiene evento: ",i[0])
                    x.extend(i)
                    
                    endpoint = f"http://{host}:5000/api/get/{i[0]}/historial/all/-/-/-/-/-"
                    respHistorial = requests.get(endpoint).json()
                    endpoint = f"http://{host}:5000/api/get/{i[0]}/activo/all/-/-/-/-/-"
                    respActivo = requests.get(endpoint).json()
                    #print("Respuesta de Historial: ",respHistorial)
                    #print("Respuesta de Historial Archivo: ",respHistorial["ARCHIVO"])
                    #print("Respuesta de Activo: ",respActivo)
                    #print("Respuesta de Activo: ",respActivo["ACTIVE"])
                    if type(respHistorial["ARCHIVO"]) == list:
                        #print("Es una lista!")
                        lista["eventos"][i[0]] = [respHistorial["ARCHIVO"][-1],respActivo["ACTIVE"]]
                    else:
                        #print("No es una lista, es posible que sea solo un elemento o esté vacío")
                        lista["eventos"][i[0]] = [respHistorial["ARCHIVO"],respActivo["ACTIVE"]]
            #print("Lista de bases de datos: ",x)
            print("Lista de eventos final: ",lista)
        connection.commit()
    except Exception as ex:
        print("GET EVENTOS Exception: ", ex)
    finally:
        connection.close()
        return lista

@app.route("/api/get/<db>/<table>/<column_1>/<operation_1>/<value_1>/<column_2>/<operation_2>/<value_2>",methods=["GET"])
def eventGET(table, db, column_1, operation_1, value_1, column_2, operation_2, value_2):

    if column_1=='all':
        query='SELECT * FROM ' +table+';'
    else:
        if value_2=='_':
            query = "SELECT * FROM " + table + " WHERE " + column_1 + operation_1 + "'{}';".format(value_1)
        else:
            query = "SELECT * FROM " + table + " WHERE " + column_1 + operation_1 + "'{}'".format(value_1)
            query += " AND " + column_2 + operation_2 + "'{}';".format(value_2)
    try:
        connection = pymysql.connect(host = host, user = user, passwd = password, database = db, cursorclass=pymysql.cursors.DictCursor)
    except Exception as ex:
        print("myJsonResponse connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        with connection.cursor() as cursor:
            items = cursor.execute(query)
            result = cursor.fetchall()
            if len(result) == 1:
                response = result[0]
            elif len(result) > 1:
                response = {}
                keys = list(result[0])
                for key in keys:
                    response[key] = []
                    for item in result:
                        response[key].append(item.pop(key))         
            else:
                response = {"items": items}
    except Exception as ex:
        print("myJsonResponse cursor Exception: ", ex)
        response = {"exception" : ex.args}
    finally:
        connection.close()
        return response

@app.route("/api/get/<db>/preview/modularity/<ILX>",methods=["GET"])
def previewEvent(ILX,db):
    endpoint = f"http://{host}:5000/api/get/{db}/pdcr/variantes"
    pdcrVariantes = requests.get(endpoint).json()
    print("Lista Final de Variantes PDC-R: \n",pdcrVariantes)
    flag_l = False
    flag_m = False
    flag_s = False
    endpoint = f"http://{host}:5000/api/get/{db}/pedidos/PEDIDO/=/{ILX}/ACTIVE/=/1"
    response = requests.get(endpoint).json()
    #print("RESPONSE ",response)
    #print("RESPONSE ",response["MODULOS_VISION"])
    response_json = json.loads(response["MODULOS_VISION"])
    #print("RESPONSE JSON ",response_json)
    #print("RESPONSE JSON ",response_json["INTERIOR"][0])
    #arrayModules = response["MODULOS_FUSIBLES"][0].split(",")
    modules = response_json["INTERIOR"]
    print(f"\n\t\tMODULOS_FUSIBLES:\n{modules}")
    #print("Modulos SPLIT: ",arrayModules)
    modularity = {
        'vision': {
            'PDC-P': {},
            'PDC-D': {},
            'PDC-R': {},
            'PDC-RMID': {},
            'PDC-RS': {},
            'PDC-S': {}, 
            'TBLU': {}
        },
        'torque': {
            'PDC-P':{},
            'PDC-D':{},
            'MFB-P1':{},
            'MFB-S':{},
            'MFB-E':{},
            'MFB-P2':{},
            'PDC-R':{},
            'PDC-RMID':{},
            'PDC-RS': {},
            'BATTERY':{},
            'BATTERY-2':{}
            },
        'variante': {}
    }
    cajas = modularity["vision"].keys()
    cajas_torque = modularity["torque"].keys()
    #print("CAJAS: ",cajas)
    for module in modules:
        if module in pdcrVariantes["large"]:
            flag_l = True
        if module in pdcrVariantes["medium"]:
            flag_m = True
        if module in pdcrVariantes["small"]:
            flag_s = True
        #print("Module i de la Lista: "+module)
        endpoint_Module= f"http://{host}:5000/api/get/{db}/modulos_fusibles/MODULO/=/{module}/_/=/_"
        #print("Endpoint del módulo"+endpoint_Module)
        resultado = requests.get(endpoint_Module).json()
        #print("Modulo Informacion",resultado)
        if "MODULO" in resultado:
            modulos_cant = resultado["MODULO"].split(sep = ",")
            #print("creacion de array: ",modulos_cant)
            if len(modulos_cant) == 1: 
                for j in resultado:
                    if j == "ID" or j == "MODULO" or j == "CAJA_6" or j == "CAJA_7" or j == "CAJA_8":
                        pass
                        #resultado[j] = resultado[j][0]
                    else:
                        #print(j)
                        resultado_json = json.loads(resultado[j])
                        #print(resultado_json)
                        #print(type(resultado_json))
                        for box in cajas:
                            #print("BOX: ",box)
                            if box in resultado_json:
                                #print("Si existe la caja dentro del JSON: ",resultado_json[box])
                                for k in resultado_json[box]:
                                    if resultado_json[box][k] != "vacio":
                                         #print("K: ",k)
                                         #print("Valor de la cavidad: ",resultado_json[box][k])
                                         modularity["vision"][box][k] = [resultado_json[box][k],module] 
                            else:
                                pass
    print("\t\t+++++++++++ FLAGS de",ILX,":+++++++++++\n Flag S - ",flag_s," Flag M - ",flag_m," Flag L - ",flag_l)
    if flag_l == True:
        variante = "PDC-R"
    if flag_m == True and flag_l == False:
        variante = "PDC-RMID"
    if flag_s == True and flag_m == False:
        variante = "PDC-RS"
    if flag_s == False and flag_m == False and flag_l == False:
        variante = "N/A"
        print("La caja no contiene módulos pertenecientes a las categorías.")
    modularity["variante"] = variante
    print("Variante de Caja: ",variante)
    #print("Response Modulos Torque: ",response["MODULOS_TORQUE"])
    response_torque = json.loads(response["MODULOS_TORQUE"])
    #print("Response Modulos Torque: ",response_torque)
    modules_torque = response_torque["INTERIOR"]
    #print("Response Modulos Torque: ",modules_torque)
    print(f"\n\t\tMODULOS_TORQUE:\n{modules_torque}")
    for modulet in modules_torque:
        #print("Module i de la Lista: "+module)
        endpoint_Modulet= f"http://{host}:5000/api/get/{db}/modulos_torques/MODULO/=/{modulet}/_/=/_"
        #print("Endpoint del módulo"+endpoint_Module)
        resultadot = requests.get(endpoint_Modulet).json()
        #print("Modulo Informacion",resultadot)
        if "MODULO" in resultadot:
            modulos_cant_t = resultadot["MODULO"].split(sep = ",")
            #print("creacion de array: ",modulos_cant_t)
            if len(modulos_cant_t) == 1: 
                for j in resultadot:
                    if j == "ID" or j == "MODULO":
                        pass
                        #resultado[j] = resultado[j][0]
                    else:
                        #print(j)
                        resultadot_json = json.loads(resultadot[j])
                        #print(resultado_json)
                        #print(type(resultado_json))
                        for box_torque in cajas_torque:
                            #print("BOX: ",box_torque)
                            if box_torque in resultadot_json:
                                #print("Si existe la caja dentro del JSON de Torques: ",resultadot_json[box_torque])
                                for k in resultadot_json[box_torque]:
                                    if resultadot_json[box_torque][k] == 1 or resultadot_json[box_torque][k] == True:
                                         #print("K: ",k)
                                         #print("Aplica torque?: ",resultadot_json[box_torque][k])
                                         modularity["torque"][box_torque][k] = [resultadot_json[box_torque][k],modulet]
                            else:
                                pass
    return modularity

@app.route("/api/get/<db>/pdcr/variantes",methods=["GET"])
def variantesEvent(db):
    datos_conexion=model()
    host, user,password,database,serverp2,dbp2,userp2,passwordp2=datos_conexion.datos_acceso()
    pdcrVariantes = {
    "small": [],
    "medium": [],
    "large": [],
    }
    endpoint = f"http://{host}:5000/api/get/{db}/definiciones/ACTIVE/=/1/_/_/_"
    pdcrVariantesDB = requests.get(endpoint).json()
    #print("pdcrVariantesDB-------",pdcrVariantesDB)
    try:
        if len(pdcrVariantesDB["MODULO"]) > 0:
            #print("Cantidad de Módulos: ",len(pdcrVariantesDB["MODULO"]))
            #print("Lista de Módulos: ",pdcrVariantesDB["MODULO"])
            #print("Lista de Variantes: ",pdcrVariantesDB["VARIANTE"])
            for i in pdcrVariantesDB["MODULO"]:
                #print("Modulo Actual (i)",i)
                #print("Index de Modulo Actual (i)",pdcrVariantesDB["MODULO"].index(i))
                #print("Variante correspondiente a Modulo Actual: ",pdcrVariantesDB["VARIANTE"][pdcrVariantesDB["MODULO"].index(i)])
                if pdcrVariantesDB["VARIANTE"][pdcrVariantesDB["MODULO"].index(i)] == "PDC-R":
                    pdcrVariantes["large"].append(i)
                    #print("ES UNA PDC-R LARGE")
                elif pdcrVariantesDB["VARIANTE"][pdcrVariantesDB["MODULO"].index(i)] == "PDC-RMID":
                    #print("ES UNA PDC-R MEDIUM")
                    pdcrVariantes["medium"].append(i)
                elif pdcrVariantesDB["VARIANTE"][pdcrVariantesDB["MODULO"].index(i)] == "PDC-RS":
                    #print("ES UNA PDC-R SMALL")
                    pdcrVariantes["small"].append(i)
    except Exception as ex:
        print("Variantes Exception: ", ex)
        return {"exception": ex.args}
    return pdcrVariantes

@app.route("/api/delete/<db>/<table>/<int:ID>",methods=["POST"])
def deleteEvent(table, ID,db):

    try:
        connection = pymysql.connect(host = host, user = user, passwd = password, database = db)
    except Exception as ex:
        print("delete connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        with connection.cursor() as cursor:
            items = cursor.execute(f"DELETE FROM {table} WHERE ID={ID}")
        connection.commit()
        response = {"items": items}
    except Exception as ex:
        print("dele Exception: ", ex)
        response = {"exception": ex.args}
    finally:
        connection.close()
        return response

@app.route('/database/<db>/<table>/<column_of_table_1>/<operation_1>/<val_1>/<column_of_table_2>/<operation_2>/<val_2>',methods=['GET'])
def value_of_a_tableEvent(table,column_of_table_1,operation_1,val_1,column_of_table_2,operation_2,val_2,db):

    if column_of_table_1=='all':
        query='SELECT * FROM ' +table+';'
    else:
        if val_2=='_':
            query='SELECT * FROM ' +table+' WHERE '+column_of_table_1+operation_1+'"'+val_1+'";'
        else:
            query='SELECT * FROM ' +table+' WHERE '+column_of_table_1+operation_1+'"'+val_1+'" AND '+column_of_table_2+operation_2 +'"'+val_2+'";'
    print(query)
    #conexion con base de datos
    conexion =  pymysql.connect(host = host, user = user, passwd = password, database = db)
    cursor = conexion.cursor()
    cursor.execute(query)
    result = cursor.fetchone()
    
    if result == None:
        resp='NO HAY INFORMACION'
        response=resp
    else:
        resp='SI HAY INFORMACION'
        query = 'SELECT COLUMN_NAME FROM Information_Schema.Columns WHERE TABLE_NAME = ' + '"' + table + '";'
        cursor.execute(query)
        name_columns=cursor.fetchall()
        print(type(result))
        print(len(result))
        print(result)
        print(type(name_columns))
        print(len(name_columns))
        print(name_columns)

        dic={}
        for i in range(len(result)):
            dic[name_columns[i][0]]=result[i]
        print(dic)
        response=dic
    return response
################################################## Update Fijikura Server  ####################################################
@app.route("/server_famx2/get/<table>/<column_1>/<operation_1>/<value_1>/<column_2>/<operation_2>/<value_2>",methods=["GET"])
def famx2GET(table, column_1, operation_1, value_1, column_2, operation_2, value_2):
    #datos_conexion=model()
    #host, user,password,database,serverp2,dbp2,userp2,passwordp2=datos_conexion.datos_acceso()
    if column_1=='all':
        query='SELECT * FROM ' +table+';'
    else:
        if value_2=='_':
            query = "SELECT * FROM " + table + " WHERE " + column_1 + operation_1 + "'{}';".format(value_1)
        else:
            query = "SELECT * FROM " + table + " WHERE " + column_1 + operation_1 + "'{}'".format(value_1)
            query += " AND " + column_2 + operation_2 + "'{}';".format(value_2)
    try:
        connection = pyodbc.connect('DRIVER={SQL server}; SERVER='+serverp2+';DATABASE='+dbp2+';UID='+userp2+';PWD='+passwordp2)
        print("Conexión Éxitosa")
    except Exception as ex:
        print("Conexión a P2 Exception: ", ex)
        return {"exception": ex.args}

    try:
        with connection.cursor() as cursor:
            items = cursor.execute(query)
            #result = cursor.fetchall()

            records = cursor.fetchall()
            insertObject = []
            columnNames = [column[0]
               for column in cursor.description
            ]

            for record in records:
               insertObject.append(dict(zip(columnNames, record)))
               #print("insertObject FINAL: ",insertObject)
            if len(insertObject) == 1:
                response = insertObject[0]
            elif len(insertObject) > 1:
                response = {}
                keys = list(insertObject[0])
                for key in keys:
                    response[key] = []
                    for item in insertObject:
                        response[key].append(item.pop(key))         
            else:
                response = {"items": 0}
    except Exception as ex:
        print("myJsonResponse cursor Exception: ", ex)
        response = {"exception" : ex.args}
    finally:
        connection.close()
        return response

@app.route("/server_famx2/update/<table>/<int:ID>",methods=["POST"])
def famx2update(table, ID):
    #datos_conexion=model()
    #host, user,password,database,serverp2,dbp2,userp2,passwordp2=datos_conexion.datos_acceso()
    def escape_name(s):
        name = '`{}`'.format(s.replace('`', '``'))
        return name
    data = request.get_json(force=True)
    flag_torque = False
    flag_vision = False
    try:
        connection = pyodbc.connect('DRIVER={SQL server}; SERVER='+serverp2+';DATABASE='+dbp2+';UID='+userp2+';PWD='+passwordp2)
        print("|||| SERVICIO UPDATE Conexión Éxitosa")
    except Exception as ex:
        print("generalPOST connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        query = "UPDATE " + table + f" SET"
        valores = []
        for key in data:
            try:
                if key == "DATETIME":
                    if data[key] == "AUTO":
                        data[key] = datetime.now().isoformat()
                if type(data[key]) == dict:
                    data[key] = json.dumps(data[key])
                valores.append(data[key])
            except Exception as ex:
                print("keys inspection Exception: ", ex)
            query += f' {key}= ?,'
            #print("primer Query: ",query)
            #print("Valores Final: ",valores)
        query = query[:-1]
        #print("query: ",query)
        query += f" WHERE ID={ID}"
        #print("query con += : ",query)
        with connection.cursor() as cursor:
            #print("dentro de cursor")
            items = cursor.execute(query, valores)
        connection.commit()
        response = {"items": 1}
    except Exception as ex:
        print("update Exception: ", ex)
        response = {"exception": 0}
    finally:
        connection.close()
        return response

@app.route("/server_famx2/post/<table>",methods=["POST"])
def famx2POST(table):
    #datos_conexion=model()
    #host, user,password,database,serverp2,dbp2,userp2,passwordp2=datos_conexion.datos_acceso()
    def escape_name(s):
        name = '{}'.format(s.replace('`', '``'))
        return name
    data = request.get_json(force=True)
    #print("Data -*-*-*--*-*-*-**: ",data)
    try:
        connection = pyodbc.connect('DRIVER={SQL server}; SERVER='+serverp2+';DATABASE='+dbp2+';UID='+userp2+';PWD='+passwordp2)
        print("|||| SERVICIO POST FAMX2 Conexión Éxitosa")
    except Exception as ex:
        print("famx2POST connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        query = "INSERT INTO " + table
        keys = list(data)
        #print("keys: ",keys)
        cols = ', '.join(map(escape_name, keys))
        placeholders = ', '.join(['?' for key in keys])
        query += ' ({}) VALUES ({})'.format(cols, placeholders)
        print("|||Query para POST: ",query)
        #print("Data: ",data)
        valores = []
        for key in data:
            try:
                if key == "DATETIME":
                    if data[key] == "AUTO":
                        data[key] = datetime.now().isoformat()
                if type(data[key]) == dict:
                    data[key] = json.dumps(data[key])
                valores.append(data[key])
            except Exception as ex:
                print("keys inspection Exception: ", ex)
        with connection.cursor() as cursor:
            items = cursor.execute(query, valores)
        connection.commit()
        response = {"items": 1} #Si el POST se realiza con éxito, al final regresará como respuesta el valor 1 asociado a la key "items"
    except Exception as ex:
        print("famx2POST Insert Exception: ", ex)
        response = {"exception": ex.args}
    finally:
        connection.close()
        return response


################################################## Webpages endpoints #########################################################
@app.route('/database/<table>/<column_of_table_1>/<operation_1>/<val_1>/<column_of_table_2>/<operation_2>/<val_2>',methods=['GET'])
def value_of_a_table(table,column_of_table_1,operation_1,val_1,column_of_table_2,operation_2,val_2):

    if column_of_table_1=='all':
        query='SELECT * FROM ' +table+';'
    else:
        if val_2=='_':
            query='SELECT * FROM ' +table+' WHERE '+column_of_table_1+operation_1+'"'+val_1+'";'
        else:
            query='SELECT * FROM ' +table+' WHERE '+column_of_table_1+operation_1+'"'+val_1+'" AND '+column_of_table_2+operation_2 +'"'+val_2+'";'
    print(query)
    #conexion con base de datos
    conexion =  pymysql.connect(host = host, user = user, passwd = password, database = database)
    cursor = conexion.cursor()
    cursor.execute(query)
    result = cursor.fetchone()
    
    if result == None:
        resp='NO HAY INFORMACION'
        response=resp
    else:
        resp='SI HAY INFORMACION'
        query = 'SELECT COLUMN_NAME FROM Information_Schema.Columns WHERE TABLE_NAME = ' + '"' + table + '";'
        cursor.execute(query)
        name_columns=cursor.fetchall()
        print(type(result))
        print(len(result))
        print(result)
        print(type(name_columns))
        print(len(name_columns))
        print(name_columns)

        dic={}
        for i in range(len(result)):
            dic[name_columns[i][0]]=result[i]
        print(dic)
        response=dic
    return response

@app.route('/json2/<table>/<column_of_table>/<operation_1>/<val_1>/<operation_2>/<val_2>',methods=['GET'])
def json2Return(table,column_of_table,operation_1,val_1,operation_2,val_2):
    datos_conexion=model()
    host, user,password,database,serverp2,dbp2,userp2,passwordp2=datos_conexion.datos_acceso()

    items = 0

    if table == "availability":
        dic = {
            "columns":["datetime", "shift", "min", "percent", "pz"],
            "stop": {
                "datetime":[strftime("%d%b%Y-%H%M%S")]*21,
                "shift": [1]*21,
                "min": [21]*21,
                "cont":[21]*21,
                "percent": [21]*21,
                "pz": [21]*21
                },

            "pause": {
                "datetime":[strftime("%d%b%Y-%H%M%S")]*21,
                "shift": [2]*21,
                "min": [22]*21,
                "cont":[22]*21,
                "percent": [22]*21,
                "pz": [22]*21
                },

            "running": {
                "datetime":[strftime("%d%b%Y-%H%M%S")]*21,
                "shift": [3]*21,
                "min": [23]*21,
                "cont":[23]*21,
                "percent": [23]*21,
                "pz": [23]*21
                }      
            }
        return dic

    else:
        if column_of_table=='all':
            query='SELECT * FROM ' +table+';'
        else:
            if val_2=='_':
                query='SELECT * FROM ' +table+' WHERE '+column_of_table+operation_1+'"'+val_1+'";'
            else:
                query='SELECT * FROM ' +table+' WHERE '+column_of_table+operation_1+'"'+val_1+'" AND '+column_of_table+operation_2 +'"'+val_2+'";'
        # print(query)

        try:
            connection = pymysql.connect(host = host, user = user, passwd = password, database = database, cursorclass=pymysql.cursors.DictCursor)
        except Exception as ex:
            return {"exception": ex.args}
        try:
            with connection.cursor() as cursor:
                items = cursor.execute(query)
                result = cursor.fetchall()
                if len(result) > 0:
                    response = {}
                    keys = list(result[0])
                    for key in keys:
                        response[key] = []
                        for item in result:
                            response[key].append(item.pop(key))   
                    response["columns"] = keys
                else:
                    response = {"items": items}
            
        except Exception as ex:
            return {"exception": ex.args}
        return response

@app.route('/database/<table>/<column_of_table_1>/<operation_1>/<val_1>/<column_of_table_2>/<operation_2>/<val_2>/multi',methods=['GET'])
def value_of_a_table_2(table,column_of_table_1,operation_1,val_1,column_of_table_2,operation_2,val_2):

    if column_of_table_1=='all':
        query='SELECT * FROM ' +table+';'
    else:
        if val_2=='_':
            query='SELECT * FROM ' +table+' WHERE '+column_of_table_1+operation_1+'"'+val_1+'";'
        else:
            query='SELECT * FROM ' +table+' WHERE '+column_of_table_1+operation_1+'"'+val_1+'" AND '+column_of_table_2+operation_2 +'"'+val_2+'";'
    print(query)
    #conexion con base de datos
    conexion =  pymysql.connect(host = host, user = user, passwd = password, database = database)
    cursor = conexion.cursor()
    cursor.execute(query)
    result = cursor.fetchall()
    print(result)
    if result == ():
        resp='NO HAY INFORMACION'
        response=resp
    else:
        resp='SI HAY INFORMACION'
        query = 'SELECT COLUMN_NAME FROM Information_Schema.Columns WHERE TABLE_NAME = ' + '"' + table + '";'
        cursor.execute(query)
        #name_columns=cursor.fetchall()
        name_columns=cursor.fetchmany(len(result[0]))
        #print(type(result))
        #print(len(result))
        #print(result)
        #print(type(name_columns))
        #print(len(name_columns))
        #print(name_columns)
        #print(len(result[0]))
        dic={}
        #a=[]
        #for j in range(len(result)):
            #a.append(result[j][0])
        #print(a)
        
        for i in range(len(name_columns)):
            dic[name_columns[i][0]]=[]
            for j in range(len(result)):
                dic[name_columns[i][0]].append(result[j][i])
        print(dic['ID'])
        response=dic
    return response

@app.route('/info/<arnes>/<type_pts>/<caja>',methods=['GET'])
def info_cajas(arnes,type_pts,caja):
    datos_conexion=model()
    host, user,password,database,serverp2,dbp2,userp2,passwordp2=datos_conexion.datos_acceso()
    path = "data/points/"
    file_name= path + caja+"_puntos_"+type_pts
    print(file_name)
    if arnes=="interior":
        print("interior")
        #file_name='test'
        #if var_pdcr==1:
        #    file_name='puntos_vision_caja_'+str(caja)+'_1'
        #print(file_name)
        with open(file_name, "rb") as f:
            pts= load(f)
            print(pts)
            print(len(pts))
        dic={"puntos":pts}
    if arnes=="motor":
        print("motor")
        #file_name='test'
        #if var_pdcr==1:
        #    file_name='puntos_vision_caja_'+str(caja)+'_1'
        #print(file_name)
        with open(file_name, "rb") as f:
            pts= load(f)
            print(pts)
            print(len(pts))
        dic={"puntos":pts}
    return dic

@app.route('/contar/<table>/<column>', methods=['GET'])
def data_count(table, column):
    turnos = request.get_json(force=True)
    turnos = {
            "1":["07-00","18-59"],
            "2":["19-00","06-59"],
            }

    print("turnos:",turnos)
    ####### REVISAR EN QUÉ TURNO ESTÁ LA HORA ACTUAL
    for elemento in turnos:

        hora_iniciostr = turnos[elemento][0]
        hora_finstr = turnos[elemento][1]

        inicio_split = hora_iniciostr.split("-")
        hora_inicio = int(inicio_split[0])
        minuto_inicio = int(inicio_split[1])
            
        fin_split = hora_finstr.split("-")
        hora_fin = int(fin_split[0])
        minuto_fin = int(fin_split[1])

            
        #Se obtiene la Hora actual (int)
        horaActual = datetime.now().hour
        #Minutos Actuales
        minActual = datetime.now().minute
            

        #se detecta el tipo de jornada ....
        caso1 = False #inicio menor que fin (jornada normal)
        caso2 = False #fin menor que inicio (jornada con cambio de día)
            
        if hora_inicio < hora_fin:
            #print("hora inicio menor que hora fin")
            caso1 = True
        else:
            if hora_inicio == hora_fin:
                #print("hora inicio = a hora fin")
                if minuto_inicio < minuto_fin:
                    #print("minuto inicio menor que minuto fin")
                    caso1 = True
                else:
                    #print("minuto inicio mayor que minuto fin")
                    caso2 = True
            else:
                #print("hora inciio menor que hora fin")
                caso2 = True


        #Fecha Actual
        fechaActual = datetime.today()
        ##Segundos Actuales
        ##secActual = datetime.now().second
        #delta time de un día
        td = timedelta(days = 1)
        ayerfechaActual = fechaActual - td
        mañanafechaActual = fechaActual + td

        hoy_year =  datetime.now().year
        hoy_month = datetime.now().month
        hoy_day =   datetime.now().day

        ayer_year =  ayerfechaActual.year
        ayer_month = ayerfechaActual.month
        ayer_day =   ayerfechaActual.day

        mañana_year =  mañanafechaActual.year
        mañana_month = mañanafechaActual.month
        mañana_day =   mañanafechaActual.day

        inicio_query = ""
        fin_query = ""

        #AQUÍ YA SE SABE EL TIPO DE HORARIO QUE SE ESTÁ REVISANDO, 
        #HAY QUE VER SI LA HORA ACTUAL ESTÁ DENTRO DE ESTE HORARIO

        if caso1 == True:

            init_date = datetime(hoy_year, hoy_month, hoy_day, hora_inicio, minuto_inicio )
            end_date  = datetime(hoy_year, hoy_month, hoy_day, hora_fin,    minuto_fin )

            if init_date <= fechaActual <= end_date:
                inicio_query = str(init_date.strftime('%Y-%m-%d-%H-%M'))
                fin_query =     str(end_date.strftime('%Y-%m-%d-%H-%M'))
                break

        if caso2 == True:

            init_date1 = datetime(    hoy_year,     hoy_month,     hoy_day,  hora_inicio,  minuto_inicio )
            end_date1 =  datetime( mañana_year,  mañana_month,  mañana_day,  hora_fin,     minuto_fin )
                
            init_date2 = datetime(ayer_year, ayer_month, ayer_day, hora_inicio, minuto_inicio )
            end_date2 =  datetime( hoy_year,  hoy_month,  hoy_day,    hora_fin,    minuto_fin )

            if init_date1 <= fechaActual <= end_date1:
                inicio_query = str(init_date1.strftime('%Y-%m-%d-%H-%M'))
                fin_query =     str(end_date1.strftime('%Y-%m-%d-%H-%M'))
                break

            if init_date2 <= fechaActual <= end_date2:
                inicio_query = str(init_date2.strftime('%Y-%m-%d-%H-%M'))
                fin_query =     str(end_date2.strftime('%Y-%m-%d-%H-%M'))
                break

    ####### CONTAR LOS ARNESES QUE HAY o HA HABIDO ENTRE TAL FECHA Y TAL FECHA DEPENDIENDO DEL CASO

    print("--------------------inicio_query: ",inicio_query)
    print("--------------------   fin_query: ",fin_query)

    query= "SELECT * FROM " +table+" WHERE "+ column + ">=" + "'" + inicio_query + "' AND " + column + "<=" + "'" + fin_query + "';"
    print("query: ",query)

    try:
        connection = pymysql.connect(host = host, user = user, passwd = password, database = database, cursorclass=pymysql.cursors.DictCursor)
    
    except Exception as ex:
        print("data_count connection Exception: ", ex)
        response = {"conteo" : 0}
        return response


    try:
        cursor = connection.cursor()
        cursor.execute(query)
        result = cursor.fetchall() 
        
        pedidos = []

        for i in result: ##Buscando diferentes Valores en el rango de fecha
            indice = result.index(i)
            if result[indice]["RESULTADO"] > 0: ##Revisando si existen resets
                pedidos.append(result[indice]["RESULTADO"])
                #print(pedidos)
        mylist = list(dict.fromkeys(pedidos)) ## Eliminando valores duplicados
        #print(len(pedidos), 'The Big ONE')
        ###CONTAR LOS ITEMS LEÍDOS

        #if inicio_query == "":
        #    conteo = 0
        #else:
        #    if len(result):
        #        if isinstance(result, str):
        #            conteo = 1
        #        if isinstance(result, list):
        #            conteo = len(result)
        #            #print(result)
        #    else:
        #        conteo = 0

        response = {"conteo" : len(pedidos)}

    except Exception as ex:
        print("data_count cursor Exception: ", ex)
        response = {"conteo" :0}
        return response

    finally:
        connection.close()
        return response

########################################################################################################################################
