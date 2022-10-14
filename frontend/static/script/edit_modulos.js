let DBEVENT = sessionStorage.getItem('DBEVENT');
console.log("DB EVENT ACTUAL: ",DBEVENT);
let modif_name_1 = DBEVENT.replace(/_/g, '-') // Se reemplazan los "_" encontrados en el nombre del Evento por "-" 
let modif_name_2 = modif_name_1.replace("evento-", '') // Se elimina el string inicial "evento-" del nombre
let eventoFinal = modif_name_2.toUpperCase()
document.getElementById('tituloEvento').innerText = eventoFinal;
var id;
// console.log("esta es la sessionstorage: ", sessionStorage.getItem('gafet'));

function cleardiv(){
  document.getElementById("tabla").innerHTML = "";
}

function cargartabla(){
  if (sessionStorage.getItem('tipo') == "OPERADOR" || sessionStorage.getItem('tipo') == null) {
    // console.log(sessionStorage.getItem('tipo'));
  }
}

function modulos_vision(){
  cleardiv();
  fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/ID/>/0/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    console.log(data);
    if (data.items == 0) {
      console.log("Sin registro alguno");
      document.getElementById("tabla").innerHTML = "<label>Tabla sin registros.</label>";
    }else{
      var colnames = Object.keys(data);
      // console.log("Columnas: ", colnames);
      colnames.splice(0,8);
      // console.log("Elemento eliminado",colnames.splice(0,8));
      var filas = data[colnames[1]].length;
      // console.log("Num de Registros:",filas);

      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("tabla");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.border = '2';
      table.appendChild(Encabezados);
      table.appendChild(tableBody);
      tableBody.align="center";
      //FIN DE CREACIÓN DE TABLA

      //ENCABEZADOS DE LA TABLA
      var tr = document.createElement('TR');
      Encabezados.appendChild(tr);
      for (i = 0; i < colnames.length; i++) {
        var th = document.createElement('TH')
        th.width = '100';
        th.appendChild(document.createTextNode(colnames[i]));
        tr.appendChild(th).style.backgroundColor="#0DBED6";
      }
      var th = document.createElement('TH')
      th.width = '100';
      th.appendChild(document.createTextNode('Operación'));
      tr.appendChild(th).style.backgroundColor="#0DBED6";
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(data[colnames[j]][i]));
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
          boton.classList.add('btn-delete-vision');
          var botondos = document.createElement('button');
          var modificar = document.createElement('i');
          modificar.classList.add("fas");
          modificar.classList.add("fa-edit");
          botondos.title = 'Modificar';
          botondos.classList.add('btn');
          botondos.classList.add('btn-primary');
          botondos.classList.add('btn-edit-vision');
          boton.appendChild(eliminar);
          botondos.appendChild(modificar);
          td.appendChild(boton);
          td.append(" ");
          td.appendChild(botondos);
          tr.appendChild(td)
          tableBody.appendChild(tr);
      }
      

      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable();
      } );
    }
   //  $("#myTable tr").click(function(){
   //   var value=$(this).find('td:first').next().next().html();
   //   alert(value);    
   // }); 
 })
}

function modulos_torque(){
  cleardiv();
  fetch(dominio+"/api/get/"+DBEVENT+"/modulos_torques/ID/>/0/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    if (data.items == 0) {
      console.log("Sin registro alguno");
      document.getElementById("tabla").innerHTML = "<label>Tabla sin registros.</label>";
    }else{
      var colnames = Object.keys(data);
      // console.log("Columnas: ", colnames);
      colnames.splice(0,9);
      // console.log("Elemento eliminado",colnames.splice(0,8));
      var filas = data[colnames[1]].length;
      // console.log("Num de Registros:",filas);

      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("tabla");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.border = '2';
      table.appendChild(Encabezados);
      table.appendChild(tableBody);
      tableBody.align="center";
      //FIN DE CREACIÓN DE TABLA

      //ENCABEZADOS DE LA TABLA
      var tr = document.createElement('TR');
      Encabezados.appendChild(tr);
      for (i = 0; i < colnames.length; i++) {
        var th = document.createElement('TH')
        th.width = '100';
        th.appendChild(document.createTextNode(colnames[i]));
        tr.appendChild(th).style.backgroundColor="#0DBED6";
      }
      var th = document.createElement('TH')
      th.width = '100';
      th.appendChild(document.createTextNode('Operación'));
      tr.appendChild(th).style.backgroundColor="#0DBED6";
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(data[colnames[j]][i]));
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
          boton.classList.add('btn-delete-torque');
          var botondos = document.createElement('button');
          var modificar = document.createElement('i');
          modificar.classList.add("fas");
          modificar.classList.add("fa-edit");
          botondos.title = 'Modificar';
          botondos.classList.add('btn');
          botondos.classList.add('btn-primary');
          botondos.classList.add('btn-edit-torque');
          boton.appendChild(eliminar);
          botondos.appendChild(modificar);
          td.appendChild(boton);
          td.append(" ");
          td.appendChild(botondos);
          tr.appendChild(td)
          tableBody.appendChild(tr);
      }

      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable();
      } );
    }
   //  $("#myTable tr").click(function(){
   //   var value=$(this).find('td:first').next().next().html();
   //   alert(value);    
   // }); 
 })
}

$(document).on('click','.btn-delete-vision', function(){
  var elim = $(this).parent().parent().children().first().text();
  var modulo = $(this).parent().parent().children().first().next().text();
  console.log("ID a eliminar",elim);
  console.log("Modulo a eliminar",modulo);
  document.getElementById("modulo").innerHTML = modulo;
  var opcion = confirm("¿Está seguro de que desea eliminar este registro?");
  if (opcion == true) {
    fetch(dominio+'/api/delete/'+DBEVENT+'/modulos_fusibles/'+elim,{
      method: 'POST'
    }).then(res=>res.json())
    .then(function (data){
      // console.log(data);
      console.log('Haz eliminado el registro')
      $('#mostrar').click();
      modulos_vision();
      setTimeout(function(){
        $('#cerrar').click();
      },3000);
    })
    .catch(function(err) {
      console.log(err);
    });
  } else {
    console.log('Haz cancelado la acción')
  }
});

$(document).on('click','.btn-edit-vision', function(){
  var edit_id = $(this).parent().parent().children().first().text();
  var edit= $(this).parent().parent().children().next().first().text();
  id = edit_id;
  console.log("Nombre del Módulo: ", edit);
  console.log("Id de Módulo: ",edit_id);
  fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/ID/=/"+edit_id+"/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    var keys = Object.keys(data)
    // console.log(keys);
    sessionStorage.setItem("edit_vision", edit);
    sessionStorage.setItem("edit_vision_id", edit_id);
    location.href = "edit_modulos_vision.html";
  })
});

$(document).on('click','.btn-delete-torque', function(){
  var elim = $(this).parent().parent().children().first().text();
  var modulo = $(this).parent().parent().children().first().next().text();
  console.log("ID a eliminar",elim);
  console.log("Modulo a eliminar",modulo);
  document.getElementById("modulo").innerHTML = modulo;
  var opcion = confirm("¿Está seguro de que desea eliminar este registro?");
  if (opcion == true) {
    fetch(dominio+'/api/delete/'+DBEVENT+'/modulos_torques/'+elim,{
      method: 'POST'
    }).then(res=>res.json())
    .then(function (data){
      // console.log(data);
      console.log('Haz eliminado el registro')
      $('#mostrar').click();
      modulos_torque();
      setTimeout(function(){
        $('#cerrar').click();
      },3000);
    })
    .catch(function(err) {
      console.log(err);
    });
  } else {
    console.log('Haz cancelado la acción')
  }
});

$(document).on('click','.btn-edit-torque', function(){
  var edit_id = $(this).parent().parent().children().first().text();
  var edit= $(this).parent().parent().children().next().first().text();
  id = edit_id;
  console.log("Nombre del Módulo: ", edit);
  console.log("Id de Módulo: ",edit_id);
  fetch(dominio+"/api/get/"+DBEVENT+"/modulos_torques/ID/=/"+edit_id+"/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    sessionStorage.setItem("edit_torque", edit);
    sessionStorage.setItem("edit_torque_id", edit_id);
    location.href = "edit_modulos_torque.html";
  })
});
//////// Si el usuario hace click fuera de la ventana de edición esta se cerrará //////////
var modaledit = document.getElementById("popedit");
window.onclick = function(event) {
  if (event.target == modaledit) {
    modaledit.style.display = "none";
  }
}

$('#modal_elim').find(".modal-header").css("background", "#0DBED6");