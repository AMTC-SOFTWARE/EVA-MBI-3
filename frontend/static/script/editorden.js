let DBEVENT = sessionStorage.getItem('DBEVENT');
console.log("DB EVENT ACTUAL: ",DBEVENT);
let modif_name_1 = DBEVENT.replace(/_/g, '-') // Se reemplazan los "_" encontrados en el nombre del Evento por "-" 
let modif_name_2 = modif_name_1.replace("evento-", '') // Se elimina el string inicial "evento-" del nombre
let eventoFinal = modif_name_2.toUpperCase();
document.getElementById('tituloEvento').innerText = eventoFinal;
var mv=[];
var mt=[];
var pedido;
var refArray; //Guardado de Valores de Pedido para dara la tarea de borrarlos en el evento
var id;
var pedidoeditar;
var pedido_editar_final;
var historial="";
var ref="";
var activo;
function cerrar(){
  sessionStorage.removeItem('gafet');
  sessionStorage.removeItem('tipo');
  location.href = "index.html";
}

function cleardiv(){
  document.getElementById("tabla").innerHTML = "";
}

function cargartabla(){
  cleardiv();
  fetch(dominio+"/api/get/"+DBEVENT+"/pedidos/ID/>/0/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    console.log(data);
    if (data.items == 0) {
      console.log("Sin registro alguno");
      document.getElementById("tabla").innerHTML = "<label>Tabla sin registros.</label>";
    }else{
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("ID"),1);
      colnames.splice(colnames.indexOf("PEDIDO"),1);
      colnames.splice(colnames.indexOf("ACTIVE"),1,"ID","PEDIDO","ACTIVE");
      console.log("Columnas: ", colnames);
      var filas = data[colnames[1]].length;
      // console.log("Num de Registros:",filas);
      // console.log(data[colnames[7]]);

      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("tabla");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.classList.add('nowrap');
      table.cellSpacing="0";
      table.width="100%";
      table.border = '2';
      table.appendChild(Encabezados);
      table.appendChild(tableBody);
      tableBody.align="center";
      //FIN DE CREACIÓN DE TABLA

      //ENCABEZADOS DE LA TABLA
      var tr = document.createElement('TR');
      Encabezados.appendChild(tr);
      for (i = 0; i < colnames.length; i++) {
        var titulo = colnames[i].replace("_"," ")
        var th = document.createElement('TH')
        th.width = '100';
        th.appendChild(document.createTextNode(titulo));
        tr.appendChild(th).style.backgroundColor="#0DBED6";
      }
      var th = document.createElement('TH')
      th.width = '100';
      th.appendChild(document.createTextNode('Operación'));
      tr.appendChild(th).style.backgroundColor="#0DBED6";
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        //// Instrucciones para saber si el registro pertenece a Interior o Motor ////
        var filasQR = JSON.parse(data["QR_BOXES"][i]);
        // console.log(filasQR);
        var nombresQR = Object.keys(filasQR);
        // console.log("Cajas", nombresQR);
        // console.log(nombresQR.includes('PDC-D'));
        if (nombresQR.includes('PDC-D') == true) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            switch (colnames[j]){
              case "PEDIDO":
              var selector  = document.createElement('input');
              const ref = data[colnames[j]][i];
              const pedidoId = data['ID'][i]; 
              selector.setAttribute('type', 'checkbox');
              selector.id = `${pedidoId}`  
              selector.style.marginLeft = '0.5rem'
              selector.value = `{"ID":"${pedidoId}", "VALOR": 1}`;
              selector.setAttribute('onclick', 'desicion(this)')       
              td.appendChild(selector);
              td.appendChild(document.createTextNode(' ' + ref));
              break
              case "MODULOS_ALTURA":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-file-alt");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-altura');
              boton.style.width="60px"
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
              case "MODULOS_TORQUE":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-file-alt");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-torque');
              boton.style.width="60px"
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
              case "MODULOS_VISION":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-file-alt");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-vision');
              boton.style.width="60px"
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
              case "QR_BOXES":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-qrcode");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-qr');
              boton.style.width="60px"
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
              default:
              td.appendChild(document.createTextNode(data[colnames[j]][i]));
            }
            tr.appendChild(td)
          }
          var td = document.createElement('TD');
          var boton = document.createElement('button');
          var eliminar = document.createElement('i');
          eliminar.classList.add("fas");
          eliminar.classList.add("fa-trash");
          boton.title = "Eliminar";
          boton.classList.add('btn');
          boton.classList.add('btn-danger');
          boton.classList.add('btn-delete');
          var botondos = document.createElement('button');
          var modificar = document.createElement('i');
          modificar.classList.add("fas");
          modificar.classList.add("fa-edit");
          botondos.title = 'Modificar';
          botondos.classList.add('btn');
          botondos.classList.add('btn-primary');
          botondos.classList.add('btn-edit');
          var botontres = document.createElement('button');
          var ver = document.createElement('i');
          ver.classList.add("fas");
          ver.classList.add("fa-eye");
          botontres.title = 'Ver Modularidad';
          botontres.classList.add('btn');
          botontres.classList.add('btn-warning');
          botontres.classList.add('btn-ver');
          boton.appendChild(eliminar);
          botondos.appendChild(modificar);
          botontres.appendChild(ver);
          td.appendChild(boton);
          td.append(" ");
          td.appendChild(botondos);
          td.append(" ");
          td.appendChild(botontres);
          tr.appendChild(td)
          tableBody.appendChild(tr);
        }
      }
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable({
          responsive:true,
          order: [[0, 'desc']]
        });
      });
    }
 })
}

$(document).on('click','.btn-ver-altura', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  let headerString = header_info.replace(/ /g,"_");
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/pedidos/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar_qr').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/pedidos/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      document.getElementById("informacion").innerHTML = "";
      // console.log(data);
      // console.log(data[header_info]);
      let re = /0/g;
      dataParse = JSON.parse(data[headerString]);
      // console.log("Convertido a JSON: ",dataParse)
      dataKeys = Object.keys(dataParse)
      // console.log("dataKeys: ",dataKeys)
      let div = document.createElement("div");
      for (let i = 0; i < dataKeys.length; i++) {
         let nav = document.createElement("nav");
         let caja = dataKeys[i];
         nav.id = "titulo-caja"
         nav.innerHTML = "<b>"+caja+"</b>";
         div.appendChild(nav);

        // console.log("Aqui esta la CAJA:",caja);
         let cavidades = dataParse[caja];
        //console.log("Aquí en object: ",cavidades)
        
         let get_cavidad = Object.getOwnPropertyNames(cavidades);
         
         let grid = document.createElement("div");
         grid.classList = "grid-box-1fr";
         nav.appendChild(grid);
         for (let j = 0; j < get_cavidad.length-1 ; j++) {

          let obj_cavidad = get_cavidad[j];
          //console.log ("cavidad",obj_cavidad);
          //console.log ("valor",cavidades[obj_cavidad]);
          let span = document.createElement("span");
          span.classlist = "caja-valor";
          let valores = JSON.stringify(cavidades[obj_cavidad]);
          //console.log("Aqui en string: ",valores)
          let boxValue = valores.replace(re, 'N/A');

          span.innerHTML = `<p>${valores} </p>`;
          grid.appendChild(span);
         }
      }
     
      document.getElementById("informacion").appendChild(div)
      $('#mostrar_qr').click();
    })
  }
});
$(document).on('click','.btn-ver-torque', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  let headerString = header_info.replace(/ /g,"_");
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/pedidos/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar_qr').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/pedidos/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      document.getElementById("informacion").innerHTML = "";
      // console.log(data);
      // console.log(data[header_info]);
      let re = /0/g;
      dataParse = JSON.parse(data[headerString]);
      // console.log("Convertido a JSON: ",dataParse)
      dataKeys = Object.keys(dataParse)
      // console.log("dataKeys: ",dataKeys)
      let div = document.createElement("div");
      for (let i = 0; i < dataKeys.length; i++) {
         let nav = document.createElement("nav");
         let caja = dataKeys[i];
         nav.id = "titulo-caja"
         nav.innerHTML = "<b>"+caja+"</b>";
         div.appendChild(nav);

        // console.log("Aqui esta la CAJA:",caja);
         let cavidades = dataParse[caja];
        //console.log("Aquí en object: ",cavidades)
        
         let get_cavidad = Object.getOwnPropertyNames(cavidades);
         
         let grid = document.createElement("div");
         grid.classList = "grid-box-1fr";
         nav.appendChild(grid);
         for (let j = 0; j < get_cavidad.length-1 ; j++) {

          let obj_cavidad = get_cavidad[j];
          //console.log ("cavidad",obj_cavidad);
          //console.log ("valor",cavidades[obj_cavidad]);
          let span = document.createElement("span");
          span.classlist = "caja-valor";
          let valores = JSON.stringify(cavidades[obj_cavidad]);
          //console.log("Aqui en string: ",valores)
          let boxValue = valores.replace(re, 'N/A');

          span.innerHTML = `<p>${valores} </p>`;
          grid.appendChild(span);
         }
      }
     
      document.getElementById("informacion").appendChild(div)
      $('#mostrar_qr').click();
    })
  }
});
$(document).on('click','.btn-ver-vision', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  let headerString_responsive = id_info.replace(/ /g,"_");
    let headerString = header_info.replace(/ /g,"_");
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/pedidos/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      document.getElementById("informacion").innerHTML = "";
      // console.log(data);
      // console.log(data[header_info]);
      let re = /0/g;
      dataParse = JSON.parse(data[headerString_responsive]);
      // console.log("Convertido a JSON: ",dataParse)
      dataKeys = Object.keys(dataParse)
      // console.log("dataKeys: ",dataKeys)
      let div = document.createElement("div");
      for (let i = 0; i < dataKeys.length; i++) {
        let nav = document.createElement("nav");
        let caja = dataKeys[i];
        nav.id = "titulo-caja"
        nav.innerHTML = "<b>"+caja+"</b>";
        div.appendChild(nav);

      // console.log("Aqui esta la CAJA:",caja);
        let cavidades = dataParse[caja];
      //console.log("Aquí en object: ",cavidades)
      
        let get_cavidad = Object.getOwnPropertyNames(cavidades);
        
        let grid = document.createElement("div");
        grid.classList = "grid-box-1fr";
        nav.appendChild(grid);
        for (let j = 0; j < get_cavidad.length-1 ; j++) {

          let obj_cavidad = get_cavidad[j];
          //console.log ("cavidad",obj_cavidad);
          //console.log ("valor",cavidades[obj_cavidad]);
          let span = document.createElement("span");
          span.classlist = "caja-valor";
          let valores = JSON.stringify(cavidades[obj_cavidad]);
          //console.log("Aqui en string: ",valores)
          let boxValue = valores.replace(re, 'N/A');

          span.innerHTML = `<p>${valores} </p>`;
          grid.appendChild(span);
        }
      }
      document.getElementById("informacion").appendChild(div)
      $('#mostrar_qr').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/pedidos/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      document.getElementById("informacion").innerHTML = "";
      // console.log(data);
      // console.log(data[header_info]);
      let re = /0/g;
      dataParse = JSON.parse(data[headerString]);
      // console.log("Convertido a JSON: ",dataParse)
      dataKeys = Object.keys(dataParse)
      // console.log("dataKeys: ",dataKeys)
      let div = document.createElement("div");
      for (let i = 0; i < dataKeys.length; i++) {
      let nav = document.createElement("nav");
      let caja = dataKeys[i];
      nav.id = "titulo-caja"
      nav.innerHTML = "<b>"+caja+"</b>";
      div.appendChild(nav);

        // console.log("Aqui esta la CAJA:",caja);
        let cavidades = dataParse[caja];
        //console.log("Aquí en object: ",cavidades)
        
        let get_cavidad = Object.getOwnPropertyNames(cavidades);
        let grid = document.createElement("div");
        grid.classList = "grid-box-1fr";
        nav.appendChild(grid);
        for (let j = 0; j < get_cavidad.length-1 ; j++) {

          let obj_cavidad = get_cavidad[j];
          //console.log ("cavidad",obj_cavidad);
          //console.log ("valor",cavidades[obj_cavidad]);
          let span = document.createElement("span");
          span.classlist = "caja-valor";
          let valores = JSON.stringify(cavidades[obj_cavidad]);
          //console.log("Aqui en string: ",valores)
          let boxValue = valores.replace(re, 'N/A');

          span.innerHTML = `<p>${valores} </p>`;
          grid.appendChild(span);
        }
      }
      document.getElementById("informacion").appendChild(div)
      $('#mostrar_qr').click();
    })
  }
});
$(document).on('click','.btn-ver-qr', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  let headerString_responsive = id_info.replace(/ /g,"_");
    let headerString = header_info.replace(/ /g,"_");
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    
    fetch(dominio+"/api/get/"+DBEVENT+"/pedidos/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      document.getElementById("informacion").innerHTML = "";
      // console.log(data);
      // console.log(data[header_info]);
      let re = /0/g;
      dataParse = JSON.parse(data[headerString_responsive]);
      // console.log("Convertido a JSON: ",dataParse)
      dataKeys = Object.keys(dataParse)
      // console.log("dataKeys: ",dataKeys)
      let div = document.createElement("div");
      for (let i = 0; i < dataKeys.length; i++) {
         let nav = document.createElement("nav");
         let caja = dataKeys[i];
         nav.id = "titulo-caja"
         nav.innerHTML = "<b>"+caja+"</b>";
         div.appendChild(nav);

        // console.log("Aqui esta la CAJA:",caja);
         let cavidades = dataParse[caja];
        //console.log("Aquí en object: ",cavidades)
        
         let get_cavidad = Object.getOwnPropertyNames(cavidades);
         
         let grid = document.createElement("div");
         grid.classList = "grid-box-1fr";
         nav.appendChild(grid);
         for (let j = 0; j < get_cavidad.length-1 ; j++) {

          let obj_cavidad = get_cavidad[j];
          //console.log ("cavidad",obj_cavidad);
          //console.log ("valor",cavidades[obj_cavidad]);
          let span = document.createElement("span");
          span.classlist = "caja-valor";
          let valores = JSON.stringify(cavidades[obj_cavidad]);
          //console.log("Aqui en string: ",valores)
          let boxValue = valores.replace(re, 'N/A');

          span.innerHTML = `<p>${valores} </p>`;
          grid.appendChild(span);
         }
      }
     
      document.getElementById("informacion").appendChild(div)
      $('#mostrar_qr').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/pedidos/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      document.getElementById("informacion").innerHTML = "";
      // console.log(data);
      // console.log(data[header_info]);
      let re = /0/g;
      dataParse = JSON.parse(data[headerString]);
      // console.log("Convertido a JSON: ",dataParse)
      dataKeys = Object.keys(dataParse)
      // console.log("dataKeys: ",dataKeys)
      let div = document.createElement("div");
      for (let i = 0; i < dataKeys.length; i++) {
         let nav = document.createElement("nav");
         let caja = dataKeys[i];
         nav.id = "titulo-caja"
         nav.innerHTML = "<b>"+caja+"</b>";
         div.appendChild(nav);

        // console.log("Aqui esta la CAJA:",caja);
         let cavidades = dataParse[caja];
        //console.log("Aquí en object: ",cavidades)
        
         let get_cavidad = Object.getOwnPropertyNames(cavidades);
         
         let grid = document.createElement("div");
         grid.classList = "grid-box-1fr";
         nav.appendChild(grid);
         for (let j = 0; j < get_cavidad.length-1 ; j++) {

          let obj_cavidad = get_cavidad[j];
          //console.log ("cavidad",obj_cavidad);
          //console.log ("valor",cavidades[obj_cavidad]);
          let span = document.createElement("span");
          span.classlist = "caja-valor";
          let valores = JSON.stringify(cavidades[obj_cavidad]);
          //console.log("Aqui en string: ",valores)
          let boxValue = valores.replace(re, 'N/A');

          span.innerHTML = `<p>${valores} </p>`;
          grid.appendChild(span);
         }
      }
     
      document.getElementById("informacion").appendChild(div)
      $('#mostrar_qr').click();
    })
  }
});

$(document).on('click','.btn-delete', function(){
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  // var elim = $(this).parent().parent().children().first().text();
  var elim = header.parent().prev().find("td:first").text();
  console.log("ID a eliminar",elim);
  var opcion = confirm("¿Está seguro de que desea eliminar este registro?");
  if (opcion == true) {
    fetch(dominio+'/api/delete/'+DBEVENT+'/pedidos/'+elim,{
      method: 'POST'
    }).then(res=>res.json())
    .then(function (data){
      // console.log(data);
      console.log('Haz eliminado el registro')
      cargartabla();
    })
    .catch(function(err) {
      console.log(err);
    });
  } else {
    console.log('Haz cancelado la acción')
  }
});

$(document).on('click','.btn-edit', function(){
  mv=[];
  mt=[];
  alert_get_historial.innerHTML ="";
  // var edit = $(this).parent().parent().children().next().next().next().next().next().next().first().text();
  // var edit_id = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  var edit = header.parent().prev().find("td:first").next().text();
  var edit_id = header.parent().prev().find("td:first").text();
  console.log("Nombre del Pedido: ", edit);
  document.getElementById('pedidoedit').innerHTML = edit;
  document.getElementById("pedidoeditar").value = edit;
  $('#mostrar').click();
  pedido = edit;
  console.log("ID: ",edit_id);
  id = edit_id;
  fetch(dominio+"/api/get/"+DBEVENT+"/pedidos/ID/=/"+edit_id+"/_/=/_")
  .then(res=>res.json())
  .then(function (data){
    console.log(data);
    //console.log(data.ACTIVE);
    activo = data.ACTIVE;
    if (data.ACTIVE == 1) {
      document.getElementById("activo").checked = true;
    }
    /////////// QR CÓDIGOS ////////////////
    var dataQR = JSON.parse(data.QR_BOXES);
    // console.log("DataQR: ",dataQR);
    var keysQR = Object.keys(dataQR);
    // console.log("Cajas", keysQR);
    // console.log("Cantidad de Cajas", keysQR.length);
    for (var i = 0; i < keysQR.length; i++) {
      keysQR[i]
      // console.log(`Por aqui paso `,i, keysQR[i]);
      // console.log("esto pasa en el for", keysQR[i]);
      document.getElementById(keysQR[i]).value = dataQR[keysQR[i]][0];
      document.getElementById("myCheck"+keysQR[i]).checked = dataQR[keysQR[i]][1];
      if (dataQR[keysQR[i]][1] == true) {
        document.getElementById(keysQR[i]).disabled = false;
      }
    }
    ///////////// MÓDULOS DE VISIÓN ////////////////
    // console.log("LOS MODULOS DE VISIÓN: ",data.MODULOS_VISION);
    var datavision = JSON.parse(data.MODULOS_VISION);
    // console.log(datavision);
    var keysvision = Object.keys(datavision);
    // console.log(keysvision);
    for (var i = 0; i < keysvision.length; i++) {
      keysvision[i]
      // console.log("Esto es lo que pasa en el for de datavision", keysvision[i]);
      // console.log(datavision[keysvision[i]]);
      for (var j = 0; j < datavision[keysvision[i]].length; j++) {
        datavision[keysvision[i]][j];
        // console.log("Módulo a agregar al array de mv", datavision[keysvision[i]][j]);
        mv.push(datavision[keysvision[i]][j])
        // console.log("Este es el valor del array de mv",mv)
        document.getElementById('arreglomv').innerHTML= "Módulos de visión agregados:   "+mv ;
      }
    }
    ///////////// MÓDULOS DE TORQUE ////////////////
    // console.log("LOS MODULOS DE TORQUE: ",data.MODULOS_TORQUE);
    var datatorque = JSON.parse(data.MODULOS_TORQUE);
    // console.log(datatorque);
    var keystorque = Object.keys(datatorque);
    // console.log(keystorque);
    for (var i = 0; i < keystorque.length; i++) {
      keystorque[i]
      // console.log("Esto es lo que pasa en el for de datatorque", keystorque[i]);
      // console.log(datatorque[keystorque[i]]);
      for (var j = 0; j < datatorque[keystorque[i]].length; j++) {
        datatorque[keystorque[i]][j];
        // console.log("Módulo a agregar al array de mt", datatorque[keystorque[i]][j]);
        mt.push(datatorque[keystorque[i]][j])
        // console.log("Este es el valor del array de mt",mt)
        document.getElementById('arreglomt').innerHTML= "Módulos de Torque agregados:   "+mt ;
      }
    }
  })
  .catch(function(err) {
    console.log(err);
  });

  mostrar_modulos_vision();
  mostrar_modulos_torque();
});

$(document).on('click','.btn-ver', function(){
  var header = $(this).closest("td");

  var edit_id = header.parent().prev().find("td:first").text();
  var edit= header.parent().prev().find("td:first").next().text();
  id = edit_id;
  console.log("Nombre de la Modularidad: ", edit);
  console.log("Id de Modularidad: ",edit_id);
  sessionStorage.setItem("modularidad", edit);
  location.href = "preview.html";
});

///////////// Función que se ejecuta al oprimir "Guardar" en la ventana de edición ///////////////////////
function guardar_edit(){
  var mod_torques = mt;
  var mod_fusibles = mv;
  var mod_alturas = mv;

  var mod_t=mod_torques;
  var mod_f=mod_fusibles;
  var mod_a=mod_alturas;

  // console.log(mod_t,mod_f,mod_a);
  let codigosqr = document.getElementsByClassName("qr");
  let checkbox = document.getElementsByClassName("myCheck");
  qr_dict = {}      
  for (var i = 0; i < codigosqr.length; i++) {    
    qr_dict[codigosqr[i].id] = [codigosqr[i].value, checkbox[i].checked];

  }   
  // console.log (qr_dict);
  const newPost = {
    "DBEVENT": DBEVENT,
    "PEDIDO": pedido_editar_final,
    "MODULOS_VISION": {"INTERIOR": mod_f},
    "MODULOS_TORQUE": {"INTERIOR": mod_t},
    "MODULOS_ALTURA": {"INTERIOR": mod_a},
    "QR_BOXES": qr_dict,
    "ACTIVE":activo,
    "DATETIME": "AUTO"
  }
  // console.log(newPost);
  if (mod_torques.length===0 || mod_fusibles.length===0 || mod_alturas.length===0) {
    alert("Necesita llenar todos los campos correspondientes.");
  } else{
    if (ref =="no valido") {
      alert('Para insertar un número de pedido correctamente asegúrese de agregar la referencia "ILX", "IRX" o "Z" al inicio.');
    }else{
      if (historial=="") {
        fetch(dominio+'/api/update/pedidos/'+id,{
          method: 'POST',
          body: JSON.stringify(newPost),
          headers:{
            "Content-type": "application/json"
          }
        }).then(res=>res.json())
        .then(function (data){
          console.log(data);
          location.href = "edit.html";
        })
      } else{
        alert("El número de parte ya existe");
      }
    }
  }
}

////////// Habilitar o Deshabilitar Campos de texto en función del Checkbox ///////////
function comprobarpdcr(obj){   
  if (obj.checked){
    document.getElementById('PDC-R').value = "12239061602";
    document.getElementById('PDC-RMID').value = "";
    document.getElementById('PDC-RS').value = "";
    document.getElementById('myCheckPDC-RMID').checked = false;
    document.getElementById('myCheckPDC-RS').checked = false;
  } else{
    document.getElementById('PDC-R').value = "";
  }     
}
function comprobarpdcrmid(obj){   
  if (obj.checked){
    document.getElementById('PDC-RMID').value = "12239061502";
    document.getElementById('PDC-R').value = "";
    document.getElementById('PDC-RS').value = "";
    document.getElementById('myCheckPDC-R').checked = false;
    document.getElementById('myCheckPDC-RS').checked = false;
  } else{
    document.getElementById('PDC-RMID').value = "";
  }     
}
function comprobarpdcrs(obj){   
  if (obj.checked){
    document.getElementById('PDC-RMID').value = "";
    document.getElementById('PDC-R').value = "";
    document.getElementById('PDC-RS').value = "12239061402";
    document.getElementById('myCheckPDC-R').checked = false;
    document.getElementById('myCheckPDC-RMID').checked = false;
  } else{
    document.getElementById('PDC-RS').value = "";
  }     
}
function comprobarpdcd(obj){   
  if (obj.checked){
    document.getElementById('PDC-D').value = "12239060402";
  } else{
    document.getElementById('PDC-D').value = "";
  }     
}
function comprobarpdcp(obj){   
  if (obj.checked){
    document.getElementById('PDC-P').value = "12239060702";
  } else{
    document.getElementById('PDC-P').value = "";
  }     
}
function comprobarmfbp1(obj){   
  if (obj.checked){
    document.getElementById('MFB-P1').value = "12975402001";
  } else{
    document.getElementById('MFB-P1').value = "";
  }     
}
function comprobarmfbs(obj){   
  if (obj.checked){
    document.getElementById('MFB-S').value = "12235403215";
  } else{
    document.getElementById('MFB-S').value = "";
  }     
}
function comprobarmfbp2(obj){   
  if (obj.checked){
    document.getElementById('MFB-P2').value = "12975407316";
  } else{
    document.getElementById('MFB-P2').value = "";
  }     
}
function comprobarmfbe(obj){
  if (obj.checked){
    document.getElementById('MFB-E').value = "12975403015";
  } else{
    document.getElementById('MFB-E').value = "";
  }     
}

function mostrar_modulos_vision(){
  document.getElementById("modulos_vision").innerHTML = "<option value='"+"'>Seleccione un modulo de vision..."+"</option>";
  //modulos de vision
  fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/all/-/-/-/-/-")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data.MODULO);
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
  fetch(dominio+"/api/get/"+DBEVENT+"/modulos_torques/all/-/-/-/-/-")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data.MODULO);
    var array = data.MODULO
    for (var i = 0; i < array.length; i++) {
      var aTag = document.createElement('option');
      aTag.text=array[i]
      document.getElementById("modulos_torque").innerHTML += "<option value='"+array[i]+"'>"+array[i]+"</option>";
    }
  })
  //modulos de torque
}

function agregarmodulov(){
  if (document.getElementById("modulos_vision").value===""){
    // console.log("Seleccione un modulo")
  }
  else{
    var i = mv.indexOf( document.getElementById("modulos_vision").value );
    if (i === -1){
      // console.log(document.getElementById("modulos_vision").value)
      mv.push(document.getElementById("modulos_vision").value)
      // console.log(mv)
      document.getElementById('arreglomv').innerHTML= "Módulos de visión agregados:   "+mv ;
    }
  }
}

function agregarmodulot(){
  if (document.getElementById("modulos_torque").value===""){
    // console.log("Seleccione un modulo")
  }
  else{
    var i = mt.indexOf(document.getElementById("modulos_torque").value);
    if (i === -1){
      // console.log(document.getElementById("modulos_torque").value)
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
  // console.log(mv)
  document.getElementById('arreglomv').innerHTML= "Módulos de visión agregados:   "+mv ;
}

function quitarmodulot(){
  var i = mt.indexOf(document.getElementById("modulos_torque").value);
  if (i !== -1){
    mt.splice( i, 1 );
  }
  // console.log(mt)
  document.getElementById('arreglomt').innerHTML= "Módulos de torque agregados:   "+mt ;
}

function clearmodulov(){
  mv = [];
  // console.log(mv)
  document.getElementById('arreglomv').innerHTML= "Módulos de visión agregados:   "+mv ;
}
function clearmodulot(){
  mt = [];
  // console.log(mt)
  document.getElementById('arreglomt').innerHTML= "Módulos de Torque agregados:   "+mt ;
}

function get_valid_pedido(e){
	e = e || window.event;
	if (e.keyCode == 13)
	{
    historial="";
    ref = "";
    pedidoeditar = document.getElementById("pedidoeditar").value;
    // console.log(pedidoeditar);
    if(pedidoeditar!=""){
      var split_pedido_editar = pedidoeditar.split(" ");
      // console.log("Aqui está el split: ",split_pedido_editar);
      for (var i = 0; i < split_pedido_editar.length; i++) {
        // console.log(split_pedido_editar[i]);
        var ILX = split_pedido_editar[i].indexOf("ILX")
        var IRX = split_pedido_editar[i].indexOf("IRX")
        var Z = split_pedido_editar[i].indexOf("Z")
        // console.log("INDEX OF STRING",ILX);

        if (ILX == -1) {
          document.getElementById("pedidoeditar").value = ""
          // console.log("no está el ILX");
          historial="";
          ref = "no valido";
          alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia "ILX", "IRX" o "Z" no válida</div>'
          // console.log(historial)
        } else{
          // console.log("SI ESCRIBIÓ ILX");
          pedido_editar_final = split_pedido_editar[i];
          endpoint=dominio+'/database/'+DBEVENT+'/pedidos/pedido/=/'+split_pedido_editar[i]+'/_/_/_'
          // console.log(endpoint)
          fetch(endpoint,{
            method: 'GET',
            headers:{
              "Content-type": "application/json"
            }
          }).then(res=>res.json())
          .then(function (data){
            // console.log(data);
            // console.log(data.PEDIDO);
            if (data.PEDIDO == pedido ) {
              historial="";
              alert_get_historial.innerHTML ="";
            } else{
              historial="si existe";
              ref = "";
              alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El número de parte "'+split_pedido_editar[i]+'" ya existe</div>'
            }
            // console.log(historial)
          })
          .catch(function(err) {
          });
          ref = "";
          alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El número de parte "'+split_pedido_editar[i]+'" no existe</div>'
          document.getElementById("pedidoeditar").value = split_pedido_editar[i]
          break;
        }
        // Para IRX
        if (IRX == -1) {
          document.getElementById("pedidoeditar").value = ""
          // console.log("no está el IRX");
          historial="";
          ref = "no valido";
          alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia "ILX", "IRX" o "Z" no válida</div>'
          // console.log(historial)
        } else{
          // console.log("SI ESCRIBIÓ IRX");
          pedido_editar_final = split_pedido_editar[i];
          endpoint=dominio+'/database/'+DBEVENT+'/pedidos/pedido/=/'+split_pedido_editar[i]+'/_/_/_'
          // console.log(endpoint)
          fetch(endpoint,{
            method: 'GET',
            headers:{
              "Content-type": "application/json"
            }
          }).then(res=>res.json())
          .then(function (data){
            // console.log(data);
            // console.log(data.PEDIDO);
            if (data.PEDIDO == pedido ) {
              historial="";
              alert_get_historial.innerHTML ="";
            } else{
              historial="si existe";
              ref = "";
              alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El número de parte "'+split_pedido_editar[i]+'" ya existe</div>'
            }
            // console.log(historial)
          })
          .catch(function(err) {
          });
          ref = "";
          alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El número de parte "'+split_pedido_editar[i]+'" no existe</div>'
          document.getElementById("pedidoeditar").value = split_pedido_editar[i]
          break;
        }
        // Para Z
        if (Z == -1) {
          document.getElementById("pedidoeditar").value = ""
          // console.log("no está el Z");
          historial="";
          ref = "no valido";
          alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia "ILX", "IRX" o "Z" no válida</div>'
          // console.log(historial)
        } else{
          // console.log("SI ESCRIBIÓ Z");
          pedido_editar_final = split_pedido_editar[i];
          endpoint=dominio+'/database/'+DBEVENT+'/pedidos/pedido/=/'+split_pedido_editar[i]+'/_/_/_'
          // console.log(endpoint)
          fetch(endpoint,{
            method: 'GET',
            headers:{
              "Content-type": "application/json"
            }
          }).then(res=>res.json())
          .then(function (data){
            // console.log(data);
            // console.log(data.PEDIDO);
            if (data.PEDIDO == pedido ) {
              historial="";
              alert_get_historial.innerHTML ="";
            } else{
              historial="si existe";
              ref = "";
              alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El número de parte "'+split_pedido_editar[i]+'" ya existe</div>'
            }
            // console.log(historial)
          })
          .catch(function(err) {
          });
          ref = "";
          alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El número de parte "'+split_pedido_editar[i]+'" no existe</div>'
          document.getElementById("pedidoeditar").value = split_pedido_editar[i]
          break;
        }
      }
    }
  }
}

function get_valid_pedido_1(){
  //console.log("get_pedido")
  historial="";
  ref = "";
  pedidoeditar = document.getElementById("pedidoeditar").value;
  // console.log(pedidoeditar) 
  if(pedidoeditar!=""){
    var split_pedido_editar = pedidoeditar.split(" ");
    // console.log("Aqui está el split: ",split_pedido_editar);
    for (var i = 0; i < split_pedido_editar.length; i++) {
      // console.log(split_pedido_editar[i]);
      var ILX = split_pedido_editar[i].indexOf("ILX")
      var IRX = split_pedido_editar[i].indexOf("IRX")
      var Z = split_pedido_editar[i].indexOf("Z")
      // console.log("INDEX OF STRING",ILX);

      if (ILX == -1) {
        // console.log("no está el ILX");
        historial="";
        ref = "no valido";
        alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia "ILX", "IRX" o "Z" no válida</div>'
        // console.log(historial)
      } else{
        // console.log("SI ESCRIBIÓ ILX");
        pedido_editar_final = split_pedido_editar[i];
        endpoint=dominio+'/database/'+DBEVENT+'/pedidos/pedido/=/'+split_pedido_editar[i]+'/_/_/_'
        // console.log(endpoint)
        fetch(endpoint,{
          method: 'GET',
          headers:{
            "Content-type": "application/json"
          }
        }).then(res=>res.json())
        .then(function (data){
          // console.log(data);
          console.log(data.PEDIDO);
          if (data.PEDIDO == pedido ) {
            historial="";
            alert_get_historial.innerHTML ="";
          } else{
            historial="si existe";
            ref = "";
            alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El número de parte "'+split_pedido_editar[i]+'" ya existe</div>'
          }
          // console.log(historial)
        })
        .catch(function(err) {
        });
        ref = "";
        alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+split_pedido_editar[i]+'" no existe</div>'
        break;
      }
      // Para IRX
      if (IRX == -1) {
        // console.log("no está el IRX");
        historial="";
        ref = "no valido";
        alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia "ILX", "IRX" o "Z" no válida</div>'
        // console.log(historial)
      } else{
        // console.log("SI ESCRIBIÓ IRX");
        pedido_editar_final = split_pedido_editar[i];
        endpoint=dominio+'/database/'+DBEVENT+'/pedidos/pedido/=/'+split_pedido_editar[i]+'/_/_/_'
        // console.log(endpoint)
        fetch(endpoint,{
          method: 'GET',
          headers:{
            "Content-type": "application/json"
          }
        }).then(res=>res.json())
        .then(function (data){
          // console.log(data);
          console.log(data.PEDIDO);
          if (data.PEDIDO == pedido ) {
            historial="";
            alert_get_historial.innerHTML ="";
          } else{
            historial="si existe";
            ref = "";
            alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El número de parte "'+split_pedido_editar[i]+'" ya existe</div>'
          }
          // console.log(historial)
        })
        .catch(function(err) {
        });
        ref = "";
        alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+split_pedido_editar[i]+'" no existe</div>'
        break;
      }
      // Para Z
      if (Z == -1) {
        // console.log("no está el Z");
        historial="";
        ref = "no valido";
        alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia "ILX", "IRX" o "Z" no válida</div>'
        // console.log(historial)
      } else{
        // console.log("SI ESCRIBIÓ Z");
        pedido_editar_final = split_pedido_editar[i];
        endpoint=dominio+'/database/'+DBEVENT+'/pedidos/pedido/=/'+split_pedido_editar[i]+'/_/_/_'
        // console.log(endpoint)
        fetch(endpoint,{
          method: 'GET',
          headers:{
            "Content-type": "application/json"
          }
        }).then(res=>res.json())
        .then(function (data){
          // console.log(data);
          console.log(data.PEDIDO);
          if (data.PEDIDO == pedido ) {
            historial="";
            alert_get_historial.innerHTML ="";
          } else{
            historial="si existe";
            ref = "";
            alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El número de parte "'+split_pedido_editar[i]+'" ya existe</div>'
          }
          // console.log(historial)
        })
        .catch(function(err) {
        });
        ref = "";
        alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+split_pedido_editar[i]+'" no existe</div>'
        break;
      }
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
  // console.log("Valor de activo: ",activo);
}


refArray = []
function desicion(ref){
  if (ref.checked){
    addPedido(ref)
  }else{
    delPedido(ref)
  }
}



function addPedido(ref){
  console.log('addPEDIDO',ref);
  var delCant
  const seleccion =  ref.value? ref.value: `{"ID":"${ref}"}`;
  console.log(seleccion);
  var Jvalue = JSON.parse(seleccion);
  if (!refArray.includes(Jvalue['ID'] )) {
    refArray.push(Jvalue['ID'])
  }
    

   console.log(refArray);

  delCant = refArray.length

   var delRef = document.getElementById("btn-delRef")

   delRef.classList.add('borrar')
   delRef.classList.add('btn-danger');


 if (delCant) {
   delRef.classList.add('active')
  
 }else{
   delRef.classList.remove('active')

 }
  
}



function delPedido(ref){
  console.log('DELPEDIDO', ref);
  var delCant
  const seleccion =  ref.value? ref.value: `{"ID":"${ref}"}`;
  console.log(seleccion);
  
  
  var Jvalue = JSON.parse(seleccion)  
     refArray.splice(refArray.indexOf(Jvalue['ID']),1)
     Jvalue['VALOR'] = 0;
   console.log(refArray);

   delCant = refArray.length

   var delRef = document.getElementById("btn-delRef")

   delRef.classList.add('borrar')
   delRef.classList.add('btn-danger');


 if (delCant) {
   delRef.classList.add('active')
  
 }else{
   delRef.classList.remove('active')

 }
  
}

function borraPedidos(){
  // console.log(refArray, 'Aqui yace el BorraPedidos 3000');
  if (confirm(`¿Estas seguro de eliminar ${refArray.length} elementos?`)){
          refArray.forEach(alx => {
            console.log(alx);
            
            fetch(dominio+'/api/delete/'+DBEVENT+'/pedidos/'+alx,{
              method: 'POST'
            }).then(res=>res.json())
            .then(function (data){
              console.log(data);
              console.log(`Haz eliminado el registro ${alx}`)
            })
            .catch(function(err) {
              console.log(err);
            });
          });
         setTimeout(function(){
        cargartabla()
           }, 2000);
        
    } else{
    console.log('Eliminacion Anulada');
  }
}
function lastDay() {
  if (document.getElementById("lastDay").checked === true) {
    
    fetch(dominio+"/api/get/"+DBEVENT+"/pedidos/ID/>/0/_/=/_")
    .then(data=>data.json())
    .then(data=>{
    console.log(data["ID"]);
   

    const pum = data["DATETIME"]
    var lastDate = new Date (pum[pum.length - 1])
    console.log(pum[pum.length - 1]);
    // var fechaInicial = moment.utc(lastDate).add(-1,'days').format('YYYY-MM-DD'); //Insertar una fecha del dia de hoy menos 1 dia
    var fechaFinal = moment.utc(lastDate).format('YYYY-MM-DD'); //Insertar una fecha del dia de hoy mas 1 dia
    // console.log('Fecha Inicial'+fechaInicial + 'Fecha final'+fechaFinal);
    fetch(dominio+`/api/get/${DBEVENT}/pedidos/datetime/>/${fechaFinal}/_/_/_`)
    .then(mem=>mem.json())
    .then(mem=> {
      console.log(mem);
      const lastlx = mem["ID"]
      for (let c = lastlx.length-1; c >= 0; c--) {
        const lx = lastlx[c] // El nombre del pedido
        let ref = document.getElementById(`${lx}`)
        if (ref) {
          ref.checked = true
          addPedido(lx)
        }else{
          addPedido(lx)
        }
       }
    })

  })
}else{
  fetch(dominio+"/api/get/"+DBEVENT+"/pedidos/ID/>/0/_/=/_")
  .then(data=>data.json())
  .then(data=>{
  console.log(data["ID"]);
 

  const pum = data["DATETIME"]
  var lastDate = new Date (pum[pum.length - 1])
  console.log(pum[pum.length - 1]);
  // var fechaInicial = moment.utc(lastDate).add(-1,'days').format('YYYY-MM-DD'); //Insertar una fecha del dia de hoy menos 1 dia
  var fechaFinal = moment.utc(lastDate).format('YYYY-MM-DD'); //Insertar una fecha del dia de hoy mas 1 dia
  // console.log('Fecha Inicial'+fechaInicial + 'Fecha final'+fechaFinal);
  fetch(dominio+`/api/get/${DBEVENT}/pedidos/datetime/>/${fechaFinal}/_/_/_`)
  .then(mem=>mem.json())
  .then(mem=> {
    console.log(mem);
    const lastlx = mem["ID"]
    for (let c = lastlx.length-1; c >= 0; c--) {
      const lx = lastlx[c] // El nombre del pedido
      let ref = document.getElementById(`${lx}`)
      if (ref) {
        ref.checked = false;
        delPedido(lx)
      }else{
        delPedido(lx)
      }
     }
  })

})

}
}