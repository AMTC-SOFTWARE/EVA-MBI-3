var name_cajas=["MFB","MFBP-2","BT","PDC_R","PDC_S","PDC_X","PDC_D","PDC_P"]

var pdcr_array=[]
var pdcr_puntos=[]

var pdcs_array=[]
var pdcs_puntos=[]

var btlu_array=[]
var btlu_puntos=[]

var pdcd_array=[]
var pdcd_puntos=[]

var pdcp_array=[]
var pdcp_puntos=[]

function iniciar_pagina(){
  console.log("se inicio la pagina")
  load_pdcr_puntos()
  load_pdcs_puntos()
  load_btlu_puntos()
  load_pdcd_puntos()
  load_pdcp_puntos()


}

function load_pdcr_puntos(){
  fetch("http://localhost:5000/info/interior/vision-altura/pdcr")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			pdcr_puntos = data.puntos
		})
  console.log(pdcr_puntos)
}
function load_pdcs_puntos(){
  fetch("http://localhost:5000/info/interior/vision-altura/pdcs")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			pdcs_puntos = data.puntos
		})
  console.log(pdcs_puntos)
}
function load_btlu_puntos(){
  fetch("http://localhost:5000/info/interior/vision-altura/btlu")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			btlu_puntos = data.puntos
		})
  console.log(btlu_puntos)
}
function load_pdcd_puntos(){
  fetch("http://localhost:5000/info/interior/vision-altura/pdcd")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			pdcd_puntos = data.puntos
		})
  console.log(pdcd_puntos)
}
function load_pdcp_puntos(){
  fetch("http://localhost:5000/info/interior/vision-altura/pdcp")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			pdcp_puntos = data.puntos
		})
  console.log(pdcp_puntos)
}



function change_caja_pdcr(){
	if(document.getElementById('pdcr_option').value==='Seleccione la caja PDCR...'){
		document.getElementById('pdcr_image').src="static/content/cajas/caja_4.jpg"
	}
	if(document.getElementById('pdcr_option').value==='PDCR'){
		document.getElementById('pdcr_image').src="static/content/cajas/caja_4.jpg"
	}
	if(document.getElementById('pdcr_option').value==='PDCR1'){
		document.getElementById('pdcr_image').src="static/content/cajas/caja_4_1.jpg"
	}

}

//------------------------------------------------------------------------------
function click_pdcr_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  var X = document.getElementById("pdcr_image").getBoundingClientRect();
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<pdcr_puntos.length;i++){
		if(pixelx>=pdcr_puntos[i][0][0] && pixelx<=pdcr_puntos[i][1][0] && pixely>=pdcr_puntos[i][0][1] && pixely<=pdcr_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+pdcr_puntos[i][2][0]+" en la posición "+pdcr_puntos[i][2][1]
			element=pdcr_puntos[i][2][0]+"_"+pdcr_puntos[i][2][1]
			console.log(element)
			if (pdcr_array.length!=0){
				if(pdcr_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdcr_array.splice(pdcr_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdcr_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				pdcr_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(pdcr_array)
	const newPost = {
		ARRAY:pdcr_array
	}
	fetch('http://localhost:5000/generar_imagen/interior/vision-altura/pdcr',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdcr_img, 200);
}

function update_pdcr_img(){
	console.log("en poner imagen")
	tmp_img=""
	for(k=0;k<pdcr_array.length;k++){
		tmp_img=tmp_img+pdcr_array[k]
	}
	console.log(tmp_img)
	temporal_text="static/content/cajas/pdcr"+tmp_img+".jpg"
	console.log(temporal_text)
	document.getElementById('pdcr_image').src=temporal_text

}


//-----------------------------------------------------------------------------

function click_pdcs_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  var X = document.getElementById("pdcs_image").getBoundingClientRect();
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<pdcs_puntos.length;i++){
		if(pixelx>=pdcs_puntos[i][0][0] && pixelx<=pdcs_puntos[i][1][0] && pixely>=pdcs_puntos[i][0][1] && pixely<=pdcs_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+pdcs_puntos[i][2][0]+" en la posición "+pdcs_puntos[i][2][1]
			element=pdcs_puntos[i][2][0]+"_"+pdcs_puntos[i][2][1]
			console.log(element)
			if (pdcs_array.length!=0){
				if(pdcs_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdcs_array.splice(pdcs_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdcs_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				pdcs_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(pdcs_array)
	const newPost = {
		ARRAY:pdcs_array
	}
	fetch('http://localhost:5000/generar_imagen/interior/vision-altura/pdcs',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdcs_img, 200);
}

function update_pdcs_img(){
	console.log("en poner imagen")
	tmp_img=""
	for(k=0;k<pdcs_array.length;k++){
		tmp_img=tmp_img+pdcs_array[k]
	}
	console.log(tmp_img)
	temporal_text="static/content/cajas/pdcs"+tmp_img+".jpg"
	console.log(temporal_text)
	document.getElementById('pdcs_image').src=temporal_text

}

//-----------------------------------------------------------------------------
function click_btlu_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  var X = document.getElementById("btlu_image").getBoundingClientRect();
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<btlu_puntos.length;i++){
		if(pixelx>=btlu_puntos[i][0][0] && pixelx<=btlu_puntos[i][1][0] && pixely>=btlu_puntos[i][0][1] && pixely<=btlu_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+btlu_puntos[i][2][0]+" en la posición "+btlu_puntos[i][2][1]
			element=btlu_puntos[i][2][0]+"_"+btlu_puntos[i][2][1]
			console.log(element)
			if (btlu_array.length!=0){
				if(btlu_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					btlu_array.splice(btlu_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					btlu_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				btlu_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(btlu_array)
	const newPost = {
		ARRAY:btlu_array
	}
	fetch('http://localhost:5000/generar_imagen/interior/vision-altura/btlu',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_btlu_img, 200);
}

function update_btlu_img(){
	console.log("en poner imagen")
	tmp_img=""
	for(k=0;k<btlu_array.length;k++){
		tmp_img=tmp_img+btlu_array[k]
	}
	console.log(tmp_img)
	temporal_text="static/content/cajas/btlu"+tmp_img+".jpg"
	console.log(temporal_text)
	document.getElementById('btlu_image').src=temporal_text

}

//-----------------------------------------------------------------------------
function click_pdcd_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  var X = document.getElementById("pdcd_image").getBoundingClientRect();
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<pdcd_puntos.length;i++){
		if(pixelx>=pdcd_puntos[i][0][0] && pixelx<=pdcd_puntos[i][1][0] && pixely>=pdcd_puntos[i][0][1] && pixely<=pdcd_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+pdcd_puntos[i][2][0]+" en la posición "+pdcd_puntos[i][2][1]
			element=pdcd_puntos[i][2][0]+"_"+pdcd_puntos[i][2][1]
			console.log(element)
			if (pdcd_array.length!=0){
				if(pdcd_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdcd_array.splice(pdcd_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdcd_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				pdcd_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(pdcd_array)
	const newPost = {
		ARRAY:pdcd_array
	}
	fetch('http://localhost:5000/generar_imagen/4',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdcd_img, 200);
}

function update_pdcd_img(){
	console.log("en poner imagen")
	tmp_img=""
	for(k=0;k<pdcd_array.length;k++){
		tmp_img=tmp_img+pdcd_array[k]
	}
	console.log(tmp_img)
	temporal_text="static/content/cajas/caja_4"+tmp_img+".jpg"
	console.log(temporal_text)
	document.getElementById('pdcd_image').src=temporal_text

}
//------------------------------------------------------------------------------
function click_pdcp_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  var X = document.getElementById("pdcp_image").getBoundingClientRect();
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<pdcp_puntos.length;i++){
		if(pixelx>=pdcp_puntos[i][0][0] && pixelx<=pdcp_puntos[i][1][0] && pixely>=pdcp_puntos[i][0][1] && pixely<=pdcp_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+pdcp_puntos[i][2][0]+" en la posición "+pdcp_puntos[i][2][1]
			element=pdcp_puntos[i][2][0]+"_"+pdcp_puntos[i][2][1]
			console.log(element)
			if (pdcp_array.length!=0){
				if(pdcp_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdcp_array.splice(pdcp_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdcp_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				pdcp_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(pdcp_array)
	const newPost = {
		ARRAY:pdcp_array
	}
	fetch('http://localhost:5000/generar_imagen/4',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdcp_img, 200);
}

function update_pdcp_img(){
	console.log("en poner imagen")
	tmp_img=""
	for(k=0;k<pdcp_array.length;k++){
		tmp_img=tmp_img+pdcp_array[k]
	}
	console.log(tmp_img)
	temporal_text="static/content/cajas/caja_4"+tmp_img+".jpg"
	console.log(temporal_text)
	document.getElementById('pdcp_image').src=temporal_text

}
//------------------------------------------------------------------------------
function add_module_vision(){

	modulo_db=document.getElementById('modulo_vision').value
	const newPost = {
		MODULO:modulo_db,
		"MFB": [],
		"MFBP-2": [],
		"BT": [],
		"PDC_R": pdcr_array,
		"PDC_S": pdcs_array,
		"PDC_X": btlu_array,
		"PDC_D": pdcd_array,
		"PDC_P": pdcp_array
	}
	fetch('http://localhost:5000/database/modulos_fusibles',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);

	})
	.catch(function(err) {
		console.log(err);
	});
	fetch('http://localhost:5000/database/modulos_alturas',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){

		console.log(data);
	})
	.catch(function(err) {
		console.log(err);
	});

}

////////// Habilitar o Deshabilitar Campos de texto en función del Checkbox ///////////
function comprobarpdcp(obj){   
  if (obj.checked){
    document.getElementById('PDC-P').disabled = false;
    document.getElementById("PDC-P").focus();
  } else{
    document.getElementById('PDC-P').disabled = true;
    document.getElementById('PDC-P').value = "";
  }     
}
function comprobarpdcd(obj){   
  if (obj.checked){
    document.getElementById('PDC-D').disabled = false;
    document.getElementById("PDC-D").focus();
  } else{
    document.getElementById('PDC-D').disabled = true;
    document.getElementById('PDC-D').value = "";
  }     
}
function comprobarmfbp1(obj){   
  if (obj.checked){
    document.getElementById('MFB-P1').disabled = false;
    document.getElementById("MFB-P1").focus();
  } else{
    document.getElementById('MFB-P1').disabled = true;
    document.getElementById('MFB-P1').value = "";
  }     
}
function comprobarmfbs(obj){   
  if (obj.checked){
    document.getElementById('MFB-S').disabled = false;
    document.getElementById("MFB-S").focus();
  } else{
    document.getElementById('MFB-S').disabled = true;
    document.getElementById('MFB-S').value = "";
  }     
}
function comprobarmfbp2(obj){   
  if (obj.checked){
    document.getElementById('MFB-P2').disabled = false;
    document.getElementById("MFB-P2").focus();
  } else{
    document.getElementById('MFB-P2').disabled = true;
    document.getElementById('MFB-P2').value = "";
  }     
}
function comprobarbt(obj){   
  if (obj.checked){
    document.getElementById('BATTERY').disabled = false;
    document.getElementById("BATTERY").focus();
  } else{
    document.getElementById('BATTERY').disabled = true;
    document.getElementById('BATTERY').value = "";
  }     
}
function comprobarbattery2(obj){   
  if (obj.checked){
    document.getElementById('BATTERY-2').disabled = false;
    document.getElementById("BATTERY-2").focus();
  } else{
    document.getElementById('BATTERY-2').disabled = true;
    document.getElementById('BATTERY-2').value = "";
  }     
}
function comprobarpdcr(obj){   
  if (obj.checked){
    document.getElementById('PDC-R').disabled = false;
    document.getElementById("PDC-R").focus();
  } else{
    document.getElementById('PDC-R').disabled = true;
    document.getElementById('PDC-R').value = "";
  }     
}
function comprobarpdcrmid(obj){   
  if (obj.checked){
    document.getElementById('PDC-RMID').disabled = false;
    document.getElementById("PDC-RMID").focus();
  } else{
    document.getElementById('PDC-RMID').disabled = true;
    document.getElementById('PDC-RMID').value = "";
  }     
}
/////////// Seleccionar Caja PDCR para agregar su código QR //////////////////
function change_caja_pdcr(){
	if(document.getElementById('pdcr_option').value==='Seleccione la caja PDCR...'){
		document.getElementById('caja_pdcr_t').style.display="none"
		document.getElementById('caja_pdcr_mid_t').style.display="none"
	}
	if(document.getElementById('pdcr_option').value==='PDCR'){
		console.log("pdcr")
		document.getElementById('caja_pdcr_t').style.display="block"
		document.getElementById('caja_pdcr_mid_t').style.display="none"
    //document.getElementById('pdcr_image').src="static/content/cajas/interior/pdcr/pdcr.jpg"
	}
	if(document.getElementById('pdcr_option').value==='PDCR_MID'){
		console.log("pdcr_mid")
		document.getElementById('caja_pdcr_t').style.display="none"
		document.getElementById('caja_pdcr_mid_t').style.display="block"
	    //document.getElementById('pdcr_1_image').src="static/content/cajas/interior/pdcr_1/pdcr_1.jpg"
	}
}