function get_valid_pedido_1(){
    hm =  document.getElementById('pedido').value;
    //console.log( hm )
    fetch(dominio + "/api/get/historial/HM/=/" + hm + "/_/=/_")
      .then(data => data.json())
      .then(data => {
          //console.log(data)
          var fechas = data.INICIO;
          fechas.forEach(date => {
              //console.log(date)
              option = document.createElement('option')
              fecha_url = moment.utc(date).format("MM/ DD/ YYYY/ HH:mm:ss")
              option.innerHTML = fecha_url;
              document.getElementById('historial_option_date').appendChild(option)
              console.log(fecha_url)
            
          });
      })
      document.getElementById('historial_option_date').style.display='inherit';

}

function pedido_selected(){
console.log("Por aqui paso un caballo 🐴 ");
}