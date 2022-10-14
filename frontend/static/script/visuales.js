let DBEVENT;

function cleardiv(){
  document.getElementById("tabla").innerHTML = "";
}

function cargartabla(){
  DBEVENT = sessionStorage.getItem("DBEVENT")
  console.log("DBEVENT ACTUAL: ",DBEVENT);
  let modif_name_1 = DBEVENT.replace(/_/g, '-') // Se reemplazan los "_" encontrados en el nombre del Evento por "-" 
  let modif_name_2 = modif_name_1.replace("evento-", '') // Se elimina el string inicial "evento-" del nombre
  let eventoFinal = modif_name_2.toUpperCase()
  document.getElementById('tituloEvento').innerText = eventoFinal;
  cleardiv();
  fetch(dominio+"/api/get/"+DBEVENT+"/pedidos/ID/>/0/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    if (data.items == 0) {
      console.log("Sin registro alguno");
      document.getElementById("tabla").innerHTML = "<label>Tabla sin registros.</label>";
    }else{
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("ID"),1);
      colnames.splice(colnames.indexOf("PEDIDO"),1);
      colnames.splice(colnames.indexOf("ACTIVE"),1,"ID","PEDIDO","ACTIVE");
      // console.log("Columnas: ", colnames);
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
      th.appendChild(document.createTextNode('Visual'));
      tr.appendChild(th).style.backgroundColor="#0DBED6";
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        //// Instrucciones para saber si el registro pertenece a Interior o Motor ////
        var filasQR = JSON.parse(data[colnames[7]][i]);
        // console.log(filasQR);
        var nombresQR = Object.keys(filasQR);
        // console.log("Cajas", nombresQR);
        // console.log(nombresQR.includes('PDC-D'));
        if (nombresQR.includes('PDC-D') == true) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            switch (colnames[j]){
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
          var ver = document.createElement('i');
          ver.classList.add("fas");
          ver.classList.add("fa-eye");
          boton.title = 'Ver Modularidad';
          boton.classList.add('btn');
          boton.classList.add('btn-warning');
          boton.classList.add('btn-ver');
          boton.appendChild(ver);
          td.appendChild(boton);
          tr.appendChild(td)
          tableBody.appendChild(tr);
        }
      }
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable({
          responsive:true
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
    console.log("Header: ",headerString);
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
          span.classList = "flex-box";
          let valores = JSON.stringify(cavidades[obj_cavidad]);
          //console.log("Aqui en string: ",valores)
          let boxValue = valores.replace(re, 'N/A');

          span.innerHTML = `<b>${j+1}: </b> <p>${valores} </p>`;
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
      document.getElementById("informacion").innerHTML = data[headerString];
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
          span.classList = "flex-box";
          let valores = JSON.stringify(cavidades[obj_cavidad]);
          //console.log("Aqui en string: ",valores)
          let boxValue = valores.replace(re, 'N/A');

          span.innerHTML = `<b>${j+1}: </b> <p>${valores} </p>`;
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
          span.classList = "flex-box";
          let valores = JSON.stringify(cavidades[obj_cavidad]);
          //console.log("Aqui en string: ",valores)
          let boxValue = valores.replace(re, 'N/A');

          span.innerHTML = `<b>${j+1}: </b> <p>${valores} </p>`;
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
          span.classList = "flex-box";
          let valores = JSON.stringify(cavidades[obj_cavidad]);
          //console.log("Aqui en string: ",valores)
          let boxValue = valores.replace(re, 'N/A');

          span.innerHTML = `<b>${j+1}: </b> <p>${valores} </p>`;
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