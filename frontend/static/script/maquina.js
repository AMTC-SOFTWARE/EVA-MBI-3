var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("ff").setAttribute("max", today);
document.getElementById("fi").setAttribute("max", today);

var resultadomaquina = document.getElementById("resultadomaquina")
let chart = document.getElementById('chart');

Chart.defaults.global.defaultFontColor = 'blue';
//Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;

function capturarmaquina(){
	console.log("Hola")
	var url = dominio+"/json4/historial/inicio/>/"+document.getElementById("fi").value+"/</"+document.getElementById("ff").value;
	fetch(url)
	.then(data=>data.json())
	.then(data=>{
		console.log(url);
		console.log(data);
		var fechas = Object.keys(data);
		var fechas_final = [];
		console.log("Fechas: ",fechas);
		console.log(data[fechas[0]]);
		var turnos = Object.keys(data[fechas[0]]);
		console.log("Turnos: ",turnos);
		for (var i = 0; i < fechas.length; i++) {
			fechas_final.push(fechas[i]);
		}		
		console.log("FECHAS FINAL: ",fechas_final);
		console.log(data[fechas[0]])

		var data_run = [];
		var data_idle = [];
		var data_stop = [];
		var turnos_lista = [];
		for (var i = 0; i < fechas_final.length; i++) {
			for (var j = 0; j < turnos.length; j++) {
				turnos_lista.push(turnos[j]);
			}
		}
		console.log(turnos_lista);

		for (var i = 0; i < fechas_final.length; i++) {
			console.log("Dentro del for para data: ",data[fechas_final[i]])
			for (var j = 0; j < turnos.length; j++) {
				console.log("Dentro del for para data 2: ",data[fechas_final[i]][turnos[j]]["pause"]);
				data_run.push(data[fechas_final[i]][turnos[j]]["running"]);
				data_idle.push(data[fechas_final[i]][turnos[j]]["pause"]);
				data_stop.push(data[fechas_final[i]][turnos[j]]["stop"]);
			}
		}

		console.log("DATA RUN: ",data_run);
		console.log("DATA PAUSE: ",data_idle);
		console.log("DATA STOP: ",data_stop);	

		if (chart.getContext) {
			var ctx = chart.getContext("2d");		
			var myChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: fechas_final,
					datasets: [{
						label: 'Run',
						backgroundColor: "green",
						data: data_run,
					},{
						label: 'Idle',
						backgroundColor: "yellow",
						data: data_idle,
					},{ 
						label: 'Stop',
						backgroundColor: "red",
						data: data_stop,
					}]//,
					//showTooltips: false
				},
				options: {
					tooltips:{
						enabled:true,
						mode: 'index',
						intersect: false
					  },
					responsive: true,
					scales: {
						xAxes: [
						{
							stacked: true,
							labels: turnos_lista
						},
						{
							id: 'xAxis1',
							type: 'category',
							offset: true,
							gridLines: {
								offsetGridLines: true
							}
						}
						],
						yAxes: [{
							stacked: false,
							ticks: {
								beginAtZero: true,
								min: 0,
								max: 100,
								callback: function(value) {
								return value + "%"
								}
								//stepSize: 0
								//suggestedMin: 0
							    }
							}, { 
								id: "bar-stacked", 
								stacked: true, 
								display: false, //optional if both yAxes use the same scale 
								ticks: { 
								beginAtZero: true, 
								min: 0, 
								max: 100 
							}, 
							scaleLabel: {
								display: true,
								labelString: "Percentage"
								},
							type: 'linear'
						}]
					}
				}
			});
		}
	});
}

