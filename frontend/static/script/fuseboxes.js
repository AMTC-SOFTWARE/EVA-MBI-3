


function getDistance_fuse(x1, y1, x2, y2){
    xDistance_fuse = x2 - x1;
    yDistance_fuse = y2 - y1;
    // console.log("Distancia en X: ",xDistance);
    // console.log("Distancia en Y: ",yDistance);
}



function iniciar_pagina(){
//   console.log("se inicio la pagina")
//   console.log(fuses_BB);
//   console.log(fuses_value);
    cargar_imagen_pdcr();
    cargar_imagen_pdcr_1();
    cargar_imagen_f96();
    cargar_imagen_pdcs();
    cargar_imagen_tblu();
    cargar_imagen_pdcd();
    cargar_imagen_pdcp();
}

function change_caja_pdcr(){
    if(document.getElementById('pdcr_option').value==='Seleccione la caja PDCR...'){
    // console.log("seleccione una caja")
    document.getElementById('caja_pdcr').style.display="none"
    document.getElementById('caja_pdcr_1').style.display="none"
    pdcr_caja=""
    pdcr_caja_to_db=""
    }
    ////// PDC-R //////
    if(document.getElementById('pdcr_option').value==='PDC-R'){
        document.getElementById('caja_pdcr').style.display="block";
        document.getElementById('caja_pdcr_1').style.display="none";
        document.getElementById('caja_pdcr_small').style.display="none";
        pdcr_caja="pdcr"
        pdcr_caja_to_db="PDC-R"
        ////// Si la PDC-RMID tiene fusibles: //////
        if (pdcr_1_array.length != 0) {
            hold_config = confirm("Desea mantener la configuración de fusibles de la PDC-RMID?");
            if(hold_config){
                console.log(hold_config);
                pdcr_array=pdcr_1_array.slice()
                console.log("Fuses Value de PDC-RMID : ",fuses_value["PDC-RMID"])
                for (let index = 0; index < pdcr_1_array.length; index++) {
                    console.log("Fusibles: ",pdcr_1_array[index]);
                    console.log("Fusible valor en fusevalue: ",fuses_value["PDC-RMID"][pdcr_1_array[index]]);
                    fuses_value["PDC-R"][pdcr_1_array[index]] = fuses_value["PDC-RMID"][pdcr_1_array[index]].slice();
                    fuses_value["PDC-RMID"][pdcr_1_array[index]] = "";
                    console.log("fusible en pdcr:",fuses_value["PDC-R"][pdcr_1_array[index]]);
                }
                pdcr_1_array=[];
            }else{
                console.log(hold_config);
                pdcr_1_array=[];
            }
        }
        ////// Si la PDC-RS tiene fusibles: //////
        else if (pdcr_small_array.length != 0) {
            hold_config = confirm("Desea mantener la configuración de fusibles de la PDC-RS?");
            if(hold_config){
                console.log(hold_config);
                pdcr_array=pdcr_small_array.slice()
                console.log("Fuses Value de PDC-RS : ",fuses_value["PDC-RS"])
                for (let index = 0; index < pdcr_small_array.length; index++) {
                    console.log("Fusibles: ",pdcr_small_array[index]);
                    console.log("Fusible valor en fusevalue: ",fuses_value["PDC-RS"][pdcr_small_array[index]]);
                    fuses_value["PDC-R"][pdcr_small_array[index]] = fuses_value["PDC-RS"][pdcr_small_array[index]].slice();
                    fuses_value["PDC-RS"][pdcr_small_array[index]] = "";
                    //console.log("fusible en pdcr:",fuses_value["PDC-R"][pdcr_small_array[index]]);
                }
                pdcr_small_array=[];
            }else{
                console.log(hold_config);
                pdcr_small_array=[];
            }
        }else{
            hold_config = false;
            pdcr_array=[]
            pdcr_1_array=[]
            pdcr_small_array=[]
        }
        cargar_imagen_pdcr();
        console.log("PDC-RMID ARRAY FINAL: ",pdcr_1_array);
        console.log("PDC-RS ARRAY FINAL: ",pdcr_small_array);
        console.log("PDC-R ARRAY FINAL: ",pdcr_array);
    }
    ////// PDC-RMID //////
    if(document.getElementById('pdcr_option').value==='PDC-RMID'){
        document.getElementById('caja_pdcr').style.display="none";
        document.getElementById('caja_pdcr_small').style.display="none";
        document.getElementById('caja_pdcr_1').style.display="block";
        pdcr_caja="pdcr_1";
        pdcr_caja_to_db="PDC-RMID";
        ////// Si la PDC-R tiene fusibles: //////
        if (pdcr_array.length != 0) {
            hold_config = confirm("Desea mantener la configuración de fusibles de la PDC-R?");
            if(hold_config){
                console.log(hold_config);
                console.log("fuses value : ",fuses_value["PDC-R"])
                for (let index = 0; index < pdcr_array.length; index++) {
                    console.log("Fusible: ",pdcr_array[index]);
                    if (fuses_value["PDC-RMID"].hasOwnProperty(pdcr_array[index])) {
                        pdcr_1_array.push(pdcr_array[index]);
                        // console.log("Si Existe",fuses_value["PDC-RMID"].hasOwnProperty(pdcr_array[index]))
                        fuses_value["PDC-RMID"][pdcr_array[index]] = fuses_value["PDC-R"][pdcr_array[index]].slice();
                        fuses_value["PDC-R"][pdcr_array[index]] = "";
                        // console.log("Fusible Copiado a caja destino:",fuses_value["PDC-RMID"][pdcr_array[index]]);
                    }else{
                        console.log("Fusible no copiado: ",pdcr_array[index]);
                    }
                    
                }
                pdcr_array=[];
            }else{
                console.log(hold_config);
                pdcr_array=[];
                pdcr_1_array=[];
            }
        }
        ////// Si la PDC-RS tiene fusibles: //////
        else if (pdcr_small_array.length != 0) {
            hold_config = confirm("Desea mantener la configuración de fusibles de la PDC-RS?");
            if(hold_config){
                console.log(hold_config);
                console.log("fuses value : ",fuses_value["PDC-RS"])
                for (let index = 0; index < pdcr_small_array.length; index++) {
                    console.log("Fusible: ",pdcr_small_array[index]);
                    if (fuses_value["PDC-RMID"].hasOwnProperty(pdcr_small_array[index])) {
                        pdcr_1_array.push(pdcr_small_array[index]);
                        // console.log("Si Existe",fuses_value["PDC-RMID"].hasOwnProperty(pdcr_small_array[index]))
                        fuses_value["PDC-RMID"][pdcr_small_array[index]] = fuses_value["PDC-RS"][pdcr_small_array[index]].slice();
                        fuses_value["PDC-RS"][pdcr_small_array[index]] = "";
                        // console.log("Fusible Copiado a caja destino:",fuses_value["PDC-RMID"][pdcr_small_array[index]]);
                    }else{
                        console.log("Fusible no copiado: ",pdcr_small_array[index]);
                    }
                    
                }
                pdcr_small_array=[];
            }else{
                console.log(hold_config);
                pdcr_small_array=[];
                pdcr_1_array=[];
            }
        }else{
            hold_config = false;
            pdcr_array=[]
            pdcr_small_array=[]
            pdcr_1_array=[]
        }
        cargar_imagen_pdcr_1();
        console.log("PDC-RMID ARRAY FINAL: ",pdcr_1_array);
        console.log("PDC-RS ARRAY FINAL: ",pdcr_small_array);
        console.log("PDC-R ARRAY FINAL: ",pdcr_array);
    }
    ////// PDC-RS //////
    if(document.getElementById('pdcr_option').value==='PDC-RS'){
        document.getElementById('caja_pdcr').style.display="none"
        document.getElementById('caja_pdcr_1').style.display="none"
        document.getElementById('caja_pdcr_small').style.display="block"
        pdcr_caja="pdcr_small";
        pdcr_caja_to_db="PDC-RS"; 
        ////// Si la PDC-R tiene fusibles: //////
        if (pdcr_array.length != 0) {
            hold_config = confirm("Desea mantener la configuración de fusibles de la PDC-R?");
            if(hold_config){
                console.log(hold_config);
                console.log("fuses value : ",fuses_value["PDC-R"])
                for (let index = 0; index < pdcr_array.length; index++) {
                    console.log("Fusible: ",pdcr_array[index]);
                    if (fuses_value["PDC-RS"].hasOwnProperty(pdcr_array[index])) {
                        pdcr_small_array.push(pdcr_array[index]);
                        // console.log("Si Existe",fuses_value["PDC-RS"].hasOwnProperty(pdcr_array[index]))
                        fuses_value["PDC-RS"][pdcr_array[index]] = fuses_value["PDC-R"][pdcr_array[index]].slice();
                        fuses_value["PDC-R"][pdcr_array[index]] = "";
                        // console.log("Fusible Copiado a caja destino:",fuses_value["PDC-RS"][pdcr_array[index]]);
                    }else{
                        console.log("Fusible no copiado: ",pdcr_array[index]);
                    }
                    
                }
                pdcr_array=[];
            }else{
                console.log(hold_config);
                pdcr_array=[];
                pdcr_small_array=[];
            }
        }
        ////// Si la PDC-RMID tiene fusibles: //////
        else if (pdcr_1_array.length != 0) {
            hold_config = confirm("Desea mantener la configuración de fusibles de la PDC-RMID?");
            if(hold_config){
                console.log(hold_config);
                console.log("fuses value : ",fuses_value["PDC-RMID"])
                for (let index = 0; index < pdcr_1_array.length; index++) {
                    console.log("Fusible: ",pdcr_1_array[index]);
                    if (fuses_value["PDC-RS"].hasOwnProperty(pdcr_1_array[index])) {
                        pdcr_small_array.push(pdcr_1_array[index]);
                        // console.log("Si Existe",fuses_value["PDC-RS"].hasOwnProperty(pdcr_1_array[index]))
                        fuses_value["PDC-RS"][pdcr_1_array[index]] = fuses_value["PDC-RMID"][pdcr_1_array[index]].slice();
                        fuses_value["PDC-RMID"][pdcr_1_array[index]] = "";
                        // console.log("Fusible Copiado a caja destino:",fuses_value["PDC-RS"][pdcr_1_array[index]]);
                    }else{
                        console.log("Fusible no copiado: ",pdcr_1_array[index]);
                    }
                    
                }
                pdcr_1_array=[];
            }else{
                console.log(hold_config);
                pdcr_1_array=[];
                pdcr_small_array=[];
            }
        }else{
            hold_config = false;
            pdcr_array=[]
            pdcr_1_array=[]
            pdcr_small_array=[]
        }
        cargar_imagen_pdcr_s();
        console.log("PDC-RMID ARRAY FINAL: ",pdcr_1_array);
        console.log("PDC-RS ARRAY FINAL: ",pdcr_small_array);
        console.log("PDC-R ARRAY FINAL: ",pdcr_array);
    }
}
$("#beige_pdcr").on("click", function() {
    color = "beige";
    color_style = "#FFD700";
    console.log("Color seleccionado: ", color)
    caja = "pdcr";
    ctgry = "MINI"
    console.log("Caja seleccionada", caja);
});
$("#cafe_pdcr").on("click", function() {
    color = "cafe";
    color_style = "#8B4513";
    console.log("Color seleccionado: ", color)
    caja = "pdcr";
    ctgry = "MINI"
    console.log("Caja seleccionada", caja);
});
$("#rojo_pdcr").on("click", function() {
    color = "rojo";
    color_style = "#FF0000";
    console.log("Color seleccionado: ", color)
    caja = "pdcr";
    ctgry = "MINI"
    console.log("Caja seleccionada", caja);
});
$("#verde_pdcr").on("click", function() {
    color = "verde";
    color_style = "#008000";
    console.log("Color seleccionado: ", color)
    caja = "pdcr";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#azul_mini_pdcr").on("click", function() {
    color = "azul";
    color_style = "#0000FF";
    console.log("Color seleccionado: ", color)
    caja = "pdcr";
    ctgry = "MINI"
    console.log("Caja seleccionada", caja);
});
$("#azul_ato_pdcr").on("click", function() {
    color = "azul";
    color_style = "#0000FF";
    console.log("Color seleccionado: ", color)
    caja = "pdcr";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#natural_pdcr").on("click", function() {
    color = "natural";
    color_style = "#FFFFFF";
    console.log("Color seleccionado: ", color)
    caja = "pdcr";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#amarillo_pdcr").on("click", function() {
    color = "amarillo";
    color_style = "#FFFF00";
    console.log("Color seleccionado: ", color)
    caja = "pdcr";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#cafe_ato_pdcr").on("click", function() {
    color = "cafe";
    color_style = "#8B4513";
    console.log("Color seleccionado: ", color)
    caja = "pdcr";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#verde_30_pdcr").on("click", function() {
    color = "verde";
    color_style = "#008000";
    console.log("Color seleccionado: ", color)
    caja = "pdcr";
    ctgry = "MAXI"
    console.log("Caja seleccionada", caja);
});
$("#naranja_pdcr").on("click", function() {
    color = "naranja";
    color_style = "#FFA500";
    console.log("Color seleccionado: ", color)
    caja = "pdcr";
    ctgry = "MAXI"
    console.log("Caja seleccionada", caja);
});
$("#rojo_50_pdcr").on("click", function() {
    color = "rojo";
    color_style = "#FF0000";
    console.log("Color seleccionado: ", color)
    caja = "pdcr";
    ctgry = "MAXI"
    console.log("Caja seleccionada", caja);
});
$("#relx_pdcr").on("click", function() {
    color = "1008695";
    color_style = "#FF00FF";
    console.log("Color seleccionado: ", color)
    caja = "pdcr";
    ctgry = "RELAY"
    console.log("Caja seleccionada", caja);
});
$("#relt_pdcr").on("click", function() {
    color = "1010733";
    color_style = "#A9A9A9";
    console.log("Color seleccionado: ", color)
    caja = "pdcr";
    ctgry = "RELAY"
    console.log("Caja seleccionada", caja);
});
$("#eliminar_pdcr").on("click", function() {
    color = "eliminar";
    color_style = "#A9A9A9";
    console.log("Color seleccionado: ", color)
    caja = "pdcr";
    ctgry = "RELAY"
    console.log("Caja seleccionada", caja);
});

function cargar_imagen_pdcr() {
    var t1 = new ToolTip_pdcr(img_pdcr, "This is a tool-tip", 150);
    if (img_pdcr.getContext) {
        var ctx_pdcr = img_pdcr.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcr/pdcr.jpg";
        img.onload = function() {
            imgWidth_pdcr = this.width;
            imgHeight_pdcr = this.height;
            img_pdcr.width = imgWidth_pdcr;
            img_pdcr.height = imgHeight_pdcr;
            // console.log("imgWidth_pdcr: ",imgWidth_pdcr);
            // console.log("imgHeight_pdcr: ",imgHeight_pdcr);
            // console.log("img_pdcr.width: ",img_pdcr.width);
            // console.log("img_pdcr.height: ",img_pdcr.height);
            ctx_pdcr.drawImage(this, 0, 0, imgWidth_pdcr, imgHeight_pdcr);
            var datosimagen = ctx_pdcr.getImageData(0, 0, imgWidth_pdcr, imgHeight_pdcr);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcr = datosimagen.data;
            ctx_pdcr.lineWidth = "3";
            pintar_2();

            img_pdcr.onmouseup = function(event) {
                var fusible;
                // console.log(fuses_BB);
                // console.log(fuses_BB['PDC-R']);
                let keys_pdcr = Object.keys(fuses_BB['PDC-R']);
                // console.log("KEYS DE PDCS: ",keys_pdcr);
                var x = event.pageX;
                var y = event.pageY;
                var coor = "X coords: " + x + ", Y coords: " + y;
                // console.log(coor);
                var X = document.getElementById("pdcr_image_v_canvas").getBoundingClientRect();
                pixelx = x - window.scrollX - X.left
                pixely = y - window.scrollY - X.top
                    // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

                for (i = 0; i < keys_pdcr.length; i++) {
                    if (pixelx >= fuses_BB['PDC-R'][keys_pdcr[i]][0][0] && pixelx <= fuses_BB['PDC-R'][keys_pdcr[i]][1][0] && pixely >= fuses_BB['PDC-R'][keys_pdcr[i]][0][1] && pixely <= fuses_BB['PDC-R'][keys_pdcr[i]][1][1] && color != "vacio" && caja == "pdcr") {
                        var temporal_text = "Esta dentro de " + keys_pdcr[i]
                            // console.log("TEMPORAL TEXT",temporal_text)
                        element = keys_pdcr[i]
                        fuses_value["PDC-R"][element] = color
                        //console.log(cavidad);
                        fusible = element;
                        console.log(fusible);
                        switch (color){
                           case "cafe":
                           amperaje = '7.5';
                           break;
                           case 'rojo':
                           if (fusible === 'F464'|| fusible === 'F463'|| fusible === 'F462'||fusible === 'F449' || fusible === 'F448' || fusible === 'F447' || fusible === 'F420'|| fusible === 'F419' || fusible === 'F418') {
                               amperaje = '50';
                           }else{
                               amperaje = '10';
                           }
                           break;
                           case "verde":
                               amperaje = '30';
                           break;
                           case "azul":
                           amperaje = '15';                            
                           break;
                           case "beige":
                           amperaje ='5';                            
                           break;
                           case "natural":
                           amperaje = '25'                            
                           break;
                           case "amarillo":
                           amperaje = '20';                            
                           break;
                           case "naranja":
                           amperaje = '40';                        
                           break;
                           case "1008695":
                           amperaje = '60'//Rosa                            
                           break;
                           case "1010733":
                           amperaje = '70'//Gris                            
                           break;    
                       }
                           
                       if (pdcr_array.length!=0){
                        if(pdcr_array.indexOf(element)!=-1){
                            fuses_value["PDC-R"][element] = "vacio";
                            pdcr_array.splice(pdcr_array.indexOf(element),1)
                            restaurar_pdcr(ctx_pdcr,img_pdcr);
                            pintar_2()
                        }
                        else{
                            var temp = color.split(",");
                            if (temp[0] == "eliminar"){
                                console.log("Fusible eliminado")
                                fuses_value["PDC-R"][element] = "vacio";
                                return
                            }else{
                                if (ctgry != fuses_types["PDC-R"][element]){
                                    console.log("NO COINCIDE")
                                    fuses_value["PDC-R"][element] = "vacio";
                                    $("#warning-alert-PDCR").fadeTo(2000, 500).slideUp(500, function() {
                                    $("#warning-alert-PDCR").slideUp(500);
                                    });
                                    return
                                }
                            }
                            pdcr_array.push(element)
                            pintar()
                        }
                    }
                    else{
                        var temp = color.split(",");
                        if (temp[0] == "eliminar"){
                            console.log("Fusible eliminado")
                            fuses_value["PDC-R"][element] = "vacio";
                            return
                        }else{
                            console.log(`${temp[0]} y ${fuses_types["PDC-R"][element]} `)
                            if (ctgry != fuses_types["PDC-R"][element]){
                                console.log("NO COINCIDE")
                                fuses_value["PDC-R"][element] = "vacio";
                                $("#warning-alert-PDCR").fadeTo(2000, 500).slideUp(500, function() {
                                $("#warning-alert-PDCR").slideUp(500);
                                });
                                return
                            }
                        }
                        pdcr_array.push(element)
                        pintar()
                    }
                        // console.log("LEYENDO ARRAY 2: ",pdcr_array);
                    }
                }
                console.log("FUSIBLE: ", fusible);
            }

            function pintar(){
                let cavidad = pdcr_array[pdcr_array.length-1];
                //console.log("CAVIDAD : ",cavidad);
                //console.log("Fusible Colocado: ",color);

                let cavidadx = fuses_BB["PDC-R"][cavidad][0][0];
                let cavidady = fuses_BB["PDC-R"][cavidad][0][1];
                let cavidadw = fuses_BB["PDC-R"][cavidad][1][0];
                let cavidadh = fuses_BB["PDC-R"][cavidad][1][1];

                let cavidad_ctgry = fuses_types["PDC-R"][cavidad];
                //console.log(cavidadx)
                //console.log(cavidady)
                //console.log(cavidadw)
                //console.log(cavidadh)
                getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);

                let orientacion = xDistance_fuse > yDistance_fuse? 'h':'v';
                var image = new Image();

                //console.log("PDC-R DISTANCE X",xDistance_fuse)
                //console.log("PDC-R DISTANCE Y",yDistance_fuse)
                //console.log(`orientacion ${orientacion} y de cavidad tipo ${cavidad_ctgry}`);
               
               
                image.src = `static/content/fusibles/${cavidad_ctgry},${amperaje},${color}${orientacion}.jpg`
                
                color_style = "#ffffff00"
                image.onerror = function() {
                    return fuses_value["PDC-R"][element] = "vacio";
                }
                image.onload = function() {
                    var pat = ctx_pdcr.createPattern(image, 'no-repeat');
                    ctx_pdcr.fillStyle = pat;
                    ctx_pdcr.drawImage(image, cavidadx,cavidady,xDistance_fuse,yDistance_fuse);
                    }
                
                ctx_pdcr.beginPath();
                ctx_pdcr.strokeStyle = color_style;
                ctx_pdcr.strokeRect(cavidadx, cavidady,xDistance_fuse,yDistance_fuse);
            }

            function pintar_2(){
                for (let i = 0; i < pdcr_array.length; i++) {
                    // var fusible_imagen = new Image();
                    let cavidad = pdcr_array[i];
                    // console.log("CAVIDAD : ",cavidad);
                    let fusibleColocado = fuses_value["PDC-R"][pdcr_array[i]];
                    // console.log("Fusible Colocado: ",fusibleColocado);

                    let cavidadx = fuses_BB["PDC-R"][cavidad][0][0];
                    let cavidady = fuses_BB["PDC-R"][cavidad][0][1];
                    let cavidadw = fuses_BB["PDC-R"][cavidad][1][0];
                    let cavidadh = fuses_BB["PDC-R"][cavidad][1][1];

                    let cavidad_ctgry = fuses_types["PDC-R"][cavidad];
                    // console.log(cavidadx)
                    // console.log(cavidady)
                    // console.log(cavidadw)
                    // console.log(cavidadh)
                    getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);
                    
                    // console.log("PDC-R DISTANCE X",xDistance_fuse)
                    // console.log("PDC-R DISTANCE Y",yDistance_fuse)
                    let orientacion = xDistance_fuse > yDistance_fuse? 'h':'v';
                    var image = new Image();                                                             
                    //console.log(color_style);
                    //console.log(fusibleColocado);
                    //color_style = "#ffffff00"
                    switch (fusibleColocado){
                        case "cafe":
                        //color_style = "#8B4513"
                        amperaje = '7.5';                        
                        break;
                        case 'rojo':
                        //color_style = "#FF0000"
                        if (cavidad === 'F464'|| cavidad === 'F463'|| cavidad === 'F462'||cavidad === 'F449' || cavidad === 'F448' || cavidad === 'F447' || cavidad === 'F420'|| cavidad === 'F419' || cavidad === 'F418') {
                            amperaje = '50';
                        }else{
                            amperaje = '10';
                        }                        
                        break;
                        case "verde":
                        //color_style = "#008000" 
                        amperaje = '30';                            
                        break;
                        case "azul":
                        //color_style = "#0000FF"
                        amperaje = '15';                        
                        break;
                        case "beige":
                        //color_style = "#FFD700"
                        amperaje ='5';                        
                        break;
                        case "natural":
                        //color_style = "#FFFFFF"
                        amperaje = '25'                        
                        break;
                        case "amarillo":
                        //color_style = "#FFFF00"
                        amperaje = '20';                        
                        break;
                        case "naranja":
                        //color_style = "#FFA500"
                        amperaje = '40';                        
                        break;
                        case "1008695":
                        //color_style = "#FF00FF"
                        amperaje = '60'//Rosa                        
                        break;
                        case "1010733":
                        //color_style = "#A9A9A9"
                        amperaje = '70'//Gris                        
                        break;
                        default:
                        amperaje = 'N/A'
                        break;
                        }
                        color_style= '#ffffff00';
                        if (amperaje !== 'N/A') {  
                            image.src = `static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`                            
                        }
                    ctx_pdcr.beginPath();
                    ctx_pdcr.strokeStyle = color_style;
                    ctx_pdcr.strokeRect(cavidadx, cavidady,xDistance_fuse,yDistance_fuse);
                    //console.log(`static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`)
                    cargar_cavidad_pdcr(cavidad_ctgry, amperaje, fusibleColocado, orientacion, image, ctx_pdcr, cavidadx,cavidady,cavidadw,cavidadh);                
                }
            }
        }
    }
}
function cargar_cavidad_pdcr (cavidad_ctgry, amperaje, fusibleColocado, orientacion, image, ctx_pdcr, cavidadx, cavidady,cavidadw,cavidadh) {
    image.onload = function() {
        var pat = ctx_pdcr.createPattern(image, 'no-repeat');
        ctx_pdcr.fillStyle = pat;
        getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);
        ctx_pdcr.drawImage(image, cavidadx,cavidady,xDistance_fuse,yDistance_fuse);
        //console.log(`static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`)
    }              
}  

function restaurar_pdcr(ctx_pdcr, img_pdcr) {
    var datosimagen = ctx_pdcr.getImageData(0, 0, imgWidth_pdcr, imgHeight_pdcr);
    var datos = datosimagen.data;
    for (var i = 0; i < datos.length; i++) {
        datos[i] = datosPrim_pdcr[i];
        datos[i + 1] = datosPrim_pdcr[i + 1];
        datos[i + 2] = datosPrim_pdcr[i + 2];
    }
    ctx_pdcr.putImageData(datosimagen, 0, 0);
}

$("#beige_pdcr_mid").on("click", function() {
    color = "beige";
    color_style = "#FFD700";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_mid";
    ctgry = "MINI"
    console.log("Caja seleccionada", caja);
});
$("#cafe_pdcr_mid").on("click", function() {
    color = "cafe";
    color_style = "#8B4513";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_mid";
    ctgry = "MINI"
    console.log("Caja seleccionada", caja);
});
$("#cafe_ato_pdcr_mid").on("click", function() {
    color = "cafe";
    color_style = "#8B4513";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_mid";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#rojo_pdcr_mid").on("click", function() {
    color = "rojo";
    color_style = "#FF0000";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_mid";
    ctgry = "MINI"
    console.log("Caja seleccionada", caja);
});
$("#verde_pdcr_mid").on("click", function() {
    color = "verde";
    color_style = "#008000";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_mid";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#azul_mini_pdcr_mid").on("click", function() {
    color = "azul";
    color_style = "#0000FF";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_mid";
    ctgry = "MINI"
    console.log("Caja seleccionada", caja);
});
$("#azul_ato_pdcr_mid").on("click", function() {
    color = "azul";
    color_style = "#0000FF";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_mid";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#natural_pdcr_mid").on("click", function() {
    color = "natural";
    color_style = "#FFFFFF";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_mid";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#amarillo_pdcr_mid").on("click", function() {
    color = "amarillo";
    color_style = "#FFFF00";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_mid";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#verde_30_pdcr_mid").on("click", function() {
    color = "verde";
    color_style = "#008000";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_mid";
    ctgry = "MAXI"
    console.log("Caja seleccionada", caja);
});
$("#naranja_pdcr_mid").on("click", function() {
    color = "naranja";
    color_style = "#FFA500";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_mid";
    ctgry = "MAXI"
    console.log("Caja seleccionada", caja);
});
$("#rojo_50_pdcr_mid").on("click", function() {
    color = "rojo";
    color_style = "#FF0000";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_mid";
    ctgry = "MAXI"
    console.log("Caja seleccionada", caja);
});
$("#relx_pdcr_mid").on("click", function() {
    color = "1008695";
    color_style = "#FF00FF";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_mid";
    ctgry = "RELAY"
    console.log("Caja seleccionada", caja);
});
$("#relt_pdcr_mid").on("click", function() {
    color = "1010733";
    color_style = "#A9A9A9";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_mid";
    ctgry = "RELAY"
    console.log("Caja seleccionada", caja);
});$("#eliminar_pdcr_mid").on("click", function() {
    color = "eliminar";
    color_style = "#A9A9A9";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_mid";
    ctgry = "RELAY"
    console.log("Caja seleccionada", caja);
});

function cargar_imagen_pdcr_1() {
    var t1 = new ToolTip_pdcr_1(img_pdcr_1, "This is a tool-tip", 150);
    if (img_pdcr_1.getContext) {
        var ctx_pdcr_mid = img_pdcr_1.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcr_1/pdcr_1.jpg";
        img.onload = function() {
            imgWidth_pdcr_mid = this.width;
            imgHeight_pdcr_mid = this.height;
            img_pdcr_1.width = imgWidth_pdcr_mid;
            img_pdcr_1.height = imgHeight_pdcr_mid;
            // console.log("imgWidth_pdcr_mid: ",imgWidth_pdcr_mid);
            // console.log("imgHeight_pdcr_mid: ",imgHeight_pdcr_mid);
            // console.log("img_pdcr_1.width: ",img_pdcr_1.width);
            // console.log("img_pdcr_1.height: ",img_pdcr_1.height);
            ctx_pdcr_mid.drawImage(this, 0, 0, imgWidth_pdcr_mid, imgHeight_pdcr_mid);
            var datosimagen = ctx_pdcr_mid.getImageData(0, 0, imgWidth_pdcr_mid, imgHeight_pdcr_mid);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcr_mid = datosimagen.data;
            ctx_pdcr_mid.lineWidth = "3";
            pintar_2();

            img_pdcr_1.onmouseup = function(event) {
                var fusible;
                // console.log(fuses_BB);
                // console.log(fuses_BB['PDC-RMID']);
                let keys_pdcr_mid = Object.keys(fuses_BB['PDC-RMID']);
                // console.log("KEYS DE PDCS: ",keys_pdcr_mid);
                var x = event.pageX;
                var y = event.pageY;
                var coor = "X coords: " + x + ", Y coords: " + y;
                // console.log(coor);
                var X = document.getElementById("pdcr_1_image_v_canvas").getBoundingClientRect();
                pixelx = x - window.scrollX - X.left
                pixely = y - window.scrollY - X.top
                    // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

                for (i = 0; i < keys_pdcr_mid.length; i++) {
                    if (pixelx >= fuses_BB['PDC-RMID'][keys_pdcr_mid[i]][0][0] && pixelx <= fuses_BB['PDC-RMID'][keys_pdcr_mid[i]][1][0] && pixely >= fuses_BB['PDC-RMID'][keys_pdcr_mid[i]][0][1] && pixely <= fuses_BB['PDC-RMID'][keys_pdcr_mid[i]][1][1] && color != "vacio" && caja == "pdcr_mid") {
                        var temporal_text = "Esta dentro de " + keys_pdcr_mid[i]
                            // console.log("TEMPORAL TEXT",temporal_text)
                        element = keys_pdcr_mid[i]
                        fuses_value["PDC-RMID"][element] = color
                        //console.log(cavidad);
                        fusible = element;
                        console.log(fusible);
                        switch (color){
                           case "cafe":
                           amperaje = '7.5';
                           break;
                           case 'rojo':
                           if (fusible === 'F464'|| fusible === 'F463'|| fusible === 'F462'||fusible === 'F449' || fusible === 'F448' || fusible === 'F447' || fusible === 'F420'|| fusible === 'F419' || fusible === 'F418') {
                               amperaje = '50';
                           }else{
                               amperaje = '10';
                           }
                           break;
                           case "verde":
                               amperaje = '30';
                           break;
                           case "azul":
                           amperaje = '15';                            
                           break;
                           case "beige":
                           amperaje ='5';                            
                           break;
                           case "natural":
                           amperaje = '25'                            
                           break;
                           case "amarillo":
                           amperaje = '20';                            
                           break;
                           case "naranja":
                           amperaje = '40';                        
                           break;
                           case "1008695":
                           amperaje = '60'//Rosa                            
                           break;
                           case "1010733":
                           amperaje = '70'//Gris                            
                           break;    
                       }
                           
                       if (pdcr_1_array.length!=0){
                        if(pdcr_1_array.indexOf(element)!=-1){
                            fuses_value["PDC-RMID"][element] = "vacio";
                            pdcr_1_array.splice(pdcr_1_array.indexOf(element),1)
                            restaurar_pdcr_1(ctx_pdcr_mid,img_pdcr_1);
                            pintar_2()
                        }
                        else{
                            var temp = color.split(",");
                            if (temp[0] == "eliminar"){
                                console.log("Fusible eliminado")
                                fuses_value["PDC-RMID"][element] = "vacio";
                                return
                            }else{
                                console.log(`${temp[0]} y ${fuses_types["PDC-RMID"][element]} `)
                                if (ctgry != fuses_types["PDC-RMID"][element]){
                                    console.log("NO COINCIDE")
                                    fuses_value["PDC-RMID"][element] = "vacio";
                                    $("#warning-alert-PDCRMID").fadeTo(2000, 500).slideUp(500, function() {
                                    $("#warning-alert-PDCRMID").slideUp(500);
                                    });
                                    return
                                }
                            }
                            pdcr_1_array.push(element)
                            pintar()
                        }
                    }
                    else{
                        var temp = color.split(",");
                            if (temp[0] == "eliminar"){
                                console.log("Fusible eliminado")
                                fuses_value["PDC-RMID"][element] = "vacio";
                                return
                            }else{
                                console.log(`${temp[0]} y ${fuses_types["PDC-RMID"][element]} `)
                                if (ctgry != fuses_types["PDC-RMID"][element]){
                                    console.log("NO COINCIDE")
                                    fuses_value["PDC-RMID"][element] = "vacio";
                                    $("#warning-alert-PDCRMID").fadeTo(2000, 500).slideUp(500, function() {
                                    $("#warning-alert-PDCRMID").slideUp(500);
                                    });
                                    return
                                }
                            }
                        pdcr_1_array.push(element)
                        pintar()
                    }
                        // console.log("LEYENDO ARRAY 2: ",pdcr_1_array);
                    }
                }
                console.log("FUSIBLE: ", fusible);
            }

            function pintar(){
                let cavidad = pdcr_1_array[pdcr_1_array.length-1];
                //console.log("CAVIDAD : ",cavidad);
                //console.log("Fusible Colocado: ",color);

                let cavidadx = fuses_BB["PDC-RMID"][cavidad][0][0];
                let cavidady = fuses_BB["PDC-RMID"][cavidad][0][1];
                let cavidadw = fuses_BB["PDC-RMID"][cavidad][1][0];
                let cavidadh = fuses_BB["PDC-RMID"][cavidad][1][1];

                let cavidad_ctgry = fuses_types["PDC-RMID"][cavidad];
                //console.log(cavidadx)
                //console.log(cavidady)
                //console.log(cavidadw)
                //console.log(cavidadh)
                getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);

                let orientacion = xDistance_fuse > yDistance_fuse? 'h':'v';
                var image = new Image();

                //console.log("PDC-RMID DISTANCE X",xDistance_fuse)
                //console.log("PDC-RMID DISTANCE Y",yDistance_fuse)
                //console.log(`orientacion ${orientacion} y de cavidad tipo ${cavidad_ctgry}`);
               
               
                image.src = `static/content/fusibles/${cavidad_ctgry},${amperaje},${color}${orientacion}.jpg`
                
                color_style = "#ffffff00"
                image.onerror = function() {
                    return fuses_value["PDC-RMID"][element] = "vacio";
                }
                image.onload = function() {
                    var pat = ctx_pdcr_mid.createPattern(image, 'no-repeat');
                    ctx_pdcr_mid.fillStyle = pat;
                    ctx_pdcr_mid.drawImage(image, cavidadx,cavidady,xDistance_fuse,yDistance_fuse);
                    }
                
                ctx_pdcr_mid.beginPath();
                ctx_pdcr_mid.strokeStyle = color_style;
                ctx_pdcr_mid.strokeRect(cavidadx, cavidady,xDistance_fuse,yDistance_fuse);
            }

            function pintar_2(){
                for (let i = 0; i < pdcr_1_array.length; i++) {
                    // var fusible_imagen = new Image();
                    let cavidad = pdcr_1_array[i];
                    // console.log("CAVIDAD : ",cavidad);
                    let fusibleColocado = fuses_value["PDC-RMID"][pdcr_1_array[i]];
                    // console.log("Fusible Colocado: ",fusibleColocado);

                    let cavidadx = fuses_BB["PDC-RMID"][cavidad][0][0];
                    let cavidady = fuses_BB["PDC-RMID"][cavidad][0][1];
                    let cavidadw = fuses_BB["PDC-RMID"][cavidad][1][0];
                    let cavidadh = fuses_BB["PDC-RMID"][cavidad][1][1];

                    let cavidad_ctgry = fuses_types["PDC-RMID"][cavidad];
                    // console.log(cavidadx)
                    // console.log(cavidady)
                    // console.log(cavidadw)
                    // console.log(cavidadh)
                    getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);
                    
                    // console.log("PDC-RMID DISTANCE X",xDistance_fuse)
                    // console.log("PDC-RMID DISTANCE Y",yDistance_fuse)
                    let orientacion = xDistance_fuse > yDistance_fuse? 'h':'v';
                    var image = new Image();                                                             
                    //console.log(color_style);
                    //console.log(fusibleColocado);
                    //color_style = "#ffffff00"
                    switch (fusibleColocado){
                        case "cafe":
                        //color_style = "#8B4513"
                        amperaje = '7.5';                        
                        break;
                        case 'rojo':
                        //color_style = "#FF0000"
                        if (cavidad === 'F464'|| cavidad === 'F463'|| cavidad === 'F462'||cavidad === 'F449' || cavidad === 'F448' || cavidad === 'F447' || cavidad === 'F420'|| cavidad === 'F419' || cavidad === 'F418') {
                            amperaje = '50';
                        }else{
                            amperaje = '10';
                        }                        
                        break;
                        case "verde":
                        //color_style = "#008000" 
                        amperaje = '30';                            
                        break;
                        case "azul":
                        //color_style = "#0000FF"
                        amperaje = '15';                        
                        break;
                        case "beige":
                        //color_style = "#FFD700"
                        amperaje ='5';                        
                        break;
                        case "natural":
                        //color_style = "#FFFFFF"
                        amperaje = '25'                        
                        break;
                        case "amarillo":
                        //color_style = "#FFFF00"
                        amperaje = '20';                        
                        break;
                        case "naranja":
                        //color_style = "#FFA500"
                        amperaje = '40';                        
                        break;
                        case "1008695":
                        //color_style = "#FF00FF"
                        amperaje = '60'//Rosa                        
                        break;
                        case "1010733":
                        //color_style = "#A9A9A9"
                        amperaje = '70'//Gris                        
                        break;
                        default:
                        amperaje = 'N/A'
                        break;
                        }
                        color_style= '#ffffff00';
                        if (amperaje !== 'N/A') {  
                            image.src = `static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`                            
                        }
                    ctx_pdcr_mid.beginPath();
                    ctx_pdcr_mid.strokeStyle = color_style;
                    ctx_pdcr_mid.strokeRect(cavidadx, cavidady,xDistance_fuse,yDistance_fuse);
                    //console.log(`static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`)
                    cargar_cavidad_pdcr_1(cavidad_ctgry, amperaje, fusibleColocado, orientacion, image, ctx_pdcr_mid, cavidadx,cavidady,cavidadw,cavidadh);                
                }
            }
        }
    }
}
function cargar_cavidad_pdcr_1 (cavidad_ctgry, amperaje, fusibleColocado, orientacion, image, ctx_pdcr_mid, cavidadx, cavidady,cavidadw,cavidadh) {
    image.onload = function() {
        var pat = ctx_pdcr_mid.createPattern(image, 'no-repeat');
        ctx_pdcr_mid.fillStyle = pat;
        getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);
        ctx_pdcr_mid.drawImage(image, cavidadx,cavidady,xDistance_fuse,yDistance_fuse);
        //console.log(`static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`)
    }              
}  

function restaurar_pdcr_1(ctx_pdcr_mid, img_pdcr_1) {
    var datosimagen = ctx_pdcr_mid.getImageData(0, 0, imgWidth_pdcr_mid, imgHeight_pdcr_mid);
    var datos = datosimagen.data;
    for (var i = 0; i < datos.length; i++) {
        datos[i] = datosPrim_pdcr_mid[i];
        datos[i + 1] = datosPrim_pdcr_mid[i + 1];
        datos[i + 2] = datosPrim_pdcr_mid[i + 2];
    }
    ctx_pdcr_mid.putImageData(datosimagen, 0, 0);
}
/////// PDC-RS ///////
$("#beige_pdcr_small").on("click", function() {
    color = "beige";
    color_style = "#FFD700";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_small";
    ctgry = "MINI"
    console.log("Caja seleccionada", caja);
});
$("#cafe_pdcr_small").on("click", function() {
    color = "cafe";
    color_style = "#8B4513";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_small";
    ctgry = "MINI"
    console.log("Caja seleccionada", caja);
});
$("#cafe_ato_pdcr_small").on("click", function() {
    color = "cafe";
    color_style = "#8B4513";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_small";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#rojo_pdcr_small").on("click", function() {
    color = "rojo";
    color_style = "#FF0000";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_small";
    ctgry = "MINI"
    console.log("Caja seleccionada", caja);
});
$("#verde_pdcr_small").on("click", function() {
    color = "verde";
    color_style = "#008000";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_small";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#azul_mini_pdcr_small").on("click", function() {
    color = "azul";
    color_style = "#0000FF";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_small";
    ctgry = "MINI"
    console.log("Caja seleccionada", caja);
});
$("#azul_ato_pdcr_small").on("click", function() {
    color = "azul";
    color_style = "#0000FF";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_small";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#natural_pdcr_small").on("click", function() {
    color = "natural";
    color_style = "#FFFFFF";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_small";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#amarillo_pdcr_small").on("click", function() {
    color = "amarillo";
    color_style = "#FFFF00";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_small";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#verde_30_pdcr_small").on("click", function() {
    color = "verde";
    color_style = "#008000";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_small";
    ctgry = "MAXI"
    console.log("Caja seleccionada", caja);
});
$("#naranja_pdcr_small").on("click", function() {
    color = "naranja";
    color_style = "#FFA500";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_small";
    ctgry = "MAXI"
    console.log("Caja seleccionada", caja);
});
$("#rojo_50_pdcr_small").on("click", function() {
    color = "rojo";
    color_style = "#FF0000";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_small";
    ctgry = "MAXI"
    console.log("Caja seleccionada", caja);
});
$("#relx_pdcr_small").on("click", function() {
    color = "1008695";
    color_style = "#FF00FF";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_small";
    ctgry = "RELAY"
    console.log("Caja seleccionada", caja);
});
$("#relt_pdcr_small").on("click", function() {
    color = "1010733";
    color_style = "#A9A9A9";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_small";
    ctgry = "RELAY"
    console.log("Caja seleccionada", caja);
});
$("#eliminar_pdcr_small").on("click", function() {
    color = "eliminar";
    color_style = "#008000";
    console.log("Color seleccionado: ", color)
    caja = "pdcr_small";
    console.log("Caja seleccionada", caja);
});

function cargar_imagen_pdcr_s() {
    var t1 = new ToolTip_pdcr_small(img_pdcr_small, "This is a tool-tip", 150);
    if (img_pdcr_small.getContext) {
        var ctx_pdcr_small = img_pdcr_small.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcr_small/pdcrs.jpg";
        img.onload = function() {
            imgWidth_pdcr_small = this.width;
            imgHeight_pdcr_small = this.height;
            img_pdcr_small.width = imgWidth_pdcr_small;
            img_pdcr_small.height = imgHeight_pdcr_small;
            // console.log("imgWidth_pdcr_small: ",imgWidth_pdcr_small);
            // console.log("imgHeight_pdcr_small: ",imgHeight_pdcr_small);
            // console.log("img_pdcr_small.width: ",img_pdcr_small.width);
            // console.log("img_pdcr_small.height: ",img_pdcr_small.height);
            ctx_pdcr_small.drawImage(this, 0, 0, imgWidth_pdcr_small, imgHeight_pdcr_small);
            var datosimagen = ctx_pdcr_small.getImageData(0, 0, imgWidth_pdcr_small, imgHeight_pdcr_small);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcr_small = datosimagen.data;
            ctx_pdcr_small.lineWidth = "3";
            pintar_2();

            img_pdcr_small.onmouseup = function(event) {
                var fusible;
                // console.log(fuses_BB);
                // console.log(fuses_BB['PDC-RS']);
                let keys_pdcr_small = Object.keys(fuses_BB['PDC-RS']);
                // console.log("KEYS DE PDCS: ",keys_pdcr_small);
                var x = event.pageX;
                var y = event.pageY;
                var coor = "X coords: " + x + ", Y coords: " + y;
                // console.log(coor);
                var X = document.getElementById("pdcr_small_image_v_canvas").getBoundingClientRect();
                pixelx = x - window.scrollX - X.left
                pixely = y - window.scrollY - X.top
                    // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

                for (i = 0; i < keys_pdcr_small.length; i++) {
                    if (pixelx >= fuses_BB['PDC-RS'][keys_pdcr_small[i]][0][0] && pixelx <= fuses_BB['PDC-RS'][keys_pdcr_small[i]][1][0] && pixely >= fuses_BB['PDC-RS'][keys_pdcr_small[i]][0][1] && pixely <= fuses_BB['PDC-RS'][keys_pdcr_small[i]][1][1] && color != "vacio" && caja == "pdcr_small") {
                        var temporal_text = "Esta dentro de " + keys_pdcr_small[i]
                            // console.log("TEMPORAL TEXT",temporal_text)
                        element = keys_pdcr_small[i]
                        fuses_value["PDC-RS"][element] = color
                        //console.log(cavidad);
                        fusible = element;
                        console.log(fusible);
                        switch (color){
                           case "cafe":
                           amperaje = '7.5';
                           break;
                           case 'rojo':
                           if (fusible === 'F464'|| fusible === 'F463'|| fusible === 'F462'||fusible === 'F449' || fusible === 'F448' || fusible === 'F447' || fusible === 'F420'|| fusible === 'F419' || fusible === 'F418') {
                               amperaje = '50';
                           }else{
                               amperaje = '10';
                           }
                           break;
                           case "verde":
                               amperaje = '30';
                           break;
                           case "azul":
                           amperaje = '15';                            
                           break;
                           case "beige":
                           amperaje ='5';                            
                           break;
                           case "natural":
                           amperaje = '25'                            
                           break;
                           case "amarillo":
                           amperaje = '20';                            
                           break;
                           case "naranja":
                           amperaje = '40';                        
                           break;
                           case "1008695":
                           amperaje = '60'//Rosa                            
                           break;
                           case "1010733":
                           amperaje = '70'//Gris                            
                           break;    
                       }
                           
                       if (pdcr_small_array.length!=0){
                        if(pdcr_small_array.indexOf(element)!=-1){
                            fuses_value["PDC-RS"][element] = "vacio";
                            pdcr_small_array.splice(pdcr_small_array.indexOf(element),1)
                            restaurar_pdcr_small(ctx_pdcr_small,img_pdcr_small);
                            pintar_2()
                        }
                        else{
                            var temp = color.split(",");
                            if (temp[0] == "eliminar"){
                                console.log("Fusible eliminado")
                                fuses_value["PDC-RS"][element] = "vacio";
                                return
                            }else{
                                console.log(`${temp[0]} y ${fuses_types["PDC-RS"][element]} `)
                                if (ctgry != fuses_types["PDC-RS"][element]){
                                    console.log("NO COINCIDE")
                                    fuses_value["PDC-RS"][element] = "vacio";
                                    $("#warning-alert-PDCRS").fadeTo(2000, 500).slideUp(500, function() {
                                    $("#warning-alert-PDCRS").slideUp(500);
                                    });
                                    return
                                }
                            }
                            pdcr_small_array.push(element)
                            pintar()
                        }
                    }
                    else{
                        var temp = color.split(",");
                        if (temp[0] == "eliminar"){
                            console.log("Fusible eliminado")
                            fuses_value["PDC-RS"][element] = "vacio";
                            return
                        }else{
                            if (ctgry != fuses_types["PDC-RS"][element]){
                                console.log("NO COINCIDE")
                                fuses_value["PDC-RS"][element] = "vacio";
                                $("#warning-alert-PDCRS").fadeTo(2000, 500).slideUp(500, function() {
                                $("#warning-alert-PDCRS").slideUp(500);
                                });
                                return
                            }
                        }
                        pdcr_small_array.push(element)
                        pintar()
                    }
                        // console.log("LEYENDO ARRAY 2: ",pdcr_small_array);
                    }
                }
                console.log("FUSIBLE: ", fusible);
            }

            function pintar(){
                let cavidad = pdcr_small_array[pdcr_small_array.length-1];
                //console.log("CAVIDAD : ",cavidad);
                //console.log("Fusible Colocado: ",color);

                let cavidadx = fuses_BB["PDC-RS"][cavidad][0][0];
                let cavidady = fuses_BB["PDC-RS"][cavidad][0][1];
                let cavidadw = fuses_BB["PDC-RS"][cavidad][1][0];
                let cavidadh = fuses_BB["PDC-RS"][cavidad][1][1];

                let cavidad_ctgry = fuses_types["PDC-RS"][cavidad];
                //console.log(cavidadx)
                //console.log(cavidady)
                //console.log(cavidadw)
                //console.log(cavidadh)
                getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);

                let orientacion = xDistance_fuse > yDistance_fuse? 'h':'v';
                var image = new Image();

                //console.log("PDC-RS DISTANCE X",xDistance_fuse)
                //console.log("PDC-RS DISTANCE Y",yDistance_fuse)
                //console.log(`orientacion ${orientacion} y de cavidad tipo ${cavidad_ctgry}`);
               
               
                image.src = `static/content/fusibles/${cavidad_ctgry},${amperaje},${color}${orientacion}.jpg`
                
                color_style = "#ffffff00"
                image.onerror = function() {
                    return fuses_value["PDC-RS"][element] = "vacio";
                }
                image.onload = function() {
                    var pat = ctx_pdcr_small.createPattern(image, 'no-repeat');
                    ctx_pdcr_small.fillStyle = pat;
                    ctx_pdcr_small.drawImage(image, cavidadx,cavidady,xDistance_fuse,yDistance_fuse);
                    }
                
                ctx_pdcr_small.beginPath();
                ctx_pdcr_small.strokeStyle = color_style;
                ctx_pdcr_small.strokeRect(cavidadx, cavidady,xDistance_fuse,yDistance_fuse);
            }

            function pintar_2(){
                for (let i = 0; i < pdcr_small_array.length; i++) {
                    // var fusible_imagen = new Image();
                    let cavidad = pdcr_small_array[i];
                    // console.log("CAVIDAD : ",cavidad);
                    let fusibleColocado = fuses_value["PDC-RS"][pdcr_small_array[i]];
                    // console.log("Fusible Colocado: ",fusibleColocado);

                    let cavidadx = fuses_BB["PDC-RS"][cavidad][0][0];
                    let cavidady = fuses_BB["PDC-RS"][cavidad][0][1];
                    let cavidadw = fuses_BB["PDC-RS"][cavidad][1][0];
                    let cavidadh = fuses_BB["PDC-RS"][cavidad][1][1];

                    let cavidad_ctgry = fuses_types["PDC-RS"][cavidad];
                    // console.log(cavidadx)
                    // console.log(cavidady)
                    // console.log(cavidadw)
                    // console.log(cavidadh)
                    getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);
                    
                    // console.log("PDC-RS DISTANCE X",xDistance_fuse)
                    // console.log("PDC-RS DISTANCE Y",yDistance_fuse)
                    let orientacion = xDistance_fuse > yDistance_fuse? 'h':'v';
                    var image = new Image();                                                             
                    //console.log(color_style);
                    //console.log(fusibleColocado);
                    //color_style = "#ffffff00"
                    switch (fusibleColocado){
                        case "cafe":
                        //color_style = "#8B4513"
                        amperaje = '7.5';                        
                        break;
                        case 'rojo':
                        //color_style = "#FF0000"
                        if (cavidad === 'F464'|| cavidad === 'F463'|| cavidad === 'F462'||cavidad === 'F449' || cavidad === 'F448' || cavidad === 'F447' || cavidad === 'F420'|| cavidad === 'F419' || cavidad === 'F418') {
                            amperaje = '50';
                        }else{
                            amperaje = '10';
                        }                        
                        break;
                        case "verde":
                        //color_style = "#008000" 
                        amperaje = '30';                            
                        break;
                        case "azul":
                        //color_style = "#0000FF"
                        amperaje = '15';                        
                        break;
                        case "beige":
                        //color_style = "#FFD700"
                        amperaje ='5';                        
                        break;
                        case "natural":
                        //color_style = "#FFFFFF"
                        amperaje = '25'                        
                        break;
                        case "amarillo":
                        //color_style = "#FFFF00"
                        amperaje = '20';                        
                        break;
                        case "naranja":
                        //color_style = "#FFA500"
                        amperaje = '40';                        
                        break;
                        case "1008695":
                        //color_style = "#FF00FF"
                        amperaje = '60'//Rosa                        
                        break;
                        case "1010733":
                        //color_style = "#A9A9A9"
                        amperaje = '70'//Gris                        
                        break;
                        default:
                        amperaje = 'N/A'
                        break;
                        }
                        color_style= '#ffffff00';
                        if (amperaje !== 'N/A') {  
                            image.src = `static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`                            
                        }
                    ctx_pdcr_small.beginPath();
                    ctx_pdcr_small.strokeStyle = color_style;
                    ctx_pdcr_small.strokeRect(cavidadx, cavidady,xDistance_fuse,yDistance_fuse);
                    //console.log(`static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`)
                    cargar_cavidad_pdcr_small(cavidad_ctgry, amperaje, fusibleColocado, orientacion, image, ctx_pdcr_small, cavidadx,cavidady,cavidadw,cavidadh);                
                }
            }
        }
    }
}
function cargar_cavidad_pdcr_small (cavidad_ctgry, amperaje, fusibleColocado, orientacion, image, ctx_pdcr_small, cavidadx, cavidady,cavidadw,cavidadh) {
    image.onload = function() {
        var pat = ctx_pdcr_small.createPattern(image, 'no-repeat');
        ctx_pdcr_small.fillStyle = pat;
        getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);
        ctx_pdcr_small.drawImage(image, cavidadx,cavidady,xDistance_fuse,yDistance_fuse);
        //console.log(`static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`)
    }              
}  

function restaurar_pdcr_small(ctx_pdcr_small, img_pdcr_small) {
    var datosimagen = ctx_pdcr_small.getImageData(0, 0, imgWidth_pdcr_small, imgHeight_pdcr_small);
    var datos = datosimagen.data;
    for (var i = 0; i < datos.length; i++) {
        datos[i] = datosPrim_pdcr_small[i];
        datos[i + 1] = datosPrim_pdcr_small[i + 1];
        datos[i + 2] = datosPrim_pdcr_small[i + 2];
    }
    ctx_pdcr_small.putImageData(datosimagen, 0, 0);
}
/////// PDC-RS ///////

/////// F96 ///////
$("#rojo_f96").on("click", function() {
    color = "rojo";
    color_style = "#FF0000";
    console.log("Color seleccionado: ", color)
    caja = "f96";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#cafe_f96").on("click", function() {
    color = "cafe";
    color_style = "#8B4513";
    console.log("Color seleccionado: ", color)
    caja = "f96";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#beige_f96").on("click", function() {
    color = "beige";
    color_style = "#FFD700";
    console.log("Color seleccionado: ", color)
    caja = "f96";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#azul_f96").on("click", function() {
    color = "azul";
    color_style = "#0000FF";
    console.log("Color seleccionado: ", color)
    caja = "f96";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#verde_f96").on("click", function() {
    color = "verde";
    color_style = "#008000";
    console.log("Color seleccionado: ", color)
    caja = "f96";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#eliminar_f96").on("click", function() {
    color = "eliminar";
    color_style = "#008000";
    console.log("Color seleccionado: ", color)
    caja = "f96";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});

function cargar_imagen_f96() {
    var t1 = new ToolTip_f96(img_f96, "This is a tool-tip", 150);
    if (img_f96.getContext) {
        var ctx_f96 = img_f96.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/f96/f96.jpg";
        img.onload = function() {
            imgWidth_f96 = this.width;
            imgHeight_f96 = this.height;
            img_f96.width = imgWidth_f96;
            img_f96.height = imgHeight_f96;
            // console.log("imgWidth_f96: ",imgWidth_f96);
            // console.log("imgHeight_f96: ",imgHeight_f96);
            // console.log("img_f96.width: ",img_f96.width);
            // console.log("img_f96.height: ",img_f96.height);
            ctx_f96.drawImage(this, 0, 0, imgWidth_f96, imgHeight_f96);
            var datosimagen = ctx_f96.getImageData(0, 0, imgWidth_f96, imgHeight_f96);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_f96 = datosimagen.data;
            ctx_f96.strokeStyle = "#0F53F1";
            ctx_f96.lineWidth = "4";
            pintar_2();

            img_f96.onmouseup = function(event) {
                var fusible;
                // console.log(fuses_BB);
                // console.log(fuses_BB['F96']);
                let keys_f96 = Object.keys(fuses_BB['F96']);
                // console.log("KEYS DE F96: ",keys_f96);
                // console.log("KEYS DE F96: ",keys_f96.length);
                var x = event.pageX;
                var y = event.pageY;
                var coor = "X coords: " + x + ", Y coords: " + y;
                // console.log(coor);
                var X = document.getElementById("f96_image_v_canvas").getBoundingClientRect();
                pixelx = x - window.scrollX - X.left
                pixely = y - window.scrollY - X.top
                    // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

                for (i = 0; i < keys_f96.length; i++) {
                    if (pixelx >= fuses_BB['F96'][keys_f96[i]][0][0] && pixelx <= fuses_BB['F96'][keys_f96[i]][1][0] && pixely >= fuses_BB['F96'][keys_f96[i]][0][1] && pixely <= fuses_BB['F96'][keys_f96[i]][1][1] && color != "vacio" && caja == "f96") {
                        var temporal_text = "Esta dentro de " + keys_f96[i]
                            // console.log("TEMPORAL TEXT",temporal_text)
                        element = keys_f96[i]
                        fuses_value["PDC-RMID"][element] = color
                            // console.log(fuses_value);
                        fusible = element;
                        console.log(fusible);
                        switch (color){
                           case "cafe":
                           amperaje = '7.5';
                           break;
                           case 'rojo':
                               amperaje = '10';
                           break;
                           case "verde":
                               amperaje = '30';
                           break;
                           case "azul":
                           amperaje = '15';                            
                           break;
                           case "beige":
                           amperaje ='5';                            
                           break;
                       }
                           
                       if (f96_array.length!=0){
                        if(f96_array.indexOf(element)!=-1){
                            fuses_value["PDC-RMID"]["F96"] = "vacio";
                            f96_array.splice(f96_array.indexOf(element),1)
                            restaurar_f96(ctx_f96,img_f96);
                            pintar_2()
                        }
                        else{
                            var temp = color.split(",");
                            if (temp[0] == "eliminar"){
                                console.log("Fusible eliminado")
                                fuses_value["PDC-RMID"]["F96"] = "vacio";
                                return
                            }else{
                                console.log(`${temp[0]} y ${fuses_types["F96"][element]} `)
                                if (ctgry != fuses_types["F96"][element]){
                                    console.log("NO COINCIDE")
                                    fuses_value["PDC-RMID"]["F96"] = "vacio";
                                    $("#warning-alert-F96").fadeTo(2000, 500).slideUp(500, function() {
                                    $("#warning-alert-F96").slideUp(500);
                                    });
                                    return
                                }
                            }
                            f96_array.push(element)
                            pintar()
                        }
                    }
                    else{
                        var temp = color.split(",");
                            if (temp[0] == "eliminar"){
                                console.log("Fusible eliminado")
                                fuses_value["PDC-RMID"][element] = "vacio";
                                return
                            }else{
                                console.log(`${ctgry} y ${fuses_types["F96"][element]} `)
                                if (ctgry != fuses_types["F96"][element]){
                                    console.log("NO COINCIDE")
                                    fuses_value["PDC-RMID"][element] = "vacio";
                                    $("#warning-alert-F96").fadeTo(2000, 500).slideUp(500, function() {
                                    $("#warning-alert-F96").slideUp(500);
                                    });
                                    return
                                }
                            }
                        f96_array.push(element)
                        pintar()
                    }
                    

                        // console.log("LEYENDO ARRAY 2: ",f96_array);
                    }
                }
                console.log("FUSIBLE: ", fusible);
            }

            function pintar(){
                let cavidad = f96_array[f96_array.length-1];
                //console.log("CAVIDAD : ",cavidad);
                //console.log("Fusible Colocado: ",color);

                let cavidadx = fuses_BB["F96"][cavidad][0][0];
                let cavidady = fuses_BB["F96"][cavidad][0][1];
                let cavidadw = fuses_BB["F96"][cavidad][1][0];
                let cavidadh = fuses_BB["F96"][cavidad][1][1];

                let cavidad_ctgry = fuses_types["F96"][cavidad];
                //console.log(cavidadx)
                //console.log(cavidady)
                //console.log(cavidadw)
                //console.log(cavidadh)
                getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);

                let orientacion = xDistance_fuse > yDistance_fuse? 'h':'v';
                var image = new Image();

                //console.log("F96 DISTANCE X",xDistance_fuse)
                //console.log("F96 DISTANCE Y",yDistance_fuse)
                //console.log(`orientacion ${orientacion} y de cavidad tipo ${cavidad_ctgry}`);
               
               
                image.src = `static/content/fusibles/${cavidad_ctgry},${amperaje},${color}${orientacion}.jpg`
                
                color_style = "#ffffff00"
                image.onerror = function() {
                    alert("Cavidad Erronea para el tipo de Fusible.")
                    return fuses_value["PDC-RMID"]["F96"] = "vacio";
                }
                image.onload = function() {
                    var pat = ctx_f96.createPattern(image, 'no-repeat');
                    ctx_f96.fillStyle = pat;
                    ctx_f96.drawImage(image, cavidadx,cavidady,xDistance_fuse,yDistance_fuse);
                    }
                
                ctx_f96.beginPath();
                ctx_f96.strokeStyle = color_style;
                ctx_f96.strokeRect(cavidadx, cavidady,xDistance_fuse,yDistance_fuse);
            }

            function pintar_2() {
                for (let i = 0; i < f96_array.length; i++) {
                    // var fusible_imagen = new Image();
                    let cavidad = f96_array[i];
                    // console.log("CAVIDAD : ",cavidad);
                    let fusibleColocado = fuses_value['PDC-RMID'][f96_array[i]];
                        console.log("Fusible Colocado: ",fusibleColocado);
        
                    let cavidadx = fuses_BB["F96"][cavidad][0][0];
                    let cavidady = fuses_BB["F96"][cavidad][0][1];
                    let cavidadw = fuses_BB["F96"][cavidad][1][0];
                    let cavidadh = fuses_BB["F96"][cavidad][1][1];
        
                    let cavidad_ctgry = fuses_types["F96"][cavidad];
                    // console.log(cavidadx)
                    // console.log(cavidady)
                    // console.log(cavidadw)
                    // console.log(cavidadh)
                    getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);
                    
                    // console.log("F96 DISTANCE X",xDistance_fuse)
                    // console.log("F96 DISTANCE Y",yDistance_fuse)
                    let orientacion = xDistance_fuse > yDistance_fuse? 'h':'v';
                    var image = new Image();                                                             
                    //console.log(color_style);
                    //console.log(fusibleColocado);
                    //color_style = "#ffffff00"
                    switch (fusibleColocado){
                        case "cafe":
                        //color_style = "#8B4513"
                        amperaje = '7.5';                        
                        break;
                        case 'rojo':
                        //color_style = "#FF0000"
                        amperaje = '10';
                        break;
                        case "verde":
                        //color_style = "#008000" 
                        amperaje = '30';                            
                        break;
                        case "azul":
                        //color_style = "#0000FF"
                        amperaje = '15';                        
                        break;
                        case "beige":
                        //color_style = "#FFD700"
                        amperaje ='5';                        
                        break;
                        default:
                        amperaje = 'N/A'
                        break;
                        }
                        color_style= '#ffffff00';
                        if (amperaje !== 'N/A') {  
                            image.src = `static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`                            
                        }
                        
                        ctx_f96.beginPath();
                        ctx_f96.strokeStyle = color_style;
                        ctx_f96.strokeRect(cavidadx, cavidady,xDistance_fuse,yDistance_fuse);
                        //console.log(`static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`)
                        cargar_cavidad_f96(cavidad_ctgry, amperaje, fusibleColocado, orientacion, image, ctx_f96, cavidadx,cavidady,cavidadw,cavidadh);    
                      
                    
                }
            }
        }
    }
}
function cargar_cavidad_f96 (cavidad_ctgry, amperaje, fusibleColocado, orientacion, image, ctx_f96, cavidadx, cavidady,cavidadw,cavidadh) {
    image.onload = function() {
        var pat = ctx_f96.createPattern(image, 'no-repeat');
        ctx_f96.fillStyle = pat;
        getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);
        ctx_f96.drawImage(image, cavidadx,cavidady,xDistance_fuse,yDistance_fuse);
        console.log(`static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`)
    }              
} 
function restaurar_f96(ctx_f96, img_f96) {
    var datosimagen = ctx_f96.getImageData(0, 0, imgWidth_f96, imgHeight_f96);
    var datos = datosimagen.data;
    for (var i = 0; i < datos.length; i++) {
        datos[i] = datosPrim_f96[i];
        datos[i + 1] = datosPrim_f96[i + 1];
        datos[i + 2] = datosPrim_f96[i + 2];
    }
    ctx_f96.putImageData(datosimagen, 0, 0);
}


$("#rojo_pdcs").on("click", function() {
    color = "rojo";
    color_style = "#FF0000";
    console.log("Color seleccionado: ", color)
    caja = "pdcs";
    console.log("Caja seleccionada", caja);
});
$("#cafe_pdcs").on("click", function() {
    color = "cafe";
    color_style = "#8B4513";
    console.log("Color seleccionado: ", color)
    caja = "pdcs";
    console.log("Caja seleccionada", caja);
});
$("#beige_pdcs").on("click", function() {
    color = "beige";
    color_style = "#FFD700";
    console.log("Color seleccionado: ", color)
    caja = "pdcs";
    console.log("Caja seleccionada", caja);
});
$("#azul_pdcs").on("click", function() {
    color = "azul";
    color_style = "#0000FF";
    console.log("Color seleccionado: ", color)
    caja = "pdcs";
    console.log("Caja seleccionada", caja);
});
$("#verde_pdcs").on("click", function() {
    color = "verde";
    color_style = "#008000";
    console.log("Color seleccionado: ", color)
    caja = "pdcs";
    console.log("Caja seleccionada", caja);
});

$("#eliminar_pdcs").on("click", function() {
    color = "eliminar";
    color_style = "#008000";
    console.log("Color seleccionado: ", color)
    caja = "pdcs";
    console.log("Caja seleccionada", caja);
});

function cargar_imagen_pdcs() {
    var t1 = new ToolTip_pdcs(img_pdcs, "This is a tool-tip", 150);
    if (img_pdcs.getContext) {
        var ctx_pdcs = img_pdcs.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcs/pdcs.jpg";
        img.onload = function() {
            imgWidth_pdcs = this.width;
            imgHeight_pdcs = this.height;
            img_pdcs.width = imgWidth_pdcs;
            img_pdcs.height = imgHeight_pdcs;
            // console.log("imgWidth_pdcs: ",imgWidth_pdcs);
            // console.log("imgHeight_pdcs: ",imgHeight_pdcs);
            // console.log("img_pdcs.width: ",img_pdcs.width);
            // console.log("img_pdcs.height: ",img_pdcs.height);
            ctx_pdcs.drawImage(this, 0, 0, imgWidth_pdcs, imgHeight_pdcs);
            var datosimagen = ctx_pdcs.getImageData(0, 0, imgWidth_pdcs, imgHeight_pdcs);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcs = datosimagen.data;
            ctx_pdcs.lineWidth = "3";
            pintar_2();

            img_pdcs.onmouseup = function(event) {
                var fusible;
                // console.log(fuses_BB);
                // console.log(fuses_BB['PDC-S']);
                let keys_pdcs = Object.keys(fuses_BB['PDC-S']);
                // console.log("KEYS DE PDCS: ",keys_pdcs);
                var x = event.pageX;
                var y = event.pageY;
                var coor = "X coords: " + x + ", Y coords: " + y;
                // console.log(coor);
                var X = document.getElementById("pdcs_image_v_canvas").getBoundingClientRect();
                pixelx = x - window.scrollX - X.left
                pixely = y - window.scrollY - X.top
                    // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

                for (i = 0; i < keys_pdcs.length; i++) {
                    if (pixelx >= fuses_BB['PDC-S'][keys_pdcs[i]][0][0] && pixelx <= fuses_BB['PDC-S'][keys_pdcs[i]][1][0] && pixely >= fuses_BB['PDC-S'][keys_pdcs[i]][0][1] && pixely <= fuses_BB['PDC-S'][keys_pdcs[i]][1][1] && color != "vacio" && caja == "pdcs") {
                        var temporal_text = "Esta dentro de " + keys_pdcs[i]
                            // console.log("TEMPORAL TEXT",temporal_text)
                        element = keys_pdcs[i]
                        fuses_value["PDC-S"][element] = color
                        //console.log(cavidad);
                        fusible = element;
                        console.log(fusible);
                    switch (color){
                        case "cafe":
                        amperaje = '7.5';
                        break;
                        case 'rojo':
                        if (fusible === 'F464'|| fusible === 'F463'|| fusible === 'F462'||fusible === 'F449' || fusible === 'F448' || fusible === 'F447' || fusible === 'F420'|| fusible === 'F419' || fusible === 'F418') {
                            amperaje = '50';
                        }else{
                            amperaje = '10';
                        }
                        break;
                        case "verde":
                            amperaje = '30';
                        break;
                        case "azul":
                        amperaje = '15';                            
                        break;
                        case "beige":
                        amperaje ='5';                            
                        break;
                        case "natural":
                        amperaje = '25'                            
                        break;
                        case "amarillo":
                        amperaje = '20';                            
                        break;
                        case "naranja":
                        amperaje = '40';                        
                        break;
                        case "1008695":
                        amperaje = '60'//Rosa                            
                        break;
                        case "1010733":
                        amperaje = '70'//Gris                            
                        break;    
                    }
                    if (pdcs_array.length!=0){
                        if(pdcs_array.indexOf(element)!=-1){
                            fuses_value["PDC-S"][element] = "vacio";
                            pdcs_array.splice(pdcs_array.indexOf(element),1)
                            restaurar_pdcs(ctx_pdcs,img_pdcs);
                            pintar_2()
                        }
                        else{
                            var temp = color.split(",");
                            if (temp[0] == "eliminar"){
                                console.log("Fusible eliminado")
                                fuses_value["PDC-S"][element] = "vacio";
                                return
                            }
                            pdcs_array.push(element)
                            pintar()
                        }
                    }
                    else{
                        var temp = color.split(",");
                        if (temp[0] == "eliminar"){
                            console.log("Fusible eliminado")
                            fuses_value["PDC-S"][element] = "vacio";
                            return
                        }
                        pdcs_array.push(element)
                        pintar()
                    }
                        // console.log("LEYENDO ARRAY 2: ",pdcs_array);
                    }
                }
                console.log("FUSIBLE: ", fusible);
            }

            function pintar(){
                let cavidad = pdcs_array[pdcs_array.length-1];
                //console.log("CAVIDAD : ",cavidad);
                //console.log("Fusible Colocado: ",color);

                let cavidadx = fuses_BB["PDC-S"][cavidad][0][0];
                let cavidady = fuses_BB["PDC-S"][cavidad][0][1];
                let cavidadw = fuses_BB["PDC-S"][cavidad][1][0];
                let cavidadh = fuses_BB["PDC-S"][cavidad][1][1];

                let cavidad_ctgry = fuses_types["PDC-S"][cavidad];
                //console.log(cavidadx)
                //console.log(cavidady)
                //console.log(cavidadw)
                //console.log(cavidadh)
                getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);

                let orientacion = xDistance_fuse > yDistance_fuse? 'h':'v';
                var image = new Image();

                //console.log("PDC-S DISTANCE X",xDistance_fuse)
                //console.log("PDC-S DISTANCE Y",yDistance_fuse)
                //console.log(`orientacion ${orientacion} y de cavidad tipo ${cavidad_ctgry}`);
               
               
                image.src = `static/content/fusibles/${cavidad_ctgry},${amperaje},${color}${orientacion}.jpg`
                
                color_style = "#ffffff00"
                image.onerror = function() {
                    return fuses_value["PDC-S"][element] = "vacio";
                }
                image.onload = function() {
                    var pat = ctx_pdcs.createPattern(image, 'no-repeat');
                    ctx_pdcs.fillStyle = pat;
                    ctx_pdcs.drawImage(image, cavidadx,cavidady,xDistance_fuse,yDistance_fuse);
                    }
                
                ctx_pdcs.beginPath();
                ctx_pdcs.strokeStyle = color_style;
                ctx_pdcs.strokeRect(cavidadx, cavidady,xDistance_fuse,yDistance_fuse);
            }

            function pintar_2(){
                for (let i = 0; i < pdcs_array.length; i++) {
                    // var fusible_imagen = new Image();
                    let cavidad = pdcs_array[i];
                    // console.log("CAVIDAD : ",cavidad);
                    let fusibleColocado = fuses_value["PDC-S"][pdcs_array[i]];
                    // console.log("Fusible Colocado: ",fusibleColocado);

                    let cavidadx = fuses_BB["PDC-S"][cavidad][0][0];
                    let cavidady = fuses_BB["PDC-S"][cavidad][0][1];
                    let cavidadw = fuses_BB["PDC-S"][cavidad][1][0];
                    let cavidadh = fuses_BB["PDC-S"][cavidad][1][1];

                    let cavidad_ctgry = fuses_types["PDC-S"][cavidad];
                    // console.log(cavidadx)
                    // console.log(cavidady)
                    // console.log(cavidadw)
                    // console.log(cavidadh)
                    getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);
                    
                    // console.log("PDC-S DISTANCE X",xDistance_fuse)
                    // console.log("PDC-S DISTANCE Y",yDistance_fuse)
                    let orientacion = xDistance_fuse > yDistance_fuse? 'h':'v';
                    var image = new Image();                                                             
                    //console.log(color_style);
                    //console.log(fusibleColocado);
                    //color_style = "#ffffff00"
                    switch (fusibleColocado){
                        case "cafe":
                        //color_style = "#8B4513"
                        amperaje = '7.5';                        
                        break;
                        case 'rojo':
                        //color_style = "#FF0000"
                        if (cavidad === 'F464'|| cavidad === 'F463'|| cavidad === 'F462'||cavidad === 'F449' || cavidad === 'F448' || cavidad === 'F447' || cavidad === 'F420'|| cavidad === 'F419' || cavidad === 'F418') {
                            amperaje = '50';
                        }else{
                            amperaje = '10';
                        }                        
                        break;
                        case "verde":
                        //color_style = "#008000" 
                        amperaje = '30';                            
                        break;
                        case "azul":
                        //color_style = "#0000FF"
                        amperaje = '15';                        
                        break;
                        case "beige":
                        //color_style = "#FFD700"
                        amperaje ='5';                        
                        break;
                        case "natural":
                        //color_style = "#FFFFFF"
                        amperaje = '25'                        
                        break;
                        case "amarillo":
                        //color_style = "#FFFF00"
                        amperaje = '20';                        
                        break;
                        case "naranja":
                        //color_style = "#FFA500"
                        amperaje = '40';                        
                        break;
                        case "1008695":
                        //color_style = "#FF00FF"
                        amperaje = '60'//Rosa                        
                        break;
                        case "1010733":
                        //color_style = "#A9A9A9"
                        amperaje = '70'//Gris                        
                        break;
                        default:
                        amperaje = 'N/A'
                        break;
                        }
                        color_style= '#ffffff00';
                        if (amperaje !== 'N/A') {  
                            image.src = `static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`                            
                        }
                    ctx_pdcs.beginPath();
                    ctx_pdcs.strokeStyle = color_style;
                    ctx_pdcs.strokeRect(cavidadx, cavidady,xDistance_fuse,yDistance_fuse);
                    //console.log(`static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`)
                    cargar_cavidad_pdcs(cavidad_ctgry, amperaje, fusibleColocado, orientacion, image, ctx_pdcs, cavidadx,cavidady,cavidadw,cavidadh);                
                }
            }
        }
    }
}
function cargar_cavidad_pdcs (cavidad_ctgry, amperaje, fusibleColocado, orientacion, image, ctx_pdcs, cavidadx, cavidady,cavidadw,cavidadh) {
    image.onload = function() {
        var pat = ctx_pdcs.createPattern(image, 'no-repeat');
        ctx_pdcs.fillStyle = pat;
        getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);
        ctx_pdcs.drawImage(image, cavidadx,cavidady,xDistance_fuse,yDistance_fuse);
        //console.log(`static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`)
    }              
}  

function restaurar_pdcs(ctx_pdcs, img_pdcs) {
    var datosimagen = ctx_pdcs.getImageData(0, 0, imgWidth_pdcs, imgHeight_pdcs);
    var datos = datosimagen.data;
    for (var i = 0; i < datos.length; i++) {
        datos[i] = datosPrim_pdcs[i];
        datos[i + 1] = datosPrim_pdcs[i + 1];
        datos[i + 2] = datosPrim_pdcs[i + 2];
    }
    ctx_pdcs.putImageData(datosimagen, 0, 0);
}


$("#rojo_tblu").on("click", function() {
    color = "rojo";
    color_style = "#FF0000";
    console.log("Color seleccionado: ", color)
    caja = "tblu";
    console.log("Caja seleccionada", caja);
});
$("#beige_tblu").on("click", function() {
    color = "beige";
    color_style = "#FFD700";
    console.log("Color seleccionado: ", color)
    caja = "tblu";
    console.log("Caja seleccionada", caja);
});
$("#azul_tblu").on("click", function() {
    color = "azul";
    color_style = "#0000FF";
    console.log("Color seleccionado: ", color)
    caja = "tblu";
    console.log("Caja seleccionada", caja);
});
$("#eliminar_tblu").on("click", function() {
    color = "eliminar";
    color_style = "#0000FF";
    console.log("Color seleccionado: ", color)
    caja = "tblu";
    console.log("Caja seleccionada", caja);
});

function cargar_imagen_tblu() {
    var t1 = new ToolTip_tblu(img_tblu, "This is a tool-tip", 150);
    if (img_tblu.getContext) {
        var ctx_tblu = img_tblu.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/btlu/btlu.jpg";
        img.onload = function() {
            imgWidth_tblu = this.width;
            imgHeight_tblu = this.height;
            img_tblu.width = imgWidth_tblu;
            img_tblu.height = imgHeight_tblu;
            // console.log("imgWidth_tblu: ",imgWidth_tblu);
            // console.log("imgHeight_tblu: ",imgHeight_tblu);
            // console.log("img_tblu.width: ",img_tblu.width);
            // console.log("img_tblu.height: ",img_tblu.height);
            ctx_tblu.drawImage(this, 0, 0, imgWidth_tblu, imgHeight_tblu);
            var datosimagen = ctx_tblu.getImageData(0, 0, imgWidth_tblu, imgHeight_tblu);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_tblu = datosimagen.data;
            ctx_tblu.lineWidth = "3";
            pintar_2();

            img_tblu.onmouseup = function(event) {
                var fusible;
                // console.log(fuses_BB);
                // console.log(fuses_BB['TBLU']);
                let keys_tblu = Object.keys(fuses_BB['TBLU']);
                // console.log("KEYS DE TBLU: ",keys_tblu);
                var x = event.pageX;
                var y = event.pageY;
                var coor = "X coords: " + x + ", Y coords: " + y;
                // console.log(coor);
                var X = document.getElementById("tblu_image_v_canvas").getBoundingClientRect();
                pixelx = x - window.scrollX - X.left
                pixely = y - window.scrollY - X.top
                    // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

                for (i = 0; i < keys_tblu.length; i++) {
                    if (pixelx >= fuses_BB['TBLU'][keys_tblu[i]][0][0] && pixelx <= fuses_BB['TBLU'][keys_tblu[i]][1][0] && pixely >= fuses_BB['TBLU'][keys_tblu[i]][0][1] && pixely <= fuses_BB['TBLU'][keys_tblu[i]][1][1] && color != "vacio" && caja == "tblu") {
                        var temporal_text = "Esta dentro de " + keys_tblu[i]
                            // console.log("TEMPORAL TEXT",temporal_text)
                        element = keys_tblu[i]
                        fuses_value["TBLU"][element] = color
                        //console.log(cavidad);
                        fusible = element;
                        console.log(fusible);
                        switch (color){
                           case "cafe":
                           amperaje = '7.5';
                           break;
                           case 'rojo':
                           if (fusible === 'F464'|| fusible === 'F463'|| fusible === 'F462'||fusible === 'F449' || fusible === 'F448' || fusible === 'F447' || fusible === 'F420'|| fusible === 'F419' || fusible === 'F418') {
                               amperaje = '50';
                           }else{
                               amperaje = '10';
                           }
                           break;
                           case "verde":
                               amperaje = '30';
                           break;
                           case "azul":
                           amperaje = '15';                            
                           break;
                           case "beige":
                           amperaje ='5';                            
                           break;
                           case "natural":
                           amperaje = '25'                            
                           break;
                           case "amarillo":
                           amperaje = '20';                            
                           break;
                           case "naranja":
                           amperaje = '40';                        
                           break;
                           case "1008695":
                           amperaje = '60'//Rosa                            
                           break;
                           case "1010733":
                           amperaje = '70'//Gris                            
                           break;    
                       }
                           
                       if (tblu_array.length!=0){
                        if(tblu_array.indexOf(element)!=-1){
                            fuses_value["TBLU"][element] = "vacio";
                            tblu_array.splice(tblu_array.indexOf(element),1)
                            restaurar_tblu(ctx_tblu,img_tblu);
                            pintar_2()
                        }
                        else{
                            var temp = color.split(",");
                            if (temp[0] == "eliminar"){
                                console.log("Fusible eliminado")
                                fuses_value["TBLU"][element] = "vacio";
                                return
                            }
                            tblu_array.push(element)
                            pintar()
                        }
                    }
                    else{
                        var temp = color.split(",");
                        if (temp[0] == "eliminar"){
                            console.log("Fusible eliminado")
                            fuses_value["TBLU"][element] = "vacio";
                            return
                        }
                        tblu_array.push(element)
                        pintar()
                    }
                        // console.log("LEYENDO ARRAY 2: ",tblu_array);
                    }
                }
                console.log("FUSIBLE: ", fusible);
            }

            function pintar(){
                let cavidad = tblu_array[tblu_array.length-1];
                //console.log("CAVIDAD : ",cavidad);
                //console.log("Fusible Colocado: ",color);

                let cavidadx = fuses_BB["TBLU"][cavidad][0][0];
                let cavidady = fuses_BB["TBLU"][cavidad][0][1];
                let cavidadw = fuses_BB["TBLU"][cavidad][1][0];
                let cavidadh = fuses_BB["TBLU"][cavidad][1][1];

                let cavidad_ctgry = fuses_types["TBLU"][cavidad];
                //console.log(cavidadx)
                //console.log(cavidady)
                //console.log(cavidadw)
                //console.log(cavidadh)
                getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);

                let orientacion = xDistance_fuse > yDistance_fuse? 'h':'v';
                var image = new Image();

                //console.log("TBLU DISTANCE X",xDistance_fuse)
                //console.log("TBLU DISTANCE Y",yDistance_fuse)
                //console.log(`orientacion ${orientacion} y de cavidad tipo ${cavidad_ctgry}`);
               
               
                image.src = `static/content/fusibles/${cavidad_ctgry},${amperaje},${color}_clear${orientacion}.jpg`
                
                color_style = "#ffffff00"
                image.onerror = function() {
                    return fuses_value["TBLU"][element] = "vacio";
                }
                image.onload = function() {
                    var pat = ctx_tblu.createPattern(image, 'no-repeat');
                    ctx_tblu.fillStyle = pat;
                    ctx_tblu.drawImage(image, cavidadx,cavidady,xDistance_fuse,yDistance_fuse);
                    }
                
                ctx_tblu.beginPath();
                ctx_tblu.strokeStyle = color_style;
                ctx_tblu.strokeRect(cavidadx, cavidady,xDistance_fuse,yDistance_fuse);
            }

            function pintar_2(){
                for (let i = 0; i < tblu_array.length; i++) {
                    // var fusible_imagen = new Image();
                    let cavidad = tblu_array[i];
                    // console.log("CAVIDAD : ",cavidad);
                    let fusibleColocado = fuses_value["TBLU"][tblu_array[i]];
                    // console.log("Fusible Colocado: ",fusibleColocado);

                    let cavidadx = fuses_BB["TBLU"][cavidad][0][0];
                    let cavidady = fuses_BB["TBLU"][cavidad][0][1];
                    let cavidadw = fuses_BB["TBLU"][cavidad][1][0];
                    let cavidadh = fuses_BB["TBLU"][cavidad][1][1];

                    let cavidad_ctgry = fuses_types["TBLU"][cavidad];
                    // console.log(cavidadx)
                    // console.log(cavidady)
                    // console.log(cavidadw)
                    // console.log(cavidadh)
                    getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);
                    
                    // console.log("TBLU DISTANCE X",xDistance_fuse)
                    // console.log("TBLU DISTANCE Y",yDistance_fuse)
                    let orientacion = xDistance_fuse > yDistance_fuse? 'h':'v';
                    var image = new Image();                                                             
                    //console.log(color_style);
                    //console.log(fusibleColocado);
                    //color_style = "#ffffff00"
                    switch (fusibleColocado){
                        case "cafe":
                        //color_style = "#8B4513"
                        amperaje = '7.5';                        
                        break;
                        case 'rojo':
                        //color_style = "#FF0000"
                        if (cavidad === 'F464'|| cavidad === 'F463'|| cavidad === 'F462'||cavidad === 'F449' || cavidad === 'F448' || cavidad === 'F447' || cavidad === 'F420'|| cavidad === 'F419' || cavidad === 'F418') {
                            amperaje = '50';
                        }else{
                            amperaje = '10';
                        }                        
                        break;
                        case "verde":
                        //color_style = "#008000" 
                        amperaje = '30';                            
                        break;
                        case "azul":
                        //color_style = "#0000FF"
                        amperaje = '15';                        
                        break;
                        case "beige":
                        //color_style = "#FFD700"
                        amperaje ='5';                        
                        break;
                        case "natural":
                        //color_style = "#FFFFFF"
                        amperaje = '25'                        
                        break;
                        case "amarillo":
                        //color_style = "#FFFF00"
                        amperaje = '20';                        
                        break;
                        case "naranja":
                        //color_style = "#FFA500"
                        amperaje = '40';                        
                        break;
                        case "1008695":
                        //color_style = "#FF00FF"
                        amperaje = '60'//Rosa                        
                        break;
                        case "1010733":
                        //color_style = "#A9A9A9"
                        amperaje = '70'//Gris                        
                        break;
                        default:
                        amperaje = 'N/A'
                        break;
                        }
                        color_style= '#ffffff00';
                        if (amperaje !== 'N/A') {  
                            image.src = `static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}_clear${orientacion}.jpg`                            
                        }
                    ctx_tblu.beginPath();
                    ctx_tblu.strokeStyle = color_style;
                    ctx_tblu.strokeRect(cavidadx, cavidady,xDistance_fuse,yDistance_fuse);
                    //console.log(`static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`)
                    cargar_cavidad_tblu(cavidad_ctgry, amperaje, fusibleColocado, orientacion, image, ctx_tblu, cavidadx,cavidady,cavidadw,cavidadh);                
                }
            }
        }
    }
}
function cargar_cavidad_tblu (cavidad_ctgry, amperaje, fusibleColocado, orientacion, image, ctx_tblu, cavidadx, cavidady,cavidadw,cavidadh) {
    image.onload = function() {
        var pat = ctx_tblu.createPattern(image, 'no-repeat');
        ctx_tblu.fillStyle = pat;
        getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);
        ctx_tblu.drawImage(image, cavidadx,cavidady,xDistance_fuse,yDistance_fuse);
        //console.log(`static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`)
    }              
}  

function restaurar_tblu(ctx_tblu, img_tblu) {
    var datosimagen = ctx_tblu.getImageData(0, 0, imgWidth_tblu, imgHeight_tblu);
    var datos = datosimagen.data;
    for (var i = 0; i < datos.length; i++) {
        datos[i] = datosPrim_tblu[i];
        datos[i + 1] = datosPrim_tblu[i + 1];
        datos[i + 2] = datosPrim_tblu[i + 2];
    }
    ctx_tblu.putImageData(datosimagen, 0, 0);
}


$("#beige_pdcd").on("click", function() {
    color = "beige";
    color_style = "#FFD700";
    console.log("Color seleccionado: ", color)
    caja = "pdcd";
    ctgry = "MINI"
    console.log("Caja seleccionada", caja);
});
$("#beige_ato_pdcd").on("click", function() {
    color = "beige";
    color_style = "#FFD700";
    console.log("Color seleccionado: ", color)
    caja = "pdcd";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#cafe_ato_pdcd").on("click", function() {
    color = "cafe";
    color_style = "#8B4513";
    console.log("Color seleccionado: ", color)
    caja = "pdcd";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#cafe_mini_pdcd").on("click", function() {
    color = "cafe";
    color_style = "#8B4513";
    console.log("Color seleccionado: ", color)
    caja = "pdcd";
    ctgry = "MINI"
    console.log("Caja seleccionada", caja);
});
$("#rojo_pdcd").on("click", function() {
    color = "rojo";
    color_style = "#FF0000";
    console.log("Color seleccionado: ", color)
    caja = "pdcd";
    ctgry = "MINI"
    console.log("Caja seleccionada", caja);
});
$("#verde_pdcd").on("click", function() {
    color = "verde";
    color_style = "#008000";
    console.log("Color seleccionado: ", color)
    caja = "pdcd";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#azul_pdcd").on("click", function() {
    color = "azul";
    color_style = "#0000FF";
    console.log("Color seleccionado: ", color)
    caja = "pdcd";
    ctgry = "MINI"
    console.log("Caja seleccionada", caja);
});
$("#natural_pdcd").on("click", function() {
    color = "natural";
    color_style = "#FFFFFF";
    console.log("Color seleccionado: ", color)
    caja = "pdcd";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#eliminar_pdcd").on("click", function() {
    color = "eliminar";
    color_style = "#0000FF";
    console.log("Color seleccionado: ", color)
    caja = "pdcd";
    console.log("Caja seleccionada", caja);
});

function cargar_imagen_pdcd() {
    var t1 = new ToolTip_pdcd(img_pdcd, "This is a tool-tip", 150);
    if (img_pdcd.getContext) {
        var ctx_pdcd = img_pdcd.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcd/pdcd.jpg";
        img.onload = function() {
            imgWidth_pdcd = this.width;
            imgHeight_pdcd = this.height;
            img_pdcd.width = imgWidth_pdcd;
            img_pdcd.height = imgHeight_pdcd;
            // console.log("imgWidth_pdcd: ",imgWidth_pdcd);
            // console.log("imgHeight_pdcd: ",imgHeight_pdcd);
            // console.log("img_pdcd.width: ",img_pdcd.width);
            // console.log("img_pdcd.height: ",img_pdcd.height);
            ctx_pdcd.drawImage(this, 0, 0, imgWidth_pdcd, imgHeight_pdcd);
            var datosimagen = ctx_pdcd.getImageData(0, 0, imgWidth_pdcd, imgHeight_pdcd);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcd = datosimagen.data;
            ctx_pdcd.lineWidth = "3";
            pintar_2();

            img_pdcd.onmouseup = function(event) {
                var fusible;
                // console.log(fuses_BB);
                // console.log(fuses_BB['PDC-D']);
                let keys_pdcd = Object.keys(fuses_BB['PDC-D']);
                // console.log("KEYS DE PDCS: ",keys_pdcd);
                var x = event.pageX;
                var y = event.pageY;
                var coor = "X coords: " + x + ", Y coords: " + y;
                // console.log(coor);B
                var X = document.getElementById("pdcd_image_v_canvas").getBoundingClientRect();
                pixelx = x - window.scrollX - X.left
                pixely = y - window.scrollY - X.top
                    // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

                for (i = 0; i < keys_pdcd.length; i++) {
                    if (pixelx >= fuses_BB['PDC-D'][keys_pdcd[i]][0][0] && pixelx <= fuses_BB['PDC-D'][keys_pdcd[i]][1][0] && pixely >= fuses_BB['PDC-D'][keys_pdcd[i]][0][1] && pixely <= fuses_BB['PDC-D'][keys_pdcd[i]][1][1] && color != "vacio" && caja == "pdcd") {
                        var temporal_text = "Esta dentro de " + keys_pdcd[i]
                            // console.log("TEMPORAL TEXT",temporal_text)
                        element = keys_pdcd[i]
                        fuses_value["PDC-D"][element] = color
                        //console.log(cavidad);
                        fusible = element;
                        console.log(fusible);
                        switch (color){
                           case "cafe":
                           amperaje = '7.5';
                           break;
                           case 'rojo':
                           if (fusible === 'F464'|| fusible === 'F463'|| fusible === 'F462'||fusible === 'F449' || fusible === 'F448' || fusible === 'F447' || fusible === 'F420'|| fusible === 'F419' || fusible === 'F418') {
                               amperaje = '50';
                           }else{
                               amperaje = '10';
                           }
                           break;
                           case "verde":
                               amperaje = '30';
                           break;
                           case "azul":
                           amperaje = '15';                            
                           break;
                           case "beige":
                           amperaje ='5';                            
                           break;
                           case "natural":
                           amperaje = '25'                            
                           break;
                           case "amarillo":
                           amperaje = '20';                            
                           break;
                           case "naranja":
                           amperaje = '40';                        
                           break;
                           case "1008695":
                           amperaje = '60'//Rosa                            
                           break;
                           case "1010733":
                           amperaje = '70'//Gris                            
                           break;    
                       }
                           
                       if (pdcd_array.length!=0){
                        if(pdcd_array.indexOf(element)!=-1){
                            fuses_value["PDC-D"][element] = "vacio";
                            pdcd_array.splice(pdcd_array.indexOf(element),1)
                            restaurar_pdcd(ctx_pdcd,img_pdcd);
                            pintar_2()
                        }
                        else{
                            var temp = color.split(",");
                            if (temp[0] == "eliminar"){
                                console.log("Fusible eliminado")
                                fuses_value["PDC-D"][element] = "vacio";
                                return
                            }else{
                                if (ctgry != fuses_types["PDC-D"][element]){
                                    console.log("NO COINCIDE")
                                    fuses_value["PDC-D"][element] = "vacio";
                                    $("#warning-alert-PDCD").fadeTo(2000, 500).slideUp(500, function() {
                                    $("#warning-alert-PDCD").slideUp(500);
                                    });
                                    return
                                }
                            }
                            pdcd_array.push(element)
                            pintar()
                        }
                    }
                    else{
                        var temp = color.split(",");
                        if (temp[0] == "eliminar"){
                            console.log("Fusible eliminado")
                            fuses_value["PDC-D"][element] = "vacio";
                            return
                        }else{
                            console.log(`${temp[0]} y ${fuses_types["PDC-D"][element]} `)
                            if (ctgry != fuses_types["PDC-D"][element]){
                                console.log("NO COINCIDE")
                                fuses_value["PDC-D"][element] = "vacio";
                                $("#warning-alert-PDCD").fadeTo(2000, 500).slideUp(500, function() {
                                $("#warning-alert-PDCD").slideUp(500);
                                });
                                return
                            }
                        }
                        pdcd_array.push(element)
                        pintar()
                    }
                        // console.log("LEYENDO ARRAY 2: ",pdcd_array);
                    }
                }
                console.log("FUSIBLE: ", fusible);
            }

            function pintar(){
                let cavidad = pdcd_array[pdcd_array.length-1];
                //console.log("CAVIDAD : ",cavidad);
                //console.log("Fusible Colocado: ",color);

                let cavidadx = fuses_BB["PDC-D"][cavidad][0][0];
                let cavidady = fuses_BB["PDC-D"][cavidad][0][1];
                let cavidadw = fuses_BB["PDC-D"][cavidad][1][0];
                let cavidadh = fuses_BB["PDC-D"][cavidad][1][1];

                let cavidad_ctgry = fuses_types["PDC-D"][cavidad];
                //console.log(cavidadx)
                //console.log(cavidady)
                //console.log(cavidadw)
                //console.log(cavidadh)
                getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);

                let orientacion = xDistance_fuse > yDistance_fuse? 'h':'v';
                var image = new Image();

                //console.log("PDC-R DISTANCE X",xDistance_fuse)
                //console.log("PDC-R DISTANCE Y",yDistance_fuse)
                //console.log(`orientacion ${orientacion} y de cavidad tipo ${cavidad_ctgry}`);
               
               
                image.src = `static/content/fusibles/${cavidad_ctgry},${amperaje},${color}${orientacion}.jpg`
                
                color_style = "#ffffff00"
                image.onerror = function() {
                    return fuses_value["PDC-D"][element] = "vacio";
                }
                image.onload = function() {
                    var pat = ctx_pdcd.createPattern(image, 'no-repeat');
                    ctx_pdcd.fillStyle = pat;
                    ctx_pdcd.drawImage(image, cavidadx,cavidady,xDistance_fuse,yDistance_fuse);
                    }
                
                ctx_pdcd.beginPath();
                ctx_pdcd.strokeStyle = color_style;
                ctx_pdcd.strokeRect(cavidadx, cavidady,xDistance_fuse,yDistance_fuse);
            }

            function pintar_2(){
                for (let i = 0; i < pdcd_array.length; i++) {
                    // var fusible_imagen = new Image();
                    let cavidad = pdcd_array[i];
                    // console.log("CAVIDAD : ",cavidad);
                    let fusibleColocado = fuses_value["PDC-D"][pdcd_array[i]];
                    // console.log("Fusible Colocado: ",fusibleColocado);

                    let cavidadx = fuses_BB["PDC-D"][cavidad][0][0];
                    let cavidady = fuses_BB["PDC-D"][cavidad][0][1];
                    let cavidadw = fuses_BB["PDC-D"][cavidad][1][0];
                    let cavidadh = fuses_BB["PDC-D"][cavidad][1][1];

                    let cavidad_ctgry = fuses_types["PDC-D"][cavidad];
                    // console.log(cavidadx)
                    // console.log(cavidady)
                    // console.log(cavidadw)
                    // console.log(cavidadh)
                    getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);
                    
                    // console.log("PDC-R DISTANCE X",xDistance_fuse)
                    // console.log("PDC-R DISTANCE Y",yDistance_fuse)
                    let orientacion = xDistance_fuse > yDistance_fuse? 'h':'v';
                    var image = new Image();                                                             
                    //console.log(color_style);
                    //console.log(fusibleColocado);
                    //color_style = "#ffffff00"
                    switch (fusibleColocado){
                        case "cafe":
                        //color_style = "#8B4513"
                        amperaje = '7.5';                        
                        break;
                        case 'rojo':
                        //color_style = "#FF0000"
                        if (cavidad === 'F464'|| cavidad === 'F463'|| cavidad === 'F462'||cavidad === 'F449' || cavidad === 'F448' || cavidad === 'F447' || cavidad === 'F420'|| cavidad === 'F419' || cavidad === 'F418') {
                            amperaje = '50';
                        }else{
                            amperaje = '10';
                        }                        
                        break;
                        case "verde":
                        //color_style = "#008000" 
                        amperaje = '30';                            
                        break;
                        case "azul":
                        //color_style = "#0000FF"
                        amperaje = '15';                        
                        break;
                        case "beige":
                        //color_style = "#FFD700"
                        amperaje ='5';                        
                        break;
                        case "natural":
                        //color_style = "#FFFFFF"
                        amperaje = '25'                        
                        break;
                        case "amarillo":
                        //color_style = "#FFFF00"
                        amperaje = '20';                        
                        break;
                        case "naranja":
                        //color_style = "#FFA500"
                        amperaje = '40';                        
                        break;
                        case "1008695":
                        //color_style = "#FF00FF"
                        amperaje = '60'//Rosa                        
                        break;
                        case "1010733":
                        //color_style = "#A9A9A9"
                        amperaje = '70'//Gris                        
                        break;
                        default:
                        amperaje = 'N/A'
                        break;
                        }
                        color_style= '#ffffff00';
                        if (amperaje !== 'N/A') {  
                            image.src = `static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`                            
                        }
                    ctx_pdcd.beginPath();
                    ctx_pdcd.strokeStyle = color_style;
                    ctx_pdcd.strokeRect(cavidadx, cavidady,xDistance_fuse,yDistance_fuse);
                    //console.log(`static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`)
                    cargar_cavidad_pdcd(cavidad_ctgry, amperaje, fusibleColocado, orientacion, image, ctx_pdcd, cavidadx,cavidady,cavidadw,cavidadh);                
                }
            }
        }
    }
}
function cargar_cavidad_pdcd (cavidad_ctgry, amperaje, fusibleColocado, orientacion, image, ctx_pdcd, cavidadx, cavidady,cavidadw,cavidadh) {
    image.onload = function() {
        var pat = ctx_pdcd.createPattern(image, 'no-repeat');
        ctx_pdcd.fillStyle = pat;
        getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);
        ctx_pdcd.drawImage(image, cavidadx,cavidady,xDistance_fuse,yDistance_fuse);
        //console.log(`static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`)
    }              
}  

function restaurar_pdcd(ctx_pdcd, img_pdcd) {
    var datosimagen = ctx_pdcd.getImageData(0, 0, imgWidth_pdcd, imgHeight_pdcd);
    var datos = datosimagen.data;
    for (var i = 0; i < datos.length; i++) {
        datos[i] = datosPrim_pdcd[i];
        datos[i + 1] = datosPrim_pdcd[i + 1];
        datos[i + 2] = datosPrim_pdcd[i + 2];
    }
    ctx_pdcd.putImageData(datosimagen, 0, 0);
}

$("#beige_pdcp").on("click", function() {
    color = "beige";
    color_style = "#FFD700";
    console.log("Color seleccionado: ", color)
    caja = "pdcp";
    ctgry = "MINI";
    console.log("Caja seleccionada", caja);
});
$("#cafe_mini_pdcp").on("click", function() {
    color = "cafe";
    color_style = "#8B4513";
    console.log("Color seleccionado: ", color)
    caja = "pdcp";
    ctgry = "MINI";
    console.log("Caja seleccionada", caja);
});
$("#cafe_multi_pdcp").on("click", function() {
    color = "cafe";
    color_style = "#8B4513";
    console.log("Color seleccionado: ", color)
    caja = "pdcp";
    ctgry = "MULTI"
    console.log("Caja seleccionada", caja);
});
$("#rojo_pdcp").on("click", function() {
    color = "rojo";
    color_style = "#FF0000";
    console.log("Color seleccionado: ", color)
    caja = "pdcp";
    ctgry = "MINI"
    console.log("Caja seleccionada", caja);
});
$("#verde_pdcp").on("click", function() {
    color = "verde";
    color_style = "#008000";
    console.log("Color seleccionado: ", color)
    caja = "pdcp";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#natural_pdcp").on("click", function() {
    color = "natural";
    color_style = "#FFFFFF";
    console.log("Color seleccionado: ", color)
    caja = "pdcp";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#azul_ato_pdcp").on("click", function() {
    color = "azul";
    color_style = "#0000FF";
    console.log("Color seleccionado: ", color)
    caja = "pdcp";
    ctgry = "ATO"
    console.log("Caja seleccionada", caja);
});
$("#azul_mini_pdcp").on("click", function() {
    color = "azul";
    color_style = "#0000FF";
    console.log("Color seleccionado: ", color)
    caja = "pdcp";
    ctgry = "MINI"
    console.log("Caja seleccionada", caja);
});
$("#amarillo_pdcp").on("click", function() {
    color = "beige";
    color_style = "#FFD700";
    console.log("Color seleccionado: ", color)
    caja = "pdcp";
    ctgry = "MULTI";
    console.log("Caja seleccionada", caja);
});
$("#eliminar_pdcp").on("click", function() {
    color = "eliminar";
    color_style = "#0000FF";
    console.log("Color seleccionado: ", color)
    caja = "pdcp";
    console.log("Caja seleccionada", caja);
});
function cargar_imagen_pdcp() {
    var t1 = new ToolTip_pdcp(img_pdcp, "This is a tool-tip", 150);
    if (img_pdcp.getContext) {
        var ctx_pdcp = img_pdcp.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcp/pdcp.jpg";
        img.onload = function() {
            imgWidth_pdcp = this.width;
            imgHeight_pdcp = this.height;
            img_pdcp.width = imgWidth_pdcp;
            img_pdcp.height = imgHeight_pdcp;
            // console.log("imgWidth_pdcp: ",imgWidth_pdcp);
            // console.log("imgHeight_pdcp: ",imgHeight_pdcp);
            // console.log("img_pdcp.width: ",img_pdcp.width);
            // console.log("img_pdcp.height: ",img_pdcp.height);
            ctx_pdcp.drawImage(this, 0, 0, imgWidth_pdcp, imgHeight_pdcp);
            var datosimagen = ctx_pdcp.getImageData(0, 0, imgWidth_pdcp, imgHeight_pdcp);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcp = datosimagen.data;
            ctx_pdcp.lineWidth = "3";
            pintar_2();

            img_pdcp.onmouseup = function(event) {
                var fusible;
                // console.log(fuses_BB);
                // console.log(fuses_BB['PDC-P']);
                let keys_pdcp = Object.keys(fuses_BB['PDC-P']);
                // console.log("KEYS DE PDCS: ",keys_pdcp);
                var x = event.pageX;
                var y = event.pageY;
                var coor = "X coords: " + x + ", Y coords: " + y;
                // console.log(coor);B
                var X = document.getElementById("pdcp_image_v_canvas").getBoundingClientRect();
                pixelx = x - window.scrollX - X.left
                pixely = y - window.scrollY - X.top
                    // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

                for (i = 0; i < keys_pdcp.length; i++) {
                    if (pixelx >= fuses_BB['PDC-P'][keys_pdcp[i]][0][0] && pixelx <= fuses_BB['PDC-P'][keys_pdcp[i]][1][0] && pixely >= fuses_BB['PDC-P'][keys_pdcp[i]][0][1] && pixely <= fuses_BB['PDC-P'][keys_pdcp[i]][1][1] && color != "vacio" && caja == "pdcp") {
                        var temporal_text = "Esta dentro de " + keys_pdcp[i]
                            // console.log("TEMPORAL TEXT",temporal_text)
                        element = keys_pdcp[i]
                        fuses_value["PDC-P"][element] = color
                        //console.log(cavidad);
                        fusible = element;
                        console.log(fusible);
                        switch (color){
                           case "cafe":
                           amperaje = '7.5';
                           break;
                           case 'rojo':
                           if (fusible === 'F464'|| fusible === 'F463'|| fusible === 'F462'||fusible === 'F449' || fusible === 'F448' || fusible === 'F447' || fusible === 'F420'|| fusible === 'F419' || fusible === 'F418') {
                               amperaje = '50';
                           }else{
                               amperaje = '10';
                           }
                           break;
                           case "verde":
                               amperaje = '30';
                           break;
                           case "azul":
                           amperaje = '15';                            
                           break;
                           case "beige":
                           amperaje ='5';                            
                           break;
                           case "natural":
                           amperaje = '25'                            
                           break;
                           case "amarillo":
                           amperaje = '20';                            
                           break;
                           case "naranja":
                           amperaje = '40';                        
                           break;
                           case "1008695":
                           amperaje = '60'//Rosa                            
                           break;
                           case "1010733":
                           amperaje = '70'//Gris                            
                           break;    
                       }
                           
                       if (pdcp_array.length!=0){
                        if(pdcp_array.indexOf(element)!=-1){
                            fuses_value["PDC-P"][element] = "vacio";
                            pdcp_array.splice(pdcp_array.indexOf(element),1)
                            restaurar_pdcp(ctx_pdcp,img_pdcp);
                            pintar_2()
                        }
                        else{
                            var temp = color.split(",");
                            if (temp[0] == "eliminar"){
                                console.log("Fusible eliminado")
                                fuses_value["PDC-P"][element] = "vacio";
                                return
                            }else{
                                if (ctgry != fuses_types["PDC-P"][element]){
                                    console.log("NO COINCIDE")
                                    fuses_value["PDC-P"][element] = "vacio";
                                    $("#warning-alert-PDCP").fadeTo(2000, 500).slideUp(500, function() {
                                    $("#warning-alert-PDCP").slideUp(500);
                                    });
                                    return
                                }
                            }
                            pdcp_array.push(element)
                            pintar()
                        }
                    }
                    else{
                        var temp = color.split(",");
                        if (temp[0] == "eliminar"){
                            console.log("Fusible eliminado")
                            fuses_value["PDC-P"][element] = "vacio";
                            return
                        }else{
                            console.log(`${temp[0]} y ${fuses_types["PDC-P"][element]} `)
                            if (ctgry != fuses_types["PDC-P"][element]){
                                console.log("NO COINCIDE")
                                fuses_value["PDC-P"][element] = "vacio";
                                $("#warning-alert-PDCP").fadeTo(2000, 500).slideUp(500, function() {
                                $("#warning-alert-PDCP").slideUp(500);
                                });
                                return
                            }
                        }
                        pdcp_array.push(element)
                        pintar()
                    }
                        // console.log("LEYENDO ARRAY 2: ",pdcp_array);
                    }
                }
                console.log("FUSIBLE: ", fusible);
            }

            function pintar(){
                let cavidad = pdcp_array[pdcp_array.length-1];
                //console.log("CAVIDAD : ",cavidad);
                //console.log("Fusible Colocado: ",color);

                let cavidadx = fuses_BB["PDC-P"][cavidad][0][0];
                let cavidady = fuses_BB["PDC-P"][cavidad][0][1];
                let cavidadw = fuses_BB["PDC-P"][cavidad][1][0];
                let cavidadh = fuses_BB["PDC-P"][cavidad][1][1];

                let cavidad_ctgry = fuses_types["PDC-P"][cavidad];
                //console.log(cavidadx)
                //console.log(cavidady)
                //console.log(cavidadw)
                //console.log(cavidadh)
                getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);

                let orientacion = xDistance_fuse > yDistance_fuse? 'h':'v';
                var image = new Image();

                //console.log("PDC-R DISTANCE X",xDistance_fuse)
                //console.log("PDC-R DISTANCE Y",yDistance_fuse)
                //console.log(`orientacion ${orientacion} y de cavidad tipo ${cavidad_ctgry}`);
               
               
                image.src = `static/content/fusibles/${cavidad_ctgry},${amperaje},${color}${orientacion}.jpg`
                
                color_style = "#ffffff00"
                image.onerror = function() {
                    return fuses_value["PDC-P"][element] = "vacio";
                }
                image.onload = function() {
                    var pat = ctx_pdcp.createPattern(image, 'no-repeat');
                    ctx_pdcp.fillStyle = pat;
                    ctx_pdcp.drawImage(image, cavidadx,cavidady,xDistance_fuse,yDistance_fuse);
                    }
                
                ctx_pdcp.beginPath();
                ctx_pdcp.strokeStyle = color_style;
                ctx_pdcp.strokeRect(cavidadx, cavidady,xDistance_fuse,yDistance_fuse);
            }

            function pintar_2(){
                for (let i = 0; i < pdcp_array.length; i++) {
                    // var fusible_imagen = new Image();
                    let cavidad = pdcp_array[i];
                    // console.log("CAVIDAD : ",cavidad);
                    let fusibleColocado = fuses_value["PDC-P"][pdcp_array[i]];
                    // console.log("Fusible Colocado: ",fusibleColocado);

                    let cavidadx = fuses_BB["PDC-P"][cavidad][0][0];
                    let cavidady = fuses_BB["PDC-P"][cavidad][0][1];
                    let cavidadw = fuses_BB["PDC-P"][cavidad][1][0];
                    let cavidadh = fuses_BB["PDC-P"][cavidad][1][1];

                    let cavidad_ctgry = fuses_types["PDC-P"][cavidad];
                    // console.log(cavidadx)
                    // console.log(cavidady)
                    // console.log(cavidadw)
                    // console.log(cavidadh)
                    getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);
                    
                    // console.log("PDC-R DISTANCE X",xDistance_fuse)
                    // console.log("PDC-R DISTANCE Y",yDistance_fuse)
                    let orientacion = xDistance_fuse > yDistance_fuse? 'h':'v';
                    var image = new Image();                                                             
                    //console.log(color_style);
                    //console.log(fusibleColocado);
                    //color_style = "#ffffff00"
                    switch (fusibleColocado){
                        case "cafe":
                        //color_style = "#8B4513"
                        amperaje = '7.5';                        
                        break;
                        case 'rojo':
                        //color_style = "#FF0000"
                        if (cavidad === 'F464'|| cavidad === 'F463'|| cavidad === 'F462'||cavidad === 'F449' || cavidad === 'F448' || cavidad === 'F447' || cavidad === 'F420'|| cavidad === 'F419' || cavidad === 'F418') {
                            amperaje = '50';
                        }else{
                            amperaje = '10';
                        }                        
                        break;
                        case "verde":
                        //color_style = "#008000" 
                        amperaje = '30';                            
                        break;
                        case "azul":
                        //color_style = "#0000FF"
                        amperaje = '15';                        
                        break;
                        case "beige":
                        //color_style = "#FFD700"
                        amperaje ='5';                        
                        break;
                        case "natural":
                        //color_style = "#FFFFFF"
                        amperaje = '25'                        
                        break;
                        case "amarillo":
                        //color_style = "#FFFF00"
                        amperaje = '20';                        
                        break;
                        case "naranja":
                        //color_style = "#FFA500"
                        amperaje = '40';                        
                        break;
                        case "1008695":
                        //color_style = "#FF00FF"
                        amperaje = '60'//Rosa                        
                        break;
                        case "1010733":
                        //color_style = "#A9A9A9"
                        amperaje = '70'//Gris                        
                        break;
                        default:
                        amperaje = 'N/A'
                        break;
                        }
                        color_style= '#ffffff00';
                        if (amperaje !== 'N/A') {  
                            image.src = `static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`                            
                        }
                    ctx_pdcp.beginPath();
                    ctx_pdcp.strokeStyle = color_style;
                    ctx_pdcp.strokeRect(cavidadx, cavidady,xDistance_fuse,yDistance_fuse);
                    //console.log(`static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`)
                    cargar_cavidad_pdcp(cavidad_ctgry, amperaje, fusibleColocado, orientacion, image, ctx_pdcp, cavidadx,cavidady,cavidadw,cavidadh);                
                }
            }
        }
    }
}
function cargar_cavidad_pdcp (cavidad_ctgry, amperaje, fusibleColocado, orientacion, image, ctx_pdcp, cavidadx, cavidady,cavidadw,cavidadh) {
    image.onload = function() {
        var pat = ctx_pdcp.createPattern(image, 'no-repeat');
        ctx_pdcp.fillStyle = pat;
        getDistance_fuse(cavidadx,cavidady,cavidadw,cavidadh);
        ctx_pdcp.drawImage(image, cavidadx,cavidady,xDistance_fuse,yDistance_fuse);
        //console.log(`static/content/fusibles/${cavidad_ctgry},${amperaje},${fusibleColocado}${orientacion}.jpg`)
    }              
}  

function restaurar_pdcp(ctx_pdcp, img_pdcp) {
    var datosimagen = ctx_pdcp.getImageData(0, 0, imgWidth_pdcp, imgHeight_pdcp);
    var datos = datosimagen.data;
    for (var i = 0; i < datos.length; i++) {
        datos[i] = datosPrim_pdcp[i];
        datos[i + 1] = datosPrim_pdcp[i + 1];
        datos[i + 2] = datosPrim_pdcp[i + 2];
    }
    ctx_pdcp.putImageData(datosimagen, 0, 0);
}


//  PDC-R ToolTip
function ToolTip_pdcr(img_pdcr, text, width) {
    var me = this,                                // self-reference for event handlers
    div = document.createElement("div"),      // the tool-tip div
    parent = img_pdcr.parentNode,               // parent node for img_pdcr
    visible = false;                          // current status
    // show the tool-tip
    this.show = function(pos) {
        if (!visible) {                             // ignore if already shown (or reset time)
            visible = true;                           // lock so it's only shown once
            setDivPos(pos);                           // set position
            parent.appendChild(div);                // add to parent of img_pdcr
        }
    }
    // hide the tool-tip
    function hide() {
        visible = false;                            // hide it after timeout
        if (parent.contains(div)) {
            parent.removeChild(div);                    // remove from DOM
        }
    }
    
    let keys_cavidad = Object.keys(fuses_BB['PDC-R']);
    // console.log("KEYS DE PDC-R: ",keys_cavidad);
    let cavidad,amperaje;
    // check mouse position, add limits as wanted... just for example:
    function check(e) {
        if(parent.contains(div)){
            hide();
        }
        var pos = getPos(e),
            posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
        for(i=0;i<keys_cavidad.length;i++){
            if (!visible && pos.x>=fuses_BB['PDC-R'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['PDC-R'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['PDC-R'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['PDC-R'][keys_cavidad[i]][1][1]) {
                cavidad = keys_cavidad[i];
                // set some initial styles, can be replaced by class-name etc.
                div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
                if (fuses_value['PDC-R'][cavidad] == "vacio" || fuses_value['PDC-R'][cavidad] == undefined || fuses_value["PDC-R"][cavidad] == "") {
                    fusible_tooltip = "Vacío";
                }else{
                    fusible_tooltip = fuses_value['PDC-R'][cavidad];
                }
                switch (fusible_tooltip){
                    case "cafe":
                        //color_style = "#8B4513"
                        amperaje = '7.5';                        
                        break;
                        case 'rojo':
                        //color_style = "#FF0000"
                        if (cavidad === 'F464'|| cavidad === 'F463'|| cavidad === 'F462'||cavidad === 'F449' || cavidad === 'F448' || cavidad === 'F447' || cavidad === 'F420'|| cavidad === 'F419' || cavidad === 'F418') {
                            amperaje = '50';
                        }else{
                            amperaje = '10';
                        }                        
                        break;
                        case "verde":
                        //color_style = "#008000" 
                        amperaje = '30';                            
                        break;
                        case "azul":
                        //color_style = "#0000FF"
                        amperaje = '15';                        
                        break;
                        case "beige":
                        //color_style = "#FFD700"
                        amperaje ='5';                        
                        break;
                        case "natural":
                        //color_style = "#FFFFFF"
                        amperaje = '25'                        
                        break;
                        case "amarillo":
                        //color_style = "#FFFF00"
                        amperaje = '20';                        
                        break;
                        case "naranja":
                        //color_style = "#FFA500"
                        amperaje = '40';                        
                        break;
                        case "1008695":
                        //color_style = "#FF00FF"
                        amperaje = '60'//Rosa                        
                        break;
                        case "1010733":
                        //color_style = "#A9A9A9"
                        amperaje = '70'//Gris                        
                        break;
                        default:
                        amperaje = 'N/A'
                        break;
                        }
                       let unidad = amperaje === 'N/A'? 'N/A': amperaje+' Amps';
                        div.innerHTML = `Cavidad: ${cavidad}<br>Fusible: ${fusible_tooltip}<br>Amperaje: ${unidad}`;
                me.show(posAbs);                          // show tool-tip at this pos
            }
            else setDivPos(posAbs);
        }// otherwise, update position
    }
    // get mouse position relative to img_pdcr
    function getPos(e) {
        var r = img_pdcr.getBoundingClientRect();
        return {x: e.clientX - r.left, y: e.clientY - r.top}
    }
    // update and adjust div position if needed (anchor to a different corner etc.)
    function setDivPos(pos) {
        if (visible){
        if (pos.x < 0) pos.x = 0;
        if (pos.y < 0) pos.y = 0;
        // other bound checks here
        div.style.left = pos.x + "px";
        div.style.top = pos.y + "px";
        }
    }
    // we need to use shared event handlers:
    img_pdcr.addEventListener("mousemove", check);
    img_pdcr.addEventListener("click", check);
    $(document).on('wheel', function(){ 
        hide();
    });
    }
//  PDC-RMID ToolTip
function ToolTip_pdcr_1(img_pdcr_1, text, width) {
    var me = this,                                // self-reference for event handlers
    div = document.createElement("div"),      // the tool-tip div
    parent = img_pdcr_1.parentNode,               // parent node for img_pdcr_1
    visible = false;                          // current status
    // show the tool-tip
    this.show = function(pos) {
        if (!visible) {                             // ignore if already shown (or reset time)
            visible = true;                           // lock so it's only shown once
            setDivPos(pos);                           // set position
            parent.appendChild(div);                // add to parent of img_pdcr_1
        }
    }
    // hide the tool-tip
    function hide() {
        visible = false;                            // hide it after timeout
        if (parent.contains(div)) {
            parent.removeChild(div);                    // remove from DOM
        }
    }
    
    let keys_cavidad = Object.keys(fuses_BB['PDC-RMID']);
    // console.log("KEYS DE PDC-RMID: ",keys_cavidad);
    let cavidad,amperaje;
    // check mouse position, add limits as wanted... just for example:
    function check(e) {
        if(parent.contains(div)){
            hide();
        }
        var pos = getPos(e),
            posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
        for(i=0;i<keys_cavidad.length;i++){
            if (!visible && pos.x>=fuses_BB['PDC-RMID'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['PDC-RMID'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['PDC-RMID'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['PDC-RMID'][keys_cavidad[i]][1][1]) {
                cavidad = keys_cavidad[i];
                // set some initial styles, can be replaced by class-name etc.
                div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
                if (fuses_value['PDC-RMID'][cavidad] == "vacio" || fuses_value['PDC-RMID'][cavidad] == undefined || fuses_value["PDC-RMID"][cavidad] == "") {
                    fusible_tooltip = "Vacío";
                }else{
                    fusible_tooltip = fuses_value['PDC-RMID'][cavidad];
                }
                switch (fusible_tooltip){
                    case "cafe":
                        //color_style = "#8B4513"
                        amperaje = '7.5';                        
                        break;
                        case 'rojo':
                        //color_style = "#FF0000"
                        if (cavidad === 'F464'|| cavidad === 'F463'|| cavidad === 'F462'||cavidad === 'F449' || cavidad === 'F448' || cavidad === 'F447' || cavidad === 'F420'|| cavidad === 'F419' || cavidad === 'F418') {
                            amperaje = '50';
                        }else{
                            amperaje = '10';
                        }                        
                        break;
                        case "verde":
                        //color_style = "#008000" 
                        amperaje = '30';                            
                        break;
                        case "azul":
                        //color_style = "#0000FF"
                        amperaje = '15';                        
                        break;
                        case "beige":
                        //color_style = "#FFD700"
                        amperaje ='5';                        
                        break;
                        case "natural":
                        //color_style = "#FFFFFF"
                        amperaje = '25'                        
                        break;
                        case "amarillo":
                        //color_style = "#FFFF00"
                        amperaje = '20';                        
                        break;
                        case "naranja":
                        //color_style = "#FFA500"
                        amperaje = '40';                        
                        break;
                        case "1008695":
                        //color_style = "#FF00FF"
                        amperaje = '60'//Rosa                        
                        break;
                        case "1010733":
                        //color_style = "#A9A9A9"
                        amperaje = '70'//Gris                        
                        break;
                        default:
                        amperaje = 'N/A'
                        break;
                        }
                        let unidad = amperaje === 'N/A'? 'N/A': amperaje+' Amps';
                        div.innerHTML = `Cavidad: ${cavidad}<br>Fusible: ${fusible_tooltip}<br>Amperaje: ${unidad}`;
                me.show(posAbs);                          // show tool-tip at this pos
            }
            else setDivPos(posAbs);
        }// otherwise, update position
    }
    // get mouse position relative to img_pdcr_1
    function getPos(e) {
        var r = img_pdcr_1.getBoundingClientRect();
        return {x: e.clientX - r.left, y: e.clientY - r.top}
    }
    // update and adjust div position if needed (anchor to a different corner etc.)
    function setDivPos(pos) {
        if (visible){
        if (pos.x < 0) pos.x = 0;
        if (pos.y < 0) pos.y = 0;
        // other bound checks here
        div.style.left = pos.x + "px";
        div.style.top = pos.y + "px";
        }
    }
    // we need to use shared event handlers:
    img_pdcr_1.addEventListener("mousemove", check);
    img_pdcr_1.addEventListener("click", check);
    $(document).on('wheel', function(){ 
        hide();
    });
    }
    //  PDC-RS ToolTip
function ToolTip_pdcr_small(img_pdcr_small, text, width) {
    var me = this,                                // self-reference for event handlers
    div = document.createElement("div"),      // the tool-tip div
    parent = img_pdcr_small.parentNode,               // parent node for img_pdcr_small
    visible = false;                          // current status
    // show the tool-tip
    this.show = function(pos) {
        if (!visible) {                             // ignore if already shown (or reset time)
            visible = true;                           // lock so it's only shown once
            setDivPos(pos);                           // set position
            parent.appendChild(div);                // add to parent of img_pdcr_small
        }
    }
    // hide the tool-tip
    function hide() {
        visible = false;                            // hide it after timeout
        if (parent.contains(div)) {
            parent.removeChild(div);                    // remove from DOM
        }
    }
    
    let keys_cavidad = Object.keys(fuses_BB['PDC-RS']);
    // console.log("KEYS DE PDC-RS: ",keys_cavidad);
    let cavidad,amperaje;
    // check mouse position, add limits as wanted... just for example:
    function check(e) {
        if(parent.contains(div)){
            hide();
        }
        var pos = getPos(e),
            posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
        for(i=0;i<keys_cavidad.length;i++){
            if (!visible && pos.x>=fuses_BB['PDC-RS'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['PDC-RS'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['PDC-RS'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['PDC-RS'][keys_cavidad[i]][1][1]) {
                cavidad = keys_cavidad[i];
                // set some initial styles, can be replaced by class-name etc.
                div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
                if (fuses_value['PDC-RS'][cavidad] == "vacio" || fuses_value['PDC-RS'][cavidad] == undefined || fuses_value["PDC-RS"][cavidad] == "") {
                    fusible_tooltip = "Vacío";
                }else{
                    fusible_tooltip = fuses_value['PDC-RS'][cavidad];
                }
                switch (fusible_tooltip){
                    case "cafe":
                        //color_style = "#8B4513"
                        amperaje = '7.5';                        
                        break;
                        case 'rojo':
                        //color_style = "#FF0000"
                        if (cavidad === 'F464'|| cavidad === 'F463'|| cavidad === 'F462'||cavidad === 'F449' || cavidad === 'F448' || cavidad === 'F447' || cavidad === 'F420'|| cavidad === 'F419' || cavidad === 'F418') {
                            amperaje = '50';
                        }else{
                            amperaje = '10';
                        }                        
                        break;
                        case "verde":
                        //color_style = "#008000" 
                        amperaje = '30';                            
                        break;
                        case "azul":
                        //color_style = "#0000FF"
                        amperaje = '15';                        
                        break;
                        case "beige":
                        //color_style = "#FFD700"
                        amperaje ='5';                        
                        break;
                        case "natural":
                        //color_style = "#FFFFFF"
                        amperaje = '25'                        
                        break;
                        case "amarillo":
                        //color_style = "#FFFF00"
                        amperaje = '20';                        
                        break;
                        case "naranja":
                        //color_style = "#FFA500"
                        amperaje = '40';                        
                        break;
                        case "1008695":
                        //color_style = "#FF00FF"
                        amperaje = '60'//Rosa                        
                        break;
                        case "1010733":
                        //color_style = "#A9A9A9"
                        amperaje = '70'//Gris                        
                        break;
                        default:
                        amperaje = 'N/A'
                        break;
                        }
                       let unidad = amperaje === 'N/A'? 'N/A': amperaje+' Amps';
                        div.innerHTML = `Cavidad: ${cavidad}<br>Fusible: ${fusible_tooltip}<br>Amperaje: ${unidad}`;
                me.show(posAbs);                          // show tool-tip at this pos
            }
            else setDivPos(posAbs);
        }// otherwise, update position
    }
    // get mouse position relative to img_pdcr_small
    function getPos(e) {
        var r = img_pdcr_small.getBoundingClientRect();
        return {x: e.clientX - r.left, y: e.clientY - r.top}
    }
    // update and adjust div position if needed (anchor to a different corner etc.)
    function setDivPos(pos) {
        if (visible){
        if (pos.x < 0) pos.x = 0;
        if (pos.y < 0) pos.y = 0;
        // other bound checks here
        div.style.left = pos.x + "px";
        div.style.top = pos.y + "px";
        }
    }
    // we need to use shared event handlers:
    img_pdcr_small.addEventListener("mousemove", check);
    img_pdcr_small.addEventListener("click", check);
    $(document).on('wheel', function(){ 
        hide();
    });
    }

    //  F96 ToolTip
function ToolTip_f96(img_f96, text, width) {
    var me = this,                                // self-reference for event handlers
    div = document.createElement("div"),      // the tool-tip div
    parent = img_f96.parentNode,               // parent node for img_f96
    visible = false;                          // current status
    // show the tool-tip
    this.show = function(pos) {
        if (!visible) {                             // ignore if already shown (or reset time)
            visible = true;                           // lock so it's only shown once
            setDivPos(pos);                           // set position
            parent.appendChild(div);                // add to parent of img_f96
        }
    }
    // hide the tool-tip
    function hide() {
        visible = false;                            // hide it after timeout
        if (parent.contains(div)) {
            parent.removeChild(div);                    // remove from DOM
        }
    }
    
    let keys_cavidad = Object.keys(fuses_BB['F96']);
    // console.log("KEYS DE F96: ",keys_cavidad);
    let cavidad,amperaje;
    // check mouse position, add limits as wanted... just for example:
    function check(e) {
        if(parent.contains(div)){
            hide();
        }
        var pos = getPos(e),
            posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
        for(i=0;i<keys_cavidad.length;i++){
            if (!visible && pos.x>=fuses_BB['F96'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['F96'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['F96'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['F96'][keys_cavidad[i]][1][1]) {
                cavidad = keys_cavidad[i];
                // set some initial styles, can be replaced by class-name etc.
                div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
                //console.log(fuses_value['PDC-RMID']['F96'])
                if (fuses_value['PDC-RMID']['F96'] == "vacio" || fuses_value['PDC-RMID']['F96'] == undefined || fuses_value["PDC-RMID"]["F96"] == "") {
                    fusible_tooltip = "Vacío";
                }else{
                    fusible_tooltip = fuses_value['PDC-RMID']['F96'];
                }
                switch (fusible_tooltip){
                    case "cafe":
                    //color_style = "#8B4513"
                    amperaje = '7.5';                        
                    break;
                    case 'rojo':
                    //color_style = "#FF0000"
                    amperaje = '10';
                    break;
                    case "verde":
                    //color_style = "#008000" 
                    amperaje = '30';                            
                    break;
                    case "azul":
                    //color_style = "#0000FF"
                    amperaje = '15';                        
                    break;
                    case "beige":
                    //color_style = "#FFD700"
                    amperaje ='5';                        
                    break;
                    default:
                    amperaje = 'N/A'
                    break;
                    }
                   let unidad = amperaje === 'N/A'? 'N/A': amperaje+' Amps';
                    div.innerHTML = `Cavidad: ${cavidad}<br>Fusible: ${fusible_tooltip}<br>Amperaje: ${unidad}`;
                me.show(posAbs);                          // show tool-tip at this pos
            }
            else setDivPos(posAbs);
        }// otherwise, update position
    }
    // get mouse position relative to img_f96
    function getPos(e) {
        var r = img_f96.getBoundingClientRect();
        return {x: e.clientX - r.left, y: e.clientY - r.top}
    }
    // update and adjust div position if needed (anchor to a different corner etc.)
    function setDivPos(pos) {
        if (visible){
        if (pos.x < 0) pos.x = 0;
        if (pos.y < 0) pos.y = 0;
        // other bound checks here
        div.style.left = pos.x + "px";
        div.style.top = pos.y + "px";
        }
    }
    // we need to use shared event handlers:
    img_f96.addEventListener("mousemove", check);
    img_f96.addEventListener("click", check);
    $(document).on('wheel', function(){ 
        hide();
    });
    }

//  PDCS ToolTip
function ToolTip_pdcs(img_pdcs, text, width) {
    var me = this,                                // self-reference for event handlers
    div = document.createElement("div"),      // the tool-tip div
    parent = img_pdcs.parentNode,               // parent node for img_pdcs
    visible = false;                          // current status
    // show the tool-tip
    this.show = function(pos) {
        if (!visible) {                             // ignore if already shown (or reset time)
            visible = true;                           // lock so it's only shown once
            setDivPos(pos);                           // set position
            parent.appendChild(div);                // add to parent of img_pdcs
        }
    }
    // hide the tool-tip
    function hide() {
        visible = false;                            // hide it after timeout
        if (parent.contains(div)) {
            parent.removeChild(div);                    // remove from DOM
        }
    }
    
    let keys_cavidad = Object.keys(fuses_BB['PDC-S']);
    // console.log("KEYS DE PDCS: ",keys_cavidad);
    let cavidad,amperaje;
    // check mouse position, add limits as wanted... just for example:
    function check(e) {
        if(parent.contains(div)){
            hide();
        }
        var pos = getPos(e),
            posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
        for(i=1;i<keys_cavidad.length+1;i++){
            let fusible_tooltip;
            if (!visible && pos.x>=fuses_BB['PDC-S'][i][0][0] && pos.x<=fuses_BB['PDC-S'][i][1][0] && pos.y>=fuses_BB['PDC-S'][i][0][1] && pos.y<=fuses_BB['PDC-S'][i][1][1]) {
                cavidad = keys_cavidad[i-1];
                // set some initial styles, can be replaced by class-name etc.
                div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
                if (fuses_value['PDC-S'][cavidad] == "vacio") {
                    fusible_tooltip = "Vacío";
                }else{
                    fusible_tooltip = fuses_value['PDC-S'][cavidad];
                }
                switch (fusible_tooltip){
                    case "cafe":
                    //color_style = "#8B4513"
                    amperaje = '7.5';                        
                    break;
                    case 'rojo':
                    //color_style = "#FF0000"
                    amperaje = '10';
                    break;
                    case "verde":
                    //color_style = "#008000" 
                    amperaje = '30';                            
                    break;
                    case "azul":
                    //color_style = "#0000FF"
                    amperaje = '15';                        
                    break;
                    case "beige":
                    //color_style = "#FFD700"
                    amperaje ='5';                        
                    break;
                    default:
                    amperaje = 'N/A'
                    break;
                    }
                   let unidad = amperaje === 'N/A'? 'N/A': amperaje+' Amps';
                    div.innerHTML = `Cavidad: ${cavidad}<br>Fusible: ${fusible_tooltip}<br>Amperaje: ${unidad}`;
                me.show(posAbs);                          // show tool-tip at this pos
            }
            else setDivPos(posAbs);
        }// otherwise, update position
    }
    // get mouse position relative to img_pdcs
    function getPos(e) {
        var r = img_pdcs.getBoundingClientRect();
        return {x: e.clientX - r.left, y: e.clientY - r.top}
    }
    // update and adjust div position if needed (anchor to a different corner etc.)
    function setDivPos(pos) {
        if (visible){
        if (pos.x < 0) pos.x = 0;
        if (pos.y < 0) pos.y = 0;
        // other bound checks here
        div.style.left = pos.x + "px";
        div.style.top = pos.y + "px";
        }
    }
    // we need to use shared event handlers:
    img_pdcs.addEventListener("mousemove", check);
    img_pdcs.addEventListener("click", check);
    $(document).on('wheel', function(){ 
        hide();
    });
    }
//  TBLU ToolTip
var t1 = new ToolTip_tblu(img_tblu, "This is a tool-tip", 150);
function ToolTip_tblu(img_tblu, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_tblu.parentNode,               // parent node for img_tblu
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_tblu
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_cavidad = Object.keys(fuses_BB['TBLU']);
// console.log("KEYS DE PDCS: ",keys_cavidad);
let cavidad,amperaje;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=1;i<keys_cavidad.length+1;i++){
        if (!visible && pos.x>=fuses_BB['TBLU'][i][0][0] && pos.x<=fuses_BB['TBLU'][i][1][0] && pos.y>=fuses_BB['TBLU'][i][0][1] && pos.y<=fuses_BB['TBLU'][i][1][1]) {
            cavidad = keys_cavidad[i-1];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (fuses_value['TBLU'][cavidad] == "vacio") {
                fusible_tooltip = "Vacío";
            }else{
                fusible_tooltip = fuses_value['TBLU'][cavidad];
            }
            switch (fusible_tooltip){
                case "cafe":
                    //color_style = "#8B4513"
                    amperaje = '7.5';                        
                    break;
                    case 'rojo':
                    //color_style = "#FF0000"
                    amperaje = '10';
                    break;
                    case "verde":
                    //color_style = "#008000" 
                    amperaje = '30';                            
                    break;
                    case "azul":
                    //color_style = "#0000FF"
                    amperaje = '15';                        
                    break;
                    case "beige":
                    //color_style = "#FFD700"
                    amperaje ='5';                        
                    break;
                    case "natural":
                    //color_style = "#FFFFFF"
                    amperaje = '25'                        
                    break;
                    case "amarillo":
                    //color_style = "#FFFF00"
                    amperaje = '20';                        
                    break;
                    default:
                    amperaje = 'N/A'
                    break;
                    }
                    

           let unidad = amperaje === 'N/A'? 'N/A': amperaje+' Amps';
                    div.innerHTML = `Cavidad: ${cavidad}<br>Fusible: ${fusible_tooltip}<br>Amperaje: ${unidad}`;
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_tblu
function getPos(e) {
    var r = img_tblu.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_tblu.addEventListener("mousemove", check);
img_tblu.addEventListener("click", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//  PDC-D ToolTip
var t1 = new ToolTip_pdcd(img_pdcd, "This is a tool-tip", 150);
function ToolTip_pdcd(img_pdcd, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_pdcd.parentNode,               // parent node for img_pdcd
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_pdcd
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_cavidad = Object.keys(fuses_BB['PDC-D']);
// console.log("KEYS DE PDC-D: ",keys_cavidad);
let cavidad,amperaje;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_cavidad.length;i++){
        let fusible_tooltip;
        if (!visible && pos.x>=fuses_BB['PDC-D'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['PDC-D'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['PDC-D'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['PDC-D'][keys_cavidad[i]][1][1]) {
            cavidad = keys_cavidad[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (fuses_value['PDC-D'][cavidad] == "vacio") {
                fusible_tooltip = "Vacío";
            }else{
                fusible_tooltip = fuses_value['PDC-D'][cavidad];
            }
            switch (fusible_tooltip){
                case "cafe":
                    //color_style = "#8B4513"
                    amperaje = '7.5';                        
                    break;
                    case 'rojo':
                    //color_style = "#FF0000"
                    amperaje = '10';
                    break;
                    case "verde":
                    //color_style = "#008000" 
                    amperaje = '30';                            
                    break;
                    case "azul":
                    //color_style = "#0000FF"
                    amperaje = '15';                        
                    break;
                    case "beige":
                    //color_style = "#FFD700"
                    amperaje ='5';                        
                    break;
                    case "natural":
                    //color_style = "#FFFFFF"
                    amperaje = '25'                        
                    break;
                    case "amarillo":
                    //color_style = "#FFFF00"
                    amperaje = '20';                        
                    break;
                    default:
                    amperaje = 'N/A'
                    break;
                    }

           let unidad = amperaje === 'N/A'? 'N/A': amperaje+' Amps';
                    div.innerHTML = `Cavidad: ${cavidad}<br>Fusible: ${fusible_tooltip}<br>Amperaje: ${unidad}`;
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_pdcd
function getPos(e) {
    var r = img_pdcd.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_pdcd.addEventListener("mousemove", check);
img_pdcd.addEventListener("click", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//  PDC-P ToolTip
var t1 = new ToolTip_pdcp(img_pdcp, "This is a tool-tip", 150);
function ToolTip_pdcp(img_pdcp, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_pdcp.parentNode,               // parent node for img_pdcp
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_pdcp
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_cavidad = Object.keys(fuses_BB['PDC-P']);
// console.log("KEYS DE PDC-P: ",keys_cavidad);
let cavidad,amperaje;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_cavidad.length;i++){
        if (!visible && pos.x>=fuses_BB['PDC-P'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['PDC-P'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['PDC-P'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['PDC-P'][keys_cavidad[i]][1][1]) {
            cavidad = keys_cavidad[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (fuses_value['PDC-P'][cavidad] == "vacio") {
                fusible_tooltip = "Vacío";
            }else{
                fusible_tooltip = fuses_value['PDC-P'][cavidad];
            }
            switch (fusible_tooltip){
                case "cafe":
                    //color_style = "#8B4513"
                    amperaje = '7.5';                        
                    break;
                    case 'rojo':
                    //color_style = "#FF0000"
                    amperaje = '10';
                    break;
                    case "verde":
                    //color_style = "#008000" 
                    amperaje = '30';                            
                    break;
                    case "azul":
                    //color_style = "#0000FF"
                    amperaje = '15';                        
                    break;
                    case "beige":
                    //color_style = "#FFD700"
                    amperaje ='5';                        
                    break;
                    case "natural":
                    //color_style = "#FFFFFF"
                    amperaje = '25'                        
                    break;
                    case "amarillo":
                    //color_style = "#FFFF00"
                    amperaje = '20';                        
                    break;
                    default:
                    amperaje = 'N/A'
                    break;
                    }

           let unidad = amperaje === 'N/A'? 'N/A': amperaje+' Amps';
            div.innerHTML = `Cavidad: ${cavidad}<br>Fusible: ${fusible_tooltip}<br>Amperaje: ${unidad}`;
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_pdcp
function getPos(e) {
    var r = img_pdcp.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_pdcp.addEventListener("mousemove", check);
img_pdcp.addEventListener("click", check);
$(document).on('wheel', function(){ 
    hide();
});
}



function build_dic(){
    if(pdcr_caja==""){
        document.getElementById("informacion").innerHTML = "No ha seleccionado ninguna de las opciones para la caja <span class='badge progress-bar-danger'>PDC-R</span>.";
        $('#mostrar').click();
    }else{
        if(historial==""){
            add_module_vision()
        }
        else{
            document.getElementById("informacion").innerHTML = "El nombre del Módulo que intenta agregar <span class='badge progress-bar-danger'>ya existe</span>.";
            $('#mostrar').click();
        }
    }
}

function add_module_vision(){
    // console.log("VALOR FINAL: ",fuses_value);
    modulo_db=document.getElementById('modulo_vision').value
    // console.log(pdcr_caja_to_db)
    if (modulo_db.length == 0) {
        document.getElementById("informacion").innerHTML = "Es necesario agregar un <span class='badge progress-bar-danger'>nombre</span> al módulo. Intente de nuevo.";
        $('#mostrar').click();
    }else{
        const newPost = {
            "DBEVENT": DBEVENT,
            "MODULO": modulo_db,
            "CAJA_1": {},
            "CAJA_2": {"PDC-S": fuses_value['PDC-S']},
            "CAJA_3": {"TBLU": fuses_value['TBLU']},
            "CAJA_4": {"PDC-D": fuses_value['PDC-D']},
            "CAJA_5": {"PDC-P": fuses_value['PDC-P']},
            "CAJA_6": {},
            "CAJA_7": {},
            "CAJA_8": {}
        }

        if (pdcr_caja_to_db == "PDC-R") {
            newPost["CAJA_1"]["PDC-R"] = fuses_value['PDC-R']
        }
        else if(pdcr_caja_to_db == "PDC-RMID"){
            newPost["CAJA_1"]["PDC-RMID"] = fuses_value['PDC-RMID']
        }
        else if(pdcr_caja_to_db == "PDC-RS"){
            newPost["CAJA_1"]["PDC-RS"] = fuses_value['PDC-RS']
        }
        // console.log("ESTE ES EL NEWPOST",newPost);

        fetch(dominio+'/api/post/modulos_fusibles',{
            method: 'POST',
            body: JSON.stringify(newPost),
            headers:{
                "Content-type": "application/json"
            }
        }).then(res=>res.json())
        .then(function (data){
            console.log(data);
        })
        .catch(function(err) {
        });
        fetch(dominio+'/api/post/modulos_alturas',{
            method: 'POST',
            body: JSON.stringify(newPost),
            headers:{
                "Content-type": "application/json"
            }
        }).then(res=>res.json())
        .then(function (data){
            console.log(data);
            location.replace("modulos.html")
        })
        .catch(function(err) {
            console.log(err);
        });
    }
}

function get_valid_pedido(){
    historial="";
    // console.log(document.getElementById("modulo_vision").value)
    if(document.getElementById("modulo_vision").value!=""){
        // get the id
        endpoint=dominio+'/database/'+DBEVENT+'/modulos_fusibles/modulo/=/'+document.getElementById("modulo_vision").value+'/_/_/_'
        // console.log(endpoint)
        fetch(endpoint,{
            method: 'GET',
            headers:{
                "Content-type": "application/json"
            }
        }).then(res=>res.json())
        .then(function (data){
            // console.log(data);
            historial="si existe"
            alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "'+document.getElementById("modulo_vision").value+'" ya existe</div>'
            // console.log(historial)
        })
        .catch(function(err) {

            //console.log(err);
        });
        alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+document.getElementById("modulo_vision").value+'" no existe</div>'
        // console.log(historial)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[type=text]').forEach( node => node.addEventListener('keypress', e => {
        if(e.keyCode == 13) {
            e.preventDefault();
        }
    }))
});

$('#modal_info').find(".modal-header").css("background", "#f44336");