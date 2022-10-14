console.log(dominio);
let img_pdcr = document.getElementById('pdcr_image_v');
let img_pdcr_1 = document.getElementById('pdcr_1_image_v');
let img_pdcs = document.getElementById('pdcs_image_v');
let img_tblu = document.getElementById('tblu_image_v');
let img_pdcd = document.getElementById('pdcd_image_v');
let img_pdcp = document.getElementById('pdcp_image_v');

var historial=""
var name_cajas=["MFB","MFBP-2","BT","PDC_R","PDC_S","PDC_X","PDC_D","PDC_P"]

var name_img_pdcr=""
var name_img_pdcr_1=""
var name_img_pdcs=""
var name_img_btlu=""
var name_img_pdcd=""
var name_img_pdcp=""

var pdcr_caja=""
var pdcr_caja_to_db=""

var pdcr_array=[]
var pdcr_puntos=[]

var pdcr_1_array=[]
var pdcr_1_puntos=[]

var pdcs_array=[]
var pdcs_puntos=[]

var tblu_array=[]
var tblu_puntos=[]

var pdcd_array=[]
var pdcd_puntos=[]

var pdcp_array=[]
var pdcp_puntos=[]

var caja_1_msk=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var caja_2_msk=[0,0,0,0,0,0]
var caja_3_msk=[0,0,0,0,0,0,0,0,0]
var caja_4_msk=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var caja_5_msk=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var caja_6_msk=[]
var caja_7_msk=[]
var caja_8_msk=[]

var mask=[caja_1_msk,caja_2_msk,caja_3_msk,caja_4_msk,caja_5_msk,caja_6_msk,caja_7_msk,caja_8_msk]
var arr=[[],[],[],pdcr_array,pdcs_array,tblu_array,pdcd_array,pdcp_array]
var caja_1=[]
var caja_2=[]
var caja_3=[]
var caja_4=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var caja_5=[0,0,0,0,0,0]
var caja_6=[0,0,0,0,0,0,0,0,0]
var caja_7=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var caja_8=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

var pdcr_puntos_n=[["S1",6],["S2",6],["S3",6],["S4",3],["S5",6],["S6",10],["S7",10],["S8",3],["S9",6],["S10",6],["S11",3],["A1",6],["A2",6],["A3",6],["R",3]]
var pdcr_1_puntos_n=[["S1",6],["S2",6],["S3",6],["S4",3],["S5",6],["S6",10],["S7",10],["S8",3],["S9",6],["S10",6],["R",3]]
var pdcs_puntos_n=[["A1",6]]
var tblu_puntos_n=[["A1",9]]
var pdcd_puntos_n=[["A1",9],["A2",8],["S1",10],["S2",6]]
var pdcp_puntos_n=[["S1",6],["S2",6],["A1",6],["A2",8],["A3",10],["E2",1]]



var cajas_dic=[]
var interior_2_arr=[[],[],[],[],[],[],[],[]]

function build_dic(){
  if(pdcr_caja==""){
    alert("No ha seleccionado ninguna de las opciones para la caja PDCR")
  }
  else{
    if(historial==""){
      calcular_orden()
      compute_mask()
      for(i=0;i<interior_2_arr.length;i++){
          temp={}
          for(j=0;j<interior_2_arr[i].length;j++){
            temp[interior_2_arr[i][j]]=0
            if(mask[i][j]==1){
              temp[interior_2_arr[i][j]]=1
            }
          }
          cajas_dic[i]=temp
          console.log(cajas_dic[i])
      }
      console.log(cajas_dic)
      add_module_vision()
    }
    else{
      alert("El módulo ya existe");
    }
  }
}


function calcular_orden(){
  var pdcr_puntos_orden=[["S1",1,3],["S1",4,6],["S2",1,6],["S3",1,6],["S4",1,3],["S5",1,6],["S6",1,10],["S7",1,10],["S8",1,3],["S9",1,6],["S10",1,6],["S11",1,3],["A1",1,6],["A2",1,6],["A3",1,6],["R",1,3]]
  var pdcr_1_puntos_orden=[["S1",1,3],["S1",4,6],["S2",1,6],["S3",1,6],["S4",1,3],["S5",1,6],["S6",1,10],["S7",1,10],["S8",1,3],["S9",1,6],["S10",1,6],["R",1,3]]
  var pdcs_puntos_orden=[["A1",1,6]]
  var btlu_puntos_orden=[["A1",1,9]]
  var pdcd_puntos_orden=[["A1",1,9],["A2",1,8],["S1",1,10],["S2",1,6]]
  var pdcp_puntos_orden=[["S1",1,6],["S2",1,6],["A1",1,6],["A2",1,8],["A3",1,10],["E2",1,2]]

  temp=[]
  for(i=0;i<pdcr_puntos_orden.length;i++){
    for(j=pdcr_puntos_orden[i][1];j<=pdcr_puntos_orden[i][2];j++){
      temp.push(pdcr_puntos_orden[i][0]+"-"+j)

    }//j
  }//i
  console.log(temp)

  temp_1=[]
  for(i=0;i<pdcr_1_puntos_orden.length;i++){
    for(j=pdcr_1_puntos_orden[i][1];j<=pdcr_1_puntos_orden[i][2];j++){
      temp_1.push(pdcr_1_puntos_orden[i][0]+"-"+j)

    }//j
  }//i
  console.log(temp_1)

  if(pdcr_caja=="pdcr"){
    interior_2_arr[0]=temp
    console.log("se utilizara el arreglo de la caja pdcr")
  }
  if(pdcr_caja=="pdcr_1"){
    interior_2_arr[0]=temp_1
    console.log("se utilizar el arreglo de la caja pdcr_1")
  }

  temp=[]
  for(i=0;i<pdcs_puntos_orden.length;i++){
    for(j=pdcs_puntos_orden[i][1];j<=pdcs_puntos_orden[i][2];j++){
      temp.push(pdcs_puntos_orden[i][0]+"-"+j)

    }//j
  }//i
  console.log(temp)
  interior_2_arr[1]=temp

  temp=[]
  for(i=0;i<btlu_puntos_orden.length;i++){
    for(j=btlu_puntos_orden[i][1];j<=btlu_puntos_orden[i][2];j++){
      temp.push(btlu_puntos_orden[i][0]+"-"+j)

    }//j
  }//i
  console.log(temp)
  interior_2_arr[2]=temp

  temp=[]
  for(i=0;i<pdcd_puntos_orden.length;i++){
    for(j=pdcd_puntos_orden[i][1];j<=pdcd_puntos_orden[i][2];j++){
      temp.push(pdcd_puntos_orden[i][0]+"-"+j)

    }//j
  }//i
  console.log(temp)
  interior_2_arr[3]=temp

  temp=[]
  for(i=0;i<pdcp_puntos_orden.length;i++){
    for(j=pdcp_puntos_orden[i][1];j<=pdcp_puntos_orden[i][2];j++){
      temp.push(pdcp_puntos_orden[i][0]+"-"+j)

    }//j
  }//i
  console.log(temp)
  interior_2_arr[4]=temp

}


function calcular(){
  temp=[]

  for(i=0;i<pdcr_puntos_n.length;i++){
    for(j=1;j<pdcr_puntos_n[i][1]+1;j++){

      text=pdcr_puntos_n[i][0]+"_"+j

      temp.push(text)


    }//for j
  }//for i

  interior_2_arr[3]=temp
  //-------------------------------------------
  temp=[]
  for(i=0;i<pdcs_puntos_n.length;i++){
    for(j=1;j<pdcs_puntos_n[i][1]+1;j++){

      text=pdcs_puntos_n[i][0]+"_"+j

      temp.push(text)


    }//for j
  }//for i
  interior_2_arr[4]=temp
  //---------------------------------------------
  //-------------------------------------------
  temp=[]
  for(i=0;i<btlu_puntos_n.length;i++){
    for(j=1;j<btlu_puntos_n[i][1]+1;j++){

      text=btlu_puntos_n[i][0]+"_"+j

      temp.push(text)


    }//for j
  }//for i
  interior_2_arr[5]=temp
  //---------------------------------------------
  //-------------------------------------------
  temp=[]
  for(i=0;i<pdcd_puntos_n.length;i++){
    for(j=1;j<pdcd_puntos_n[i][1]+1;j++){

      text=pdcd_puntos_n[i][0]+"_"+j

      temp.push(text)


    }//for j
  }//for i
  interior_2_arr[6]=temp
  //---------------------------------------------
  //-------------------------------------------
  temp=[]
  for(i=0;i<pdcp_puntos_n.length;i++){
    for(j=1;j<pdcp_puntos_n[i][1]+1;j++){

      text=pdcp_puntos_n[i][0]+"_"+j

      temp.push(text)


    }//for j
  }//for i
  interior_2_arr[7]=temp
  //---------------------------------------------

  console.log(interior_2_arr)
  compute_mask()
}

function compute_mask(){
  if(pdcr_caja=="pdcr"){
    var arr=[pdcr_array,pdcs_array,tblu_array,pdcd_array,pdcp_array,[],[],[]]
    console.log("se utilizara el arreglo de la caja pdcr")
  }
  if(pdcr_caja=="pdcr_1"){
    var arr=[pdcr_1_array,pdcs_array,tblu_array,pdcd_array,pdcp_array, [],[],[]]
    console.log("se utilizar el arreglo de la caja pdcr_1")
  }


  for(i=0;i<mask.length;i++){
    for(j=0;j<mask[i].length;j++){
      for(k=0;k<arr[i].length;k++){
        if(arr[i][k]==interior_2_arr[i][j]){
          mask[i][j]=1
        }//if
      }//tercer for

    }//primer for
  }// segundo for
  console.log(mask)

}


function iniciar_pagina(){
  console.log("se inicio la pagina")
  load_pdcr_puntos();
  load_pdcr_1_puntos();
  load_pdcs_puntos();
  load_tblu_puntos();
  load_pdcd_puntos();
  load_pdcp_puntos();
  cargar_imagen_pdcr();
  cargar_imagen_pdcr_1();
  cargar_imagen_pdcs();
  cargar_imagen_tblu();
  cargar_imagen_pdcd();
  cargar_imagen_pdcp();
}

function load_pdcr_puntos(){
  fetch(dominio+"/info/interior/vision-altura/pdcr")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			pdcr_puntos = data.puntos
      //iniciar_pdcr_img()
		})
  //console.log(pdcr_puntos)
}
function load_pdcr_1_puntos(){
  fetch(dominio+"/info/interior/vision-altura/pdcr_1")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			pdcr_1_puntos = data.puntos

      //iniciar_pdcr_img()
		})
  //console.log(pdcr_puntos)
}
function load_pdcs_puntos(){
  fetch(dominio+"/info/interior/vision-altura/pdcs")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			pdcs_puntos = data.puntos
      //iniciar_pdcs_img()
		})
  //console.log(pdcs_puntos)
}
function load_tblu_puntos(){
  fetch(dominio+"/info/interior/vision-altura/btlu")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			tblu_puntos = data.puntos
      //iniciar_btlu_img()
		})
  console.log(tblu_puntos)
}
function load_pdcd_puntos(){
  fetch(dominio+"/info/interior/vision-altura/pdcd")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			pdcd_puntos = data.puntos
      //iniciar_pdcd_img()
		})
  //console.log(pdcd_puntos)
}
function load_pdcp_puntos(){
  fetch(dominio+"/info/interior/vision-altura/pdcp")
		.then(data=>data.json())
		.then(data=>{
			console.log(data);
			pdcp_puntos = data.puntos
      //iniciar_pdcp_img()
		})
  //console.log(pdcp_puntos)
}

function cargar_imagen_pdcr(){
  let mat = cv.imread(img_pdcr);
  cv.imshow('pdcr_image_v_canvas', mat);
  mat.delete();
}
function cargar_imagen_pdcr_1(){
  let mat = cv.imread(img_pdcr_1);
  cv.imshow('pdcr_1_image_v_canvas', mat);
  mat.delete();
}
function cargar_imagen_pdcs(){
  let mat = cv.imread(img_pdcs);
  cv.imshow('pdcs_image_v_canvas', mat);
  mat.delete();
}
function cargar_imagen_tblu(){
  let mat = cv.imread(img_tblu);
  cv.imshow('tblu_image_v_canvas', mat);
  mat.delete();
}
function cargar_imagen_pdcd(){
  let mat = cv.imread(img_pdcd);
  cv.imshow('pdcd_image_v_canvas', mat);
  mat.delete();
}
function cargar_imagen_pdcp(){
  let mat = cv.imread(img_pdcp);
  cv.imshow('pdcp_image_v_canvas', mat);
  mat.delete();
}

function change_caja_pdcr(){
	if(document.getElementById('pdcr_option').value==='Seleccione la caja PDCR...'){
    console.log("seleccione una caja")
    document.getElementById('caja_pdcr').style.display="none"
    document.getElementById('caja_pdcr_1').style.display="none"
    pdcr_caja=""
    pdcr_caja_to_db=""
	}
	if(document.getElementById('pdcr_option').value==='PDCR'){
    console.log("pdcr")
    document.getElementById('caja_pdcr').style.display="block"
    document.getElementById('caja_pdcr_1').style.display="none"
    //document.getElementById('pdcr_image').src="static/content/cajas/interior/pdcr/pdcr.jpg"
    pdcr_caja="pdcr"
    pdcr_caja_to_db="PDCR"
    pdcr_array=[]
    pdcr_1_array=[]
    cargar_imagen_pdcr();
    cargar_imagen_pdcr_1();
	}
	if(document.getElementById('pdcr_option').value==='PDCR_1'){
		console.log("pdcr_1")
    document.getElementById('caja_pdcr').style.display="none"
    document.getElementById('caja_pdcr_1').style.display="block"
    //document.getElementById('pdcr_1_image').src="static/content/cajas/interior/pdcr_1/pdcr_1.jpg"
    pdcr_caja="pdcr_1"
    pdcr_caja_to_db="PDCR-MID"
    pdcr_array=[]
    pdcr_1_array=[]
    cargar_imagen_pdcr();
    cargar_imagen_pdcr_1();
	}

}

//------------------------------------------------------------------------------
function click_pdcr_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  var X = document.getElementById("pdcr_image_v_canvas").getBoundingClientRect();
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<pdcr_puntos.length;i++){
		if(pixelx>=pdcr_puntos[i][0][0] && pixelx<=pdcr_puntos[i][1][0] && pixely>=pdcr_puntos[i][0][1] && pixely<=pdcr_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+pdcr_puntos[i][2][0]+" en la posición "+pdcr_puntos[i][2][1]
			element=pdcr_puntos[i][2][0]+"-"+pdcr_puntos[i][2][1]
			console.log(element)
			if (pdcr_array.length!=0){
				if(pdcr_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"-"+array[i][2][1]
					pdcr_array.splice(pdcr_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"-"+array[i][2][1]
					pdcr_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"-"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"-"+array[i][2][1]
				pdcr_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"-"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(pdcr_array)
  generar_imagen_pdcr();
}

function generar_imagen_pdcr() {
  let mat = cv.imread(img_pdcr);

	for(i=0;i<pdcr_puntos.length;i++){
		temp_string=pdcr_puntos[i][2][0]+"-"+pdcr_puntos[i][2][1]
		console.log(temp_string)
		for(j=0;j<pdcr_array.length;j++){
			console.log(pdcr_array[j])
			if(temp_string==pdcr_array[j]){
				console.log("draw")
				let punto_1= new cv.Point(pdcr_puntos[i][0][0],pdcr_puntos[i][0][1]);
				let punto_2= new cv.Point(pdcr_puntos[i][1][0],pdcr_puntos[i][1][1]);
			  let rectangleColor = new cv.Scalar(0, 255, 0);
			  cv.rectangle(mat,punto_1,punto_2,rectangleColor,0,cv.LINE_AA,0);
			}
		}
	}
  cv.imshow('pdcr_image_v_canvas', mat);
  mat.delete();
};

//------------------------------------------------------------------------------
function click_pdcr_1_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  var X = document.getElementById("pdcr_1_image_v_canvas").getBoundingClientRect();
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<pdcr_1_puntos.length;i++){
		if(pixelx>=pdcr_1_puntos[i][0][0] && pixelx<=pdcr_1_puntos[i][1][0] && pixely>=pdcr_1_puntos[i][0][1] && pixely<=pdcr_1_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+pdcr_1_puntos[i][2][0]+" en la posición "+pdcr_1_puntos[i][2][1]
			element=pdcr_1_puntos[i][2][0]+"-"+pdcr_1_puntos[i][2][1]
			console.log(element)
			if (pdcr_1_array.length!=0){
				if(pdcr_1_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"-"+array[i][2][1]
					pdcr_1_array.splice(pdcr_1_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"-"+array[i][2][1]
					pdcr_1_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"-"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"-"+array[i][2][1]
				pdcr_1_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"-"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(pdcr_1_array)
  generar_imagen_pdcr_1();
}

function generar_imagen_pdcr_1() {
  let mat = cv.imread(img_pdcr_1);

	for(i=0;i<pdcr_1_puntos.length;i++){
		temp_string=pdcr_1_puntos[i][2][0]+"-"+pdcr_1_puntos[i][2][1]
		console.log(temp_string)
		for(j=0;j<pdcr_1_array.length;j++){
			console.log(pdcr_1_array[j])
			if(temp_string==pdcr_1_array[j]){
				console.log("draw")
				let punto_1= new cv.Point(pdcr_1_puntos[i][0][0],pdcr_1_puntos[i][0][1]);
				let punto_2= new cv.Point(pdcr_1_puntos[i][1][0],pdcr_1_puntos[i][1][1]);
			  let rectangleColor = new cv.Scalar(0, 255, 0);
			  cv.rectangle(mat,punto_1,punto_2,rectangleColor,0,cv.LINE_AA,0);
			}
		}
	}
  cv.imshow('pdcr_1_image_v_canvas', mat);
  mat.delete();
};

//-----------------------------------------------------------------------------
function click_pdcs_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  var X = document.getElementById("pdcs_image_v_canvas").getBoundingClientRect();
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<pdcs_puntos.length;i++){
		if(pixelx>=pdcs_puntos[i][0][0] && pixelx<=pdcs_puntos[i][1][0] && pixely>=pdcs_puntos[i][0][1] && pixely<=pdcs_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+pdcs_puntos[i][2][0]+" en la posición "+pdcs_puntos[i][2][1]
			element=pdcs_puntos[i][2][0]+"-"+pdcs_puntos[i][2][1]
			console.log(element)
			if (pdcs_array.length!=0){
				if(pdcs_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"-"+array[i][2][1]
					pdcs_array.splice(pdcs_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"-"+array[i][2][1]
					pdcs_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"-"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"-"+array[i][2][1]
				pdcs_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"-"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(pdcs_array)
  generar_imagen_pdcs();
}

function generar_imagen_pdcs() {
  let mat = cv.imread(img_pdcs);

	for(i=0;i<pdcs_puntos.length;i++){
		temp_string=pdcs_puntos[i][2][0]+"-"+pdcs_puntos[i][2][1]
		for(j=0;j<pdcs_array.length;j++){
			if(temp_string==pdcs_array[j]){
				let punto_1= new cv.Point(pdcs_puntos[i][0][0],pdcs_puntos[i][0][1]);
				let punto_2= new cv.Point(pdcs_puntos[i][1][0],pdcs_puntos[i][1][1]);
			  let rectangleColor = new cv.Scalar(0, 255, 0);
			  cv.rectangle(mat,punto_1,punto_2,rectangleColor,0,cv.LINE_AA,0);
			}
		}
	}
  cv.imshow('pdcs_image_v_canvas', mat);
  mat.delete();
};
//-----------------------------------------------------------------------------
function click_tblu_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  var X = document.getElementById("tblu_image_v_canvas").getBoundingClientRect();
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<tblu_puntos.length;i++){
		if(pixelx>=tblu_puntos[i][0][0] && pixelx<=tblu_puntos[i][1][0] && pixely>=tblu_puntos[i][0][1] && pixely<=tblu_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+tblu_puntos[i][2][0]+" en la posición "+tblu_puntos[i][2][1]
			element=tblu_puntos[i][2][0]+"-"+tblu_puntos[i][2][1]
			console.log(element)
			if (tblu_array.length!=0){
				if(tblu_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"-"+array[i][2][1]
					tblu_array.splice(tblu_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"-"+array[i][2][1]
					tblu_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"-"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"-"+array[i][2][1]
				tblu_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"-"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(tblu_array)
  generar_imagen_tblu();
}

function generar_imagen_tblu() {
  let mat = cv.imread(img_tblu);

	for(i=0;i<tblu_puntos.length;i++){
		temp_string=tblu_puntos[i][2][0]+"-"+tblu_puntos[i][2][1]
		for(j=0;j<tblu_array.length;j++){
			if(temp_string==tblu_array[j]){
				let punto_1= new cv.Point(tblu_puntos[i][0][0],tblu_puntos[i][0][1]);
				let punto_2= new cv.Point(tblu_puntos[i][1][0],tblu_puntos[i][1][1]);
			  let rectangleColor = new cv.Scalar(0, 255, 0);
			  cv.rectangle(mat,punto_1,punto_2,rectangleColor,0,cv.LINE_AA,0);
			}
		}
	}
  cv.imshow('tblu_image_v_canvas', mat);
  mat.delete();
};
//-----------------------------------------------------------------------------
function click_pdcd_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  var X = document.getElementById("pdcd_image_v_canvas").getBoundingClientRect();
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<pdcd_puntos.length;i++){
		if(pixelx>=pdcd_puntos[i][0][0] && pixelx<=pdcd_puntos[i][1][0] && pixely>=pdcd_puntos[i][0][1] && pixely<=pdcd_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+pdcd_puntos[i][2][0]+" en la posición "+pdcd_puntos[i][2][1]
			element=pdcd_puntos[i][2][0]+"-"+pdcd_puntos[i][2][1]
			console.log(element)
			if (pdcd_array.length!=0){
				if(pdcd_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"-"+array[i][2][1]
					pdcd_array.splice(pdcd_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"-"+array[i][2][1]
					pdcd_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"-"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"-"+array[i][2][1]
				pdcd_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"-"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(pdcd_array)
  generar_imagen_pdcd();
}

function generar_imagen_pdcd() {
  let mat = cv.imread(img_pdcd);

	for(i=0;i<pdcd_puntos.length;i++){
		temp_string=pdcd_puntos[i][2][0]+"-"+pdcd_puntos[i][2][1]
		for(j=0;j<pdcd_array.length;j++){
			if(temp_string==pdcd_array[j]){
				let punto_1= new cv.Point(pdcd_puntos[i][0][0],pdcd_puntos[i][0][1]);
				let punto_2= new cv.Point(pdcd_puntos[i][1][0],pdcd_puntos[i][1][1]);
			  let rectangleColor = new cv.Scalar(0, 255, 0);
			  cv.rectangle(mat,punto_1,punto_2,rectangleColor,0,cv.LINE_AA,0);
			}
		}
	}
  cv.imshow('pdcd_image_v_canvas', mat);
  mat.delete();
};
//------------------------------------------------------------------------------
function click_pdcp_img(event){
	var x = event.pageX;
  var y = event.pageY;
  var coor = "X coords: " + x + ", Y coords: " + y;
  var X = document.getElementById("pdcp_image_v_canvas").getBoundingClientRect();
	pixelx=x-window.scrollX-X.left
	pixely=y-window.scrollY-X.top
	console.log(pixelx)
	console.log(pixely)


	for(i=0;i<pdcp_puntos.length;i++){
		if(pixelx>=pdcp_puntos[i][0][0] && pixelx<=pdcp_puntos[i][1][0] && pixely>=pdcp_puntos[i][0][1] && pixely<=pdcp_puntos[i][1][1]){
			var temporal_text="Esta dentro de "+pdcp_puntos[i][2][0]+" en la posición "+pdcp_puntos[i][2][1]
			element=pdcp_puntos[i][2][0]+"-"+pdcp_puntos[i][2][1]
			console.log(element)
			if (pdcp_array.length!=0){
				if(pdcp_array.indexOf(element)!=-1){
					//temporal_text=array[i][2][0]+"-"+array[i][2][1]
					pdcp_array.splice(pdcp_array.indexOf(element),1)
				}
				else{
					//temporal_text=array[i][2][0]+"-"+array[i][2][1]
					pdcp_array.push(element)
					//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"-"+array[i][2][1]+".jpg"
					//document.getElementById('pdcr_image').src=temporal_text
				}
			}
			else{
				//temporal_text=array[i][2][0]+"-"+array[i][2][1]
				pdcp_array.push(element)
				//temporal_text="static/content/cajas/caja_4_"+array[i][2][0]+"-"+array[i][2][1]+".jpg"
				//document.getElementById('pdcr_image').src=temporal_text

			}

		}
	}
  console.log("temporal array")
	console.log(pdcp_array)
  generar_imagen_pdcp();
}

function generar_imagen_pdcp() {
  let mat = cv.imread(img_pdcp);

	for(i=0;i<pdcp_puntos.length;i++){
		temp_string=pdcp_puntos[i][2][0]+"-"+pdcp_puntos[i][2][1]
		for(j=0;j<pdcp_array.length;j++){
			if(temp_string==pdcp_array[j]){
				let punto_1= new cv.Point(pdcp_puntos[i][0][0],pdcp_puntos[i][0][1]);
				let punto_2= new cv.Point(pdcp_puntos[i][1][0],pdcp_puntos[i][1][1]);
			  let rectangleColor = new cv.Scalar(0, 255, 0);
			  cv.rectangle(mat,punto_1,punto_2,rectangleColor,0,cv.LINE_AA,0);
			}
		}
	}
  cv.imshow('pdcp_image_v_canvas', mat);
  mat.delete();
};
//------------------------------------------------------------------------------
function add_module_vision(){
  //calcular_orden()
	modulo_db=document.getElementById('modulo_vision').value
  console.log(pdcr_caja_to_db)
	const newPost = {
		MODULO:modulo_db,
    	"CAJA_1": {},
		"CAJA_2": {"PDC-S": cajas_dic[1]},
		"CAJA_3": {"TBL-U": cajas_dic[2]},
		"CAJA_4": {"PDC-D": cajas_dic[3]},
		"CAJA_5": {"PDC-P": cajas_dic[4]},
		"CAJA_6": {},
		"CAJA_7": {},
		"CAJA_8": {}
	}

	if (pdcr_caja_to_db == "PDCR") {
		newPost["CAJA_1"]["PDC-R"] = cajas_dic[0]
	}else{
		newPost["CAJA_1"]["PDC-RMID"] = cajas_dic[0]
		}
		
	fetch(dominio+'/api/post/modulos_fusibles',{
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
	fetch(dominio+'/api/post/modulos_alturas',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){

		console.log(data);
    location.replace("index.html")
	})
	.catch(function(err) {
		console.log(err);
	});

}
function get_valid_pedido(){
	//console.log("get_pedido")
	historial=""
	console.log(document.getElementById("modulo_vision").value)
	if(document.getElementById("modulo_vision").value!=""){
		// get the id
		endpoint=dominio+'/database/modulos_fusibles/modulo/=/'+document.getElementById("modulo_vision").value+'/_/_/_'
		console.log(endpoint)
		fetch(endpoint,{
			method: 'GET',
			headers:{
				"Content-type": "application/json"
			}
		}).then(res=>res.json())
		.then(function (data){
			console.log(data);
			historial="si existe"
			alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "'+document.getElementById("modulo_vision").value+'" ya existe</div>'
			console.log(historial)
		})
		.catch(function(err) {

			//console.log(err);
		});
		alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+document.getElementById("modulo_vision").value+'" no existe</div>'
		console.log(historial)
	}
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[type=text]').forEach( node => node.addEventListener('keypress', e => {
    if(e.keyCode == 13) {
      e.preventDefault();
    }
  }))
});