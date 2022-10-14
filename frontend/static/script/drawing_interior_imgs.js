

let img_pdcr_a = document.getElementById('pdcr_image_a_canvas');
let img_pdcs_a = document.getElementById('pdcs_image_a_canvas');
let img_tblu_a = document.getElementById('tblu_image_a_canvas');
let img_pdcd_a = document.getElementById('pdcd_image_a_canvas');
let img_pdcp_a = document.getElementById('pdcp_image_a_canvas');

let img_pdcp_t = document.getElementById('pdcp_image_t');
let img_pdcd_t = document.getElementById('pdcd_image_t');
let img_mfbp1_t = document.getElementById('mfbp1_image_t');
let img_mfb_t = document.getElementById('mfb_image_t');
let img_mfbp2_t = document.getElementById('mfbp2_image_t');
let img_pdcr_t = document.getElementById('pdcr_image_t');
let img_bt_t = document.getElementById('bt_image_t');

var pdcr_array=[];
var pdcr_1_array=[];
var pdcs_array=[];
var tblu_array=[];
var pdcd_array=[];
var pdcp_array=[];

var pdcp_t_array=pdcp_t
var pdcd_t_array=pdcd_t
var mfbp1_t_array=mfbp1_t
var mfb_t_array=mfb_t
var mfbp2_t_array=mfbp2_t
var pdcr_t_array=pdcr_t
var bt_t_array=bt_t

var pdcr_puntos=[]
var pdcs_puntos=[]
var tblu_puntos=[]
var pdcd_puntos=[]
var pdcp_puntos=[]

var pdcp_t_puntos=[]
var pdcd_t_puntos=[]
var mfbp1_t_puntos=[]
var mfb_t_puntos=[]
var mfbp2_t_puntos=[]
var pdcr_t_puntos=[]
var bt_t_puntos=[]


// vision altura
// function generar_imagen_pdcr() {
//   let mat = cv.imread(img_pdcr);

// 	for(i=0;i<pdcr_puntos.length;i++){
// 		temp_string=pdcr_puntos[i][2][0]+"-"+pdcr_puntos[i][2][1]
// 		// console.log(temp_string)
// 		for(j=0;j<pdcr_array.length;j++){
// 			// console.log(pdcr_array[j])
// 			if(temp_string==pdcr_array[j]){
// 				console.log("draw")
// 				let punto_1= new cv.Point(pdcr_puntos[i][0][0],pdcr_puntos[i][0][1]);
// 				let punto_2= new cv.Point(pdcr_puntos[i][1][0],pdcr_puntos[i][1][1]);
// 			  let rectangleColor = new cv.Scalar(0, 255, 0);
// 			  cv.rectangle(mat,punto_1,punto_2,rectangleColor,0,cv.LINE_AA,0);
// 			}
// 		}
// 	}
//   cv.imshow('pdcr_image_v_canvas', mat);
// 	cv.imshow('pdcr_image_a_canvas', mat);
//   mat.delete();
// };
function getDistance_fuse(x1, y1, x2, y2) {
    xDistance_fuse = x2 - x1;
    yDistance_fuse = y2 - y1;
    // console.log("Distancia en X: ",xDistance);
    // console.log("Distancia en Y: ",yDistance);
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
	cv.imshow('pdcs_image_a_canvas', mat);
	mat.delete();
};

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
	cv.imshow('tblu_image_a_canvas', mat);
	mat.delete();
};

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
	cv.imshow('pdcd_image_a_canvas', mat);
	mat.delete();
};

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
	cv.imshow('pdcp_image_a_canvas', mat);
	mat.delete();
};

function generar_imagen_pdcp_t() {
	let mat = cv.imread(img_pdcp_t);

	for(i=0;i<pdcp_t_puntos.length;i++){
		temp_string=pdcp_t_puntos[i][2][0]
		for(j=0;j<pdcp_t_array.length;j++){
			if(temp_string==pdcp_t_array[j]){
				let punto_1= new cv.Point(pdcp_t_puntos[i][0][0],pdcp_t_puntos[i][0][1]);
				let punto_2= new cv.Point(pdcp_t_puntos[i][1][0],pdcp_t_puntos[i][1][1]);
				let rectangleColor = new cv.Scalar(0, 255, 0);
				cv.rectangle(mat,punto_1,punto_2,rectangleColor,0,cv.LINE_AA,0);
			}
		}
	}
	cv.imshow('pdcp_image_t_canvas', mat);
	mat.delete();
};

function generar_imagen_pdcd_t() {
	let mat = cv.imread(img_pdcd_t);

	for(i=0;i<pdcd_t_puntos.length;i++){
		temp_string=pdcd_t_puntos[i][2][0]
		for(j=0;j<pdcd_t_array.length;j++){
			if(temp_string==pdcd_t_array[j]){
				let punto_1= new cv.Point(pdcd_t_puntos[i][0][0],pdcd_t_puntos[i][0][1]);
				let punto_2= new cv.Point(pdcd_t_puntos[i][1][0],pdcd_t_puntos[i][1][1]);
				let rectangleColor = new cv.Scalar(0, 255, 0);
				cv.rectangle(mat,punto_1,punto_2,rectangleColor,0,cv.LINE_AA,0);
			}
		}
	}
	cv.imshow('pdcd_image_t_canvas', mat);
	mat.delete();
};

function generar_imagen_mfbp1_t() {
	let mat = cv.imread(img_mfbp1_t);

	for(i=0;i<mfbp1_t_puntos.length;i++){
		temp_string=mfbp1_t_puntos[i][2][0]
		for(j=0;j<mfbp1_t_array.length;j++){
			if(temp_string==mfbp1_t_array[j]){
				let punto_1= new cv.Point(mfbp1_t_puntos[i][0][0],mfbp1_t_puntos[i][0][1]);
				let punto_2= new cv.Point(mfbp1_t_puntos[i][1][0],mfbp1_t_puntos[i][1][1]);
				let rectangleColor = new cv.Scalar(0, 255, 0);
				cv.rectangle(mat,punto_1,punto_2,rectangleColor,0,cv.LINE_AA,0);
			}
		}
	}
	cv.imshow('mfbp1_image_t_canvas', mat);
	mat.delete();
};

function generar_imagen_mfb_t() {
	let mat = cv.imread(img_mfb_t);

	for(i=0;i<mfb_t_puntos.length;i++){
		temp_string=mfb_t_puntos[i][2][0]
		for(j=0;j<mfb_t_array.length;j++){
			if(temp_string==mfb_t_array[j]){
				let punto_1= new cv.Point(mfb_t_puntos[i][0][0],mfb_t_puntos[i][0][1]);
				let punto_2= new cv.Point(mfb_t_puntos[i][1][0],mfb_t_puntos[i][1][1]);
				let rectangleColor = new cv.Scalar(0, 255, 0);
				cv.rectangle(mat,punto_1,punto_2,rectangleColor,0,cv.LINE_AA,0);
			}
		}
	}
	cv.imshow('mfb_image_t_canvas', mat);
	mat.delete();
};

function generar_imagen_mfbp2_t() {
	let mat = cv.imread(img_mfbp2_t);

	for(i=0;i<mfbp2_t_puntos.length;i++){
		temp_string=mfbp2_t_puntos[i][2][0]
		for(j=0;j<mfbp2_t_array.length;j++){
			if(temp_string==mfbp2_t_array[j]){
				let punto_1= new cv.Point(mfbp2_t_puntos[i][0][0],mfbp2_t_puntos[i][0][1]);
				let punto_2= new cv.Point(mfbp2_t_puntos[i][1][0],mfbp2_t_puntos[i][1][1]);
				let rectangleColor = new cv.Scalar(0, 255, 0);
				cv.rectangle(mat,punto_1,punto_2,rectangleColor,0,cv.LINE_AA,0);
			}
		}
	}
	cv.imshow('mfbp2_image_t_canvas', mat);
	mat.delete();
};

function generar_imagen_pdcr_t() {
	let mat = cv.imread(img_pdcr_t);

	for(i=0;i<pdcr_t_puntos.length;i++){
		temp_string=pdcr_t_puntos[i][2][0]
		// console.log(temp_string)
		for(j=0;j<pdcr_t_array.length;j++){
			// console.log(pdcr_t_array[j])
			if(temp_string==pdcr_t_array[j]){
				// console.log("draw")
				let punto_1= new cv.Point(pdcr_t_puntos[i][0][0],pdcr_t_puntos[i][0][1]);
				let punto_2= new cv.Point(pdcr_t_puntos[i][1][0],pdcr_t_puntos[i][1][1]);
				let rectangleColor = new cv.Scalar(0, 255, 0);
				cv.rectangle(mat,punto_1,punto_2,rectangleColor,0,cv.LINE_AA,0);
			}
		}
	}
	cv.imshow('pdcr_image_t_canvas', mat);
	mat.delete();
};

function generar_imagen_bt_t() {
	let mat = cv.imread(img_bt_t);

	for(i=0;i<bt_t_puntos.length;i++){
		temp_string=bt_t_puntos[i][2][0]
		for(j=0;j<bt_t_array.length;j++){
			if(temp_string==bt_t_array[j]){
				let punto_1= new cv.Point(bt_t_puntos[i][0][0],bt_t_puntos[i][0][1]);
				let punto_2= new cv.Point(bt_t_puntos[i][1][0],bt_t_puntos[i][1][1]);
				let rectangleColor = new cv.Scalar(0, 255, 0);
				cv.rectangle(mat,punto_1,punto_2,rectangleColor,0,cv.LINE_AA,0);
			}
		}
	}
	cv.imshow('bt_image_t_canvas', mat);
	mat.delete();
};


function generar_imagenes(){
	//vision altura
	// cargar_imagen_pdcr();
	cargar_imagen_pdcs();
	cargar_imagen_tblu();
	cargar_imagen_pdcd();
	cargar_imagen_pdcp();
	// cargar_imagen_pdcr_altura();
	// cargar_imagen_pdcs_altura();
	// cargar_imagen_tblu_altura();
	// cargar_imagen_pdcd_altura();
	// cargar_imagen_pdcp_altura();
	cargar_info();
	//torque
	get_puntos_pdcp_t();
	get_puntos_pdcd_t();
	get_puntos_mfbp1_t();
	get_puntos_mfb_t();
	get_puntos_mfbp2_t();
	get_puntos_pdcr_t();
	get_puntos_bt_t();
}

function cargar_info(){
	// console.log("VISION EN DRAWING.js: ",vision)
	var keys = Object.keys(vision)
	// console.log(keys);
	for (var i = 0; i < keys.length; i++) {
		// console.log(keys[i]);
		// console.log(vision[keys[i]]);
		var caja_name = keys[i];
		// console.log("Caja: ",caja_name)
		if (caja_name == '{}') {
			// console.log('VACIO');
		} else{
			var fusibles = Object.keys(vision[keys[i]])
			// console.log(fusibles);
			for (var j = 0; j < fusibles.length; j++) {
				// console.log("Fusible: ",fusibles[j])
				// console.log("Valor del Fusible: ", vision[keys[i]][fusibles[j]]);
				cargar_recuadros();
			}
		}
	}
	function cargar_recuadros(){
		// console.log("pintando");
		if (caja_name == "PDC-R" && vision[keys[i]][fusibles[j]] != null) {
			// console.log("AQUI ESTÁ LA CAJA PDC-R");
			pdcr_array.push(fusibles[j]);
			// console.log("FUSBILES DE PDCR LENGTH: ",fusibles.length);
			// console.log("PDCR ARRAY: ",pdcr_array);
			document.getElementById("pdcr_caption").innerHTML = "PDC-R";
			// document.getElementById("pdcr_caption_altura").innerHTML = "PDC-R";
			cargar_imagen_pdcr();
			// cargar_imagen_pdcr_altura();
		}
		if (caja_name == "PDC-RMID" && vision[keys[i]][fusibles[j]] != null) {
			// console.log("AQUI ESTÁ LA CAJA PDC-RMID");
			pdcr_1_array.push(fusibles[j]);
			// console.log("FUSBILES DE PDCR-MID LENGTH: ",fusibles.length);
			// console.log("PDCR-MID ARRAY: ",pdcr_1_array);
			document.getElementById("pdcr_caption").innerHTML = "PDC-RMID";
			// document.getElementById("pdcr_caption_altura").innerHTML = "PDC-RMID";
			cargar_imagen_pdcr_1();
			// cargar_imagen_pdcr_1_altura();
		}
		if (caja_name == "PDC-S" && vision[keys[i]][fusibles[j]] != null) {
			// console.log("AQUI ESTÁ LA CAJA PDC-S");
			pdcs_array.push(fusibles[j]);
			// console.log("PDC-S ARRAY NUEVO: ",pdcs_array);
			cargar_imagen_pdcs();
		}
		if (caja_name == "TBLU" && vision[keys[i]][fusibles[j]] != null) {
			// console.log("AQUI ESTÁ LA CAJA TBLU");
			tblu_array.push(fusibles[j]);
			// console.log("TBLU ARRAY NUEVO: ",tblu_array);
			cargar_imagen_tblu();
		}
		if (caja_name == "PDC-D" && vision[keys[i]][fusibles[j]] != null) {
			// console.log("AQUI ESTÁ LA CAJA PDC-D");
			pdcd_array.push(fusibles[j]);
			// console.log("PDC-D ARRAY NUEVO: ",pdcd_array);
			cargar_imagen_pdcd();
		}
		if (caja_name == "PDC-P" && vision[keys[i]][fusibles[j]] != null) {
			// console.log("AQUI ESTÁ LA CAJA PDC-P");
			pdcp_array.push(fusibles[j]);
			// console.log("PDC-P ARRAY NUEVO: ",pdcp_array);
			cargar_imagen_pdcp();
		}
	}
}

function get_puntos_pdcp_t(){
	fetch(dominio+'/info/interior/torque/pdcp',{
		method: 'GET'
	}).then(res=>res.json())
	.then(function (data){
		pdcp_t_puntos=data.puntos
		// console.log(pdcp_t_puntos);
		generar_imagen_pdcp_t();
	})
}
function get_puntos_pdcd_t(){
	fetch(dominio+'/info/interior/torque/pdcd2',{
		method: 'GET'
	}).then(res=>res.json())
	.then(function (data){
		pdcd_t_puntos=data.puntos
		// console.log(pdcd_t_puntos);
		generar_imagen_pdcd_t();
	})
}
function get_puntos_mfbp1_t(){
	fetch(dominio+'/info/interior/torque/mfbp1',{
		method: 'GET'
	}).then(res=>res.json())
	.then(function (data){
		mfbp1_t_puntos=data.puntos
		// console.log(mfbp1_t_puntos);
		generar_imagen_mfbp1_t();
	})
}
function get_puntos_mfb_t(){
	fetch(dominio+'/info/interior/torque/mfbs',{
		method: 'GET'
	}).then(res=>res.json())
	.then(function (data){
		mfb_t_puntos=data.puntos
		// console.log(mfb_t_puntos);
		generar_imagen_mfb_t();
	})
}
function get_puntos_mfbp2_t(){
	fetch(dominio+'/info/interior/torque/mfbp2',{
		method: 'GET'
	}).then(res=>res.json())
	.then(function (data){
		mfbp2_t_puntos=data.puntos
		// console.log(mfbp2_t_puntos);
		generar_imagen_mfbp2_t();
	})
}
function get_puntos_pdcr_t(){
	fetch(dominio+'/info/interior/torque/pdcr2',{
		method: 'GET'
	}).then(res=>res.json())
	.then(function (data){
		pdcr_t_puntos=data.puntos
		// console.log(pdcr_t_puntos);
		generar_imagen_pdcr_t();
	})
}
function get_puntos_bt_t(){
	fetch(dominio+'/info/interior/torque/bt',{
		method: 'GET'
	}).then(res=>res.json())
	.then(function (data){
		bt_t_puntos=data.puntos
		// console.log(bt_t_puntos);
		generar_imagen_bt_t();
	})
}


function cargar_imagen_pdcr(){
	if (img_pdcr.getContext) {
		var ctx_pdcr = img_pdcr.getContext("2d");
		var img = new Image();
		img.src = "static/content/cajas/interior/pdcr/pdcr.jpg";
		img.onload = function(){
			imgWidth_pdcr = this.width;
			imgHeight_pdcr = this.height;
			img_pdcr.width = imgWidth_pdcr;
			img_pdcr.height = imgHeight_pdcr;
			// console.log("imgWidth_pdcr: ",imgWidth_pdcr);
			// console.log("imgHeight_pdcr: ",imgHeight_pdcr);
			// console.log("img_pdcr.width: ",img_pdcr.width);
			// console.log("img_pdcr.height: ",img_pdcr.height);
			ctx_pdcr.drawImage(this,0,0,imgWidth_pdcr,imgHeight_pdcr);
			var datosimagen = ctx_pdcr.getImageData(0,0,imgWidth_pdcr,imgHeight_pdcr);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcr = datosimagen.data;
            ctx_pdcr.lineWidth = "4";
            pintar_2();

            function pintar_2() {
                for (let i = 0; i < pdcr_array.length; i++) {
                    // var fusible_imagen = new Image();
                    let cavidad = pdcr_array[i];
                    // console.log("CAVIDAD : ",cavidad);
                    let fusibleColocado = vision["PDC-R"][pdcr_array[i]];
                    // console.log("Fusible Colocado: ",fusibleColocado);
    
                    let cavidadx = fuses_BB["PDC-R"][cavidad][0][0];
                    let cavidady = fuses_BB["PDC-R"][cavidad][0][1];
                    let cavidadw = fuses_BB["PDC-R"][cavidad][1][0];
                    let cavidadh = fuses_BB["PDC-R"][cavidad][1][1];
                    //  console.log(cavidadx)
                    //  console.log(cavidady)
                    //  console.log(cavidadw)
                    //  console.log(cavidadh)
                    getDistance_fuse(cavidadx, cavidady, cavidadw, cavidadh);
                    // console.log("PDC-R DISTANCE X",xDistance_fuse)
                    // console.log("PDC-R DISTANCE Y",yDistance_fuse)
                    switch (fusibleColocado) {
                        case "cafe":
                            color_style = "#8B4513"
                            break;
                        case "rojo":
                            color_style = "#FF0000"
                            break;
                        case "verde":
                            color_style = "#008000"
                            break;
                        case "azul":
                            color_style = "#0000FF"
                            break;
                        case "beige":
                            color_style = "#FFD700"
                            break;
                        case "natural":
                            color_style = "#FFFFFF"
                            break;
                        case "amarillo":
                            color_style = "#FFFF00"
                            break;
                        case "naranja":
                            color_style = "#FFA500"
                            break;
                        case "1008695":
                            color_style = "#FF00FF"
                            break;
                        case "1010733":
                            color_style = "#A9A9A9"
                            break;
                        default:
                            color_style = "#000000"
                            break;
                    }
                    ctx_pdcr.beginPath();
                    ctx_pdcr.strokeStyle = color_style;
                    ctx_pdcr.strokeRect(cavidadx, cavidady, xDistance_fuse, yDistance_fuse);
                }
            
            }
        }
    }
}

function cargar_imagen_pdcr_1(){
    if (img_pdcr.getContext) {
        var ctx_pdcr_mid = img_pdcr.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcr_1/pdcr_1.jpg";
        img.onload = function(){
            imgWidth_pdcr_mid = this.width;
            imgHeight_pdcr_mid = this.height;
            img_pdcr.width = imgWidth_pdcr_mid;
            img_pdcr.height = imgHeight_pdcr_mid;
            // console.log("imgWidth_pdcr_mid: ",imgWidth_pdcr_mid);
            // console.log("imgHeight_pdcr_mid: ",imgHeight_pdcr_mid);
            // console.log("img_pdcr.width: ",img_pdcr.width);
            // console.log("img_pdcr.height: ",img_pdcr.height);
            ctx_pdcr_mid.drawImage(this,0,0,imgWidth_pdcr_mid,imgHeight_pdcr_mid);
            var datosimagen = ctx_pdcr_mid.getImageData(0,0,imgWidth_pdcr_mid,imgHeight_pdcr_mid);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcr_mid = datosimagen.data;
            ctx_pdcr_mid.lineWidth = "4";
            pintar_2();

            function pintar_2() {
                for (let i = 0; i < pdcr_1_array.length; i++) {
                    // var fusible_imagen = new Image();
                    let cavidad = pdcr_1_array[i];
                    // console.log("CAVIDAD : ",cavidad);
                    let fusibleColocado = vision['PDC-RMID'][pdcr_1_array[i]];
                    // console.log("Fusible Colocado: ",fusibleColocado);
    
                    let cavidadx = fuses_BB["PDC-RMID"][cavidad][0][0];
                    let cavidady = fuses_BB["PDC-RMID"][cavidad][0][1];
                    let cavidadw = fuses_BB["PDC-RMID"][cavidad][1][0];
                    let cavidadh = fuses_BB["PDC-RMID"][cavidad][1][1];
                    //  console.log(cavidadx)
                    //  console.log(cavidady)
                    //  console.log(cavidadw)
                    //  console.log(cavidadh)
                    getDistance_fuse(cavidadx, cavidady, cavidadw, cavidadh);
                    // console.log("PDC-R DISTANCE X",xDistance_fuse)
                    // console.log("PDC-R DISTANCE Y",yDistance_fuse)
                    switch (fusibleColocado) {
                        case "cafe":
                            color_style = "#8B4513"
                            break;
                        case "rojo":
                            color_style = "#FF0000"
                            break;
                        case "verde":
                            color_style = "#008000"
                            break;
                        case "azul":
                            color_style = "#0000FF"
                            break;
                        case "beige":
                            color_style = "#FFD700"
                            break;
                        case "natural":
                            color_style = "#FFFFFF"
                            break;
                        case "amarillo":
                            color_style = "#FFFF00"
                            break;
                        case "naranja":
                            color_style = "#FFA500"
                            break;
                        case "1008695":
                            color_style = "#FF00FF"
                            break;
                        case "1010733":
                            color_style = "#A9A9A9"
                            break;
                        default:
                            color_style = "#000000"
                            break; 
                    }
                    ctx_pdcr_mid.beginPath();
                    ctx_pdcr_mid.strokeStyle = color_style;
                    ctx_pdcr_mid.strokeRect(cavidadx, cavidady, xDistance_fuse, yDistance_fuse);
                }
            }
        }
    }
}

function cargar_imagen_pdcs(){
    if (img_pdcs.getContext) {
        var ctx = img_pdcs.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcs/pdcs.jpg";
        img.onload = function(){
            imgWidth_pdcs = this.width;
            imgHeight_pdcs = this.height;
            img_pdcs.width = imgWidth_pdcs;
            img_pdcs.height = imgHeight_pdcs;
            // console.log("imgWidth_pdcs: ",imgWidth_pdcs);
            // console.log("imgHeight_pdcs: ",imgHeight_pdcs);
            // console.log("img_pdcs.width: ",img_pdcs.width);
            // console.log("img_pdcs.height: ",img_pdcs.height);
            ctx.drawImage(this,0,0,imgWidth_pdcs,imgHeight_pdcs);
            var datosimagen = ctx.getImageData(0,0,imgWidth_pdcs,imgHeight_pdcs);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcs = datosimagen.data;
            ctx.lineWidth = "4";
            pintar_2();

            function pintar_2(){
                for (var i = 0; i < pdcs_array.length; i++) {
                    pdcs_array[i]
                    // console.log("pdcs_array[i]",pdcs_array[i]);
                    // console.log("pdcs_array[i] COLOR: ",vision["PDC-S"][pdcs_array[i]])                 
                    switch (pdcs_array[i]){
                        case "1":
                        switch (vision["PDC-S"][pdcs_array[i]]){
                            case "rojo":
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(439, 218,48,175);
                            break;
                            case "cafe":
                            ctx.beginPath();
                            ctx.strokeStyle = "#8B4513";
                            ctx.strokeRect(439, 218,48,175);
                            break;
                            case "vacio":
                            ctx.beginPath();
                            ctx.strokeStyle = "#000000";
                            ctx.strokeRect(439, 218,48,175);
                            break;
                        }                        
                        break;
                        case "2":
                        switch (vision["PDC-S"][pdcs_array[i]]){
                            case "rojo":
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(494, 218,48,175);
                            break;
                            case "cafe":
                            ctx.beginPath();
                            ctx.strokeStyle = "#8B4513";
                            ctx.strokeRect(494, 218,48,175);
                            break;
                            case "vacio":
                            ctx.beginPath();
                            ctx.strokeStyle = "#000000";
                            ctx.strokeRect(494, 218,48,175);
                            break;
                        }
                        break;
                        case "3":
                        switch (vision["PDC-S"][pdcs_array[i]]){
                            case "rojo":
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(550, 218,48,175);
                            break;
                            case "cafe":
                            ctx.beginPath();
                            ctx.strokeStyle = "#8B4513";
                            ctx.strokeRect(550, 218,48,175);
                            break;
                            case "vacio":
                            ctx.beginPath();
                            ctx.strokeStyle = "#000000";
                            ctx.strokeRect(550, 218,48,175);
                            break;
                        }
                        break;
                        case "4":
                        switch (vision["PDC-S"][pdcs_array[i]]){
                            case "rojo":
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(607, 219,48,175);
                            break;
                            case "cafe":
                            ctx.beginPath();
                            ctx.strokeStyle = "#8B4513";
                            ctx.strokeRect(607, 219,48,175);
                            break;
                            case "vacio":
                            ctx.beginPath();
                            ctx.strokeStyle = "#000000";
                            ctx.strokeRect(607, 219,48,175);
                            break;
                        }
                        break;
                        case "5":
                        switch (vision["PDC-S"][pdcs_array[i]]){
                            case "rojo":
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(661, 218,48,175);
                            break;
                            case "cafe":
                            ctx.beginPath();
                            ctx.strokeStyle = "#8B4513";
                            ctx.strokeRect(661, 218,48,175);
                            break;
                            case "vacio":
                            ctx.beginPath();
                            ctx.strokeStyle = "#000000";
                            ctx.strokeRect(661, 218,48,175);
                            break;
                        }
                        break;
                        case "6":
                        switch (vision["PDC-S"][pdcs_array[i]]){
                            case "rojo":
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(719, 218,48,175);
                            break;
                            case "cafe":
                            ctx.beginPath();
                            ctx.strokeStyle = "#8B4513";
                            ctx.strokeRect(719, 218,48,175);
                            break;
                            case "vacio":
                            ctx.beginPath();
                            ctx.strokeStyle = "#000000";
                            ctx.strokeRect(719, 218,48,175);
                            break;
                        }
                        break;
                        default:
                    }
                }
            }
        }
    }
}

function cargar_imagen_tblu(){
    if (img_tblu.getContext) {
        var ctx_tblu = img_tblu.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/btlu/btlu.jpg";
        img.onload = function(){
            imgWidth_tblu = this.width;
            imgHeight_tblu = this.height;
            img_tblu.width = imgWidth_tblu;
            img_tblu.height = imgHeight_tblu;
            // console.log("imgWidth_tblu: ",imgWidth_tblu);
            // console.log("imgHeight_tblu: ",imgHeight_tblu);
            // console.log("img_tblu.width: ",img_tblu.width);
            // console.log("img_tblu.height: ",img_tblu.height);
            ctx_tblu.drawImage(this,0,0,imgWidth_tblu,imgHeight_tblu);
            var datosimagen = ctx_tblu.getImageData(0,0,imgWidth_tblu,imgHeight_tblu);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_tblu = datosimagen.data;
            ctx_tblu.lineWidth = "4";
            pintar_2();

            function pintar_2(){
                for (var i = 0; i < tblu_array.length; i++) {
                    tblu_array[i]
                    // console.log("tblu_array[i]",tblu_array[i]);
                    // console.log("tblu_array[i] COLOR: ",vision["TBLU"][tblu_array[i]])                 
                    switch (tblu_array[i]){
                        case "A1-9":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "rojo":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(79, 531,40,68);
                            break;
                            case "beige":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(79, 531,40,68);
                            break;
                            case "azul":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(79, 531,40,68);
                            break;
                            case "vacio":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#000000";
                            ctx_tblu.strokeRect(79, 531,40,68);
                            break;
                        }                        
                        break;
                        case "A1-8":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "rojo":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(125, 532,40,68);
                            break;
                            case "beige":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(125, 532,40,68);
                            break;
                            case "azul":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(125, 532,40,68);
                            break;
                            case "vacio":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#000000";
                            ctx_tblu.strokeRect(125, 532,40,68);
                            break;
                        }
                        break;
                        case "A1-7":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "rojo":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(167, 532,40,68);
                            break;
                            case "beige":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(167, 532,40,68);
                            break;
                            case "azul":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(167, 532,40,68);
                            break;
                            case "vacio":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#000000";
                            ctx_tblu.strokeRect(167, 532,40,68);
                            break;
                        }
                        break;
                        case "A1-6":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "rojo":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(212, 532,40,68);
                            break;
                            case "beige":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(212, 532,40,68);
                            break;
                            case "azul":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(212, 532,40,68);
                            break;
                            case "vacio":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#000000";
                            ctx_tblu.strokeRect(212, 532,40,68);
                            break;
                        }
                        break;
                        case "A1-5":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "rojo":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(257, 531,40,68);
                            break;
                            case "beige":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(257, 531,40,68);
                            break;
                            case "azul":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(257, 531,40,68);
                            break;
                            case "vacio":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#000000";
                            ctx_tblu.strokeRect(257, 531,40,68);
                            break;
                        }
                        break;
                        case "A1-4":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "rojo":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(300, 530,40,68);
                            break;
                            case "beige":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(300, 530,40,68);
                            break;
                            case "azul":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(300, 530,40,68);
                            break;
                            case "vacio":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#000000";
                            ctx_tblu.strokeRect(300, 530,40,68);
                            break;
                        }
                        break;
                        case "A1-3":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "rojo":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(347, 533,40,68);
                            break;
                            case "beige":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(347, 533,40,68);
                            break;
                            case "azul":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(347, 533,40,68);
                            break;
                            case "vacio":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#000000";
                            ctx_tblu.strokeRect(347, 533,40,68);
                            break;
                        }
                        break;
                        case "A1-2":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "rojo":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(388, 531,40,68);
                            break;
                            case "beige":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(388, 531,40,68);
                            break;
                            case "azul":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(388, 531,40,68);
                            break;
                            case "vacio":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#000000";
                            ctx_tblu.strokeRect(388, 531,40,68);
                            break;
                        }
                        break;
                        case "A1-1":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "rojo":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(435, 531,40,68);
                            break;
                            case "beige":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(435, 531,40,68);
                            break;
                            case "azul":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(435, 531,40,68);
                            break;
                            case "vacio":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#000000";
                            ctx_tblu.strokeRect(435, 531,40,68);
                            break;
                        }
                        break;
                        default:
                    }
                }
            }
        }
    }
}

function cargar_imagen_pdcd(){
    if (img_pdcd.getContext) {
        var ctx_pdcd = img_pdcd.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcd/pdcd.jpg";
        img.onload = function(){
            imgWidth_pdcd = this.width;
            imgHeight_pdcd = this.height;
            img_pdcd.width = imgWidth_pdcd;
            img_pdcd.height = imgHeight_pdcd;
            // console.log("imgWidth_pdcd: ",imgWidth_pdcd);
            // console.log("imgHeight_pdcd: ",imgHeight_pdcd);
            // console.log("img_pdcd.width: ",img_pdcd.width);
            // console.log("img_pdcd.height: ",img_pdcd.height);
            ctx_pdcd.drawImage(this,0,0,imgWidth_pdcd,imgHeight_pdcd);
            var datosimagen = ctx_pdcd.getImageData(0,0,imgWidth_pdcd,imgHeight_pdcd);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcd = datosimagen.data;
            ctx_pdcd.lineWidth = "4";
            pintar_2();

            function pintar_2(){
                for (var i = 0; i < pdcd_array.length; i++) {
                    pdcd_array[i]
                    // console.log("pdcd_array[i]",pdcd_array[i]);
                    // console.log("pdcd_array[i] COLOR: ",vision["PDC-D"][pdcd_array[i]])                 
                    switch (pdcd_array[i]){
                        case "F200":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                        }                        
                        break;
                        case "F201":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(270, 555,28,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(270, 555,28,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(270, 555,28,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(270, 555,28,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(270, 555,28,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(270, 555,28,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(270, 555,28,12);
                            break;
                        }                        
                        break;
                        case "F202":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(274, 540,28,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(274, 540,28,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(274, 540,28,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(274, 540,28,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(274, 540,28,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(274, 540,28,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(274, 540,28,12);
                            break;
                        }
                        break;
                        case "F203":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(272, 523,28,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(272, 523,28,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(272, 523,28,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(272, 523,28,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(272, 523,28,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(272, 523,28,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(272, 523,28,12);
                            break;
                        }
                        break;
                        case "F204":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(270, 504,28,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(270, 504,28,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(270, 504,28,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(270, 504,28,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(270, 504,28,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(270, 504,28,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(270, 504,28,12);
                            break;
                        }
                        break;
                        case "F205":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                        }
                        break;
                        case "F206":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(272, 471,28,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(272, 471,28,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(272, 471,28,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(272, 471,28,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(272, 471,28,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(272, 471,28,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(272, 471,28,12);
                            break;
                        }
                        break;
                        case "F207":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(270, 455,28,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(270, 455,28,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(270, 455,28,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(270, 455,28,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(270, 455,28,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(270, 455,28,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(270, 455,28,12);
                            break;
                        }
                        break;
                        case "F208":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(274, 438,28,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(274, 438,28,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(274, 438,28,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(274, 438,28,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(274, 438,28,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(274, 438,28,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(274, 438,28,12);
                            break;
                        }
                        break;
                        case "F209":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(367, 573,52,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(367, 573,52,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(367, 573,52,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(367, 573,52,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(367, 573,52,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(367, 573,52,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(367, 573,52,12);
                            break;
                        }
                        break;
                        case "F210":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(368, 553,52,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(368, 553,52,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(368, 553,52,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(368, 553,52,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(368, 553,52,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(368, 553,52,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(368, 553,52,12);
                            break;
                        }
                        break;
                        case "F211":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(367, 536,52,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(367, 536,52,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(367, 536,52,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(367, 536,52,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(367, 536,52,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(367, 536,52,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(367, 536,52,12);
                            break;
                        }
                        break;
                        case "F212":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(369, 520,52,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(369, 520,52,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(369, 520,52,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(369, 520,52,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(369, 520,52,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(369, 520,52,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(369, 520,52,12);
                            break;
                        }
                        break;
                        case "F213":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(370, 504,52,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(370, 504,52,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(370, 504,52,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(370, 504,52,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(370, 504,52,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(370, 504,52,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(370, 504,52,12);
                            break;
                        }
                        break;
                        case "F214":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(368, 486,52,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(368, 486,52,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(368, 486,52,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(368, 486,52,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(368, 486,52,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(368, 486,52,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(368, 486,52,12);
                            break;
                        }
                        break;
                        case "F215":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(367, 470,52,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(367, 470,52,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(367, 470,52,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(367, 470,52,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(367, 470,52,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(367, 470,52,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(367, 470,52,12);
                            break;
                        }
                        break;
                        case "F216":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                        }
                        break;
                        case "F217":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(292, 401,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(292, 401,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(292, 401,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(292, 401,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(292, 401,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(292, 401,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(292, 401,18,12);
                            break;
                        }
                        break;
                        case "F218":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(292, 385,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(292, 385,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(292, 385,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(292, 385,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(292, 385,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(292, 385,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(292, 385,18,12);
                            break;
                        }
                        break;
                        case "F219":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                        }
                        break;
                        case "F220":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(293, 351,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(293, 351,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(293, 351,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(293, 351,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(293, 351,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(293, 351,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(293, 351,18,12);
                            break;
                        }
                        break;
                        case "F221":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(293, 334,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(293, 334,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(293, 334,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(293, 334,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(293, 334,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(293, 334,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(293, 334,18,12);
                            break;
                        }
                        break;
                        case "F222":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                        }
                        break;
                        case "F223":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                        }
                        break;
                        case "F224":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(343, 366,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(343, 366,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(343, 366,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(343, 366,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(343, 366,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(343, 366,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(343, 366,18,12);
                            break;
                        }
                        break;
                        case "F225":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(344, 349,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(344, 349,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(344, 349,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(344, 349,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(344, 349,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(344, 349,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(344, 349,18,12);
                            break;
                        }
                        break;
                        case "F226":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(343, 332,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(343, 332,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(343, 332,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(343, 332,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(343, 332,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(343, 332,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(343, 332,18,12);
                            break;
                        }
                        break;
                        case "F227":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                        }
                        break;
                        case "F228":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(376, 401,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(376, 401,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(376, 401,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(376, 401,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(376, 401,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(376, 401,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(376, 401,18,12);
                            break;
                        }
                        break;
                        case "F229":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(377, 386,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(377, 386,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(377, 386,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(377, 386,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(377, 386,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(377, 386,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(377, 386,18,12);
                            break;
                        }
                        break;
                        case "F230":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(378, 367,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(378, 367,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(378, 367,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(378, 367,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(378, 367,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(378, 367,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(378, 367,18,12);
                            break;
                        }
                        break;
                        case "F231":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                        }
                        break;
                        case "F232":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(376, 333,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(376, 333,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(376, 333,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(376, 333,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(376, 333,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(376, 333,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(376, 333,18,12);
                            break;
                        }
                        break;
                        default:
                    }
                }
            }
        }
    }
}

function cargar_imagen_pdcp(){
    if (img_pdcp.getContext) {
        var ctx_pdcp = img_pdcp.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcp/pdcp.jpg";
        img.onload = function(){
            imgWidth_pdcp = this.width;
            imgHeight_pdcp = this.height;
            img_pdcp.width = imgWidth_pdcp;
            img_pdcp.height = imgHeight_pdcp;
            // console.log("imgWidth_pdcp: ",imgWidth_pdcp);
            // console.log("imgHeight_pdcp: ",imgHeight_pdcp);
            // console.log("img_pdcp.width: ",img_pdcp.width);
            // console.log("img_pdcp.height: ",img_pdcp.height);
            ctx_pdcp.drawImage(this,0,0,imgWidth_pdcp,imgHeight_pdcp);
            var datosimagen = ctx_pdcp.getImageData(0,0,imgWidth_pdcp,imgHeight_pdcp);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcp = datosimagen.data;
            ctx_pdcp.lineWidth = "4";
            pintar_2();

            function pintar_2(){
                for (var i = 0; i < pdcp_array.length; i++) {
                    pdcp_array[i]
                    // console.log("pdcp_array[i]",pdcp_array[i]);
                    // console.log("pdcp_array[i] COLOR: ",vision["PDC-P"][pdcp_array[i]])                 
                    switch (pdcp_array[i]){
                        case "MF1":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                        }                        
                        break;
                        case "MF2":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                        }
                        break;
                        case "F300":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                        }
                        break;
                        case "F301":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                        }
                        break;
                        case "F302":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                        }
                        break;
                        case "F303":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(292, 350,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(292, 350,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(292, 350,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(292, 350,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(292, 350,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(292, 350,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(292, 350,28,10);
                            break;
                        }
                        break;
                        case "F304":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(291, 335,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(291, 335,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(291, 335,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(291, 335,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(291, 335,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(291, 335,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(291, 335,28,10);
                            break;
                        }
                        break;
                        case "F305":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(292, 322,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(292, 322,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(292, 322,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(292, 322,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(292, 322,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(292, 322,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(292, 322,28,10);
                            break;
                        }
                        break;
                        case "F318":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                        }
                        break;
                        case "F319":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(342, 415,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(342, 415,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(342, 415,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(342, 415,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(342, 415,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(342, 415,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(342, 415,28,10);
                            break;
                        }
                        break;
                        case "F320":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(343, 400,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(343, 400,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(343, 400,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(343, 400,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(343, 400,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(343, 400,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(343, 400,28,10);
                            break;
                        }
                        break;
                        case "F321":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(342, 384,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(342, 384,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(342, 384,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(342, 384,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(342, 384,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(342, 384,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(342, 384,28,10);
                            break;
                        }
                        break;
                        case "F322":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(344, 368,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(344, 368,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(344, 368,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(344, 368,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(344, 368,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(344, 368,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(344, 368,28,10);
                            break;
                        }
                        break;
                        case "F323":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(342, 354,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(342, 354,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(342, 354,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(342, 354,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(342, 354,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(342, 354,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(342, 354,28,10);
                            break;
                        }
                        break;
                        case "F324":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(344, 340,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(344, 340,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(344, 340,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(344, 340,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(344, 340,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(344, 340,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(344, 340,28,10);
                            break;
                        }
                        break;
                        case "F325":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(343, 326,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(343, 326,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(343, 326,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(343, 326,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(343, 326,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(343, 326,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(343, 326,28,10);
                            break;
                        }
                        break;
                        case "F326":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                        }
                        break;
                        case "F327":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(379, 413,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(379, 413,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(379, 413,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(379, 413,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(379, 413,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(379, 413,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(379, 413,45,10);
                            break;
                        }
                        break;
                        case "F328":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(379, 398,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(379, 398,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(379, 398,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(379, 398,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(379, 398,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(379, 398,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(379, 398,45,10);
                            break;
                        }
                        break;
                        case "F329":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(380, 384,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(380, 384,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(380, 384,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(380, 384,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(380, 384,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(380, 384,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(380, 384,45,10);
                            break;
                        }
                        break;
                        case "F330":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(380, 369,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(380, 369,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(380, 369,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(380, 369,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(380, 369,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(380, 369,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(380, 369,45,10);
                            break;
                        }
                        break;
                        case "F331":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(380, 354,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(380, 354,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(380, 354,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(380, 354,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(380, 354,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(380, 354,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(380, 354,45,10);
                            break;
                        }
                        break;
                        case "F332":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(381, 339,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(381, 339,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(381, 339,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(381, 339,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(381, 339,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(381, 339,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(381, 339,45,10);
                            break;
                        }
                        break;
                        case "F333":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(380, 324,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(380, 324,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(380, 324,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(380, 324,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(380, 324,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(380, 324,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(380, 324,45,10);
                            break;
                        }
                        break;
                        case "F334":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(380, 309,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(380, 309,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(380, 309,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(380, 309,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(380, 309,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(380, 309,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(380, 309,45,10);
                            break;
                        }
                        break;
                        case "F335":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(380, 294,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(380, 294,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(380, 294,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(380, 294,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(380, 294,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(380, 294,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(380, 294,45,10);
                            break;
                        }
                        break;
                        case "E21":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                        }
                        break;
                        case "E22":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                        }
                        break;
                        default:
                    }
                }
            }
        }
    }
}

function cargar_imagen_pdcr_altura(){
	if (img_pdcr_a.getContext) {
		var ctx_pdcr = img_pdcr_a.getContext("2d");
		var img = new Image();
		img.src = "static/content/cajas/interior/pdcr/pdcr.jpg";
		img.onload = function(){
			imgWidth_pdcr = this.width;
			imgHeight_pdcr = this.height;
			img_pdcr_a.width = imgWidth_pdcr;
			img_pdcr_a.height = imgHeight_pdcr;
			// console.log("imgWidth_pdcr: ",imgWidth_pdcr);
			// console.log("imgHeight_pdcr: ",imgHeight_pdcr);
			// console.log("img_pdcr_a.width: ",img_pdcr_a.width);
			// console.log("img_pdcr_a.height: ",img_pdcr_a.height);
			ctx_pdcr.drawImage(this,0,0,imgWidth_pdcr,imgHeight_pdcr);
			var datosimagen = ctx_pdcr.getImageData(0,0,imgWidth_pdcr,imgHeight_pdcr);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcr = datosimagen.data;
            ctx_pdcr.lineWidth = "4";
            pintar_2();

            function pintar_2(){
            	for (var i = 0; i < pdcr_array.length; i++) {
            		pdcr_array[i]
            		// console.log("pdcr_array[i]",pdcr_array[i]);
            		// console.log("pdcr_array[i] COLOR: ",vision["PDC-R"][pdcr_array[i]])                 
            		switch (pdcr_array[i]){
            			case "F400":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(235, 97,10,35);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(235, 97,10,35);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(235, 97,10,35);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(235, 97,10,35);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(235, 97,10,35);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(235, 97,10,35);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(235, 97,10,35);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(235, 97,10,35);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(235, 97,10,35);
            				break;
            			} 
            			break;
            			case "F401":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(245, 95,10,35);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(245, 95,10,35);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(245, 95,10,35);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(245, 95,10,35);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(245, 95,10,35);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(245, 95,10,35);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(245, 95,10,35);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(245, 95,10,35);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(245, 95,10,35);
            				break;
            			}
            			break;
            			case "F402":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(256, 97,10,35);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(256, 97,10,35);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(256, 97,10,35);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(256, 97,10,35);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(256, 97,10,35);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(256, 97,10,35);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(256, 97,10,35);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(256, 97,10,35);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(256, 97,10,35);
            				break;
            			}
            			break;
            			case "F403":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(266, 96,10,35);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(266, 96,10,35);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(266, 96,10,35);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(266, 96,10,35);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(266, 96,10,35);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(266, 96,10,35);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(266, 96,10,35);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(266, 96,10,35);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(266, 96,10,35);
            				break;
            			}
            			break;
            			case "F404":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(277, 97,10,35);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(277, 97,10,35);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(277, 97,10,35);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(277, 97,10,35);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(277, 97,10,35);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(277, 97,10,35);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(277, 97,10,35);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(277, 97,10,35);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(277, 97,10,35);
            				break;
            			}
            			break;
            			case "F405":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(285, 96,10,35);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(285, 96,10,35);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(285, 96,10,35);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(285, 96,10,35);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(285, 96,10,35);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(285, 96,10,35);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(285, 96,10,35);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(285, 96,10,35);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(285, 96,10,35);
            				break;
            			}
            			break;
            			case "F406":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(309, 103,10,20);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(309, 103,10,20);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(309, 103,10,20);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(309, 103,10,20);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(309, 103,10,20);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(309, 103,10,20);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(309, 103,10,20);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(309, 103,10,20);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(309, 103,10,20);
            				break;
            			}
            			break;
            			case "F407":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(321, 102,10,20);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(321, 102,10,20);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(321, 102,10,20);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(321, 102,10,20);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(321, 102,10,20);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(321, 102,10,20);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(321, 102,10,20);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(321, 102,10,20);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(321, 102,10,20);
            				break;
            			}
            			break;
            			case "F408":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(330, 103,10,20);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(330, 103,10,20);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(330, 103,10,20);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(330, 103,10,20);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(330, 103,10,20);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(330, 103,10,20);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(330, 103,10,20);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(330, 103,10,20);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(330, 103,10,20);
            				break;
            			}
            			break;
            			case "F409":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(343, 103,10,20);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(343, 103,10,20);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(343, 103,10,20);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(343, 103,10,20);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(343, 103,10,20);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(343, 103,10,20);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(343, 103,10,20);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(343, 103,10,20);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(343, 103,10,20);
            				break;
            			}
            			break;
            			case "F410":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(353, 103,10,20);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(353, 103,10,20);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(353, 103,10,20);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(353, 103,10,20);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(353, 103,10,20);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(353, 103,10,20);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(353, 103,10,20);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(353, 103,10,20);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(353, 103,10,20);
            				break;
            			}
            			break;
            			case "F411":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(363, 103,10,20);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(363, 103,10,20);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(363, 103,10,20);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(363, 103,10,20);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(363, 103,10,20);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(363, 103,10,20);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(363, 103,10,20);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(363, 103,10,20);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(363, 103,10,20);
            				break;
            			}
            			break;
            			case "F412":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(195, 110,30,10);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(195, 110,30,10);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(195, 110,30,10);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(195, 110,30,10);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(195, 110,30,10);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(195, 110,30,10);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(195, 110,30,10);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(195, 110,30,10);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(195, 110,30,10);
            				break;
            			}
            			break;
            			case "F413":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(196, 121,30,10);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(196, 121,30,10);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(196, 121,30,10);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(196, 121,30,10);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(196, 121,30,10);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(196, 121,30,10);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(196, 121,30,10);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(196, 121,30,10);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(196, 121,30,10);
            				break;
            			}
            			break;
            			case "F414":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(192, 132,30,10);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(192, 132,30,10);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(192, 132,30,10);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(192, 132,30,10);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(192, 132,30,10);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(192, 132,30,10);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(192, 132,30,10);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(192, 132,30,10);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(192, 132,30,10);
            				break;
            			}
            			break;
            			case "F415":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(195, 142,30,10);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(195, 142,30,10);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(195, 142,30,10);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(195, 142,30,10);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(195, 142,30,10);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(195, 142,30,10);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(195, 142,30,10);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(195, 142,30,10);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(195, 142,30,10);
            				break;
            			}
            			break;
            			case "F416":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(197, 151,30,10);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(197, 151,30,10);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(197, 151,30,10);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(197, 151,30,10);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(197, 151,30,10);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(197, 151,30,10);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(197, 151,30,10);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(197, 151,30,10);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(197, 151,30,10);
            				break;
            			}
            			break;
            			case "F417":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(196, 161,30,10);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(196, 161,30,10);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(196, 161,30,10);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(196, 161,30,10);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(196, 161,30,10);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(196, 161,30,10);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(196, 161,30,10);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(196, 161,30,10);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(196, 161,30,10);
            				break;
            			}
            			break;
            			case "F418":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(380, 106,50,20);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(380, 106,50,20);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(380, 106,50,20);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(380, 106,50,20);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(380, 106,50,20);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(380, 106,50,20);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(380, 106,50,20);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(380, 106,50,20);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(380, 106,50,20);
            				break;
            			}
            			break;
            			case "F419":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(379, 131,50,20);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(379, 131,50,20);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(379, 131,50,20);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(379, 131,50,20);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(379, 131,50,20);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(379, 131,50,20);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(379, 131,50,20);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(379, 131,50,20);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(379, 131,50,20);
            				break;
            			}
            			break;
            			case "F420":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(377, 152,50,20);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(377, 152,50,20);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(377, 152,50,20);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(377, 152,50,20);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(377, 152,50,20);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(377, 152,50,20);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(377, 152,50,20);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(377, 152,50,20);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(377, 152,50,20);
            				break;
            			}
            			break;
            			case "F421":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(196, 187,30,10);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(196, 187,30,10);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(196, 187,30,10);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(196, 187,30,10);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(196, 187,30,10);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(196, 187,30,10);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(196, 187,30,10);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(196, 187,30,10);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(196, 187,30,10);
            				break;
            			}
            			break;
            			case "F422":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(196, 197,30,10);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(196, 197,30,10);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(196, 197,30,10);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(196, 197,30,10);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(196, 197,30,10);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(196, 197,30,10);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(196, 197,30,10);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(196, 197,30,10);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(196, 197,30,10);
            				break;
            			}
            			break;
            			case "F423":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(195, 207,30,10);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(195, 207,30,10);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(195, 207,30,10);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(195, 207,30,10);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(195, 207,30,10);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(195, 207,30,10);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(195, 207,30,10);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(195, 207,30,10);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(195, 207,30,10);
            				break;
            			}
            			break;
            			case "F424":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(197, 218,30,10);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(197, 218,30,10);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(197, 218,30,10);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(197, 218,30,10);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(197, 218,30,10);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(197, 218,30,10);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(197, 218,30,10);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(197, 218,30,10);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(197, 218,30,10);
            				break;
            			}
            			break;
            			case "F425":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(197, 230,30,10);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(197, 230,30,10);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(197, 230,30,10);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(197, 230,30,10);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(197, 230,30,10);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(197, 230,30,10);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(197, 230,30,10);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(197, 230,30,10);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(197, 230,30,10);
            				break;
            			}
            			break;
            			case "F426":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(197, 237,30,10);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(197, 237,30,10);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(197, 237,30,10);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(197, 237,30,10);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(197, 237,30,10);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(197, 237,30,10);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(197, 237,30,10);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(197, 237,30,10);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(197, 237,30,10);
            				break;
            			}
            			break;
            			case "F427":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(246, 190,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(246, 190,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(246, 190,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(246, 190,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(246, 190,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(246, 190,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(246, 190,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(246, 190,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(246, 190,10,16);
            				break;
            			}
            			break;
            			case "F428":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(258, 191,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(258, 191,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(258, 191,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(258, 191,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(258, 191,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(258, 191,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(258, 191,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(258, 191,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(258, 191,10,16);
            				break;
            			}
            			break;
            			case "F429":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(267, 191,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(267, 191,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(267, 191,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(267, 191,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(267, 191,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(267, 191,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(267, 191,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(267, 191,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(267, 191,10,16);
            				break;
            			}
            			break;
            			case "F430":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(279, 190,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(279, 190,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(279, 190,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(279, 190,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(279, 190,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(279, 190,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(279, 190,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(279, 190,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(279, 190,10,16);
            				break;
            			}
            			break;
            			case "F431":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(289, 190,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(289, 190,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(289, 190,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(289, 190,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(289, 190,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(289, 190,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(289, 190,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(289, 190,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(289, 190,10,16);
            				break;
            			}
            			break;
            			case "F432":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(315, 188,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(315, 188,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(315, 188,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(315, 188,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(315, 188,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(315, 188,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(315, 188,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(315, 188,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(315, 188,10,16);
            				break;
            			}
            			break;
            			case "F433":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(323, 187,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(323, 187,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(323, 187,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(323, 187,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(323, 187,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(323, 187,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(323, 187,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(323, 187,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(323, 187,10,16);
            				break;
            			}
            			break;
            			case "F434":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(334, 190,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(334, 190,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(334, 190,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(334, 190,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(334, 190,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(334, 190,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(334, 190,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(334, 190,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(334, 190,10,16);
            				break;
            			}
            			break;
            			case "F435":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(343, 188,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(343, 188,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(343, 188,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(343, 188,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(343, 188,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(343, 188,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(343, 188,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(343, 188,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(343, 188,10,16);
            				break;
            			}
            			break;
            			case "F436":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(353, 190,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(353, 190,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(353, 190,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(353, 190,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(353, 190,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(353, 190,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(353, 190,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(353, 190,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(353, 190,10,16);
            				break;
            			}
            			break;
            			case "F437":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(248, 212,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(248, 212,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(248, 212,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(248, 212,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(248, 212,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(248, 212,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(248, 212,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(248, 212,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(248, 212,10,16);
            				break;
            			}
            			break;
            			case "F438":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(259, 212,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(259, 212,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(259, 212,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(259, 212,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(259, 212,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(259, 212,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(259, 212,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(259, 212,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(259, 212,10,16);
            				break;
            			}
            			break;
            			case "F439":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(272, 212,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(272, 212,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(272, 212,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(272, 212,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(272, 212,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(272, 212,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(272, 212,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(272, 212,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(272, 212,10,16);
            				break;
            			}
            			break;
            			case "F440":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(279, 211,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(279, 211,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(279, 211,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(279, 211,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(279, 211,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(279, 211,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(279, 211,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(279, 211,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(279, 211,10,16);
            				break;
            			}
            			break;
            			case "F441":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(290, 212,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(290, 212,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(290, 212,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(290, 212,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(290, 212,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(290, 212,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(290, 212,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(290, 212,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(290, 212,10,16);
            				break;
            			}
            			break;
            			case "F442":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(315, 213,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(315, 213,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(315, 213,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(315, 213,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(315, 213,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(315, 213,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(315, 213,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(315, 213,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(315, 213,10,16);
            				break;
            			}
            			break;
            			case "F443":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(326, 211,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(326, 211,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(326, 211,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(326, 211,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(326, 211,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(326, 211,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(326, 211,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(326, 211,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(326, 211,10,16);
            				break;
            			}
            			break;
            			case "F444":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(338, 213,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(338, 213,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(338, 213,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(338, 213,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(338, 213,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(338, 213,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(338, 213,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(338, 213,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(338, 213,10,16);
            				break;
            			}
            			break;
            			case "F445":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(348, 214,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(348, 214,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(348, 214,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(348, 214,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(348, 214,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(348, 214,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(348, 214,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(348, 214,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(348, 214,10,16);
            				break;
            			}
            			break;
            			case "F446":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(355, 214,10,16);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(355, 214,10,16);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(355, 214,10,16);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(355, 214,10,16);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(355, 214,10,16);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(355, 214,10,16);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(355, 214,10,16);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(355, 214,10,16);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(355, 214,10,16);
            				break;
            			}
            			break;
            			case "F447":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(381, 188,50,20);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(381, 188,50,20);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(381, 188,50,20);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(381, 188,50,20);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(381, 188,50,20);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(381, 188,50,20);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(381, 188,50,20);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(381, 188,50,20);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(381, 188,50,20);
            				break;
            			}
            			break;
            			case "F448":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(380, 211,50,20);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(380, 211,50,20);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(380, 211,50,20);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(380, 211,50,20);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(380, 211,50,20);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(380, 211,50,20);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(380, 211,50,20);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(380, 211,50,20);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(380, 211,50,20);
            				break;
            			}
            			break;
            			case "F449":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(380, 236,50,20);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(380, 236,50,20);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(380, 236,50,20);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(380, 236,50,20);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(380, 236,50,20);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(380, 236,50,20);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(380, 236,50,20);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(380, 236,50,20);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(380, 236,50,20);
            				break;
            			}
            			break;
            			case "F450":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(233, 238,10,34);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(233, 238,10,34);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(233, 238,10,34);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(233, 238,10,34);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(233, 238,10,34);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(233, 238,10,34);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(233, 238,10,34);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(233, 238,10,34);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(233, 238,10,34);
            				break;
            			}
            			break;
            			case "F451":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(244, 239,10,34);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(244, 239,10,34);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(244, 239,10,34);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(244, 239,10,34);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(244, 239,10,34);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(244, 239,10,34);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(244, 239,10,34);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(244, 239,10,34);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(244, 239,10,34);
            				break;
            			}
            			break;
            			case "F452":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(256, 239,10,34);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(256, 239,10,34);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(256, 239,10,34);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(256, 239,10,34);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(256, 239,10,34);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(256, 239,10,34);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(256, 239,10,34);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(256, 239,10,34);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(256, 239,10,34);
            				break;
            			}
            			break;
            			case "F453":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(266, 240,10,34);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(266, 240,10,34);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(266, 240,10,34);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(266, 240,10,34);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(266, 240,10,34);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(266, 240,10,34);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(266, 240,10,34);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(266, 240,10,34);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(266, 240,10,34);
            				break;
            			}
            			break;
            			case "F454":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(276, 238,10,34);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(276, 238,10,34);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(276, 238,10,34);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(276, 238,10,34);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(276, 238,10,34);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(276, 238,10,34);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(276, 238,10,34);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(276, 238,10,34);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(276, 238,10,34);
            				break;
            			}
            			break;
            			case "F455":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(287, 239,10,34);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(287, 239,10,34);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(287, 239,10,34);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(287, 239,10,34);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(287, 239,10,34);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(287, 239,10,34);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(287, 239,10,34);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(287, 239,10,34);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(287, 239,10,34);
            				break;
            			}
            			break;
            			case "F456":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(310, 237,10,34);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(310, 237,10,34);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(310, 237,10,34);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(310, 237,10,34);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(310, 237,10,34);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(310, 237,10,34);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(310, 237,10,34);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(310, 237,10,34);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(310, 237,10,34);
            				break;
            			}
            			break;
            			case "F457":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(321, 238,10,34);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(321, 238,10,34);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(321, 238,10,34);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(321, 238,10,34);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(321, 238,10,34);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(321, 238,10,34);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(321, 238,10,34);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(321, 238,10,34);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(321, 238,10,34);
            				break;
            			}
            			break;
            			case "F458":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(333, 238,10,34);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(333, 238,10,34);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(333, 238,10,34);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(333, 238,10,34);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(333, 238,10,34);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(333, 238,10,34);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(333, 238,10,34);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(333, 238,10,34);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(333, 238,10,34);
            				break;
            			}
            			break;
            			case "F459":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(344, 239,10,34);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(344, 239,10,34);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(344, 239,10,34);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(344, 239,10,34);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(344, 239,10,34);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(344, 239,10,34);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(344, 239,10,34);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(344, 239,10,34);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(344, 239,10,34);
            				break;
            			}
            			break;
            			case "F460":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(353, 239,10,34);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(353, 239,10,34);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(353, 239,10,34);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(353, 239,10,34);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(353, 239,10,34);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(353, 239,10,34);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(353, 239,10,34);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(353, 239,10,34);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(353, 239,10,34);
            				break;
            			}
            			break;
            			case "F461":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(363, 240,10,34);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(363, 240,10,34);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(363, 240,10,34);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(363, 240,10,34);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(363, 240,10,34);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(363, 240,10,34);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(363, 240,10,34);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(363, 240,10,34);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(363, 240,10,34);
            				break;
            			}
            			break;
            			case "F462":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(496, 124,18,45);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(496, 124,18,45);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(496, 124,18,45);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(496, 124,18,45);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(496, 124,18,45);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(496, 124,18,45);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(496, 124,18,45);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(496, 124,18,45);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(496, 124,18,45);
            				break;
            			}
            			break;
            			case "F463":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(520, 123,18,45);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(520, 123,18,45);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(520, 123,18,45);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(520, 123,18,45);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(520, 123,18,45);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(520, 123,18,45);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(520, 123,18,45);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(520, 123,18,45);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(520, 123,18,45);
            				break;
            			}
            			break;
            			case "F464":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(545, 123,18,45);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(545, 123,18,45);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(545, 123,18,45);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(545, 123,18,45);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(545, 123,18,45);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(545, 123,18,45);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(545, 123,18,45);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(545, 123,18,45);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(545, 123,18,45);
            				break;
            			}
            			break;
            			case "F465":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(456, 223,20,7);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(456, 223,20,7);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(456, 223,20,7);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(456, 223,20,7);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(456, 223,20,7);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(456, 223,20,7);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(456, 223,20,7);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(456, 223,20,7);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(456, 223,20,7);
            				break;
            			}
            			break;
            			case "F466":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(457, 234,20,7);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(457, 234,20,7);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(457, 234,20,7);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(457, 234,20,7);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(457, 234,20,7);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(457, 234,20,7);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(457, 234,20,7);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(457, 234,20,7);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(457, 234,20,7);
            				break;
            			}
            			break;
            			case "F467":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(458, 244,20,7);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(458, 244,20,7);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(458, 244,20,7);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(458, 244,20,7);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(458, 244,20,7);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(458, 244,20,7);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(458, 244,20,7);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(458, 244,20,7);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(458, 244,20,7);
            				break;
            			}
            			break;
            			case "F468":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(458, 257,20,7);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(458, 257,20,7);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(458, 257,20,7);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(458, 257,20,7);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(458, 257,20,7);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(458, 257,20,7);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(458, 257,20,7);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(458, 257,20,7);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(458, 257,20,7);
            				break;
            			}
            			break;
            			case "F469":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(457, 267,20,7);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(457, 267,20,7);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(457, 267,20,7);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(457, 267,20,7);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(457, 267,20,7);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(457, 267,20,7);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(457, 267,20,7);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(457, 267,20,7);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(457, 267,20,7);
            				break;
            			}
            			break;
            			case "F470":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(460, 278,20,7);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(460, 278,20,7);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(460, 278,20,7);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(460, 278,20,7);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(460, 278,20,7);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(460, 278,20,7);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(460, 278,20,7);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(460, 278,20,7);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(460, 278,20,7);
            				break;
            			}
            			break;
            			case "F471":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(491, 223,30,7);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(491, 223,30,7);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(491, 223,30,7);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(491, 223,30,7);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(491, 223,30,7);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(491, 223,30,7);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(491, 223,30,7);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(491, 223,30,7);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(491, 223,30,7);
            				break;
            			}
            			break;
            			case "F472":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(492, 235,30,7);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(492, 235,30,7);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(492, 235,30,7);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(492, 235,30,7);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(492, 235,30,7);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(492, 235,30,7);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(492, 235,30,7);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(492, 235,30,7);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(492, 235,30,7);
            				break;
            			}
            			break;
            			case "F473":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(491, 245,30,7);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(491, 245,30,7);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(491, 245,30,7);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(491, 245,30,7);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(491, 245,30,7);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(491, 245,30,7);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(491, 245,30,7);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(491, 245,30,7);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(491, 245,30,7);
            				break;
            			}
            			break;
            			case "F474":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(493, 255,30,7);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(493, 255,30,7);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(493, 255,30,7);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(493, 255,30,7);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(493, 255,30,7);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(493, 255,30,7);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(493, 255,30,7);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(493, 255,30,7);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(493, 255,30,7);
            				break;
            			}
            			break;
            			case "F475":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(491, 265,30,7);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(491, 265,30,7);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(491, 265,30,7);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(491, 265,30,7);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(491, 265,30,7);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(491, 265,30,7);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(491, 265,30,7);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(491, 265,30,7);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(491, 265,30,7);
            				break;
            			}
            			break;
            			case "F476":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(493, 274,30,7);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(493, 274,30,7);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(493, 274,30,7);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(493, 274,30,7);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(493, 274,30,7);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(493, 274,30,7);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(493, 274,30,7);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(493, 274,30,7);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(493, 274,30,7);
            				break;
            			}
            			break;
            			case "F477":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(536, 223,30,7);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(536, 223,30,7);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(536, 223,30,7);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(536, 223,30,7);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(536, 223,30,7);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(536, 223,30,7);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(536, 223,30,7);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(536, 223,30,7);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(536, 223,30,7);
            				break;
            			}
            			break;
            			case "F478":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(537, 233,30,7);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(537, 233,30,7);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(537, 233,30,7);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(537, 233,30,7);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(537, 233,30,7);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(537, 233,30,7);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(537, 233,30,7);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(537, 233,30,7);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(537, 233,30,7);
            				break;
            			}
            			break;
            			case "F479":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(538, 245,30,7);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(538, 245,30,7);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(538, 245,30,7);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(538, 245,30,7);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(538, 245,30,7);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(538, 245,30,7);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(538, 245,30,7);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(538, 245,30,7);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(538, 245,30,7);
            				break;
            			}
            			break;
            			case "F480":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(537, 256,30,7);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(537, 256,30,7);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(537, 256,30,7);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(537, 256,30,7);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(537, 256,30,7);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(537, 256,30,7);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(537, 256,30,7);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(537, 256,30,7);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(537, 256,30,7);
            				break;
            			}
            			break;
            			case "F481":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(538, 267,30,7);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(538, 267,30,7);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(538, 267,30,7);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(538, 267,30,7);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(538, 267,30,7);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(538, 267,30,7);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(538, 267,30,7);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(538, 267,30,7);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(538, 267,30,7);
            				break;
            			}
            			break;
            			case "F482":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(535, 276,30,7);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(535, 276,30,7);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(535, 276,30,7);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(535, 276,30,7);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(535, 276,30,7);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(535, 276,30,7);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(535, 276,30,7);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(535, 276,30,7);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(535, 276,30,7);
            				break;
            			}
            			break;
            			case "RELX":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(234, 133,40,45);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(234, 133,40,45);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(234, 133,40,45);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(234, 133,40,45);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(234, 133,40,45);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(234, 133,40,45);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(234, 133,40,45);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(234, 133,40,45);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(234, 133,40,45);
            				break;
            				case "1008965":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF00FF";
            				ctx_pdcr.strokeRect(234, 133,40,45);
            				break;
            			}
            			break;
            			case "RELU":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(285, 134,40,45);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(285, 134,40,45);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(285, 134,40,45);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(285, 134,40,45);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(285, 134,40,45);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(285, 134,40,45);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(285, 134,40,45);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(285, 134,40,45);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(285, 134,40,45);
            				break;
            			}
            			break;
            			case "RELT":
            			switch (vision["PDC-R"][pdcr_array[i]]){
            				case "beige":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFD700";
            				ctx_pdcr.strokeRect(335, 135,40,45);
            				break;
            				case "cafe":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#8B4513";
            				ctx_pdcr.strokeRect(335, 135,40,45);
            				break;
            				case "rojo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FF0000";
            				ctx_pdcr.strokeRect(335, 135,40,45);
            				break;
            				case "verde":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#008000";
            				ctx_pdcr.strokeRect(335, 135,40,45);
            				break;
            				case "azul":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#0000FF";
            				ctx_pdcr.strokeRect(335, 135,40,45);
            				break;
            				case "natural":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFFFF";
            				ctx_pdcr.strokeRect(335, 135,40,45);
            				break;
            				case "amarillo":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFFF00";
            				ctx_pdcr.strokeRect(335, 135,40,45);
            				break;
            				case "naranja":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#FFA500";
            				ctx_pdcr.strokeRect(335, 135,40,45);
            				break;
            				case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
            				ctx_pdcr.strokeRect(335, 135,40,45);
            				break;
            				case "1010733":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#A9A9A9";
            				ctx_pdcr.strokeRect(335, 135,40,45);
            				break;
            			}
            			break;
            			default:
            		}
            	}
            }
        }
    }
}

function cargar_imagen_pdcr_1_altura(){
    if (img_pdcr_a.getContext) {
        var ctx_pdcr = img_pdcr_a.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcr_1/pdcr_1.jpg";
        img.onload = function(){
            imgWidth_pdcr_mid = this.width;
            imgHeight_pdcr_mid = this.height;
            img_pdcr_a.width = imgWidth_pdcr_mid;
            img_pdcr_a.height = imgHeight_pdcr_mid;
            // console.log("imgWidth_pdcr_mid: ",imgWidth_pdcr_mid);
            // console.log("imgHeight_pdcr_mid: ",imgHeight_pdcr_mid);
            // console.log("img_pdcr_a.width: ",img_pdcr_a.width);
            // console.log("img_pdcr_a.height: ",img_pdcr_a.height);
            ctx_pdcr.drawImage(this,0,0,imgWidth_pdcr_mid,imgHeight_pdcr_mid);
            var datosimagen = ctx_pdcr.getImageData(0,0,imgWidth_pdcr_mid,imgHeight_pdcr_mid);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcr_mid = datosimagen.data;
            ctx_pdcr.lineWidth = "4";
            pintar_2();

            function pintar_2(){
                for (var i = 0; i < pdcr_1_array.length; i++) {
                    pdcr_1_array[i]
                    // console.log("pdcr_1_array[i]",pdcr_1_array[i]);
                    // console.log("pdcr_1_array[i] COLOR: ",vision["PDC-RMID"][pdcr_1_array[i]])                 
                    switch (pdcr_1_array[i]){
                        case "F400":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(299, 167,10,35);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(299, 167,10,35);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(299, 167,10,35);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(299, 167,10,35);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(299, 167,10,35);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(299, 167,10,35);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(299, 167,10,35);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(299, 167,10,35);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(299, 167,10,35);
            				break;
                        } 
                        break;
                        case "F401":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(311, 166,10,35);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(311, 166,10,35);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(311, 166,10,35);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(311, 166,10,35);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(311, 166,10,35);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(311, 166,10,35);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(311, 166,10,35);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(311, 166,10,35);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(311, 166,10,35);
            				break;
                        } 
                        break;
                        case "F402":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(325, 166,10,35);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(325, 166,10,35);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(325, 166,10,35);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(325, 166,10,35);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(325, 166,10,35);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(325, 166,10,35);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(325, 166,10,35);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(325, 166,10,35);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(325, 166,10,35);
            				break;
                        } 
                        break;
                        case "F403":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(337, 169,10,35);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(337, 169,10,35);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(337, 169,10,35);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(337, 169,10,35);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(337, 169,10,35);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(337, 169,10,35);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(337, 169,10,35);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(337, 169,10,35);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(337, 169,10,35);
            				break;
                        } 
                        break;
                        case "F404":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(350, 168,10,35);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(350, 168,10,35);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(350, 168,10,35);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(350, 168,10,35);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(350, 168,10,35);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(350, 168,10,35);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(350, 168,10,35);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(350, 168,10,35);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(350, 168,10,35);
            				break;
                        } 
                        break;
                        case "F405":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(363, 166,10,35);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(363, 166,10,35);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(363, 166,10,35);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(363, 166,10,35);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(363, 166,10,35);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(363, 166,10,35);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(363, 166,10,35);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(363, 166,10,35);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(363, 166,10,35);
            				break;
                        } 
                        break;
                        case "F406":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(391, 174,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(391, 174,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(391, 174,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(391, 174,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(391, 174,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(391, 174,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(391, 174,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(391, 174,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(391, 174,10,20);
            				break;
                        } 
                        break;
                        case "F407":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(403, 174,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(403, 174,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(403, 174,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(403, 174,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(403, 174,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(403, 174,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(403, 174,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(403, 174,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(403, 174,10,20);
            				break;
                        } 
                        break;
                        case "F408":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(414, 174,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(414, 174,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(414, 174,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(414, 174,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(414, 174,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(414, 174,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(414, 174,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(414, 174,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(414, 174,10,20);
            				break;
                        } 
                        break;
                        case "F409":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(427, 175,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(427, 175,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(427, 175,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(427, 175,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(427, 175,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(427, 175,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(427, 175,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(427, 175,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(427, 175,10,20);
            				break;
                        } 
                        break;
                        case "F410":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(440, 175,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(440, 175,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(440, 175,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(440, 175,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(440, 175,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(440, 175,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(440, 175,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(440, 175,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(440, 175,10,20);
            				break;
                        } 
                        break;
                        case "F411":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(451, 175,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(451, 175,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(451, 175,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(451, 175,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(451, 175,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(451, 175,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(451, 175,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(451, 175,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(451, 175,10,20);
            				break;
                        } 
                        break;
                        case "F412":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(251, 181,40,10);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(251, 181,40,10);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(251, 181,40,10);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(251, 181,40,10);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(251, 181,40,10);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(251, 181,40,10);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(251, 181,40,10);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(251, 181,40,10);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(251, 181,40,10);
            				break;
                        } 
                        break;
                        case "F413":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(250, 196,40,10);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(250, 196,40,10);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(250, 196,40,10);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(250, 196,40,10);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(250, 196,40,10);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(250, 196,40,10);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(250, 196,40,10);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(250, 196,40,10);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(250, 196,40,10);
            				break;
                        } 
                        break;
                        case "F414":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(252, 209,40,10);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(252, 209,40,10);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(252, 209,40,10);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(252, 209,40,10);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(252, 209,40,10);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(252, 209,40,10);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(252, 209,40,10);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(252, 209,40,10);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(252, 209,40,10);
            				break;
                        } 
                        break;
                        case "F415":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(251, 220,40,10);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(251, 220,40,10);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(251, 220,40,10);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(251, 220,40,10);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(251, 220,40,10);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(251, 220,40,10);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(251, 220,40,10);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(251, 220,40,10);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(251, 220,40,10);
            				break;
                        } 
                        break;
                        case "F416":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(252, 234,40,10);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(252, 234,40,10);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(252, 234,40,10);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(252, 234,40,10);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(252, 234,40,10);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(252, 234,40,10);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(252, 234,40,10);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(252, 234,40,10);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(252, 234,40,10);
            				break;
                        } 
                        break;
                        case "F417":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(253, 246,40,10);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(253, 246,40,10);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(253, 246,40,10);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(253, 246,40,10);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(253, 246,40,10);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(253, 246,40,10);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(253, 246,40,10);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(253, 246,40,10);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(253, 246,40,10);
            				break;
                        } 
                        break;
                        case "F418":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(471, 180,60,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(471, 180,60,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(471, 180,60,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(471, 180,60,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(471, 180,60,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(471, 180,60,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(471, 180,60,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(471, 180,60,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(471, 180,60,20);
            				break;
                        } 
                        break;
                        case "F419":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(469, 207,60,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(469, 207,60,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(469, 207,60,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(469, 207,60,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(469, 207,60,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(469, 207,60,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(469, 207,60,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(469, 207,60,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(469, 207,60,20);
            				break;
                        } 
                        break;
                        case "F420":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(469, 235,60,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(469, 235,60,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(469, 235,60,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(469, 235,60,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(469, 235,60,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(469, 235,60,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(469, 235,60,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(469, 235,60,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(469, 235,60,20);
            				break;
                        } 
                        break;
                        case "F421":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(251, 273,40,10);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(251, 273,40,10);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(251, 273,40,10);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(251, 273,40,10);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(251, 273,40,10);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(251, 273,40,10);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(251, 273,40,10);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(251, 273,40,10);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(251, 273,40,10);
            				break;
                        } 
                        break;
                        case "F422":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(249, 285,40,10);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(249, 285,40,10);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(249, 285,40,10);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(249, 285,40,10);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(249, 285,40,10);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(249, 285,40,10);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(249, 285,40,10);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(249, 285,40,10);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(249, 285,40,10);
            				break;
                        } 
                        break;
                        case "F423":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(252, 298,40,10);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(252, 298,40,10);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(252, 298,40,10);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(252, 298,40,10);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(252, 298,40,10);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(252, 298,40,10);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(252, 298,40,10);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(252, 298,40,10);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(252, 298,40,10);
            				break;
                        } 
                        break;
                        case "F424":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(252, 310,40,10);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(252, 310,40,10);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(252, 310,40,10);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(252, 310,40,10);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(252, 310,40,10);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(252, 310,40,10);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(252, 310,40,10);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(252, 310,40,10);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(252, 310,40,10);
            				break;
                        } 
                        break;
                        case "F425":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(253, 323,40,10);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(253, 323,40,10);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(253, 323,40,10);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(253, 323,40,10);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(253, 323,40,10);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(253, 323,40,10);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(253, 323,40,10);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(253, 323,40,10);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(253, 323,40,10);
            				break;
                        } 
                        break;
                        case "F426":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(253, 335,40,10);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(253, 335,40,10);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(253, 335,40,10);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(253, 335,40,10);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(253, 335,40,10);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(253, 335,40,10);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(253, 335,40,10);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(253, 335,40,10);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(253, 335,40,10);
            				break;
                        } 
                        break;
                        case "F427":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(314, 277,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(314, 277,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(314, 277,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(314, 277,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(314, 277,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(314, 277,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(314, 277,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(314, 277,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(314, 277,10,20);
            				break;
                        } 
                        break;
                        case "F428":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(328, 277,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(328, 277,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(328, 277,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(328, 277,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(328, 277,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(328, 277,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(328, 277,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(328, 277,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(328, 277,10,20);
            				break;
                        } 
                        break;
                        case "F429":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(339, 277,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(339, 277,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(339, 277,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(339, 277,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(339, 277,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(339, 277,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(339, 277,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(339, 277,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(339, 277,10,20);
            				break;
                        } 
                        break;
                        case "F430":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(352, 277,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(352, 277,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(352, 277,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(352, 277,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(352, 277,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(352, 277,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(352, 277,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(352, 277,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(352, 277,10,20);
            				break;
                        } 
                        break;
                        case "F431":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(367, 275,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(367, 275,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(367, 275,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(367, 275,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(367, 275,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(367, 275,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(367, 275,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(367, 275,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(367, 275,10,20);
            				break;
                        } 
                        break;
                        case "F432":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(392, 275,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(392, 275,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(392, 275,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(392, 275,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(392, 275,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(392, 275,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(392, 275,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(392, 275,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(392, 275,10,20);
            				break;
                        } 
                        break;
                        case "F433":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(407, 276,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(407, 276,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(407, 276,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(407, 276,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(407, 276,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(407, 276,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(407, 276,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(407, 276,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(407, 276,10,20);
            				break;
                        } 
                        break;
                        case "F434":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(420, 277,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(420, 277,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(420, 277,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(420, 277,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(420, 277,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(420, 277,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(420, 277,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(420, 277,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(420, 277,10,20);
            				break;
                        } 
                        break;
                        case "F435":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(431, 277,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(431, 277,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(431, 277,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(431, 277,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(431, 277,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(431, 277,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(431, 277,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(431, 277,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(431, 277,10,20);
            				break;
                        } 
                        break;
                        case "F436":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(443, 276,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(443, 276,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(443, 276,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(443, 276,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(443, 276,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(443, 276,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(443, 276,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(443, 276,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(443, 276,10,20);
            				break;
                        } 
                        break;
                        case "F437":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(315, 303,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(315, 303,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(315, 303,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(315, 303,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(315, 303,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(315, 303,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(315, 303,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(315, 303,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(315, 303,10,20);
            				break;
                        } 
                        break;
                        case "F438":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(329, 303,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(329, 303,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(329, 303,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(329, 303,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(329, 303,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(329, 303,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(329, 303,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(329, 303,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(329, 303,10,20);
            				break;
                        } 
                        break;
                        case "F439":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(339, 304,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(339, 304,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(339, 304,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(339, 304,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(339, 304,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(339, 304,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(339, 304,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(339, 304,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(339, 304,10,20);
            				break;
                        } 
                        break;
                        case "F440":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(351, 304,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(351, 304,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(351, 304,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(351, 304,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(351, 304,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(351, 304,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(351, 304,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(351, 304,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(351, 304,10,20);
            				break;
                        } 
                        break;
                        case "F441":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(365, 303,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(365, 303,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(365, 303,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(365, 303,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(365, 303,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(365, 303,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(365, 303,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(365, 303,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(365, 303,10,20);
            				break;
                        } 
                        break;
                        case "F442":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(394, 303,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(394, 303,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(394, 303,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(394, 303,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(394, 303,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(394, 303,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(394, 303,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(394, 303,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(394, 303,10,20);
            				break;
                        } 
                        break;
                        case "F443":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(407, 303,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(407, 303,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(407, 303,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(407, 303,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(407, 303,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(407, 303,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(407, 303,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(407, 303,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(407, 303,10,20);
            				break;
                        } 
                        break;
                        case "F444":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(419, 305,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(419, 305,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(419, 305,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(419, 305,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(419, 305,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(419, 305,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(419, 305,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(419, 305,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(419, 305,10,20);
            				break;
                        } 
                        break;
                        case "F445":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(432, 303,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(432, 303,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(432, 303,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(432, 303,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(432, 303,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(432, 303,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(432, 303,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(432, 303,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(432, 303,10,20);
            				break;
                        } 
                        break;
                        case "F446":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(445, 303,10,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(445, 303,10,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(445, 303,10,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(445, 303,10,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(445, 303,10,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(445, 303,10,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(445, 303,10,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(445, 303,10,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(445, 303,10,20);
            				break;
                        } 
                        break;
                        case "F447":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(469, 275,60,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(469, 275,60,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(469, 275,60,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(469, 275,60,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(469, 275,60,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(469, 275,60,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(469, 275,60,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(469, 275,60,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(469, 275,60,20);
            				break;
                        } 
                        break;
                        case "F448":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(469, 302,60,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(469, 302,60,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(469, 302,60,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(469, 302,60,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(469, 302,60,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(469, 302,60,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(469, 302,60,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(469, 302,60,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(469, 302,60,20);
            				break;
                        } 
                        break;
                        case "F449":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(468, 332,60,20);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(468, 332,60,20);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(468, 332,60,20);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(468, 332,60,20);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(468, 332,60,20);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(468, 332,60,20);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(468, 332,60,20);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(468, 332,60,20);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(468, 332,60,20);
            				break;
                        } 
                        break;
                        case "F450":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(298, 335,10,34);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(298, 335,10,34);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(298, 335,10,34);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(298, 335,10,34);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(298, 335,10,34);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(298, 335,10,34);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(298, 335,10,34);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(298, 335,10,34);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(298, 335,10,34);
            				break;
                        } 
                        break;
                        case "F451":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(311, 335,10,34);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(311, 335,10,34);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(311, 335,10,34);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(311, 335,10,34);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(311, 335,10,34);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(311, 335,10,34);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(311, 335,10,34);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(311, 335,10,34);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(311, 335,10,34);
            				break;
                        } 
                        break;
                        case "F452":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(324, 335,10,34);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(324, 335,10,34);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(324, 335,10,34);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(324, 335,10,34);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(324, 335,10,34);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(324, 335,10,34);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(324, 335,10,34);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(324, 335,10,34);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(324, 335,10,34);
            				break;
                        } 
                        break;
                        case "F453":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(338, 334,10,34);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(338, 334,10,34);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(338, 334,10,34);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(338, 334,10,34);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(338, 334,10,34);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(338, 334,10,34);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(338, 334,10,34);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(338, 334,10,34);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(338, 334,10,34);
            				break;
                        } 
                        break;
                        case "F454":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(349, 335,10,34);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(349, 335,10,34);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(349, 335,10,34);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(349, 335,10,34);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(349, 335,10,34);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(349, 335,10,34);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(349, 335,10,34);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(349, 335,10,34);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(349, 335,10,34);
            				break;
                        } 
                        break;
                        case "F455":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(361, 333,10,34);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(361, 333,10,34);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(361, 333,10,34);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(361, 333,10,34);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(361, 333,10,34);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(361, 333,10,34);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(361, 333,10,34);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(361, 333,10,34);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(361, 333,10,34);
            				break;
                        } 
                        break;
                        case "F456":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(389, 336,10,34);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(389, 336,10,34);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(389, 336,10,34);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(389, 336,10,34);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(389, 336,10,34);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(389, 336,10,34);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(389, 336,10,34);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(389, 336,10,34);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(389, 336,10,34);
            				break;
                        } 
                        break;
                        case "F457":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(402, 334,10,34);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(402, 334,10,34);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(402, 334,10,34);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(402, 334,10,34);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(402, 334,10,34);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(402, 334,10,34);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(402, 334,10,34);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(402, 334,10,34);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(402, 334,10,34);
            				break;
                        } 
                        break;
                        case "F458":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(414, 335,10,34);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(414, 335,10,34);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(414, 335,10,34);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(414, 335,10,34);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(414, 335,10,34);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(414, 335,10,34);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(414, 335,10,34);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(414, 335,10,34);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(414, 335,10,34);
            				break;
                        } 
                        break;
                        case "F459":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(427, 335,10,34);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(427, 335,10,34);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(427, 335,10,34);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(427, 335,10,34);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(427, 335,10,34);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(427, 335,10,34);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(427, 335,10,34);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(427, 335,10,34);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(427, 335,10,34);
            				break;
                        } 
                        break;
                        case "F460":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(438, 334,10,34);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(438, 334,10,34);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(438, 334,10,34);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(438, 334,10,34);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(438, 334,10,34);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(438, 334,10,34);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(438, 334,10,34);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(438, 334,10,34);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(438, 334,10,34);
            				break;
                        } 
                        break;
                        case "F461":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(451, 334,10,34);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(451, 334,10,34);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(451, 334,10,34);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(451, 334,10,34);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(451, 334,10,34);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(451, 334,10,34);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(451, 334,10,34);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(451, 334,10,34);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(451, 334,10,34);
            				break;
                        } 
                        break;
                        case "RELX":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(292, 208,55,60);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(292, 208,55,60);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(292, 208,55,60);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(292, 208,55,60);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(292, 208,55,60);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(292, 208,55,60);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(292, 208,55,60);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(292, 208,55,60);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(292, 208,55,60);
            				break;
                            case "1008965":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF00FF";
                            ctx_pdcr.strokeRect(292, 208,55,60);
                            break;
                        } 
                        break;
                        case "RELU":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(355, 209,55,60);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(355, 209,55,60);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(355, 209,55,60);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(355, 209,55,60);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(355, 209,55,60);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(355, 209,55,60);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(355, 209,55,60);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(355, 209,55,60);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(355, 209,55,60);
            				break;
                        } 
                        break;
                        case "RELT":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(414, 209,55,60);
                            break;
                            case "cafe":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(414, 209,55,60);
                            break;
                            case "rojo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(414, 209,55,60);
                            break;
                            case "verde":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(414, 209,55,60);
                            break;
                            case "azul":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(414, 209,55,60);
                            break;
                            case "natural":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(414, 209,55,60);
                            break;
                            case "amarillo":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(414, 209,55,60);
                            break;
                            case "naranja":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(414, 209,55,60);
                            break;
                            case "vacio":
            				ctx_pdcr.beginPath();
            				ctx_pdcr.strokeStyle = "#000000";
                            ctx_pdcr.strokeRect(414, 209,55,60);
            				break;
                            case "1010733":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#A9A9A9";
                            ctx_pdcr.strokeRect(414, 209,55,60);
                            break;
                        } 
                        break;
                        default:
                    }
                }
            }
        }
    }
}

function cargar_imagen_pdcs_altura(){
    if (img_pdcs_a.getContext) {
        var ctx = img_pdcs_a.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcs/pdcs.jpg";
        img.onload = function(){
            imgWidth_pdcs = this.width;
            imgHeight_pdcs = this.height;
            img_pdcs_a.width = imgWidth_pdcs;
            img_pdcs_a.height = imgHeight_pdcs;
            // console.log("imgWidth_pdcs: ",imgWidth_pdcs);
            // console.log("imgHeight_pdcs: ",imgHeight_pdcs);
            // console.log("img_pdcs_a.width: ",img_pdcs_a.width);
            // console.log("img_pdcs_a.height: ",img_pdcs_a.height);
            ctx.drawImage(this,0,0,imgWidth_pdcs,imgHeight_pdcs);
            var datosimagen = ctx.getImageData(0,0,imgWidth_pdcs,imgHeight_pdcs);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcs = datosimagen.data;
            ctx.lineWidth = "4";
            pintar_2();

            function pintar_2(){
                for (var i = 0; i < pdcs_array.length; i++) {
                    pdcs_array[i]
                    // console.log("pdcs_array[i]",pdcs_array[i]);
                    // console.log("pdcs_array[i] COLOR: ",vision["PDC-S"][pdcs_array[i]])                 
                    switch (pdcs_array[i]){
                        case "1":
                        switch (vision["PDC-S"][pdcs_array[i]]){
                            case "rojo":
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(439, 218,48,175);
                            break;
                            case "cafe":
                            ctx.beginPath();
                            ctx.strokeStyle = "#8B4513";
                            ctx.strokeRect(439, 218,48,175);
                            break;
                            case "vacio":
                            ctx.beginPath();
                            ctx.strokeStyle = "#000000";
                            ctx.strokeRect(439, 218,48,175);
                            break;
                        }                        
                        break;
                        case "2":
                        switch (vision["PDC-S"][pdcs_array[i]]){
                            case "rojo":
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(494, 218,48,175);
                            break;
                            case "cafe":
                            ctx.beginPath();
                            ctx.strokeStyle = "#8B4513";
                            ctx.strokeRect(494, 218,48,175);
                            break;
                            case "vacio":
                            ctx.beginPath();
                            ctx.strokeStyle = "#000000";
                            ctx.strokeRect(494, 218,48,175);
                            break;
                        }
                        break;
                        case "3":
                        switch (vision["PDC-S"][pdcs_array[i]]){
                            case "rojo":
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(550, 218,48,175);
                            break;
                            case "cafe":
                            ctx.beginPath();
                            ctx.strokeStyle = "#8B4513";
                            ctx.strokeRect(550, 218,48,175);
                            break;
                            case "vacio":
                            ctx.beginPath();
                            ctx.strokeStyle = "#000000";
                            ctx.strokeRect(550, 218,48,175);
                            break;
                        }
                        break;
                        case "4":
                        switch (vision["PDC-S"][pdcs_array[i]]){
                            case "rojo":
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(607, 219,48,175);
                            break;
                            case "cafe":
                            ctx.beginPath();
                            ctx.strokeStyle = "#8B4513";
                            ctx.strokeRect(607, 219,48,175);
                            break;
                            case "vacio":
                            ctx.beginPath();
                            ctx.strokeStyle = "#000000";
                            ctx.strokeRect(607, 219,48,175);
                            break;
                        }
                        break;
                        case "5":
                        switch (vision["PDC-S"][pdcs_array[i]]){
                            case "rojo":
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(661, 218,48,175);
                            break;
                            case "cafe":
                            ctx.beginPath();
                            ctx.strokeStyle = "#8B4513";
                            ctx.strokeRect(661, 218,48,175);
                            break;
                            case "vacio":
                            ctx.beginPath();
                            ctx.strokeStyle = "#000000";
                            ctx.strokeRect(661, 218,48,175);
                            break;
                        }
                        break;
                        case "6":
                        switch (vision["PDC-S"][pdcs_array[i]]){
                            case "rojo":
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(719, 218,48,175);
                            break;
                            case "cafe":
                            ctx.beginPath();
                            ctx.strokeStyle = "#8B4513";
                            ctx.strokeRect(719, 218,48,175);
                            break;
                            case "vacio":
                            ctx.beginPath();
                            ctx.strokeStyle = "#000000";
                            ctx.strokeRect(719, 218,48,175);
                            break;
                        }
                        break;
                        default:
                    }
                }
            }
        }
    }
}

function cargar_imagen_tblu_altura(){
    if (img_tblu_a.getContext) {
        var ctx_tblu = img_tblu_a.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/btlu/btlu.jpg";
        img.onload = function(){
            imgWidth_tblu = this.width;
            imgHeight_tblu = this.height;
            img_tblu_a.width = imgWidth_tblu;
            img_tblu_a.height = imgHeight_tblu;
            // console.log("imgWidth_tblu: ",imgWidth_tblu);
            // console.log("imgHeight_tblu: ",imgHeight_tblu);
            // console.log("img_tblu_a.width: ",img_tblu_a.width);
            // console.log("img_tblu_a.height: ",img_tblu_a.height);
            ctx_tblu.drawImage(this,0,0,imgWidth_tblu,imgHeight_tblu);
            var datosimagen = ctx_tblu.getImageData(0,0,imgWidth_tblu,imgHeight_tblu);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_tblu = datosimagen.data;
            ctx_tblu.lineWidth = "4";
            pintar_2();

            function pintar_2(){
                for (var i = 0; i < tblu_array.length; i++) {
                    tblu_array[i]
                    // console.log("tblu_array[i]",tblu_array[i]);
                    // console.log("tblu_array[i] COLOR: ",vision["TBLU"][tblu_array[i]])                 
                    switch (tblu_array[i]){
                        case "A1-9":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "rojo":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(79, 531,40,68);
                            break;
                            case "beige":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(79, 531,40,68);
                            break;
                            case "azul":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(79, 531,40,68);
                            break;
                            case "vacio":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#000000";
                            ctx_tblu.strokeRect(79, 531,40,68);
                            break;
                        }                        
                        break;
                        case "A1-8":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "rojo":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(125, 532,40,68);
                            break;
                            case "beige":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(125, 532,40,68);
                            break;
                            case "azul":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(125, 532,40,68);
                            break;
                            case "vacio":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#000000";
                            ctx_tblu.strokeRect(125, 532,40,68);
                            break;
                        }
                        break;
                        case "A1-7":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "rojo":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(167, 532,40,68);
                            break;
                            case "beige":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(167, 532,40,68);
                            break;
                            case "azul":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(167, 532,40,68);
                            break;
                            case "vacio":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#000000";
                            ctx_tblu.strokeRect(167, 532,40,68);
                            break;
                        }
                        break;
                        case "A1-6":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "rojo":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(212, 532,40,68);
                            break;
                            case "beige":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(212, 532,40,68);
                            break;
                            case "azul":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(212, 532,40,68);
                            break;
                            case "vacio":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#000000";
                            ctx_tblu.strokeRect(212, 532,40,68);
                            break;
                        }
                        break;
                        case "A1-5":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "rojo":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(257, 531,40,68);
                            break;
                            case "beige":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(257, 531,40,68);
                            break;
                            case "azul":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(257, 531,40,68);
                            break;
                            case "vacio":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#000000";
                            ctx_tblu.strokeRect(257, 531,40,68);
                            break;
                        }
                        break;
                        case "A1-4":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "rojo":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(300, 530,40,68);
                            break;
                            case "beige":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(300, 530,40,68);
                            break;
                            case "azul":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(300, 530,40,68);
                            break;
                            case "vacio":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#000000";
                            ctx_tblu.strokeRect(300, 530,40,68);
                            break;
                        }
                        break;
                        case "A1-3":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "rojo":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(347, 533,40,68);
                            break;
                            case "beige":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(347, 533,40,68);
                            break;
                            case "azul":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(347, 533,40,68);
                            break;
                            case "vacio":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#000000";
                            ctx_tblu.strokeRect(347, 533,40,68);
                            break;
                        }
                        break;
                        case "A1-2":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "rojo":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(388, 531,40,68);
                            break;
                            case "beige":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(388, 531,40,68);
                            break;
                            case "azul":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(388, 531,40,68);
                            break;
                            case "vacio":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#000000";
                            ctx_tblu.strokeRect(388, 531,40,68);
                            break;
                        }
                        break;
                        case "A1-1":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "rojo":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(435, 531,40,68);
                            break;
                            case "beige":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(435, 531,40,68);
                            break;
                            case "azul":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(435, 531,40,68);
                            break;
                            case "vacio":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#000000";
                            ctx_tblu.strokeRect(435, 531,40,68);
                            break;
                        }
                        break;
                        default:
                    }
                }
            }
        }
    }
}

function cargar_imagen_pdcd_altura(){
    if (img_pdcd_a.getContext) {
        var ctx_pdcd = img_pdcd_a.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcd/pdcd.jpg";
        img.onload = function(){
            imgWidth_pdcd = this.width;
            imgHeight_pdcd = this.height;
            img_pdcd_a.width = imgWidth_pdcd;
            img_pdcd_a.height = imgHeight_pdcd;
            // console.log("imgWidth_pdcd: ",imgWidth_pdcd);
            // console.log("imgHeight_pdcd: ",imgHeight_pdcd);
            // console.log("img_pdcd_a.width: ",img_pdcd_a.width);
            // console.log("img_pdcd_a.height: ",img_pdcd_a.height);
            ctx_pdcd.drawImage(this,0,0,imgWidth_pdcd,imgHeight_pdcd);
            var datosimagen = ctx_pdcd.getImageData(0,0,imgWidth_pdcd,imgHeight_pdcd);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcd = datosimagen.data;
            ctx_pdcd.lineWidth = "4";
            pintar_2();

            function pintar_2(){
                for (var i = 0; i < pdcd_array.length; i++) {
                    pdcd_array[i]
                    // console.log("pdcd_array[i]",pdcd_array[i]);
                    // console.log("pdcd_array[i] COLOR: ",vision["PDC-D"][pdcd_array[i]])                 
                    switch (pdcd_array[i]){
                        case "F200":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                        }                        
                        break;
                        case "F201":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(270, 555,28,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(270, 555,28,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(270, 555,28,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(270, 555,28,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(270, 555,28,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(270, 555,28,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(270, 555,28,12);
                            break;
                        }                        
                        break;
                        case "F202":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(274, 540,28,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(274, 540,28,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(274, 540,28,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(274, 540,28,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(274, 540,28,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(274, 540,28,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(274, 540,28,12);
                            break;
                        }
                        break;
                        case "F203":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(272, 523,28,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(272, 523,28,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(272, 523,28,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(272, 523,28,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(272, 523,28,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(272, 523,28,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(272, 523,28,12);
                            break;
                        }
                        break;
                        case "F204":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(270, 504,28,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(270, 504,28,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(270, 504,28,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(270, 504,28,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(270, 504,28,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(270, 504,28,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(270, 504,28,12);
                            break;
                        }
                        break;
                        case "F205":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                        }
                        break;
                        case "F206":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(272, 471,28,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(272, 471,28,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(272, 471,28,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(272, 471,28,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(272, 471,28,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(272, 471,28,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(272, 471,28,12);
                            break;
                        }
                        break;
                        case "F207":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(270, 455,28,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(270, 455,28,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(270, 455,28,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(270, 455,28,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(270, 455,28,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(270, 455,28,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(270, 455,28,12);
                            break;
                        }
                        break;
                        case "F208":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(274, 438,28,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(274, 438,28,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(274, 438,28,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(274, 438,28,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(274, 438,28,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(274, 438,28,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(274, 438,28,12);
                            break;
                        }
                        break;
                        case "F209":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(367, 573,52,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(367, 573,52,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(367, 573,52,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(367, 573,52,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(367, 573,52,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(367, 573,52,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(367, 573,52,12);
                            break;
                        }
                        break;
                        case "F210":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(368, 553,52,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(368, 553,52,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(368, 553,52,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(368, 553,52,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(368, 553,52,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(368, 553,52,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(368, 553,52,12);
                            break;
                        }
                        break;
                        case "F211":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(367, 536,52,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(367, 536,52,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(367, 536,52,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(367, 536,52,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(367, 536,52,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(367, 536,52,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(367, 536,52,12);
                            break;
                        }
                        break;
                        case "F212":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(369, 520,52,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(369, 520,52,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(369, 520,52,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(369, 520,52,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(369, 520,52,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(369, 520,52,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(369, 520,52,12);
                            break;
                        }
                        break;
                        case "F213":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(370, 504,52,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(370, 504,52,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(370, 504,52,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(370, 504,52,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(370, 504,52,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(370, 504,52,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(370, 504,52,12);
                            break;
                        }
                        break;
                        case "F214":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(368, 486,52,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(368, 486,52,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(368, 486,52,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(368, 486,52,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(368, 486,52,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(368, 486,52,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(368, 486,52,12);
                            break;
                        }
                        break;
                        case "F215":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(367, 470,52,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(367, 470,52,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(367, 470,52,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(367, 470,52,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(367, 470,52,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(367, 470,52,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(367, 470,52,12);
                            break;
                        }
                        break;
                        case "F216":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                        }
                        break;
                        case "F217":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(292, 401,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(292, 401,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(292, 401,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(292, 401,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(292, 401,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(292, 401,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(292, 401,18,12);
                            break;
                        }
                        break;
                        case "F218":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(292, 385,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(292, 385,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(292, 385,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(292, 385,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(292, 385,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(292, 385,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(292, 385,18,12);
                            break;
                        }
                        break;
                        case "F219":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                        }
                        break;
                        case "F220":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(293, 351,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(293, 351,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(293, 351,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(293, 351,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(293, 351,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(293, 351,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(293, 351,18,12);
                            break;
                        }
                        break;
                        case "F221":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(293, 334,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(293, 334,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(293, 334,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(293, 334,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(293, 334,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(293, 334,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(293, 334,18,12);
                            break;
                        }
                        break;
                        case "F222":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                        }
                        break;
                        case "F223":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                        }
                        break;
                        case "F224":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(343, 366,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(343, 366,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(343, 366,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(343, 366,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(343, 366,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(343, 366,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(343, 366,18,12);
                            break;
                        }
                        break;
                        case "F225":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(344, 349,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(344, 349,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(344, 349,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(344, 349,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(344, 349,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(344, 349,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(344, 349,18,12);
                            break;
                        }
                        break;
                        case "F226":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(343, 332,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(343, 332,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(343, 332,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(343, 332,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(343, 332,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(343, 332,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(343, 332,18,12);
                            break;
                        }
                        break;
                        case "F227":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                        }
                        break;
                        case "F228":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(376, 401,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(376, 401,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(376, 401,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(376, 401,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(376, 401,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(376, 401,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(376, 401,18,12);
                            break;
                        }
                        break;
                        case "F229":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(377, 386,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(377, 386,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(377, 386,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(377, 386,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(377, 386,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(377, 386,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(377, 386,18,12);
                            break;
                        }
                        break;
                        case "F230":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(378, 367,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(378, 367,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(378, 367,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(378, 367,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(378, 367,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(378, 367,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(378, 367,18,12);
                            break;
                        }
                        break;
                        case "F231":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                        }
                        break;
                        case "F232":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(376, 333,18,12);
                            break;
                            case "cafe":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(376, 333,18,12);
                            break;
                            case "rojo":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(376, 333,18,12);
                            break;
                            case "verde":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(376, 333,18,12);
                            break;
                            case "azul":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(376, 333,18,12);
                            break;
                            case "natural":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(376, 333,18,12);
                            break;
                            case "vacio":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#000000";
                            ctx_pdcd.strokeRect(376, 333,18,12);
                            break;
                        }
                        break;
                        default:
                    }
                }
            }
        }
    }
}

function cargar_imagen_pdcp_altura(){
    if (img_pdcp_a.getContext) {
        var ctx_pdcp = img_pdcp_a.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcp/pdcp.jpg";
        img.onload = function(){
            imgWidth_pdcp = this.width;
            imgHeight_pdcp = this.height;
            img_pdcp_a.width = imgWidth_pdcp;
            img_pdcp_a.height = imgHeight_pdcp;
            // console.log("imgWidth_pdcp: ",imgWidth_pdcp);
            // console.log("imgHeight_pdcp: ",imgHeight_pdcp);
            // console.log("img_pdcp_a.width: ",img_pdcp_a.width);
            // console.log("img_pdcp_a.height: ",img_pdcp_a.height);
            ctx_pdcp.drawImage(this,0,0,imgWidth_pdcp,imgHeight_pdcp);
            var datosimagen = ctx_pdcp.getImageData(0,0,imgWidth_pdcp,imgHeight_pdcp);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcp = datosimagen.data;
            ctx_pdcp.lineWidth = "4";
            pintar_2();

            function pintar_2(){
                for (var i = 0; i < pdcp_array.length; i++) {
                    pdcp_array[i]
                    // console.log("pdcp_array[i]",pdcp_array[i]);
                    // console.log("pdcp_array[i] COLOR: ",vision["PDC-P"][pdcp_array[i]])                 
                    switch (pdcp_array[i]){
                        case "MF1":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                        }                        
                        break;
                        case "MF2":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                        }
                        break;
                        case "F300":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                        }
                        break;
                        case "F301":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                        }
                        break;
                        case "F302":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                        }
                        break;
                        case "F303":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(292, 350,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(292, 350,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(292, 350,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(292, 350,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(292, 350,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(292, 350,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(292, 350,28,10);
                            break;
                        }
                        break;
                        case "F304":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(291, 335,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(291, 335,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(291, 335,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(291, 335,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(291, 335,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(291, 335,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(291, 335,28,10);
                            break;
                        }
                        break;
                        case "F305":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(292, 322,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(292, 322,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(292, 322,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(292, 322,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(292, 322,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(292, 322,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(292, 322,28,10);
                            break;
                        }
                        break;
                        case "F318":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                        }
                        break;
                        case "F319":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(342, 415,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(342, 415,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(342, 415,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(342, 415,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(342, 415,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(342, 415,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(342, 415,28,10);
                            break;
                        }
                        break;
                        case "F320":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(343, 400,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(343, 400,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(343, 400,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(343, 400,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(343, 400,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(343, 400,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(343, 400,28,10);
                            break;
                        }
                        break;
                        case "F321":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(342, 384,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(342, 384,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(342, 384,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(342, 384,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(342, 384,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(342, 384,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(342, 384,28,10);
                            break;
                        }
                        break;
                        case "F322":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(344, 368,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(344, 368,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(344, 368,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(344, 368,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(344, 368,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(344, 368,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(344, 368,28,10);
                            break;
                        }
                        break;
                        case "F323":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(342, 354,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(342, 354,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(342, 354,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(342, 354,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(342, 354,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(342, 354,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(342, 354,28,10);
                            break;
                        }
                        break;
                        case "F324":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(344, 340,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(344, 340,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(344, 340,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(344, 340,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(344, 340,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(344, 340,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(344, 340,28,10);
                            break;
                        }
                        break;
                        case "F325":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(343, 326,28,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(343, 326,28,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(343, 326,28,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(343, 326,28,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(343, 326,28,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(343, 326,28,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(343, 326,28,10);
                            break;
                        }
                        break;
                        case "F326":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                        }
                        break;
                        case "F327":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(379, 413,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(379, 413,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(379, 413,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(379, 413,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(379, 413,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(379, 413,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(379, 413,45,10);
                            break;
                        }
                        break;
                        case "F328":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(379, 398,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(379, 398,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(379, 398,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(379, 398,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(379, 398,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(379, 398,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(379, 398,45,10);
                            break;
                        }
                        break;
                        case "F329":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(380, 384,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(380, 384,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(380, 384,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(380, 384,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(380, 384,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(380, 384,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(380, 384,45,10);
                            break;
                        }
                        break;
                        case "F330":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(380, 369,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(380, 369,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(380, 369,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(380, 369,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(380, 369,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(380, 369,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(380, 369,45,10);
                            break;
                        }
                        break;
                        case "F331":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(380, 354,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(380, 354,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(380, 354,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(380, 354,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(380, 354,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(380, 354,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(380, 354,45,10);
                            break;
                        }
                        break;
                        case "F332":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(381, 339,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(381, 339,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(381, 339,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(381, 339,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(381, 339,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(381, 339,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(381, 339,45,10);
                            break;
                        }
                        break;
                        case "F333":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(380, 324,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(380, 324,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(380, 324,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(380, 324,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(380, 324,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(380, 324,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(380, 324,45,10);
                            break;
                        }
                        break;
                        case "F334":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(380, 309,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(380, 309,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(380, 309,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(380, 309,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(380, 309,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(380, 309,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(380, 309,45,10);
                            break;
                        }
                        break;
                        case "F335":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(380, 294,45,10);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(380, 294,45,10);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(380, 294,45,10);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(380, 294,45,10);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(380, 294,45,10);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(380, 294,45,10);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(380, 294,45,10);
                            break;
                        }
                        break;
                        case "E21":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                        }
                        break;
                        case "E22":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "cafe":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "rojo":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "verde":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "natural":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "azul":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "vacio":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#000000";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                        }
                        break;
                        default:
                    }
                }
            }
        }
    }
}