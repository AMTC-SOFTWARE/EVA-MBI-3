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

// vision
var pdce_3_v=[]
var pdcs1_v=[]


//altura
var pdce_3_a=[]
var pdcs1_a=[]


//torque
var pdce_1_t=[]
var pdce_2_t=[]
var pdcs1_t=[]
var mfbe_t=[]
var g11_t=[]


var pdce_1_t_val=[]
var pdce_2_t_val=[]
var pdcs1_t_val=[]
var mfbe_t_val=[]
var g11_t_val=[]

var name_img_general=""
var temporal_text=""

var pdce_3_v_db={}
var pdcs1_v_db={}
var pdce_1_t_db={}
var pdce_2_t_db={}
var pdcs1_t_db={}
var mfbe_t_db={}
var g11_t_db={}
//---------------------------

function get_valid_pedido(){
	//console.log("get_pedido")

	console.log(document.getElementById("pedido").value)
	if(document.getElementById("pedido").value!=""){
		// get the id
		endpoint='http://127.0.0.1:5000/database/pedidos/pedido/=/'+document.getElementById("pedido").value+'/_/_/_'
		console.log(endpoint)
		fetch(endpoint,{
			method: 'GET',
			headers:{
				"Content-type": "application/json"
			}
		}).then(res=>res.json())
		.then(function (data){
			console.log(data);
			id=data.ID
			get_historial()

		})
		.catch(function(err) {

			//console.log(err);
		});
		alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "'+document.getElementById("pedido").value+'" no existe</div>';
		document.getElementById("historial_option_date").style="display: none;"
		document.getElementById("pedido_seleccionado").style="display: none;"
		mostrar_text_inicial()
		ocultar_imagenes()
		//------------------------------------------------------------------------------
	}
}

function get_historial(){
	// get_historial

	endpoint='http://localhost:5000/database/historial/pedido/=/'+id+'/resultado/=/1/multi'
	console.log(endpoint)
	fetch(endpoint,{
		method: 'GET',
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
		historial=data
		alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+document.getElementById("pedido").value+'" si tiene historial</div>';
		document.getElementById("historial_option_date").style="display: block;"
		load_historial()
	})
	.catch(function(err) {
		//console.log(err);
	});
}

function load_historial(){
	console.log("en load_historial")
	console.log(historial)
	for (var i = 0; i < historial.FIN_CICLO.length; i++) {
		var aTag = document.createElement('option');
		aTag.text=historial.FIN_CICLO[i]
		document.getElementById("historial_option_date").innerHTML += "<option value='"+historial.FIN_CICLO[i]+"'>"+historial.FIN_CICLO[i]+"</option>";
	}

}

function pedido_selected(){
	if(document.getElementById("historial_option_date").selectedIndex>0){
		console.log(document.getElementById("historial_option_date").selectedIndex)
		console.log(historial.FIN_CICLO[document.getElementById("historial_option_date").selectedIndex-1])
		index_historial=document.getElementById("historial_option_date").selectedIndex-1
		document.getElementById("pedido_seleccionado").style.display="block"
		ocultar_text_inicial()
		mostrar_imagenes()
		download_one_element(document.getElementById("historial_option_date").selectedIndex-1)
		get_name_usuario()
	}
	else{
		document.getElementById("pedido_seleccionado").style.display="none"
	}

}

function ocultar_text_inicial(){
	document.getElementById("text_init_vision").style.display="none"
	document.getElementById("text_init_torque").style.display="none"
	document.getElementById("text_init_altura").style.display="none"
}

function ocultar_imagenes(){
	document.getElementById("vision_result").style.display="none"
	document.getElementById("torque_result").style.display="none"
	document.getElementById("altura_result").style.display="none"
}

function mostrar_text_inicial(){
	document.getElementById("text_init_vision").style.display="block"
	document.getElementById("text_init_torque").style.display="block"
	document.getElementById("text_init_altura").style.display="block"
}

function mostrar_imagenes(){
	document.getElementById("vision_result").style.display="block"
	document.getElementById("torque_result").style.display="block"
	document.getElementById("altura_result").style.display="block"
}

function download_one_element(i){
	no_ciclo=historial.NO_CICLO[i]
	pedido=historial.PEDIDO[i]
	resultado=historial.RESULTADO[i]
	vision=JSON.parse(historial.VISION[i])
	torque=JSON.parse(historial.TORQUE[i])
	altura=JSON.parse(historial.ALTURA[i])
	inicio_ciclo=historial.INICIO_CICLO[i]
	fin_ciclo=historial.FIN_CICLO[i]
	usuario=historial.USUARIO[i]
	comentario=historial.COMENTARIO[i]
}

function get_name_usuario(){
	endpoint='http://127.0.0.1:5000/database/usuarios/id/=/'+usuario+'/_/_/_'
	console.log(endpoint)
	fetch(endpoint,{
		method: 'GET',
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		//console.log(data);
		name_usuario=data.NAME
		put_text_pedido()
	})
	.catch(function(err) {

		//console.log(err);
	});
}

function put_text_pedido(){
	document.getElementById("pedido_seleccionado").innerHTML="El pedido inició  " +inicio_ciclo+" y terminó "+fin_ciclo+", el operador fue "+name_usuario+". "
	console.log(altura)
	console.log(vision)
	get_vectors_from_db()
}

function get_historial_maq_1(){

}

function get_historial_maq_2(){

}

function get_vectors_from_db(){
	pdce_3_v_db={"S1_1":1,"S1_2":1}
	pdcs1_v_db={"S1_1":1,"S1_2":1}
	pdce_1_t_db={"E1":1}
	pdce_2_t_db={"E1":1,"E2":1}
	pdcs1_t_db={"E1":1}
	mfbe_t_db={"A21":1,"A22":1,"A23":1,"A24":1,"A25":1,"A26":1,"A27":1,"A28":1,"A29":1,"A30":1,"A20":1}
	g11_t_db={"G11":1}


	write_the_arrays()
}

function get_vector_vision_altura(){

	for(let i in pdce_3_v_db){
		if(pdce_3_v_db[i]){
			pdce_3_v.push(i)
		}
	}
	console.log(pdce_3_v)

	for(let i in pdcs1_v_db){
		if(pdcs1_v_db[i]){
			pdcs1_v.push(i)
		}
	}
	console.log(pdcs1_v)
}

function get_vector_torque(){

	for(let i in pdce_1_t_db){
		if(pdce_1_t_db[i]>0.0){
			pdce_1_t.push(i)
			pdce_1_t_val.push(pdce_1_t_db[i])
		}
	}
	console.log(pdce_1_t)
	console.log(pdce_1_t_val)

	for(let i in pdce_2_t_db){
		if(pdce_2_t_db[i]>0.0){
			pdce_2_t.push(i)
			pdce_2_t_val.push(pdce_2_t_db[i])
		}
	}
	console.log(pdce_2_t)
	console.log(pdce_2_t_val)

	for(let i in pdcs1_t_db){
		if(pdcs1_t_db[i]>0.0){
			pdcs1_t.push(i)
			pdcs1_t_val.push(pdcs1_t_db[i])
		}
	}
	console.log(pdcs1_t)
	console.log(pdcs1_t_val)

	for(let i in mfbe_t_db){
		if(mfbe_t_db[i]>0.0){
			mfbe_t.push(i)
			mfbe_t_val.push(mfbe_t_db[i])
		}
	}
	console.log(mfbe_t)
	console.log(mfbe_t_val)

	for(let i in g11_t_db){
		if(g11_t_db[i]>0.0){
			g11_t.push(i)
			g11_t_val.push(g11_t_db[i])
		}
	}
	console.log(g11_t)
	console.log(g11_t_val)
}

function write_the_arrays(){
	get_vector_vision_altura()
	get_vector_torque()
	generar_name_imagenes()
	poner_text_t()
}

function poner_text_t(){

	console.log("poner_text_t")

	var temp_text_pdce_1="Los torques aplicados son: <br>"
	for(i=0;i<pdce_1_t.length;i++){
		text=pdce_1_t[i]
		value=pdce_1_t_val[i]
		temp_text_pdce_1=temp_text_pdce_1+text+" : "+value+" Nm <br> "
	}
	console.log(temp_text_pdce_1)
	document.getElementById("pdce_1_text_t").innerHTML=temp_text_pdce_1

	var temp_text_pdce_2="Los torques aplicados son: <br>"
	for(i=0;i<pdce_2_t.length;i++){
		text=pdce_2_t[i]
		value=pdce_2_t_val[i]
		temp_text_pdce_2=temp_text_pdce_2+text+" : "+value+" Nm <br> "
	}
	console.log(temp_text_pdce_2)
	document.getElementById("pdce_2_text_t").innerHTML=temp_text_pdce_2

	var temp_text_pdcs1="Los torques aplicados son: <br>"
	for(i=0;i<pdcs1_t.length;i++){
		text=pdcs1_t[i]
		value=pdcs1_t_val[i]
		temp_text_pdcs1=temp_text_pdcs1+text+" : "+value+" Nm <br> "
	}
	console.log(temp_text_pdcs1)
	document.getElementById("pdcs1_text_t").innerHTML=temp_text_pdcs1

	var temp_text_mfbe="Los torques aplicados son: <br>"
	for(i=0;i<mfbe_t.length;i++){
		text=mfbe_t[i]
		value=mfbe_t_val[i]
		temp_text_mfbe=temp_text_mfbe+text+" : "+value+" Nm <br> "
	}
	console.log(temp_text_mfbe)
	document.getElementById("mfbe_text_t").innerHTML=temp_text_mfbe

	var temp_text_g11="Los torques aplicados son: <br>"
	for(i=0;i<g11_t.length;i++){
		text=g11_t[i]
		value=g11_t_val[i]
		temp_text_g11=temp_text_g11+text+" : "+value+" Nm <br> "
	}
	console.log(temp_text_g11)
	document.getElementById("g11_text_t").innerHTML=temp_text_g11
}

function generar_name_imagenes(){
	txt=Math.random()
	console.log(txt)
  name_img_general=txt

	//vision y altura
	cargar_pdce_3_img_v()
	cargar_pdcs1_img_v()
	//torque
	cargar_pdce_1_img_t()
	cargar_pdce_2_img_t()
	cargar_pdcs1_img_t()
	cargar_mfbe_img_t()
	cargar_g11_img_t()
}

//vision
//------------------------------------------------------------------------------
function cargar_pdce_3_img_v(){

	const newPost = {
		ARRAY:pdce_3_v,
    name:name_img_general
	}
	fetch('http://localhost:5000/generar_imagen_result/motor/vision-altura/pdce_3',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdce_3_img_v, 300);
	setTimeout(update_pdce_3_img_a, 300);
}

function update_pdce_3_img_v(){
	console.log("en poner imagen")
	temporal_text="static/content/cajas/motor/pdce_3/temp_result/pdce_3"+name_img_general+".jpg"
	console.log(temporal_text)
	document.getElementById('pdce_3_image_v').src=temporal_text

}

function cargar_pdcs1_img_v(){

	const newPost = {
		ARRAY:pdcs1_v,
    name:name_img_general
	}
	fetch('http://localhost:5000/generar_imagen_result/motor/vision-altura/pdcs1_2',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdcs1_img_v, 300);
	setTimeout(update_pdcs1_img_a, 300);
}

function update_pdcs1_img_v(){
	console.log("en poner imagen")
	temporal_text="static/content/cajas/motor/pdcs1_2/temp_result/pdcs1_2"+name_img_general+".jpg"
	console.log(temporal_text)
	document.getElementById('pdcs1_image_v').src=temporal_text

}


//torques
//------------------------------------------------------------------------------
function cargar_pdce_1_img_t(){

	const newPost = {
		ARRAY:pdce_1_t,
    name:name_img_general
	}
	fetch('http://localhost:5000/generar_imagen_result/motor/torque/pdce_1',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdce_1_img_t, 500);
}

function update_pdce_1_img_t(){
	console.log("en poner imagen")
	temporal_text="static/content/cajas/motor/pdce_1/temp_result/pdce_1"+name_img_general+".jpg"
	console.log(temporal_text)
	document.getElementById('pdce_1_image_t').src=temporal_text

}

function cargar_pdce_2_img_t(){

	const newPost = {
		ARRAY:pdce_2_t,
    name:name_img_general
	}
	fetch('http://localhost:5000/generar_imagen_result/motor/torque/pdce_2',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdce_2_img_t, 500);
}

function update_pdce_2_img_t(){
	console.log("en poner imagen")
	temporal_text="static/content/cajas/motor/pdce_2/temp_result/pdce_2"+name_img_general+".jpg"
	console.log(temporal_text)
	document.getElementById('pdce_2_image_t').src=temporal_text

}

function cargar_pdcs1_img_t(){

	const newPost = {
		ARRAY:pdcs1_t,
    name:name_img_general
	}
	fetch('http://localhost:5000/generar_imagen_result/motor/torque/pdcs1_t',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdcs1_img_t, 500);
}

function update_pdcs1_img_t(){
	console.log("en poner imagen")
	temporal_text="static/content/cajas/motor/pdcs1_t/temp_result/pdcs1_t"+name_img_general+".jpg"
	console.log(temporal_text)
	document.getElementById('pdcs1_image_t').src=temporal_text

}

function cargar_mfbe_img_t(){

	const newPost = {
		ARRAY:mfbe_t,
    name:name_img_general
	}
	fetch('http://localhost:5000/generar_imagen_result/motor/torque/mfbe',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_mfbe_img_t, 500);
}

function update_mfbe_img_t(){
	console.log("en poner imagen")
	temporal_text="static/content/cajas/motor/mfbe/temp_result/mfbe"+name_img_general+".jpg"
	console.log(temporal_text)
	document.getElementById('mfbe_image_t').src=temporal_text

}

function cargar_g11_img_t(){

	const newPost = {
		ARRAY:g11_t,
    name:name_img_general
	}
	fetch('http://localhost:5000/generar_imagen_result/motor/torque/g11',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_g11_img_t, 500);
}

function update_g11_img_t(){
	console.log("en poner imagen")
	temporal_text="static/content/cajas/motor/g11/temp_result/g11"+name_img_general+".jpg"
	console.log(temporal_text)
	document.getElementById('g11_image_t').src=temporal_text

}

//altura
//------------------------------------------------------------------------------
function update_pdce_3_img_a(){
	console.log("en poner imagen")
	temporal_text="static/content/cajas/motor/pdce_3/temp_result/pdce_3"+name_img_general+".jpg"
	console.log(temporal_text)
	document.getElementById('pdce_3_image_a').src=temporal_text

}

function update_pdcs1_img_a(){
	console.log("en poner imagen")
	temporal_text="static/content/cajas/motor/pdcs1_2/temp_result/pdcs1_2"+name_img_general+".jpg"
	console.log(temporal_text)
	document.getElementById('pdcs1_image_a').src=temporal_text

}

//-----------------------------------------------------------------------------

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
			location.href = "historial - interior.html";
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
