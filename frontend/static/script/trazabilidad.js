function cleardiv(){
  document.getElementById("tabla").innerHTML = "";
}
///////////////////// Cargar Registros de Torques a servidor /////////////////////
function lista_torque(){
  cleardiv();
  fetch(dominio+"/api/get/historial/ID/>/0/RESULTADO/=/1")
  .then(data=>data.json())
  .then(data=>{
    console.log(data);
    if (data.items == 0) {
      console.log("Sin registro alguno");
      document.getElementById("tabla").innerHTML = "<label>Tabla sin registros.</label>";
    }else{
      document.getElementById("cargar_todo_vision").style.display = "none";
      document.getElementById("cargar_todo_torque_trazabilidad").style.display = "inline-block";
      document.getElementById("cargar_todo_torque_valores").style.display = "inline-block";
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("ALTURA"),4);
      colnames.splice(colnames.indexOf("INICIO"),0,"HM");
      colnames.splice(colnames.indexOf("INTENTOS_T"),9,"FIN");
      console.log("Columnas: ", colnames);
      var filas = data[colnames[1]].length;
      // console.log("Num de Registros:",filas);
      // console.log(data[colnames[7]]);

      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("tabla");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.classList.add('nowrap');
      table.cellSpacing="0";
      table.width="100%";
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
      th.appendChild(document.createTextNode('Cargar'));
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
        boton.appendChild(document.createTextNode("Trazabilidad"));
        var cargar_torque_trazabilidad = document.createElement('i');
        cargar_torque_trazabilidad.classList.add("fas");
        cargar_torque_trazabilidad.classList.add("fa-file-upload");
        boton.title = 'Cargar Registro';
        boton.classList.add('btn');
        boton.classList.add('btn-warning');
        boton.classList.add('btn-cargar_torque_trazabilidad');
        boton.appendChild(cargar_torque_trazabilidad);
        var botondos = document.createElement('button');
        botondos.appendChild(document.createTextNode("Valores"));
        var cargar_torque_valores = document.createElement('i');
        cargar_torque_valores.classList.add("fas");
        cargar_torque_valores.classList.add("fa-file-upload");
        botondos.title = 'Cargar Registro';
        botondos.classList.add('btn');
        botondos.classList.add('btn-primary');
        botondos.classList.add('btn-cargar_torque_valores');
        botondos.appendChild(cargar_torque_valores);
        td.appendChild(boton);
        td.append(" ");
        td.appendChild(botondos);
        tr.appendChild(td)
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable({
          responsive:true
        });
      });
    }
  })
}

$(document).on('click','.btn-cargar_torque_trazabilidad', function(){
  let idTrazabilidad = $(this).parent().parent().children().first().text();
  let HM = $(this).parent().parent().children().first().next().text();
  let idSeghm;
  let newPost;
  console.log("HM: ", HM);
  console.log("Id de HM: ",idTrazabilidad);

  fetch(dominio+"/api/get/historial/ID/=/"+idTrazabilidad+"/_/_/_")
  .then(data=>data.json())
  .then(data=>{
    console.log("Data de Trazabilidad Local: ",data);
    console.log(data.INICIO);
    console.log(data.FIN);
    let enttorque = new Date(data.INICIO).getUTCFullYear()+"-"+(new Date(data.INICIO).getUTCMonth()+1)+"-"+new Date(data.INICIO).getUTCDate()+" "+new Date(data.INICIO).getUTCHours()+":"+new Date(data.INICIO).getUTCMinutes()+":"+new Date(data.INICIO).getUTCSeconds()
    let saltorque = new Date(data.FIN).getUTCFullYear()+"-"+(new Date(data.FIN).getUTCMonth()+1)+"-"+new Date(data.FIN).getUTCDate()+" "+new Date(data.FIN).getUTCHours()+":"+new Date(data.FIN).getUTCMinutes()+":"+new Date(data.FIN).getUTCSeconds()
    newPost = {
      "ENTTORQUE": enttorque,
      "SALTORQUE": saltorque,
      "NAMETORQUE": "EVTA-MBI-1"
    }
    fetch(dominio+"/server_famx2/get/seghm/HM/=/"+HM+"/_/_/_")
    .then(data=>data.json())
    .then(data=>{
      console.log("Data de SEGHM: ",data);
      if (data.items == 0){
        console.log("No hay nada SEGHM")
      }else{
        console.log("Es un array?:",Array.isArray(data.id))
        // Si existen más de un HM en el servidor:
        if (Array.isArray(data.id) == true) {
          console.log("HM Redundante en el servidor: ",HM)
        }else{ // Si solo existe un HM en el servidor puede hacer el envío normalmente:
          console.log("REFERENCIAAAAAA: ",data.REFERENCIA)
          if (data.REFERENCIA.includes("ILX") | data.REFERENCIA.includes("IRX")) {
            console.log("SI ES UN ILX!!!")          
            idSeghm = data.id
            console.log("ID en SEGHM: ",idSeghm)
            console.log("NewPost que se envía: ",newPost)
            return fetch(dominio+'/server_famx2/update/seghm/'+idSeghm,{
              method: 'POST',
              body: JSON.stringify(newPost),
              headers:{
                "Content-type": "application/json"
              }
            })
            .then(res=>res.json())
            .then(function (data){
              console.log("Data del Update: ",data);
            })
          }
        }

      }
      
    })
  })

  
});

$(document).on('click','.btn-cargar_torque_valores', function(){
  let idTrazabilidad = $(this).parent().parent().children().first().text();
  let HM = $(this).parent().parent().children().first().next().text();
  let idSeghm;
  let newPost;
  console.log("HM: ", HM);
  console.log("Id de HM: ",idTrazabilidad);

  fetch(dominio+"/api/get/historial/ID/=/"+idTrazabilidad+"/_/_/_")
  .then(data=>data.json())
  .then(data=>{
    console.log("Data de Historial Local: ",data);
    console.log("Inicio: ",data.INICIO);
    console.log("FIN: ",data.FIN);
    let enttorque = new Date(data.INICIO).getUTCFullYear()+"-"+(new Date(data.INICIO).getUTCMonth()+1)+"-"+new Date(data.INICIO).getUTCDate()+" "+new Date(data.INICIO).getUTCHours()+":"+new Date(data.INICIO).getUTCMinutes()+":"+new Date(data.INICIO).getUTCSeconds()
    let saltorque = new Date(data.FIN).getUTCFullYear()+"-"+(new Date(data.FIN).getUTCMonth()+1)+"-"+new Date(data.FIN).getUTCDate()+" "+new Date(data.FIN).getUTCHours()+":"+new Date(data.FIN).getUTCMinutes()+":"+new Date(data.FIN).getUTCSeconds()
    newPost = {
      "HM": data.HM,
      "RESULTADO": data.RESULTADO,
      "VISION": data.VISION,
      "ALTURA": data.ALTURA,
      "INTENTOS_VA": data.INTENTOS_VA,
      "TORQUE": data.TORQUE,
      "ANGULO": data.ANGULO,
      "INTENTOS_T": data.INTENTOS_T,
      "SCRAP": data.SCRAP,
      "SERIALES": data.SERIALES,
      "INICIO": enttorque,
      "FIN": saltorque,
      "USUARIO": data.USUARIO,
      "NOTAS": data.NOTAS
    }
    console.log("newPost: ",newPost);
    fetch(dominio + '/server_famx2/post/seghm_valores', {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {"Content-type": "application/json"}
    }).then(res => res.json())
    .then(function(data) {
      console.log(data);
    })
  })
});

/////// Al presionar el Botón de Cargar Todos los registros de TORQUE para Trazabilidad
$(document).on('click','#cargar_todo_torque_trazabilidad', function(){
  console.log("Click en cargar todos los registros de TORQUE!")

  fetch(dominio+"/api/get/historial/ID/>/0/RESULTADO/=/1")
  .then(data=>data.json())
  .then(data=>{
    console.log("Data de Historial Torque Local: ",data);
    console.log("Data ID de Historial Torque Local: ",data.ID);
    let totalRegistros = data.ID
    console.log("Cantidad Total de Registros de Historial Torque Local: ",totalRegistros.length);
    for (let i = 0; i < totalRegistros.length; i++) {
      let enttorque;
      let saltorque;
      // console.log("ID: ",totalRegistros[i]);
      // console.log("HM: ",data.HM[i]);
      // console.log("INICIO: ",data.INICIO[i]);
      // console.log("FIN: ",data.FIN[i]);

      enttorque = new Date(data.INICIO[i]).getUTCFullYear()+"-"+(new Date(data.INICIO[i]).getUTCMonth()+1)+"-"+new Date(data.INICIO[i]).getUTCDate()+" "+new Date(data.INICIO[i]).getUTCHours()+":"+new Date(data.INICIO[i]).getUTCMinutes()+":"+new Date(data.INICIO[i]).getUTCSeconds()
      saltorque = new Date(data.FIN[i]).getUTCFullYear()+"-"+(new Date(data.FIN[i]).getUTCMonth()+1)+"-"+new Date(data.FIN[i]).getUTCDate()+" "+new Date(data.FIN[i]).getUTCHours()+":"+new Date(data.FIN[i]).getUTCMinutes()+":"+new Date(data.FIN[i]).getUTCSeconds()
      newPost = {
        "ENTTORQUE": enttorque,
        "SALTORQUE": saltorque,
        "NAMETORQUE": "EVTA-MBI-1"
      }
      enviarInfo_t(data.HM[i],newPost);     
    }
    
  })

  function enviarInfo_t(x,y){
    // console.log("X: ",x)
    // console.log("Y: ",y)
    fetch(dominio+"/server_famx2/get/seghm/HM/=/"+x+"/_/_/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log("Data de SEGHM: ",data);
      if (data.items == 0){
        console.log("No hay nada SEGHM")
      }else{
        // console.log("Es un array?:",Array.isArray(data.id))
        // Si existen más de un HM en el servidor:
        if (Array.isArray(data.id) == true) {
          console.log("HM Redundante en el servidor: ",x)
        }else{ // Si solo existe un HM en el servidor puede hacer el envío normalmente:
          if (data.REFERENCIA.includes("ILX") | data.REFERENCIA.includes("IRX")) {
            // console.log("Si pertenece a Interior") 
            idSeghm = data.id
            // console.log("ID en SEGHM: ",idSeghm)
            // console.log("NewPost que se envía: ",y)

            return fetch(dominio+'/server_famx2/update/seghm/'+idSeghm,{
              method: 'POST',
              body: JSON.stringify(y),
              headers:{
                "Content-type": "application/json"
              }
            })
            .then(res=>res.json())
            .then(function (data){
              // console.log("Data del Update: ",data);
            })
          }else{
            console.log("El registro no se actualizó por que no es un ILX: ",data.id,x,data.REFERENCIA)
          }
        }

      }
      
    })
  }

  
  
});
/////// Al presionar el Botón de Cargar Todos los valores de TORQUE al servidor de FAMX2
$(document).on('click','#cargar_todo_torque_valores', function(){
  console.log("Click en cargar todos los valores de TORQUE!")

  fetch(dominio+"/api/get/historial/ID/>/0/RESULTADO/=/1")
  .then(data=>data.json())
  .then(data=>{
    console.log("Data de Historial Torque Local: ",data);
    console.log("Data ID de Historial Torque Local: ",data.ID);
    let totalRegistros = data.ID
    console.log("Cantidad Total de Registros de Historial Torque Local: ",totalRegistros.length);
    for (let i = 0; i < totalRegistros.length; i++) {
      let enttorque;
      let saltorque;
      enttorque = new Date(data.INICIO[i]).getUTCFullYear()+"-"+(new Date(data.INICIO[i]).getUTCMonth()+1)+"-"+new Date(data.INICIO[i]).getUTCDate()+" "+new Date(data.INICIO[i]).getUTCHours()+":"+new Date(data.INICIO[i]).getUTCMinutes()+":"+new Date(data.INICIO[i]).getUTCSeconds()
      saltorque = new Date(data.FIN[i]).getUTCFullYear()+"-"+(new Date(data.FIN[i]).getUTCMonth()+1)+"-"+new Date(data.FIN[i]).getUTCDate()+" "+new Date(data.FIN[i]).getUTCHours()+":"+new Date(data.FIN[i]).getUTCMinutes()+":"+new Date(data.FIN[i]).getUTCSeconds()
      newPost = {
        "HM": data.HM[i],
        "RESULTADO": data.RESULTADO[i],
        "VISION": data.VISION[i],
        "ALTURA": data.ALTURA[i],
        "INTENTOS_VA": data.INTENTOS_VA[i],
        "TORQUE": data.TORQUE[i],
        "ANGULO": data.ANGULO[i],
        "INTENTOS_T": data.INTENTOS_T[i],
        "SCRAP": data.SCRAP[i],
        "SERIALES": data.SERIALES[i],
        "INICIO": enttorque,
        "FIN": saltorque,
        "USUARIO": data.USUARIO[i],
        "NOTAS": data.NOTAS[i]
      }
      enviarInfo_t(newPost);
    }
    
  })

  function enviarInfo_t(x){
    console.log("HM: ",x["HM"])
    fetch(dominio + '/server_famx2/post/seghm_valores', {
      method: 'POST',
      body: JSON.stringify(x),
      headers: {"Content-type": "application/json"}
    }).then(res => res.json())
    .then(function(data) {
      console.log("Respuesta: ",data);
    })
  }
});

///////////////////// Cargar Registros de Visión a servidor /////////////////////
function lista_vision(){
  cleardiv();
  fetch(dominio+"/api/get/historial/ID/>/0/RESULTADO/=/2")
  .then(data=>data.json())
  .then(data=>{
    console.log(data);
    if (data.items == 0) {
      console.log("Sin registro alguno");
      document.getElementById("tabla").innerHTML = "<label>Tabla sin registros.</label>";
    }else{
      document.getElementById("cargar_todo_torque_trazabilidad").style.display = "none";
      document.getElementById("cargar_todo_torque_valores").style.display = "none";
      document.getElementById("cargar_todo_vision").style.display = "inline-block";
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("ALTURA"),4);
      colnames.splice(colnames.indexOf("INICIO"),0,"HM");
      colnames.splice(colnames.indexOf("INTENTOS_T"),9,"FIN");
      console.log("Columnas: ", colnames);
      var filas = data[colnames[1]].length;
      // console.log("Num de Registros:",filas);
      // console.log(data[colnames[7]]);

      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("tabla");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.classList.add('nowrap');
      table.cellSpacing="0";
      table.width="100%";
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
      th.appendChild(document.createTextNode('Cargar'));
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
        var cargar_vision = document.createElement('i');
        cargar_vision.classList.add("fas");
        cargar_vision.classList.add("fa-file-upload");
        boton.title = 'Cargar Registro';
        boton.classList.add('btn');
        boton.classList.add('btn-warning');
        boton.classList.add('btn-cargar_vision');
        boton.appendChild(cargar_vision);
        td.appendChild(boton);
        tr.appendChild(td)
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable({
          responsive:true
        });
      });
    }
  })
}

$(document).on('click','.btn-cargar_vision', function(){
  let idTrazabilidad = $(this).parent().parent().children().first().text();
  let HM = $(this).parent().parent().children().first().next().text();
  let idSeghm;
  let newPost;
  console.log("HM: ", HM);
  console.log("Id de HM: ",idTrazabilidad);

  fetch(dominio+"/api/get/historial/ID/=/"+idTrazabilidad+"/_/_/_")
  .then(data=>data.json())
  .then(data=>{
    console.log("Data de Historial Visión Local: ",data);
    console.log(data.INICIO);
    console.log(data.FIN);
    let entvision = new Date(data.INICIO).getUTCFullYear()+"-"+(new Date(data.INICIO).getUTCMonth()+1)+"-"+new Date(data.INICIO).getUTCDate()+" "+new Date(data.INICIO).getUTCHours()+":"+new Date(data.INICIO).getUTCMinutes()+":"+new Date(data.INICIO).getUTCSeconds()
    let salvision = new Date(data.FIN).getUTCFullYear()+"-"+(new Date(data.FIN).getUTCMonth()+1)+"-"+new Date(data.FIN).getUTCDate()+" "+new Date(data.FIN).getUTCHours()+":"+new Date(data.FIN).getUTCMinutes()+":"+new Date(data.FIN).getUTCSeconds()
    newPost = {
      "ENTVISION": entvision,
      "SALVISION": salvision,
      "NAMEVISION": "EVTA-MBI-1"
    }

    fetch(dominio+"/server_famx2/get/seghm/HM/=/"+HM+"/_/_/_")
    .then(data=>data.json())
    .then(data=>{
      console.log("Data de SEGHM: ",data);
      if (data.items == 0){
        console.log("No hay nada SEGHM")
      }else{
        console.log("Es un array?:",Array.isArray(data.id))
        // Si existen más de un HM en el servidor:
        if (Array.isArray(data.id) == true) {
          console.log("HM Redundante en el servidor: ",HM)
        }else{ // Si solo existe un HM en el servidor puede hacer el envío normalmente:
          console.log("REFERENCIAAAAAA: ",data.REFERENCIA)
          if (data.REFERENCIA.includes("ILX") | data.REFERENCIA.includes("IRX")) {
            console.log("SI ES UN ILX!!!")          
            idSeghm = data.id
            console.log("ID en SEGHM: ",idSeghm)
            console.log("NewPost que se envía: ",newPost)
            return fetch(dominio+'/server_famx2/update/seghm/'+idSeghm,{
              method: 'POST',
              body: JSON.stringify(newPost),
              headers:{
                "Content-type": "application/json"
              }
            })
            .then(res=>res.json())
            .then(function (data){
              console.log("Data del Update: ",data);
            })
          }
        }
      }
    })


  })

  
});

/////// Al presionar el Botón de Cargar Todos los registros de VISION para Trazabilidad
$(document).on('click','#cargar_todo_vision', function(){
  console.log("Click en cargar todos los registros de VISIÓN!")
  fetch(dominio+"/api/get/historial/ID/>/0/RESULTADO/=/2")
  .then(data=>data.json())
  .then(data=>{
    console.log("Data de Historial Visión Local: ",data);
    console.log("Data ID de Historial Visión Local: ",data.ID);
    let totalRegistros = data.ID
    console.log("Cantidad Total de Registros de Historial Visión Local: ",totalRegistros.length);
    for (let i = 0; i < totalRegistros.length; i++) {
      let entvision;
      let salvision;
      // console.log("ID: ",totalRegistros[i]);
      // console.log("HM: ",data.HM[i]);
      // console.log("INICIO: ",data.INICIO[i]);
      // console.log("FIN: ",data.FIN[i]);

      entvision = new Date(data.INICIO[i]).getUTCFullYear()+"-"+(new Date(data.INICIO[i]).getUTCMonth()+1)+"-"+new Date(data.INICIO[i]).getUTCDate()+" "+new Date(data.INICIO[i]).getUTCHours()+":"+new Date(data.INICIO[i]).getUTCMinutes()+":"+new Date(data.INICIO[i]).getUTCSeconds()
      salvision = new Date(data.FIN[i]).getUTCFullYear()+"-"+(new Date(data.FIN[i]).getUTCMonth()+1)+"-"+new Date(data.FIN[i]).getUTCDate()+" "+new Date(data.FIN[i]).getUTCHours()+":"+new Date(data.FIN[i]).getUTCMinutes()+":"+new Date(data.FIN[i]).getUTCSeconds()
      newPost = {
        "ENTVISION": entvision,
        "SALVISION": salvision,
        "NAMEVISION": "EVTA-MBI-1"
      }
      enviarInfo_v(data.HM[i],newPost);     
    }
    
  })

  function enviarInfo_v(x,y){
    // console.log("X: ",x)
    // console.log("Y: ",y)
    fetch(dominio+"/server_famx2/get/seghm/HM/=/"+x+"/_/_/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log("Data de SEGHM: ",data);
      if (data.items == 0){
        console.log("No hay nada SEGHM")
      }else{
        // console.log("Es un array?:",Array.isArray(data.id))
        // Si existen más de un HM en el servidor:
        if (Array.isArray(data.id) == true) {
          console.log("HM Redundante en el servidor: ",x)
        }else{ // Si solo existe un HM en el servidor puede hacer el envío normalmente:
          if (data.REFERENCIA.includes("ILX") | data.REFERENCIA.includes("IRX")) {
            // console.log("Si pertenece a Interior") 
            idSeghm = data.id
            // console.log("ID en SEGHM: ",idSeghm)
            // console.log("NewPost que se envía: ",y)

            return fetch(dominio+'/server_famx2/update/seghm/'+idSeghm,{
              method: 'POST',
              body: JSON.stringify(y),
              headers:{
                "Content-type": "application/json"
              }
            })
            .then(res=>res.json())
            .then(function (data){
              // console.log("Data del Update: ",data);
            })
          }else{
            console.log("El registro no se actualizó por que no es un ILX: ",data.id,x,data.REFERENCIA)
          }
        }

      }
      
    })
  }
});