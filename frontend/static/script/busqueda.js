function busqueda_eventos() {
    texto = document.getElementById("areatext")
    resultado = document.getElementById("resultados")
    resultado.innerHTML = '';
    let text = texto.value;
    const myDats = new Set( text.split(/\r?\n/));
    //console.log(myDats);

    //Se agregan los elementos que se quieren encontrar
    myDats.forEach(pedido => {
        const referencia = document.createElement("p")
        referencia.id = `${pedido}`
        referencia.innerHTML = `${pedido}`;
        referencia.classList = 'perdido'
        resultado.appendChild(referencia)
    })

    //Se Buscan los eventos cargados
    fetch(dominio + '/api/get/eventos')
        .then(res => res.json())
        .then(function (data) {

            //console.log("DATA: ", data);
            //console.log(data.eventos)
            eventoArray = data.eventos
            myDats.forEach(pedido => {
                //console.log(pedido);
                let keys = Object.keys(eventoArray)
                // console.log("Keys:", keys)
                // console.log("pedido:", document.getElementById(pedido))

                for (let i = 0; i < keys.length; i++) {
                    const evento = keys[i]
                    fetch(`${dominio}/api/get/${evento}/pedidos/PEDIDO/=/${pedido}/_/=/_`)
                        .then(data => data.json())
                        .then(data => {
                            if (document.getElementById(data.PEDIDO) && data.PEDIDO != undefined) {
                                var encontrado = document.getElementById(`${data.PEDIDO}`)
                                
                                if (encontrado.innerHTML.length <= 18) {
                                    encontrado.classList = 'encontrado'
                                    encontrado.innerHTML = `${data.PEDIDO} - ${evento}`;
                                
                                }else{
                                    var repetido = document.createElement('p');
                                    repetido.classList = 'encontradoXn'
                                    repetido.innerHTML = `${data.PEDIDO} - ${evento}`;
                                    resultado.appendChild(repetido)
                                }
                                
                            }
                        })
                }

            });

        })


    // console.log(files);
    // file = files 
    //  var formData = new FormData();
    //  console.log("Nombre del Archivo: ",file.name);
    //  console.log("Archivo: ",file);

    //  formData.append('name', file.name);
    //  formData.append('file', file);

    //  console.log("formData name: ",formData.get('name'));
    //  console.log("formData file: ",formData.get('file'));
    //  fetch(dominio+'/upload/modularities', {
    //  	method: 'POST',
    //  	body: formData
    //  	})
    //  	.then(response => response.json())
    //      .then(result => {
    //          console.log('Resultado:', result);
    //          })



}

$(document).on('click', '#busqueda', function () {
    var conjunto = document.getElementById('conjunto')
    if (conjunto.classList.contains('abrir')) {
        // console.log('Marco');
        conjunto.classList.remove('abrir')
        conjunto.classList.add('cerrar')
        
    }else{
        // console.log('Polo');
        conjunto.classList.remove('cerrar')
        conjunto.classList.add('abrir')
    }
})

