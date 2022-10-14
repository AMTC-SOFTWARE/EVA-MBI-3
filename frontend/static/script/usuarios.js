////////////// VARIABLES GLOBALES /////////////////////
var formusuario = document.getElementById('formusuario');
var formparte = document.getElementById('formparte');
var alertaadd = document.getElementById('alertaadd');
var alertaaddparte = document.getElementById('alertaaddparte');
var alerta = document.getElementById('alerta');
var flagusuario = true;
var flagpass = true;
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



function cerrar(){
	document.cookie = "cookievalor=nuevo"
	console.log(document.cookie);
	location.href = "index.html";
}

function formusuariomostrar(){
	formparte.style.display = 'none';
	if (formusuario.style.display === 'block') {
		formusuario.style.display = 'none';
	} else{
		formusuario.style.display = 'block';
	}
}

function formpartemostrar(){
	formusuario.style.display = 'none';
	if (formparte.style.display === 'block') {
		formparte.style.display = 'none';
	} else{
		formparte.style.display = 'block';
	}


	mostrar_modulos_vision()
	mostrar_modulos_torque()
	mostrar_secciones_vision()
}

function mostrar_modulos_vision(){
	document.getElementById("modulos_vision").innerHTML = "<option value='"+"'>Seleccione un modulo de vision..."+"</option>";
	//modulos de vision
	var miSelectT = document.getElementById("modulos_vision")[0];
	fetch("http://localhost:5000/json2/modulos_fusibles/id/>/0/_/_")
		.then(data=>data.json())
		.then(data=>{
			console.log(data.MODULO);
			var array = data.MODULO
			for (var i = 0; i < array.length; i++) {
			var aTag = document.createElement('option');
			aTag.text=array[i]
			document.getElementById("modulos_vision").innerHTML += "<option value='"+array[i]+"'>"+array[i]+"</option>";
			}
		})
	//modulos de vision
}

function mostrar_modulos_torque(){
	document.getElementById("modulos_torque").innerHTML = "<option value='"+"'>Seleccione un modulo de torque..."+"</option>";
	//modulos de torque
	var miSelectT = document.getElementById("modulos_torque")[0];
	fetch("http://localhost:5000/json2/modulos_torques/id/>/0/_/_")
	  .then(data=>data.json())
	  .then(data=>{
	    console.log(data.MODULO);
			var array = data.MODULO
			for (var i = 0; i < array.length; i++) {
			var aTag = document.createElement('option');
			aTag.text=array[i]
			document.getElementById("modulos_torque").innerHTML += "<option value='"+array[i]+"'>"+array[i]+"</option>";
			}
		})
	//modulos de torque
}

function mostrar_secciones_vision(){
	//modulos de vision section pdcr
	var miSelectT = document.getElementById("pdcr_sections")[0];
	for (var i = 0; i < array_pdcr_sections.length; i++) {
		var aTag = document.createElement('option');
		aTag.text=array_pdcr_sections[i]
		document.getElementById("pdcr_sections").innerHTML += "<option value='"+array_pdcr_sections[i]+"'>"+array_pdcr_sections[i]+"</option>";
	}
	//modulos de vision pdcr
	//modulos de vision section pdcs
	var miSelectT = document.getElementById("pdcs_sections")[0];
	for (var i = 0; i < array_pdcs_sections.length; i++) {
		var aTag = document.createElement('option');
		aTag.text=array_pdcs_sections[i]
		document.getElementById("pdcs_sections").innerHTML += "<option value='"+array_pdcs_sections[i]+"'>"+array_pdcs_sections[i]+"</option>";
	}
	//modulos de vision pdcr
	//modulos de vision section tb_lu
	var miSelectT = document.getElementById("bt_lu_sections")[0];
	for (var i = 0; i < array_bt_lu_sections.length; i++) {
		var aTag = document.createElement('option');
		aTag.text=array_bt_lu_sections[i]
		document.getElementById("bt_lu_sections").innerHTML += "<option value='"+array_bt_lu_sections[i]+"'>"+array_bt_lu_sections[i]+"</option>";
	}
	//modulos de vision tb_lu
	//modulos de vision section pdcd
	var miSelectT = document.getElementById("pdcd_sections")[0];
	for (var i = 0; i < array_pdcd_sections.length; i++) {
		var aTag = document.createElement('option');
		aTag.text=array_pdcd_sections[i]
		document.getElementById("pdcd_sections").innerHTML += "<option value='"+array_pdcd_sections[i]+"'>"+array_pdcd_sections[i]+"</option>";
	}
	//modulos de vision pdcd
	//modulos de vision section pdcp
	var miSelectT = document.getElementById("pdcp_sections")[0];
	for (var i = 0; i < array_pdcp_sections.length; i++) {
		var aTag = document.createElement('option');
		aTag.text=array_pdcp_sections[i]
		document.getElementById("pdcp_sections").innerHTML += "<option value='"+array_pdcp_sections[i]+"'>"+array_pdcp_sections[i]+"</option>";
	}
	//modulos de vision pdcd
}

function agregarmodulov(){
	if (document.getElementById("modulos_vision").value==="Seleccione un modulo de vision..."){
		console.log("Seleccione un modulo")
	}
	else{
		var i = mv.indexOf( document.getElementById("modulos_vision").value );
		if (i === -1){
			console.log(document.getElementById("modulos_vision").value)
			mv.push(document.getElementById("modulos_vision").value)
			console.log(mv)
			document.getElementById('arreglomv').innerHTML= "Módulos de visión agregados:   "+mv ;
		}

	}

}

function agregarmodulot(){
	if (document.getElementById("modulos_torque").value==="Seleccione un modulo de torque..."){
		console.log("Seleccione un modulo")
	}
	else{
		var i = mt.indexOf(document.getElementById("modulos_torque").value);
		if (i === -1){
			console.log(document.getElementById("modulos_torque").value)
			mt.push(document.getElementById("modulos_torque").value)
			document.getElementById('arreglomt').innerHTML= "Módulos de torque agregados:   "+mt ;
		}

	}

}

function quitarmodulov(){
	var i = mv.indexOf( document.getElementById("modulos_vision").value );
	if (i !== -1){
		mv.splice( i, 1 );
	}

	console.log(mv)
	document.getElementById('arreglomv').innerHTML= "Módulos de visión agregados:   "+mv ;
}

function quitarmodulot(){
	var i = mt.indexOf(document.getElementById("modulos_torque").value);
	if (i !== -1){
		mt.splice( i, 1 );
	}
	console.log(mt)
	document.getElementById('arreglomt').innerHTML= "Módulos de torque agregados:   "+mt ;


}

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
	fetch('http://localhost:5000/database/modulos_torques',{
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
		fetch('http://localhost:5000/database/usuarios',{
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
	console.log(psw);
	if (psw.length===0) {
		alert("Necesita llenar todos los campos correspondientes.");
	}
	else{
		fetch('http://localhost:5000/json2/usuarios/gafet/=/'+psw+'/==/_')
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
			document.cookie = "cookievalor="+tipo;
			console.log(document.cookie);
			//alert(document.cookie);
			location.href = "gestiongeneral.html";
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
			MODULOS_ALTURA: mod_a
		}
		fetch('http://localhost:5000/database/pedidos',{
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
