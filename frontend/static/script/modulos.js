let DBEVENT = sessionStorage.getItem("DBEVENT");
console.log("DBEVENT ACTUAL: ",DBEVENT);
let modif_name_1 = DBEVENT.replace(/_/g, '-') // Se reemplazan los "_" encontrados en el nombre del Evento por "-" 
let modif_name_2 = modif_name_1.replace("evento-", '') // Se elimina el string inicial "evento-" del nombre
let eventoFinal = modif_name_2.toUpperCase();
document.getElementById('tituloEvento').innerText = eventoFinal;
var registros = document.getElementById("registros")

function botones_mostrar(){
	if (registros.style.display === 'block') {
		registros.style.display = 'none';
	} else{
		registros.style.display = 'block';
	}
}