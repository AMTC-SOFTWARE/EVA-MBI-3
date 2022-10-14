var name_cajas=["PDCE","PDCS1","","","","","",""]

var pdce_array=[]
var pdce_puntos=[]

var pdcs1_array=[]
var pdcs1_puntos=[]

var caja_1_msk=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var caja_2_msk=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var caja_3_msk=[]
var caja_4_msk=[]
var caja_5_msk=[]
var caja_6_msk=[]
var caja_7_msk=[]
var caja_8_msk=[]

var mask=[caja_1_msk,caja_2_msk,caja_3_msk,caja_4_msk,caja_5_msk,caja_6_msk,caja_7_msk,caja_8_msk]
var arr=[pdce_array,pdcs1_array,[],[],[],[],[],[]]
var caja_1=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var caja_2=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var caja_3=[]
var caja_4=[]
var caja_5=[]
var caja_6=[]
var caja_7=[]
var caja_8=[]

var pdce_puntos_n=[["S1",6],["S2",6],["S3",6],["S4",6],["S5",6],["S6",6],["S7",1],["S8",6],["A1",8],["A2",5],["R",2]]
var pdcs1_puntos_n=[["S1",10],["S2",6],["A1",9],["A2",8]]

var cajas_dic=[]
var motor_arr=[[],[],[],[],[],[],[],[]]

var name_img_pdce=""
var name_img_pdcs1=""

function build_dic(){
  calcular()
  compute_mask()
  for(i=0;i<motor_arr.length;i++){
      temp={}
      for(j=0;j<motor_arr[i].length;j++){
        temp[motor_arr[i][j]]=0
        if(mask[i][j]==1){
          temp[motor_arr[i][j]]=1
        }
      }
      cajas_dic[i]=temp
  }
  console.log(cajas_dic)
  add_module_vision()
}

function iniciar_pdce_1(){
  console.log("array inicial")
	console.log(pdce_array)
  for(i=0;i<pdce_puntos.length;i++){
		if(true){
			element=pdce_puntos[i][2][0]+"_"+pdce_puntos[i][2][1]
			console.log(element)
			if (pdce_array.length!=0){
				if(pdce_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdce_array.splice(pdce_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdce_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				pdce_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("array inicial")
	console.log(pdce_array)
  txt=Math.random()
	console.log(txt)
  name_img_pdce=txt
	const newPost = {
		ARRAY:pdce_array,
    name:txt
	}
	fetch('http://localhost:5000/generar_imagen/motor/vision-altura/pdce_3',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
  setTimeout(update_pdce_img, 500);

}
function iniciar_pdcs1_1(){
  for(i=0;i<pdcs1_puntos.length;i++){
		if(true){
			element=pdcs1_puntos[i][2][0]+"_"+pdcs1_puntos[i][2][1]
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
    name:txt
	}
	fetch('http://localhost:5000/generar_imagen/motor/vision-altura/pdcs1_2',{
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

function calcular_orden(){
  var pdce_puntos_orden=[["S1",1,6],["S2",1,6],["S3",1,6],["S4",1,6],["S5",1,6],["S6",1,6],["S7",1,1],["S8",1,6],["A1",1,8],["A2",1,5],["R",1,2]]
  var pdcs1_puntos_orden=[["S1",1,10],["S2",1,6],["A1",1,9],["A2",1,8]]

  temp=[]
  for(i=0;i<pdce_puntos_orden.length;i++){
    for(j=pdce_puntos_orden[i][1];j<=pdce_puntos_orden[i][2];j++){
      temp.push(pdce_puntos_orden[i][0]+"_"+j)

    }//j
  }//i
  console.log(temp)
  motor_arr[0]=temp

  temp=[]
  for(i=0;i<pdcs1_puntos_orden.length;i++){
    for(j=pdcs1_puntos_orden[i][1];j<=pdcs1_puntos_orden[i][2];j++){
      temp.push(pdcs1_puntos_orden[i][0]+"_"+j)

    }//j
  }//i
  console.log(temp)
  motor_arr[1]=temp

}

function calcular(){
  temp=[]
  for(i=0;i<pdce_puntos_n.length;i++){
    for(j=1;j<pdce_puntos_n[i][1]+1;j++){

      text=pdce_puntos_n[i][0]+"_"+j

      temp.push(text)


    }//for j
  }//for i
  motor_arr[0]=temp
  //-------------------------------------------
  temp=[]
  for(i=0;i<pdcs1_puntos_n.length;i++){
    for(j=1;j<pdcs1_puntos_n[i][1]+1;j++){

      text=pdcs1_puntos_n[i][0]+"_"+j

      temp.push(text)


    }//for j
  }//for i
  motor_arr[1]=temp
  //---------------------------------------------


  console.log(motor_arr)
  compute_mask()
}
function compute_mask(){

  for(i=0;i<mask.length;i++){
    for(j=0;j<mask[i].length;j++){
      for(k=0;k<arr[i].length;k++){
        if(arr[i][k]==motor_arr[i][j]){
          mask[i][j]=1
        }//if
      }//tercer for

    }//primer for
  }// segundo for
  console.log(mask)

}
function iniciar_pagina(){
  console.log("se inicio la pagina")
  load_pdce_puntos()
  load_pdcs1_puntos()

}

function load_pdce_puntos(){
  fetch("http://localhost:5000/info/motor/vision-altura/pdce_3")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			pdce_puntos = data.puntos
      //iniciar_pdce_1()
		})
  //console.log(pdce_puntos)

}
function load_pdcs1_puntos(){
  fetch("http://localhost:5000/info/motor/vision-altura/pdcs1_2")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			pdcs1_puntos = data.puntos
      //iniciar_pdcs1_1()
		})
  //console.log(pdcs1_puntos)

}


//------------------------------------------------------------------------------
function click_pdce_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  var X = document.getElementById("pdce_image").getBoundingClientRect();
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<pdce_puntos.length;i++){
		if(pixelx>=pdce_puntos[i][0][0] && pixelx<=pdce_puntos[i][1][0] && pixely>=pdce_puntos[i][0][1] && pixely<=pdce_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+pdce_puntos[i][2][0]+" en la posición "+pdce_puntos[i][2][1]
			element=pdce_puntos[i][2][0]+"_"+pdce_puntos[i][2][1]
			console.log(element)
			if (pdce_array.length!=0){
				if(pdce_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdce_array.splice(pdce_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					pdce_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				pdce_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(pdce_array)
  txt=Math.random()
	console.log(txt)
  name_img_pdce=txt
	const newPost = {
		ARRAY:pdce_array,
    name:txt
	}
	fetch('http://localhost:5000/generar_imagen/motor/vision-altura/pdce_3',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdce_img, 200);
}

function update_pdce_img(){
	console.log("en poner imagen")
	console.log(name_img_pdce)
	temporal_text="static/content/cajas/motor/pdce_3/temp/pdce_3"+name_img_pdce+".jpg"
	console.log(temporal_text)
	document.getElementById('pdce_image').src=temporal_text

}


//-----------------------------------------------------------------------------

function click_pdcs1_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  var X = document.getElementById("pdcs1_image").getBoundingClientRect();
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<pdcs1_puntos.length;i++){
		if(pixelx>=pdcs1_puntos[i][0][0] && pixelx<=pdcs1_puntos[i][1][0] && pixely>=pdcs1_puntos[i][0][1] && pixely<=pdcs1_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+pdcs1_puntos[i][2][0]+" en la posición "+pdcs1_puntos[i][2][1]
			element=pdcs1_puntos[i][2][0]+"_"+pdcs1_puntos[i][2][1]
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
    name:txt
	}
	fetch('http://localhost:5000/generar_imagen/motor/vision-altura/pdcs1_2',{
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
	console.log(name_img_pdcs1)
	temporal_text="static/content/cajas/motor/pdcs1_2/temp/pdcs1_2"+name_img_pdcs1+".jpg"
	console.log(temporal_text)
	document.getElementById('pdcs1_image').src=temporal_text

}


//------------------------------------------------------------------------------

function add_module_vision(){
  //calcular_orden()
	modulo_db=document.getElementById('modulo_vision').value
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
    location.replace("gestiongeneral - motor.html")
	})
	.catch(function(err) {
		console.log(err);
	});

}
