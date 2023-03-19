var dominio = 'http://127.0.0.1:5000'; // IP Estacion: 10.71.82.52 IP Pruebas: localhost
console.log("Hola, Soy la actualización del 19 ♥ de Marzo de 2023");
console.log(dominio);
var alerta = document.getElementById('alerta');
var alertasesion = document.getElementById('alertasesion');

function mayuscula(elemento){
  let texto = elemento.value;
  elemento.value = texto.toUpperCase();
}

function usuarioform(){
	var psw = document.getElementById('psw').value;
	sessionStorage.setItem("gafet", psw);
	// console.log(psw);
	if (psw.length===0) {
		alert("Necesita llenar todos los campos correspondientes.");
	}
	else{
		fetch(dominio+'/json2/usuarios/gafet/=/'+psw+'/==/_')
		.then(function(response) {
			if(response.ok) {
				return response.json()
			} else {
				console.log('Se produjo un Error!!');
				alerta.innerHTML = '<div class="alert alert-danger" role="alert">Nombre de usuario o contraseña Incorrecta</div>';
				alerta.style.display = 'block';
			}
		})
		.then(function(data) {
			// console.log(data);
			// console.log(data.items);
			if (data.items != 0) {
				var nombre = data.NAME[0];
				var gafet = data.GAFET[0];
				var tipo = data.TYPE[0];
				// console.log(tipo);
				// console.log(gafet);
				// console.log(nombre);
				sessionStorage.setItem("nombre", nombre);
				sessionStorage.setItem("tipo", tipo);

				const newPost = {
					"NAME": nombre,
					"GAFET": gafet,
					"TYPE": tipo,
					"LOG": "WEB_LOGIN",
					"DATETIME": "AUTO"
				}
				// console.log(newPost);
				fetch(dominio+'/api/post/login',{
					method: 'POST',
					body: JSON.stringify(newPost),
					headers:{
						"Content-type": "application/json"
					}
				}).then(res=>res.json())
				.then(function (data){
					console.log(data);
					location.href = "index.html";
				})
				.catch(function(err) {
					console.log(err);
				});
			}else{
				console.log("Usuario Inexistente");
				alerta.innerHTML = '<div class="alert alert-danger" role="alert">Usuario no encontrado, inténtalo de nuevo</div>';
				alerta.style.display = 'block';
			}
		})
		.catch(function(err) {
			console.log(err);
		});
	}
}

function cerrar(){
	var nombre = sessionStorage.getItem('nombre');
	var gafet = sessionStorage.getItem('gafet');
	var tipo = sessionStorage.getItem('tipo');

	const newPost = {
		"NAME": nombre,
		"GAFET": gafet,
		"TYPE": tipo,
		"LOG": "WEB_LOGOUT",
		"DATETIME": "AUTO"
	}
	// console.log(newPost);
	fetch(dominio+'/api/post/login',{
		method: 'POST',
		body: JSON.stringify(newPost),
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		console.log(data);
		sessionStorage.removeItem('nombre');
		sessionStorage.removeItem('gafet');
		sessionStorage.removeItem('tipo');
		sessionStorage.removeItem('modularidad');
		sessionStorage.removeItem('DBEVENT');
		location.href = "index.html";
	})
	.catch(function(err) {
		console.log(err);
	});	
}

$('#login_modal').on('shown.bs.modal', function () {
    $('#psw').focus();
})

///////// Instrucciones de inicio de sesión dependiendo el tipo de usuario en Gestion General ///////// 
function sesion_1(){
	console.log(sessionStorage.getItem('tipo'));
	switch(sessionStorage.getItem('tipo')){
		case "CALIDAD":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		document.getElementById('botonusuario').classList.remove('disabled');
		document.getElementById('botonparte').classList.remove('disabled');
		document.getElementById('boton_manual').classList.remove('disabled');
		document.getElementById('boton_auto').classList.remove('disabled');
		document.getElementById('tipo').disabled = true;
		document.getElementById('tipo').value = "CALIDAD";
		// document.getElementById('comentariosHeader').style.display = "inline-block";
		break;
		case "SUPCALIDAD":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		document.getElementById('botonusuario').classList.remove('disabled');
		document.getElementById('botonparte').classList.remove('disabled');
		document.getElementById('boton_manual').classList.remove('disabled');
		document.getElementById('boton_auto').classList.remove('disabled');
		document.getElementById('tipo').disabled = false;
		document.getElementById('tipo').value = "SUPCALIDAD";
		document.getElementById('SUPERUSUARIO').style.display = 'none';
        document.getElementById('MANTENIMIENTO').style.display = 'none';
        document.getElementById('PRODUCCION').style.display = 'none';
        document.getElementById('INGENIERIA').style.display = 'none';
		// document.getElementById('comentariosHeader').style.display = "inline-block";
		break;
		case "MANTENIMIENTO":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		document.getElementById('botonusuario').classList.remove('disabled');
		document.getElementById('botonparte').classList.remove('disabled');
		document.getElementById('tipo').disabled = true;
		document.getElementById('tipo').value = "MANTENIMIENTO";
		break;
		case "OPERADOR":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		document.getElementById('botonparte').classList.remove('disabled');
		alert('Usted no tiene el nivel necesario para acceder a la Gestión de datos');
		break;
		case "PRODUCCION":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		document.getElementById('botonusuario').classList.remove('disabled');
		document.getElementById('botonparte').classList.remove('disabled');
		document.getElementById('boton_manual').classList.remove('disabled');
		document.getElementById('tipo').value = "PRODUCCION";
		document.getElementById('CALIDAD').disabled = true;
		document.getElementById('MANTENIMIENTO').disabled = true;
		document.getElementById('INGENIERIA').disabled = true;
		document.getElementById('SUPERUSUARIO').disabled = true;
		break;
		case "INGENIERIA":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		document.getElementById('botonusuario').classList.remove('disabled');
		document.getElementById('botonparte').classList.remove('disabled');
		document.getElementById('boton_manual').classList.remove('disabled');
		document.getElementById('boton_auto').classList.remove('disabled');
		document.getElementById('tipo').value = "INGENIERIA";
		document.getElementById('CALIDAD').disabled = true;
		document.getElementById('MANTENIMIENTO').disabled = true;
		document.getElementById('PRODUCCION').disabled = true;
		document.getElementById('OPERADOR').disabled = true;
		document.getElementById('SUPERUSUARIO').disabled = true;
		break;
		case "SUPERUSUARIO":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		document.getElementById('botonusuario').classList.remove('disabled');
		document.getElementById('botonparte').classList.remove('disabled');
		document.getElementById('boton_manual').classList.remove('disabled');
		document.getElementById('boton_auto').classList.remove('disabled');
		// document.getElementById('dbbkup').style.display = "inline-block";
		// document.getElementById('comentariosHeader').style.display = "inline-block";
		break;
		default:
		console.log("Ningún usuario logueado");
	}
}
///////// Instrucciones de inicio de sesión dependiendo el tipo de usuario en index, monitoreo, maquina e historial ///////// 
function sesion_2(){
	console.log(sessionStorage.getItem('tipo'));
	switch(sessionStorage.getItem('tipo')){
		case "CALIDAD":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		// document.getElementById('comentariosHeader').style.display = "inline-block";
		break;
		case "SUPCALIDAD":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		// document.getElementById('comentariosHeader').style.display = "inline-block";
		break;
		case "MANTENIMIENTO":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		break;
		case "OPERADOR":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		break;
		case "PRODUCCION":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		break;
		case "INGENIERIA":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		break;
		case "SUPERUSUARIO":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		// document.getElementById('comentariosHeader').style.display = "inline-block";
		break;
		default:
		console.log("Ningún usuario logueado");
		//document.getElementById("resultadomaquina").style.display = "none";
		//alertawarning.innerHTML = '<div class="alert alert-warning" role="alert" style="text-align: center">Necesita iniciar sesión para acceder a esta información</div>';
		//alertawarning.style.display = 'block';
		
	}
}
///////// Instrucciones de inicio de sesión dependiendo el tipo de usuario en páginas para crear un nuevo modulo ///////// 
function sesion_3(){
	console.log(sessionStorage.getItem('tipo'));
	switch(sessionStorage.getItem('tipo')){
		case "CALIDAD":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		// document.getElementById('comentariosHeader').style.display = "inline-block";
		break;
		case "SUPCALIDAD":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		// document.getElementById('comentariosHeader').style.display = "inline-block";
		break;
		case "MANTENIMIENTO":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		break;
		case "OPERADOR":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		break;
		case "PRODUCCION":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		break;
		case "INGENIERIA":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		break;
		case "SUPERUSUARIO":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		// document.getElementById('comentariosHeader').style.display = "inline-block";
		break;
		default:
		console.log("No tiene los permisos necesarios para acceder a esta información");
		document.getElementById("agregarparte").style.display = "none";
		alertasesion.innerHTML = '<div class="alert alert-warning" role="alert" style="text-align: center">Necesita iniciar sesión para acceder a esta información</div>';
		alertasesion.style.display = 'block';
	}
}
///////// Instrucciones de inicio de sesión dependiendo el tipo de usuario en páginas modificar usuarios y pedidos ///////// 
function sesion_4(){
	console.log(sessionStorage.getItem('tipo'));
	switch(sessionStorage.getItem('tipo')){
		case "CALIDAD":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		// document.getElementById('comentariosHeader').style.display = "inline-block";
		break;
		case "SUPCALIDAD":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		// document.getElementById('comentariosHeader').style.display = "inline-block";
		break;
		case "MANTENIMIENTO":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		break;
		case "OPERADOR":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		break;
		case "PRODUCCION":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		break;
		case "INGENIERIA":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		break;
		case "SUPERUSUARIO":
		document.getElementById('iniciarsesion').style.display = "none";
		document.getElementById('cerrarsesion').style.display = "inline-block";
		// document.getElementById('comentariosHeader').style.display = "inline-block";
		break;
		default:
		console.log("No tiene los permisos necesarios para acceder a esta información");
		document.getElementById("registros").style.display = "none";
		alertasesion.innerHTML = '<div class="alert alert-warning" role="alert" style="text-align: center">Necesita iniciar sesión para acceder a esta información</div>';
		alertasesion.style.display = 'block';
	}
}