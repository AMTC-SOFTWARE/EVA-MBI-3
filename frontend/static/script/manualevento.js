let DBEVENT;
///////// Función para cargar los eventos encontrados en la base de datos. Se activa al cargar el html o al agregar un evento o cambiar el status de alguno ya existente. /////////
function loadEvents(){
    fetch(dominio+'/api/get/eventos')
    .then(res=>res.json())
    .then(function (data){
        console.log("DATA: ",data);
        // console.log(data.eventos)
        let keys = Object.keys(data.eventos)
        // console.log("Keys:",keys)
        for (let i = 0; i < keys.length; i++) {
            // console.log("Evento: ",keys[i]);
            let modif_name_1 = keys[i].replace(/_/g, '-') // Se reemplazan los "_" encontrados en el nombre del Evento por "-" 
            let modif_name_2 = modif_name_1.replace("evento-", '') // Se elimina el string inicial "evento-" del nombre
            let eventoFinal = modif_name_2.toUpperCase() // Transformación a Mayúsculas
            let eventoStatus = data.eventos[keys[i]][1];
            // console.log("Evento Final: ",eventoFinal);
            // console.log("Status del Evento:\n",eventoStatus)

            let containerEventos = document.getElementById('containerEventos');
            let eventoCard = document.createElement('div'); // Creación de div principal para el evento
            let evento_img = document.createElement('div'); // Creación de div para separar la imagen y botones de acciones de el div de información
            evento_img.setAttribute('onmouseover',"this.style.cursor='pointer'");
            let evento_info = document.createElement('div'); // Creación de div para mostrar la información del evento (Nombre y Matriz cargada); (Parte superior del div principal)
            let figure = document.createElement('figure'); // Creación de figure que contiene la imagen del evento y acciones a realizar para el evento; (Parte inferior del div principal)
            let img = document.createElement('img'); // Creación de Imagen para el evento
            let eventoBotones = document.createElement('p'); // Creación de párrafo para situar los botones de acciones para el evento
            let evento_title = document.createElement('h4'); // Creación de título del evento
            eventoCard.classList.add('col-md-3');
            eventoCard.classList.add('col-sm-6');
            eventoCard.classList.add('col-xs-12');
            eventoCard.classList.add('team_sect');
            evento_img.classList.add('eventos');
            evento_info.classList.add('evento-info');
            evento_info.classList.add('text-center');
            eventoBotones.classList.add('evento-botones');
            if (eventoStatus == 1){
                img.src ="static/content/fase.jpg"; // Si el evento está Activo aparecerá con imagen de color azul
            }else{
                img.src ="static/content/fase_disabled.jpg"; // Si el evento está Inactivo aparecerá con imagen de color rojo
            }
            evento_title.classList.add('title');
            evento_title.innerText = eventoFinal;
            evento_info.appendChild(evento_title); // Se anexa el nombre del evento al div encargado de mostrar la información
            eventoCard.appendChild(evento_img);
            eventoCard.appendChild(evento_info);
            evento_img.appendChild(figure);
            figure.appendChild(img);
            figure.appendChild(eventoBotones);
            containerEventos.appendChild(eventoCard);            
        }        
        $('[data-tooltip="tooltip"]').css({"cursor":"pointer"}).tooltip(); // Muestra un tooltip con información cuando se coloca el mouse sobre un elemento con este atributo
    })
    .catch(function(err) {
        console.log(err);
    });
}

///////// Función para cuando se presiona el botón de ver información (Modularidades y Módulos) /////////
$(document).on('click','.title', function(){
    console.log("Click en un Evento para ver sus visuales");
    let eventoName = $(this).closest("div").find("h4.title").text(); // Busca el nombre del evento correspondiente al toggle clickeado.
    eventoName_modif_1 = eventoName.toLowerCase(); // Transforma el nombre del evento a Minúsculas
    eventoName_modif_2 = eventoName_modif_1.replace(/-/g, '_'); // Reemplaza los "-" encontrados en el nombre del evento y los reemplaza por "_"
    eventoName_DB = 'evento_'+eventoName_modif_2; // Al resultado de las modificaciones del nombre le agrega el string "evento_" al inicio para que concuerde con el nombre de la Base de Datos
    console.log(eventoName);
    document.getElementById('ver_info_eventName').innerText = eventoName+ ' INFORMACIÓN';
    $("#opciones").click();
    DBEVENT = eventoName_DB;
    console.log("DB EVENTO ACTUAL: ",DBEVENT);
    sessionStorage.setItem("DBEVENT", DBEVENT);
});
///////// Función para cuando se presiona el botón de ver información (Modularidades y Módulos) /////////
$(document).on('click','.eventos', function(){
    console.log("Click en un Evento para ver sus visuales");
    let eventoName = $(this).closest("div").next().find("h4.title").text(); // Busca el nombre del evento correspondiente al toggle clickeado.
    eventoName_modif_1 = eventoName.toLowerCase(); // Transforma el nombre del evento a Minúsculas
    eventoName_modif_2 = eventoName_modif_1.replace(/-/g, '_'); // Reemplaza los "-" encontrados en el nombre del evento y los reemplaza por "_"
    eventoName_DB = 'evento_'+eventoName_modif_2; // Al resultado de las modificaciones del nombre le agrega el string "evento_" al inicio para que concuerde con el nombre de la Base de Datos
    console.log(eventoName);
    document.getElementById('ver_info_eventName').innerText = eventoName+ ' INFORMACIÓN';
    $("#opciones").click();
    DBEVENT = eventoName_DB;
    console.log("DB EVENTO ACTUAL: ",DBEVENT);
    sessionStorage.setItem("DBEVENT", DBEVENT);
});