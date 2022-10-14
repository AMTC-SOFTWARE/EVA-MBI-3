let DBEVENT = sessionStorage.getItem('DBEVENT');
console.log("DB EVENT ACTUAL: ",DBEVENT);
document.getElementById("modulot_titulo").innerHTML = sessionStorage.getItem('edit_torque');
document.getElementById('modulo_vision').value = sessionStorage.getItem('edit_torque');
var edit_id = sessionStorage.getItem('edit_torque_id');
// console.log("El id para editar",edit_id);
let img_pdcp_t = document.getElementById('pdcp_image_t_canvas');
let img_pdcd_t = document.getElementById('pdcd_image_t_canvas');
let img_mfbp1_t = document.getElementById('mfbp1_image_t_canvas');
let img_mfbs_t = document.getElementById('mfbs_image_t_canvas');
let img_mfbe_t = document.getElementById('mfbe_image_t_canvas');
let img_mfbp2_t = document.getElementById('mfbp2_image_t_canvas');
let img_pdcr_t = document.getElementById('pdcr_image_t_canvas');
let img_pdcr_mid_t = document.getElementById('pdcr_mid_image_t_canvas');
let img_pdcr_small_t = document.getElementById('pdcr_small_image_t_canvas');
let img_bt_t = document.getElementById('bt_image_t_canvas');
let img_battery2_t = document.getElementById('battery-2_image_t_canvas');

var imgWidth_pdcr_t, imgHeight_pdcr_t;
var imgWidth_pdcr_mid_t, imgHeight_pdcr_mid_t;
var imgWidth_pdcr_small_t, imgHeight_pdcr_small_t;
var imgWidth_pdcp_t, imgHeight_pdcp_t;
var imgWidth_pdcd_t, imgHeight_pdcd_t;
var imgWidth_mfbp1_t, imgHeight_mfbp1_t;
var imgWidth_mfbs_t, imgHeight_mfbs_t;
var imgWidth_mfbe_t, imgHeight_mfbe_t;
var imgWidth_mfbp2_t, imgHeight_mfbp2_t;
var imgWidth_bt_t, imgHeight_bt_t;
var imgWidth_battery2_t, imgHeight_battery2_t;
var color = false;
var color_style = "green";
var pdcr_caja = "";



var torques_BB = {
  'PDC-D': {
      "E1": [[353, 460], [403, 510]]
  }, 
  'PDC-P': {
      "E1": [[356, 457], [401, 502]]
  }, 
  'PDC-R': {
      "E1": [[404, 325], [449, 370]]
  }, 
  'PDC-RMID': {
      "E1": [[404, 325], [449, 370]]
  },
  'PDC-RS': {
      "E1": [[404, 325], [449, 370]]
  },
  'MFB-P1': {
      'A47': [[264, 345], [314, 395]], 'A46': [[328, 345], [378, 395]], 'A45': [[384, 350], [434, 400]], 'A44': [[430, 350], [480, 400]], 'A43': [[475, 350], [515, 390]], 'A41': [[529, 345], [579, 395]], 'A42': [[594, 387], [634, 427]]
  }, 
  'MFB-S': {
      "A52": [[306, 394], [366, 454]], "A53": [[376, 408], [421, 453]], "A54": [[425, 408], [470, 453]], "A55": [[475, 408], [520, 453]], "A56": [[523, 408], [568, 453]], "A51": [[439, 260], [499, 320]]
  },
  'MFB-E': {
      "E1": [[300, 130], [385, 215]], "A1": [[460, 310], [545, 395]], "A2": [[140, 310], [225, 395]]
  },
  'MFB-P2': {
      "A21": [[253, 462], [298, 507]], "A22": [[305, 462], [350, 507]], "A23": [[354, 462], [399, 507]], "A24": [[406, 462], [451, 507]], "A25": [[462, 463], [524, 525]], "A26": [[532, 462], [577, 507]], "A27": [[583, 462], [628, 507]], "A28": [[633, 462], [678, 507]], "A29": [[683, 462], [728, 507]], "A30": [[391, 260], [453, 322]], "A20": [[526, 260], [588, 322]]
  },
  'BATTERY': {
      "BT": [[164, 146], [239, 221]]
  },
  'BATTERY-2': {
      "BT": [[164, 146], [239, 221]]
  }
}
var torques_value = {
  'PDC-P': {'E1': color},
  'PDC-D': {'E1': color},
  'PDC-R': {'E1': color},
  'PDC-RMID': {'E1': color},
  'PDC-RS': {'E1': color},
  "MFB-P1": {"A47": color, "A46": color, "A45": color, "A44": color, "A43": color, "A41": color, "A42": color}, 
  "MFB-S": {"A52": color, "A53": color, "A54": color, "A55": color, "A56": color, "A51": color},
  'MFB-E': {"E1": color, "A1": color, "A2": color},
  "MFB-P2": {"A21": color, "A22": color, "A23": color, "A24": color, "A25": color, "A26": color, "A27": color, "A28": color, "A29": color, "A30": color, "A20": color},
  "BATTERY": {"BT": color},
  "BATTERY-2": {"BT": color}
}

var historial=""

var pdcp_t_array=[]
var pdcd_t_array=[]
var mfbp1_t_array=[]
var mfbs_t_array=[]
var mfbe_t_array=[]
var mfbp2_t_array=[]
var pdcr_t_array=[]
var pdcr_t_mid_array=[]
var pdcr_t_small_array=[]
var bt_t_array=[]
var battery2_t_array=[]

var pdcr_caja=""
var pdcr_caja_to_db=""


function iniciar_pagina(){
  // console.log("se inicio la pagina")
  cargar_imagen_pdcp_t();
  cargar_imagen_pdcd_t();
  cargar_imagen_mfbp1_t();
  cargar_imagen_mfbs_t();
  cargar_imagen_mfbp2_t();
  cargar_imagen_pdcr_t();
  cargar_imagen_pdcr_mid_t();
  cargar_imagen_pdcr_small_t();
  cargar_imagen_bt_t();
  cargar_imagen_battery2_t();
  setTimeout(cargar_info,700);
}

function cargar_info(){
  fetch(dominio+"/api/get/"+DBEVENT+"/modulos_torques/ID/=/"+edit_id+"/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    console.log(data);
    var keys = Object.keys(data)
    // console.log(keys);
    for (var i = 0; i < keys.length; i++) {
      // console.log(keys[i]);
      if (keys[i] == 'ID' || keys[i] == 'MODULO') {
        // console.log("Columnas de ID y MODULO no se tomarán en cuenta");
      } else{
        // console.log(data[keys[i]]);
        if (data[keys[i]] == '{}') {
          // console.log('VACIO');
        } else{
          // console.log("Convertido el parse", JSON.parse(data[keys[i]]));
          var caja_name = Object.keys(JSON.parse(data[keys[i]]));
          // console.log(caja_name);
          // console.log(JSON.parse(data[keys[i]])[caja_name]);
          var torques = Object.keys(JSON.parse(data[keys[i]])[caja_name])
          // console.log(torques);
          for (var j = 0; j < torques.length; j++) {
            // console.log("Torque: ",torques[j])
            // console.log("Valor del Torque: ",JSON.parse(data[keys[i]])[caja_name][torques[j]]);
            torques_value[caja_name][torques[j]] = JSON.parse(data[keys[i]])[caja_name][torques[j]]
            cargar_recuadros();
          }
      }
    }
  }
  function cargar_recuadros(){
    // console.log("pintando");
    if (caja_name == "PDC-P" && JSON.parse(data[keys[i]])[caja_name][torques[j]] == 1) {
      // console.log("AQUI ESTÁ LA CAJA PDC-P");
      pdcp_t_array.push(torques[j]);
      // console.log("PDC-P ARRAY NUEVO: ",pdcp_t_array);
    }
    if (caja_name == "PDC-D" && JSON.parse(data[keys[i]])[caja_name][torques[j]] == 1) {
      // console.log("AQUI ESTÁ LA CAJA PDC-D");
      pdcd_t_array.push(torques[j]);
      // console.log("PDC-D ARRAY NUEVO: ",pdcd_t_array);
    }
    if (caja_name == "MFB-P1" && JSON.parse(data[keys[i]])[caja_name][torques[j]] == 1) {
      // console.log("AQUI ESTÁ LA CAJA MFB-P1");
      mfbp1_t_array.push(torques[j]);
      // console.log("MFB-P1 ARRAY NUEVO: ",mfbp1_t_array);
    }
    if (caja_name == "MFB-S" && JSON.parse(data[keys[i]])[caja_name][torques[j]] == 1) {
      // console.log("AQUI ESTÁ LA CAJA MFB-S");
      mfbs_t_array.push(torques[j]);
      // console.log("MFB-S ARRAY NUEVO: ",mfbs_t_array);
    }
    if (caja_name == "MFB-E" && JSON.parse(data[keys[i]])[caja_name][torques[j]] == 1) {
      // console.log("AQUI ESTÁ LA CAJA MFB-E");
      mfbe_t_array.push(torques[j]);
      // console.log("MFB-E ARRAY NUEVO: ",mfbe_t_array);
    }
    if (caja_name == "MFB-P2" && JSON.parse(data[keys[i]])[caja_name][torques[j]] == 1) {
      // console.log("AQUI ESTÁ LA CAJA MFB-P2");
      mfbp2_t_array.push(torques[j]);
      // console.log("MFB-P2 ARRAY NUEVO: ",mfbp2_t_array);
    }
    if (caja_name == "PDC-R" && JSON.parse(data[keys[i]])[caja_name][torques[j]] == 1) {
      // console.log("AQUI ESTÁ LA CAJA PDC-R");
      pdcr_t_array.push(torques[j]);
      // console.log("PDC-R ARRAY NUEVO: ",pdcr_t_array);
      $("#pdcr_option > option[value='PDCR']").attr("selected",true);
      pdcr_caja="pdcr"
      pdcr_caja_to_db="PDCR"
      document.getElementById('caja_pdcr_t').style.display="block";
      var t1 = new ToolTip_pdcr_t(img_pdcr_t, "This is a tool-tip", 150);
      cargar_imagen_pdcr_t();
    }
    if (caja_name == "PDC-RMID" && JSON.parse(data[keys[i]])[caja_name][torques[j]] == 1) {
      // console.log("AQUI ESTÁ LA CAJA PDC-RMID");
      pdcr_t_mid_array.push(torques[j]);
      // console.log("PDC-RMID ARRAY NUEVO: ",pdcr_mid_t_array);
      $("#pdcr_option > option[value='PDC_RMID']").attr("selected",true);
      pdcr_caja="pdcr_mid"
      pdcr_caja_to_db="PDCR-MID"
      document.getElementById('caja_pdcr_mid_t').style.display="block";
      var t1 = new ToolTip_pdcr_1t(img_pdcr_mid_t, "This is a tool-tip", 150);
      cargar_imagen_pdcr_mid_t();
    }
    if (caja_name == "PDC-RS" && JSON.parse(data[keys[i]])[caja_name][torques[j]] == 1) {
      // console.log("AQUI ESTÁ LA CAJA PDC-RS");
      pdcr_t_small_array.push(torques[j]);
      // console.log("PDC-RS ARRAY NUEVO: ",pdcr_small_t_array);
      $("#pdcr_option > option[value='PDC_RSMALL']").attr("selected",true);
      pdcr_caja="pdcr_small"
      pdcr_caja_to_db="PDC-RS"
      document.getElementById('caja_pdcr_small_t').style.display="block";
      var t1 = new ToolTip_pdcrs_1t(img_pdcr_small_t, "This is a tool-tip", 150);
      cargar_imagen_pdcr_small_t();
    }
    if (caja_name == "BATTERY" && JSON.parse(data[keys[i]])[caja_name][torques[j]] == 1) {
      // console.log("AQUI ESTÁ LA CAJA BATTERY");
      bt_t_array.push(torques[j]);
      // console.log("BATTERY ARRAY NUEVO: ",bt_t_array);
    }
    if (caja_name == "BATTERY-2" && JSON.parse(data[keys[i]])[caja_name][torques[j]] == 1) {
      // console.log("AQUI ESTÁ LA CAJA BATTERY-2");
      battery2_t_array.push(torques[j]);
      // console.log("BATTERY-2 ARRAY NUEVO: ",battery2_t_array);
    }
    cargar_imagen_pdcp_t();
    cargar_imagen_pdcd_t();
    cargar_imagen_mfbp1_t();
    cargar_imagen_mfbs_t();
    cargar_imagen_mfbe_t();
    cargar_imagen_mfbp2_t();
    cargar_imagen_bt_t();
    cargar_imagen_battery2_t();
  }
})
}
//---------------------------------------------------------------------------
function change_caja_pdcr(){
	if(document.getElementById('pdcr_option').value==='Seleccione la caja PDCR...'){
    // console.log("seleccione una caja")
    document.getElementById('caja_pdcr_t').style.display="none"
    document.getElementById('caja_pdcr_mid_t').style.display="none"
    document.getElementById('caja_pdcr_small_t').style.display="none"
    pdcr_caja=""
    pdcr_caja_to_db=""
  }
  if(document.getElementById('pdcr_option').value==='PDCR'){
    // console.log("pdcr")
    document.getElementById('caja_pdcr_t').style.display="block"
    document.getElementById('caja_pdcr_mid_t').style.display="none"
    document.getElementById('caja_pdcr_small_t').style.display="none"
    //document.getElementById('pdcr_image').src="static/content/cajas/interior/pdcr/pdcr.jpg"
    pdcr_caja="pdcr"
    pdcr_caja_to_db="PDCR"
    pdcr_array=[]
    pdcr_mid_array=[]
    pdcr_small_array=[]
    var t1 = new ToolTip_pdcr_t(img_pdcr_t, "This is a tool-tip", 150);
    cargar_imagen_pdcr_t();
  }
  if(document.getElementById('pdcr_option').value==='PDCR_MID'){
    // console.log("pdcr_mid")
    document.getElementById('caja_pdcr_t').style.display="none"
    document.getElementById('caja_pdcr_mid_t').style.display="block"
    document.getElementById('caja_pdcr_small_t').style.display="none"
    //document.getElementById('pdcr_1_image').src="static/content/cajas/interior/pdcr_1/pdcr_1.jpg"
    pdcr_caja="pdcr_mid"
    pdcr_caja_to_db="PDCR-MID"
    pdcr_array=[]
    pdcr_mid_array=[]
    pdcr_small_array=[]
    var t1 = new ToolTip_pdcr_1t(img_pdcr_mid_t, "This is a tool-tip", 150);
    cargar_imagen_pdcr_mid_t();
  }
  if(document.getElementById('pdcr_option').value==='PDC_RSMALL'){
    // console.log("pdcr_mid")
    document.getElementById('caja_pdcr_t').style.display="none"
    document.getElementById('caja_pdcr_mid_t').style.display="none"
    document.getElementById('caja_pdcr_small_t').style.display="block"
    //document.getElementById('pdcr_1_image').src="static/content/cajas/interior/pdcr_1/pdcr_1.jpg"
    pdcr_caja="pdcr_small"
    pdcr_caja_to_db="PDC-RS"
    pdcr_array=[]
    pdcr_mid_array=[]
    pdcr_small_array=[]
    var t1 = new ToolTip_pdcrs_1t(img_pdcr_small_t, "This is a tool-tip", 150);
    cargar_imagen_pdcr_small_t();
  }

}
function getDistance_torque(x1, y1, x2, y2){
  xDistance_torque = x2 - x1;
  yDistance_torque = y2 - y1;
  // console.log("Distancia en X: ",xDistance_torque);
  // console.log("Distancia en Y: ",yDistance_torque);
}
/////////// PDC-P TORQUES ///////////
function cargar_imagen_pdcp_t(){
  if (img_pdcp_t.getContext) {
    var ctx_pdcp_t = img_pdcp_t.getContext("2d");
    var img = new Image();
    img.src = "static/content/cajas/interior/pdcp/pdcp.jpg";
    img.onload = function(){
      imgWidth_pdcp_t = this.width;
      imgHeight_pdcp_t = this.height;
      img_pdcp_t.width = imgWidth_pdcp_t;
      img_pdcp_t.height = imgHeight_pdcp_t;
      ctx_pdcp_t.drawImage(this,0,0,imgWidth_pdcp_t,imgHeight_pdcp_t);
      var datosimagen = ctx_pdcp_t.getImageData(0,0,imgWidth_pdcp_t,imgHeight_pdcp_t);
      datosPrim_pdcp_t = datosimagen.data;
      ctx_pdcp_t.lineWidth = "3";
      pintar_2();

      img_pdcp_t.onmouseup = function(event){
        var torque;
        // console.log(torques_BB);
        // console.log(torques_BB['PDC-P']);
        let keys_pdcp_t = Object.keys(torques_BB['PDC-P']);
        // console.log("KEYS DE PDC-P: ",keys_pdcp_t);
        var x = event.pageX;
        var y = event.pageY;
        var coor = "X coords: " + x + ", Y coords: " + y;
        // console.log(coor);
        var X = document.getElementById("pdcp_image_t_canvas").getBoundingClientRect();
        pixelx=x-window.scrollX-X.left
        pixely=y-window.scrollY-X.top
        // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

        for(i=0;i<keys_pdcp_t.length;i++){
          // console.log("Key Actual",keys_pdcp_t[i])
          if(pixelx>=torques_BB['PDC-P'][keys_pdcp_t[i]][0][0] && pixelx<=torques_BB['PDC-P'][keys_pdcp_t[i]][1][0] && pixely>=torques_BB['PDC-P'][keys_pdcp_t[i]][0][1] && pixely<=torques_BB['PDC-P'][keys_pdcp_t[i]][1][1]){
            element=keys_pdcp_t[i]
            torques_value["PDC-P"][element] = true
            console.log("Torque Value Final: ",torques_value);
            torque = element;

            if (pdcp_t_array.length!=0){
              if(pdcp_t_array.indexOf(element)!=-1){
                torques_value["PDC-P"][element] = false;
                pdcp_t_array.splice(pdcp_t_array.indexOf(element),1)
                restaurar_pdcp_t(ctx_pdcp_t,img_pdcp_t);
                pintar_2()
              }
              else{
                pdcp_t_array.push(element)
                pintar()
              }
            }
            else{
              pdcp_t_array.push(element)
              pintar()
            }
            // console.log("LEYENDO ARRAY 2: ",pdcp_t_array);
          }
        }
        console.log("TORQUE: ",torque);
      }

      function pintar(){
        // console.log("pdcp_t_array: ",pdcp_t_array)
        let cavidad = pdcp_t_array[pdcp_t_array.length-1];
        // console.log("CAVIDAD : ",cavidad);
        let torqueColocado = torques_BB["PDC-P"][cavidad];
        
        let cavidadx = torques_BB["PDC-P"][cavidad][0][0];
        let cavidady = torques_BB["PDC-P"][cavidad][0][1];
        let cavidadw = torques_BB["PDC-P"][cavidad][1][0];
        let cavidadh = torques_BB["PDC-P"][cavidad][1][1];
        // console.log(cavidadx)
        // console.log(cavidady)
        // console.log(cavidadw)
        // console.log(cavidadh)
        getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
        ctx_pdcp_t.beginPath();
        ctx_pdcp_t.strokeStyle = color_style;
        ctx_pdcp_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);
      }

      function pintar_2(){
        for (var i = 0; i < pdcp_t_array.length; i++) {
          pdcp_t_array[i]
          let cavidad = pdcp_t_array[i];
          // console.log("pdcp_t_array[i]",cavidad);
          // console.log("pdcp_t_array[i] Posicion desde torques value: ",torques_value["PDC-P"][cavidad])
          let torqueColocado = torques_BB["PDC-P"][cavidad];
          let cavidadx = torques_BB["PDC-P"][cavidad][0][0];
          let cavidady = torques_BB["PDC-P"][cavidad][0][1];
          let cavidadw = torques_BB["PDC-P"][cavidad][1][0];
          let cavidadh = torques_BB["PDC-P"][cavidad][1][1];
          // console.log(cavidadx)
          // console.log(cavidady)
          // console.log(cavidadw)
          // console.log(cavidadh)
          getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
          ctx_pdcp_t.beginPath();
          ctx_pdcp_t.strokeStyle = color_style;
          ctx_pdcp_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);              
        }
      }
    }
  }
}
function restaurar_pdcp_t(ctx_pdcp_t,img_pdcp_t){
  var datosimagen = ctx_pdcp_t.getImageData(0,0,imgWidth_pdcp_t,imgHeight_pdcp_t);
  var datos = datosimagen.data;
  for (var i = 0; i < datos.length; i++) {
    datos[i] = datosPrim_pdcp_t[i];
    datos[i+1] = datosPrim_pdcp_t[i+1];
    datos[i+2] = datosPrim_pdcp_t[i+2];
  }
  ctx_pdcp_t.putImageData(datosimagen,0,0);
}
/////////// PDC-D TORQUES ///////////
function cargar_imagen_pdcd_t(){
  if (img_pdcd_t.getContext) {
    var ctx_pdcd_t = img_pdcd_t.getContext("2d");
    var img = new Image();
    img.src = "static/content/cajas/interior/pdcd2/pdcd2.jpg";
    img.onload = function(){
      imgWidth_pdcd_t = this.width;
      imgHeight_pdcd_t = this.height;
      img_pdcd_t.width = imgWidth_pdcd_t;
      img_pdcd_t.height = imgHeight_pdcd_t;
      ctx_pdcd_t.drawImage(this,0,0,imgWidth_pdcd_t,imgHeight_pdcd_t);
      var datosimagen = ctx_pdcd_t.getImageData(0,0,imgWidth_pdcd_t,imgHeight_pdcd_t);
      datosPrim_pdcd_t = datosimagen.data;
      ctx_pdcd_t.lineWidth = "3";
      pintar_2();

      img_pdcd_t.onmouseup = function(event){
        var torque;
        // console.log(torques_BB);
        // console.log(torques_BB['PDC-D']);
        let keys_pdcd_t = Object.keys(torques_BB['PDC-D']);
        // console.log("KEYS DE PDC-D: ",keys_pdcd_t);
        var x = event.pageX;
        var y = event.pageY;
        var coor = "X coords: " + x + ", Y coords: " + y;
        // console.log(coor);
        var X = document.getElementById("pdcd_image_t_canvas").getBoundingClientRect();
        pixelx=x-window.scrollX-X.left
        pixely=y-window.scrollY-X.top
        // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

        for(i=0;i<keys_pdcd_t.length;i++){
          // console.log("Key Actual",keys_pdcd_t[i])
          if(pixelx>=torques_BB['PDC-D'][keys_pdcd_t[i]][0][0] && pixelx<=torques_BB['PDC-D'][keys_pdcd_t[i]][1][0] && pixely>=torques_BB['PDC-D'][keys_pdcd_t[i]][0][1] && pixely<=torques_BB['PDC-D'][keys_pdcd_t[i]][1][1]){
            element=keys_pdcd_t[i]
            torques_value["PDC-D"][element] = true
            console.log("Torque Value Final: ",torques_value);
            torque = element;

            if (pdcd_t_array.length!=0){
              if(pdcd_t_array.indexOf(element)!=-1){
                torques_value["PDC-D"][element] = false;
                pdcd_t_array.splice(pdcd_t_array.indexOf(element),1)
                restaurar_pdcd_t(ctx_pdcd_t,img_pdcd_t);
                pintar_2()
              }
              else{
                pdcd_t_array.push(element)
                pintar()
              }
            }
            else{
              pdcd_t_array.push(element)
              pintar()
            }
            // console.log("LEYENDO ARRAY 2: ",pdcd_t_array);
          }
        }
        console.log("TORQUE: ",torque);
      }

      function pintar(){
        // console.log("Dentro de pintar")
        // console.log("pdcd_t_array: ",pdcd_t_array)
        let cavidad = pdcd_t_array[pdcd_t_array.length-1];
        // console.log("CAVIDAD : ",cavidad);
        let torqueColocado = torques_BB["PDC-D"][cavidad];
        
        let cavidadx = torques_BB["PDC-D"][cavidad][0][0];
        let cavidady = torques_BB["PDC-D"][cavidad][0][1];
        let cavidadw = torques_BB["PDC-D"][cavidad][1][0];
        let cavidadh = torques_BB["PDC-D"][cavidad][1][1];
        // console.log(cavidadx)
        // console.log(cavidady)
        // console.log(cavidadw)
        // console.log(cavidadh)
        getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
        ctx_pdcd_t.beginPath();
        ctx_pdcd_t.strokeStyle = color_style;
        ctx_pdcd_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);
      }

      function pintar_2(){
        for (var i = 0; i < pdcd_t_array.length; i++) {
          pdcd_t_array[i]
          let cavidad = pdcd_t_array[i];
          // console.log("Cavidad",cavidad);
          // console.log("pdcd_t_array[i] Posicion desde torques value: ",torques_value["PDC-D"][pdcd_t_array[i]])
          let torqueColocado = torques_BB["PDC-D"][cavidad];
          let cavidadx = torques_BB["PDC-D"][cavidad][0][0];
          let cavidady = torques_BB["PDC-D"][cavidad][0][1];
          let cavidadw = torques_BB["PDC-D"][cavidad][1][0];
          let cavidadh = torques_BB["PDC-D"][cavidad][1][1];
          // console.log(cavidadx)
          // console.log(cavidady)
          // console.log(cavidadw)
          // console.log(cavidadh)
          getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
          ctx_pdcd_t.beginPath();
          ctx_pdcd_t.strokeStyle = color_style;
          ctx_pdcd_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);              
        }
      }
    }
  }
}
function restaurar_pdcd_t(ctx_pdcd_t,img_pdcd_t){
  var datosimagen = ctx_pdcd_t.getImageData(0,0,imgWidth_pdcd_t,imgHeight_pdcd_t);
  var datos = datosimagen.data;
  for (var i = 0; i < datos.length; i++) {
    datos[i] = datosPrim_pdcd_t[i];
    datos[i+1] = datosPrim_pdcd_t[i+1];
    datos[i+2] = datosPrim_pdcd_t[i+2];
  }
  ctx_pdcd_t.putImageData(datosimagen,0,0);
}
/////////// MFB-P1 TORQUES ///////////
function cargar_imagen_mfbp1_t(){
  if (img_mfbp1_t.getContext) {
      var ctx_mfbp1_t = img_mfbp1_t.getContext("2d");
      var img = new Image();
      img.src = "static/content/cajas/interior/mfbp1/mfbp1.jpg";
      img.onload = function(){
          imgWidth_mfbp1_t = this.width;
          imgHeight_mfbp1_t = this.height;
          img_mfbp1_t.width = imgWidth_mfbp1_t;
          img_mfbp1_t.height = imgHeight_mfbp1_t;
          ctx_mfbp1_t.drawImage(this,0,0,imgWidth_mfbp1_t,imgHeight_mfbp1_t);
          var datosimagen = ctx_mfbp1_t.getImageData(0,0,imgWidth_mfbp1_t,imgHeight_mfbp1_t);
          datosPrim_mfbp1_t = datosimagen.data;
          ctx_mfbp1_t.lineWidth = "3";
          pintar_2();

          img_mfbp1_t.onmouseup = function(event){
              var torque;
              // console.log(torques_BB);
              // console.log(torques_BB['MFB-P1']);
              let keys_mfbp1_t = Object.keys(torques_BB['MFB-P1']);
              // console.log("KEYS DE MFB-P1: ",keys_mfbp1_t);
              var x = event.pageX;
              var y = event.pageY;
              var coor = "X coords: " + x + ", Y coords: " + y;
              // console.log(coor);
              var X = document.getElementById("mfbp1_image_t_canvas").getBoundingClientRect();
              pixelx=x-window.scrollX-X.left
              pixely=y-window.scrollY-X.top
              // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

              for(i=0;i<keys_mfbp1_t.length;i++){
                // console.log("Key Actual",keys_mfbp1_t[i])
                  if(pixelx>=torques_BB['MFB-P1'][keys_mfbp1_t[i]][0][0] && pixelx<=torques_BB['MFB-P1'][keys_mfbp1_t[i]][1][0] && pixely>=torques_BB['MFB-P1'][keys_mfbp1_t[i]][0][1] && pixely<=torques_BB['MFB-P1'][keys_mfbp1_t[i]][1][1]){
                      element=keys_mfbp1_t[i]
                      torques_value["MFB-P1"][element] = true
                      console.log("Torque Value Final: ",torques_value);
                      torque = element;

                      if (mfbp1_t_array.length!=0){
                          if(mfbp1_t_array.indexOf(element)!=-1){
                              torques_value["MFB-P1"][element] = false;
                              mfbp1_t_array.splice(mfbp1_t_array.indexOf(element),1)
                              restaurar_mfbp1_t(ctx_mfbp1_t,img_mfbp1_t);
                              pintar_2()
                          }
                          else{
                              mfbp1_t_array.push(element)
                              pintar()
                          }
                      }
                      else{
                          mfbp1_t_array.push(element)
                          pintar()
                      }
                      // console.log("LEYENDO ARRAY 2: ",mfbp1_t_array);
                  }
              }
              console.log("TORQUE: ",torque);
          }

          function pintar(){
            // console.log("mfbp1_t_array: ",mfbp1_t_array)
            let cavidad = mfbp1_t_array[mfbp1_t_array.length-1];
            // console.log("CAVIDAD : ",cavidad);
            let torqueColocado = torques_BB["MFB-P1"][cavidad];
            
            let cavidadx = torques_BB["MFB-P1"][cavidad][0][0];
            let cavidady = torques_BB["MFB-P1"][cavidad][0][1];
            let cavidadw = torques_BB["MFB-P1"][cavidad][1][0];
            let cavidadh = torques_BB["MFB-P1"][cavidad][1][1];
            // console.log(cavidadx)
            // console.log(cavidady)
            // console.log(cavidadw)
            // console.log(cavidadh)
            getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
            ctx_mfbp1_t.beginPath();
            ctx_mfbp1_t.strokeStyle = color_style;
            ctx_mfbp1_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);
          }

          function pintar_2(){
              for (var i = 0; i < mfbp1_t_array.length; i++) {
                mfbp1_t_array[i]
                let cavidad = mfbp1_t_array[i];
                // console.log("Cavidad",cavidad);
                // console.log("mfbp1_t_array[i] Posicion desde torques value: ",torques_value["MFB-P1"][cavidad])
                let torqueColocado = torques_BB["MFB-P1"][cavidad];
                let cavidadx = torques_BB["MFB-P1"][cavidad][0][0];
                let cavidady = torques_BB["MFB-P1"][cavidad][0][1];
                let cavidadw = torques_BB["MFB-P1"][cavidad][1][0];
                let cavidadh = torques_BB["MFB-P1"][cavidad][1][1];
                // console.log(cavidadx)
                // console.log(cavidady)
                // console.log(cavidadw)
                // console.log(cavidadh)
                getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
                ctx_mfbp1_t.beginPath();
                ctx_mfbp1_t.strokeStyle = color_style;
                ctx_mfbp1_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);
              }
          }
      }
  }
}
function restaurar_mfbp1_t(ctx_mfbp1_t,img_mfbp1_t){
  var datosimagen = ctx_mfbp1_t.getImageData(0,0,imgWidth_mfbp1_t,imgHeight_mfbp1_t);
  var datos = datosimagen.data;
  for (var i = 0; i < datos.length; i++) {
      datos[i] = datosPrim_mfbp1_t[i];
      datos[i+1] = datosPrim_mfbp1_t[i+1];
      datos[i+2] = datosPrim_mfbp1_t[i+2];
  }
  ctx_mfbp1_t.putImageData(datosimagen,0,0);
}
/////////// MFB-S TORQUES ///////////
function cargar_imagen_mfbs_t(){
  if (img_mfbs_t.getContext) {
      var ctx_mfbs_t = img_mfbs_t.getContext("2d");
      var img = new Image();
      img.src = "static/content/cajas/interior/mfbs/mfbs.jpg";
      img.onload = function(){
          imgWidth_mfbs_t = this.width;
          imgHeight_mfbs_t = this.height;
          img_mfbs_t.width = imgWidth_mfbs_t;
          img_mfbs_t.height = imgHeight_mfbs_t;
          ctx_mfbs_t.drawImage(this,0,0,imgWidth_mfbs_t,imgHeight_mfbs_t);
          var datosimagen = ctx_mfbs_t.getImageData(0,0,imgWidth_mfbs_t,imgHeight_mfbs_t);
          datosPrim_mfbs_t = datosimagen.data;
          ctx_mfbs_t.lineWidth = "3";
          pintar_2();

          img_mfbs_t.onmouseup = function(event){
              var torque;
              // console.log(torques_BB);
              // console.log(torques_BB['MFB-S']);
              let keys_mfbs_t = Object.keys(torques_BB['MFB-S']);
              // console.log("KEYS DE MFB-S: ",keys_mfbs_t);
              var x = event.pageX;
              var y = event.pageY;
              var coor = "X coords: " + x + ", Y coords: " + y;
              // console.log(coor);
              var X = document.getElementById("mfbs_image_t_canvas").getBoundingClientRect();
              pixelx=x-window.scrollX-X.left
              pixely=y-window.scrollY-X.top
              // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

              for(i=0;i<keys_mfbs_t.length;i++){
                // console.log("Key Actual",keys_mfbs_t[i])
                  if(pixelx>=torques_BB['MFB-S'][keys_mfbs_t[i]][0][0] && pixelx<=torques_BB['MFB-S'][keys_mfbs_t[i]][1][0] && pixely>=torques_BB['MFB-S'][keys_mfbs_t[i]][0][1] && pixely<=torques_BB['MFB-S'][keys_mfbs_t[i]][1][1]){
                      element=keys_mfbs_t[i]
                      torques_value["MFB-S"][element] = true
                      console.log("Torque Value Final: ",torques_value);
                      torque = element;

                      if (mfbs_t_array.length!=0){
                          if(mfbs_t_array.indexOf(element)!=-1){
                              torques_value["MFB-S"][element] = false;
                              mfbs_t_array.splice(mfbs_t_array.indexOf(element),1)
                              restaurar_mfbs_t(ctx_mfbs_t,img_mfbs_t);
                              pintar_2()
                          }
                          else{
                              mfbs_t_array.push(element)
                              pintar()
                          }
                      }
                      else{
                          mfbs_t_array.push(element)
                          pintar()
                      }
                      // console.log("LEYENDO ARRAY 2: ",mfbs_t_array);
                  }
              }
              console.log("TORQUE: ",torque);
          }

          function pintar(){
            // console.log("mfbs_t_array: ",mfbs_t_array)
            let cavidad = mfbs_t_array[mfbs_t_array.length-1];
            // console.log("CAVIDAD : ",cavidad);
            let torqueColocado = torques_BB["MFB-S"][cavidad];
            
            let cavidadx = torques_BB["MFB-S"][cavidad][0][0];
            let cavidady = torques_BB["MFB-S"][cavidad][0][1];
            let cavidadw = torques_BB["MFB-S"][cavidad][1][0];
            let cavidadh = torques_BB["MFB-S"][cavidad][1][1];
            // console.log(cavidadx)
            // console.log(cavidady)
            // console.log(cavidadw)
            // console.log(cavidadh)
            getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
            ctx_mfbs_t.beginPath();
            ctx_mfbs_t.strokeStyle = color_style;
            ctx_mfbs_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);
          }

          function pintar_2(){
              for (var i = 0; i < mfbs_t_array.length; i++) {
                mfbs_t_array[i]
                let cavidad = mfbs_t_array[i];
                // console.log("Cavidad",cavidad);
                // console.log("mfbs_t_array[i] Posicion desde torques value: ",torques_value["MFB-S"][cavidad])
                let torqueColocado = torques_BB["MFB-S"][cavidad];
                let cavidadx = torques_BB["MFB-S"][cavidad][0][0];
                let cavidady = torques_BB["MFB-S"][cavidad][0][1];
                let cavidadw = torques_BB["MFB-S"][cavidad][1][0];
                let cavidadh = torques_BB["MFB-S"][cavidad][1][1];
                // console.log(cavidadx)
                // console.log(cavidady)
                // console.log(cavidadw)
                // console.log(cavidadh)
                getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
                ctx_mfbs_t.beginPath();
                ctx_mfbs_t.strokeStyle = color_style;
                ctx_mfbs_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);
              }
          }
      }
  }
}
function restaurar_mfbs_t(ctx_mfbs_t,img_mfbs_t){
  var datosimagen = ctx_mfbs_t.getImageData(0,0,imgWidth_mfbs_t,imgHeight_mfbs_t);
  var datos = datosimagen.data;
  for (var i = 0; i < datos.length; i++) {
      datos[i] = datosPrim_mfbs_t[i];
      datos[i+1] = datosPrim_mfbs_t[i+1];
      datos[i+2] = datosPrim_mfbs_t[i+2];
  }
  ctx_mfbs_t.putImageData(datosimagen,0,0);
}
/////////// MFB-E TORQUES ///////////
function cargar_imagen_mfbe_t(){
  if (img_mfbe_t.getContext) {
      var ctx_mfbe_t = img_mfbe_t.getContext("2d");
      var img = new Image();
      img.src = "static/content/cajas/interior/mfbe/mfbe.jpg";
      img.onload = function(){
          imgWidth_mfbe_t = this.width;
          imgHeight_mfbe_t = this.height;
          img_mfbe_t.width = imgWidth_mfbe_t;
          img_mfbe_t.height = imgHeight_mfbe_t;
          ctx_mfbe_t.drawImage(this,0,0,imgWidth_mfbe_t,imgHeight_mfbe_t);
          var datosimagen = ctx_mfbe_t.getImageData(0,0,imgWidth_mfbe_t,imgHeight_mfbe_t);
          datosPrim_mfbe_t = datosimagen.data;
          ctx_mfbe_t.lineWidth = "3";
          pintar_2();

          img_mfbe_t.onmouseup = function(event){
              var torque;
              // console.log(torques_BB);
              // console.log(torques_BB['MFB-E']);
              let keys_mfbe_t = Object.keys(torques_BB['MFB-E']);
              // console.log("KEYS DE MFB-E: ",keys_mfbe_t);
              var x = event.pageX;
              var y = event.pageY;
              var coor = "X coords: " + x + ", Y coords: " + y;
              // console.log(coor);
              var X = document.getElementById("mfbe_image_t_canvas").getBoundingClientRect();
              pixelx=x-window.scrollX-X.left
              pixely=y-window.scrollY-X.top
              // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

              for(i=0;i<keys_mfbe_t.length;i++){
                // console.log("Key Actual",keys_mfbe_t[i])
                  if(pixelx>=torques_BB['MFB-E'][keys_mfbe_t[i]][0][0] && pixelx<=torques_BB['MFB-E'][keys_mfbe_t[i]][1][0] && pixely>=torques_BB['MFB-E'][keys_mfbe_t[i]][0][1] && pixely<=torques_BB['MFB-E'][keys_mfbe_t[i]][1][1]){
                      element=keys_mfbe_t[i]
                      torques_value["MFB-E"][element] = true
                      console.log("Torque Value Final: ",torques_value);
                      torque = element;

                      if (mfbe_t_array.length!=0){
                          if(mfbe_t_array.indexOf(element)!=-1){
                              torques_value["MFB-E"][element] = false;
                              mfbe_t_array.splice(mfbe_t_array.indexOf(element),1)
                              restaurar_mfbe_t(ctx_mfbe_t,img_mfbe_t);
                              pintar_2()
                          }
                          else{
                              mfbe_t_array.push(element)
                              pintar()
                          }
                      }
                      else{
                          mfbe_t_array.push(element)
                          pintar()
                      }
                      // console.log("LEYENDO ARRAY 2: ",mfbe_t_array);
                  }
              }
              console.log("TORQUE: ",torque);
          }

          function pintar(){
            // console.log("mfbe_t_array: ",mfbe_t_array)
            let cavidad = mfbe_t_array[mfbe_t_array.length-1];
            // console.log("CAVIDAD : ",cavidad);
            let torqueColocado = torques_BB["MFB-E"][cavidad];
            
            let cavidadx = torques_BB["MFB-E"][cavidad][0][0];
            let cavidady = torques_BB["MFB-E"][cavidad][0][1];
            let cavidadw = torques_BB["MFB-E"][cavidad][1][0];
            let cavidadh = torques_BB["MFB-E"][cavidad][1][1];
            // console.log(cavidadx)
            // console.log(cavidady)
            // console.log(cavidadw)
            // console.log(cavidadh)
            getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
            ctx_mfbe_t.beginPath();
            ctx_mfbe_t.strokeStyle = color_style;
            ctx_mfbe_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);
          }

          function pintar_2(){
              for (var i = 0; i < mfbe_t_array.length; i++) {
                mfbe_t_array[i]
                let cavidad = mfbe_t_array[i];
                // console.log("Cavidad",cavidad);
                // console.log("mfbe_t_array[i] Posicion desde torques value: ",torques_value["MFB-E"][cavidad])
                let torqueColocado = torques_BB["MFB-E"][cavidad];
                let cavidadx = torques_BB["MFB-E"][cavidad][0][0];
                let cavidady = torques_BB["MFB-E"][cavidad][0][1];
                let cavidadw = torques_BB["MFB-E"][cavidad][1][0];
                let cavidadh = torques_BB["MFB-E"][cavidad][1][1];
                // console.log(cavidadx)
                // console.log(cavidady)
                // console.log(cavidadw)
                // console.log(cavidadh)
                getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
                ctx_mfbe_t.beginPath();
                ctx_mfbe_t.strokeStyle = color_style;
                ctx_mfbe_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);
              }
          }
      }
  }
}
function restaurar_mfbe_t(ctx_mfbe_t,img_mfbe_t){
  var datosimagen = ctx_mfbe_t.getImageData(0,0,imgWidth_mfbe_t,imgHeight_mfbe_t);
  var datos = datosimagen.data;
  for (var i = 0; i < datos.length; i++) {
      datos[i] = datosPrim_mfbe_t[i];
      datos[i+1] = datosPrim_mfbe_t[i+1];
      datos[i+2] = datosPrim_mfbe_t[i+2];
  }
  ctx_mfbe_t.putImageData(datosimagen,0,0);
}
/////////// MFB-P2 TORQUES ///////////
function cargar_imagen_mfbp2_t(){
  if (img_mfbp2_t.getContext) {
      var ctx_mfbp2_t = img_mfbp2_t.getContext("2d");
      var img = new Image();
      img.src = "static/content/cajas/interior/mfbp2/mfbp2.jpg";
      img.onload = function(){
          imgWidth_mfbp2_t = this.width;
          imgHeight_mfbp2_t = this.height;
          img_mfbp2_t.width = imgWidth_mfbp2_t;
          img_mfbp2_t.height = imgHeight_mfbp2_t;
          ctx_mfbp2_t.drawImage(this,0,0,imgWidth_mfbp2_t,imgHeight_mfbp2_t);
          var datosimagen = ctx_mfbp2_t.getImageData(0,0,imgWidth_mfbp2_t,imgHeight_mfbp2_t);
          datosPrim_mfbp2_t = datosimagen.data;
          ctx_mfbp2_t.lineWidth = "3";
          pintar_2();

          img_mfbp2_t.onmouseup = function(event){
              var torque;
              // console.log(torques_BB);
              // console.log(torques_BB['MFB-P2']);
              let keys_mfbp2_t = Object.keys(torques_BB['MFB-P2']);
              // console.log("KEYS DE MFB-P2: ",keys_mfbp2_t);
              var x = event.pageX;
              var y = event.pageY;
              var coor = "X coords: " + x + ", Y coords: " + y;
              // console.log(coor);
              var X = document.getElementById("mfbp2_image_t_canvas").getBoundingClientRect();
              pixelx=x-window.scrollX-X.left
              pixely=y-window.scrollY-X.top
              // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

              for(i=0;i<keys_mfbp2_t.length;i++){
                // console.log("Key Actual",keys_mfbp2_t[i])
                  if(pixelx>=torques_BB['MFB-P2'][keys_mfbp2_t[i]][0][0] && pixelx<=torques_BB['MFB-P2'][keys_mfbp2_t[i]][1][0] && pixely>=torques_BB['MFB-P2'][keys_mfbp2_t[i]][0][1] && pixely<=torques_BB['MFB-P2'][keys_mfbp2_t[i]][1][1]){
                      element=keys_mfbp2_t[i]
                      torques_value["MFB-P2"][element] = true
                      console.log("Torque Value Final: ",torques_value);
                      torque = element;

                      if (mfbp2_t_array.length!=0){
                          if(mfbp2_t_array.indexOf(element)!=-1){
                              torques_value["MFB-P2"][element] = false;
                              mfbp2_t_array.splice(mfbp2_t_array.indexOf(element),1)
                              restaurar_mfbp2_t(ctx_mfbp2_t,img_mfbp2_t);
                              pintar_2()
                          }
                          else{
                              mfbp2_t_array.push(element)
                              pintar()
                          }
                      }
                      else{
                          mfbp2_t_array.push(element)
                          pintar()
                      }
                      // console.log("LEYENDO ARRAY 2: ",mfbp2_t_array);
                  }
              }
              console.log("TORQUE: ",torque);
          }

          function pintar(){
            // console.log("mfbp2_t_array: ",mfbp2_t_array)
            let cavidad = mfbp2_t_array[mfbp2_t_array.length-1];
            // console.log("CAVIDAD : ",cavidad);
            let torqueColocado = torques_BB["MFB-P2"][cavidad];
            let cavidadx = torques_BB["MFB-P2"][cavidad][0][0];
            let cavidady = torques_BB["MFB-P2"][cavidad][0][1];
            let cavidadw = torques_BB["MFB-P2"][cavidad][1][0];
            let cavidadh = torques_BB["MFB-P2"][cavidad][1][1];
            // console.log(cavidadx)
            // console.log(cavidady)
            // console.log(cavidadw)
            // console.log(cavidadh)
            getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
            ctx_mfbp2_t.beginPath();
            ctx_mfbp2_t.strokeStyle = color_style;
            ctx_mfbp2_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);
          }

          function pintar_2(){
              for (var i = 0; i < mfbp2_t_array.length; i++) {
                mfbp2_t_array[i]
                let cavidad = mfbp2_t_array[i];
                // console.log("Cavidad",cavidad);
                // console.log("mfbp2_t_array[i] Posicion desde torques value: ",torques_value["MFB-P2"][cavidad])
                let torqueColocado = torques_BB["MFB-P2"][cavidad];
                let cavidadx = torques_BB["MFB-P2"][cavidad][0][0];
                let cavidady = torques_BB["MFB-P2"][cavidad][0][1];
                let cavidadw = torques_BB["MFB-P2"][cavidad][1][0];
                let cavidadh = torques_BB["MFB-P2"][cavidad][1][1];
                // console.log(cavidadx)
                // console.log(cavidady)
                // console.log(cavidadw)
                // console.log(cavidadh)
                getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
                ctx_mfbp2_t.beginPath();
                ctx_mfbp2_t.strokeStyle = color_style;
                ctx_mfbp2_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);
              }
          }
      }
  }
}
function restaurar_mfbp2_t(ctx_mfbp2_t,img_mfbp2_t){
  var datosimagen = ctx_mfbp2_t.getImageData(0,0,imgWidth_mfbp2_t,imgHeight_mfbp2_t);
  var datos = datosimagen.data;
  for (var i = 0; i < datos.length; i++) {
      datos[i] = datosPrim_mfbp2_t[i];
      datos[i+1] = datosPrim_mfbp2_t[i+1];
      datos[i+2] = datosPrim_mfbp2_t[i+2];
  }
  ctx_mfbp2_t.putImageData(datosimagen,0,0);
}
/////////// PDC-R TORQUES ///////////
function cargar_imagen_pdcr_t(){
  if (img_pdcr_t.getContext) {
    var ctx_pdcr_t = img_pdcr_t.getContext("2d");
    var img = new Image();
    img.src = "static/content/cajas/interior/pdcr2/pdcr2.jpg";
    img.onload = function(){
      imgWidth_pdcr_t = this.width;
      imgHeight_pdcr_t = this.height;
      img_pdcr_t.width = imgWidth_pdcr_t;
      img_pdcr_t.height = imgHeight_pdcr_t;
      ctx_pdcr_t.drawImage(this,0,0,imgWidth_pdcr_t,imgHeight_pdcr_t);
      var datosimagen = ctx_pdcr_t.getImageData(0,0,imgWidth_pdcr_t,imgHeight_pdcr_t);
      datosPrim_pdcr_t = datosimagen.data;
      ctx_pdcr_t.lineWidth = "3";
      pintar_2();

      img_pdcr_t.onmouseup = function(event){
        var torque;
        // console.log(torques_BB);
        // console.log(torques_BB['PDC-R']);
        let keys_pdcr_t = Object.keys(torques_BB['PDC-R']);
        // console.log("KEYS DE PDC-R: ",keys_pdcr_t);
        var x = event.pageX;
        var y = event.pageY;
        var coor = "X coords: " + x + ", Y coords: " + y;
        // console.log(coor);
        var X = document.getElementById("pdcr_image_t_canvas").getBoundingClientRect();
        pixelx=x-window.scrollX-X.left
        pixely=y-window.scrollY-X.top
        // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

        for(i=0;i<keys_pdcr_t.length;i++){
          // console.log("Key Actual",keys_pdcr_t[i])
          if(pixelx>=torques_BB['PDC-R'][keys_pdcr_t[i]][0][0] && pixelx<=torques_BB['PDC-R'][keys_pdcr_t[i]][1][0] && pixely>=torques_BB['PDC-R'][keys_pdcr_t[i]][0][1] && pixely<=torques_BB['PDC-R'][keys_pdcr_t[i]][1][1]){
            element=keys_pdcr_t[i]
            torques_value["PDC-R"][element] = true
            console.log("Torque Value Final: ",torques_value);
            torque = element;

            if (pdcr_t_array.length!=0){
              if(pdcr_t_array.indexOf(element)!=-1){
                torques_value["PDC-R"][element] = false;
                pdcr_t_array.splice(pdcr_t_array.indexOf(element),1)
                restaurar_pdcr_t(ctx_pdcr_t,img_pdcr_t);
                pintar_2()
              }
              else{
                pdcr_t_array.push(element)
                pintar()
              }
            }
            else{
              pdcr_t_array.push(element)
              pintar()
            }
            // console.log("LEYENDO ARRAY 2: ",pdcr_t_array);
          }
        }
        console.log("TORQUE: ",torque);
      }

      function pintar(){
        // console.log("pdcr_t_array: ",pdcr_t_array)
        let cavidad = pdcr_t_array[pdcr_t_array.length-1];
        // console.log("CAVIDAD : ",cavidad);
        let torqueColocado = torques_BB["PDC-R"][cavidad];
        
        let cavidadx = torques_BB["PDC-R"][cavidad][0][0];
        let cavidady = torques_BB["PDC-R"][cavidad][0][1];
        let cavidadw = torques_BB["PDC-R"][cavidad][1][0];
        let cavidadh = torques_BB["PDC-R"][cavidad][1][1];
        // console.log(cavidadx)
        // console.log(cavidady)
        // console.log(cavidadw)
        // console.log(cavidadh)
        getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
        ctx_pdcr_t.beginPath();
        ctx_pdcr_t.strokeStyle = color_style;
        ctx_pdcr_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);
      }

      function pintar_2(){
        for (var i = 0; i < pdcr_t_array.length; i++) {
          pdcr_t_array[i]
          let cavidad = pdcr_t_array[i];
          // console.log("Cavidad",cavidad);
          // console.log("pdcr_t_array[i] Posicion desde torques value: ",torques_value["PDC-R"][pdcr_t_array[i]])
          let torqueColocado = torques_BB["PDC-R"][cavidad];
          let cavidadx = torques_BB["PDC-R"][cavidad][0][0];
          let cavidady = torques_BB["PDC-R"][cavidad][0][1];
          let cavidadw = torques_BB["PDC-R"][cavidad][1][0];
          let cavidadh = torques_BB["PDC-R"][cavidad][1][1];
          // console.log(cavidadx)
          // console.log(cavidady)
          // console.log(cavidadw)
          // console.log(cavidadh)
          getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
          ctx_pdcr_t.beginPath();
          ctx_pdcr_t.strokeStyle = color_style;
          ctx_pdcr_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);              
        }
      }
    }
  }
}
function restaurar_pdcr_t(ctx_pdcr_t,img_pdcr_t){
  var datosimagen = ctx_pdcr_t.getImageData(0,0,imgWidth_pdcr_t,imgHeight_pdcr_t);
  var datos = datosimagen.data;
  for (var i = 0; i < datos.length; i++) {
    datos[i] = datosPrim_pdcr_t[i];
    datos[i+1] = datosPrim_pdcr_t[i+1];
    datos[i+2] = datosPrim_pdcr_t[i+2];
  }
  ctx_pdcr_t.putImageData(datosimagen,0,0);
}
/////////// PDC-RMID TORQUES ///////////
function cargar_imagen_pdcr_mid_t(){
  if (img_pdcr_mid_t.getContext) {
    var ctx_pdcr_mid_t = img_pdcr_mid_t.getContext("2d");
    var img = new Image();
    img.src = "static/content/cajas/interior/pdcr2_mid/pdcr2_mid.jpg";
    img.onload = function(){
      imgWidth_pdcr_mid_t = this.width;
      imgHeight_pdcr_mid_t = this.height;
      img_pdcr_mid_t.width = imgWidth_pdcr_mid_t;
      img_pdcr_mid_t.height = imgHeight_pdcr_mid_t;
      ctx_pdcr_mid_t.drawImage(this,0,0,imgWidth_pdcr_mid_t,imgHeight_pdcr_mid_t);
      var datosimagen = ctx_pdcr_mid_t.getImageData(0,0,imgWidth_pdcr_mid_t,imgHeight_pdcr_mid_t);
      datosPrim_pdcr_mid_t = datosimagen.data;
      ctx_pdcr_mid_t.lineWidth = "3";
      pintar_2();

      img_pdcr_mid_t.onmouseup = function(event){
        var torque;
        // console.log(torques_BB);
        // console.log(torques_BB['PDC-RMID']);
        let keys_pdcr_mid_t = Object.keys(torques_BB['PDC-RMID']);
        // console.log("KEYS DE PDC-RMID: ",keys_pdcr_mid_t);
        var x = event.pageX;
        var y = event.pageY;
        var coor = "X coords: " + x + ", Y coords: " + y;
        // console.log(coor);
        var X = document.getElementById("pdcr_mid_image_t_canvas").getBoundingClientRect();
        pixelx=x-window.scrollX-X.left
        pixely=y-window.scrollY-X.top
        // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

        for(i=0;i<keys_pdcr_mid_t.length;i++){
          // console.log("Key Actual",keys_pdcr_mid_t[i])
          if(pixelx>=torques_BB['PDC-RMID'][keys_pdcr_mid_t[i]][0][0] && pixelx<=torques_BB['PDC-RMID'][keys_pdcr_mid_t[i]][1][0] && pixely>=torques_BB['PDC-RMID'][keys_pdcr_mid_t[i]][0][1] && pixely<=torques_BB['PDC-RMID'][keys_pdcr_mid_t[i]][1][1]){
            element=keys_pdcr_mid_t[i]
            torques_value["PDC-RMID"][element] = true
            console.log("Torque Value Final: ",torques_value);
            torque = element;

            if (pdcr_t_mid_array.length!=0){
              if(pdcr_t_mid_array.indexOf(element)!=-1){
                torques_value["PDC-RMID"][element] = false;
                pdcr_t_mid_array.splice(pdcr_t_mid_array.indexOf(element),1)
                restaurar_pdcr_mid_t(ctx_pdcr_mid_t,img_pdcr_mid_t);
                pintar_2()
              }
              else{
                pdcr_t_mid_array.push(element)
                pintar()
              }
            }
            else{
              pdcr_t_mid_array.push(element)
              pintar()
            }
            // console.log("LEYENDO ARRAY 2: ",pdcr_t_mid_array);
          }
        }
        console.log("TORQUE: ",torque);
      }

      function pintar(){
        // console.log("pdcr_t_mid_array: ",pdcr_t_mid_array)
        let cavidad = pdcr_t_mid_array[pdcr_t_mid_array.length-1];
        // console.log("CAVIDAD : ",cavidad);
        let torqueColocado = torques_BB["PDC-RMID"][cavidad];
        
        let cavidadx = torques_BB["PDC-RMID"][cavidad][0][0];
        let cavidady = torques_BB["PDC-RMID"][cavidad][0][1];
        let cavidadw = torques_BB["PDC-RMID"][cavidad][1][0];
        let cavidadh = torques_BB["PDC-RMID"][cavidad][1][1];
        // console.log(cavidadx)
        // console.log(cavidady)
        // console.log(cavidadw)
        // console.log(cavidadh)
        getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
        ctx_pdcr_mid_t.beginPath();
        ctx_pdcr_mid_t.strokeStyle = color_style;
        ctx_pdcr_mid_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);
      }

      function pintar_2(){
        for (var i = 0; i < pdcr_t_mid_array.length; i++) {
          pdcr_t_mid_array[i]
          let cavidad = pdcr_t_mid_array[i];
          // console.log("Cavidad",cavidad);
          // console.log("pdcr_t_mid_array[i] Posicion desde torques value: ",torques_value["PDC-RMID"][pdcr_t_mid_array[i]])
          let torqueColocado = torques_BB["PDC-RMID"][cavidad];
          let cavidadx = torques_BB["PDC-RMID"][cavidad][0][0];
          let cavidady = torques_BB["PDC-RMID"][cavidad][0][1];
          let cavidadw = torques_BB["PDC-RMID"][cavidad][1][0];
          let cavidadh = torques_BB["PDC-RMID"][cavidad][1][1];
          // console.log(cavidadx)
          // console.log(cavidady)
          // console.log(cavidadw)
          // console.log(cavidadh)
          getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
          ctx_pdcr_mid_t.beginPath();
          ctx_pdcr_mid_t.strokeStyle = color_style;
          ctx_pdcr_mid_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);              
        }
      }
    }
  }
}
function restaurar_pdcr_mid_t(ctx_pdcr_mid_t,img_pdcr_mid_t){
  var datosimagen = ctx_pdcr_mid_t.getImageData(0,0,imgWidth_pdcr_mid_t,imgHeight_pdcr_mid_t);
  var datos = datosimagen.data;
  for (var i = 0; i < datos.length; i++) {
    datos[i] = datosPrim_pdcr_mid_t[i];
    datos[i+1] = datosPrim_pdcr_mid_t[i+1];
    datos[i+2] = datosPrim_pdcr_mid_t[i+2];
  }
  ctx_pdcr_mid_t.putImageData(datosimagen,0,0);
}
/////////// PDC-RS TORQUES ///////////
function cargar_imagen_pdcr_small_t(){
  if (img_pdcr_small_t.getContext) {
    var ctx_pdcr_small_t = img_pdcr_small_t.getContext("2d");
    var img = new Image();
    img.src = "static/content/cajas/interior/pdcr2_small/pdcr2_small.jpg";
    img.onload = function(){
      imgWidth_pdcr_small_t = this.width;
      imgHeight_pdcr_small_t = this.height;
      img_pdcr_small_t.width = imgWidth_pdcr_small_t;
      img_pdcr_small_t.height = imgHeight_pdcr_small_t;
      ctx_pdcr_small_t.drawImage(this,0,0,imgWidth_pdcr_small_t,imgHeight_pdcr_small_t);
      var datosimagen = ctx_pdcr_small_t.getImageData(0,0,imgWidth_pdcr_small_t,imgHeight_pdcr_small_t);
      datosPrim_pdcr_small_t = datosimagen.data;
      ctx_pdcr_small_t.lineWidth = "3";
      pintar_2();

      img_pdcr_small_t.onmouseup = function(event){
        var torque;
        // console.log(torques_BB);
        // console.log(torques_BB['PDC-RS']);
        let keys_pdcr_small_t = Object.keys(torques_BB['PDC-RS']);
        // console.log("KEYS DE PDC-RS: ",keys_pdcr_small_t);
        var x = event.pageX;
        var y = event.pageY;
        var coor = "X coords: " + x + ", Y coords: " + y;
        // console.log(coor);
        var X = document.getElementById("pdcr_small_image_t_canvas").getBoundingClientRect();
        pixelx=x-window.scrollX-X.left
        pixely=y-window.scrollY-X.top
        // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

        for(i=0;i<keys_pdcr_small_t.length;i++){
          // console.log("Key Actual",keys_pdcr_small_t[i])
          if(pixelx>=torques_BB['PDC-RS'][keys_pdcr_small_t[i]][0][0] && pixelx<=torques_BB['PDC-RS'][keys_pdcr_small_t[i]][1][0] && pixely>=torques_BB['PDC-RS'][keys_pdcr_small_t[i]][0][1] && pixely<=torques_BB['PDC-RS'][keys_pdcr_small_t[i]][1][1]){
            element=keys_pdcr_small_t[i]
            torques_value["PDC-RS"][element] = true
            console.log("Torque Value Final: ",torques_value);
            torque = element;

            if (pdcr_t_small_array.length!=0){
              if(pdcr_t_small_array.indexOf(element)!=-1){
                torques_value["PDC-RS"][element] = false;
                pdcr_t_small_array.splice(pdcr_t_small_array.indexOf(element),1)
                restaurar_pdcr_small_t(ctx_pdcr_small_t,img_pdcr_small_t);
                pintar_2()
              }
              else{
                pdcr_t_small_array.push(element)
                pintar()
              }
            }
            else{
              pdcr_t_small_array.push(element)
              pintar()
            }
            // console.log("LEYENDO ARRAY 2: ",pdcr_t_small_array);
          }
        }
        console.log("TORQUE: ",torque);
      }

      function pintar(){
        // console.log("pdcr_t_small_array: ",pdcr_t_small_array)
        let cavidad = pdcr_t_small_array[pdcr_t_small_array.length-1];
        // console.log("CAVIDAD : ",cavidad);
        let torqueColocado = torques_BB["PDC-RS"][cavidad];
        
        let cavidadx = torques_BB["PDC-RS"][cavidad][0][0];
        let cavidady = torques_BB["PDC-RS"][cavidad][0][1];
        let cavidadw = torques_BB["PDC-RS"][cavidad][1][0];
        let cavidadh = torques_BB["PDC-RS"][cavidad][1][1];
        // console.log(cavidadx)
        // console.log(cavidady)
        // console.log(cavidadw)
        // console.log(cavidadh)
        getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
        ctx_pdcr_small_t.beginPath();
        ctx_pdcr_small_t.strokeStyle = color_style;
        ctx_pdcr_small_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);
      }

      function pintar_2(){
        for (var i = 0; i < pdcr_t_small_array.length; i++) {
          pdcr_t_small_array[i]
          let cavidad = pdcr_t_small_array[i];
          // console.log("Cavidad",cavidad);
          // console.log("pdcr_t_small_array[i] Posicion desde torques value: ",torques_value["PDC-RS"][pdcr_t_small_array[i]])
          let torqueColocado = torques_BB["PDC-RS"][cavidad];
          let cavidadx = torques_BB["PDC-RS"][cavidad][0][0];
          let cavidady = torques_BB["PDC-RS"][cavidad][0][1];
          let cavidadw = torques_BB["PDC-RS"][cavidad][1][0];
          let cavidadh = torques_BB["PDC-RS"][cavidad][1][1];
          // console.log(cavidadx)
          // console.log(cavidady)
          // console.log(cavidadw)
          // console.log(cavidadh)
          getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
          ctx_pdcr_small_t.beginPath();
          ctx_pdcr_small_t.strokeStyle = color_style;
          ctx_pdcr_small_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);              
        }
      }
    }
  }
}
function restaurar_pdcr_small_t(ctx_pdcr_small_t,img_pdcr_small_t){
  var datosimagen = ctx_pdcr_small_t.getImageData(0,0,imgWidth_pdcr_small_t,imgHeight_pdcr_small_t);
  var datos = datosimagen.data;
  for (var i = 0; i < datos.length; i++) {
    datos[i] = datosPrim_pdcr_small_t[i];
    datos[i+1] = datosPrim_pdcr_small_t[i+1];
    datos[i+2] = datosPrim_pdcr_small_t[i+2];
  }
  ctx_pdcr_small_t.putImageData(datosimagen,0,0);
}
/////////// BATTERY TORQUES ///////////
function cargar_imagen_bt_t(){
  if (img_bt_t.getContext) {
      var ctx_bt_t = img_bt_t.getContext("2d");
      var img = new Image();
      img.src = "static/content/cajas/interior/bt/bt.jpg";
      img.onload = function(){
          imgWidth_bt_t = this.width;
          imgHeight_bt_t = this.height;
          img_bt_t.width = imgWidth_bt_t;
          img_bt_t.height = imgHeight_bt_t;
          ctx_bt_t.drawImage(this,0,0,imgWidth_bt_t,imgHeight_bt_t);
          var datosimagen = ctx_bt_t.getImageData(0,0,imgWidth_bt_t,imgHeight_bt_t);
          datosPrim_bt_t = datosimagen.data;
          ctx_bt_t.lineWidth = "3";
          pintar_2();

          img_bt_t.onmouseup = function(event){
              var torque;
              // console.log(torques_BB);
              // console.log(torques_BB['BATTERY']);
              let keys_bt_t = Object.keys(torques_BB['BATTERY']);
              // console.log("KEYS DE BATTERY: ",keys_bt_t);
              var x = event.pageX;
              var y = event.pageY;
              var coor = "X coords: " + x + ", Y coords: " + y;
              // console.log(coor);
              var X = document.getElementById("bt_image_t_canvas").getBoundingClientRect();
              pixelx=x-window.scrollX-X.left
              pixely=y-window.scrollY-X.top
              // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

              for(i=0;i<keys_bt_t.length;i++){
                // console.log("Key Actual",keys_bt_t[i])
                  if(pixelx>=torques_BB['BATTERY'][keys_bt_t[i]][0][0] && pixelx<=torques_BB['BATTERY'][keys_bt_t[i]][1][0] && pixely>=torques_BB['BATTERY'][keys_bt_t[i]][0][1] && pixely<=torques_BB['BATTERY'][keys_bt_t[i]][1][1]){
                      element=keys_bt_t[i]
                      torques_value["BATTERY"][element] = true
                      console.log("Torque Value Final: ",torques_value);
                      torque = element;

                      if (bt_t_array.length!=0){
                          if(bt_t_array.indexOf(element)!=-1){
                              torques_value["BATTERY"][element] = false;
                              bt_t_array.splice(bt_t_array.indexOf(element),1)
                              restaurar_bt_t(ctx_bt_t,img_bt_t);
                              pintar_2()
                          }
                          else{
                              bt_t_array.push(element)
                              pintar()
                          }
                      }
                      else{
                          bt_t_array.push(element)
                          pintar()
                      }
                      // console.log("LEYENDO ARRAY 2: ",bt_t_array);
                  }
              }
              console.log("TORQUE: ",torque);
          }

          function pintar(){
            // console.log("bt_t_array: ",bt_t_array)
            let cavidad = bt_t_array[bt_t_array.length-1];
            // console.log("CAVIDAD : ",cavidad);
            let torqueColocado = torques_BB["BATTERY"][cavidad];
            let cavidadx = torques_BB["BATTERY"][cavidad][0][0];
            let cavidady = torques_BB["BATTERY"][cavidad][0][1];
            let cavidadw = torques_BB["BATTERY"][cavidad][1][0];
            let cavidadh = torques_BB["BATTERY"][cavidad][1][1];
            // console.log(cavidadx)
            // console.log(cavidady)
            // console.log(cavidadw)
            // console.log(cavidadh)
            getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
            ctx_bt_t.beginPath();
            ctx_bt_t.strokeStyle = color_style;
            ctx_bt_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);
          }

          function pintar_2(){
              for (var i = 0; i < bt_t_array.length; i++) {
                bt_t_array[i]
                let cavidad = bt_t_array[i];
                // console.log("Cavidad",cavidad);
                // console.log("bt_t_array[i] Posicion desde torques value: ",torques_value["BATTERY"][cavidad])
                let torqueColocado = torques_BB["BATTERY"][cavidad];
                let cavidadx = torques_BB["BATTERY"][cavidad][0][0];
                let cavidady = torques_BB["BATTERY"][cavidad][0][1];
                let cavidadw = torques_BB["BATTERY"][cavidad][1][0];
                let cavidadh = torques_BB["BATTERY"][cavidad][1][1];
                // console.log(cavidadx)
                // console.log(cavidady)
                // console.log(cavidadw)
                // console.log(cavidadh)
                getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
                ctx_bt_t.beginPath();
                ctx_bt_t.strokeStyle = color_style;
                ctx_bt_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);
              }
          }
      }
  }
}
function restaurar_bt_t(ctx_bt_t,img_bt_t){
  var datosimagen = ctx_bt_t.getImageData(0,0,imgWidth_bt_t,imgHeight_bt_t);
  var datos = datosimagen.data;
  for (var i = 0; i < datos.length; i++) {
      datos[i] = datosPrim_bt_t[i];
      datos[i+1] = datosPrim_bt_t[i+1];
      datos[i+2] = datosPrim_bt_t[i+2];
  }
  ctx_bt_t.putImageData(datosimagen,0,0);
}
/////////// BATTERY-2 TORQUES ///////////
function cargar_imagen_battery2_t(){
  if (img_battery2_t.getContext) {
      var ctx_battery2_t = img_battery2_t.getContext("2d");
      var img = new Image();
      img.src = "static/content/cajas/interior/BATTERY-2/BATTERY-2.jpg";
      img.onload = function(){
          imgWidth_battery2_t = this.width;
          imgHeight_battery2_t = this.height;
          img_battery2_t.width = imgWidth_battery2_t;
          img_battery2_t.height = imgHeight_battery2_t;
          ctx_battery2_t.drawImage(this,0,0,imgWidth_battery2_t,imgHeight_battery2_t);
          var datosimagen = ctx_battery2_t.getImageData(0,0,imgWidth_battery2_t,imgHeight_battery2_t);
          datosPrim_battery2_t = datosimagen.data;
          ctx_battery2_t.lineWidth = "3";
          pintar_2();

          img_battery2_t.onmouseup = function(event){
              var torque;
              // console.log(torques_BB);
              // console.log(torques_BB['BATTERY-2']);
              let keys_battery2_t = Object.keys(torques_BB['BATTERY-2']);
              // console.log("KEYS DE BATTERY-2: ",keys_battery2_t);
              var x = event.pageX;
              var y = event.pageY;
              var coor = "X coords: " + x + ", Y coords: " + y;
              // console.log(coor);
              var X = document.getElementById("battery-2_image_t_canvas").getBoundingClientRect();
              pixelx=x-window.scrollX-X.left
              pixely=y-window.scrollY-X.top
              // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

              for(i=0;i<keys_battery2_t.length;i++){
                // console.log("Key Actual",keys_battery2_t[i])
                  if(pixelx>=torques_BB['BATTERY-2'][keys_battery2_t[i]][0][0] && pixelx<=torques_BB['BATTERY-2'][keys_battery2_t[i]][1][0] && pixely>=torques_BB['BATTERY-2'][keys_battery2_t[i]][0][1] && pixely<=torques_BB['BATTERY-2'][keys_battery2_t[i]][1][1]){
                      element=keys_battery2_t[i]
                      torques_value["BATTERY-2"][element] = true
                      console.log("Torque Value Final: ",torques_value);
                      torque = element;

                      if (battery2_t_array.length!=0){
                          if(battery2_t_array.indexOf(element)!=-1){
                              torques_value["BATTERY-2"][element] = false;
                              battery2_t_array.splice(battery2_t_array.indexOf(element),1)
                              restaurar_battery2_t(ctx_battery2_t,img_battery2_t);
                              pintar_2()
                          }
                          else{
                              battery2_t_array.push(element)
                              pintar()
                          }
                      }
                      else{
                          battery2_t_array.push(element)
                          pintar()
                      }
                      // console.log("LEYENDO ARRAY 2: ",battery2_t_array);
                  }
              }
              console.log("TORQUE: ",torque);
          }

          function pintar(){
            // console.log("battery2_t_array: ",battery2_t_array)
            let cavidad = battery2_t_array[battery2_t_array.length-1];
            // console.log("CAVIDAD : ",cavidad);
            let torqueColocado = torques_BB["BATTERY-2"][cavidad];
            
            let cavidadx = torques_BB["BATTERY-2"][cavidad][0][0];
            let cavidady = torques_BB["BATTERY-2"][cavidad][0][1];
            let cavidadw = torques_BB["BATTERY-2"][cavidad][1][0];
            let cavidadh = torques_BB["BATTERY-2"][cavidad][1][1];
            // console.log(cavidadx)
            // console.log(cavidady)
            // console.log(cavidadw)
            // console.log(cavidadh)
            getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
            ctx_battery2_t.beginPath();
            ctx_battery2_t.strokeStyle = color_style;
            ctx_battery2_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);
          }

          function pintar_2(){
              for (var i = 0; i < battery2_t_array.length; i++) {
                battery2_t_array[i]
                let cavidad = battery2_t_array[i];
                // console.log("battery2_t_array[i]",cavidad);
                // console.log("battery2_t_array[i] Posicion desde torques value: ",torques_value["BATTERY-2"][cavidad])
                let torqueColocado = torques_BB["BATTERY-2"][cavidad];
                
                let cavidadx = torques_BB["BATTERY-2"][cavidad][0][0];
                let cavidady = torques_BB["BATTERY-2"][cavidad][0][1];
                let cavidadw = torques_BB["BATTERY-2"][cavidad][1][0];
                let cavidadh = torques_BB["BATTERY-2"][cavidad][1][1];
                // console.log(cavidadx)
                // console.log(cavidady)
                // console.log(cavidadw)
                // console.log(cavidadh)
                getDistance_torque(cavidadx,cavidady,cavidadw,cavidadh);
                ctx_battery2_t.beginPath();
                ctx_battery2_t.strokeStyle = color_style;
                ctx_battery2_t.strokeRect(cavidadx, cavidady,xDistance_torque,yDistance_torque);
              }
          }
      }
  }
}
function restaurar_battery2_t(ctx_battery2_t,img_battery2_t){
  var datosimagen = ctx_battery2_t.getImageData(0,0,imgWidth_battery2_t,imgHeight_battery2_t);
  var datos = datosimagen.data;
  for (var i = 0; i < datos.length; i++) {
      datos[i] = datosPrim_battery2_t[i];
      datos[i+1] = datosPrim_battery2_t[i+1];
      datos[i+2] = datosPrim_battery2_t[i+2];
  }
  ctx_battery2_t.putImageData(datosimagen,0,0);
}



function add_module_torque(){
  if(pdcr_caja==""){
    document.getElementById("informacion").innerHTML = "No ha seleccionado ninguna de las opciones para la caja <span class='badge progress-bar-danger'>PDC-R</span>.";
    $('#mostrar').click();
  }
  else{
    if(historial==""){
      add_module_interior(); //funcion para insertar en interior nuevo formato
      //add_module_interior_1() // funcion para insertar en interior 1
      //add_module_interior_2() // funcion para insertar en interior 2
      //location.replace("index.html")
    }
    else{
      document.getElementById("informacion").innerHTML = "El nombre del Módulo que intenta agregar <span class='badge progress-bar-danger'>ya existe</span>.";
      $('#mostrar').click();
    }
  }
}

function add_module_interior(){
  modulo_db=document.getElementById('modulo_vision').value;
  if (modulo_db.length == 0) {
    document.getElementById("informacion").innerHTML = "Es necesario agregar un <span class='badge progress-bar-danger'>nombre</span> al módulo. Intente de nuevo.";
    $('#mostrar').click();
  }else{
    const newPost = {
      "DBEVENT": DBEVENT,
      "MODULO": modulo_db,
      "CAJA_1": {"PDC-P": torques_value["PDC-P"]},
      "CAJA_2": {"PDC-D": torques_value["PDC-D"]},
      "CAJA_3": {"MFB-P1": torques_value["MFB-P1"]},
      "CAJA_4": {"MFB-S": torques_value["MFB-S"]},
      "CAJA_5": {"MFB-P2": torques_value["MFB-P2"]},
      "CAJA_6": {},
      "CAJA_7": {"BATTERY": torques_value["BATTERY"]},
      "CAJA_8": {"BATTERY-2": torques_value["BATTERY-2"]},
      "CAJA_9": {"MFB-E": torques_value["MFB-E"]}
    }
    if (pdcr_caja_to_db == "PDCR") {
      newPost["CAJA_6"]["PDC-R"] = torques_value["PDC-R"]
    }else if(pdcr_caja_to_db == "PDCR-MID"){
      newPost["CAJA_6"]["PDC-RMID"] = torques_value["PDC-RMID"]
    }else{
      newPost["CAJA_6"]["PDC-RS"] = torques_value["PDC-RS"]
    }
    fetch(dominio+'/api/update/modulos_torques/'+edit_id,{
      method: 'POST',
      body: JSON.stringify(newPost),
      headers:{
        "Content-type": "application/json"
      }
    }).then(res=>res.json())
    .then(function (data){
      console.log(data);
      location.replace("edit_modulos.html")
    })
    .catch(function(err) {
      console.log(err);
    });
  }
}
function get_valid_pedido(){
	//console.log("get_pedido")
	historial=""
	// console.log(document.getElementById("modulo_vision").value)
	if(document.getElementById("modulo_vision").value!=""){
		// get the id
		endpoint=dominio+'/database/'+DBEVENT+'/modulos_torques/modulo/=/'+document.getElementById("modulo_vision").value+'/_/_/_'
		// console.log(endpoint)
		fetch(endpoint,{
			method: 'GET',
			headers:{
				"Content-type": "application/json"
			}
		}).then(res=>res.json())
		.then(function (data){
			// console.log(data);
      // console.log(data.MODULO);
      if (data.MODULO == sessionStorage.getItem('edit_torque') ) {
        historial="";
        alert_get_historial.innerHTML ="";
      } else{
       historial="si existe"
       alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El módulo "'+document.getElementById("modulo_vision").value+'" ya existe</div>'
     }
    //  console.log(historial)
   })
		.catch(function(err) {

			//console.log(err);
		});
		alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El módulo "'+document.getElementById("modulo_vision").value+'" no existe</div>'
		// console.log(historial)
	}
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[type=text]').forEach( node => node.addEventListener('keypress', e => {
    if(e.keyCode == 13) {
      e.preventDefault();
    }
  }))
});

$('#modal_info').find(".modal-header").css("background", "#f44336");

/////////////////// ***********ToolTips para TORQUES***********///////////////////
//-----------------------------  PDC-P ToolTip
var t1 = new ToolTip_pdcpt(img_pdcp_t, "This is a tool-tip", 150);
function ToolTip_pdcpt(img_pdcp_t, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_pdcp_t.parentNode,               // parent node for img_pdcp_t
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_pdcp_t
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_posicion = Object.keys(torques_BB['PDC-P']);
// console.log("KEYS DE PDC-P: ",keys_posicion);
let posicion;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_posicion.length;i++){
      let torque_tooltip;
      if (!visible && pos.x>=torques_BB['PDC-P'][keys_posicion[i]][0][0] && pos.x<=torques_BB['PDC-P'][keys_posicion[i]][1][0] && pos.y>=torques_BB['PDC-P'][keys_posicion[i]][0][1] && pos.y<=torques_BB['PDC-P'][keys_posicion[i]][1][1]) {
          posicion = keys_posicion[i];
          // set some initial styles, can be replaced by class-name etc.
          div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
          if (torques_value['PDC-P'][posicion] == false) {
              torque_tooltip = "false";
          }else{
              if (torques_value['PDC-P'][posicion] == 1 | torques_value['PDC-P'][posicion] == true){
                  torque_tooltip = "true"
              }
          }
          div.innerHTML = 'Posición: '+posicion+'<br>Torque: '+torque_tooltip;
          me.show(posAbs);                          // show tool-tip at this pos
      }
      else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_pdcp_t
function getPos(e) {
    var r = img_pdcp_t.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_pdcp_t.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//-----------------------------  PDC-D ToolTip
var t1 = new ToolTip_pdcdt(img_pdcd_t, "This is a tool-tip", 150);
function ToolTip_pdcdt(img_pdcd_t, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_pdcd_t.parentNode,               // parent node for img_pdcd_t
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_pdcd_t
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_posicion = Object.keys(torques_BB['PDC-D']);
// console.log("KEYS DE PDC-D: ",keys_posicion);
let posicion;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_posicion.length;i++){
        if (!visible && pos.x>=torques_BB['PDC-D'][keys_posicion[i]][0][0] && pos.x<=torques_BB['PDC-D'][keys_posicion[i]][1][0] && pos.y>=torques_BB['PDC-D'][keys_posicion[i]][0][1] && pos.y<=torques_BB['PDC-D'][keys_posicion[i]][1][1]) {
            posicion = keys_posicion[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (torques_value['PDC-D'][posicion] == false) {
                torque_tooltip = "false";
            }else{
                if (torques_value['PDC-D'][posicion] == 1 | torques_value['PDC-D'][posicion] == true){
                    torque_tooltip = "true"
                }
            }
            div.innerHTML = 'Posición: '+posicion+'<br>Torque: '+torque_tooltip
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_pdcd_t
function getPos(e) {
    var r = img_pdcd_t.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_pdcd_t.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//-----------------------------  MFB-P1 ToolTip
var t1 = new ToolTip_mfbp1(img_mfbp1_t, "This is a tool-tip", 150);
function ToolTip_mfbp1(img_mfbp1_t, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_mfbp1_t.parentNode,               // parent node for img_mfbp1_t
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_mfbp1_t
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_posicion = Object.keys(torques_BB['MFB-P1']);
// console.log("KEYS DE MFB-P1: ",keys_posicion);
let posicion;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_posicion.length;i++){
        if (!visible && pos.x>=torques_BB['MFB-P1'][keys_posicion[i]][0][0] && pos.x<=torques_BB['MFB-P1'][keys_posicion[i]][1][0] && pos.y>=torques_BB['MFB-P1'][keys_posicion[i]][0][1] && pos.y<=torques_BB['MFB-P1'][keys_posicion[i]][1][1]) {
            posicion = keys_posicion[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (torques_value['MFB-P1'][posicion] == false) {
                torque_tooltip = "false";
            }else{
                if (torques_value['MFB-P1'][posicion] == 1 | torques_value['MFB-P1'][posicion] == true){
                    torque_tooltip = "true"
                }
            }
            div.innerHTML = 'Posición: '+posicion+'<br>Torque: '+torque_tooltip
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_mfbp1_t
function getPos(e) {
    var r = img_mfbp1_t.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_mfbp1_t.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//-----------------------------  MFB-S ToolTip
var t1 = new ToolTip_mfbs(img_mfbs_t, "This is a tool-tip", 150);
function ToolTip_mfbs(img_mfbs_t, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_mfbs_t.parentNode,               // parent node for img_mfbs_t
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_mfbs_t
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_posicion = Object.keys(torques_BB['MFB-S']);
// console.log("KEYS DE MFB-S: ",keys_posicion);
let posicion;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_posicion.length;i++){
        if (!visible && pos.x>=torques_BB['MFB-S'][keys_posicion[i]][0][0] && pos.x<=torques_BB['MFB-S'][keys_posicion[i]][1][0] && pos.y>=torques_BB['MFB-S'][keys_posicion[i]][0][1] && pos.y<=torques_BB['MFB-S'][keys_posicion[i]][1][1]) {
            posicion = keys_posicion[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (torques_value['MFB-S'][posicion] == false) {
                torque_tooltip = "false";
            }else{
                if (torques_value['MFB-S'][posicion] == 1 | torques_value['MFB-S'][posicion] == true){
                    torque_tooltip = "true"
                }
            }
            div.innerHTML = 'Posición: '+posicion+'<br>Torque: '+torque_tooltip
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_mfbs_t
function getPos(e) {
    var r = img_mfbs_t.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_mfbs_t.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//-----------------------------  MFB-E ToolTip
var t1 = new ToolTip_mfbe(img_mfbe_t, "This is a tool-tip", 150);
function ToolTip_mfbe(img_mfbe_t, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_mfbe_t.parentNode,               // parent node for img_mfbe_t
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_mfbe_t
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_posicion = Object.keys(torques_BB['MFB-E']);
// console.log("KEYS DE MFB-E: ",keys_posicion);
let posicion;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_posicion.length;i++){
        if (!visible && pos.x>=torques_BB['MFB-E'][keys_posicion[i]][0][0] && pos.x<=torques_BB['MFB-E'][keys_posicion[i]][1][0] && pos.y>=torques_BB['MFB-E'][keys_posicion[i]][0][1] && pos.y<=torques_BB['MFB-E'][keys_posicion[i]][1][1]) {
            posicion = keys_posicion[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (torques_value['MFB-E'][posicion] == false) {
                torque_tooltip = "false";
            }else{
                if (torques_value['MFB-E'][posicion] == 1 | torques_value['MFB-E'][posicion] == true){
                    torque_tooltip = "true"
                }
            }
            div.innerHTML = 'Posición: '+posicion+'<br>Torque: '+torque_tooltip
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_mfbe_t
function getPos(e) {
    var r = img_mfbe_t.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_mfbe_t.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//-----------------------------  MFB-P2 ToolTip
var t1 = new ToolTip_mfbp2(img_mfbp2_t, "This is a tool-tip", 150);
function ToolTip_mfbp2(img_mfbp2_t, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_mfbp2_t.parentNode,               // parent node for img_mfbp2_t
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_mfbp2_t
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_posicion = Object.keys(torques_BB['MFB-P2']);
// console.log("KEYS DE MFB-P2: ",keys_posicion);
let posicion;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_posicion.length;i++){
        if (!visible && pos.x>=torques_BB['MFB-P2'][keys_posicion[i]][0][0] && pos.x<=torques_BB['MFB-P2'][keys_posicion[i]][1][0] && pos.y>=torques_BB['MFB-P2'][keys_posicion[i]][0][1] && pos.y<=torques_BB['MFB-P2'][keys_posicion[i]][1][1]) {
            posicion = keys_posicion[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (torques_value['MFB-P2'][posicion] == false) {
                torque_tooltip = "false";
            }else{
                if (torques_value['MFB-P2'][posicion] == 1 | torques_value['MFB-P2'][posicion] == true){
                    torque_tooltip = "true"
                }
            }
            div.innerHTML = 'Posición: '+posicion+'<br>Torque: '+torque_tooltip
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_mfbp2_t
function getPos(e) {
    var r = img_mfbp2_t.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_mfbp2_t.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//-----------------------------  BATTERY ToolTip
var t1 = new ToolTip_bt(img_bt_t, "This is a tool-tip", 150);
function ToolTip_bt(img_bt_t, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_bt_t.parentNode,               // parent node for img_bt_t
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_bt_t
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_posicion = Object.keys(torques_BB['BATTERY']);
// console.log("KEYS DE BATTERY: ",keys_posicion);
let posicion;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_posicion.length;i++){
        if (!visible && pos.x>=torques_BB['BATTERY'][keys_posicion[i]][0][0] && pos.x<=torques_BB['BATTERY'][keys_posicion[i]][1][0] && pos.y>=torques_BB['BATTERY'][keys_posicion[i]][0][1] && pos.y<=torques_BB['BATTERY'][keys_posicion[i]][1][1]) {
            posicion = keys_posicion[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (torques_value['BATTERY'][posicion] == false) {
                torque_tooltip = "false";
            }else{
                if (torques_value['BATTERY'][posicion] == 1 | torques_value['BATTERY'][posicion] == true){
                    torque_tooltip = "true"
                }
            }
            div.innerHTML = 'Posición: '+posicion+'<br>Torque: '+torque_tooltip
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_bt_t
function getPos(e) {
    var r = img_bt_t.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_bt_t.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//-----------------------------  BATTERY-2 ToolTip
var t1 = new ToolTip_battery2(img_battery2_t, "This is a tool-tip", 150);
function ToolTip_battery2(img_battery2_t, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_battery2_t.parentNode,               // parent node for img_battery2_t
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_battery2_t
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_posicion = Object.keys(torques_BB['BATTERY-2']);
// console.log("KEYS DE BATTERY-2: ",keys_posicion);
let posicion;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_posicion.length;i++){
        if (!visible && pos.x>=torques_BB['BATTERY-2'][keys_posicion[i]][0][0] && pos.x<=torques_BB['BATTERY-2'][keys_posicion[i]][1][0] && pos.y>=torques_BB['BATTERY-2'][keys_posicion[i]][0][1] && pos.y<=torques_BB['BATTERY-2'][keys_posicion[i]][1][1]) {
            posicion = keys_posicion[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (torques_value['BATTERY-2'][posicion] == false) {
                torque_tooltip = "false";
            }else{
                if (torques_value['BATTERY-2'][posicion] == 1 | torques_value['BATTERY-2'][posicion] == true){
                    torque_tooltip = "true"
                }
            }
            div.innerHTML = 'Posición: '+posicion+'<br>Torque: '+torque_tooltip
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_battery2_t
function getPos(e) {
    var r = img_battery2_t.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_battery2_t.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//-----------------------------  PDC-RMID ToolTip
function ToolTip_pdcr_1t(img_pdcr_mid_t, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_pdcr_mid_t.parentNode,               // parent node for img_pdcr_mid_t
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_pdcr_mid_t
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_posicion = Object.keys(torques_BB['PDC-RMID']);
// console.log("KEYS DE PDC-RMID: ",keys_posicion);
let posicion;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_posicion.length;i++){
        if (!visible && pos.x>=torques_BB['PDC-RMID'][keys_posicion[i]][0][0] && pos.x<=torques_BB['PDC-RMID'][keys_posicion[i]][1][0] && pos.y>=torques_BB['PDC-RMID'][keys_posicion[i]][0][1] && pos.y<=torques_BB['PDC-RMID'][keys_posicion[i]][1][1]) {
            posicion = keys_posicion[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (torques_value['PDC-RMID'][posicion] == false) {
                torque_tooltip = "false";
            }else{
                if (torques_value['PDC-RMID'][posicion] == 1 | torques_value['PDC-RMID'][posicion] == true){
                    torque_tooltip = "true"
                }
            }
            div.innerHTML = 'Posición: '+posicion+'<br>Torque: '+torque_tooltip
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_pdcr_mid_t
function getPos(e) {
    var r = img_pdcr_mid_t.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_pdcr_mid_t.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//-----------------------------  PDC-RS ToolTip
function ToolTip_pdcrs_1t(img_pdcr_small_t, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_pdcr_small_t.parentNode,               // parent node for img_pdcr_small_t
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_pdcr_small_t
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_posicion = Object.keys(torques_BB['PDC-RS']);
// console.log("KEYS DE PDC-RS: ",keys_posicion);
let posicion;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_posicion.length;i++){
        if (!visible && pos.x>=torques_BB['PDC-RS'][keys_posicion[i]][0][0] && pos.x<=torques_BB['PDC-RS'][keys_posicion[i]][1][0] && pos.y>=torques_BB['PDC-RS'][keys_posicion[i]][0][1] && pos.y<=torques_BB['PDC-RS'][keys_posicion[i]][1][1]) {
            posicion = keys_posicion[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (torques_value['PDC-RS'][posicion] == false) {
                torque_tooltip = "false";
            }else{
                if (torques_value['PDC-RS'][posicion] == 1 | torques_value['PDC-RS'][posicion] == true){
                    torque_tooltip = "true"
                }
            }
            div.innerHTML = 'Posición: '+posicion+'<br>Torque: '+torque_tooltip
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_pdcr_small_t
function getPos(e) {
    var r = img_pdcr_small_t.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_pdcr_small_t.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//-----------------------------  PDC-R ToolTip
function ToolTip_pdcr_t(img_pdcr_t, text, width) {
    var me = this,                                // self-reference for event handlers
    div = document.createElement("div"),      // the tool-tip div
    parent = img_pdcr_t.parentNode,               // parent node for img_pdcr_t
    visible = false;                          // current status
    // show the tool-tip
    this.show = function(pos) {
        if (!visible) {                             // ignore if already shown (or reset time)
            visible = true;                           // lock so it's only shown once
            setDivPos(pos);                           // set position
            parent.appendChild(div);                // add to parent of img_pdcr_t
        }
    }
    // hide the tool-tip
    function hide() {
        visible = false;                            // hide it after timeout
        if (parent.contains(div)) {
            parent.removeChild(div);                    // remove from DOM
        }
    }
    
    let keys_posicion = Object.keys(torques_BB['PDC-R']);
    // console.log("KEYS DE PDC-R: ",keys_posicion);
    let posicion;
  
    // check mouse position, add limits as wanted... just for example:
    function check(e) {
        if(parent.contains(div)){
            hide();
        }
        var pos = getPos(e),
            posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
        for(i=0;i<keys_posicion.length;i++){
            if (!visible && pos.x>=torques_BB['PDC-R'][keys_posicion[i]][0][0] && pos.x<=torques_BB['PDC-R'][keys_posicion[i]][1][0] && pos.y>=torques_BB['PDC-R'][keys_posicion[i]][0][1] && pos.y<=torques_BB['PDC-R'][keys_posicion[i]][1][1]) {
                posicion = keys_posicion[i];
                // set some initial styles, can be replaced by class-name etc.
                div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
                if (torques_value['PDC-R'][posicion] == false) {
                    torque_tooltip = "false";
                }else{
                    if (torques_value['PDC-R'][posicion] == 1 | torques_value['PDC-R'][posicion] == true){
                        torque_tooltip = "true"
                    }
                }
                div.innerHTML = 'Posición: '+posicion+'<br>Torque: '+torque_tooltip
                me.show(posAbs);                          // show tool-tip at this pos
            }
            else setDivPos(posAbs);
        }// otherwise, update position
    }
    // get mouse position relative to img_pdcr_t
    function getPos(e) {
        var r = img_pdcr_t.getBoundingClientRect();
        return {x: e.clientX - r.left, y: e.clientY - r.top}
    }
    // update and adjust div position if needed (anchor to a different corner etc.)
    function setDivPos(pos) {
        if (visible){
        if (pos.x < 0) pos.x = 0;
        if (pos.y < 0) pos.y = 0;
        // other bound checks here
        div.style.left = pos.x + "px";
        div.style.top = pos.y + "px";
        }
    }
    // we need to use shared event handlers:
    img_pdcr_t.addEventListener("mousemove", check);
    $(document).on('wheel', function(){ 
        hide();
    });
}