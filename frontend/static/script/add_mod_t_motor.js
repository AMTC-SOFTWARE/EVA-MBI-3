var pdce_1_array=[]
var pdce_1_puntos=[]

var pdce_2_array=[]
var pdce_2_puntos=[]

var pdcs1_array=[]
var pdcs1_puntos=[]

var mfbe_array=[]
var mfbe_puntos=[]

var g11_array=[]
var g11_puntos=[]

var motor_cajas=["PDC_E_2","","PDC_E_1","PDC-S1","MFBE","G11","",""]
var motor_ca=[pdce_2_array,[],pdce_1_array,pdcs1_array,mfbe_array,g11_array,[],[]]
var motor=[["E1","E2"],[],["E1"],["E1"],["A21","A22","A23","A24","A25","A26","A27","A28","A29","A30","A20"],["G11"],[],[]]
var motor_arr=[[3.5,3.5],[],[8],[8],[16,8,8,8,8,16,8,8,8,8,16],[16],[],[]]
var mask_motor=[[0,0],[],[0],[0],[0,0,0,0,0,0,0,0,0,0,0],[0],[],[]]
var motor_db=[[0,0],[],[0],[0],[0,0,0,0,0,0,0,0,0,0,0],[0],[],[]]

var name_img_pdce_1=""
var name_img_pdce_2=""
var name_img_pdcs1=""
var name_img_mfbe=""
var name_img_g11=""

cajas_dic=[]

function write_final_vector_db(){
  for(i=0;i<motor.length;i++){
    temp={}
    for(j=0;j<motor[i].length;j++){
      temp[motor[i][j]]=0
      if(mask_motor[i][j]==1){
        temp[motor[i][j]]=1
      }
    }
    cajas_dic[i]=temp
  }

}

function write_final_vector_db_2(){
  for(i=0;i<motor_db.length;i++){
    for(j=0;j<motor_db[i].length;j++){
      if(mask_motor[i][j]==1){
        motor_db[i][j]=motor_arr[i][j]
      }//if
    }//for j
  }// for i
  console.log(motor_db)
}
function compute_mask(){

  for(i=0;i<motor.length;i++){
    for(j=0;j<motor[i].length;j++){
      for(k=0;k<motor_ca[i].length;k++){
        if(motor_ca[i][k]==motor[i][j]){
          mask_motor[i][j]=1
        }//if
      }//tercer for
    }//primer for
  }// segundo for

  console.log(mask_motor)
}


function iniciar_pagina(){
  console.log("se inicio la pagina")
  load_pdce_1_puntos()
  load_pdce_2_puntos()
  load_pdcs1_puntos()
  load_mfbe_puntos()
  load_g11_puntos()
}


function load_pdce_1_puntos(){
  fetch("http://localhost:5000/info/motor/torque/pdce_1")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			pdce_1_puntos = data.puntos
      //iniciar_pdce_1_img()
		})
  //console.log(pdce_1_puntos)
}
function load_pdce_2_puntos(){
  fetch("http://localhost:5000/info/motor/torque/pdce_2")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			pdce_2_puntos = data.puntos
      //iniciar_pdce_2_img()
		})
  //console.log(pdce_2_puntos)
}
function load_pdcs1_puntos(){
  fetch("http://localhost:5000/info/motor/torque/pdcs1_t")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			pdcs1_puntos = data.puntos
      //iniciar_pdcs1_img()
		})
  //console.log(pdcs1_puntos)
}
function load_mfbe_puntos(){
  fetch("http://localhost:5000/info/motor/torque/mfbe")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			mfbe_puntos = data.puntos
      //iniciar_mfbe_img()
		})
  //console.log(mfbe_puntos)
}
function load_g11_puntos(){
  fetch("http://localhost:5000/info/motor/torque/g11")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			g11_puntos = data.puntos
      //iniciar_g11_img()
		})
  //console.log(g11_puntos)
}


//------------------------------------------------------------------------------
function click_pdce_1_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  console.log(coor)
  var X = document.getElementById("pdce_1_image").getBoundingClientRect();
  console.log(X)
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<pdce_1_puntos.length;i++){
		if(pixelx>=pdce_1_puntos[i][0][0] && pixelx<=pdce_1_puntos[i][1][0] && pixely>=pdce_1_puntos[i][0][1] && pixely<=pdce_1_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+pdce_1_puntos[i][2][0]
			element=pdce_1_puntos[i][2][0]
			console.log(element)
			if (pdce_1_array.length!=0){
				if(pdce_1_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdce_1_array.splice(pdce_1_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdce_1_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				pdce_1_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(pdce_1_array)
  txt=Math.random()
	console.log(txt)
  name_img_pdce_1=txt
	const newPost = {
		ARRAY:pdce_1_array,
    name:name_img_pdce_1
	}
	fetch('http://localhost:5000/generar_imagen/motor/torque/pdce_1',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdce_1_img, 200);
}

function update_pdce_1_img(){
	console.log("en poner imagen")
	temporal_text="static/content/cajas/motor/pdce_1/temp/pdce_1"+name_img_pdce_1+".jpg"
	console.log(temporal_text)
	document.getElementById('pdce_1_image').src=temporal_text

}

function iniciar_pdce_1_img(){

	for(i=0;i<pdce_1_puntos.length;i++){
		if(true){
			//var temporal_text="Esta dentro de "+pdce_1_puntos[i][2][0]
			element=pdce_1_puntos[i][2][0]
			console.log(element)
			if (pdce_1_array.length!=0){
				if(pdce_1_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdce_1_array.splice(pdce_1_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdce_1_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				pdce_1_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(pdce_1_array)
  txt=Math.random()
	console.log(txt)
  name_img_pdce_1=txt
	const newPost = {
		ARRAY:pdce_1_array,
    name:name_img_pdce_1
	}
	fetch('http://localhost:5000/generar_imagen/motor/torque/pdce_1',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdce_1_img, 500);
}

//---------------------------------------------------------------------------
//------------------------------------------------------------------------------
function click_pdce_2_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  console.log(coor)
  var X = document.getElementById("pdce_2_image").getBoundingClientRect();
  console.log(X)
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<pdce_2_puntos.length;i++){
		if(pixelx>=pdce_2_puntos[i][0][0] && pixelx<=pdce_2_puntos[i][1][0] && pixely>=pdce_2_puntos[i][0][1] && pixely<=pdce_2_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+pdce_2_puntos[i][2][0]
			element=pdce_2_puntos[i][2][0]
			console.log(element)
			if (pdce_2_array.length!=0){
				if(pdce_2_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdce_2_array.splice(pdce_2_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdce_2_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				pdce_2_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(pdce_2_array)
  txt=Math.random()
	console.log(txt)
  name_img_pdce_2=txt
	const newPost = {
		ARRAY:pdce_2_array,
    name:name_img_pdce_2
	}
	fetch('http://localhost:5000/generar_imagen/motor/torque/pdce_2',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdce_2_img, 200);
}

function update_pdce_2_img(){
	console.log("en poner imagen")
	temporal_text="static/content/cajas/motor/pdce_2/temp/pdce_2"+name_img_pdce_2+".jpg"
	console.log(temporal_text)
	document.getElementById('pdce_2_image').src=temporal_text

}

function iniciar_pdce_2_img(){

	for(i=0;i<pdce_2_puntos.length;i++){
		if(true){
			element=pdce_2_puntos[i][2][0]
			//console.log(element)
			if (pdce_2_array.length!=0){
				if(pdce_2_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdce_2_array.splice(pdce_2_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdce_2_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				pdce_2_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(pdce_2_array)
  txt=Math.random()
	console.log(txt)
  name_img_pdce_2=txt
	const newPost = {
		ARRAY:pdce_2_array,
    name:name_img_pdce_2
	}
	fetch('http://localhost:5000/generar_imagen/motor/torque/pdce_2',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdce_2_img, 500);
}
//---------------------------------------------------------------------------
//------------------------------------------------------------------------------
function click_pdcs1_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  console.log(coor)
  var X = document.getElementById("pdcs1_image").getBoundingClientRect();
  console.log(X)
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<pdcs1_puntos.length;i++){
		if(pixelx>=pdcs1_puntos[i][0][0] && pixelx<=pdcs1_puntos[i][1][0] && pixely>=pdcs1_puntos[i][0][1] && pixely<=pdcs1_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+pdcs1_puntos[i][2][0]
			element=pdcs1_puntos[i][2][0]
			console.log(element)
			if (pdcs1_array.length!=0){
				if(pdcs1_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdcs1_array.splice(pdcs1_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdcs1_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				pdcs1_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(pdcs1_array)
  txt=Math.random()
	console.log(txt)
  name_img_pdcs1=txt
	const newPost = {
		ARRAY:pdcs1_array,
    name:name_img_pdcs1
	}
	fetch('http://localhost:5000/generar_imagen/motor/torque/pdcs1_t',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdcs1_img, 200);
}

function update_pdcs1_img(){
	console.log("en poner imagen")
	temporal_text="static/content/cajas/motor/pdcs1_t/temp/pdcs1_t"+name_img_pdcs1+".jpg"
	console.log(temporal_text)
	document.getElementById('pdcs1_image').src=temporal_text

}

function iniciar_pdcs1_img(){

	for(i=0;i<pdcs1_puntos.length;i++){
		if(true){
			element=pdcs1_puntos[i][2][0]
			console.log(element)
			if (pdcs1_array.length!=0){
				if(pdcs1_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdcs1_array.splice(pdcs1_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdcs1_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				pdcs1_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(pdcs1_array)
  txt=Math.random()
	console.log(txt)
  name_img_pdcs1=txt
	const newPost = {
		ARRAY:pdcs1_array,
    name:name_img_pdcs1
	}
	fetch('http://localhost:5000/generar_imagen/motor/torque/pdcs1_t',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdcs1_img, 500);
}
//---------------------------------------------------------------------------
//------------------------------------------------------------------------------
function click_mfbe_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  console.log(coor)
  var X = document.getElementById("mfbe_image").getBoundingClientRect();
  console.log(X)
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<mfbe_puntos.length;i++){
		if(pixelx>=mfbe_puntos[i][0][0] && pixelx<=mfbe_puntos[i][1][0] && pixely>=mfbe_puntos[i][0][1] && pixely<=mfbe_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+mfbe_puntos[i][2][0]
			element=mfbe_puntos[i][2][0]
			console.log(element)
			if (mfbe_array.length!=0){
				if(mfbe_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					mfbe_array.splice(mfbe_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					mfbe_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				mfbe_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(mfbe_array)
  txt=Math.random()
	console.log(txt)
  name_img_mfbe=txt
	const newPost = {
		ARRAY:mfbe_array,
    name:name_img_mfbe
	}
	fetch('http://localhost:5000/generar_imagen/motor/torque/mfbe',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_mfbe_img, 200);
}

function update_mfbe_img(){
	console.log("en poner imagen")
	temporal_text="static/content/cajas/motor/mfbe/temp/mfbe"+name_img_mfbe+".jpg"
	console.log(temporal_text)
	document.getElementById('mfbe_image').src=temporal_text

}

function iniciar_mfbe_img(){

	for(i=0;i<mfbe_puntos.length;i++){
		if(true){
			element=mfbe_puntos[i][2][0]
			console.log(element)
			if (mfbe_array.length!=0){
				if(mfbe_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					mfbe_array.splice(mfbe_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					mfbe_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				mfbe_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(mfbe_array)
  txt=Math.random()
	console.log(txt)
  name_img_mfbe=txt
	const newPost = {
		ARRAY:mfbe_array,
    name:name_img_mfbe
	}
	fetch('http://localhost:5000/generar_imagen/motor/torque/mfbe',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_mfbe_img, 500);
}

//---------------------------------------------------------------------------
//------------------------------------------------------------------------------
function click_g11_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  console.log(coor)
  var X = document.getElementById("g11_image").getBoundingClientRect();
  console.log(X)
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<g11_puntos.length;i++){
		if(pixelx>=g11_puntos[i][0][0] && pixelx<=g11_puntos[i][1][0] && pixely>=g11_puntos[i][0][1] && pixely<=g11_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+g11_puntos[i][2][0]
			element=g11_puntos[i][2][0]
			console.log(element)
			if (g11_array.length!=0){
				if(g11_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					g11_array.splice(g11_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					g11_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				g11_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(g11_array)
  txt=Math.random()
	console.log(txt)
  name_img_g11=txt
	const newPost = {
		ARRAY:g11_array,
    name:name_img_g11
	}
	fetch('http://localhost:5000/generar_imagen/motor/torque/g11',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_g11_img, 200);
}

function update_g11_img(){
	console.log("en poner imagen")
	temporal_text="static/content/cajas/motor/g11/temp/g11"+name_img_g11+".jpg"
	console.log(temporal_text)
	document.getElementById('g11_image').src=temporal_text

}

function iniciar_g11_img(){

	for(i=0;i<g11_puntos.length;i++){
		if(true){
			element=g11_puntos[i][2][0]
			console.log(element)
			if (g11_array.length!=0){
				if(g11_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					g11_array.splice(g11_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					g11_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				g11_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(g11_array)
  txt=Math.random()
	console.log(txt)
  name_img_g11=txt
	const newPost = {
		ARRAY:g11_array,
    name:name_img_g11
	}
	fetch('http://localhost:5000/generar_imagen/motor/torque/g11',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_g11_img, 500);
}


//---------------------------------------------------------------------------



function add_module_torque(){
  compute_mask()
  write_final_vector_db()
  add_module_motor()
  //add_module_interior_2()
}


function add_module_motor(){
	modulo_db=document.getElementById('modulo_torque').value
	const newPost = {
		MODULO:modulo_db,
    "CAJA_1": cajas_dic[0],
		"CAJA_2": cajas_dic[1],
		"CAJA_3": cajas_dic[2],
		"CAJA_4": cajas_dic[3],
		"CAJA_5": cajas_dic[4],
		"CAJA_6": cajas_dic[5],
		"CAJA_7": cajas_dic[6],
		"CAJA_8": cajas_dic[7]
	}
	fetch('http://localhost:5000/database/modulos_torques',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
    location.replace("gestiongeneral - motor.html")
	})
	.catch(function(err) {
		console.log(err);
	});

}
