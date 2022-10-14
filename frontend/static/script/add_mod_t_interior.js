var pdcp_array=[]
var pdcp_puntos=[]

var pdcd_array=[]
var pdcd_puntos=[]

var mfbp1_array=[]
var mfbp1_puntos=[]

var mfbs_array=[]
var mfbs_puntos=[]

var mfbp2_array=[]
var mfbp2_puntos=[]

var pdcr_array=[]
var pdcr_puntos=[]

var bt_array=[]
var bt_puntos=[]

var interior_1_cajas=["PDC_P","PDC_D","MFB_P1","MFBS","MFB_P2","PDC_R","",""]
var interior_1_ca=[pdcp_array,pdcd_array,mfbp1_array,mfbs_array,mfbp2_array,[],[]]
var interior_1=[["E1"],["E1"],["A47","A46","A45","A44","A43","A41","A42"],["A52","A53","A54","A55","A56","A51"],["A21","A22","A23","A24","A25","A26","A27","A28","A29","A30","A20"],["E1"],[],[]]
var interior_1_arr=[[8],[8],[16,16,8,8,8,16,8],[16,8,8,8,8,16],[8,8,8,8,20,8,8,8,8,20,20],[16],[],[]]
var interior_2_cajas=["MFBS","MFBP-2","BT","PDC_R","PDC_S","PDC_X","PDC_D","PDC_P"]
var interior_2_ca=[mfbs_array,mfbp2_array,bt_array,[],[],[],[],[]]
var interior_2=[["A52","A53","A54","A55","A56","A51"],["A21","A22","A23","A24","A25","A26","A27","A28","A29","A30","A20"],["BT"],[],[],[],[],[]]
var interior_2_arr=[[16,8,8,8,8,16],[8,8,8,8,20,8,8,8,8,20,20],[6.5],[],[],[],[],[]]
var mask_interior_1=[[0],[0],[0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0],[],[]]
var mask_interior_2=[[0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0],[],[],[],[],[]]
var interior_1_db=[[0],[0],[0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0],[],[]]
var interior_2_db=[[0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0],[],[],[],[],[]]

cajas_dic_1=[]
cajas_dic_2=[]

function write_final_vector_db(){
  for(i=0;i<interior_1.length;i++){
    temp={}
    for(j=0;j<interior_1[i].length;j++){
      temp[interior_1[i][j]]=0
      if(mask_interior_1[i][j]==1){
        temp[interior_1[i][j]]=1
      }
    }
    cajas_dic_1[i]=temp
  }
  //

  for(i=0;i<interior_2.length;i++){
    temp={}
    for(j=0;j<interior_2[i].length;j++){
      temp[interior_2[i][j]]=0
      if(mask_interior_2[i][j]==1){
        temp[interior_2[i][j]]=1
      }
    }
    cajas_dic_2[i]=temp
  }
}


function write_final_vector_db_2(){
  for(i=0;i<interior_1_db.length;i++){
    for(j=0;j<interior_1_db[i].length;j++){
      if(mask_interior_1[i][j]==1){
        interior_1_db[i][j]=interior_1_arr[i][j]
      }//if
    }//for j
  }// for i

  for(i=0;i<interior_2_db.length;i++){
    for(j=0;j<interior_2_db[i].length;j++){
      if(mask_interior_2[i][j]==1){
        interior_2_db[i][j]=interior_2_arr[i][j]
      }//if
    }//for j
  }// for i
  console.log(interior_1_db)
  console.log(interior_2_db)
}

function compute_mask(){

  for(i=0;i<interior_1.length;i++){
    for(j=0;j<interior_1[i].length;j++){
      for(k=0;k<interior_1_ca[i].length;k++){
        if(interior_1_ca[i][k]==interior_1[i][j]){
          mask_interior_1[i][j]=1
        }//if
      }//tercer for

    }//primer for
  }// segundo for

  for(i=0;i<interior_2.length;i++){
    for(j=0;j<interior_2[i].length;j++){
      for(k=0;k<interior_2_ca[i].length;k++){
        if(interior_2_ca[i][k]==interior_2[i][j]){
          mask_interior_2[i][j]=1
        }//if
      }//tercer for

    }//primer for
  }// segundo for
  console.log(mask_interior_1)
  console.log(mask_interior_2)
}


function iniciar_pagina(){
  console.log("se inicio la pagina")
  load_pdcp_puntos()
  load_pdcd_puntos()
  load_mfbp1_puntos()
  load_mfbs_puntos()
  load_mfbp2_puntos()
  load_pdcr_puntos()
  load_bt_puntos()
}
function load_pdcp_puntos(){
  fetch("http://localhost:5000/info/interior/torque/pdcp")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			pdcp_puntos = data.puntos
      //iniciar_pdcp_img()
		})
  //console.log(pdcp_puntos)
}
function load_pdcd_puntos(){
  fetch("http://localhost:5000/info/interior/torque/pdcd2")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			pdcd_puntos = data.puntos
      //iniciar_pdcd_img()
		})
  //console.log(pdcd_puntos)
}
function load_mfbp1_puntos(){
  fetch("http://localhost:5000/info/interior/torque/mfbp1")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			mfbp1_puntos = data.puntos
      //iniciar_mfbp1_img()
		})
  //console.log(mfbp1_puntos)
}
function load_mfbs_puntos(){
  fetch("http://localhost:5000/info/interior/torque/mfbs")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			mfbs_puntos = data.puntos
      //iniciar_mfb_img()
		})
  //console.log(mfb_puntos)
}
function load_mfbp2_puntos(){
  fetch("http://localhost:5000/info/interior/torque/mfbp2")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			mfbp2_puntos = data.puntos
      //iniciar_mfbp2_img()
		})
  //console.log(mfbp2_puntos)
}
function load_pdcr_puntos(){
  fetch("http://localhost:5000/info/interior/torque/pdcr2")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			pdcr_puntos = data.puntos
      //iniciar_pdcr_img()
		})
  //console.log(pdcr_puntos)
}
function load_bt_puntos(){
  fetch("http://localhost:5000/info/interior/torque/bt")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			bt_puntos = data.puntos
      //iniciar_bt_img()
		})
  //console.log(bt_puntos)
}


//------------------------------------------------------------------------------
function click_pdcp_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  console.log(coor)
  var X = document.getElementById("pdcp_image").getBoundingClientRect();
  console.log(X)
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<pdcp_puntos.length;i++){
		if(pixelx>=pdcp_puntos[i][0][0] && pixelx<=pdcp_puntos[i][1][0] && pixely>=pdcp_puntos[i][0][1] && pixely<=pdcp_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+pdcp_puntos[i][2][0]
			element=pdcp_puntos[i][2][0]
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
  txt=Math.random()
	console.log(txt)
  name_img_pdcp=txt
	const newPost = {
		ARRAY:pdcp_array,
    name:name_img_pdcp
	}
	fetch('http://localhost:5000/generar_imagen/interior/torque/pdcp',{
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
	temporal_text="static/content/cajas/interior/pdcp/temp/pdcp"+name_img_pdcp+".jpg"
	console.log(temporal_text)
	document.getElementById('pdcp_image').src=temporal_text

}

function iniciar_pdcp_img(){

	for(i=0;i<pdcp_puntos.length;i++){
		if(true){
			element=pdcp_puntos[i][2][0]
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
  txt=Math.random()
	console.log(txt)
  name_img_pdcp=txt
	const newPost = {
		ARRAY:pdcp_array,
    name:name_img_pdcp
	}
	fetch('http://localhost:5000/generar_imagen/interior/torque/pdcp',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdcp_img, 500);
}
//---------------------------------------------------------------------------
//------------------------------------------------------------------------------
function click_pdcd_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  console.log(coor)
  var X = document.getElementById("pdcd_image").getBoundingClientRect();
  console.log(X)
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<pdcd_puntos.length;i++){
		if(pixelx>=pdcd_puntos[i][0][0] && pixelx<=pdcd_puntos[i][1][0] && pixely>=pdcd_puntos[i][0][1] && pixely<=pdcd_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+pdcd_puntos[i][2][0]
			element=pdcd_puntos[i][2][0]
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
  txt=Math.random()
	console.log(txt)
  name_img_pdcd=txt
	const newPost = {
		ARRAY:pdcd_array,
    name:name_img_pdcd
	}
	fetch('http://localhost:5000/generar_imagen/interior/torque/pdcd2',{
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
	temporal_text="static/content/cajas/interior/pdcd2/temp/pdcd2"+name_img_pdcd+".jpg"
	console.log(temporal_text)
	document.getElementById('pdcd_image').src=temporal_text

}

function iniciar_pdcd_img(){

	for(i=0;i<pdcd_puntos.length;i++){
		if(true){
			element=pdcd_puntos[i][2][0]
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
  txt=Math.random()
	console.log(txt)
  name_img_pdcd=txt
	const newPost = {
		ARRAY:pdcd_array,
    name:name_img_pdcd
	}
	fetch('http://localhost:5000/generar_imagen/interior/torque/pdcd2',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdcd_img, 500);
}
//---------------------------------------------------------------------------
//------------------------------------------------------------------------------
function click_mfbp1_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  console.log(coor)
  var X = document.getElementById("mfbp1_image").getBoundingClientRect();
  console.log(X)
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<mfbp1_puntos.length;i++){
		if(pixelx>=mfbp1_puntos[i][0][0] && pixelx<=mfbp1_puntos[i][1][0] && pixely>=mfbp1_puntos[i][0][1] && pixely<=mfbp1_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+mfbp1_puntos[i][2][0]
			element=mfbp1_puntos[i][2][0]
			console.log(element)
			if (mfbp1_array.length!=0){
				if(mfbp1_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					mfbp1_array.splice(mfbp1_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					mfbp1_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				mfbp1_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(mfbp1_array)
  txt=Math.random()
	console.log(txt)
  name_img_mfbp1=txt
	const newPost = {
		ARRAY:mfbp1_array,
    name:name_img_mfbp1
	}
	fetch('http://localhost:5000/generar_imagen/interior/torque/mfbp1',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_mfbp1_img, 200);
}

function update_mfbp1_img(){
	console.log("en poner imagen")

	temporal_text="static/content/cajas/interior/mfbp1/temp/mfbp1"+name_img_mfbp1+".jpg"
	console.log(temporal_text)
	document.getElementById('mfbp1_image').src=temporal_text

}

function iniciar_mfbp1_img(){

	for(i=0;i<mfbp1_puntos.length;i++){
		if(true){
			element=mfbp1_puntos[i][2][0]
			console.log(element)
			if (mfbp1_array.length!=0){
				if(mfbp1_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					mfbp1_array.splice(mfbp1_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					mfbp1_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				mfbp1_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(mfbp1_array)
  txt=Math.random()
	console.log(txt)
  name_img_mfbp1=txt
	const newPost = {
		ARRAY:mfbp1_array,
    name:name_img_mfbp1
	}
	fetch('http://localhost:5000/generar_imagen/interior/torque/mfbp1',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_mfbp1_img, 500);
}
//---------------------------------------------------------------------------
//------------------------------------------------------------------------------
function click_mfbs_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  console.log(coor)
  var X = document.getElementById("mfbs_image").getBoundingClientRect();
  console.log(X)
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<mfbs_puntos.length;i++){
		if(pixelx>=mfbs_puntos[i][0][0] && pixelx<=mfbs_puntos[i][1][0] && pixely>=mfbs_puntos[i][0][1] && pixely<=mfbs_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+mfbs_puntos[i][2][0]
			element=mfbs_puntos[i][2][0]
			console.log(element)
			if (mfbs_array.length!=0){
				if(mfbs_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					mfbs_array.splice(mfbs_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					mfbs_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				mfbs_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(mfbs_array)
  txt=Math.random()
	console.log(txt)
  name_img_mfbs=txt
	const newPost = {
		ARRAY:mfbs_array,
    name:name_img_mfbs
	}
	fetch('http://localhost:5000/generar_imagen/interior/torque/mfbs',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_mfbs_img, 200);
}

function update_mfbs_img(){
	console.log("en poner imagen")
	temporal_text="static/content/cajas/interior/mfbs/temp/mfbs"+name_img_mfbs+".jpg"
	console.log(temporal_text)
	document.getElementById('mfbs_image').src=temporal_text

}

function iniciar_mfbs_img(){

	for(i=0;i<mfbs_puntos.length;i++){
		if(true){
			element=mfbs_puntos[i][2][0]
			console.log(element)
			if (mfbs_array.length!=0){
				if(mfbs_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					mfbs_array.splice(mfbs_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					mfbs_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				mfbs_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(mfbs_array)
  txt=Math.random()
	console.log(txt)
  name_img_mfbs=txt
	const newPost = {
		ARRAY:mfbs_array,
    name:name_img_mfbs
	}
	fetch('http://localhost:5000/generar_imagen/interior/torque/mfbs',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_mfbs_img, 500);
}
//---------------------------------------------------------------------------
//------------------------------------------------------------------------------
function click_mfbp2_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  console.log(coor)
  var X = document.getElementById("mfbp2_image").getBoundingClientRect();
  console.log(X)
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<mfbp2_puntos.length;i++){
		if(pixelx>=mfbp2_puntos[i][0][0] && pixelx<=mfbp2_puntos[i][1][0] && pixely>=mfbp2_puntos[i][0][1] && pixely<=mfbp2_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+mfbp2_puntos[i][2][0]
			element=mfbp2_puntos[i][2][0]
			console.log(element)
			if (mfbp2_array.length!=0){
				if(mfbp2_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					mfbp2_array.splice(mfbp2_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					mfbp2_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				mfbp2_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(mfbp2_array)
  txt=Math.random()
	console.log(txt)
  name_img_mfbp2=txt
	const newPost = {
		ARRAY:mfbp2_array,
    name:name_img_mfbp2
	}
	fetch('http://localhost:5000/generar_imagen/interior/torque/mfbp2',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_mfbp2_img, 200);
}

function update_mfbp2_img(){
	console.log("en poner imagen")
  temporal_text="static/content/cajas/interior/mfbp2/temp/mfbp2"+name_img_mfbp2+".jpg"
	console.log(temporal_text)
	document.getElementById('mfbp2_image').src=temporal_text

}

function iniciar_mfbp2_img(){

	for(i=0;i<mfbp2_puntos.length;i++){
		if(true){
			element=mfbp2_puntos[i][2][0]
			console.log(element)
			if (mfbp2_array.length!=0){
				if(mfbp2_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					mfbp2_array.splice(mfbp2_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					mfbp2_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				mfbp2_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(mfbp2_array)
  txt=Math.random()
	console.log(txt)
  name_img_mfbp2=txt
	const newPost = {
		ARRAY:mfbp2_array,
    name:name_img_mfbp2
	}
	fetch('http://localhost:5000/generar_imagen/interior/torque/mfbp2',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_mfbp2_img, 500);
}
//---------------------------------------------------------------------------
//------------------------------------------------------------------------------
function click_pdcr_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  console.log(coor)
  var X = document.getElementById("pdcr_image").getBoundingClientRect();
  console.log(X)
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<pdcr_puntos.length;i++){
		if(pixelx>=pdcr_puntos[i][0][0] && pixelx<=pdcr_puntos[i][1][0] && pixely>=pdcr_puntos[i][0][1] && pixely<=pdcr_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+pdcr_puntos[i][2][0]
			element=pdcr_puntos[i][2][0]
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
  txt=Math.random()
	console.log(txt)
  name_img_pdcr=txt
	const newPost = {
		ARRAY:pdcr_array,
    name:name_img_pdcr
	}
	fetch('http://localhost:5000/generar_imagen/interior/torque/pdcr2',{
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
	temporal_text="static/content/cajas/interior/pdcr2/temp/pdcr2"+name_img_pdcr+".jpg"
	console.log(temporal_text)
	document.getElementById('pdcr_image').src=temporal_text

}

function iniciar_pdcr_img(){

	for(i=0;i<pdcr_puntos.length;i++){
		if(true){
			element=pdcr_puntos[i][2][0]
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
  txt=Math.random()
	console.log(txt)
  name_img_pdcr=txt
	const newPost = {
		ARRAY:pdcr_array,
    name:name_img_pdcr
	}
	fetch('http://localhost:5000/generar_imagen/interior/torque/pdcr2',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_pdcr_img, 500);
}
//---------------------------------------------------------------------------
//------------------------------------------------------------------------------
function click_bt_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  console.log(coor)
  var X = document.getElementById("bt_image").getBoundingClientRect();
  console.log(X)
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<bt_puntos.length;i++){
		if(pixelx>=bt_puntos[i][0][0] && pixelx<=bt_puntos[i][1][0] && pixely>=bt_puntos[i][0][1] && pixely<=bt_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+bt_puntos[i][2][0]
			element=bt_puntos[i][2][0]
			console.log(element)
			if (bt_array.length!=0){
				if(bt_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					bt_array.splice(bt_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					bt_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				bt_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(bt_array)
  txt=Math.random()
	console.log(txt)
  name_img_bt=txt
	const newPost = {
		ARRAY:bt_array,
    name:name_img_bt
	}
	fetch('http://localhost:5000/generar_imagen/interior/torque/bt',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_bt_img, 200);
}

function update_bt_img(){
	console.log("en poner imagen")
	temporal_text="static/content/cajas/interior/bt/temp/bt"+name_img_bt+".jpg"
	console.log(temporal_text)
	document.getElementById('bt_image').src=temporal_text

}

function iniciar_bt_img(){

	for(i=0;i<bt_puntos.length;i++){
		if(true){
			element=bt_puntos[i][2][0]
			console.log(element)
			if (bt_array.length!=0){
				if(bt_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					bt_array.splice(bt_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"_"+array[i][2][1]
					bt_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"_"+array[i][2][1]
				bt_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"_"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(bt_array)
  txt=Math.random()
	console.log(txt)
  name_img_bt=txt
	const newPost = {
		ARRAY:bt_array,
    name:name_img_bt
	}
	fetch('http://localhost:5000/generar_imagen/interior/torque/bt',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
	})
	setTimeout(update_bt_img, 500);
}
//---------------------------------------------------------------------------



function add_module_torque(){
  compute_mask()
  write_final_vector_db()
  add_module_interior_1()
  add_module_interior_2()
  //location.replace("gestiongeneral - interior.html")
}


function add_module_interior_1(){
	modulo_db=document.getElementById('modulo_vision').value
	const newPost = {
		MODULO:modulo_db,
		"CAJA_1": cajas_dic_1[0],
		"CAJA_2": cajas_dic_1[1],
		"CAJA_3": cajas_dic_1[2],
		"CAJA_4": cajas_dic_1[3],
		"CAJA_5": cajas_dic_1[4],
		"CAJA_6": cajas_dic_1[5],
		"CAJA_7": cajas_dic_1[6],
		"CAJA_8": cajas_dic_1[7]
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

	})
	.catch(function(err) {
		console.log(err);
	});

}

function add_module_interior_2(){
	modulo_db=document.getElementById('modulo_vision').value
	const newPost = {
		MODULO:modulo_db,
		"CAJA_1": cajas_dic_2[0],
		"CAJA_2": cajas_dic_2[1],
		"CAJA_3": cajas_dic_2[2],
		"CAJA_4": cajas_dic_2[3],
		"CAJA_5": cajas_dic_2[4],
		"CAJA_6": cajas_dic_2[5],
		"CAJA_7": cajas_dic_2[6],
		"CAJA_8": cajas_dic_2[7]
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
    location.replace("gestiongeneral - interior.html")
	})
	.catch(function(err) {
		console.log(err);
	});

}
