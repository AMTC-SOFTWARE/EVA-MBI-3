let historial;
let historial_edit;
let activo = 1;
let activo_edit;
let form_pdcr = document.getElementById('form_pdcr');
let form_add_estacion = document.getElementById('form_add_estacion');
let alerta_estacion = document.getElementById('alerta_estacion');
let comentario_actual;
$("form").bind("keypress", function(e) {
    if (e.keyCode == 13) {
        return false;
    }
})

function enviarComentario() {
    //↓↓Creación de Objeto Json que se enviará a la api para ser insertado en la base de datos
    let newPost = {
        "ESTACION": document.getElementById('browsers').value,
        "EVENTO": document.getElementById('evento').value,
        "CONDUCCION": document.getElementById('conduccion').value,
        "FASE": document.getElementById('fase').value,
        "COMENTARIO": document.getElementById('comentario').value,
        "USUARIO": sessionStorage.getItem('nombre'),
        "DATETIME": "AUTO"
    }
    console.log(newPost["USUARIO"]);
    // console.log("NewPost = ", newPost);
    //↓↓ Método para realizar un POST a través de una petición POST realizada a la API
    fetch(dominio + `/api/post/comentarios`, {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(res => res.json()) // .txt .log Arrow Function
        .then(function(data) {

            console.log("Data: ", data);
            if (data["items"] === 1) {
                console.log("INSERTION OK");
                document.getElementById('comentario').value = "";
            } else {
                console.log("INSERTION NOT OK");
            }
        })
}

function cleardiv() {
    document.getElementById("tabla").innerHTML = "";
}

let crear = document.getElementById("crear");

function crearComentario() {
    cleardiv();
    if (crear.style.display === 'block') {
        crear.style.display = 'none';
    } else {
        crear.style.display = 'block';
    }
}

function mostrarComentario() {
    crear.style.display = 'none';
    cleardiv();
    fetch(dominio + `/api/get/comentarios/all/-/-/-/-/-`) //metodo get
        .then(res => res.json()) // .txt .log Arrow Function
        .then(data => {
            // console.log(data);
            var colnames = Object.keys(data);
            colnames.splice(colnames.indexOf("ID"), 1);
            colnames.splice(colnames.indexOf("ESTACION"), 1);
            colnames.splice(colnames.indexOf("COMENTARIO"), 1, "ID", "COMENTARIO", "ESTACION");
            colnames.splice(colnames.indexOf("FASE"),1,"DATETIME");
            colnames.splice(colnames.indexOf("DATETIME"),1,"FASE");
            console.log("Columnas: ", colnames);
            var filas = data[colnames[1]].length;
            // console.log("Num de Registros:", filas);

            //CREACIÓN DE TABLA
            /** Observacion: la tabla creada por el Script Datatables es sensible a la limpieza de la base de datos MYSQL, 
             * creando una malfuncion al momento de crear la tabla en html **/
            var myTableDiv = document.getElementById("tabla");
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
            var th = document.createElement('TH')
            th.width = '100';
            th.appendChild(document.createTextNode('Operación'));
            tr.appendChild(th).style.backgroundColor = "#0DBED6";
            //FILAS DE LA TABLA
            for (i = 0; i < filas; i++) {
                var tr = document.createElement('TR');
                for (j = 0; j < colnames.length; j++) {
                    var td = document.createElement('TD')
                    if (j === 1) {
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
                        data[colnames[j]][i] = "";
                            
                    }
                    td.appendChild(document.createTextNode(data[colnames[j]][i]));
                    tr.appendChild(td)
                    console.log(document.createTextNode(data[colnames[j]]));
                }
            
                var td = document.createElement('TD');
                var boton = document.createElement('button');
                var eliminar = document.createElement('i');
                eliminar.classList.add("fas");
                eliminar.classList.add("fa-trash");
                boton.title = "Eliminar";
                boton.classList.add('btn');
                boton.classList.add('btn-danger');
                boton.classList.add('btn-delete-estacion');
                var botondos = document.createElement('button');
                var modificar = document.createElement('i');
                modificar.classList.add("fas");
                modificar.classList.add("fa-edit");
                botondos.title = 'Modificar';
                botondos.classList.add('btn');
                botondos.classList.add('btn-primary');
                botondos.classList.add('btn-edit-estacion');
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
            });
            $("#myTable tr").click(function() {
                var value = $(this).find('td:first').next().next().html();
                // alert(value);
            });
        })
}

$(document).on('click','.btn-ver-torque', function(){
    var id_info = $(this).parent().parent().children().first().text();
    var header = $(this).closest("td");
    var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
    if (isNaN(id_info)==true) {
      // console.log("CAMPO EN MODO RESPONSIVE");
      console.log("Header Responsive: ",id_info);
    //   var id_info_responsive = header.parent().prev().find("td:first").text();
    //   console.log("ID Responsive del registro: ",id_info_responsive);
    //   document.getElementById("header").innerHTML = id_info;
    //   fetch(dominio+"/api/get/comentarios/id/=/"+id_info_responsive+"/_/=/_")
    //   .then(data=>data.json())
    //   .then(data=>{
    //     // console.log(data);
    //     // console.log(data[id_info]);
    //     document.getElementById("informacion").innerHTML = data[id_info];
    //     $('#mostrar_qr').click();
    //   })  
    } else{
      console.log("ID del registro: ",id_info);
      console.log("Header: ",header_info);
      document.getElementById("header").innerHTML = header_info;
      fetch(dominio+"/api/get/comentarios/id/=/"+id_info+"/_/=/_")
      .then(data=>data.json())
      .then(data=>{
         console.log(data);
         console.log(data[header_info]);
        document.getElementById("informacion").innerHTML = data[header_info];
        $('#mostrar_qr').click();
      })
    }
  });


$(document).on('click', '.btn-delete-estacion', function() {
    var elim = $(this).parent().parent().children().first().text();
    var gafetelim;
    let header = $(this).closest("td");
    let header_responsive = header.closest("table").find("thead > tr > th").eq(header.index()).text();
    console.log("ID a eliminar: ", elim);
    if (elim == "Operación") {
        console.log("CAMPO EN MODO RESPONSIVE");
        // console.log("Header Responsive: ",header_responsive);
        var elim_responsive = header.parent().prev().find("td:first").text();
        console.log("ID Responsive del registro: ", elim_responsive);
        fetch(dominio + "/api/get/comentarios/ID/=/" + elim_responsive + "/_/=/_")
            .then(data => data.json())
            .then(data => {
                // console.log(data);
                var opcion = confirm("¿Está seguro de que desea eliminar este registro?");
                if (opcion == true) {
                    fetch(dominio + '/api/delete/comentarios/' + elim_responsive, {
                            method: 'POST'
                        }).then(res => res.json())
                        .then(function(data) {
                            console.log(data);
                            mostrarComentario();
                            alert('Haz eliminado el registro');

                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                } else {
                    console.log('Haz cancelado la acción')
                }
            })
    } else {
        fetch(dominio + "/api/get/comentarios/ID/=/" + elim + "/_/=/_")
            .then(data => data.json())
            .then(data => {
                console.log("Data de registro a eliminar", data);
                var opcion = confirm("¿Está seguro de que desea eliminar este registro?");
                if (opcion == true) {
                    fetch(dominio + '/api/delete/comentarios/' + elim, {
                            method: 'POST'
                        }).then(res => res.json())
                        .then(function(data) {
                            console.log(data);
                            mostrarComentario();
                            alert('Haz eliminado el registro');

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

$(document).on('click', '.btn-edit-estacion', function() {
    // console.log("Tipo de Usuario registrado: ",sessionStorage.getItem('tipo'));
    var edit_id = $(this).parent().parent().children().first().text();
    var edit = $(this).parent().parent().children().next().first().text();
    let header = $(this).closest("td");
    let header_responsive = header.closest("table").find("thead > tr > th").eq(header.index()).text();
    id = edit_id;
    if (edit_id == "Operación") {
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
    } else {
        console.log("Nombre de comentario: ", edit);
        console.log("Id: ", edit_id);
        comentario_actual = edit

        fetch(dominio + "/api/get/comentarios/ID/=/" + edit_id + "/_/=/_")
            .then(data => data.json())
            .then(data => {
                console.log(data);
                $('#mostrar_estacions').click();
                // activo_edit = data.ACTIVE;
                // document.getElementById('comentario_edit').value = data.COMENTARIO;
                document.getElementById('estacion_edit').value = data.ESTACION;
                document.getElementById('evento_edit').value = data.EVENTO;
                document.getElementById('fase_edit').value = data.FASE;
                document.getElementById('conduccion_edit').value = data.CONDUCCION;
                // if (data.ACTIVE == 1) {
                //     document.getElementById("activo_edit").checked = true;
                // } else {
                //     document.getElementById("activo_edit").checked = false;
                // }
            })
    }
});

function guardar_edit() {
    // console.log("Este es el valor final del flagusuario", flagusuario);
    // console.log("Este es el valor final del flagpass", flagpass);
    let comentario_edit = document.getElementById('comentario_edit').value;
    let estacion_edit = document.getElementById('estacion_edit').value;
    let evento_edit = document.getElementById('evento_edit').value
    let conduccion_edit = document.getElementById('conduccion_edit').value
    let fase_edit = document.getElementById('fase_edit').value
    let usuario_edit = sessionStorage.getItem('nombre')
    if (comentario_edit.length === 0) {
        alert("Necesita llenar todos los campos correspondientes.");
    } else {
        if (historial_edit != "si existe") {
            const newPost = {
                "COMENTARIO": comentario_edit,
                "ESTACION": estacion_edit,
                "EVENTO": evento_edit,
                "CONDUCCION": conduccion_edit,
                "FASE": fase_edit,
                "DATETIME": "AUTO",
                "USUARIO": usuario_edit,
                // "ACTIVE": activo_edit
            }
            console.log("Este es el newpost: ", newPost);
            console.log("Id enviado al Post: ", id);
            fetch(dominio + '/api/update/comentarios/' + id, {
                    method: 'POST',
                    body: JSON.stringify(newPost),
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(function(data) {
                    console.log(data);
                    location.href = "comentarios.html";
                })
                .catch(function(err) {
                    console.log(err);
                });
        } else {
            console.log("NO SE HIZO EL UPDATE");
        }
    }
}


