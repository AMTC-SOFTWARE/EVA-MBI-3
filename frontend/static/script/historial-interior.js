////////////// VARIABLES GLOBALES /////////////////////
var formusuario = document.getElementById('formusuario');
var formparte = document.getElementById('formparte');
var alertaadd = document.getElementById('alertaadd');
var alertaaddparte = document.getElementById('alertaaddparte');
var alerta = document.getElementById('alerta');
var flagusuario = true;
var flagpass = true;
var descarga;
var cerrarsesion = document.getElementById('cerrarsesion');
var mv=[];
var mt=[];
var vf=[];
// for vision of pdcr
var array_pdcr_sections =["A1","A2","A3","S1","S2","S3","S4","S5","S6","S7","S8","S9","S10","S11"];
var array_pdcr_sections_size =[6,6,6,6,6,6,3,6,10,10,3,6,6,3];
var array_pdcr_final=[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0]]
var pdcr_vision=[]

// for vision of pdcs
var array_pdcs_sections =["A1"];
var array_pdcs_sections_size =[6];
var array_pdcs_final=[[0,0,0,0,0,0]]
var pdcs_vision=[]

//for vision of tb_lu
var array_bt_lu_sections =["A1"];
var array_bt_lu_sections_size =[9];
var array_bt_lu_final=[[0,0,0,0,0,0,0,0,0]]
var bt_lu_vision=[]

//for vision of pdcd
var array_pdcd_sections =["A1","A2","S1","S2"];
var array_pdcd_sections_size =[9,8,10,6];
var array_pdcd_final=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0]]
var pdcd_vision=[]

//for vision of pdcp
var array_pdcp_sections =["A1","A2","A3","S1","S2","E2"];
var array_pdcp_sections_size =[6,8,10,6,6,2];
var array_pdcp_final=[[0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0]]
var pdcp_vision=[]

//for torque of mfb
var mfb_size=6
var array_mfb_final=[0,0,0,0,0,0]
var mfb_torque=[]
var mfb_master=[0,8,8,8,8,0]
//for torque of mfbp1
var mfbp1_size=11
var array_mfbp1_final=[0,0,0,0,0,0,0,0,0,0,0]
var mfbp1_torque=[]
var mfbp1_master=[8,8,8,8,0,8,8,8,8,0,0]
//for torque of bt
var bt_size=1
var array_bt_final=[0]
var bt_torque=[]
var bt_master=[8]
//

var temp_array=[]

//--------------------------
var pedido_id=0
var historial={}
var index_historial=0

// variables del pedido
var no_ciclo=0
var pedido=""
var resultado=0
var vision={}
var torque={}
var altura={}
var inicio_ciclo=""
var fin_ciclo=""
var usuario=0
var comentario=""
var name_usuario=""

var caja_pdcr=""
// vision
var pdcr_v=[];
var pdcs_v=[];
var tblu_v=[];
var pdcd_v=[];
var pdcp_v=[];

//altura
var pdcr_a=[]
var pdcs_a=[]
var tblu_a=[]
var pdcd_a=[]
var pdcp_a=[]

//torque
var pdcp_t=[]
var pdcd_t=[]
var mfbp1_t=[]
var mfb_t=[]
var mfbp2_t=[]
var pdcr_t=[]
var bt_t=[]

var pdcp_t_val=[]
var pdcd_t_val=[]
var mfbp1_t_val=[]
var mfb_t_val=[]
var mfbp2_t_val=[]
var pdcr_t_val=[]
var bt_t_val=[]

var name_img_general=""
var temporal_text=""

var pdcr_v_db={}
var pdcs_v_db={}
var tblu_v_db={}
var pdcd_v_db={}
var pdcp_v_db={}
var pdcp_t_db={}
var pdcd_t_db={}
var mfbp1_t_db={}
var mfb_t_db={}
var mfbp2_t_db={}
var pdcr_t_db={}
var bt_t_db={}
//---------------------------
// console.log("Array de visión: ",pdcr_v);
// console.log("Array de visión: ",pdcs_v);
// console.log("Array de visión: ",tblu_v);
// console.log("Array de visión: ",pdcd_v);
// console.log("Array de visión: ",pdcp_v);
// console.log("Array de texto de torque: ",pdcp_t);
// console.log("Array de texto de torque: ",pdcd_t);
// console.log("Array de texto de torque: ",mfbp1_t);
// console.log("Array de texto de torque: ",mfb_t);
// console.log("Array de texto de torque: ",mfbp2_t);
// console.log("Array de texto de torque: ",pdcr_t);
// console.log("Array de texto de torque: ",bt_t);
// console.log("Array de valor Torque: ",pdcp_t_val);
// console.log("Array de valor Torque: ",pdcd_t_val);
// console.log("Array de valor Torque: ",mfbp1_t_val);
// console.log("Array de valor Torque: ",mfb_t_val);
// console.log("Array de valor Torque: ",mfbp2_t_val);
// console.log("Array de valor Torque: ",pdcr_t_val);
// console.log("Array de valor Torque: ",bt_t_val);

$('#pedido').on('keypress', function(e) {
	var keyCode = e.keyCode || e.which;
	if (keyCode === 13) { 
		e.preventDefault();
		pedido = document.getElementById("pedido").value;
		// console.log(pedido)	
		if(pedido!=""){
			var split_pedido = pedido.split(" ");
			// console.log("Aqui está el split: ",split_pedido);
			for (var i = 0; i < split_pedido.length; i++) {
				// console.log(split_pedido[i]);
				var HM = split_pedido[i].indexOf("HM")
				// console.log("INDEX OF STRING",HM);

				if (HM == -1) {
					// console.log("no está el HM");
					historial={};
					alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia HM no válida</div>';
					document.getElementById("descarga").innerHTML = "";
					document.getElementById("historial_option_date").style="display: none;";
					document.getElementById("pedido_seleccionado").style.display="none";
					mostrar_text_inicial();
					ocultar_imagenes();
					// console.log(historial)
				} else{
					// console.log("SI ESCRIBIÓ HM");
					endpoint=dominio+'/api/get/historial/HM/=/'+split_pedido[i]+'/RESULTADO/=/2'
					// console.log(endpoint)
					fetch(endpoint,{
						method: 'GET',
						headers:{
							"Content-type": "application/json"
						}
					}).then(res=>res.json())
					.then(function (data){
						// console.log("data: ", data);
						// console.log("data.items: ", data.items);
						historial=data
						if (historial.items == 0) {
							alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "'+split_pedido[i]+'" no tiene historial</div>';
							document.getElementById("descarga").innerHTML = "";
							document.getElementById("historial_option_date").style="display: none;";
							document.getElementById("pedido_seleccionado").style.display="none";
							mostrar_text_inicial();
							ocultar_imagenes();
						}else{
							alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+split_pedido[i]+'" si tiene historial</div>';
							document.getElementById("historial_option_date").style="display: block;";
							load_historial();
							descarga = split_pedido[i];
							descargar();
						}
					})
					.catch(function(err) {
					});	
					document.getElementById("pedido").value = split_pedido[i];
					break;
				}
			}
		}
	}
});

function get_valid_pedido_1(){
	pedido = document.getElementById("pedido").value;
	// console.log(pedido)	
	if(pedido!=""){
		var split_pedido = pedido.split(" ");
		// console.log("Aqui está el split: ",split_pedido);
		for (var i = 0; i < split_pedido.length; i++) {
			// console.log(split_pedido[i]);
			var HM = split_pedido[i].indexOf("HM")
			// console.log("INDEX OF STRING",HM);

			if (HM == -1) {
				// console.log("no está el HM");
				historial={};
				alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia HM no válida</div>';
				document.getElementById("descarga").innerHTML = "";
				document.getElementById("historial_option_date").style="display: none;";
				document.getElementById("pedido_seleccionado").style.display="none";
				mostrar_text_inicial();
				ocultar_imagenes();
				// console.log(historial)
			} else{
				// console.log("SI ESCRIBIÓ HM");
				endpoint=dominio+'/api/get/historial/HM/=/'+split_pedido[i]+'/RESULTADO/=/2'
				// console.log(endpoint)
				fetch(endpoint,{
					method: 'GET',
					headers:{
						"Content-type": "application/json"
					}
				}).then(res=>res.json())
				.then(function (data){
					// console.log("data: ", data);
					// console.log("data.items: ", data.items);
					historial=data
					if (historial.items == 0) {
						alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "'+split_pedido[i]+'" no tiene historial</div>';
						document.getElementById("descarga").innerHTML = "";
						document.getElementById("historial_option_date").style="display: none;";
						document.getElementById("pedido_seleccionado").style.display="none";
						mostrar_text_inicial();
						ocultar_imagenes();
					}else{
						alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+split_pedido[i]+'" si tiene historial</div>';
						document.getElementById("historial_option_date").style="display: block;";
						load_historial();
						descarga = split_pedido[i];
						descargar();
					}
				})
				.catch(function(err) {
				});	
				break;
			}
		}
	}
}

function descargar(){
	// console.log("DENTRO DE DESCARGAR")
	document.getElementById("descarga").innerHTML = "";
	endpoint=dominio+'/api/get/historial/HM/=/'+descarga+'/resultado/=/2';
	// console.log(endpoint)
	fetch(endpoint,{
		method: 'GET',
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		// console.log(data);
		// console.log("el inicio data: ",data.INICIO);
		console.log("Más de un registro a descargar?",Array.isArray(data.INICIO));
		if (Array.isArray(data.INICIO) == true) {
			var colnames = Object.keys(data);
			// console.log("Colnames: ",colnames);
			var filas = data[colnames[0]].length;
			// console.log("Resultado: ",filas);
		    //CREACIÓN DE TABLA
		    var myTableDiv = document.getElementById("descarga");
		    var table = document.createElement('TABLE');
		    var tableBody = document.createElement('TBODY');
		    var Encabezados = document.createElement('THEAD');

		    table.id = "myTable";
		    table.style.display="none";
		    table.classList.add('display');
		    table.border = '2';
		    table.appendChild(Encabezados);
		    table.appendChild(tableBody);
		    tableBody.align="center";
		    //FIN DE CREACIÓN DE TABLA

		    //ENCABEZADOS DE LA TABLA
		    var tr = document.createElement('TR');
		    Encabezados.appendChild(tr);
		    for (i = 0; i < colnames.length; i++) {
		    	var th = document.createElement('TH')
		    	th.width = '100';
		    	th.appendChild(document.createTextNode(colnames[i]));
		    	tr.appendChild(th).style.backgroundColor="#0DBED6";
		    }
		    //FILAS DE LA TABLA
		    for (i = 0; i < filas; i++) {
		    	var tr = document.createElement('TR');
		    	for (j = 0; j < colnames.length; j++) {
		    		var td = document.createElement('TD')
		    		td.appendChild(document.createTextNode(data[colnames[j]][i]));
		    		tr.appendChild(td)
		    	}
		    	tableBody.appendChild(tr);
		    }
		    myTableDiv.appendChild(table);
		    $(document).ready(function() {
		    	$('#myTable').DataTable({
		    		dom: 'B',
		    		buttons: [
		    		{
		    			extend: 'excelHtml5',
		    			text: '<i class="fas fa-file-excel"></i>',
		    			titleAttr: 'Exportar a Excel',
		    			className: 'btn btn-success',
		    		}/*,
		    		{
		    			extend: 'pdfHtml5',
		    			text: 'PDF',
		    			titleAttr: 'Exportar a PDF',
		    			className: 'btn btn-danger',
		    		},
		    		{
		    			extend: 'print',
		    			text: 'Imprimir',
		    			titleAttr: 'Imprimir',
		    			className: 'btn btn-info',
		    		}*/
		    		]
		    	});
		    } );
		} else{
			console.log("SOLO UN REGISTRO PARA DESCARGAR");
			var colnames = Object.keys(data);
			// console.log("Colnames: ",colnames);
			var filas = data[colnames[0]];
			// console.log("Resultado: ",filas);
		    //CREACIÓN DE TABLA
		    var myTableDiv = document.getElementById("descarga");
		    var table = document.createElement('TABLE');
		    var tableBody = document.createElement('TBODY');
		    var Encabezados = document.createElement('THEAD');

		    table.id = "myTable";
		    table.style.display="none";
		    table.classList.add('display');
		    table.border = '2';
		    table.appendChild(Encabezados);
		    table.appendChild(tableBody);
		    tableBody.align="center";
		    //FIN DE CREACIÓN DE TABLA

		    //ENCABEZADOS DE LA TABLA
		    var tr = document.createElement('TR');
		    Encabezados.appendChild(tr);
		    for (i = 0; i < colnames.length; i++) {
		    	var th = document.createElement('TH')
		    	th.width = '100';
		    	th.appendChild(document.createTextNode(colnames[i]));
		    	tr.appendChild(th).style.backgroundColor="#0DBED6";
		    }
		    //FILAS DE LA TABLA
		    for (i = 0; i < 1; i++) {
		    	var tr = document.createElement('TR');
		    	for (j = 0; j < colnames.length; j++) {
		    		var td = document.createElement('TD')
		    		td.appendChild(document.createTextNode(data[colnames[j]]));
		    		tr.appendChild(td)
		    	}
		    	tableBody.appendChild(tr);
		    }
		    myTableDiv.appendChild(table);
		    $(document).ready(function() {
		    	$('#myTable').DataTable({
		    		dom: 'B',
		    		buttons: [
		    		{
		    			extend: 'excelHtml5',
		    			text: 'Excel',
		    			titleAttr: 'Exportar a Excel',
		    			className: 'btn btn-success',
		    		}/*,
		    		{
		    			extend: 'pdfHtml5',
		    			text: 'PDF',
		    			titleAttr: 'Exportar a PDF',
		    			className: 'btn btn-danger',
		    		},
		    		{
		    			extend: 'print',
		    			text: 'Imprimir',
		    			titleAttr: 'Imprimir',
		    			className: 'btn btn-info',
		    		}*/
		    		]
		    	});
		    });
		}
	})
	.catch(function(err) {
	});
}

function load_historial(){
	document.getElementById("historial_option_date").innerHTML = "";
	// console.log("en load_historial")
	// console.log("historial.items: ",historial.items)
	// console.log(historial)
	// console.log(historial.INICIO);
	// console.log("Es un array?",Array.isArray(historial.INICIO));
	if (Array.isArray(historial.INICIO) == true) {
		for (var i = 0; i < historial.INICIO.length; i++) {
			var aTag = document.createElement('option');
			aTag.text=historial.INICIO[i]
			document.getElementById("historial_option_date").innerHTML += "<option value='"+historial.INICIO[i]+"'>"+historial.INICIO[i]+"</option>";
		}
	} else{
		var aTag = document.createElement('option');
		aTag.text=historial.INICIO
		document.getElementById("historial_option_date").innerHTML += "<option>Se ha encontrado un solo registro</option>"+"<option value='"+historial.INICIO+"'>"+historial.INICIO+"</option>";
		// console.log("Tamaño del select: ", document.getElementById("historial_option_date").length);
	}
}

function pedido_selected(){
	pdcr_v.length=0;
	pdcs_v.length=0;
	tblu_v.length=0;
	pdcd_v.length=0;
	pdcp_v.length=0;
	pdcp_t.length=0;
	pdcd_t.length=0;
	mfbp1_t.length=0;
	mfb_t.length=0;
	mfbp2_t.length=0;
	pdcr_t.length=0;
	bt_t.length=0;
	pdcp_t_val.length=0;
	pdcd_t_val.length=0;
	mfbp1_t_val.length=0;
	mfb_t_val.length=0;
	mfbp2_t_val.length=0;
	pdcr_t_val.length=0;
	bt_t_val.length=0;
	if (Array.isArray(historial.INICIO) == true) {
		if(document.getElementById("historial_option_date").selectedIndex>=0){
			// console.log(document.getElementById("historial_option_date").selectedIndex)
			console.log(historial.INICIO[document.getElementById("historial_option_date").selectedIndex])
			index_historial=document.getElementById("historial_option_date").selectedIndex
			document.getElementById("pedido_seleccionado").style.display="block"
			ocultar_text_inicial()
			mostrar_imagenes()
			download_one_element(document.getElementById("historial_option_date").selectedIndex)
			get_name_usuario()
		}
		else{
			document.getElementById("pedido_seleccionado").style.display="none"
		}
	} else{
		if(document.getElementById("historial_option_date").selectedIndex>0){
			// console.log(document.getElementById("historial_option_date").selectedIndex)
			console.log(historial.INICIO)
			index_historial=document.getElementById("historial_option_date").selectedIndex-1
			document.getElementById("pedido_seleccionado").style.display="block"
			ocultar_text_inicial()
			mostrar_imagenes()
			download_one_element_2()
			get_name_usuario()
		}
	}
}

function ocultar_text_inicial(){
	document.getElementById("text_init_vision").style.display="none"
	document.getElementById("text_init_torque").style.display="none"
	// document.getElementById("text_init_altura").style.display="none"
}

function ocultar_imagenes(){
	document.getElementById("vision_result").style.display="none"
	document.getElementById("torque_result").style.display="none"
	// document.getElementById("altura_result").style.display="none"
}

function mostrar_text_inicial(){
	document.getElementById("text_init_vision").style.display="block"
	document.getElementById("text_init_torque").style.display="block"
	document.getElementById("text_init_altura").style.display="block"
}

function mostrar_imagenes(){
	// console.log(pdcr_v);
	// console.log(pdcs_v);
	// console.log(tblu_v);
	// console.log(pdcd_v);
	// console.log(pdcp_v);
	// console.log("Array de texto de torque: ",pdcp_t);
	// console.log("Array de texto de torque: ",pdcd_t);
	// console.log("Array de texto de torque: ",mfbp1_t);
	// console.log("Array de texto de torque: ",mfb_t);
	// console.log("Array de texto de torque: ",mfbp2_t);
	// console.log("Array de texto de torque: ",pdcr_t);
	// console.log("Array de texto de torque: ",bt_t);
	// console.log("Array de valor Torque: ",pdcp_t_val);
	// console.log("Array de valor Torque: ",pdcd_t_val);
	// console.log("Array de valor Torque: ",mfbp1_t_val);
	// console.log("Array de valor Torque: ",mfb_t_val);
	// console.log("Array de valor Torque: ",mfbp2_t_val);
	// console.log("Array de valor Torque: ",pdcr_t_val);
	// console.log("Array de valor Torque: ",bt_t_val);
	document.getElementById("vision_result").style.display="block"
	document.getElementById("torque_result").style.display="block"
	// document.getElementById("altura_result").style.display="block"
}

function download_one_element(i){
	no_ciclo=historial.ID[i]
	pedido=historial.HM[i]
	resultado=historial.RESULTADO[i]
	vision=JSON.parse(historial.VISION[i])
	torque=JSON.parse(historial.TORQUE[i])
	altura=JSON.parse(historial.ALTURA[i])
	inicio_ciclo=historial.INICIO[i]
	fin_ciclo=historial.FIN[i]
	usuario=historial.USUARIO[i]
	comentario=historial.NOTAS[i]
	// console.log("Este es el JSON parse de vision",vision);
	// console.log("Keys vision", Object.keys(vision));
	// console.log("Este es el JSON parse de torque",torque);
	// console.log("Keys torque", Object.keys(torque));
}

function download_one_element_2(){
	no_ciclo=historial.ID
	pedido=historial.HM
	resultado=historial.RESULTADO
	vision=JSON.parse(historial.VISION)
	torque=JSON.parse(historial.TORQUE)
	altura=JSON.parse(historial.ALTURA)
	inicio_ciclo=historial.INICIO
	fin_ciclo=historial.FIN
	usuario=historial.USUARIO
	comentario=historial.NOTAS
	// console.log("Este es el JSON parse de vision",vision);
	// console.log("Keys vision", Object.keys(vision));
	// console.log("Este es el JSON parse de torque",torque);
	// console.log("Keys torque", Object.keys(torque));
}

function get_name_usuario(){
	// console.log("Nombre del usuario: ",usuario.split(":")[1]);
	name_usuario=usuario.split(":")[1];
	put_text_pedido();
}

function put_text_pedido(){
	document.getElementById("pedido_seleccionado").innerHTML="El pedido inició  " +inicio_ciclo+" y terminó "+fin_ciclo+", el operador fue "+name_usuario+". "
	// console.log(altura)
	// console.log(vision)
	get_vectors_from_db()
}

function get_historial_maq_1(){

}

function get_historial_maq_2(){

}

function get_vectors_from_db(){
	var pdcr = Object.keys(vision).indexOf("PDC-R");
	var pdcs = Object.keys(vision).indexOf("PDC-S");
	var tblu = Object.keys(vision).indexOf("TBLU");
	var pdcd = Object.keys(vision).indexOf("PDC-D");
	var pdcp = Object.keys(vision).indexOf("PDC-P");
	var pdcrmid = Object.keys(vision).indexOf("PDC-RMID");
	// console.log("Posición del PDC-R: ", pdcr);
	// console.log("Posición del PDC-S: ", pdcs);
	// console.log("Posición del TBLU: ", tblu);
	// console.log("Posición del PDC-D: ", pdcd);
	// console.log("Posición del PDC-P: ", pdcp);
	// console.log("Posición del PDC-RMID: ", pdcrmid);
	// console.log(vision[Object.keys(vision)[pdcr]]);
	// console.log(vision[Object.keys(vision)[pdcs]]);
	// console.log(vision[Object.keys(vision)[tblu]]);
	// console.log(vision[Object.keys(vision)[pdcd]]);
	// console.log(vision[Object.keys(vision)[pdcp]]);
	// console.log(vision[Object.keys(vision)[pdcrmid]]);
	caja_pdcr="pdcr"
	pdcr_v_db=vision[Object.keys(vision)[pdcr]];
	pdcs_v_db=vision[Object.keys(vision)[pdcs]];
	tblu_v_db=vision[Object.keys(vision)[tblu]];
	pdcd_v_db=vision[Object.keys(vision)[pdcd]];
	pdcp_v_db=vision[Object.keys(vision)[pdcp]];

	var pdcpt = Object.keys(torque).indexOf("PDC-P");
	var pdcdt = Object.keys(torque).indexOf("PDC-D");
	var mfbp1t = Object.keys(torque).indexOf("MFB-P1");
	var mbfst = Object.keys(torque).indexOf("MFB-S");
	var mfbp2t = Object.keys(torque).indexOf("MFB-P2");
	var pdcrt = Object.keys(torque).indexOf("PDC-R");
	var btt = Object.keys(torque).indexOf("BATTERY");
	// console.log("Posición del PDC-P TORQUE: ", pdcpt);
	// console.log("Posición del PDC-D TORQUE: ", pdcdt);
	// console.log("Posición del MFB-P1 TORQUE: ", mfbp1t);
	// console.log("Posición del MFB-S TORQUE: ", mbfst);
	// console.log("Posición del MFB-P2 TORQUE: ", mfbp2t);
	// console.log("Posición del PDC-R TORQUE: ", pdcrt);
	// console.log("Posición del BATTERY TORQUE: ", btt);
	// console.log(torque[Object.keys(torque)[pdcpt]]);
	// console.log(torque[Object.keys(torque)[pdcdt]]);
	// console.log(torque[Object.keys(torque)[mfbp1t]]);
	// console.log(torque[Object.keys(torque)[mbfst]]);
	// console.log(torque[Object.keys(torque)[mfbp2t]]);
	// console.log(torque[Object.keys(torque)[pdcrt]]);
	// console.log(torque[Object.keys(torque)[btt]]);
	pdcp_t_db=torque[Object.keys(torque)[pdcpt]];
	pdcd_t_db=torque[Object.keys(torque)[pdcdt]];
	mfbp1_t_db=torque[Object.keys(torque)[mfbp1t]];
	mfb_t_db=torque[Object.keys(torque)[mbfst]];
	mfbp2_t_db=torque[Object.keys(torque)[mfbp2t]];
	pdcr_t_db=torque[Object.keys(torque)[pdcrt]];
	bt_t_db=torque[Object.keys(torque)[btt]];
	write_the_arrays()
}

function get_vector_vision_altura(){

	for(let i in pdcr_v_db){
		if(pdcr_v_db[i]){
			pdcr_v.push(i)
		}
	}
	// console.log(pdcr_v)

	for(let i in pdcs_v_db){
		if(pdcs_v_db[i]){
			pdcs_v.push(i)
		}
	}
	// console.log(pdcs_v)

	for(let i in tblu_v_db){
		if(tblu_v_db[i]){
			tblu_v.push(i)
		}
	}
	// console.log(tblu_v)

	for(let i in pdcd_v_db){
		if(pdcd_v_db[i]){
			pdcd_v.push(i)
		}
	}
	// console.log(pdcd_v)

	for(let i in pdcp_v_db){
		if(pdcp_v_db[i]){
			pdcp_v.push(i)
		}
	}
	// console.log(pdcp_v)

}

function get_vector_torque(){

	for(let i in pdcp_t_db){
		if(pdcp_t_db[i]>0.0){
			pdcp_t.push(i)
			pdcp_t_val.push(pdcp_t_db[i])
		}
	}
	// console.log(pdcp_t)
	// console.log(pdcp_t_val)

	for(let i in pdcd_t_db){
		if(pdcd_t_db[i]>0.0){
			pdcd_t.push(i)
			pdcd_t_val.push(pdcd_t_db[i])
		}
	}
	// console.log(pdcd_t)
	// console.log(pdcd_t_val)

	for(let i in mfbp1_t_db){
		if(mfbp1_t_db[i]>0.0){
			mfbp1_t.push(i)
			mfbp1_t_val.push(mfbp1_t_db[i])
		}
	}
	// console.log(mfbp1_t)
	// console.log(mfbp1_t_val)

	for(let i in mfb_t_db){
		if(mfb_t_db[i]>0.0){
			mfb_t.push(i)
			mfb_t_val.push(mfb_t_db[i])
		}
	}
	// console.log(mfb_t)
	// console.log(mfb_t_val)

	for(let i in mfbp2_t_db){
		if(mfbp2_t_db[i]>0.0){
			mfbp2_t.push(i)
			mfbp2_t_val.push(mfbp2_t_db[i])
		}
	}
	// console.log(mfbp2_t)
	// console.log(mfbp2_t_val)

	for(let i in pdcr_t_db){
		if(pdcr_t_db[i]>0.0){
			pdcr_t.push(i)
			pdcr_t_val.push(pdcr_t_db[i])
		}
	}
	// console.log(pdcr_t)
	// console.log(pdcr_t_val)

	for(let i in bt_t_db){
		if(bt_t_db[i]>0.0){
			bt_t.push(i)
			bt_t_val.push(bt_t_db[i])
		}
	}
	// console.log(bt_t)
	// console.log(bt_t_val)
}

function write_the_arrays(){
	get_vector_vision_altura()
	get_vector_torque()
	//generar_name_imagenes() //funcion para generar las imagenes desde la API
	generar_imagenes(); //funcion para generar imagenes desde drawing_interior_imgs.js
	poner_text_t()
}

function poner_text_t(){

	// console.log("poner_text_t")

	var temp_text_pdcp="Los torques aplicados son: <br>"
	for(i=0;i<pdcp_t.length;i++){
		text=pdcp_t[i]
		value=pdcp_t_val[i]
		temp_text_pdcp=temp_text_pdcp+text+" : "+value+" Nm <br> "
	}
	// console.log(temp_text_pdcp)
	document.getElementById("pdcp_text_t").innerHTML=temp_text_pdcp

	var temp_text_pdcd="Los torques aplicados son: <br>"
	for(i=0;i<pdcd_t.length;i++){
		text=pdcd_t[i]
		value=pdcd_t_val[i]
		temp_text_pdcd=temp_text_pdcd+text+" : "+value+" Nm <br> "
	}
	// console.log(temp_text_pdcd)
	document.getElementById("pdcd_text_t").innerHTML=temp_text_pdcd

	var temp_text_mfbp1="Los torques aplicados son: <br>"
	for(i=0;i<mfbp1_t.length;i++){
		text=mfbp1_t[i]
		value=mfbp1_t_val[i]
		temp_text_mfbp1=temp_text_mfbp1+text+" : "+value+" Nm <br> "
	}
	// console.log(temp_text_mfbp1)
	document.getElementById("mfbp1_text_t").innerHTML=temp_text_mfbp1

	var temp_text_mfb="Los torques aplicados son: <br>"
	for(i=0;i<mfb_t.length;i++){
		text=mfb_t[i]
		value=mfb_t_val[i]
		temp_text_mfb=temp_text_mfb+text+" : "+value+" Nm <br> "
	}
	// console.log(temp_text_mfb)
	document.getElementById("mfb_text_t").innerHTML=temp_text_mfb

	var temp_text_mfbp2="Los torques aplicados son: <br>"
	for(i=0;i<mfbp2_t.length;i++){
		text=mfbp2_t[i]
		value=mfbp2_t_val[i]
		temp_text_mfbp2=temp_text_mfbp2+text+" : "+value+" Nm <br> "
	}
	// console.log(temp_text_mfbp2)
	document.getElementById("mfbp2_text_t").innerHTML=temp_text_mfbp2

	var temp_text_pdcr="Los torques aplicados son: <br>"
	for(i=0;i<pdcr_t.length;i++){
		text=pdcr_t[i]
		value=pdcr_t_val[i]
		temp_text_pdcr=temp_text_pdcr+text+" : "+value+" Nm <br> "
	}
	// console.log(temp_text_pdcr)
	document.getElementById("pdcr_text_t").innerHTML=temp_text_pdcr

	var temp_text_bt="Los torques aplicados son: <br>"
	for(i=0;i<bt_t.length;i++){
		text=bt_t[i]
		value=bt_t_val[i]
		temp_text_bt=temp_text_bt+text+" : "+value+" Nm <br> "
	}
	// console.log(temp_text_bt)
	document.getElementById("bt_text_t").innerHTML=temp_text_bt
}
//-----------------------------------------------------------------------------

function modify_pdcr_vision(){
	if (document.getElementById("pdcr_sections").value==="Seleccione una sección de la caja PDCR..."){
		console.log("Seleccione una sección de la caja pdcr")
	}
	else{
		var indice = array_pdcr_sections.indexOf(document.getElementById("pdcr_sections").value);
		var array_temp=document.getElementById("pdcr_section_vector").value;
		var arr=array_temp.split(",");
		if (arr.length === array_pdcr_sections_size[indice]){
			array_pdcr_final[indice]=arr
		}
	}
		//para generacion del string
		var temp_string="";
		for(i=0;i<array_pdcr_final.length;i++){
			temp_string=temp_string+"Sección  "+array_pdcr_sections[i] +"  ["+array_pdcr_final[i]+"]  ";
		}

		console.log(pdcr_vision)
		document.getElementById('pdcr_vector_final').innerHTML= "Vector de visión caja PDCR:    "+ temp_string;
	}

	function modify_pdcs_vision(){
		if (document.getElementById("pdcs_sections").value==="Seleccione una sección de la caja PDCS..."){
			console.log("Seleccione una sección de la caja pdcs")
		}
		else{
			var indice = array_pdcs_sections.indexOf(document.getElementById("pdcs_sections").value);
			var array_temp=document.getElementById("pdcs_section_vector").value;
			var arr=array_temp.split(",");
			if (arr.length === array_pdcs_sections_size[indice]){
				array_pdcs_final[indice]=arr
			}
		}
			//para generacion del string
			var temp_string="";
			for(i=0;i<array_pdcs_final.length;i++){
				temp_string=temp_string+"Sección  "+array_pdcs_sections[i] +"  ["+array_pdcs_final[i]+"]  ";
			}


			console.log(pdcs_vision)
			document.getElementById('pdcs_vector_final').innerHTML= "Vector de visión caja PDCS:    "+ temp_string;
		}

		function modify_bt_lu_vision(){
			if (document.getElementById("bt_lu_sections").value==="Seleccione una sección de la caja BT_LU..."){
				console.log("Seleccione una sección de la caja bt_lu")
			}
			else{
				var indice = array_bt_lu_sections.indexOf(document.getElementById("bt_lu_sections").value);
				var array_temp=document.getElementById("bt_lu_section_vector").value;
				var arr=array_temp.split(",");
				if (arr.length === array_bt_lu_sections_size[indice]){
					array_bt_lu_final[indice]=arr
				}
			}
					//para generacion del string
					var temp_string="";
					for(i=0;i<array_bt_lu_final.length;i++){
						temp_string=temp_string+"Sección  "+array_bt_lu_sections[i] +"  ["+array_bt_lu_final[i]+"]  ";
					}


					console.log(bt_lu_vision)
					document.getElementById('bt_lu_vector_final').innerHTML= "Vector de visión caja BT_LU:    "+ temp_string;
				}

				function modify_pdcd_vision(){
					if (document.getElementById("pdcd_sections").value==="Seleccione una sección de la caja PDCD..."){
						console.log("Seleccione una sección de la caja pdcd")
					}
					else{
						var indice = array_pdcd_sections.indexOf(document.getElementById("pdcd_sections").value);
						var array_temp=document.getElementById("pdcd_section_vector").value;
						var arr=array_temp.split(",");
						if (arr.length === array_pdcd_sections_size[indice]){
							array_pdcd_final[indice]=arr
						}
					}
				//para generacion del string
				var temp_string="";
				for(i=0;i<array_pdcd_final.length;i++){
					temp_string=temp_string+"Sección  "+array_pdcd_sections[i] +"  ["+array_pdcd_final[i]+"]  ";
				}


				console.log(pdcd_vision)
				document.getElementById('pdcd_vector_final').innerHTML= "Vector de visión caja PDCD:    "+ temp_string;
			}

			function modify_pdcp_vision(){
				if (document.getElementById("pdcp_sections").value==="Seleccione una sección de la caja PDCP..."){
					console.log("Seleccione una sección de la caja pdcp")
				}
				else{
					var indice = array_pdcp_sections.indexOf(document.getElementById("pdcp_sections").value);
					var array_temp=document.getElementById("pdcp_section_vector").value;
					var arr=array_temp.split(",");
					if (arr.length === array_pdcp_sections_size[indice]){
						array_pdcp_final[indice]=arr
					}
				}
				//para generacion del string
				var temp_string="";
				for(i=0;i<array_pdcp_final.length;i++){
					temp_string=temp_string+"Sección  "+array_pdcp_sections[i] +"  ["+array_pdcp_final[i]+"]  ";
				}


				console.log(pdcp_vision)
				document.getElementById('pdcp_vector_final').innerHTML= "Vector de visión caja PDCP:    "+ temp_string;
			}

			function modify_mfb_torque(){
				var array_temp=document.getElementById("mfb_vector").value;
				var arr=array_temp.split(",");
				if (arr.length === mfb_size){
					for(i=0;i<mfb_size;i++){
						if(arr[i]==="1"){
							array_mfb_final[i]=mfb_master[i]
						}
						else{
							array_mfb_final[i]=0
						}
					}
				}
	//para generacion del string
	var temp_string="[";
	for(i=0;i<array_mfb_final.length;i++){
		if (i===array_mfb_final.length-1){
			temp_string=temp_string +array_mfb_final[i];
		}
		else {
			temp_string=temp_string +array_mfb_final[i]+", ";
		}

	}
	temp_string+="]"

	actualizar_vector_final()
	console.log(array_mfb_final)
	document.getElementById('mfb_vector_final').innerHTML= "Vector de torque caja MFB:    "+ temp_string;
}

function modify_mfbp1_torque(){
	var array_temp=document.getElementById("mfbp1_vector").value;
	var arr=array_temp.split(",");
	if (arr.length === mfbp1_size){
		for(i=0;i<mfbp1_size;i++){
			if (arr[i]==="1"){
				array_mfbp1_final[i]=mfbp1_master[i]
			}
			else{
				array_mfbp1_final[i]=0
			}
		}
	}
	//para generacion del string
	var temp_string="[";
	for(i=0;i<array_mfbp1_final.length;i++){
		if (i===array_mfbp1_final.length-1){
			temp_string=temp_string +array_mfbp1_final[i];
		}
		else {
			temp_string=temp_string +array_mfbp1_final[i]+", ";
		}

	}
	temp_string+="]"
	actualizar_vector_final()
	console.log()
	document.getElementById('mfbp1_vector_final').innerHTML= "Vector de torque caja MFBP1:    "+ temp_string;
}

function modify_bt_torque(){
	var array_temp=document.getElementById("bt_vector").value;
	var arr=array_temp.split(",");
	if (arr.length === bt_size){
		for(i=0;i<bt_size;i++){
			if (arr[i]==="1"){
				array_bt_final[i]=bt_master[i]
			}
			else{
				array_bt_final[i]=0
			}

		}
	}
	//para generacion del string
	var temp_string="[";
	for(i=0;i<array_bt_final.length;i++){
		if (i===array_bt_final.length-1){
			temp_string=temp_string +array_bt_final[i];
		}
		else {
			temp_string=temp_string +array_bt_final[i]+", ";
		}

	}
	temp_string+="]"
	actualizar_vector_final()
	console.log()
	document.getElementById('bt_vector_final').innerHTML= "Vector de torque caja BT:    "+ temp_string;
}

function change_text_torque_final(){
	modulo_text=document.getElementById('nombre_nuevo_modt').value
	document.getElementById('texto_torque_final').innerHTML="El módulo "+modulo_text+" está compuesto por el vector de torques: "
	actualizar_vector_final()
}

function vector_vision_final_func(){

	for(i=0;i<array_pdcr_final.length;i++){
		for(j=0;j<array_pdcr_final[i].length;j++){
			pdcr_vision.push(array_pdcr_final[i][j])
		}
	}
	for(i=0;i<array_pdcs_final.length;i++){
		for(j=0;j<array_pdcs_final[i].length;j++){
			pdcs_vision.push(array_pdcs_final[i][j])
		}
	}
	for(i=0;i<array_bt_lu_final.length;i++){
		for(j=0;j<array_bt_lu_final[i].length;j++){
			bt_lu_vision.push(array_bt_lu_final[i][j])
		}
	}
	for(i=0;i<array_pdcd_final.length;i++){
		for(j=0;j<array_pdcd_final[i].length;j++){
			pdcd_vision.push(array_pdcd_final[i][j])
		}
	}
	for(i=0;i<array_pdcp_final.length;i++){
		for(j=0;j<array_pdcp_final[i].length;j++){
			pdcp_vision.push(array_pdcp_final[i][j])
		}
	}
	final_vector=[pdcr_vision,pdcs_vision,bt_lu_vision,pdcd_vision,pdcp_vision]
	console.log("vector final")
	console.log(final_vector)
	document.getElementById('vector_vision_final').innerHTML= "Vector de visión:    "+ final_vector;

}

function vector_torque_final_fun(){
	for(i=0;i<array_mfb_final.length;i++){
		mfb_torque.push(array_mfb_final[i])
	}
	for(i=0;i<array_mfbp1_final.length;i++){
		mfbp1_torque.push(array_mfbp1_final[i])
	}
	for(i=0;i<array_bt_final.length;i++){
		bt_torque.push(array_bt_final[i])
	}
}

function actualizar_vector_final(){
	vector_torque_final=[array_mfb_final,array_mfbp1_final,array_bt_final]
	document.getElementById('vector_torque_final').innerHTML="["+"["+array_mfb_final+"],"+"["+array_mfbp1_final+"],"+"["+array_bt_final+"]"+"]"
}



function add_module_torque(){
	vector_torque_final_fun()
	modulo_db=document.getElementById('nombre_nuevo_modt').value
	const newPost = {
		MODULO:modulo_db,
		CAJA_1: mfb_torque,
		CAJA_2: mfbp1_torque,
		CAJA_3: bt_torque,
		CAJA_4: [],
		CAJA_5: [],
		CAJA_6: [],
		CAJA_7: [],
		CAJA_8: []
	}
	fetch(dominio+'/database/modulos_torques',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		mostrar_modulos_torque()
		console.log(data);
	})
	.catch(function(err) {
		console.log(err);
	});
}

function agregarusuario(){
	var usuarioadd = document.getElementById('usuario').value;
	var passadd = document.getElementById('gafet').value;
	var tipoadd = document.getElementById('tipo').value;
	var niveladd;
	if (usuarioadd.length===0 || passadd.length===0) {
		alert("Necesita llenar todos los campos correspondientes.");
	}
	else{

		const newPost = {
			USUARIO: usuarioadd,
			GAFET: passadd,
			TIPO: tipoadd,
		}
		fetch(dominio+'/database/usuarios',{
			method: 'POST',
			body: JSON.stringify(newPost),
			headers:{
				"Content-type": "application/json"
			}
		}).then(res=>res.json())
		.then(function (data){

			console.log(data);
			if(data.ESTADO==="NO ES POSIBLE INSERTAR, EL USUARIO EXISTE"){
				alertaadd.innerHTML = '<div class="alert alert-warning" role="alert">Usuario no agregado.</div>';
			}
			else {
				alertaadd.innerHTML = '<div class="alert alert-success" role="alert">Usuario agregado exitósamente.</div>';
			}
			document.getElementById("usuario").value = ""
			document.getElementById('gafet').value = ""
		})
		.catch(function(err) {
			console.log(err);
		});
	}
}

function usuarioform(){
	var psw = document.getElementById('psw').value;
	sessionStorage.setItem("gafet", psw);
	console.log(psw);
	if (psw.length===0) {
		alert("Necesita llenar todos los campos correspondientes.");
	}
	else{
		fetch(dominio+'/json2/usuarios/gafet/=/'+psw+'/==/_')
		.then(function(response) {
			if(response.ok) {
				return response.json()
			} else {
				console.log('Se produjo un Error!!');
				alerta.innerHTML = '<div class="alert alert-danger" role="alert">Nombre de usuario o contraseña Incorrecta</div>';
				alerta.style.display = 'block';
			}
		})
		.then(function(data) {
			console.log(data);
			var tipo = data.TYPE[0];
			console.log(tipo);
			sessionStorage.setItem("tipo", tipo);
			console.log(sessionStorage.setItem("tipo", tipo));
			location.href = "index.html";
			// if (data==='') {
			// 	console.log('Se produjo un Error!!');
			// 	alerta.innerHTML = '<div class="alert alert-danger" role="alert">Nombre de usuario o contraseña Incorrecta</div>';
			// 	alerta.style.display = 'block';
			// }
		})
		.catch(function(err) {
			console.log(err);
		});
	}
}

function agregarparte(){
	var orden = document.getElementById('numero de orden').value;
	var mod_torques = mt;
	var mod_fusibles = mv;
	var mod_alturas = mv;
	if (orden.length===0 || mod_torques.length===0 || mod_fusibles.length===0 || mod_alturas.length===0) {
		alert("Necesita llenar todos los campos correspondientes.");
	} else{

		var mod_t=mod_torques;
		var mod_f=mod_fusibles;
		var mod_a=mod_alturas;

		console.log(mod_t,mod_f,mod_a)
		const newPost = {
			PEDIDO: orden,
			MODULOS_VISION: mod_f,
			MODULOS_TORQUE: mod_t,
			MODULOS_ALTURA: mod_a,
			ACTIVO:1
		}
		fetch(dominio+'/database/pedidos',{
			method: 'POST',
			body: JSON.stringify(newPost),
			headers:{
				"Content-type": "application/json"
			}
		}).then(res=>res.json())
		.then(function (data){
			console.log(data);
			if(data.ESTADO==="INSERTION OK"){
				console.log("INSERTION OK")
				alertaaddparte.innerHTML = '<div class="alert alert-success" role="alert">PEDIDO INSERTADO CORRECTAMENTE.</div>';
			}
			else {
				console.log("INSERTION NOK")
				alertaaddparte.innerHTML = '<div class="alert alert-warning" role="alert">PEDIDO NO AGREGADO.</div>';
			}

		})
	}
}
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}
