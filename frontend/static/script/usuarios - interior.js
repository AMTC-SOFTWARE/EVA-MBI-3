////////////// VARIABLES GLOBALES /////////////////////
var formusuario = document.getElementById('formusuario');
var formparte = document.getElementById('formparte');
var alertaadd = document.getElementById('alertaadd');
var alertaaddparte = document.getElementById('alertaaddparte');
var alerta = document.getElementById('alerta');
var flagusuario;
var flagpass;
var activo = 1;
var cerrarsesion = document.getElementById('cerrarsesion');
var mv=[];
var mt=[];
var vf=[];
var ref = "";
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

var historial=""

function dbbkup(){
	fetch(dominio+"/api/get/bkup")
	.then(res=>res.json())
	.then(function (data){
		console.log(data);
		// console.log("data.dir",data.dir)
		if (data.status == true){
			console.log("Respaldo de DB con éxito")
			document.getElementById('dir').innerHTML = data.dir
			document.getElementById('nombre').innerHTML = data.nombre
			$("#db_bkup_success").fadeTo(10000, 500).slideUp(500, function() {
				$("#db_bkup_success").slideUp(500);
			});
		}else{
			console.log("Error al intentar hacer el respaldo de la DB, inténtelo de nuevo")
			document.getElementById('dir_fail').innerHTML = data.dir
			$("#db_bkup_fail").fadeTo(10000, 500).slideUp(500, function() {
				$("#db_bkup_fail").slideUp(500);
			});
		}
	})
	.catch(function(err) {
		console.log(err);
	});
}


function formusuariomostrar(){
	if (formusuario.style.display === 'block') {
		formusuario.style.display = 'none';
	} else{
		formusuario.style.display = 'block';
		form_numeros.style.display = 'none';
		//form_auto.style.display = 'none';
		//form_manual.style.display = 'none';
	}
}

function form_numeros_mostrar(){
	if (form_numeros.style.display === 'block') {
		form_numeros.style.display = 'none';
		//form_manual.style.display = 'none';
		//form_auto.style.display = 'none';
	} else{
		form_numeros.style.display = 'block';
		formusuario.style.display = 'none';
		$('#boton_visuales').addClass('btn-relx')
		$('#boton_definiciones').addClass('btn-primary')
		$('#boton_manual').addClass('btn-warning')
		$('#boton_auto').addClass('btn-info')
	}
}

$('#boton_visuales').on('click',function(){
	$('#boton_visuales').addClass('btn-relx')
})
$('#boton_definiciones').on('click',function(){
	$('#boton_definiciones').addClass('btn-primary')
})


function form_manual_mostrar(){
	if (document.getElementById('boton_manual').className.match(/(?:^|\s)btn-warning(?!\S)/)){
		console.log("Si está");
	}else{
		console.log("No está la clase");
		$('#boton_manual').addClass('btn-warning')
	}
	if (form_manual.style.display === 'block') {
		form_manual.style.display = 'none';
		$('#boton_auto').addClass('btn-info')
		$('#boton_visuales').addClass('btn-relx')
		$('#boton_definiciones').addClass('btn-primary')
	} else{
		form_manual.style.display = 'block';
		form_auto.style.display = 'none';
		formusuario.style.display = 'none';
		$('#boton_auto').removeClass('btn-info')
		$('#boton_visuales').removeClass('btn-relx')
		$('#boton_definiciones').removeClass('btn-primary')
	}
}

function form_auto_mostrar(){
	if (document.getElementById('boton_auto').className.match(/(?:^|\s)btn-info(?!\S)/)){
		console.log("Si está");
	}else{
		console.log("No está la clase");
		$('#boton_auto').addClass('btn-info')
	}
	if (form_auto.style.display === 'block') {
		form_auto.style.display = 'none';
		$('#boton_manual').addClass('btn-warning')
		$('#boton_visuales').addClass('btn-relx')
		$('#boton_definiciones').addClass('btn-primary')
	} else{
		form_auto.style.display = 'block';
		formusuario.style.display = 'none';
		form_manual.style.display = 'none';
		$('#boton_manual').removeClass('btn-warning')
		$('#boton_visuales').removeClass('btn-relx')
		$('#boton_definiciones').removeClass('btn-primary')
	}
}

function modify_pdcr_vision(){
	if (document.getElementById("pdcr_sections").value==="Seleccione una sección de la caja PDCR..."){
		// console.log("Seleccione una sección de la caja pdcr")
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

		// console.log(pdcr_vision)
		document.getElementById('pdcr_vector_final').innerHTML= "Vector de visión caja PDCR:    "+ temp_string;
	}

	function modify_pdcs_vision(){
		if (document.getElementById("pdcs_sections").value==="Seleccione una sección de la caja PDCS..."){
			// console.log("Seleccione una sección de la caja pdcs")
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


			// console.log(pdcs_vision)
			document.getElementById('pdcs_vector_final').innerHTML= "Vector de visión caja PDCS:    "+ temp_string;
		}

		function modify_bt_lu_vision(){
			if (document.getElementById("bt_lu_sections").value==="Seleccione una sección de la caja BT_LU..."){
				// console.log("Seleccione una sección de la caja bt_lu")
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


					// console.log(bt_lu_vision)
					document.getElementById('bt_lu_vector_final').innerHTML= "Vector de visión caja BT_LU:    "+ temp_string;
				}

				function modify_pdcd_vision(){
					if (document.getElementById("pdcd_sections").value==="Seleccione una sección de la caja PDCD..."){
						// console.log("Seleccione una sección de la caja pdcd")
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


				// console.log(pdcd_vision)
				document.getElementById('pdcd_vector_final').innerHTML= "Vector de visión caja PDCD:    "+ temp_string;
			}

			function modify_pdcp_vision(){
				if (document.getElementById("pdcp_sections").value==="Seleccione una sección de la caja PDCP..."){
					// console.log("Seleccione una sección de la caja pdcp")
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


				// console.log(pdcp_vision)
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
	// console.log(array_mfb_final)
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
	// console.log()
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
	// console.log()
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
	// console.log("vector final")
	// console.log(final_vector)
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
		// console.log(data);
	})
	.catch(function(err) {
		// console.log(err);
	});
}

function agregarusuario(){
	// console.log("Este es el valor final del flagusuario", flagusuario);
	// console.log("Este es el valor final del flagpass", flagpass);
	var usuarioadd = document.getElementById('usuario').value;
	var passadd = document.getElementById('gafet').value;
	var tipoadd = document.getElementById('tipo').value;
	var niveladd;
	if (usuarioadd.length===0 || passadd.length===0) {
		alert("Necesita llenar todos los campos correspondientes.");
	}
	else{
		if (flagusuario == true & flagpass == true) {
			const newPost = {
				"NAME": usuarioadd,
				"GAFET": passadd,
				"TYPE": tipoadd,
				"DATETIME": "AUTO",
				"ACTIVE": activo
			}
			// console.log("Se hizo el POST");
			fetch(dominio+'/api/post/usuarios',{
				method: 'POST',
				body: JSON.stringify(newPost),
				headers:{
					"Content-type": "application/json"
				}
			}).then(res=>res.json())
			.then(function (data){
				console.log(data);
				alertaadd.innerHTML = '<div class="alert alert-success" role="alert">Usuario agregado exitósamente.</div>';
				document.getElementById("usuario").value = ""
				document.getElementById('gafet').value = ""
			})
			.catch(function(err) {
				console.log(err);
			});
		} else {
			// console.log("NO SE HIZO el POST");
			alertaadd.innerHTML = '<div class="alert alert-warning" role="alert">El usuario o contraseña ya existe, por favor pruebe con otro.</div>';
		}

	}
}

function get_valid_usuario(){
	// console.log(document.getElementById("usuario").value)
	if(document.getElementById("usuario").value!=""){
		endpoint=dominio+'/api/get/usuarios/name/=/'+document.getElementById("usuario").value+'/_/=/_'
		// console.log(endpoint)
		fetch(endpoint)
		.then(res=>res.json())
		.then(function (data){
			// console.log(data);
			// console.log(data.items);
			if (data.items === 0) {
				// console.log("No existe en la base de datos");
				flagusuario = true;
			} else{
				// console.log("El valor ya está en la base de datos");
				flagusuario = false;
			}
			// console.log("Este es el valor del flag: ", flagusuario);
		})
		.catch(function(err) {
			// console.log(err);
		});
		
	}
}

function get_valid_gafet(){
	// console.log(document.getElementById("gafet").value)
	if(document.getElementById("gafet").value!=""){
		endpoint=dominio+'/api/get/usuarios/gafet/=/'+document.getElementById("gafet").value+'/_/=/_'
		// console.log(endpoint)
		fetch(endpoint)
		.then(res=>res.json())
		.then(function (data){
			// console.log(data);
			// console.log(data.items);
			if (data.items === 0) {
				// console.log("El GAFET No existe en la base de datos");
				flagpass = true;
			} else{
				// console.log("El GAFET ya está en la base de datos");
				flagpass = false;
			}
			// console.log("Este es el valor del flag: ", flagpass);
		})
		.catch(function(err) {
			// console.log(err);
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
		if (ref =="no valido") {
			$('#mostrar').click();
			document.getElementById("header").innerHTML = document.getElementById("numero de orden").value;
			document.getElementById("informacion").innerHTML = 'Para insertar un número de pedido correctamente asegúrese de agregar la referencia "ILX" al inicio.';
		}else{
			if(historial==""){
				agregar_parte_db();
			}
			else{
				$('#mostrar').click();
				document.getElementById("header").innerHTML = document.getElementById("numero de orden").value;
				document.getElementById("informacion").innerHTML = 'El pedido ya existe.';
			}
		}
	}
}
function agregar_parte_db(){
	var orden = document.getElementById('numero de orden').value;
	var mod_torques = mt;
	var mod_fusibles = mv;
	var mod_alturas = mv;

	var mod_t=mod_torques;
	var mod_f=mod_fusibles;
	var mod_a=mod_alturas;

	// console.log(mod_t,mod_f,mod_a)
	let codigosqr = document.getElementsByClassName("qr");
	let checkbox = document.getElementsByClassName("myCheck");
	qr_dict = {}      
	for (var i = 0; i < codigosqr.length; i++) {    
		qr_dict[codigosqr[i].id] = [codigosqr[i].value, checkbox[i].checked];

	}   
	// console.log (qr_dict);
	const newPost = {
		"PEDIDO": orden,
		"MODULOS_VISION": {"INTERIOR": mod_f},
		"MODULOS_TORQUE": {"INTERIOR": mod_t},
		"MODULOS_ALTURA": {"INTERIOR": mod_a},
		"QR_BOXES": qr_dict,
		"ACTIVE": 1,
		"DATETIME": "AUTO"
	}
	fetch(dominio+'/api/post/pedidos',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		// console.log(data);
		if(data["items"]===1){
			// console.log("INSERTION OK")
			alertaaddparte.innerHTML = '<div class="alert alert-success" role="alert">PEDIDO INSERTADO CORRECTAMENTE.</div>';
			location.replace("index.html")
		}
		else {
			// console.log("INSERTION NOK")
			alertaaddparte.innerHTML = '<div class="alert alert-warning" role="alert">PEDIDO NO AGREGADO.</div>';
		}

	})
}

function get_valid_pedido(){
	//console.log("get_pedido")
	historial="";
	ref = "";
	// console.log(document.getElementById("numero de orden").value)
	var ILX = document.getElementById("numero de orden").value.indexOf("ILX")
	// console.log("INDEX OF STRING",ILX);
	if(document.getElementById("numero de orden").value!=""){
		if (ILX == -1) {
			// console.log("no está el ILX");
			historial="si existe";
			ref = "no valido";
			alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia ILX no válida</div>'
		} else{
			// console.log("SI ESCRIBIÓ ILX");

		// get the id
		endpoint=dominio+'/database/pedidos/pedido/=/'+document.getElementById("numero de orden").value+'/_/_/_'
		// console.log(endpoint)
		fetch(endpoint,{
			method: 'GET',
			headers:{
				"Content-type": "application/json"
			}
		}).then(res=>res.json())
		.then(function (data){
			// console.log(data);
			historial="si existe";
			ref = "";
			alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "'+document.getElementById("numero de orden").value+'" ya existe</div>'
			// console.log(historial)
		})
		.catch(function(err) {

			//console.log(err);
		});
		alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+document.getElementById("numero de orden").value+'" no existe</div>'
		// console.log(historial)
	}
}
}

function mayuscula(elemento){
	let texto = elemento.value;
	elemento.value = texto.toUpperCase();
}

function comprobaractivo(obj){   
  if (obj.checked){
    activo = 1;
  } else{
    activo = 0;
  }
//   console.log("Valor de activo: ",activo);
}

function modalfocus(){
	document.getElementById('psw').focus();
}

///////////////////// Modularidades ///////////
let dropArea = document.getElementById('drop-area');
;['dragenter','dragover','dragleave','drop'].forEach(eventName => {
	dropArea.addEventListener(eventName,preventDefaults,false)
})
function preventDefaults(e){
	e.preventDefault()
	e.stopPropagation()
}

;['dragenter','dragover'].forEach(eventName => {
	dropArea.addEventListener(eventName,highlight,false)
})
;['dragleave','drop'].forEach(eventName => {
	dropArea.addEventListener(eventName,unhighlight,false)
})

function highlight(e){
	dropArea.classList.add('highlight')
	dropArea_modulos.classList.add('highlight')
}
function unhighlight(e){
	dropArea.classList.remove('highlight')
	dropArea_modulos.classList.remove('highlight')
}

dropArea.addEventListener('drop',handleDrop,false)

$("#cargar").on("click",function(){
	([...files]).forEach(cargar_archivo)
})

function handleDrop(e){
	let dt = e.dataTransfer
	files = dt.files
	const fileField = document.getElementById('cargar_input');
	fileField.files = files
	console.log(fileField.files)
}

function handleFiles(hola){
	console.log(hola);
	files = hola;
}

function cargar_archivo(file){
	var formData = new FormData();
	console.log("Nombre del Archivo: ",file.name);
	console.log("Archivo: ",file);

	formData.append('name', file.name);
	formData.append('file', file);

	console.log("formData name: ",formData.get('name'));
	console.log("formData file: ",formData.get('file'));
	
	fetch(dominio+'/upload/modularities', {
		method: 'POST',
		body: formData
		})
		.then(response => response.json())
		.then(result => {
		console.log('Resultado:', result);
		if (result.items == 1) {
			$("#carga_exitosa").fadeTo(2000, 500).slideUp(500, function() {
				$("#carga_exitosa").slideUp(500);
			});
		}else{
			$("#carga_fail").fadeTo(2000, 500).slideUp(500, function() {
				$("#carga_fail").slideUp(500);
			});
		}
		clear_archivo();
		formData = '';
		})
		.catch(error => {
		console.error('Error:', error);
		});
	// })	
}

$(function(){
	$("[data-hide]").on("click",function(){
		$(this).closest("." + $(this).attr("data-hide")).hide();
		document.getElementById("ilx_fail_alert").innerHTML = '';
	})
})

function update_modularities(){
	console.log("Click en Finalizar");
	document.getElementById("ilx_fail_alert").innerHTML = '';
	fetch(dominio+'/update/modularities', {
		method: 'POST',
		body: {}
		})
		.then(response => response.json())
		.then(result => {
			console.log('Resultado:', result);
			// console.log("ILX que NO se cargaron",Object.keys(result['ILX']));
			// console.log("Cantidad de ILX",(Object.keys(result['ILX'])).length);
			if ((Object.keys(result['ILX'])).length == 0) {
				console.log("Todos las Modularidades se cargaron con éxito")
			}else{
				(Object.keys(result['ILX'])).forEach(function(valor, indice, array) {
					// console.log("Valor ILX: ",valor);
					// console.log("indice: ",indice);
					console.log("Módulos faltantes del ILX: ",result['ILX'][valor]);
					document.getElementById("ilx_fail_alert").innerHTML += indice+'.- '+valor+' --> '+"<span style='color: green'>"+result['ILX'][valor]['vision']+"</span>"+"<span style='color: black'>"+result['ILX'][valor]['torque']+"</span>"+'<hr>';
				});
				document.getElementById("ilx_fail_alert").innerHTML += '<strong>Lista total de Módulos Faltantes: </strong><br/>'+result['Modulos'];
				
				$("#ilx_fail").fadeTo(50000, 500).slideUp(500, function() {
					$("#ilx_fail").slideUp(500);
				});
				// let ilxString = (Object.keys(result)).toString()
				// alert("Las siguientes modularidades NO se cargaron debido a un error en cuanto a sus módulos: ",ilxString)
			}
			clear_archivo();
			formData = '';
		})
		.catch(error => {
			console.error('Error:', error);
		});
}

function clear_archivo(){
	const fileField = document.getElementById('cargar_input');
	fileField.value="";
	console.log(fileField.files)
}

///////////////////// Modulos ///////////
let dropArea_modulos = document.getElementById('drop-area-modulos');
;['dragenter','dragover','dragleave','drop'].forEach(eventName => {
	dropArea_modulos.addEventListener(eventName,preventDefaults,false)
})
function preventDefaults(e){
	e.preventDefault()
	e.stopPropagation()
}

;['dragenter','dragover'].forEach(eventName => {
	dropArea_modulos.addEventListener(eventName,highlight,false)
})
;['dragleave','drop'].forEach(eventName => {
	dropArea_modulos.addEventListener(eventName,unhighlight,false)
})

dropArea_modulos.addEventListener('drop',handleDrop_modulos,false)
$("#update_modulos").on("click",function(){
	([...files]).forEach(cargar_archivo_modulos)
})
function handleDrop_modulos(e){
	let dt = e.dataTransfer
	files = dt.files
	const fileField = document.getElementById('cargar_input_modulos');
	fileField.files = files
	console.log(fileField.files)
}

function handleFiles_modulos(hola){
	console.log(hola);
	files = hola;
}

function cargar_archivo_modulos(file){
	var formData = new FormData();
	console.log("Nombre del Archivo: ",file.name);
	console.log("Archivo: ",file);

	formData.append('name', file.name);
	formData.append('file', file);

	console.log("formData: ",formData.get('name'));
	console.log("formData: ",formData.get('file'));

	fetch(dominio+'/update/modules', {
		method: 'POST',
		body: formData
		})
		.then(response => response.json())
		.then(result => {
		console.log('Resultado:', result);
		if (result.items == 1) {
			$("#update_exitoso").fadeTo(2000, 500).slideUp(500, function() {
				$("#update_exitoso").slideUp(500);
				$("#cerrar-modulos").click();
			});
		}else{
			$("#update_fail").fadeTo(2000, 500).slideUp(500, function() {
				$("#update_fail").slideUp(500);
			});
		}		
		clear_archivo_modulos();
		formData = '';
		})
		.catch(error => {
		console.error('Error:', error);
		});	
}

function clear_archivo_modulos(){
	const fileField = document.getElementById('cargar_input_modulos');
	fileField.value="";
	console.log(fileField.files)
}