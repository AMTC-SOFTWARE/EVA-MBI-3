let DBEVENT = sessionStorage.getItem("DBEVENT");
console.log("DBEVENT ACTUAL: ",DBEVENT);
let modif_name_1 = DBEVENT.replace(/_/g, '-') // Se reemplazan los "_" encontrados en el nombre del Evento por "-" 
let modif_name_2 = modif_name_1.replace("evento-", '') // Se elimina el string inicial "evento-" del nombre
let eventoFinal = modif_name_2.toUpperCase();
document.getElementById('tituloEvento').innerText = eventoFinal;
var formparte = document.getElementById('formparte');
var pedido;
var pedido_final;
var activo = 1;

var mv = [];
var mt = [];
var ref = "";
var historial = "";

function formpartemostrar() {
    // formusuario.style.display = 'none';
    if (formparte.style.display === 'block') {
        formparte.style.display = 'none';
    } else {
        formparte.style.display = 'block';
    }


    mostrar_modulos_vision()
    mostrar_modulos_torque()
}

function mostrar_modulos_vision() {
    document.getElementById("modulos_vision").innerHTML = "<option value='" + "'>Seleccione un modulo de vision..." + "</option>";
    //modulos de vision
    var miSelectT = document.getElementById("modulos_vision")[0];
    fetch(dominio + "/api/get/"+DBEVENT+"/modulos_fusibles/all/-/-/-/-/-")
        .then(data => data.json())
        .then(data => {
            // console.log(data.MODULO);
            var array = data.MODULO
            for (var i = 0; i < array.length; i++) {
                var aTag = document.createElement('option');
                aTag.text = array[i]
                document.getElementById("modulos_vision").innerHTML += "<option value='" + array[i] + "'>" + array[i] + "</option>";
            }
        })
        //modulos de vision
}

function mostrar_modulos_torque() {
    document.getElementById("modulos_torque").innerHTML = "<option value='" + "'>Seleccione un modulo de torque..." + "</option>";
    //modulos de torque
    var miSelectT = document.getElementById("modulos_torque")[0];
    fetch(dominio + "/api/get/"+DBEVENT+"/modulos_torques/all/-/-/-/-/-")
        .then(data => data.json())
        .then(data => {
            // console.log(data.MODULO);
            var array = data.MODULO
            for (var i = 0; i < array.length; i++) {
                var aTag = document.createElement('option');
                aTag.text = array[i]
                document.getElementById("modulos_torque").innerHTML += "<option value='" + array[i] + "'>" + array[i] + "</option>";
            }
        })
        //modulos de torque
}

function agregarmodulov() {
    if (document.getElementById("modulos_vision").value === "") {
        // console.log("Seleccione un modulo")
    } else {
        var i = mv.indexOf(document.getElementById("modulos_vision").value);
        if (i === -1) {
            // console.log(document.getElementById("modulos_vision").value)
            mv.push(document.getElementById("modulos_vision").value)
                // console.log(mv)
            document.getElementById('arreglomv').innerHTML = "Módulos de visión agregados:   " + mv;
        }
    }
}

function agregarmodulot() {
    if (document.getElementById("modulos_torque").value === "") {
        // console.log("Seleccione un modulo")
    } else {
        var i = mt.indexOf(document.getElementById("modulos_torque").value);
        if (i === -1) {
            // console.log(document.getElementById("modulos_torque").value)
            mt.push(document.getElementById("modulos_torque").value)
            document.getElementById('arreglomt').innerHTML = "Módulos de torque agregados:   " + mt;
        }
    }
}

function quitarmodulov() {
    var i = mv.indexOf(document.getElementById("modulos_vision").value);
    if (i !== -1) {
        mv.splice(i, 1);
    }
    // console.log(mv)
    document.getElementById('arreglomv').innerHTML = "Módulos de visión agregados:   " + mv;
}

function quitarmodulot() {
    var i = mt.indexOf(document.getElementById("modulos_torque").value);
    if (i !== -1) {
        mt.splice(i, 1);
    }
    // console.log(mt)
    document.getElementById('arreglomt').innerHTML = "Módulos de torque agregados:   " + mt;
}

function agregarparte() {
    var orden = document.getElementById("pedido").value;
    var mod_torques = mt;
    var mod_fusibles = mv;
    var mod_alturas = mv;
    if (orden.length === 0 || mod_torques.length === 0 || mod_fusibles.length === 0 || mod_alturas.length === 0) {
        alert("Necesita llenar todos los campos correspondientes.");
    } else {
        if (ref == "no valido") {
            $('#mostrar').click();
            document.getElementById("header").innerHTML = document.getElementById("pedido").value;
            document.getElementById("informacion").innerHTML = 'Para insertar un número de pedido correctamente asegúrese de agregar la referencia "ILX", "IRX" o "Z" al inicio.';
        } else {
            if (historial == "") {
                agregar_parte_db();
            } else {
                $('#mostrar').click();
                document.getElementById("header").innerHTML = pedido_final;
                document.getElementById("informacion").innerHTML = 'El pedido ya existe.';
            }
        }
    }
}

function agregar_parte_db() {
    var orden = pedido_final;
    var mod_torques = mt;
    var mod_fusibles = mv;
    var mod_alturas = mv;

    var mod_t = mod_torques;
    var mod_f = mod_fusibles;
    var mod_a = mod_alturas;

    // console.log(mod_t,mod_f,mod_a)
    let codigosqr = document.getElementsByClassName("qr");
    let checkbox = document.getElementsByClassName("myCheck");
    qr_dict = {}
    for (var i = 0; i < codigosqr.length; i++) {
        qr_dict[codigosqr[i].id] = [codigosqr[i].value, checkbox[i].checked];

    }
    // console.log (qr_dict);
    const newPost = {
        "DBEVENT": DBEVENT,
        "PEDIDO": orden,
        "MODULOS_VISION": { "INTERIOR": mod_f },
        "MODULOS_TORQUE": { "INTERIOR": mod_t },
        "MODULOS_ALTURA": { "INTERIOR": mod_a },
        "QR_BOXES": qr_dict,
        "ACTIVE": activo,
        "DATETIME": "AUTO"
    }
    fetch(dominio + '/api/post/pedidos', {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json())
        .then(function(data) {
            // console.log(data);
            if (data["items"] === 1) {
                // console.log("INSERTION OK")
                alertaaddparte.innerHTML = '<div class="alert alert-success" role="alert">PEDIDO INSERTADO CORRECTAMENTE.</div>';
                location.replace("index.html")
            } else {
                // console.log("INSERTION NOK")
                alertaaddparte.innerHTML = '<div class="alert alert-warning" role="alert">PEDIDO NO AGREGADO.</div>';
            }

        })
}

function get_valid_pedido(e) {
    e = e || window.event;
    if (e.keyCode == 13) {
        //console.log("get_pedido")
        historial = "";
        ref = "";
        pedido = document.getElementById("pedido").value;
        // console.log(pedido)	
        if (pedido != "") {
            var split_pedido = pedido.split(" ");
            // console.log("Aqui está el split: ",split_pedido);
            for (var i = 0; i < split_pedido.length; i++) {
                // console.log(split_pedido[i]);
                var ILX = split_pedido[i].indexOf("ILX")
                var IRX = split_pedido[i].indexOf("IRX")
                var Z = split_pedido[i].indexOf("Z")
                    // console.log("INDEX OF STRING",ILX);

                if (ILX == -1) {
                    document.getElementById("pedido").value = ""
                        //document.getElementById("pedido").placeholder="Némero de referencia"
                        // console.log("no está el ILX");
                    historial = "";
                    ref = "no valido";
                    alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia ILX no válida</div>'
                        // console.log(historial)
                } else {
                    // console.log("SI ESCRIBIÓ ILX");
                    pedido_final = split_pedido[i];
                    endpoint = dominio + '/database/'+DBEVENT+'/pedidos/pedido/=/' + split_pedido[i] + '/_/_/_'
                        // console.log(endpoint)
                    fetch(endpoint, {
                            method: 'GET',
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then(res => res.json())
                        .then(function(data) {
                            // console.log(data);
                            historial = "si existe";
                            ref = "";
                            alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "' + split_pedido[i] + '" ya existe</div>'
                                // console.log(historial)
                        })
                        .catch(function(err) {});
                    ref = "";
                    alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "' + split_pedido[i] + '" no existe</div>'
                    pedido.value = split_pedido[i]
                    document.getElementById("pedido").value = split_pedido[i]
                    break;
                }
                // PARA IRX
                if (IRX == -1) {
                    document.getElementById("pedido").value = ""
                        //document.getElementById("pedido").placeholder="Némero de referencia"
                        // console.log("no está el IRX");
                    historial = "";
                    ref = "no valido";
                    alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia IRX no válida</div>'
                        // console.log(historial)
                } else {
                    // console.log("SI ESCRIBIÓ IRX");
                    pedido_final = split_pedido[i];
                    endpoint = dominio + '/database/'+DBEVENT+'/pedidos/pedido/=/' + split_pedido[i] + '/_/_/_'
                        // console.log(endpoint)
                    fetch(endpoint, {
                            method: 'GET',
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then(res => res.json())
                        .then(function(data) {
                            // console.log(data);
                            historial = "si existe";
                            ref = "";
                            alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "' + split_pedido[i] + '" ya existe</div>'
                                // console.log(historial)
                        })
                        .catch(function(err) {});
                    ref = "";
                    alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "' + split_pedido[i] + '" no existe</div>'
                    pedido.value = split_pedido[i]
                    document.getElementById("pedido").value = split_pedido[i]
                    break;
                }
                // PARA Z
                if (Z == -1) {
                    document.getElementById("pedido").value = ""
                        //document.getElementById("pedido").placeholder="Némero de referencia"
                        // console.log("no está el Z");
                    historial = "";
                    ref = "no valido";
                    alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia Z no válida</div>'
                        // console.log(historial)
                } else {
                    // console.log("SI ESCRIBIÓ Z");
                    pedido_final = split_pedido[i];
                    endpoint = dominio + '/database/'+DBEVENT+'/pedidos/pedido/=/' + split_pedido[i] + '/_/_/_'
                        // console.log(endpoint)
                    fetch(endpoint, {
                            method: 'GET',
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then(res => res.json())
                        .then(function(data) {
                            // console.log(data);
                            historial = "si existe";
                            ref = "";
                            alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "' + split_pedido[i] + '" ya existe</div>'
                                // console.log(historial)
                        })
                        .catch(function(err) {});
                    ref = "";
                    alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "' + split_pedido[i] + '" no existe</div>'
                    pedido.value = split_pedido[i]
                    document.getElementById("pedido").value = split_pedido[i]
                    break;
                }
            }
        }
    }
}

function get_valid_pedido_1() {
    //console.log("get_pedido")
    historial = "";
    ref = "";
    pedido = document.getElementById("pedido").value;
    // console.log(pedido)	
    if (pedido != "") {
        var split_pedido = pedido.split(" ");
        // console.log("Aqui está el split: ",split_pedido);
        for (var i = 0; i < split_pedido.length; i++) {
            // console.log(split_pedido[i]);
            var ILX = split_pedido[i].indexOf("ILX")
            var IRX = split_pedido[i].indexOf("IRX")
            var Z = split_pedido[i].indexOf("Z")
                // console.log("INDEX OF STRING",ILX);

            if (ILX == -1) {
                // console.log("no está el ILX");
                historial = "";
                ref = "no valido";
                alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia "ILX", "IRX" o "Z" no válida</div>'
                    // console.log(historial)
            } else {
                // console.log("SI ESCRIBIÓ ILX");
                pedido_final = split_pedido[i];
                endpoint = dominio + '/database/'+DBEVENT+'/pedidos/pedido/=/' + split_pedido[i] + '/_/_/_'
                    // console.log(endpoint)
                fetch(endpoint, {
                        method: 'GET',
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then(res => res.json())
                    .then(function(data) {
                        // console.log(data);
                        historial = "si existe";
                        ref = "";
                        alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "' + split_pedido[i] + '" ya existe</div>'
                            // console.log(historial)
                    })
                    .catch(function(err) {});
                ref = "";
                alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "' + split_pedido[i] + '" no existe</div>'
                break;
            }
            // PARA IRX
            if (IRX == -1) {
                // console.log("no está el IRX");
                historial = "";
                ref = "no valido";
                alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia "ILX", "IRX" o "Z" no válida</div>'
                    // console.log(historial)
            } else {
                // console.log("SI ESCRIBIÓ IRX");
                pedido_final = split_pedido[i];
                endpoint = dominio + '/database/'+DBEVENT+'/pedidos/pedido/=/' + split_pedido[i] + '/_/_/_'
                    // console.log(endpoint)
                fetch(endpoint, {
                        method: 'GET',
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then(res => res.json())
                    .then(function(data) {
                        // console.log(data);
                        historial = "si existe";
                        ref = "";
                        alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "' + split_pedido[i] + '" ya existe</div>'
                            // console.log(historial)
                    })
                    .catch(function(err) {});
                ref = "";
                alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "' + split_pedido[i] + '" no existe</div>'
                break;
            }
            // PARA Z
            if (Z == -1) {
                // console.log("no está el Z");
                historial = "";
                ref = "no valido";
                alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia "ILX", "IRX" o "Z" no válida</div>'
                    // console.log(historial)
            } else {
                // console.log("SI ESCRIBIÓ Z");
                pedido_final = split_pedido[i];
                endpoint = dominio + '/database/'+DBEVENT+'/pedidos/pedido/=/' + split_pedido[i] + '/_/_/_'
                    // console.log(endpoint)
                fetch(endpoint, {
                        method: 'GET',
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then(res => res.json())
                    .then(function(data) {
                        // console.log(data);
                        historial = "si existe";
                        ref = "";
                        alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "' + split_pedido[i] + '" ya existe</div>'
                            // console.log(historial)
                    })
                    .catch(function(err) {});
                ref = "";
                alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "' + split_pedido[i] + '" no existe</div>'
                break;
            }
        }
    }
}

////////// Habilitar o Deshabilitar Campos de texto en función del Checkbox ///////////
function comprobarpdcr(obj) {
    if (obj.checked) {
        document.getElementById('PDC-R').value = "12239061602";
        document.getElementById('PDC-RMID').value = "";
        document.getElementById('PDC-RS').value = "";
        document.getElementById('myCheckPDC-RMID').checked = false;
        document.getElementById('myCheckPDC-RS').checked = false;
    } else {
        document.getElementById('PDC-R').value = "";
    }
}

function comprobarpdcrmid(obj) {
    if (obj.checked) {
        document.getElementById('PDC-RMID').value = "12239061502";
        document.getElementById('PDC-R').value = "";
        document.getElementById('PDC-RS').value = "";
        document.getElementById('myCheckPDC-R').checked = false;
        document.getElementById('myCheckPDC-RS').checked = false;
    } else {
        document.getElementById('PDC-RMID').value = "";
    }
}

function comprobarpdcrs(obj) {
    if (obj.checked) {
        document.getElementById('PDC-RMID').value = "";
        document.getElementById('PDC-R').value = "";
        document.getElementById('PDC-RS').value = "12239061402";
        document.getElementById('myCheckPDC-R').checked = false;
        document.getElementById('myCheckPDC-RMID').checked = false;
    } else {
        document.getElementById('PDC-RS').value = "";
    }
}

function comprobarpdcd(obj) {
    if (obj.checked) {
        document.getElementById('PDC-D').value = "12239060402";
    } else {
        document.getElementById('PDC-D').value = "";
    }
}

function comprobarpdcp(obj) {
    if (obj.checked) {
        document.getElementById('PDC-P').value = "12239060702";
    } else {
        document.getElementById('PDC-P').value = "";
    }
}

function comprobarmfbp1(obj) {
    if (obj.checked) {
        document.getElementById('MFB-P1').value = "12975402001";
    } else {
        document.getElementById('MFB-P1').value = "";
    }
}

function comprobarmfbs(obj) {
    if (obj.checked) {
        document.getElementById('MFB-S').value = "12235403215";
    } else {
        document.getElementById('MFB-S').value = "";
    }
}

function comprobarmfbp2(obj) {
    if (obj.checked) {
        document.getElementById('MFB-P2').value = "12975407316";
    } else {
        document.getElementById('MFB-P2').value = "";
    }
}

function comprobarmfbe(obj) {
    if (obj.checked) {
        document.getElementById('MFB-E').value = "12975403015";
    } else {
        document.getElementById('MFB-E').value = "";
    }
}

function comprobaractivo(obj) {
    if (obj.checked) {
        activo = 1;
    } else {
        activo = 0;
    }

}