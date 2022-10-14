let DBEVENT = sessionStorage.getItem("DBEVENT");
console.log("DBEVENT ACTUAL: ",DBEVENT);
let modif_name_1 = DBEVENT.replace(/_/g, '-') // Se reemplazan los "_" encontrados en el nombre del Evento por "-" 
let modif_name_2 = modif_name_1.replace("evento-", '') // Se elimina el string inicial "evento-" del nombre
let eventoFinal = modif_name_2.toUpperCase();
document.getElementById('tituloEvento').innerText = eventoFinal;
let historial;
let historial_edit;
let activo = 1;
let activo_edit;
let form_pdcr = document.getElementById('form_pdcr');
let form_add_variante = document.getElementById('form_add_variante');
let alerta_variante = document.getElementById('alerta_variante');
let modulo_actual;
function mayuscula(elemento){
	let texto = elemento.value;
	elemento.value = texto.toUpperCase();
}
function cleardiv(){
    document.getElementById("tabla").innerHTML = "";
}
function variantesPDCR_add(){
    cleardiv();
    if (form_add_variante.style.display === 'block') {
		form_add_variante.style.display = 'none';
	} else{
		form_add_variante.style.display = 'block';
	}
}
function variantesPDCR_edit(){
    if (form_add_variante.style.display === 'block') {
		form_add_variante.style.display = 'none';
	}
    cleardiv();
    fetch(dominio+"/api/get/"+DBEVENT+"/definiciones/ID/>/0/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      console.log(data);
      var colnames = Object.keys(data);
    //   console.log("Columnas: ", colnames);
      colnames.splice(colnames.indexOf("ACTIVE"),2);
      colnames.splice(colnames.indexOf("USUARIO"),1);
      colnames.splice(colnames.indexOf("VARIANTE"),1,"VARIANTE","USUARIO","DATETIME","ACTIVE");
      var filas = data[colnames[1]].length;
      console.log("Num de Registros:",filas);
  
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
          boton.classList.add('btn-delete-variante');
          var botondos = document.createElement('button');
          var modificar = document.createElement('i');
          modificar.classList.add("fas");
          modificar.classList.add("fa-edit");
          botondos.title = 'Modificar';
          botondos.classList.add('btn');
          botondos.classList.add('btn-primary');
          botondos.classList.add('btn-edit-variante');
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
     //  $("#myTable tr").click(function(){
     //   var value=$(this).find('td:first').next().next().html();
     //   alert(value);    
     // }); 
   })
}

$(document).on('click','.btn-delete-variante', function(){
    var elim = $(this).parent().parent().children().first().text();
    var gafetelim;
    let header = $(this).closest("td");
    let header_responsive= header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
    console.log("ID a eliminar: ",elim);
    if (elim=="Operación") {
        console.log("CAMPO EN MODO RESPONSIVE");
        // console.log("Header Responsive: ",header_responsive);
        var elim_responsive = header.parent().prev().find("td:first").text();
        console.log("ID Responsive del registro: ",elim_responsive);
        fetch(dominio+"/api/get/"+DBEVENT+"/definiciones/ID/=/"+elim_responsive+"/_/=/_")
        .then(data=>data.json())
        .then(data=>{
        // console.log(data);
            var opcion = confirm("¿Está seguro de que desea eliminar este registro?");
            if (opcion == true) {
            fetch(dominio+'/api/delete/'+DBEVENT+'/definiciones/'+elim_responsive,{
                method: 'POST'
            }).then(res=>res.json())
            .then(function (data){
                console.log(data);
                console.log('Haz eliminado el registro')
                variantesPDCR_edit();
            })
            .catch(function(err) {
                console.log(err);
            });
            } else {
            console.log('Haz cancelado la acción')
            }
        })
    }else{
        fetch(dominio+"/api/get/"+DBEVENT+"definiciones/ID/=/"+elim+"/_/=/_")
        .then(data=>data.json())
        .then(data=>{
        console.log("Data de registro a eliminar",data);
        var opcion = confirm("¿Está seguro de que desea eliminar este registro?");
        if (opcion == true) {
            fetch(dominio+'/api/delete/'+DBEVENT+'/definiciones/'+elim,{
            method: 'POST'
            }).then(res=>res.json())
            .then(function (data){
            console.log(data);
            console.log('Haz eliminado el registro')
            variantesPDCR_edit();
            })
            .catch(function(err) {
            console.log(err);
            });
        } else {
            console.log('Haz cancelado la acción')
        }
    })
    }
});

$(document).on('click','.btn-edit-variante', function(){
    // console.log("Tipo de Usuario registrado: ",sessionStorage.getItem('tipo'));
    var edit_id = $(this).parent().parent().children().first().text();
    var edit= $(this).parent().parent().children().next().first().text();
    let header = $(this).closest("td");
    let header_responsive= header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
    id = edit_id;
    if (edit_id=="Operación") {
      console.log("CAMPO EN MODO RESPONSIVE");
    //   // console.log("Header Responsive: ",header_responsive);
    //   var edit_id_responsive = header.parent().prev().find("td:first").text();
    //   console.log("ID Responsive del registro: ",edit_id_responsive);
    //   id = edit_id_responsive;
    //   document.getElementById('usuarioedit').innerHTML = edit;
    // //   fetch(dominio+"/api/get/usuarios/ID/=/"+edit_id_responsive+"/_/=/_")
    // //   .then(data=>data.json())
    // //   .then(data=>{
    // //     // console.log(data);
    // //     // console.log(data.ACTIVE);
    // //     $('#mostrar').click();
    // //     activo = data.ACTIVE;
    // //     if (data.ACTIVE == 1) {
    // //       document.getElementById("activo").checked=true;
    // //     } else{
    // //       document.getElementById("activo").checked=false;
        
    // //     }
    // //   }) 
    }else{
        console.log("Nombre de Modulo: ", edit);
        console.log("Id: ",edit_id);
        modulo_actual = edit
        document.getElementById('modulo_edit_title').innerHTML = edit;
        fetch(dominio+"/api/get/"+DBEVENT+"/definiciones/ID/=/"+edit_id+"/_/=/_")
        .then(data=>data.json())
        .then(data=>{
            console.log(data);
            console.log(data.ACTIVE);
            $('#mostrar_variantes').click();
            activo_edit = data.ACTIVE;
            document.getElementById('modulo_edit').value = data.MODULO;
            document.getElementById('variante_edit').value = data.VARIANTE;
            if (data.ACTIVE == 1) {
            document.getElementById("activo_edit").checked=true;
            } else{
            document.getElementById("activo_edit").checked=false;
            }
        })
    }
});

function guardar_edit(){
    // console.log("Este es el valor final del flagusuario", flagusuario);
    // console.log("Este es el valor final del flagpass", flagpass);
    let modulo_edit = document.getElementById('modulo_edit').value;
    let variante_edit = document.getElementById('variante_edit').value;
    let usuario_edit = sessionStorage.getItem('nombre')
    if (modulo_edit.length===0) {
        alert("Necesita llenar todos los campos correspondientes.");
    }
    else{
        if (historial_edit != "si existe") {
            const newPost = {
                "DBEVENT": DBEVENT,
                "MODULO": modulo_edit,
                "VARIANTE": variante_edit,
                "DATETIME": "AUTO",
                "USUARIO": usuario_edit,
                "ACTIVE": activo_edit
            }
            console.log("Este es el newpost: ", newPost);
            console.log("Id enviado al Post: ", id);
            fetch(dominio+'/api/update/definiciones/'+id,{
                method: 'POST',
                body: JSON.stringify(newPost),
                headers:{
                "Content-type": "application/json"
                }
            })
            .then(res=>res.json())
            .then(function (data){
                console.log(data);
                location.href = "definiciones.html";
            })
            .catch(function(err) {
                console.log(err);
            });
        } else {
        console.log("NO SE HIZO EL UPDATE");
        }
    }
}

function agregarVariante(){
    let modulo = document.getElementById('modulo').value;
    let variante = document.getElementById('variante').value;
    let usuario = sessionStorage.getItem('nombre')
    console.log("Usuario Logueado: ", usuario);
    if (historial != "si existe"){
        const newPost = {
            "DBEVENT": DBEVENT,
            "MODULO": modulo,
            "VARIANTE": variante,
            "DATETIME": "AUTO",
            "USUARIO": usuario,
            "ACTIVE": activo
        }
        console.log("NewPost = ",newPost);
        fetch(dominio+'/api/post/definiciones',{
            method: 'POST',
            body: JSON.stringify(newPost),
            headers:{
                "Content-type": "application/json"
            }
        })
        .then(res=>res.json())
        .then(function (data){
            console.log("Data: ",data);
            if(data["items"]===1){
                console.log("INSERTION OK");
                alerta_variante.innerHTML = 'MÓDULO GUARDADO CORRECTAMENTE.';
                $("#alertaadd").fadeTo(2000, 500).slideUp(500, function() {
                    $("#alertaadd").slideUp(500);
                });
                document.getElementById('modulo').value = "";
            }
            else {
                console.log("INSERTION NOK");
                alerta_variante_fail.innerHTML = 'OCURRIÓ UN ERROR AL INTENTAR GUARDAR EL MÓDULO, INTENTELO DE NUEVO.';
                $("#alertaadd_fail").fadeTo(2000, 500).slideUp(500, function() {
                    $("#alertaadd_fail").slideUp(500);
                });
            }
        })
    }else{
        console.log("NO SE PUEDE GUARDAR ESTE MODULO POR QUE YA EXISTE EN LA BASE DE DATOS!");
        $('#mostrar').click();
		document.getElementById("header").innerHTML = document.getElementById("modulo").value;
		document.getElementById("informacion").innerHTML = 'El módulo ya existe en la lista de módulos determinantes.';
    }
}
////////// Función para ver si el módulo introducido por el usuario ya existe en la base de datos //////////
function get_valid_modulo(){
    let modulo = document.getElementById('modulo').value;
	historial="";
	// console.log(document.getElementById("modulo").value)
	if(document.getElementById('modulo').value!=""){
		endpoint=dominio+'/api/get/'+DBEVENT+'/definiciones/MODULO/=/'+document.getElementById('modulo').value+'/_/_/_'
		// console.log(endpoint)
		fetch(endpoint,{
			method: 'GET',
			headers:{
				"Content-type": "application/json"
			}
		}).then(res=>res.json())
		.then(function (data){
            if (data.items != 0){
                console.log(data);
                historial="si existe";
                // console.log("Si existe!");
            }else{
                historial = "";
                // console.log("No Existe!");
            }
			// console.log("Historial: ",historial)
		})
		.catch(function(err) {
			console.log(err);
		});
	}
}

function get_valid_modulo_edit(){
    let modulo_edit = document.getElementById('modulo_edit').value;
	historial_edit="";
	// console.log(document.getElementById("modulo_edit").value)
	if(document.getElementById('modulo_edit').value!=""){
		endpoint=dominio+'/api/get/'+DBEVENT+'/definiciones/MODULO/=/'+document.getElementById('modulo_edit').value+'/_/_/_'
		// console.log(endpoint)
		fetch(endpoint,{
			method: 'GET',
			headers:{
				"Content-type": "application/json"
			}
		}).then(res=>res.json())
		.then(function (data){
            if (data.items != 0){
                console.log(data);
                console.log(modulo_actual)
                if (data.MODULO == modulo_actual){
                    historial_edit = "";
                }else{
                    historial_edit="si existe";
                }
                // console.log("Si existe!");
            }else{
                historial_edit = "";
                // console.log("No Existe!");
            }
			// console.log("Historial Edit: ",historial_edit)
		})
		.catch(function(err) {
			console.log(err);
		});
	}
}

function comprobaractivo(obj){   
	if (obj.checked){
		activo = 1;
	} else{
		activo = 0;
	}
	console.log("Valor de activo: ",activo);
}

function comprobaractivo_edit(obj){   
    if (obj.checked){
        activo_edit = 1;
    } else{
        activo_edit = 0;
    }
    console.log("Valor de activo: ",activo_edit);
}

$('#modal_variantes').find(".modal-header").css("background", "#f44336");