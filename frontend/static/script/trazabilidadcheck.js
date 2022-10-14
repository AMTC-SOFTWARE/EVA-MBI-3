function cleardiv(){
  document.getElementById("tabla").innerHTML = "";
}
///////////////////// Ver **TODOS** los registros del Servidor de Planta 2 /////////////////////
function famx2_registros_all(){
  cleardiv();
  console.log("URL Fetch GET: \n",dominio+"/server_famx2/get/seghm/all/_/_/_/_/_")
  fetch(dominio+"/server_famx2/get/seghm/all/_/_/_/_/_")
  .then(data=>data.json())
  .then(data=>{
    console.log("Data de SEGHM FAMX2: ",data);
    if (data.items == 0) {
      console.log("Sin registro alguno");
      document.getElementById("tabla").innerHTML = "<label>Tabla sin registros.</label>";
    }else{
      var colnames = Object.keys(data);
      // colnames.splice(colnames.indexOf("ALTURA"),4);
      // colnames.splice(colnames.indexOf("INICIO"),0,"HM");
      // colnames.splice(colnames.indexOf("INTENTOS_T"),9,"FIN");
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
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          td.appendChild(document.createTextNode(data[colnames[j]][i]));
          tr.appendChild(td)
        }
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

///////////////////// Ver registros de **INTERIOR** del Servidor de Planta 2 ///////////////////
function famx2_registros_interior(){
  cleardiv();
  console.log("URL Fetch GET: \n",dominio+"/server_famx2/get/seghm/NAMEPREENSAMBLE/=/INTERIOR/_/_/_")
  fetch(dominio+"/server_famx2/get/seghm/NAMEPREENSAMBLE/=/INTERIOR/_/_/_")
  .then(data=>data.json())
  .then(data=>{
    console.log("Data de SEGHM FAMX2: ",data);
    if (data.items == 0) {
      console.log("Sin registro alguno");
      document.getElementById("tabla").innerHTML = "<label>Tabla sin registros.</label>";
    }else{
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("ID"),1);
      colnames.splice(colnames.indexOf("ENTTORQUE"),2);
      colnames.splice(colnames.indexOf("SALTORQUE"),2);
      colnames.splice(colnames.indexOf("NAMETORQUE"),2);
      colnames.splice(colnames.indexOf("ASIGNADO"),0,"id","ENTTORQUE","SALTORQUE","NAMETORQUE","ENTVISION","SALVISION","NAMEVISION");
      // colnames.splice(colnames.indexOf("INTENTOS_T"),9,"FIN");
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
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          td.appendChild(document.createTextNode(data[colnames[j]][i]));
          tr.appendChild(td)
        }
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