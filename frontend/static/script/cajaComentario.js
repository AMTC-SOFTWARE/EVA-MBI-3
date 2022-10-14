let historial_edit;
var intento = 0
$(document).on('click', '.btn-ver-comentario', function () {
var hmget = this.value

document.getElementById('comentario_edit_title').textContent = 'Comentarios';
document.getElementById('modal-comment-footer').innerHTML = ''
document.getElementById('modal-dialog').style.width = '900px';
document.getElementById('modal-dialog').style.top = '20%';

verValores(hmget)
    $('#mostrar_estacions').click();
    
})

function verValores(hmget) {
    intento = 0
    var comentarios = document.getElementById('formusuario');
    comentarios.innerHTML = "";
    comentarios.classList.add("comment-active")
    // document.querySelector('modal-dialog-centered').style.top = '20%'
    fetch(dominio + `/api/get/comentarios/all/-/-/-/-/-`) //metodo get
        .then(res => res.json()) // .txt .log Arrow Function
        .then(data => {
            var colnames = Object.keys(data);
             //console.log(colnames)
             colnames.splice(colnames.indexOf("ID"),1)
             colnames.splice(colnames.indexOf("ESTACION"),0,"ID")
            let prueba = document.getElementById('formusuario');
            var filas = data[colnames[1]].length;
            console.log(hmget);
            if (data['HM'].indexOf(hmget)===-1){
            prueba.innerHTML = '<b>Sin Comentarios</b>'    
            }else{
                prueba.innerHTML = '';        
            }
            for (let i = filas-1; i > 0; i--) {
                if (data['HM'][i] === hmget) { 
                var seccion = document.createElement('div');
                seccion.classList = 'contenedor'
                //console.log(`fila ${i}`);
                dato = document.createElement('div');

                dato.id = `fila`;
                dato.classList = "flex-box etiquetas"
                prueba.appendChild(dato);
                for (let j = 0; j < colnames.length; j++) {
                    var propiedades = document.createElement('div')
                    propiedades.classList = 'flex-box column-reverse'
                    const col = data[colnames[j]][i];
                    let column = document.createElement('div');
                    tag = document.createElement('div');
                    //column.innerHTML = col;
                    //console.log(colnames[j])
                    switch (colnames[j]) {
                        case "COMENTARIO":
                            let att = document.createElement('p');
                            att.innerHTML = `ATT: <b class= 'usuario'>  ${data[colnames [colnames.indexOf('USUARIO')]][i]} <b/>`;
                            let texto = document.createElement('p');
                            texto.innerHTML = col;
                            texto.classList = "comentario"
                            column.appendChild(texto);
                            column.appendChild(att);
                            seccion.appendChild(column);
                            prueba.appendChild(seccion)
                            break;
                        case "DATETIME":
                            var fecha = document.createElement('p')
                            fecha.innerHTML = col;
                            fecha.classList = "fecha"
                            fecha.id = "fecha"
                            fecha.style.margin = 0
                            propiedades.appendChild(fecha);
                            if (data["HM"][i] !== null){
                                var hm = document.createElement('p')
                                hm.innerHTML = data["HM"][i];
                                hm.classList = "hm";
                                hm.style.margin = 0
                                propiedades.appendChild(hm)
                            }                           
                            column.appendChild(propiedades);
                            seccion.appendChild(column);
                            prueba.appendChild(seccion)
                            break;
                        case "HM":
                            break;
                        case "USUARIO":
                            break;
                        case "ID": ///DROPDOWN
                            var idReference = col;

                            column.classList = "dropMenu"
                            column.innerHTML ='';

                            var input = document.createElement("input")
                            input.classList = 'ocultarCheck'
                            input.setAttribute("type", "checkbox");

                            var dropdown = document.createElement('div');
                            dropdown.classList = 'dropItDown'
                            var borrar = document.createElement('button');
                            var editar = document.createElement('button');

                            borrar.innerHTML ='Eliminar Comentario';
                            borrar.value = idReference;
                            borrar.id = 'delete-btn';
                            borrar.classList = 'optionButton'

                            editar.innerHTML ='Editar Comentario';
                            editar.value = idReference;
                            editar.onclick = function() {callme(this)}
                            editar.id = 'edit-btn';
                            editar.classList = 'optionButton';

                            dropdown.appendChild(borrar)
                            dropdown.appendChild(editar)

                            var dropOptions = document.createElement('button')
                            dropOptions.classList = 'dropOptions';
                            dropOptions.value = idReference;
                            // dropOptions.onclick = function() {callme()};

                            var dropIcon = document.createElement('i')
                            dropIcon.classList = 'fas fa-ellipsis-v';

                            dropOptions.appendChild(dropIcon)

                            column.appendChild(dropOptions)
                            column.appendChild(input)
                            column.appendChild(dropdown)

                            seccion.appendChild(column)

                            //console.log(idReference)
                            break;
                        default:
                            column.innerHTML = col;
                            column.classList = "etiqueta"
                            dato.appendChild(column)
                            seccion.appendChild(dato);
                            break;
                    }
                }
                comentarios.appendChild(seccion);
            }
            }
        });
}



$(document).on('click', '#delete-btn', function() {
    var elim = document.getElementById('delete-btn').value;
    var gafetelim;
    console.log("ID a eliminar: ", elim);
    
        fetch(dominio + "/api/get/comentarios/ID/=/" + elim + "/_/=/_")
            .then(data => data.json())
            .then(data => {
                hm = data.HM
                console.log("Data de registro a eliminar", data);
                var opcion = confirm("¿Está seguro de que desea eliminar este registro?");
                if (opcion == true) {
                    fetch(dominio + '/api/delete/comentarios/' + elim, {
                            method: 'POST'
                        }).then(res => res.json())
                        .then(function(data) {
                            console.log(data);
                            verValores(hm);
                            alert('Haz eliminado el registro');
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                } else {
                    console.log('Haz cancelado la acción')
                }
            })
            document.querySelectorAll('.ocultarCheck').checked = false
});



function callme(idReference){
    edit_id =  idReference.value    
        fetch(dominio + "/api/get/comentarios/ID/=/" + edit_id + "/_/=/_")
        .then(data => data.json())
        .then(data => {
            //console.log(data);
            let commentEdit = document.querySelectorAll('.comentario')
            let idEdit = document.querySelectorAll('.dropOptions')
            let checkFalse = document.querySelectorAll('.ocultarCheck')
            let etiquetas = document.querySelectorAll('.etiquetas')
            i = -1;
            hm = data.HM;
            for (let index = 0; index < idEdit.length; index++) {
            const edit = idEdit[index];
            if (edit.value == data.ID ) {
                if (intento === 0) {
                    intento = 1
                    checkFalse[index].checked = false
                    /** Agregando formato para añadir texto**/
                    commentEdit[index].innerHTML = '';
                    textArea = document.createElement('textarea')
                    textArea.id = 'textArea';
                    textArea.style.width = '780px';
                    textArea.style.height = '150px';
                    textArea.value = data.COMENTARIO
                    commentEdit[index].appendChild(textArea)
                    /** Agregando formato para añadir menu de opciones select**/
                    etiquetas[index].innerHTML = ''

                    ///CREACION DEL MENU DE OPCIONES CONDUCCION
                    let conduccion = document.createElement('select')
                    conduccion.id = 'conduccion'
                    let opciones = ['IZQUIERDO', 'DERECHO'];
                    opciones.forEach(cadaOpcion => {
                        let option = document.createElement('option')
                        option.innerHTML = cadaOpcion
                        conduccion.appendChild(option)
                    });
                    etiquetas[index].appendChild(conduccion)
                    conduccion.value = data.CONDUCCION

                    ///CREACION DEL MENU DE OPCIONES ESTACIONES
                    let estacion = document.createElement('select')
                    estacion.id = 'estacion'
                     opciones = ['TORQUE', 'INSERCION', 'VISION'];
                    opciones.forEach(element => {
                        let option = document.createElement('option')
                        option.innerHTML = element
                        estacion.appendChild(option)
                    });
                    etiquetas[index].appendChild(estacion)
                    estacion.value = data.ESTACION

                    ///CREACION DEL MENU DE OPCIONES EVENTOS
                    let eventos = document.createElement('select')
                    eventos.id = 'eventos'
                    opciones = ['Z296', 'Z294', 'X296', 'X294'];
                    opciones.forEach(cadaOpcion => {
                        let option = document.createElement('option')
                        option.innerHTML = cadaOpcion
                        eventos.appendChild(option)
                    });
                    etiquetas[index].appendChild(eventos)
                    console.log(data.EVENTO)
                    eventos.value = data.EVENTO;

                    ///CREACION DEL MENU DE OPCIONES FASE
                    let fase = document.createElement('input')
                    fase.setAttribute('type', 'text');
                    fase.id = 'fase'
                    fase.style.width = '10rem'
                    fase.style.height = '2rem'
                    etiquetas[index].appendChild(fase)
                    fase.value = data.FASE


                    let cancelButton = document.createElement('button');
                    cancelButton.classList = 'cancel-text btn-rojo';
                    cancelButton.innerHTML = 'Cancelar';
                    cancelButton.onclick = function() {verValores(hm)}
                    etiquetas[index].appendChild(cancelButton)

                    let sendButton = document.createElement('button');
                    sendButton.classList = 'send-text btn-verde';
                    sendButton.innerHTML = 'Enviar';
                    sendButton.onclick = function() {guardar_comentario(data)}
                    etiquetas[index].appendChild(sendButton)

                }else{
                    checkFalse[index].checked = false
                    return false
                }

                }
            }
            })
}

function guardar_comentario(data) {
    //console.log(data)
    let idData  = data.ID
    let dateData = new Date (data.DATETIME)
    let hm = data.HM === ""? "HMNULL" : data.HM
    let newComentario = document.getElementById('textArea').value
    let newConduccion = document.getElementById('conduccion').value
    let newEstacion = document.getElementById('estacion').value
    let newEventos = document.getElementById('eventos').value
    let newFase = document.getElementById('fase').value
    let usuario_edit = sessionStorage.getItem('nombre')

    console.log(idData)
    console.log(newComentario);
    console.log(newConduccion);
    console.log(newEstacion);
    console.log(newEventos);
    console.log(newFase);

    if (newComentario.length === 0) {
        alert("Necesita llenar todos los campos correspondientes.");
    } else {
        if (historial_edit != "si existe") {
            const newPost = {
                "COMENTARIO": newComentario,
                "ESTACION": newEstacion,
                "EVENTO": newEventos,
                "CONDUCCION": newConduccion,
                "FASE": newFase,
                "DATETIME": "AUTO",
                "USUARIO": usuario_edit,
                "HM": hm
            }
            console.log("Este es el newpost: ", newPost);
            console.log("Id enviado al Post: ", idData);
            fetch(dominio + '/api/update/comentarios/' + idData, {
                    method: 'POST',
                    body: JSON.stringify(newPost),
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(function(data) {
                    console.log(data);
                    verValores(hm);
                })
                .catch(function(err) {
                    console.log(err);
                });
        } else {
            console.log("NO SE HIZO EL UPDATE");
        }
    }// $(".cancel_edit").click();
}
$(document).on('click', '.btn-insertar-comentario', function () {
    document.getElementById('comentario_edit_title').textContent = 'Crear Comentario';
    var idValue = this.value
    fetch(dominio + "/api/get/historial/id/=/" + idValue + "/_/=/_")
    .then(data => data.json())
    .then(data => {

    let comentario = document.getElementById('formusuario')//HM COMENTARIO Y OPCIONES
        comentario.innerHTML='';
        document.getElementById('modal-comment-footer').innerHTML = ''

    let formulario = document.createElement('form');
        formulario.innerHTML = ''
        formulario.style.marginTop = '10px';

    let hmTitle = document.createElement('div');
        hmTitle.classList = 'flex-box justify-center'
    let hmLabel = document.createElement('label');
        hmLabel.style.marginRight = '0.5rem'
        hmLabel.innerHTML = 'Hm:';

    let hmValue = document.createElement('p');
        hmValue.id = 'pedidoHM';
        hmValue.innerHTML = data.HM;

        hmTitle.appendChild(hmLabel)
        hmTitle.appendChild(hmValue)
        formulario.appendChild(hmTitle);//Insertando los valores de titulo
        /**↑ENCABEZADO HM ↑**/

        /**↓ CONTENIDO ↓**/
    let contenedor = document.createElement('div');
    let textArea = document.createElement('textarea');
        textArea.id = 'comentario_edit';
        textArea.style.width = '50rem';
        textArea.style.height = '20rem';
        formulario.appendChild(textArea);




    const arrayLabels = {
        'estacion': ['INSERCION','VISION','TORQUE'] ,
        'evento':['Z294','Z296','X294','X296'], 
        'fase':'',
        'conduccion':['IZQUIERDO','DERECHO']
        }

    let labelKeys = Object.keys(arrayLabels)

        for (let l = 0; l < labelKeys.length; l++) {
         const arrayOption = arrayLabels[labelKeys[l]];
         let label = document.createElement('label');
         let input = document.createElement('input');
         let select = document.createElement('select');
             select.id= `${labelKeys[l]}_edit`
            switch (labelKeys[l]) {
                case 'estacion':
                label.innerHTML= 'Estación';       
                break;
                case 'evento':
                label.innerHTML= 'Evento';       
                break;
                case'fase':
                label.innerHTML= 'Fase';
                break;
                case 'conduccion':
                label.innerHTML = 'Conducción'
                break; 
           }
              contenedor.appendChild(label);
        if (labelKeys[l] !== 'fase') { 
           for(let o = 0; o < arrayOption.length; o++) {
               let cadaOpcion = arrayOption[o];
               let option = document.createElement('option');
               option.value = cadaOpcion
               option.id = cadaOpcion
               option.innerHTML = cadaOpcion
               select.appendChild(option)                              
           }
           contenedor.appendChild(select)
        }
        else{
            input.id ='fase_edit';
            input.style.width = '10rem'
            input.style.height = '2rem'
            contenedor.appendChild(input)
        }

        }
        formulario.appendChild(contenedor)
        comentario.appendChild(formulario)
        /**↓Footer↓**/
        let btn_cancel = document.createElement('button');
        btn_cancel.setAttribute('data-dismiss','modal')
        btn_cancel.classList = 'cancel_edit btn-rojo'
        btn_cancel.style.marginRight='0.5rem'  
        btn_cancel.innerHTML = 'Cancelar'  

        let btn_save = document.createElement('button');
        btn_save.classList = 'guardar_edit btn-verde'
        btn_save.onclick = function (){ guardar_edit(dateHM, hm)}
        btn_save.innerHTML = 'Guardar Cambios'
    
        document.getElementById('modal-comment-footer').appendChild(btn_cancel)
        document.getElementById('modal-comment-footer').appendChild(btn_save)
        
        // document.getElementById("pedidoHM").innerHTML = data["HM"];
        
          hm = data["HM"];
          dateHM = data["INICIO"]
          console.log(data["INICIO"])
        })
  $('#mostrar_estacions').click();
  })
  
  function guardar_edit(dateHM, hm) {
    let comentario_edit = document.getElementById('comentario_edit').value;
    let estacion_edit = document.getElementById('estacion_edit').value;
    let evento_edit = document.getElementById('evento_edit').value
    let conduccion_edit = document.getElementById('conduccion_edit').value
    let fase_edit = document.getElementById('fase_edit').value
    let usuario_edit = sessionStorage.getItem('nombre')
    dateHM = new Date(dateHM)
   
    if (comentario_edit.length === 0) {
        alert("Necesita llenar todos los campos correspondientes.");
    } else {
        // if (historial_edit != "si existe") {
            const newPost = {
                "COMENTARIO": comentario_edit,
                "ESTACION": estacion_edit,
                "EVENTO": evento_edit,
                "CONDUCCION": conduccion_edit,
                "FASE": fase_edit,
                "DATETIME": "AUTO",
                "USUARIO": usuario_edit,
                "HM": hm
            }
            console.log("Este es el newpost: ", newPost);
            console.log("Id enviado al Post: ", id);
            fetch(dominio + `/api/post/comentarios`, {
              method: 'POST',
              body: JSON.stringify(newPost),
              headers: {
                  "Content-type": "application/json"
              }
                })
                .then(res => res.json())
                .then(function(data) {
                    verValores(hm);
                    $(".cancel_edit").click();
                    // location.href = "comentarios.html";
                })
                .catch(function(err) {
                    console.log(err);
                });
       // } else {
          //  console.log("NO SE HIZO EL UPDATE");
        //}
    }
}