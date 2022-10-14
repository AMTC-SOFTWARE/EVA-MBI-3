///////////////VARIABLES GLOBALES\\\\\\\\\\\\\\\\\
moment.lang('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
  weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
  weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
});
var alertawarning = document.getElementById('alertawarning');
var data;
var fecha = document.getElementById("fecha");
var id = document.getElementById("id");
var modulo = document.getElementById("modulo");
var pedido = document.getElementById("pedido");
var HM = document.getElementById("HM");
var nombre = document.getElementById("nombre");
var gafete = document.getElementById("gafete");

let chartColumns_VA = new Array(); ///Columnas para el Histrograma de Vision y Altura 
let chartColumns_T = new Array(); ///Columnas para el Histrograma de Torque
var logArray; //Guardado de valores para la grafica

function fechaActual(){
  var fechaFinal = moment.utc().add(1,'days').format('YYYY-MM-DD'); //Insertar una fecha del dia de hoy mas 1 dia
  var fechaInicial = moment.utc().add(-1,'month').format('YYYY-MM-DD'); //Insertar una fecha del dia de hoy menos 1 mes
  document.getElementById('fechaf').value = fechaFinal;
  document.getElementById('fechai').value = fechaInicial;
}

var options = {
  Historial: ["Fecha", "HM"],
  Login: ["Fecha", "Nombre", "Gafet"],
  Modulos_Fusibles: ["ID", "Modulo"],
  Modulos_Torques: ["ID", "Modulo"],
  Pedidos: ["Fecha", "Pedido"],
  Usuarios: ["Fecha", "Nombre", "Gafet"]
}

$(function () {
  var fillSecondary = function () {
    var selected = $('#selector').val();
    if ($('#selector').val() == "Log") {
      $('#tipo_busqueda').empty();
      $('#tipo_busqueda').css("display", "none");
      $('#label_busqueda').css("display", "none");
      fecha.style.display = 'inline-block';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'none';
      modulo.style.display = 'none';
      pedido.style.display = 'none';
    } else {
      $('#tipo_busqueda').css("display", "inline-block");
      $('#label_busqueda').css("display", "inline-block");
      $('#tipo_busqueda').empty();
      options[selected].forEach(function (element, index) {
        $('#tipo_busqueda').append('<option value="' + element + '">' + element + '</option>');
      });
    }
    switch ($('#tipo_busqueda').val()) {
      case "Fecha":
        // console.log("Búsqueda por FECHA")
        fecha.style.display = 'inline-block';
        HM.style.display = 'none';
        nombre.style.display = 'none';
        gafete.style.display = 'none';
        id.style.display = 'none';
        modulo.style.display = 'none';
        pedido.style.display = 'none';
        break;
      case "ID":
        // console.log("Búsqueda por id")
        fecha.style.display = 'none';
        HM.style.display = 'none';
        nombre.style.display = 'none';
        gafete.style.display = 'none';
        id.style.display = 'inline-block';
        modulo.style.display = 'none';
        pedido.style.display = 'none';
        break;
      default:
        break;
    }
  }
  var cambio = function () {
    switch ($('#tipo_busqueda').val()) {
      case "Fecha":
        // console.log("Búsqueda por FECHA")
        fecha.style.display = 'inline-block';
        HM.style.display = 'none';
        nombre.style.display = 'none';
        gafete.style.display = 'none';
        id.style.display = 'none';
        modulo.style.display = 'none';
        pedido.style.display = 'none';
        break;
      case "HM":
        // console.log("Búsqueda por HM")
        fecha.style.display = 'none';
        HM.style.display = 'inline-block';
        nombre.style.display = 'none';
        gafete.style.display = 'none';
        id.style.display = 'none';
        modulo.style.display = 'none';
        pedido.style.display = 'none';
        document.getElementById("hminput").focus();
        break;
      case "Nombre":
        // console.log("Búsqueda por Nombre")
        fecha.style.display = 'none';
        HM.style.display = 'none';
        nombre.style.display = 'inline-block';
        gafete.style.display = 'none';
        id.style.display = 'none';
        modulo.style.display = 'none';
        pedido.style.display = 'none';
        document.getElementById("nombreinput").focus();
        break;
      case "Gafet":
        // console.log("Búsqueda por Gafet")
        fecha.style.display = 'none';
        HM.style.display = 'none';
        nombre.style.display = 'none';
        gafete.style.display = 'inline-block';
        id.style.display = 'none';
        modulo.style.display = 'none';
        pedido.style.display = 'none';
        document.getElementById("gafeteinput").focus();
        break;
      case "ID":
        // console.log("Búsqueda por id")
        fecha.style.display = 'none';
        HM.style.display = 'none';
        nombre.style.display = 'none';
        gafete.style.display = 'none';
        id.style.display = 'inline-block';
        modulo.style.display = 'none';
        pedido.style.display = 'none';
        break;
      case "Modulo":
        // console.log("Búsqueda por modulo")
        fecha.style.display = 'none';
        HM.style.display = 'none';
        nombre.style.display = 'none';
        gafete.style.display = 'none';
        id.style.display = 'none';
        modulo.style.display = 'inline-block';
        pedido.style.display = 'none';
        document.getElementById("moduloinput").focus();
        break;
      case "Pedido":
        // console.log("Búsqueda por Pedido")
        fecha.style.display = 'none';
        HM.style.display = 'none';
        nombre.style.display = 'none';
        gafete.style.display = 'none';
        id.style.display = 'none';
        modulo.style.display = 'none';
        pedido.style.display = 'inline-block';
        document.getElementById("pedidoinput").focus();
        break;
      default:
        break;
    }
  }
  $('#selector').change(fillSecondary);
  fillSecondary();
  $('#tipo_busqueda').change(cambio);
  cambio();
});



function cleardiv() {
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("descarga").innerHTML = "";
}
// Función que se ejecuta al oprimir el botón "Obtener Resultados"
function capturar() {
  if (sessionStorage.getItem('tipo') == null) {
    alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">Necesita inicar sesión para visualizar esta información.</div>'
  } else {
    var tabla = document.getElementById("selector").value;
    // console.log(tabla);
    switch (tabla) {
      case "Historial":
        cleardiv();
        cargarhistorial();
        console.log("Historial");
        break;
      case "Login":
        cleardiv();
        cargarportipo();
        console.log("Obtener Resultados de Login");
        break;
      case "Log":
        cleardiv();
        cargardatetime();
        console.log("Obtener Resultados de Log");
        break;
      case "Modulos_Alturas":
        cleardiv();
        cargarmodulo();
        console.log("Obtener Resultados de Modulos_Alturas");
        break;
      case "Modulos_Fusibles":
        cleardiv();
        cargarmodulo();
        console.log("Obtener Resultados de Modulos_Fusibles");
        break;
      case "Modulos_Torques":
        cleardiv();
        cargarmodulo();
        console.log("Obtener Resultados de Modulos_Torques");
        break;
      case "Pedidos":
        cleardiv();
        cargarpedido();
        console.log("Obtener Resultados de Pedidos");
        break;
      case "Usuarios":
        cleardiv();
        cargarportipo_usuarios();
        console.log("Obtener Resultados de Usuarios");
        break;
      default:
        console.log("No pasa nada");
    }
  }
}
//////////////// AL SELECCIONAR TABLAS QUE NECESITEN REALIZAR CONSULTAS EN BASE A "Datetime" SE EJECUTARÁ ESTA FUNCIÓN //////////////////////////////////
function cargardatetime() {
  console.log("Inicio");
  fetch(dominio + "/json2/" + document.getElementById('selector').value + "/datetime/>/" + document.getElementById('fechai').value + "/</" + document.getElementById('fechaf').value)
    .then(data => data.json())
    .then(data => {
      // console.log(data);
      if (data.items == 0) {
        console.log("No hay coincidencias");
        alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
      } else {
        alertawarning.innerHTML = '';
      }

      var colnames = data.columns;
      var filas = data[colnames[0]].length;
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.classList.add('nowrap');
      table.cellSpacing = "0";
      table.width = "100%";
      table.border = '2';
      table.appendChild(Encabezados);
      table.appendChild(tableBody);
      tableBody.align = "center";
      //FIN DE CREACIÓN DE TABLA

      //ENCABEZADOS DE LA TABLA
      var tr = document.createElement('TR');
      Encabezados.appendChild(tr);
      for (i = 0; i < colnames.length; i++) {
        var titulo = colnames[i].replace("_", " ")
        var th = document.createElement('TH')
        th.width = '100';
        th.appendChild(document.createTextNode(titulo));
        tr.appendChild(th).style.backgroundColor = "#0DBED6";
      }
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {

          var td = document.createElement('TD')
          switch (colnames[j]) {
            case "QR_BOXES":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-qrcode");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-qr');
              boton.style.width = "60px"
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
            case "MODULOS_VISION":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-archive");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-modulosF');
              boton.style.width = "60px"
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
            case "MODULOS_ALTURA":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-archive");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-modulosA');
              boton.style.width = "60px"
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
            case "MODULOS_TORQUE":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-archive");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-modulosT');
              boton.style.width = "60px"
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
            default:
              td.appendChild(document.createTextNode(data[colnames[j]][i]));
          }
          tr.appendChild(td)
        }

        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function () {
        $('#myTable').DataTable({
          responsive: true
        });
      });
    })
}

$(document).on('click', '.btn-ver-qr', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/pedidos/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        // console.log(data);
        // console.log(data[id_info]);
        document.getElementById("informacion").innerHTML = data[id_info];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/pedidos/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          //console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          // console.log("Aquí en object: ",cavidades)



          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);

          let span = document.createElement("span");
          span.classlist = "caja-valor";
          span.innerHTML = `<p>${cavidades}</p>`;
          nav.appendChild(span);
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});

$(document).on('click', '.btn-ver-estado', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/pedidos/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        // console.log(data);
        // console.log(data[id_info]);
        document.getElementById("informacion").innerHTML = data[id_info];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/log/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        // console.log(data);
        // console.log(data[header_info]);
        document.getElementById("informacion").innerHTML = data[header_info];
        $('#mostrar').click();
      })
  }
});

function cargarfecha() {
  fetch(dominio + "/json2/" + document.getElementById('selector').value + "/datetime/>/" + document.getElementById('fechai').value + "/</" + document.getElementById('fechaf').value)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      if (data.items == 0) {
        console.log("No hay coincidencias");
        alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
      } else {
        alertawarning.innerHTML = '';
      }

      var colnames = data.columns;
      // console.log(colnames);
      colnames.splice(colnames.indexOf("GAFET"), 1);
      // console.log("Elemento eliminado",colnames.splice(2,1));
      // console.log("el nuevo array: ", colnames);
      var filas = data[colnames[0]].length;
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.classList.add('nowrap');
      table.cellSpacing = "0";
      table.width = "100%";
      table.border = '2';
      table.appendChild(Encabezados);
      table.appendChild(tableBody);
      tableBody.align = "center";
      //FIN DE CREACIÓN DE TABLA

      //ENCABEZADOS DE LA TABLA
      var tr = document.createElement('TR');
      Encabezados.appendChild(tr);
      for (i = 0; i < colnames.length; i++) {
        var th = document.createElement('TH')
        th.width = '100';
        th.appendChild(document.createTextNode(colnames[i]));
        tr.appendChild(th).style.backgroundColor = "#0DBED6";
      }
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          td.appendChild(document.createTextNode(data[colnames[j]][i]));
          tr.appendChild(td)
        }
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function () {
        $('#myTable').DataTable({
          responsive: true
        });
      });
    })
}

//////////////// AL SELECCIONAR LA TABLA "Historial" SE EJECUTARÁ ESTA FUNCIÓN PARA REALIZAR LA CONSULTA DE LOS DATOS A LA TABLA CORRESPONDIENTE ///////////////////////
function cargarhistorial() {
  chartColumns_VA = new Array(); ///Columnas para el Histrograma de Vision y Altura 
  chartColumns_T = new Array(); ///Columnas para el Histrograma de Torque

  if ($('#tipo_busqueda').val() == "HM") {
    var url = dominio + "/json2/historial/HM/=/" + document.getElementById('hminput').value + "/=/_";
  } else {
    url = dominio + "/json2/historial/inicio/>/" + document.getElementById('fechai').value + "/</" + document.getElementById('fechaf').value;
  }
  fetch(url)
    .then(data => data.json())
    .then(data => {
      historialApp(data);
    })
    graficar(true, true)
};






async function historialApp(data) {
  try {
    const mostrar = await mostrarHistorial(data);
    console.log(mostrar);
    const descargar = await descargarHistorial(data);
    console.log(descargar);
    console.log('Tablas de descargas listas');

  } catch (error) {
    if (data.items == 0) {
      console.log("No hay coincidencias");
      alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
    } else {
      alertawarning.innerHTML = '';

    }
  }
}

function mostrarHistorial(data) {
  logArray = []
  document.getElementById('alertawarning').innerHTML = '';
  return new Promise(resovle => {
    console.log(data)
    var colnames = data.columns;
    // colnames.push("INTERVALO")
    // colnames.splice(colnames.indexOf("HM", 0, "INICIO"))
    colnames.splice(colnames.indexOf("INICIO"), 1)
    colnames.splice(colnames.indexOf("RESULTADO"), 0, "INICIO")
    colnames.splice(colnames.indexOf("FIN"), 1)
    colnames.splice(colnames.indexOf("RESULTADO"), 0, "FIN")
    colnames.splice(colnames.indexOf("RESULTADO"), 0, "INTERVALO")
    colnames.splice(colnames.indexOf("USUARIO"), 1)
    colnames.splice(colnames.indexOf("INTENTOS_VA"), 0, "USUARIO")
    colnames.splice(colnames.indexOf("NOTAS"), 1)
    colnames.splice(colnames.indexOf("SERIALES"), 0, "NOTAS")
    colnames.push("IMPRIMIR");
    colnames.push("COMENTARIO")
    //colnames.splice(colnames.indexOf("RESULTADO"), 0, "INTERVALO")
    console.log(colnames)

    var filas = data[colnames[0]].length;
    //CREACIÓN DE TABLA
    var myTableDiv = document.getElementById("resultado");
    var table = document.createElement('TABLE');
    var tableBody = document.createElement('TBODY');
    var Encabezados = document.createElement('THEAD');

    table.id = "myTable";
    table.classList.add('display');
    table.classList.add('nowrap');
    table.cellSpacing = "0";
    table.width = "100%";
    table.border = '2';
    table.appendChild(Encabezados);
    table.appendChild(tableBody);
    tableBody.align = "center";
    //FIN DE CREACIÓN DE TABLA

    //ENCABEZADOS DE LA TABLA
    var tr = document.createElement('TR');
    Encabezados.appendChild(tr);
    
    for (i = 0; i < colnames.length; i++) {
      var th = document.createElement('TH')
      var titulo = colnames[i].replace("_", " ")
      th.width = '100';
      //console.log(colnames[i]);
      if(titulo !== 'COMENTARIO'){
        th.appendChild(document.createTextNode(titulo));
      }
      tr.appendChild(th).style.backgroundColor = "#0DBED6";
    }
    //FILAS DE LA TABLA
    for (i = 0; i < filas; i++) {
      var tr = document.createElement('TR');
      for (j = 0; j < colnames.length; j++) {
        var td = document.createElement('TD')
        switch (colnames[j]) {
          case "HM":
              var selector  = document.createElement('input');
              const hm = data[colnames[j]][i];
              const pedidoId = data['ID'][i]; 
              selector.setAttribute('type', 'checkbox');
              selector.id = 'pedido'  
              selector.style.marginLeft = '0.5rem'
              selector.setAttribute('onclick', 'pedidoValue(this)')       
              selector.value = `{"HM":"${hm}","ID":"${pedidoId}"}`;
              td.appendChild(document.createTextNode(hm));
              td.appendChild(selector);
              break;
          case "VISION":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-file-alt");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-vision');
            boton.style.width = "60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
          case "ALTURA":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-file-alt");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-altura');
            boton.style.width = "60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
          case "INTENTOS_VA":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-file-alt");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-intentosva');
            boton.style.width = "60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
          case "TORQUE":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-file-alt");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-torque');
            boton.style.width = "60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
          case "RESULTADO":
            switch (data[colnames[j]][i]) {
              case 0:
                td.appendChild(document.createTextNode('RESET'));
                break;
              case 1:
                td.appendChild(document.createTextNode('TORQUE'))
                break;
              case 2:
                td.appendChild(document.createTextNode('VISION'))
                break;
            }
            break;
          case "ANGULO":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-file-alt");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-angulo');
            boton.style.width = "60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
          case "INTENTOS_T":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-file-alt");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-intentost');
            boton.style.width = "60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
          case "SCRAP":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-file-alt");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-scrap');
            boton.style.width = "60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
          case "SERIALES":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-barcode");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-seriales');
            boton.style.width = "60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            var texto = document.createElement('p');
            texto.appendChild(document.createTextNode(data[colnames[j]][i]))
            texto.style.display = "none";
            td.appendChild(texto);
            break;
          case "NOTAS":
            var nota = data[colnames[j]][i];
            dataParse = JSON.parse(nota);
            //console.log("Convertido a JSON: ",dataParse)
            dataKeys = Object.keys(dataParse)
            //console.log("dataKeys: ",dataKeys.length)
            // td.appendChild(document.createTextNode(nota));
            var div = document.createElement('div')
            div.classList = 'grid  auto-flow-column'
            for (let title = 0; title < dataKeys.length; title++) {
              const col = dataKeys[title];
              //console.log(col)
              let nav = document.createElement('nav');
              nav.innerHTML = `<b>${col}: </b>`;
              div.appendChild(nav);

              for (let x = 0; x < dataParse[col].length; x++) {
                const noteValue = dataParse[col][x];
                let p = document.createElement('p');
                p.innerHTML = noteValue;
                nav.appendChild(p);
              }
              div.appendChild(nav);
            }
            td.appendChild(div);
            break;
          case "IMPRIMIR":
            if (data["RESULTADO"][i] === 2) {
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-print");
              boton.title = "Imprimir";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-operacion');
              boton.value =
                boton.style.width = "60px";
              boton.appendChild(icono);
              td.appendChild(boton);
            } else {
              td.appendChild(document.createTextNode("NO DISPONIBLE"))
            }
            break;
          case "COMENTARIO":
            var boton_crear = document.createElement('button');
            boton_crear.title = "Insertar Comentario";
            boton_crear.classList.add('btn');
            boton_crear.classList.add('btn-info');
            boton_crear.classList.add('btn-insertar-comentario');
            boton_crear.value = data['ID'][i]
            boton_crear.innerHTML = 'Insertar Comentario';
            
            boton_ver = document.createElement('button');
            boton_ver.title = "Ver Comentarios"
            boton_ver.classList.add('btn')
            boton_ver.classList.add('btn-info')
            boton_ver.classList.add('btn-ver-comentario');
            boton_ver.value = data['HM'][i]
            boton_ver.innerHTML = 'Ver Comentario';
            // boton_crear.style.width = "60px";
            td.appendChild(boton_ver);
            td.appendChild(boton_crear);
          break;
          case "INTERVALO":
            fecha_fin_hora = new Date(data["FIN"][i]).getUTCHours()
            fecha_fin_min = new Date(data["FIN"][i]).getUTCMinutes()
            fecha_fin_seg = new Date(data["FIN"][i]).getUTCSeconds()

            fecha_inicio_hora = new Date(data["INICIO"][i]).getUTCHours()
            fecha_inicio_min = new Date(data["INICIO"][i]).getUTCMinutes()
            fecha_inicio_seg = new Date(data["INICIO"][i]).getUTCSeconds()
            // console.log(fecha_fin_hora - fecha_inicio_hora, data["ID"][i]);

            // if (transcurridoMinutos < 0) {
            //   transcurridoHoras--;
            //   transcurridoMinutos = 60 + transcurridoMinutos;
            // }
            transcurridoMinutos = fecha_fin_min - fecha_inicio_min;
            //console.log(transcurridoMinutos)
            transcurridoHoras = fecha_fin_hora - fecha_inicio_hora;
            //console.log(transcurridoHoras)
            transcurridoSegundos = fecha_fin_seg - fecha_inicio_seg;
            //console.log(transcurridoSegundos)

            if (transcurridoMinutos < 0) {
              transcurridoHoras--;
              transcurridoMinutos = 60 + transcurridoMinutos;
            }
            if (transcurridoSegundos < 0) {
              transcurridoMinutos--;
              transcurridoSegundos = 60 + transcurridoSegundos;
            }

            horas = transcurridoHoras.toString();
            minutos = transcurridoMinutos.toString();
            segundos = transcurridoSegundos.toString();


            //console.log(horas+":"+minutos+" "+segundos);
            let diferencia = horas <= 0 ? `${minutos} Minutos, y ${segundos} Segundos` : `${horas} Hora(s), ${minutos} Minutos, y ${segundos} Segundos`;
            td.appendChild(document.createTextNode(diferencia));
            break;
          default:
            td.appendChild(document.createTextNode(data[colnames[j]][i]));
            break;
        }

        tr.appendChild(td)
      }
      // console.log("Inicio",fecha_inicio, "Fin",fecha_fin); 
      // console.log("Difiere",fecha_inicio.from(fecha_fin), data["ID"][i]); 

      tableBody.appendChild(tr);
    }
    myTableDiv.appendChild(table);
    $(document).ready(function () {
      // Setup - add a text input to each footer cell
      $('#myTable thead tr')
          
          .addClass('filters')
          .appendTo('#myTable thead');
   
      var table = $('#myTable').DataTable({
          orderCellsBottom: true,
          responsive: true,
          initComplete: function () {
              var api = this.api();
              fuck = 0;
              // For each column
              api
                  .columns(5)
                  .eq(0)
                  .each(function (colIdx) {
                      // Set the header cell to contain the input element
                     // console.log(colIdx)
                      var cell = $('.filters th').eq(
                          $(api.column(colIdx).header()).index()
                      );
                      
                      var title = $(cell).text();
                      //console.log(cell)

                      $(cell).html(`<select id="selector" name="select">
                      <option value="">Resultado</option>
                      <option value="Vision">Vision</option>
                      <option value="Torque">Torque</option>
                      <option value="Reset">Reset</option>
                    </select>`);
   
                      // On every keypress in this input
                      $(
                          'select',
                          $('.filters th').eq($(api.column(colIdx).header()).index())
                      )
                          .off('keyup change')
                          .on('keyup change', function (e) {
                              e.stopPropagation();
                              // Get the search value
                              $(this).attr('value', $(this).val());
                              var regexr = '({search})'; //$(this).parents('th').find('select').val();
   
                              var cursorPosition = this.selectionStart;
                              // Search the column for that value
                              api
                                  .column(colIdx)
                                  .search(
                                      this.value != ''
                                          ? regexr.replace('{search}', '(((' + this.value + ')))')
                                          : '',
                                      this.value != '',
                                      this.value == ''
                                  )
                                  .draw();
   
                              $(this)
                                  .focus()[0]
                                  //.setSelectionRange(cursorPosition, cursorPosition);
                          });
                  });
          },
      });
  });
    setTimeout(() => {
      resovle('Las Tablas fueron Descargadas');
    }, 1000);
  });
};

function descargarHistorial(data) {
  return new Promise(resovle => {
    var colnames = data.columns;
    var filas = data[colnames[0]].length;
    //CREACIÓN DE TABLA PARA DESCARGAR HISTORIAL
    var myTableDiv_descarga = document.getElementById("descarga");
    var table_descarga = document.createElement('TABLE');
    var tableBody_descarga = document.createElement('TBODY');
    var Encabezados_descarga = document.createElement('THEAD');

    table_descarga.id = "myTable_descarga";
    table_descarga.classList.add('display');
    table_descarga.classList.add('nowrap');
    table_descarga.style.display = 'none';
    table_descarga.cellSpacing = "0";
    table_descarga.width = "100%";
    table_descarga.border = '2';
    table_descarga.appendChild(Encabezados_descarga);
    table_descarga.appendChild(tableBody_descarga);
    tableBody_descarga.align = "center";
    //FIN DE CREACIÓN DE TABLA PARA DESCARGAR HISTORIAL

    //CREACION DE LA TABLA PARA DESCARGAR TORQUE
    var torque = new Array();
    var cajaKeysT, cajaKeysV, cajaKeysA, cajaKeysAng
    let intentos_t = [];
    let vision = [];
    let altura = [];
    let intentos_va = [];
    let angulo = [];

    //ENCABEZADOS DE LA TABLA PARA DESCARGAR
    individuales = JSON.stringify(colnames);
    var tr = document.createElement('TR');
    Encabezados_descarga.appendChild(tr);
    colnames.splice(colnames.indexOf("VISION"), 3); // Comentar en caso de querer descargar la tabla original y no sencilla
    //console.log("columnas: ",colnames);
    colnames.splice(colnames.indexOf("SERIALES"), 1);
    colnames.splice(colnames.indexOf("RESULTADO"), 0, ("REFERENCIA"));
    colnames.splice(colnames.indexOf("FIN"), 0, ("HORA_INICIAL"));
    colnames.splice(colnames.indexOf("INTERVALO"), 0, "HORA_INICIAL", "HORA_FINAL");
    colnames.splice(colnames.indexOf("SCRAP"), 1);
    colnames.splice(colnames.indexOf("NOTAS"), 0, ("SCRAP"));
    colnames.splice(colnames.indexOf("TORQUE"), 1);
    colnames.splice(colnames.indexOf("INTENTOS_VA"), 1);
    colnames.splice(colnames.indexOf("INTENTOS_T"), 1);
    colnames.splice(colnames.indexOf("ANGULO"), 1); 
    colnames.splice(colnames.indexOf("IMPRIMIR"), 1); 
    colnames.splice(colnames.indexOf("COMENTARIO"), 1); 
    console.log(individuales); ///Conserva los nombres de los objetos originales

    for (i = 0; i < colnames.length; i++) {
      var th = document.createElement('TH')
      th.width = '100';
      th.appendChild(document.createTextNode(colnames[i]))
      tr.appendChild(th).style.backgroundColor = "#0DBED6";
    };

    
    for (i = 0; i < filas; i++) {
      var tr = document.createElement('TR');
      for (j = 0; j < colnames.length; j++) {
        var td = document.createElement('TD')
        let re = /null/g;
        let ul = document.createElement("ul");
        let colTitle;
        let boxTitle;
        switch (colnames[j]) {
          case "REFERENCIA":
            let referencia = JSON.parse(data["SERIALES"][i]);
            td.appendChild(document.createTextNode(referencia['REF']));
            break;
          case "RESULTADO":
            switch (data[colnames[j]][i]) {
              case 0:
                td.appendChild(document.createTextNode('RESET'));
                break;
              case 1:
                td.appendChild(document.createTextNode('TORQUE'))
                break;
              case 2:
                td.appendChild(document.createTextNode('VISION'))
                break;
            }
            break;
          case "NOTAS":
            colTitle = colnames[j];
            // console.log("Titulo: ",colnames[j]);
            // console.log("INTENTOS_T: ",data[colnames[j]][i]);
            dataParse = data[colTitle];
            //console.log(dataParse[i]);
            var cajas = JSON.parse(dataParse[i]);
            //console.log(cajas);
            boxTitle = Object.keys(cajas);
            //console.log(boxTitle);
            for (let x = 0; x < boxTitle.length; x++) {
              let li = document.createElement("li");

              const boxName = boxTitle[x];
              //console.log(boxName);// Titulo de la caja
              li.innerHTML = `<b>${boxName}<b>`;
              var boxCav = cajas[boxName];
              var elementos = Object.keys(cajas[boxName]); // Cantidades de datos la caja

              for (let y = 0; y < elementos.length; y++) {
                let p = document.createElement("p");
                const cavidad = elementos[y];
                //console.log(`${cavidad}:${boxCav[cavidad]}`);
                p.innerHTML = `&nbsp;${cavidad}:${boxCav[cavidad]}&nbsp;`;
                li.appendChild(p);
              }
              ul.appendChild(li);
            }
            td.appendChild(ul);
            // document.getElementById("informacion").appendChild(ul)
            break;
          case "SCRAP":
            colTitle = colnames[j];
            // console.log("Titulo: ",colnames[j]);
            // console.log("INTENTOS_T: ",data[colnames[j]][i]);
            dataParse = data[colTitle];
            //console.log(dataParse[i]);
            var cajas = JSON.parse(dataParse[i]);
            //console.log(cajas);
            boxTitle = Object.keys(cajas);
            //console.log(boxTitle);
            for (let x = 0; x < boxTitle.length; x++) {
              let li = document.createElement("li");

              const boxName = boxTitle[x];
              //console.log(boxName);// Titulo de la caja
              li.innerHTML = `<b>${boxName}<b>`;
              var boxCav = cajas[boxName];
              var elementos = Object.keys(cajas[boxName]); // Cantidades de datos la caja

              for (let y = 0; y < elementos.length; y++) {
                let p = document.createElement("p");
                const cavidad = elementos[y];
                //console.log(`${cavidad}:${boxCav[cavidad]}`);
                p.innerHTML = `&nbsp;${cavidad}:${boxCav[cavidad]}&nbsp;`;
                li.appendChild(p);
              }
              ul.appendChild(li);
            }
            td.appendChild(ul);
            // document.getElementById("informacion").appendChild(ul)
            break;
            case "INTERVALO":
              const dateEnd = moment.utc(new Date(data["FIN"][i]), "HH:mm:ss");
              const dateStart = moment.utc(new Date(data["INICIO"][i]), "HH:mm:ss");
  
              var hourEnd = Number(dateEnd.format('HH')) == 0 && dateStart.format('HH') === 1?  Number(dateEnd.format('HH')): 24;
              var hourStart = Number(dateStart.format('HH')) == 0 && dateEnd.format('HH') === 1?  Number(dateStart.format('HH')): 24;
              var dateDiference;
  
             // console.log(hourStart);
              //console.log(hourEnd);
  
              if (hourEnd >= hourStart) {
                dateDiference = dateEnd.diff(dateStart);
              } else {
                dateDiference = dateStart.diff(dateEnd);
              }
              //console.log(dateDiference);
  
              let duracion = moment.utc(dateDiference).format("HH:mm:ss")
              //console.log(duracion);
            td.appendChild(document.createTextNode(`${duracion}`));
              break;
          case "FIN":
            dateStamp = moment.utc((data[colnames[j]][i])).format("MM/DD/YYYY");
            td.appendChild(document.createTextNode(dateStamp));
            break;
          case "HORA_FINAL":
            dateStamp_inicio = moment.utc((data["FIN"][i])).format("HH:mm:ss")
            td.appendChild(document.createTextNode(dateStamp_inicio));
            break;
          case "HORA_INICIAL":
            dateStamp_inicio = moment.utc((data["INICIO"][i])).format("HH:mm:ss")
            td.appendChild(document.createTextNode(dateStamp_inicio));
            break;
          case "INICIO":
            dateStamp_inicio = moment.utc((data[colnames[j]][i])).format("MM/DD/YYYY");
            td.appendChild(document.createTextNode(dateStamp_inicio));
            break;
          default:
            td.appendChild(document.createTextNode(data[colnames[j]][i]));
            break;
        }
        tr.appendChild(td)
      }
      tableBody_descarga.appendChild(tr);
    }
    myTableDiv_descarga.appendChild(table_descarga);

    const colID = data[colnames[colnames.indexOf("ID")]];
    //FILAS DE LA TABLA PARA DESCARGAR
    for (i = 0; i < filas; i++) {
      let secciones = JSON.parse(individuales);
      //console.log(data[secciones[i]]);
      for (j = 0; j < secciones.length; j++) {

        switch (secciones[j]) {
          case "TORQUE":
            let columns = {};
            colTitle = secciones[j];
            dataParse = data[colTitle];

            var cajas = dataParse[i] == false ? "" : JSON.parse(dataParse[i]);
            cajaKeysT = Object.keys(cajas)
            //console.log(cajas["PDC-RMID"])
            var arraySection = [];
            var ObjectID_TOR = [cajaKeysT];
            //console.log(ObjectID_TOR)
            for (let index = 0; index < cajaKeysT.length; index++) {
              let titleArray = cajaKeysT[index]
              // let jsonString = JSON.stringify(cajas[cajaKeysT[index]])
              //arraySection[titleArray] = jsonString 
              columns = {
                ...cajas[cajaKeysT[index]]
              }
              ObjectID_TOR[titleArray] = cajas[cajaKeysT[index]];

              //console.log(ObjectID_TOR)
            };
            torque.push({
              ID: colID[i],
              ...ObjectID_TOR
            });
            break;
          case "ANGULO":
            let columns_ANG = {};
            colTitle = secciones[j];
            dataParse = data[colTitle];

            var cajas = dataParse[i] == false ? "" : JSON.parse(dataParse[i]);
            cajaKeysAng = Object.keys(cajas)
            //console.log(cajas["PDC-RMID"])
            var arraySection = [];
            var ObjectID_ANG = [cajaKeysAng];
            //console.log(ObjectID_ANG)
            for (let index = 0; index < cajaKeysAng.length; index++) {
              let titleArray = cajaKeysAng[index]
              // let jsonString = JSON.stringify(cajas[cajaKeysAng[index]])
              //arraySection[titleArray] = jsonString 
              columns_ANG = {
                ...cajas[cajaKeysAng[index]]
              }
              ObjectID_ANG[titleArray] = cajas[cajaKeysAng[index]];

              //console.log(ObjectID_ANG)
            };
            angulo.push({
              ID: colID[i],
              ...ObjectID_ANG
            });
            break;
          case "INTENTOS_VA":
            let columns_VA = {};
            colTitle = secciones[j];
            //console.log(colID);
            dataParse = data[colTitle];
            //console.log(dataParse);
            var cajas = dataParse[i] == false ? "" : JSON.parse(dataParse[i]);
            var cajaKeys = Object.keys(cajas)
            var arraySection = [];
            for (let index = 0; index < cajaKeys.length; index++) {
              let titleArray = cajaKeys[index];
              let jsonString = JSON.stringify(cajas[cajaKeys[index]])
              jsonString = jsonString.replace("{", "")
              jsonString = jsonString.split('"').join(' ');
              jsonString = jsonString.replace("}", " ")
              jsonString = jsonString.split("null").join('N/A ');
              jsonString = jsonString.split("vacio").join('N/A ');
              arraySection[titleArray] = jsonString;
              columns_VA = {
                ...arraySection
              }
            };
            let ObjectID_VA = {
              ID: colID[i],
              ...columns_VA
            };
            intentos_va.push(ObjectID_VA)
            break;
          case "INTENTOS_T":
            let columns_INTT = {};
            colTitle = secciones[j];
            dataParse = data[colTitle];

            var cajas = dataParse[i] == false ? "" : JSON.parse(dataParse[i]);
            cajaKeysIntt = Object.keys(cajas)
            //console.log(cajas["PDC-RMID"])
            var arraySection = [];
            var ObjectID_INTT = [cajaKeysIntt];
            //console.log(ObjectID_INTT)
            for (let index = 0; index < cajaKeysIntt.length; index++) {
              let titleArray = cajaKeysIntt[index]
              // let jsonString = JSON.stringify(cajas[cajaKeysIntt[index]])
              //arraySection[titleArray] = jsonString 
              columns_INTT = {
                ...cajas[cajaKeysIntt[index]]
              }
              ObjectID_INTT[titleArray] = cajas[cajaKeysIntt[index]];

              //console.log(ObjectID_INTT)
            };
            intentos_t.push({
              ID: colID[i],
              ...ObjectID_INTT
            });
            break;
          case "VISION":
            var columns_V = {};
            colTitle = secciones[j];
            dataParse = data[colTitle];
            //console.log(data[colTitle])                   
            var cajas = dataParse[i] == false ? '' : JSON.parse(dataParse[i]);
            var cajaKeys = Object.keys(cajas)
            if (cajaKeys.length !== 0) {
              //console.log(cajaKeys.length);
              cajaKeysV = cajaKeys
            }
            //console.log(cajaKeys)
            var arraySection = [];
            var ObjectID_VIS = [cajaKeys];
            //console.log(ObjectID_VIS)
            for (let index = 0; index < cajaKeys.length; index++) {
              let titleArray = cajaKeys[index]
              // let jsonString = JSON.stringify(cajas[cajaKeys[index]])
              //arraySection[titleArray] = jsonString;
              columns_V = {
                ...cajas[cajaKeys[index]]
              }
              ObjectID_VIS[titleArray] = cajas[cajaKeys[index]];
              //console.log(ObjectID_VIS)
            };
            vision.push({
              ID: colID[i],
              ...ObjectID_VIS
            });

            break;
          case "ALTURA":
            var columns_A = {};
            colTitle = secciones[j];
            dataParse = data[colTitle];
            //console.log(data[colTitle])                   
            var cajas = dataParse[i] == false ? '' : JSON.parse(dataParse[i]);
            var cajaKeys = Object.keys(cajas)
            if (cajaKeys.length !== 0) {
              //console.log(cajaKeys.length);
              cajaKeysA = cajaKeys
            }
            //console.log(cajaKeys)
            var arraySection = [];
            var ObjectID_ALT = [cajaKeys];
            //console.log(ObjectID_ALT)
            for (let index = 0; index < cajaKeys.length; index++) {
              let titleArray = cajaKeys[index]
              // let jsonString = JSON.stringify(cajas[cajaKeys[index]])
              //arraySection[titleArray] = jsonString;
              columns_A = {
                ...cajas[cajaKeys[index]]
              }
              ObjectID_ALT[titleArray] = cajas[cajaKeys[index]];
              //console.log(ObjectID_ALT)
            };
            altura.push({
              ID: colID[i],
              ...ObjectID_ALT
            });

            break;
        }
      }


    }
    /*----------------------------↓Torque↓--------------------------------------------*/
    //console.log(torque)
    var newTor = {}
    //console.log(cajaKeysT)
    cajaKeysT.unshift("ID")
    lastArray = cajaKeysT.length-1
    for (let torJ = 0; torJ < cajaKeysT.length; torJ++) {
      const boxT = cajaKeysT[torJ];
      arrayT = [];
      for (var i = 0; i < torque.length; i++) {
        if (torque[i][boxT] !== undefined) {
          if (boxT === "ID") {
            arrayT.push({
              'ID': torque[i][boxT]
            })
          }
          if (boxT !== 'ID') {
            arrayT.push(torque[i][boxT])
          }
        }else{
          //console.log(cajaKeysT[lastArray])
          torque[i][cajaKeysT[lastArray]] = 0;
          arrayT.push(torque[i][cajaKeysT[lastArray]]
          )
        }
        //console.log(torque[i][boxT],  'en', boxT)
      }
      newTor[boxT] = [...arrayT];
    };
    //console.log(newTor)

    /*----------------------------↓Angulo↓--------------------------------------------*/
    //console.log(angulo)
    var newAng = {}
    //console.log(cajaKeysAng)
    cajaKeysAng.unshift("ID")
    lastArray = cajaKeysAng.length-1
    for (let torJ = 0; torJ < cajaKeysAng.length; torJ++) {
      const boxT = cajaKeysAng[torJ];
      arrayT = [];
      for (var i = 0; i < angulo.length; i++) {
        if (angulo[i][boxT] !== undefined) {
          if (boxT === "ID") {
            arrayT.push({
              'ID': angulo[i][boxT]
            })
          }
          if (boxT !== 'ID') {
            arrayT.push(angulo[i][boxT])
          }
        }else{
          //console.log(cajaKeysAng[lastArray])
          angulo[i][cajaKeysAng[lastArray]] = 0;
          arrayT.push(angulo[i][cajaKeysAng[lastArray]]
          )
        }
        //console.log(angulo[i][boxT],  'en', boxT)
      }
      newAng[boxT] = [...arrayT];
    };
    //console.log(newAng)
    /*----------------------------↓Intentos T↓--------------------------------------------*/
    var newIntt = {}
    cajaKeysIntt.unshift("ID")
    //cajaKeysIntt.push("NULO")
    lastArray = cajaKeysV.length-1
    for (let torJ = 0; torJ < cajaKeysIntt.length; torJ++) {
      const boxT = cajaKeysIntt[torJ];
      arrayT = [];
      for (var i = 0; i < intentos_t.length; i++) {
        if (intentos_t[i][boxT] !== undefined) {
          if (boxT === "ID") {
            arrayT.push({
              'ID': intentos_t[i][boxT]
            })
          }
          if (boxT !== 'ID') {
            arrayT.push(intentos_t[i][boxT])
          }
        }else{
          //console.log(cajaKeysIntt[lastArray])
          intentos_t[i][cajaKeysIntt[lastArray]] = 0;
          arrayT.push(intentos_t[i][cajaKeysIntt[lastArray]])
        }
      }
      newIntt[boxT] = [...arrayT];
    };
    //console.log(newIntt)

    /*----------------------------↓Vision↓--------------------------------------------*/
    //console.log(vision)
    var newVis = {}
    //console.log(cajaKeysV)
    cajaKeysV.unshift("ID")
    //cajaKeysV.push("NULO")
    lastArray = cajaKeysV.length-1
    for (let b = 0; b < cajaKeysV.length-1; b++) {
      const boxV = cajaKeysV[b];
      arrayV = [];
      for (var i = 0; i < vision.length; i++) {
        if (vision[i][boxV] !== undefined) {
          if (boxV === "ID" ) {
            arrayV.push({
              'ID': vision[i][boxV]
            })
          }
          if (boxV !== 'ID') {
            arrayV.push(vision[i][boxV])
          }
        }else{
          vision[i][cajaKeysV[lastArray]] = 'N/A'
          arrayV.push({
           'NULO': vision[i][cajaKeysV[lastArray]]
          })
        }
        //console.log(vision[i][boxV],  'en', boxV)
      }
      newVis[boxV] = [...arrayV];
    };
    console.log(newVis)
    /*----------------------------↓altura↓--------------------------------------------*/
    //console.log(altura)
    var newAlt = {}
    //console.log(cajaKeysA)
    cajaKeysA.unshift("ID")
    cajaKeysA.push("NULO")
    lastArray = cajaKeysA.length-1
    for (let b = 0; b < cajaKeysA.length-1; b++) {
      const boxA = cajaKeysA[b];
      arrayA = [];
      //console.log(altura)
      for (var i = 0; i < altura.length; i++) {
        if (altura[i][boxA] !== undefined) {
          if (boxA === "ID") {
            arrayA.push({
              'ID': altura[i][boxA]
            })
          }
          if (boxA !== 'ID') {
            arrayA.push(altura[i][boxA])
          }
        }else{
          altura[i][cajaKeysA[lastArray]] = 'N/A'
          arrayA.push({
           'NULO': altura[i][cajaKeysA[lastArray]]
          })
        }
        //console.log(cajaKeysA[lastArray])
      }
      newAlt[boxA] = [...arrayA];
    };
    //console.log(newAlt)


    $(document).ready(function () {
      let exportar = document.createElement('button');
      exportar.id = "exportar";
      exportar.innerHTML = "Exportar a Excel <i class='far fa-file-excel'></i> ";
      exportar.classList = ('btn', 'btn-secondary', 'buttons-excel', 'buttons-html5', 'btn-success');
      exportar.onclick = function () {
        exportarExcel();
      };
      document.getElementById("descarga").appendChild(exportar);

      function exportarExcel() {
        //console.log(vision)  
        // get table
        var table = document.getElementById("descarga");
        var table2 = newTor;
        var table3 = newAng;
        var table4 = newIntt;
        var table5 = newVis;
        var table6 = newAlt;
        var table7 = intentos_va;
        let wideValue;
        // convert table to excel sheet
        var wb = XLSX.utils.table_to_book(table, {
          sheet: "Historial",
          origin: 'A2'
        });
        //var fila1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
        /*for (let columna = 0; columna < fila1.length; columna++) {
      const celda = fila1[columna];
      ws[`${celda}1`].s = {
        font: {
          name: "Arial",
          sz: 18,
          bold: true,
          color: { rgb: "111" },
        },
        fill: {
          bgColor: {rgb: "FFFF6550"}
        }
      };
   
    }*/
        /************TORQUE *******/
        wb.SheetNames.push("Torque");
        var ws2;
        var cadaCaja = Object.keys(table2) // 11 cajas actualmente
        var coordenada = 0
        let merge = [];
        var endMerge = -1
        var startMerge = 0
        for (let x = 0; x < cadaCaja.length; x++) {
          let eachbox = table2[cadaCaja[x]];
          encontrar(coordenada)
          ws2 = XLSX.utils.sheet_add_json(ws2, eachbox, {
            sheet: "Torque",
            origin: abc
          });
          //console.log(eachbox, abc, cadaCaja[x])
          ws2[abcT] = {
            t: 's',
            v: `${cadaCaja[x]}`
          }
          coordenada += (Object.keys(eachbox[1])).length
          //console.log(abcT)

          if ((Object.keys(eachbox[1])).length > 1) {
            ///console.log((Object.keys(eachbox[1])).length);
            endMerge += ((Object.keys(eachbox[1])).length);
          } else {
            endMerge += 1;
          }


          //console.log(`S: ${startMerge} X: ${x} S: ${endMerge}`) 
          merge.push({
            s: {
              r: 0,
              c: startMerge
            },
            e: {
              r: 0,
              c: endMerge
            }
          })
          if ((Object.keys(eachbox[1])).length > 1) {
            ///console.log((Object.keys(eachbox[1])).length);
            startMerge += ((Object.keys(eachbox[1])).length);
          } else {
            startMerge += 1;
          }



        }
        ws2['!merges'] = merge;
        wb.Sheets["Torque"] = ws2;

        /************ANGULO *******/
        wb.SheetNames.push("Angulo");
        var ws3;
        var cadaCaja = Object.keys(table3) // 11 cajas actualmente
        var coordenada = 0
        merge = [];
        endMerge = -1
        startMerge = 0
        for (let x = 0; x < cadaCaja.length; x++) {
          let eachbox = table3[cadaCaja[x]];
          encontrar(coordenada)
          ws3 = XLSX.utils.sheet_add_json(ws3, eachbox, {
            sheet: "Torque",
            origin: abc
          });
          //console.log(eachbox, abc, cadaCaja[x])
          ws3[abcT] = {
            t: 's',
            v: `${cadaCaja[x]}`
          }
          coordenada += (Object.keys(eachbox[1])).length
          //console.log(abcT)

          if ((Object.keys(eachbox[1])).length > 1) {
            ///console.log((Object.keys(eachbox[1])).length);
            endMerge += ((Object.keys(eachbox[1])).length);
          } else {
            endMerge += 1;
          }


          //console.log(`S: ${startMerge} X: ${x} S: ${endMerge}`) 
          merge.push({
            s: {
              r: 0,
              c: startMerge
            },
            e: {
              r: 0,
              c: endMerge
            }
          })
          if ((Object.keys(eachbox[1])).length > 1) {
            ///console.log((Object.keys(eachbox[1])).length);
            startMerge += ((Object.keys(eachbox[1])).length);
          } else {
            startMerge += 1;
          }



        }
        ws3['!merges'] = merge;
        wb.Sheets["Angulo"] = ws3;


        /************INTENTOS T *******/
        wb.SheetNames.push("Intentos-t");
        var ws4;
        var cadaCaja = Object.keys(table4) // 11 cajas actualmente
        var coordenada = 0
        merge = [];
        endMerge = -1
        startMerge = 0
        for (let x = 0; x < cadaCaja.length; x++) {
          let eachbox = table4[cadaCaja[x]];
          encontrar(coordenada)
          ws4 = XLSX.utils.sheet_add_json(ws4, eachbox, {
            sheet: "Intentos-t",
            origin: abc
          });
          //console.log(eachbox, abc, cadaCaja[x])
          ws4[abcT] = {
            t: 's',
            v: `${cadaCaja[x]}`
          }
          coordenada += (Object.keys(eachbox[1])).length
          //console.log(abcT)

          if ((Object.keys(eachbox[1])).length > 1) {
            ///console.log((Object.keys(eachbox[1])).length);
            endMerge += ((Object.keys(eachbox[1])).length);
          } else {
            endMerge += 1;
          }
          //console.log(`S: ${startMerge} X: ${x} S: ${endMerge}`) 
          merge.push({
            s: {
              r: 0,
              c: startMerge
            },
            e: {
              r: 0,
              c: endMerge
            }
          })
          if ((Object.keys(eachbox[1])).length > 1) {
            ///console.log((Object.keys(eachbox[1])).length);
            startMerge += ((Object.keys(eachbox[1])).length);
          } else {
            startMerge += 1;
          }
        }
        ws4['!merges'] = merge;
        wb.Sheets["Intentos-t"] = ws4;





        /************VISION**********/
        wb.SheetNames.push("Vision");
        var ws5;
        cadaCaja = Object.keys(table5) // 8 cajas actualmente
        //console.log(cadaCaja)
        coordenada = 0
        merge = [];
        endMerge = -1
        startMerge = 0
        for (let x = 0; x < cadaCaja.length; x++) {
        wideValue = 0
        let eachbox = table5[cadaCaja[x]];
          //console.log(eachbox)

           for (let u = 0; u < eachbox.length; u++) {
             if (!eachbox[u].hasOwnProperty('NULO')){
               //console.log(eachbox[u])
               wideValue = Object.keys(eachbox[u]).length
               if (wideValue !== 1){
                wideValue += 1;
               }
             }
           }
            //console.log( wideValue)

           if (cadaCaja[x] !== 'PDC-RMID') {
             //console.log(eachbox[x])
             encontrarV(coordenada)
           } 
           else {
             abc = 'EX2'
             abcT = 'EX1'
           }

          ws5 = XLSX.utils.sheet_add_json(ws5, eachbox, {
            sheet: "Vision",
            origin: abc
          });
          //console.log(eachbox, abc, cadaCaja[x])
          ws5[abcT] = {
            t: 's',
            v: `${cadaCaja[x]}`
          }
          let boxkeys = wideValue
          coordenada += wideValue;

          //console.log(coordenada)
          //console.log(abcT)
          if (boxkeys > 1) {
            //console.log('Volumen de la caja: ', boxkeys);
            endMerge += (boxkeys);
          } else {
            //console.log(boxkeys);
            endMerge += 1;
          }
          //console.log(`S: ${startMerge} E: ${endMerge}`)

          merge.push({
            s: {
              r: 0,
              c: startMerge
            },
            e: {
              r: 0,
              c: endMerge
            }
          })
          if (wideValue > 1) {
            ///console.log(wideValue);
            startMerge += (wideValue);
          } else {
            startMerge += 1;
          }
          //console.log('----------Vision-----------')
        }
        ws5['!merges'] = merge;
        wb.Sheets["Vision"] = ws5;


        /************ALTURA *******/
        wb.SheetNames.push("Altura");
        var ws6;
        cadaCaja = Object.keys(table6) // 8 cajas actualmente
        //console.log(cadaCaja)
        coordenada = 0
        merge = [];
        endMerge = -1
        startMerge = 0
        for (let x = 0; x < cadaCaja.length; x++) {
        wideValue = 0
        let eachbox = table6[cadaCaja[x]];
          //console.log(eachbox)

           for (let u = 0; u < eachbox.length; u++) {
             if (!eachbox[u].hasOwnProperty('NULO')){
               //console.log(eachbox[u])
               wideValue = Object.keys(eachbox[u]).length
               if (wideValue !== 1){
                wideValue += 1;
               }
             }
           }
            //console.log( wideValue)

           if (cadaCaja[x] !== 'PDC-RMID') {
             //console.log(eachbox[x])
             encontrarV(coordenada)
           } 
           else {
             abc = 'EX2'
             abcT = 'EX1'
           }

          ws6 = XLSX.utils.sheet_add_json(ws6, eachbox, {
            sheet: "Vision",
            origin: abc
          });
          //console.log(eachbox, abc, cadaCaja[x])
          ws6[abcT] = {
            t: 's',
            v: `${cadaCaja[x]}`
          }
          let boxkeys = wideValue
          coordenada += wideValue;

          //console.log(coordenada)
          //console.log(abcT)
          if (boxkeys > 1) {
            //console.log('Volumen de la caja: ', boxkeys);
            endMerge += (boxkeys);
          } else {
            //console.log(boxkeys);
            endMerge += 1;
          }
          //console.log(`S: ${startMerge} E: ${endMerge}`)

          merge.push({
            s: {
              r: 0,
              c: startMerge
            },
            e: {
              r: 0,
              c: endMerge
            }
          })
          if (wideValue > 1) {
            ///console.log(wideValue);
            startMerge += (wideValue);
          } else {
            startMerge += 1;
          }
          //console.log('----------Altura-----------')
        }
        ws6['!merges'] = merge;
        wb.Sheets["Altura"] = ws6;

        /************INTENTOS VA *******/
        wb.SheetNames.push("Intentos-va");
        var ws7 = XLSX.utils.json_to_sheet(table7, {
          sheet: "Intentos-va"
        });
        wb.Sheets["Intentos-va"] = ws7;

        // wb.SheetNames.push("EJEMPLO")
        // const workers = [{
        //     'Name': 'George',
        //     'Height': '69',
        //     'Weight': '112'
        //   },
        //   {
        //     'Name': 'John',
        //     'Height': '71',
        //     'Weight': '120'
        //   },
        // ]
        // workers.unshift({
        //   'Name': '',
        //   'Height': '',
        //   'Weight': ''
        // }, {
        //   'Name': '',
        //   'Height': '',
        //   'Weight': ''
        // })
        // const ws8 = XLSX.utils.json_to_sheet(workers, {skipHeader: true})
        // ws8.A1={t: 's', v: 'Name'}
        // ws8.B1={t: 's', v: 'Measurements'}
        // ws8.C1={t: 's', v: 'Height'}
        // ws8.D1={t: 's', v: 'Weight'}
        // ws8['!merges'] =[{ s: { r:0, c:0 }, e: { r:0, c:0 } },
        //         { s: { r:0, c:0 }, e: { r:0, c:1 } },
        //         { s: { r:0, c:3 }, e: { r:0, c:4 } },
        //         { s: { r:0, c:5 }, e: { r:0, c:9 } }]
        //         /// s= sart, r=row, c=col, e=end
        // wb.Sheets["EJEMPLO"] = ws8;

        // write sheet to blob
       var blob = new Blob([s2ab(XLSX.write(wb, {
         bookType: 'xlsx',
         type: 'binary'
       }))], {
         type: "application/octet-stream"
       });
       // return sheet file
       return saveAs(blob, "Fujikura Automotive México Piedras Negras.xlsx");
      };

      function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }
    });
    setTimeout(() => {
      resovle('Las Tablas estan listas para ser descargadas');
    }, 1000);
  });
}

function encontrar(coordenada) {
  const abecedario = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z']
  //console.log(coordenada)
  var decena = -1; // 0 representa A en el abecedario
  while (coordenada >= 25) {
    coordenada -= 25;
    decena++; //decena es lo equivalente a la segunda posicion de la coordenada, ejemplo:
    // AB1 donde A es la decena
  }
  if (decena >= 0) {
    //console.log(`${abecedario[decena]}${abecedario[coordenada]}${1}`);
    abc = `${abecedario[decena]}${abecedario[coordenada]}${2}`;
    abcT = `${abecedario[decena]}${abecedario[coordenada]}${1}`
  } else {
    //console.log(`${abecedario[coordenada]}${1}`)
    abc = `${abecedario[coordenada]}${2}`
    abcT = `${abecedario[coordenada]}${1}`
  }
  //console.log(abc)
  return abc, abcT;
}

function encontrarV(coordenada) {
  const abecedario = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z']
  //console.log(abecedario[0])
  //console.log('Cordenada: ', coordenada)
  var decena = -1;
  while (coordenada > 25) {
    coordenada -= 26;
    decena++; //decena es lo equivalente a la segunda posicion de la coordenada, ejemplo:
    //console.log(coordenada); // AB1 donde A es la decena
  }
  if (decena >= 0) {
    //console.log(`${abecedario[decena]}${abecedario[coordenada]}${1}`);
    abc = `${abecedario[decena]}${abecedario[coordenada]}${2}`;
    abcT = `${abecedario[decena]}${abecedario[coordenada]}${1}`
  } else {
    //console.log(`${abecedario[coordenada]}${1}`)
    abc = `${abecedario[coordenada]}${2}`
    abcT = `${abecedario[coordenada]}${1}`
  }
  //console.log(abc)
  return abc, abcT;
}


$(document).on('click', '.btn-ver-vision', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;

    fetch(dominio + "/api/get/historial/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let re = /null/g;
        if (data[id_info] == "" || data[id_info] == "{}") {
          var b = document.createElement('b');
          b.innerHTML="SIN DATOS";
          document.getElementById("informacion").appendChild(b);
        }else{
          // console.log(data);
          dataParse = JSON.parse(data[id_info]);
          console.log("Convertido a JSON: ",dataParse)
        // console.log(data[header_info]);
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          let cavidades = dataParse[caja];
          let anulados = 0;
          // console.log("Aqui esta la CAJA:",caja);
          //console.log("Aquí en object: ",cavidades)
          let get_cavidad = Object.getOwnPropertyNames(cavidades);
          let grid = document.createElement("div");
          grid.classList = "grid-box";
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            //console.log(cavidades[obj_cavidad])
            if (cavidades[obj_cavidad] === null || cavidades[obj_cavidad] === 'vacio') {
              //console.log(cavidades[obj_cavidad]);
              anulados++
            }else{
              let valores = JSON.stringify(cavidades[obj_cavidad]);
              //console.log("Aqui en string: ",valores)
              
            
              let boxValue = valores.replace(re, 'N/A'); 
              span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
              grid.appendChild(span);
            }
          }
         if(get_cavidad.length !== anulados){
           nav.innerHTML = "<b>" + caja + "</b>";
           div.appendChild(nav);
           nav.appendChild(grid);
         }
        }         
        document.getElementById("informacion").appendChild(div)
        //let alturaValue = data[header_info].replace(re, 'N/A');
        // console.log(alturaValue);
        //document.getElementById("informacion").innerHTML = alturaValue;
        }
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/historial/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
      let re = /null/g;
      if (data[header_info] == "" || data[header_info] == "{}") {
        var b = document.createElement('b');
        b.innerHTML="SIN DATOS";
        document.getElementById("informacion").appendChild(b);
      }else{
        // console.log(data);
        dataParse = JSON.parse(data[header_info]);
        console.log("Convertido a JSON: ",dataParse)
      // console.log(data[header_info]);
      dataKeys = Object.keys(dataParse)
      // console.log("dataKeys: ",dataKeys)
      let div = document.createElement("div");
      for (let i = 0; i < dataKeys.length; i++) {
        let nav = document.createElement("nav");
        let caja = dataKeys[i];
        nav.id = "titulo-caja"
        let cavidades = dataParse[caja];
        let anulados = 0;
        // console.log("Aqui esta la CAJA:",caja);
        //console.log("Aquí en object: ",cavidades)
        let get_cavidad = Object.getOwnPropertyNames(cavidades);
        let grid = document.createElement("div");
        grid.classList = "grid-box";
        for (let j = 0; j < get_cavidad.length; j++) {

          let obj_cavidad = get_cavidad[j];
          //console.log ("cavidad",obj_cavidad);
          //console.log ("valor",cavidades[obj_cavidad]);
          let span = document.createElement("span");
          span.classlist = "caja-valor";
          //console.log(cavidades[obj_cavidad])
          if (cavidades[obj_cavidad] === null || cavidades[obj_cavidad] === 'vacio') {
            //console.log(cavidades[obj_cavidad]);
            anulados++
          }else{
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            
          
            let boxValue = valores.replace(re, 'N/A'); 
            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }
       if(get_cavidad.length !== anulados){
         nav.innerHTML = "<b>" + caja + "</b>";
         div.appendChild(nav);
         nav.appendChild(grid);
       }
      }         
      document.getElementById("informacion").appendChild(div)
      //let alturaValue = data[header_info].replace(re, 'N/A');
      // console.log(alturaValue);
      //document.getElementById("informacion").innerHTML = alturaValue;
      }
        $('#mostrar').click();
      })
  }

});
$(document).on('click', '.btn-ver-altura', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/historial/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let re = /null/g;
        if (data[id_info] == "" || data[id_info] == "{}") {
          var b = document.createElement('b');
          b.innerHTML="SIN DATOS";
          document.getElementById("informacion").appendChild(b);
        }else{
          // console.log(data);
          dataParse = JSON.parse(data[id_info]);
          console.log("Convertido a JSON: ",dataParse)
        // console.log(data[header_info]);
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        var cajasAnuladas = 0
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          let cavidades = dataParse[caja];
          let anulados = 0;
          // console.log("Aqui esta la CAJA:",caja);
          //console.log("Aquí en object: ",cavidades)
          let get_cavidad = Object.getOwnPropertyNames(cavidades);
          let grid = document.createElement("div");
          grid.classList = "grid-box";
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            //console.log(cavidades[obj_cavidad])
            if (cavidades[obj_cavidad] === null || cavidades[obj_cavidad] === 'vacio') {
              //console.log(cavidades[obj_cavidad]);
              anulados++
            }else{
              let valores = JSON.stringify(cavidades[obj_cavidad]);
              //console.log("Aqui en string: ",valores)
              
            
              let boxValue = valores.replace(re, 'N/A'); 
              span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
              grid.appendChild(span);
            }
          }
         if(get_cavidad.length !== anulados){
           nav.innerHTML = "<b>" + caja + "</b>";
           div.appendChild(nav);
           nav.appendChild(grid);
          }
           else{
             cajasAnuladas++
          }
        }  
        if (dataKeys.length !== cajasAnuladas) {
          document.getElementById("informacion").appendChild(div)
        }else{
          let b = document.createElement('b')
          b.innerHTML = 'CAJAS VACIAS'
          document.getElementById("informacion").appendChild(b)
        }
        //let alturaValue = data[header_info].replace(re, 'N/A');
        // console.log(alturaValue);
        //document.getElementById("informacion").innerHTML = alturaValue;
        }
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/historial/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        // console.log(data);
        // console.log(data[header_info]);
        let re = /null/g;
        dataParse = JSON.parse(data[header_info]);
        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }

        document.getElementById("informacion").appendChild(div)

        //let alturaValue = data[header_info].replace(re, 'N/A');
        // console.log(alturaValue);
        //document.getElementById("informacion").innerHTML = alturaValue;
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-intentosva', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/historial/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = id_info.replace(/ /g, "_");
        console.log(headerString)
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;
        console.log("Convertido a JSON: ", dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");

        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          if (isNaN(dataParse[caja])) {
            nav.innerHTML = "<h4 style='font-size: larger;'>" + caja + "</h4>";
            div.appendChild(nav);

            //console.log("Aqui esta la CAJA:",caja);
            console.log("Aquí en object: ", dataParse[caja])



            let get_cavidad = Object.getOwnPropertyNames(dataParse[caja]);
            let object_value = dataParse[caja]
            let flex = document.createElement("div");
            flex.classList = "flex-box justify-around";
            //flex.classList = "flex-box";
            nav.appendChild(flex);
            for (let j = 0; j < get_cavidad.length - 1; j++) {

              let obj_cavidad = get_cavidad[j];
              //console.log ("cavidad",obj_cavidad);

              //console.log ("valor",object_value[obj_cavidad]);
              let span = document.createElement("span");
              span.classlist = "caja-valor";
              span.innerHTML = `<b>${obj_cavidad} <br> <b>`
              //console.log("Aqui en string: ",valores)
              valores = object_value[obj_cavidad]
              let boxValue = Object.keys(valores);
              //console.log(boxValue.length)
              if (boxValue.length !== 0) {
                for (let y = 0; y < boxValue.length; y++) {
                  //console.log(boxValue[y])
                  let p = document.createElement("p");
                  const constante = boxValue[y];
                  var valor = JSON.stringify(valores[boxValue[y]])
                  valor = valor.replace('{', '');
                  valor = valor.replace('}', '');
                  valor = valor.replace(/"/g, ' ');
                  //console.log(Object.keys(valor).length)
                  p.innerHTML = `${constante}: ${valor}`;
                  //console.log(`<b>${constante}</b>: ${valor}`)
                  span.appendChild(p)
                }
              } else {
                let p = document.createElement("p");
                p.innerHTML = `Vacío`;
                //console.log(`<b>${constante}</b>: ${valor}`)
                span.appendChild(p)
              }
              flex.appendChild(span);

            }

          } else {
            div.classList = 'grid-box-1fr'
            nav.innerHTML = "<b>" + caja + "</b>" + ' : ' + dataParse[caja];
            div.appendChild(nav)
          }

        }
        document.getElementById("informacion").appendChild(div)

        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/historial/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        
        // console.log(data);
        // console.log(data[header_info]);
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        console.log(headerString)
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;
        console.log("Convertido a JSON: ", dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");

        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          if (isNaN(dataParse[caja])) {
            nav.innerHTML = "<h4 style='font-size: larger;'>" + caja + "</h4>";
            div.appendChild(nav);

            //console.log("Aqui esta la CAJA:",caja);
            console.log("Aquí en object: ", dataParse[caja])



            let get_cavidad = Object.getOwnPropertyNames(dataParse[caja]);
            let object_value = dataParse[caja]
            let flex = document.createElement("div");
            flex.classList = "flex-box justify-around";
            //flex.classList = "flex-box";
            nav.appendChild(flex);
            for (let j = 0; j < get_cavidad.length - 1; j++) {

              let obj_cavidad = get_cavidad[j];
              //console.log ("cavidad",obj_cavidad);

              //console.log ("valor",object_value[obj_cavidad]);
              let span = document.createElement("span");
              span.classlist = "caja-valor";
              span.innerHTML = `<b>${obj_cavidad} <br> <b>`
              //console.log("Aqui en string: ",valores)
              valores = object_value[obj_cavidad]
              let boxValue = Object.keys(valores);
              console.log(boxValue.length)
              if (boxValue.length !== 0) {
                for (let y = 0; y < boxValue.length; y++) {
                  //console.log(boxValue[y])
                  let p = document.createElement("p");
                  const constante = boxValue[y];
                  var valor = JSON.stringify(valores[boxValue[y]])
                  valor = valor.replace('{', '');
                  valor = valor.replace('}', '');
                  valor = valor.replace(/"/g, ' ');
                  console.log(Object.keys(valor).length)
                  p.innerHTML = `${constante}: ${valor}`;
                  //console.log(`<b>${constante}</b>: ${valor}`)
                  span.appendChild(p)
                }
              } else {
                let p = document.createElement("p");
                p.innerHTML = `Vacío`;
                //console.log(`<b>${constante}</b>: ${valor}`)
                span.appendChild(p)
              }
              flex.appendChild(span);

            }

          } else {
            div.classList = 'grid-box-1fr'
            nav.innerHTML = "<b>" + caja + "</b>" + ' : ' + dataParse[caja];
            div.appendChild(nav)
          }

        }
        document.getElementById("informacion").appendChild(div)

        //let alturaValue = data[header_info].replace(re, 'N/A');
        // console.log(alturaValue);
        //document.getElementById("informacion").innerHTML = alturaValue;
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-torque', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/historial/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[id_info]);
        if (data[id_info] == "" || data[id_info] == "{}") {
          var b = document.createElement('b');
          b.innerHTML="SIN DATOS";
          document.getElementById("informacion").appendChild(b);
        }else{
        // console.log(data);
        // console.log(data[header_info]);
        let re = /null/g;
        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          let cavidades = dataParse[caja];
          let anulados = 0;
          //console.log("Aqui esta la CAJA:",caja);
          //console.log("Aqui en object: ",cavidades)
          let get_cavidad = Object.getOwnPropertyNames(cavidades);
          let grid = document.createElement("div");
          grid.classList = "grid-box";
          for (let j = 0; j < get_cavidad.length; j++) {
            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            //console.log(cavidades[obj_cavidad])
            if (cavidades[obj_cavidad] === null || cavidades[obj_cavidad] === 'vacio') {
              //console.log(cavidades[obj_cavidad]);
              anulados++
            }else{
              let valores = JSON.stringify(cavidades[obj_cavidad]);
              //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A'); 
            let unidadMedida = boxValue === 'N/A' ? '' : 'Nm';
            span.innerHTML = `<p>${obj_cavidad}: ${boxValue} ${unidadMedida}</p>`;
            grid.appendChild(span);
          }
        }
         if(get_cavidad.length !== anulados){
           nav.innerHTML = "<b>" + caja + "</b>";
           div.appendChild(nav);
           nav.appendChild(grid);
         }
        }
        document.getElementById("informacion").appendChild(div)
      }
        $('#mostrar').click();
      })
  } else {
    //console.log("ID del registro: ",id_info);
    //console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/historial/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        // console.log(data);
        // console.log(data[header_info]);
        let re = /null/g;
        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {
            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');
            let unidadMedida = boxValue === 'N/A' ? '' : 'Nm';
            span.innerHTML = `<p>${obj_cavidad}: ${boxValue} ${unidadMedida}</p>`;
            grid.appendChild(span);
          }
        }

        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-angulo', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/historial/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        if (data[id_info] == "") {
          var b = document.createElement('b');
          b.innerHTML="SIN DATOS";
          document.getElementById("informacion").appendChild(b);
        } else {
          let re = /null/g;
          dataParse = JSON.parse(data[id_info]);
          dataKeys = Object.keys(dataParse)
          let div = document.createElement("div");
          for (let i = 0; i < dataKeys.length; i++) {
            let nav = document.createElement("nav");
            let caja = dataKeys[i];
            let cavidades = dataParse[caja];
            let get_cavidad = Object.getOwnPropertyNames(cavidades);
            let grid = document.createElement("div");
            let anulados = 0;
            grid.classList = "grid-box";
            nav.appendChild(grid);
            for (let j = 0; j < get_cavidad.length; j++) {
              let obj_cavidad = get_cavidad[j];
              let span = document.createElement("span");
              span.classlist = "caja-valor";
              if (cavidades[obj_cavidad] === null || cavidades[obj_cavidad] === 'vacio') {
                //console.log(cavidades[obj_cavidad]);
                anulados++
              }else{
                let valores = JSON.stringify(cavidades[obj_cavidad]);
                //console.log("Aqui en string: ",valores)
              let boxValue = valores.replace(re, 'N/A'); 
              let unidadMedida = boxValue === 'N/A' ? '' : '°';
              span.innerHTML = `<p>${obj_cavidad}: ${boxValue} ${unidadMedida}</p>`;
              grid.appendChild(span);
            }
            }
            if(get_cavidad.length !== anulados){
              nav.innerHTML = "<b>" + caja + "</b>";
              div.appendChild(nav);
              nav.appendChild(grid);
            }
          }
          document.getElementById("informacion").appendChild(div)
        }
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/historial/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        // console.log(data);
        // console.log(data[header_info]);
        if (data[header_info] == "") {
          document.getElementById("informacion").appendChild(document.createTextNode("N/A"));
        } else {
          let re = /null/g;
          dataParse = JSON.parse(data[header_info]);
          // console.log("Convertido a JSON: ",dataParse)
          dataKeys = Object.keys(dataParse)
          // console.log("dataKeys: ",dataKeys)
          let div = document.createElement("div");
          for (let i = 0; i < dataKeys.length; i++) {
            let nav = document.createElement("nav");
            let caja = dataKeys[i];
            nav.id = "titulo-caja"
            nav.innerHTML = "<b>" + caja + "</b>";
            div.appendChild(nav);

            // console.log("Aqui esta la CAJA:",caja);
            let cavidades = dataParse[caja];
            //console.log("Aquí en object: ",cavidades)

            let get_cavidad = Object.getOwnPropertyNames(cavidades);

            let grid = document.createElement("div");
            grid.classList = "grid-box";
            nav.appendChild(grid);
            for (let j = 0; j < get_cavidad.length; j++) {

              let obj_cavidad = get_cavidad[j];
              //console.log ("cavidad",obj_cavidad);
              //console.log ("valor",cavidades[obj_cavidad]);
              let span = document.createElement("span");
              span.classlist = "caja-valor";
              let valores = JSON.stringify(cavidades[obj_cavidad]);
              //console.log("Aqui en string: ",valores)
              let boxValue = valores.replace(re, 'N/A');

              span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
              grid.appendChild(span);
            }
          }

          document.getElementById("informacion").appendChild(div)
        }
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-intentost', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/historial/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        let headerString = id_info.replace(/ /g, "_");
        document.getElementById("informacion").innerHTML = "";
        if (data[headerString] == "" || data[headerString] == "{}") {
          var b = document.createElement('b');
          b.innerHTML="SIN DATOS";
          document.getElementById("informacion").appendChild(b);
        }else{
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
          let cavidades = dataParse[caja];
          let anulados = 0;
          //console.log("Aqui esta la CAJA:",caja);
          //console.log("Aquí en object: ",cavidades)
          let get_cavidad = Object.getOwnPropertyNames(cavidades);
          let grid = document.createElement("div");
          grid.classList = "grid-box";
          for (let j = 0; j < get_cavidad.length; j++) {
            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            //console.log(cavidades[obj_cavidad])
            if (cavidades[obj_cavidad] === 0) {
              //console.log(cavidades[obj_cavidad]);
              anulados++
            }else{
              let valores = JSON.stringify(cavidades[obj_cavidad]);
              //console.log("Aqui en string: ",valores)
              
             
              let boxValue = valores.replace(re, 'N/A'); 
              span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
              grid.appendChild(span);
            }
          }
         if(get_cavidad.length !== anulados){
           nav.innerHTML = "<b>" + caja + "</b>";
           div.appendChild(nav);
           nav.appendChild(grid);
         }
        }
        document.getElementById("informacion").appendChild(div)
      }
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    let headerString = header_info.replace(/ /g, "_");
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/historial/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
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
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }

        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-scrap', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/historial/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        if (data[id_info] == "" || data[id_info] == "{}") {
          var b = document.createElement('b');
          b.innerHTML="SIN DATOS";
          document.getElementById("informacion").appendChild(b);
        }else{
        // console.log(data);
        // console.log(data[header_info]);
        let re = /0/g;
        dataParse = JSON.parse(data[id_info]);
        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }

        document.getElementById("informacion").appendChild(div)
      }
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/historial/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        // console.log(data);
        // console.log(data[header_info]);
        let re = /0/g;
        dataParse = JSON.parse(data[header_info]);
        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }

        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-seriales', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/historial/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        // console.log(data);
        // console.log(data[header_info]);
        let re = /0/g;
        dataParse = JSON.parse(data[id_info]);
        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          //console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          // console.log("Aquí en object: ",cavidades)



          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);

          let span = document.createElement("span");
          span.classlist = "caja-valor";
          span.innerHTML = `<p>${cavidades}</p>`;
          nav.appendChild(span);
        }

        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })

  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/historial/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        // console.log(data);
        // console.log(data[header_info]);
        let re = /0/g;
        dataParse = JSON.parse(data[header_info]);
        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          //console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          // console.log("Aquí en object: ",cavidades)



          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);

          let span = document.createElement("span");
          span.classlist = "caja-valor";
          span.innerHTML = `<p>${cavidades}</p>`;
          nav.appendChild(span);
        }

        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-operacion', function () {

  document.getElementById("informacion").innerHTML = "";
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");

  var id_info_responsive = header.parent().prev().find("td:first").text();
  //console.log(id_info);
  document.getElementById("header").innerHTML = id_info;
  let div = document.createElement("div");
  //div.classList = `flex-box justify-evenly`;
  if (isNaN(id_info)) {
    fetch(dominio + "/api/get/historial/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        // console.log(id_info)//columna donde los valores entrarán
        console.log(id_info_responsive) //
        //console.log(data["FIN"]);
        /**OBTENIENDO LOS DATOS DEL ARCHIVO PARA IMPRIMIR**/
        let dataParse_serial = JSON.parse(data["SERIALES"]);

        var dateYear = new Date(data["INICIO"]).getUTCFullYear()
        var dateMonth = new Date(data["INICIO"]).getUTCMonth() + 1;
        var dateDay = new Date(data["INICIO"]).getUTCDate()
        var dateHour = new Date(data["INICIO"]).getUTCHours()
        var dateMinutes = new Date(data["INICIO"]).getUTCMinutes()
        var dateSeconds = new Date(data["INICIO"]).getUTCSeconds()
        dateHour = dateHour < 10 ? '0' + dateHour : dateHour;
        dateMonth = dateMonth < 10 ? '0' + dateMonth : dateMonth;
        dateDay = dateDay < 10 ? '0' + dateDay : dateDay;
        dateMinutes = dateMinutes < 10 ? '0' + dateMinutes : dateMinutes;
        dateSeconds = dateSeconds < 10 ? '0' + dateSeconds : dateSeconds;
        //console.log(dateYear)
        //console.log(dateMonth)
        var dateStamp = dateYear + "/" + dateMonth + "/" + dateDay + " " + dateHour + ":" + dateMinutes + ":" + dateSeconds
        console.log(dateStamp)

        let torque = JSON.parse(data["TORQUE"]);
        // console.log("Convertido a JSON_serial",dataParse_serial);
        // console.log("Convertido a JSON_torque",torque);
        var hm = dataParse_serial["HM"];
        //console.log(hm);
        var ref = dataParse_serial["REF"];
        //console.log(ref);
        /**CREANDO LA ESTRUCTURA DEL FORMATO**/

        var hmText = document.createElement("input");
        hmText.id = "hmText";
        var hmBox = document.createElement("span");

        var refText = document.createElement("input");
        refText.id = "refText";
        var refBox = document.createElement("span");
        var finText = document.createElement("input");
        finText.id = "finText";
        var finBox = document.createElement("span");

        var torText = document.createElement("input");
        torText.id = "torValue";
        var torBox = document.createElement("span");



        //hmBox.classList = "text-center";
        hmBox.innerHTML = `<b>HM</b>`
        hmText.setAttribute("type", "text");
        hmText.setAttribute("value", hm); // Valor de HM
        hmBox.appendChild(hmText)
        div.appendChild(hmBox);

        //refBox.classList = "text-center";
        refBox.innerHTML = `<b>REFERENCIA</b>`
        refText.setAttribute("type", "text");
        refText.setAttribute("value", ref); // Valor de ref
        refBox.appendChild(refText);
        div.appendChild(refBox);

        //finBox.classList = "text-center";
        finBox.innerHTML = `<b>FECHA</b>`
        finText.setAttribute("type", "text");
        finText.setAttribute("value", dateStamp); //Valor de fecha Final
        finBox.appendChild(finText)
        div.appendChild(finBox);

        if (sessionStorage.getItem('tipo') === "SUPERUSUARIO" || sessionStorage.getItem('tipo') === "CALIDAD") {
          torBox.innerHTML = `<b>TORQUE</b>`
          torText.setAttribute("type", "text");
          torText.setAttribute("value", JSON.stringify(torque)); //Valor de fecha toral
          torBox.appendChild(torText)
          div.appendChild(torBox);
        } else {
          document.getElementById("refText").disabled = true
          document.getElementById("hmText").disabled = true
          document.getElementById("finText").disabled = true

          torBox.innerHTML = `<b>TORQUE</b>`
          torText.setAttribute("type", "text");
          torText.setAttribute("value", JSON.stringify(torque)); //Valor de fecha toral
          torBox.appendChild(torText)
          torBox.style.display = "none";
          div.appendChild(torBox);
        }
        /** Boton Imprimir **/
        let printButton = document.createElement('button');
        printButton.innerHTML = "Imprimir";
        printButton.classList = "btn-print";
        printButton.onclick = function () {
          imprimir(); //envios de los datos al POST
        };
        div.appendChild(printButton);
      });
  }

  document.getElementById("informacion").appendChild(div)

  $('#mostrar').click();
});
/*
HM, DATE, REF, TORQUES
*/
function imprimir() {
  var formData = new FormData();
  hmText = document.getElementById("hmText").value
  refText = document.getElementById("refText").value
  finText = document.getElementById("finText").value
  torText = document.getElementById("torValue").value

  formData.set('HM', hmText)
  formData.set('REF', refText)
  formData.set('DATE', finText)
  formData.set('TORQUES', torText)
  console.log(`ENVIANDO.. HM: ${hmText} || REF: ${refText} || Fecha Final: ${finText} || TORQUES: ${torText}`);

  fetch(dominio + '/printer/etiqueta', { //Envio de datos para impr
      method: 'POST',
      body: formData
    }).then(res => res.json())
    .then(function (data) {
      console.log(data);
      console.log('Impresion exitosa');
      console.log(`HM: ${hmText} || REF: ${refText} || Fecha Final: ${finText} || TORQUES: ${torText}`);
    })
    .catch(function (err) {
      console.log(err);
    });
}


//////////////// AL SELECCIONAR TABLAS QUE NECESITEN REALIZAR CONSULTAS EN BASE AL "ID" SE EJECUTARÁ ESTA FUNCIÓN ////////////////////////
function cargarmodulo() {
  var moduloinput = document.getElementById("moduloinput").value;
  if ($('#tipo_busqueda').val() == "Modulo") {
    // console.log("URL POR MODULO");
    var url = dominio + "/api/get/" + document.getElementById('selector').value + "/modulo/=/" + moduloinput + "/_/=/_";
  } else {
    // console.log("URL POR ID");
    url = dominio + "/api/get/" + document.getElementById('selector').value + "/id/>/" + document.getElementById('idi').value + "/id/</" + document.getElementById('idf').value;
  }
  fetch(url)
    .then(data => data.json())
    .then(data => {
      // console.log(data);
      if (data.items == 0) {
        console.log("No hay coincidencias");
        alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
      } else {
        alertawarning.innerHTML = '';
        var colnames = Object.keys(data);
        console.log(colnames[colnames.indexOf("ID")]);
        colnames.splice(0, 0, colnames[colnames.indexOf("ID")]);

        colnames.splice(colnames.indexOf("MODULO") - 1, 1);
        console.log("Colnames: ", colnames);
        var filas;
        if ($('#tipo_busqueda').val() == "Modulo") {
          filas = 1;
        } else {
          filas = data[colnames[0]].length;
        }
        // console.log("Resultado de Filas: ",filas);
        //CREACIÓN DE TABLA
        var myTableDiv = document.getElementById("resultado");
        var table = document.createElement('TABLE');
        var tableBody = document.createElement('TBODY');
        var Encabezados = document.createElement('THEAD');

        table.id = "myTable";
        table.classList.add('display');
        table.classList.add('nowrap');
        table.cellSpacing = "0";
        table.width = "100%";
        table.border = '2';
        table.appendChild(Encabezados);
        table.appendChild(tableBody);
        tableBody.align = "center";
        //FIN DE CREACIÓN DE TABLA

        //ENCABEZADOS DE LA TABLA
        var tr = document.createElement('TR');
        Encabezados.appendChild(tr);
        for (i = 0; i < colnames.length; i++) {
          var th = document.createElement('TH')
          var titulo = colnames[i].replace("_", " ")
          th.width = '100';
          console.log(colnames[i]);
          th.appendChild(document.createTextNode(titulo));
          tr.appendChild(th).style.backgroundColor = "#0DBED6";
        }
        //FILAS DE LA TABLA
        for (i = 0; i < filas; i++) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            switch (colnames[j]) {
              case "CAJA_1":
                var boton = document.createElement('button');
                var icono = document.createElement('i');
                icono.classList.add("fas");
                icono.classList.add("fa-archive");
                boton.title = "Ver Información";
                boton.classList.add('btn');
                boton.classList.add('btn-info');
                if (document.getElementById('selector').value == "Modulos_Fusibles") {
                  boton.classList.add('btn-ver-caja1');
                } else {
                  boton.classList.add('btn-ver-caja1_1');
                }
                boton.style.width = "60px";
                boton.appendChild(icono);
                td.appendChild(boton);
                break;
              case "CAJA_2":
                var boton = document.createElement('button');
                var icono = document.createElement('i');
                icono.classList.add("fas");
                icono.classList.add("fa-archive");
                boton.title = "Ver Información";
                boton.classList.add('btn');
                boton.classList.add('btn-info');
                if (document.getElementById('selector').value == "Modulos_Fusibles") {
                  boton.classList.add('btn-ver-caja2');
                } else {
                  boton.classList.add('btn-ver-caja2_1');
                }
                boton.style.width = "60px";
                boton.appendChild(icono);
                td.appendChild(boton);
                break;
              case "CAJA_3":
                var boton = document.createElement('button');
                var icono = document.createElement('i');
                icono.classList.add("fas");
                icono.classList.add("fa-archive");
                boton.title = "Ver Información";
                boton.classList.add('btn');
                boton.classList.add('btn-info');
                if (document.getElementById('selector').value == "Modulos_Fusibles") {
                  boton.classList.add('btn-ver-caja3');
                } else {
                  boton.classList.add('btn-ver-caja3_1');
                }
                boton.style.width = "60px";
                boton.appendChild(icono);
                td.appendChild(boton);
                break;
              case "CAJA_4":
                var boton = document.createElement('button');
                var icono = document.createElement('i');
                icono.classList.add("fas");
                icono.classList.add("fa-archive");
                boton.title = "Ver Información";
                boton.classList.add('btn');
                boton.classList.add('btn-info');
                if (document.getElementById('selector').value == "Modulos_Fusibles") {
                  boton.classList.add('btn-ver-caja4');
                } else {
                  boton.classList.add('btn-ver-caja4_1');
                }
                boton.style.width = "60px";
                boton.appendChild(icono);
                td.appendChild(boton);
                break;
              case "CAJA_5":
                var boton = document.createElement('button');
                var icono = document.createElement('i');
                icono.classList.add("fas");
                icono.classList.add("fa-archive");
                boton.title = "Ver Información";
                boton.classList.add('btn');
                boton.classList.add('btn-info');
                if (document.getElementById('selector').value == "Modulos_Fusibles") {
                  boton.classList.add('btn-ver-caja5');
                } else {
                  boton.classList.add('btn-ver-caja5_1');
                }
                boton.style.width = "60px";
                boton.appendChild(icono);
                td.appendChild(boton);
                break;
              case "CAJA_6":
                var boton = document.createElement('button');
                var icono = document.createElement('i');
                icono.classList.add("fas");
                icono.classList.add("fa-archive");
                boton.title = "Ver Información";
                boton.classList.add('btn');
                boton.classList.add('btn-info');
                if (document.getElementById('selector').value == "Modulos_Fusibles") {
                  boton.classList.add('btn-ver-caja6');
                } else {
                  boton.classList.add('btn-ver-caja6_1');
                }
                boton.style.width = "60px";
                boton.appendChild(icono);
                td.appendChild(boton);
                break;
              case "CAJA_7":
                var boton = document.createElement('button');
                var icono = document.createElement('i');
                icono.classList.add("fas");
                icono.classList.add("fa-archive");
                boton.title = "Ver Información";
                boton.classList.add('btn');
                boton.classList.add('btn-info');
                if (document.getElementById('selector').value == "Modulos_Fusibles") {
                  boton.classList.add('btn-ver-caja7');
                } else {
                  boton.classList.add('btn-ver-caja7_1');
                }
                boton.style.width = "60px";
                boton.appendChild(icono);
                td.appendChild(boton);
                break;
              case "CAJA_8":
                var boton = document.createElement('button');
                var icono = document.createElement('i');
                icono.classList.add("fas");
                icono.classList.add("fa-archive");
                boton.title = "Ver Información";
                boton.classList.add('btn');
                boton.classList.add('btn-info');
                if (document.getElementById('selector').value == "Modulos_Fusibles") {
                  boton.classList.add('btn-ver-caja8');
                } else {
                  boton.classList.add('btn-ver-caja8_1');
                }
                boton.style.width = "60px";
                boton.appendChild(icono);
                td.appendChild(boton);
                break;
              case "CAJA_9":
                var boton = document.createElement('button');
                var icono = document.createElement('i');
                icono.classList.add("fas");
                icono.classList.add("fa-archive");
                boton.title = "Ver Información";
                boton.classList.add('btn');
                boton.classList.add('btn-info');
                if (document.getElementById('selector').value == "Modulos_Fusibles") {
                  boton.classList.add('btn-ver-caja9');
                } else {
                  boton.classList.add('btn-ver-caja9_1');
                }
                boton.style.width = "60px";
                boton.appendChild(icono);
                td.appendChild(boton);
                break;
              default:
                if ($('#tipo_busqueda').val() == "Modulo") {
                  td.appendChild(document.createTextNode(data[colnames[j]]));
                } else {
                  td.appendChild(document.createTextNode(data[colnames[j]][i]));
                }

                break;
            }
            tr.appendChild(td)
          }
          tableBody.appendChild(tr);
        }
        myTableDiv.appendChild(table);
        $(document).ready(function () {
          $('#myTable').DataTable({
            responsive: true
          });
        });
      }
    })
}

$(document).on('click', '.btn-ver-caja1', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        // console.log(data);
        // console.log(data[id_info]);
        document.getElementById("informacion").innerHTML = data[id_info];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-caja2', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        // console.log(data);
        // console.log(data[id_info]);
        document.getElementById("informacion").innerHTML = data[id_info];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-caja3', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        // console.log(data);
        // console.log(data[id_info]);
        document.getElementById("informacion").innerHTML = data[id_info];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-caja4', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        // console.log(data);
        // console.log(data[id_info]);
        document.getElementById("informacion").innerHTML = data[id_info];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-caja5', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        // console.log(data);
        // console.log(data[id_info]);
        document.getElementById("informacion").innerHTML = data[id_info];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-caja6', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        // console.log(data);
        // console.log(data[id_info]);
        document.getElementById("informacion").innerHTML = data[id_info];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-caja7', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        // console.log(data);
        // console.log(data[id_info]);
        document.getElementById("informacion").innerHTML = data[id_info];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-caja8', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        // console.log(data);
        // console.log(data[id_info]);
        document.getElementById("informacion").innerHTML = data[id_info];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});

$(document).on('click', '.btn-ver-caja1_1', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", "CAJA_1");
    var id_info_responsive = header.parent().prev().find("td:first").next().next().next().next().next().next().next().next().next().text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = "CAJA_1";
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        console.log(data["CAJA_1"]);
        document.getElementById("informacion").innerHTML = data["CAJA_1"];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-caja2_1', function () {

  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", "CAJA 2");
    var id_info_responsive = header.parent().prev().find("td:first").next().next().next().next().next().next().next().next().next().text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = "CAJA 2";
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        console.log(data["CAJA_2"]);
        document.getElementById("informacion").innerHTML = data["CAJA_2"];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-caja3_1', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", "CAJA_3");
    var id_info_responsive = header.parent().prev().find("td:first").next().next().next().next().next().next().next().next().next().text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = "CAJA_3";
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        console.log(data["CAJA_3"]);
        document.getElementById("informacion").innerHTML = data["CAJA_3"];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-caja4_1', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", "CAJA_4");
    var id_info_responsive = header.parent().prev().find("td:first").next().next().next().next().next().next().next().next().next().text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = "CAJA_4";
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        console.log(data["CAJA_4"]);
        document.getElementById("informacion").innerHTML = data["CAJA_4"];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-caja5_1', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", "CAJA_5");
    var id_info_responsive = header.parent().prev().find("td:first").next().next().next().next().next().next().next().next().next().text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = "CAJA_5";
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        console.log(data["CAJA_5"]);
        document.getElementById("informacion").innerHTML = data["CAJA_5"];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-caja6_1', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", "CAJA_6");
    var id_info_responsive = header.parent().prev().find("td:first").next().next().next().next().next().next().next().next().next().text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = "CAJA_6";
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        console.log(data["CAJA_6"]);
        document.getElementById("informacion").innerHTML = data["CAJA_6"];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-caja7_1', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", "CAJA_7");
    var id_info_responsive = header.parent().prev().find("td:first").next().next().next().next().next().next().next().next().next().text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = "CAJA_7";
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        console.log(data["CAJA_7"]);
        document.getElementById("informacion").innerHTML = data["CAJA_7"];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-caja8_1', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", "CAJA_8");
    var id_info_responsive = header.parent().prev().find("td:first").next().next().next().next().next().next().next().next().next().text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = "CAJA_8";
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        console.log(data["CAJA_8"]);
        document.getElementById("informacion").innerHTML = data["CAJA_8"];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});
$(document).on('click', '.btn-ver-caja9_1', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", "CAJA_9");
    var id_info_responsive = header.parent().prev().find("td:first").next().next().next().next().next().next().next().next().next().text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = "CAJA_9";
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        console.log(data["CAJA_9"]);
        document.getElementById("informacion").innerHTML = data["CAJA_9"];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');

            span.innerHTML = `<p>${obj_cavidad}: ${boxValue}</p>`;
            grid.appendChild(span);
          }
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});

function cargarnombre() {
  var nombreinput = document.getElementById("nombreinput").value;
  // console.log(nombreinput);
  fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/name/=/" + nombreinput + "/_/=/_")
    .then(data => data.json())
    .then(data => {
      // console.log(data);
      if (data.items == 0) {
        console.log("No hay coincidencias");
        alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
      } else {
        alertawarning.innerHTML = '';
      }

      var colnames = Object.keys(data);
      // console.log("Colnames: ",colnames);
      colnames.splice(colnames.indexOf("GAFET"), 1);
      // console.log("el nuevo array: ", colnames);
      var filas = data[colnames[0]].length;
      // console.log("Resultado: ",filas);
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.classList.add('nowrap');
      table.cellSpacing = "0";
      table.width = "100%";
      table.border = '2';
      table.appendChild(Encabezados);
      table.appendChild(tableBody);
      tableBody.align = "center";
      //FIN DE CREACIÓN DE TABLA

      //ENCABEZADOS DE LA TABLA
      var tr = document.createElement('TR');
      Encabezados.appendChild(tr);
      for (i = 0; i < colnames.length; i++) {
        var th = document.createElement('TH')
        th.width = '100';
        th.appendChild(document.createTextNode(colnames[i]));
        tr.appendChild(th).style.backgroundColor = "#0DBED6";
      }
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          td.appendChild(document.createTextNode(data[colnames[j]][i]));
          tr.appendChild(td)
        }
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function () {
        $('#myTable').DataTable({
          responsive: true
        });
      });
    })
}

function cargarnombresuper() {
  var nombreinput = document.getElementById("nombreinput").value;
  // console.log(nombreinput);
  fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/name/=/" + nombreinput + "/_/=/_")
    .then(data => data.json())
    .then(data => {
      // console.log(data);
      if (data.items == 0) {
        console.log("No hay coincidencias");
        alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
      } else {
        alertawarning.innerHTML = '';
      }

      var colnames = Object.keys(data);
      // console.log("Colnames: ",colnames);
      var filas = data[colnames[0]].length;
      // console.log("Resultado: ",filas);
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.border = '2';
      table.appendChild(Encabezados);
      table.appendChild(tableBody);
      tableBody.align = "center";
      //FIN DE CREACIÓN DE TABLA

      //ENCABEZADOS DE LA TABLA
      var tr = document.createElement('TR');
      Encabezados.appendChild(tr);
      for (i = 0; i < colnames.length; i++) {
        var th = document.createElement('TH')
        th.width = '100';
        th.appendChild(document.createTextNode(colnames[i]));
        tr.appendChild(th).style.backgroundColor = "#0DBED6";
      }
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          td.appendChild(document.createTextNode(data[colnames[j]][i]));
          tr.appendChild(td)
        }
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function () {
        $('#myTable').DataTable();
      });
    })
}

function cargargafete() {
  var gafeteinput = document.getElementById("gafeteinput").value;
  // console.log(gafeteinput);
  fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/gafet/=/" + gafeteinput + "/_/=/_")
    .then(data => data.json())
    .then(data => {
      // console.log(data);
      if (data.items == 0) {
        console.log("No hay coincidencias");
        alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
      } else {
        alertawarning.innerHTML = '';
      }

      var colnames = Object.keys(data);
      // console.log("Colnames: ",colnames);
      colnames.splice(colnames.indexOf("GAFET"), 1);
      // console.log("el nuevo array: ", colnames);
      var filas = data[colnames[0]].length;
      // console.log("Resultado: ",filas);
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.classList.add('nowrap');
      table.cellSpacing = "0";
      table.width = "100%";
      table.border = '2';
      table.appendChild(Encabezados);
      table.appendChild(tableBody);
      tableBody.align = "center";
      //FIN DE CREACIÓN DE TABLA

      //ENCABEZADOS DE LA TABLA
      var tr = document.createElement('TR');
      Encabezados.appendChild(tr);
      for (i = 0; i < colnames.length; i++) {
        var th = document.createElement('TH')
        th.width = '100';
        th.appendChild(document.createTextNode(colnames[i]));
        tr.appendChild(th).style.backgroundColor = "#0DBED6";
      }
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          td.appendChild(document.createTextNode(data[colnames[j]][i]));
          tr.appendChild(td)
        }
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function () {
        $('#myTable').DataTable({
          responsive: true
        });
      });
    })
}

function cargargafetesuper() {
  var gafeteinput = document.getElementById("gafeteinput").value;
  // console.log(gafeteinput);
  fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/gafet/=/" + gafeteinput + "/_/=/_")
    .then(data => data.json())
    .then(data => {
      // console.log(data);
      if (data.items == 0) {
        console.log("No hay coincidencias");
        alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
      } else {
        alertawarning.innerHTML = '';
      }

      var colnames = Object.keys(data);
      // console.log("Colnames: ",colnames);
      var filas = data[colnames[0]].length;
      // console.log("Resultado: ",filas);
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.border = '2';
      table.appendChild(Encabezados);
      table.appendChild(tableBody);
      tableBody.align = "center";
      //FIN DE CREACIÓN DE TABLA

      //ENCABEZADOS DE LA TABLA
      var tr = document.createElement('TR');
      Encabezados.appendChild(tr);
      for (i = 0; i < colnames.length; i++) {
        var th = document.createElement('TH')
        th.width = '100';
        th.appendChild(document.createTextNode(colnames[i]));
        tr.appendChild(th).style.backgroundColor = "#0DBED6";
      }
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          td.appendChild(document.createTextNode(data[colnames[j]][i]));
          tr.appendChild(td)
        }
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function () {
        $('#myTable').DataTable();
      });
    })
}

function cargarnombre_usuarios() {
  var nombreinput = document.getElementById("nombreinput").value;
  // console.log(nombreinput);
  fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/name/=/" + nombreinput + "/_/=/_")
    .then(data => data.json())
    .then(data => {
      // console.log(data);
      if (data.items == 0) {
        console.log("No hay coincidencias");
        alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
      } else {
        alertawarning.innerHTML = '';
        var colnames = Object.keys(data);
        // console.log("Colnames: ",colnames);
        colnames.splice(colnames.indexOf("GAFET"), 1);
        // console.log("el nuevo array: ", colnames);
        var filas = data[colnames[0]];
        // console.log("Resultado: ",filas);
        //CREACIÓN DE TABLA
        var myTableDiv = document.getElementById("resultado");
        var table = document.createElement('TABLE');
        var tableBody = document.createElement('TBODY');
        var Encabezados = document.createElement('THEAD');

        table.id = "myTable";
        table.classList.add('display');
        table.classList.add('nowrap');
        table.cellSpacing = "0";
        table.width = "100%";
        table.border = '2';
        table.appendChild(Encabezados);
        table.appendChild(tableBody);
        tableBody.align = "center";
        //FIN DE CREACIÓN DE TABLA

        //ENCABEZADOS DE LA TABLA
        var tr = document.createElement('TR');
        Encabezados.appendChild(tr);
        for (i = 0; i < colnames.length; i++) {
          var th = document.createElement('TH')
          th.width = '100';
          th.appendChild(document.createTextNode(colnames[i]));
          tr.appendChild(th).style.backgroundColor = "#0DBED6";
        }
        //FILAS DE LA TABLA
        for (i = 0; i < 1; i++) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(data[colnames[j]]));
            tr.appendChild(td)
          }
          tableBody.appendChild(tr);
        }
        myTableDiv.appendChild(table);
        $(document).ready(function () {
          $('#myTable').DataTable({
            responsive: true
          });
        });
      }
    })
}

function cargargafete_usuarios() {
  var gafeteinput = document.getElementById("gafeteinput").value;
  // console.log(gafeteinput);
  fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/gafet/=/" + gafeteinput + "/_/=/_")
    .then(data => data.json())
    .then(data => {
      // console.log(data);
      if (data.items == 0) {
        console.log("No hay coincidencias");
        alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
      } else {
        alertawarning.innerHTML = '';
        var colnames = Object.keys(data);
        // console.log("Colnames: ",colnames);
        colnames.splice(colnames.indexOf("GAFET"), 1);
        // console.log("el nuevo array: ", colnames);
        var filas = data[colnames[0]];
        // console.log("Resultado: ",filas);
        //CREACIÓN DE TABLA
        var myTableDiv = document.getElementById("resultado");
        var table = document.createElement('TABLE');
        var tableBody = document.createElement('TBODY');
        var Encabezados = document.createElement('THEAD');

        table.id = "myTable";
        table.classList.add('display');
        table.classList.add('nowrap');
        table.cellSpacing = "0";
        table.width = "100%";
        table.border = '2';
        table.appendChild(Encabezados);
        table.appendChild(tableBody);
        tableBody.align = "center";
        //FIN DE CREACIÓN DE TABLA

        //ENCABEZADOS DE LA TABLA
        var tr = document.createElement('TR');
        Encabezados.appendChild(tr);
        for (i = 0; i < colnames.length; i++) {
          var th = document.createElement('TH')
          th.width = '100';
          th.appendChild(document.createTextNode(colnames[i]));
          tr.appendChild(th).style.backgroundColor = "#0DBED6";
        }
        //FILAS DE LA TABLA
        for (i = 0; i < 1; i++) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(data[colnames[j]]));
            tr.appendChild(td)
          }
          tableBody.appendChild(tr);
        }
        myTableDiv.appendChild(table);
        $(document).ready(function () {
          $('#myTable').DataTable({
            responsive: true
          });
        });
      }
    })
}

function cargarpedido() {
  console.log("FUNCION PEDIDOS ACTIVADA")
  switch ($('#tipo_busqueda').val()) {
    case "Fecha":
      cargardatetime();
      break;
    case "Pedido":
      var pedidoinput = document.getElementById("pedidoinput").value;
      // console.log(pedidoinput);
      fetch(dominio + "/api/get/" + document.getElementById('selector').value + "/pedido/=/" + pedidoinput + "/_/=/_")
        .then(data => data.json())
        .then(data => {
          // console.log(data);
          if (data.items == 0) {
            console.log("No hay coincidencias");
            alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
          } else {
            alertawarning.innerHTML = '';
          }

          var colnames = Object.keys(data);
          console.log(colnames);
          colnames.splice(colnames.indexOf("ID"), 1);
          colnames.splice(colnames.indexOf("PEDIDO"), 1, "ACTIVE");
          colnames.splice(colnames.indexOf("ACTIVE"), 1, "ID", "PEDIDO");
          // console.log("Colnames: ",colnames);
          var filas = data[colnames[0]];
          // console.log("Resultado: ",filas);
          //CREACIÓN DE TABLA
          var myTableDiv = document.getElementById("resultado");
          var table = document.createElement('TABLE');
          var tableBody = document.createElement('TBODY');
          var Encabezados = document.createElement('THEAD');

          table.id = "myTable";
          table.classList.add('display');
          table.classList.add('nowrap');
          table.cellSpacing = "0";
          table.width = "100%";
          table.border = '2';
          table.appendChild(Encabezados);
          table.appendChild(tableBody);
          tableBody.align = "center";
          //FIN DE CREACIÓN DE TABLA

          //ENCABEZADOS DE LA TABLA
          var tr = document.createElement('TR');
          Encabezados.appendChild(tr);

          for (i = 0; i < colnames.length; i++) {
            var th = document.createElement('TH')
            var titulo = colnames[i].replace("_", " ")
            th.width = '100';
            console.log(colnames[i]);
            th.appendChild(document.createTextNode(titulo));
            tr.appendChild(th).style.backgroundColor = "#0DBED6";
          }
          //FILAS DE LA TABLA
          for (i = 0; i < 1; i++) {
            var tr = document.createElement('TR');
            for (j = 0; j < colnames.length; j++) {
              var td = document.createElement('TD')
              switch (colnames[j]) {
                case "QR_BOXES":
                  var boton = document.createElement('button');
                  var icono = document.createElement('i');
                  icono.classList.add("fas");
                  icono.classList.add("fa-qrcode");
                  boton.title = "Ver Información";
                  boton.classList.add('btn');
                  boton.classList.add('btn-info');
                  boton.classList.add('btn-ver-qr2');
                  boton.style.width = "60px"
                  boton.appendChild(icono);
                  td.appendChild(boton);
                  break;
                case "MODULOS_VISION":
                  var boton = document.createElement('button');
                  var icono = document.createElement('i');
                  icono.classList.add("fas");
                  icono.classList.add("fa-archive");
                  boton.title = "Ver Información";
                  boton.classList.add('btn');
                  boton.classList.add('btn-info');
                  boton.classList.add('btn-ver-modulosF');
                  boton.style.width = "60px"
                  boton.appendChild(icono);
                  td.appendChild(boton);
                  break;
                case "MODULOS_ALTURA":
                  var boton = document.createElement('button');
                  var icono = document.createElement('i');
                  icono.classList.add("fas");
                  icono.classList.add("fa-archive");
                  boton.title = "Ver Información";
                  boton.classList.add('btn');
                  boton.classList.add('btn-info');
                  boton.classList.add('btn-ver-modulosA');
                  boton.style.width = "60px"
                  boton.appendChild(icono);
                  td.appendChild(boton);
                  break;
                case "MODULOS_TORQUE":
                  var boton = document.createElement('button');
                  var icono = document.createElement('i');
                  icono.classList.add("fas");
                  icono.classList.add("fa-archive");
                  boton.title = "Ver Información";
                  boton.classList.add('btn');
                  boton.classList.add('btn-info');
                  boton.classList.add('btn-ver-modulosT');
                  boton.style.width = "60px"
                  boton.appendChild(icono);
                  td.appendChild(boton);
                  break;
                default:
                  td.appendChild(document.createTextNode(data[colnames[j]]));
              }
              tr.appendChild(td)
            }
            tableBody.appendChild(tr);
          }
          myTableDiv.appendChild(table);
          $(document).ready(function () {
            $('#myTable').DataTable({
              responsive: true
            });
          });
        })
      break;
  }
}

$(document).on('click', '.btn-ver-qr2', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = "QR_BOXES";
    fetch(dominio + "/api/get/pedidos/id/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        // console.log(data);
        // console.log(data.QR_BOXES);
        document.getElementById("informacion").innerHTML = data.QR_BOXES;
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/pedidos/id/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;

        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          //console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          // console.log("Aquí en object: ",cavidades)



          let grid = document.createElement("div");
          grid.classList = "grid-box";
          nav.appendChild(grid);

          let span = document.createElement("span");
          span.classlist = "caja-valor";
          span.innerHTML = `<p>${cavidades}</p>`;
          nav.appendChild(span);
        }
        document.getElementById("informacion").appendChild(div)
        $('#mostrar').click();
      })
  }
});

$(document).on('click', '.btn-ver-modulosF', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/Pedidos/ID/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        // console.log(data);
        // console.log(data[id_info]);
        document.getElementById("informacion").innerHTML = data[id_info];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/Pedidos/ID/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        // console.log(data);
        // console.log(data[header_info]);
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;
        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box-1fr";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length - 1; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');
            let numList = Number(obj_cavidad);

            numList = Number(obj_cavidad) + 1;

            span.innerHTML = `<p>${numList}: ${boxValue}</p>`;
            grid.appendChild(span);
          }

        }
        document.getElementById("informacion").appendChild(div)

        //let alturaValue = data[header_info].replace(re, 'N/A');
        // console.log(alturaValue);
        //document.getElementById("informacion").innerHTML = alturaValue;
        $('#mostrar').click();
      })
  }
});

$(document).on('click', '.btn-ver-modulosA', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/Pedidos/ID/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        // console.log(data);
        // console.log(data[id_info]);
        document.getElementById("informacion").innerHTML = data[id_info];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/Pedidos/ID/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        // console.log(data);
        // console.log(data[header_info]);
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;
        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box-1fr";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length - 1; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');
            let numList = Number(obj_cavidad);

            numList = Number(obj_cavidad) + 1;

            span.innerHTML = `<p>${numList}: ${boxValue}</p>`;
            grid.appendChild(span);
          }

        }
        document.getElementById("informacion").appendChild(div)

        //let alturaValue = data[header_info].replace(re, 'N/A');
        // console.log(alturaValue);
        //document.getElementById("informacion").innerHTML = alturaValue;
        $('#mostrar').click();
      })
  }
});

$(document).on('click', '.btn-ver-modulosT', function () {
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest("table").find("thead > tr > th").eq(header.index()).text();
  if (isNaN(id_info) == true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ", id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ", id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio + "/api/get/Pedidos/ID/=/" + id_info_responsive + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        // console.log(data);
        // console.log(data[id_info]);
        document.getElementById("informacion").innerHTML = data[id_info];
        $('#mostrar').click();
      })
  } else {
    console.log("ID del registro: ", id_info);
    console.log("Header: ", header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio + "/api/get/Pedidos/ID/=/" + id_info + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        document.getElementById("informacion").innerHTML = "";
        // console.log(data);
        // console.log(data[header_info]);
        document.getElementById("informacion").innerHTML = "";
        let headerString = header_info.replace(/ /g, "_");
        dataParse = JSON.parse(data[headerString]);
        let re = /null/g;
        // console.log("Convertido a JSON: ",dataParse)
        dataKeys = Object.keys(dataParse)
        // console.log("dataKeys: ",dataKeys)
        let div = document.createElement("div");
        for (let i = 0; i < dataKeys.length; i++) {
          let nav = document.createElement("nav");
          let caja = dataKeys[i];
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>" + caja + "</b>";
          div.appendChild(nav);

          // console.log("Aqui esta la CAJA:",caja);
          let cavidades = dataParse[caja];
          //console.log("Aquí en object: ",cavidades)

          let get_cavidad = Object.getOwnPropertyNames(cavidades);

          let grid = document.createElement("div");
          grid.classList = "grid-box-1fr";
          nav.appendChild(grid);
          for (let j = 0; j < get_cavidad.length - 1; j++) {

            let obj_cavidad = get_cavidad[j];
            //console.log ("cavidad",obj_cavidad);
            //console.log ("valor",cavidades[obj_cavidad]);
            let span = document.createElement("span");
            span.classlist = "caja-valor";
            let valores = JSON.stringify(cavidades[obj_cavidad]);
            //console.log("Aqui en string: ",valores)
            let boxValue = valores.replace(re, 'N/A');
            let numList = Number(obj_cavidad);

            numList = Number(obj_cavidad) + 1;

            span.innerHTML = `<p>${numList}: ${boxValue}</p>`;
            grid.appendChild(span);
          }

        }
        document.getElementById("informacion").appendChild(div)

        //let alturaValue = data[header_info].replace(re, 'N/A');
        // console.log(alturaValue);
        //document.getElementById("informacion").innerHTML = alturaValue;
        $('#mostrar').click();
      })
  }
});

function cargarportipo() {
  // console.log("Este es el tipo que seleccionó: ",$('#tipo_busqueda').val());
  switch ($('#tipo_busqueda').val()) {
    case "Fecha":
      // console.log("mostrando resultados por fecha");
      cargarfecha();
      break;
    case "Nombre":
      // console.log("mostrando resultados por nombre");
      cargarnombre();
      break;
    case "Gafet": //OJO AQUÍ, VERIFICAR SIEMPRE SI ES "GAFET" O "GAFETE" PARA EVITAR ERRORES
      // console.log("mostrando resultados por nombre");
      cargargafete();
      break;
  }
}

function cargarportipo_usuarios() {
  // console.log("Este es el tipo que seleccionó: ",document.getElementById("tipo").value);
  switch ($('#tipo_busqueda').val()) {
    case "Fecha":
      // console.log("mostrando resultados porfecha");
      cargarfecha();
      break;
    case "Nombre":
      // console.log("mostrando resultados por nombre");
      cargarnombre_usuarios();
      break;
    case "Gafet":
      // console.log("mostrando resultados por nombre");
      cargargafete_usuarios();
      break;
  }
}
$('#modulo').on('keypress', function (e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) {
    e.preventDefault();
    capturar();
  }
});

$('#pedido').on('keypress', function (e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) {
    e.preventDefault();
    capturar();
  }
});

$('#nombre').on('keypress', function (e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) {
    e.preventDefault();
    capturar();
  }
});

$('#gafete').on('keypress', function (e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) {
    e.preventDefault();
    capturar();
  }
});

$('#HM').on('keypress', function (e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) {
    e.preventDefault();
    capturar();
  }
});

/**Grafico**/
let activo_VA = 0; 
$(document).on('click', '.pes_VA', function () {
  const ctx = document.getElementById('graph_VA');
  activo_VA++
  if (activo_VA === 2) {
  activo_VA = 0
  document.getElementById('grafico_VA').style.width = '0px'
  document.getElementById('grafico_VA').style.height = '0px'

  ctx.style.height = '0px'
  ctx.style.width = '0px'
}else{
  document.getElementById('grafico_VA').style.width = '650px'
  document.getElementById('grafico_VA').style.height = '400px'
 
  ctx.style.height = '400px'
  ctx.style.width = '650px'
}
})

let activo_T = 0; 
$(document).on('click', '.pes_T', function () {
  const ctx = document.getElementById('graph_T');
  activo_T++
  if (activo_T === 2) {
  activo_T = 0
  document.getElementById('grafico_T').style.width = '0px'
  document.getElementById('grafico_T').style.height = '0px'

  ctx.style.height = '0px'
  ctx.style.width = '0px'
}else{
  document.getElementById('grafico_T').style.width = '650px'
  document.getElementById('grafico_T').style.height = '400px'
 
  ctx.style.height = '400px'
  ctx.style.width = '650px'
}
})




logArray = []
function pedidoValue(hm){  
  var reintento = 0;
  var reintento_t = 0;
  const pedidoChart = hm.value
  var Jvalue = JSON.parse(pedidoChart)

  if(hm.checked == true){    
    logArray.push(Jvalue['ID'])
    //console.log(logArray);
  }
  if (hm.checked === false) {
    logArray.splice(logArray.indexOf(Jvalue['ID']),1)
  }

  chartColumns_T = []
  chartColumns_VA = []

  if (logArray.length === 0 ) {
    graficar(true, true)
  }


  logArray.forEach(id => {
      fetch(dominio + "/api/get/historial/id/=/" + id + "/_/=/_")
      .then(data => data.json())
      .then(data => {
        jParse = JSON.parse(data['INTENTOS_VA'])
        dataKeys = Object.keys(jParse)
        //console.log(data)

        jParse_t = JSON.parse(data['INTENTOS_T'])
        dataKeys_t = Object.keys(jParse_t)

        //console.log(jParse_t)
        //console.log(jParse)

      /*INTENTOS VA*/
    for (let i = 0; i < dataKeys.length; i++) {
        //console.log(dataKeys[i]);
        const valueKey = jParse[dataKeys[i]];
        const estacion = dataKeys[i]
        var bar;
        //console.log(estacion); // Nombre-estacion
        var estacionKeys = Object.keys(valueKey)
        //console.log(estacionKeys)
        //console.log(estacionKeys);
        for (let w = 0; w < estacionKeys.length; w++) {
          const caja = estacionKeys[w];
          const valueCaja = valueKey[caja];
          //console.log(caja);//Nombre de la Caja
          //console.log(valueCaja);
          var cajaKeys = Object.keys(valueCaja)
          //console.log(cajaKeys);
          for (let k = 0; k < cajaKeys.length; k++) {
            const cavidad = cajaKeys[k];
            //console.log(cavidad);
            reintento = valueCaja[cavidad] //Valor Cavidad
            const findIt = chartColumns_VA.findIndex(object => { //El FindIndex busca el numero de posicion del object HM guardado en la variable ColGraph
              return object.label === `${cavidad}-${caja}`;
            })
            //console.log(findIt);
            if (findIt >= 0) {
              chartColumns_VA[findIt].y += reintento
            }else{
              bar = {'label':`${cavidad}-${caja}`, 'y':reintento};
              chartColumns_VA.push(bar);
            }

          }
          //console.log(chartColumns_VA);        
        }
      }



/*INTENTOS T*/
for (let i = 0; i < dataKeys_t.length; i++) {
  //console.log(dataKeys_t[i]);
  const valueKey = jParse_t[dataKeys_t[i]];
  const caja = dataKeys_t[i]
  var bar;
  //console.log(caja); // Nombre-caja
  var cajaKeys = Object.keys(valueKey)
  //console.log(estacionKeys)
    for (let k = 0; k < cajaKeys.length; k++) {
       const cavidad = cajaKeys[k];
       //console.log(cavidad);
       reintento_t = valueKey[cajaKeys[k]] //Valor Cavidad


      const findIt = chartColumns_T.findIndex(object => { //El FindIndex busca el numero de posicion del object HM guardado en la variable ColGraph
        return object.label === `${cavidad}-${caja}`;
      })
      //console.log(findIt);
      if (findIt >= 0) {
        chartColumns_T[findIt].y += reintento_t
      }else{
        if (reintento_t > 0) {
          var bar_t = {'label':`${cavidad}-${caja}`, 'y':reintento_t};
          chartColumns_T.push(bar_t);
        }
      }

  }
      //console.log(chartColumns_T);
}
        //var bar = {'label':Jvalue['HM'], 'y':reintento};

          // //console.log(reintento)
          // //console.log(bar);
          // if (reintento !== 0) {
          //   string = true;
          //   //chartColumns_VA.push(bar);
          // }else{
          //   string = false;
          // }


          // if (reintento_t !== 0) {
          //   //console.log(reintento_t);
          //   string_t = true;
          // }else{
          //   string_t = false;
          // }


          graficar();
      })
    }); 
      
     
    }   
  

   



    

function graficar () {





  //console.log(chartColumns)
  for (let i = 0; i < chartColumns_VA.length; i++) {
    chartColumns_VA[i]['x'] = i;
  }

  var chart = new CanvasJS.Chart("graph_VA", {
    theme: "light1", //"light1" "light2", "dark1", "dark2"
    animationEnabled: true, // change to true		
    title:{
      text: "Reintentos por pedido de Vision"
    },
    axisX: {
      labelAutoFit : true //change to false
    },
    width: 650,
    height: 400,
    data: [
    {
      // Change type to "bar", "area", "spline", "pie",etc.
      type: "column",
      dataPoints: chartColumns_VA
    }
    ]
  });
  chart.render();






  //console.log(chartColumns)
  for (let i = 0; i < chartColumns_T.length; i++) {
    chartColumns_T[i]['x'] = i;
  }

  var chart_t = new CanvasJS.Chart("graph_T", {
    theme: "light2", //"light1" "light2", "dark1", "dark2"
    animationEnabled: true, // change to true		
    title:{
      text: "Reintentos por pedido de Torque"
    },
    axisX: {
      labelAutoFit : true //change to false
    },
    width: 650,
    height: 400,
    data: [
    {
      // Change type to "bar", "area", "spline", "pie",etc.
      type: "column",
      dataPoints: chartColumns_T
    }
    ]
  });
  chart_t.render();

}