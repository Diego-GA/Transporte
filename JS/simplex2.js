const buscaHolguras= ( matrizPrincipal, basePrimera ) => {

    

}

const baseInicial = (origenesDatos, destinosDatos, ofertasDatos, demandasDatos, matrizPrincipal, baseAs) => {
    let arregloOrdenado = [];
    let ofertasDatosAux = [...ofertasDatos];
    let demandasDatosAux = [...demandasDatos];
    let matrizPrincipalAux = [];
    let base = [];
    let baseAsignaciones = [];

    for(let i = 0; i< ofertasDatosAux.length; i++){
        let filas = [];
        for(let j = 0; j< demandasDatosAux.length; j++){
            filas.push(matrizPrincipal[i][j]);
        }
        matrizPrincipalAux.push(filas);
        
    }

    //Estos arrglos son los que se consideraran para ver donde se hacen las asignaciones de las variables basicas y permite que existan variables que juegan con una
    //asignacion de 0
    let demandasAsignacion = [];
    let ofertasAsignacion = [];

    for(let i=0; i < demandasDatosAux.length; i++){
        demandasAsignacion[i] = 1;
    }
    for(let i=0; i < ofertasDatosAux.length; i++){
        ofertasAsignacion[i] = 1;
    }

    console.log( "asignacions: " + ofertasAsignacion + "  " + demandasAsignacion);
    //Guardando la matriz en un arreglo unidimensional
    for(let i = 0 ; i < origenesDatos.length; i++){
        for(let j = 0; j < destinosDatos.length; j++){
            arregloOrdenado.push( matrizPrincipal[i][j] );
        }
    }
    arregloOrdenado.sort(function(a,b){return a-b});
    console.log("arreglo ordenado" + arregloOrdenado);

    //Creando dos matrices una correspondiente a las asignaciones y otra con unos y ceros, uno si es varibale basica cero si no es varuable basica
    for(let i = 0 ; i < ofertasDatosAux.length; i++){
        let filas = [];
        let filas2 = []
        for(let j = 0; j < demandasDatosAux.length; j++){
            filas.push(0);
            filas2.push(0);
        }
        console.log("filas: " + filas);
        base.push(filas);
        baseAsignaciones.push(filas2);
    }

    let asignaciones = 0;
    for(let k = 0; k < arregloOrdenado.length ; k++){
        let bandera = true;
        // console.log(k + " " + matrizPrincipalAux);
        for(let i = 0; i < ofertasDatos.length; i++){
            for(let j = 0; j < demandasDatos.length; j++){

                if( arregloOrdenado[k] == matrizPrincipalAux[i][j] && bandera && asignaciones != (ofertasDatosAux.length + demandasDatosAux.length - 1) ){
                    if( ofertasAsignacion[i] == 1 && demandasAsignacion[j] == 1 ){

                            if( ofertasDatosAux[i] > demandasDatosAux[j]){
                                base[i][j] = demandasDatosAux[j];
                                ofertasDatosAux[i] -= demandasDatosAux[j]
                                demandasDatosAux[j] = 0;
                                demandasAsignacion[j] = 0;
                            }else if (demandasDatosAux[j] > ofertasDatosAux[i] ){
                                base[i][j] = ofertasDatosAux[i];
                                demandasDatosAux[j] -= ofertasDatosAux[i];
                                ofertasDatosAux[i] = 0;
                                ofertasAsignacion[i] = 0;
                            }else{
                                base[i][j] = demandasDatosAux[j];
                                ofertasDatosAux[i] = 0;
                                demandasDatosAux[j] = 0;
                                ofertasAsignacion[i] == 1 ? ofertasAsignacion[i] = 0 : demandasAsignacion[j] = 0;
                            }
                            matrizPrincipalAux[i][j] = -1;
                            baseAsignaciones[i][j] = 1;
                            bandera = false;
                            asignaciones++;
                            console.log(`se asigno en fila ${i} columna ${j}`)
                    }
                }
            }
        }
    }

    // console.log("BASE de asignacion  " + base);
    // console.log(baseAsignaciones);
    // console.log(demandasAsignacion);
    // console.log(ofertasAsignacion);
    // console.log("sobrantes")
    // console.log(ofertasDatosAux);
    // console.log(demandasDatosAux);
    for(let i = 0; i< ofertasDatosAux.length; i++){
        let filas = [];
        for(let j = 0; j< demandasDatosAux.length; j++){
            filas.push(baseAsignaciones[i][j]);
        }
        baseAs.push(filas);
        
    }
    return base;
}

const algoritmoTransporte = ( origenesDatos, destinosDatos, ofertasDatos, demandasDatos, matrizPrincipal ) => {

    let basePrimera = [];
    let baseAs = [];
    let baseNueva = [];
    let holguras = []
    

    for(let i = 0 ; i < ofertasDatos.length; i++){
        let filas = [];
        for(let j = 0; j < demandasDatos.length; j++){
            filas.push(0);
        }
        holguras.push(filas);
    }

    basePrimera = baseInicial( origenesDatos, destinosDatos, ofertasDatos, demandasDatos, matrizPrincipal, baseAs);

    console.log(basePrimera);
    console.log(baseAs);

    let vectorUs = []
    let vecotrVs = []

    for(let i=0; i < demandasDatos.length; i++){
        vecotrVs.push(9999);
    }
    for(let i=0; i < ofertasDatos.length; i++){
        i == 0 ? vectorUs.push(0): vectorUs.push(9999);
    }

    

    for(let i = 0; i < ofertasDatos.length; i++){
        for(let j = 0; j < demandasDatos.length; j++){

            if( vectorUs[i] != 9999 && vecotrVs[j] == 9999 && baseAs[i][j] == 1){
                // si hay una asignacion en U y no hay en V entonces encuentrame V

                vecotrVs[j] = matrizPrincipal[i][j] - vectorUs[i];
                // console.log(i + "   " + vecotrVs);
                j= -1;
            }else if( vectorUs[i] == 9999 && vecotrVs[j] != 9999 && baseAs[i][j] == 1){
                vectorUs[i] = matrizPrincipal[i][j] - vecotrVs[j]
                // console.log(j + "   " + vectorUs);
                j=-1;
            }
        }
    }

    for(let i = 0; i< ofertasDatos.length; i++){
        for(let j = 0; j < demandasDatos.length; j++)
        
        if(baseAs[i][j] == 1){
            holguras[i][j] = "VB"
        }else{
            holguras[i][j] = vectorUs[i] + vecotrVs[j] - matrizPrincipal[i][j];
        }

    }
    

    console.log(vectorUs);
    console.log(vecotrVs);
    console.log("HOLGURAS");
    console.log(holguras);


    let optimo = 0;
    for(let i = 0; i<origenesDatos.length; i++){
        for(let j = 0; j < destinosDatos.length; j++){
            optimo += basePrimera[i][j] * matrizPrincipal[i][j]; 
            console.log(optimo);
        }   
    }

    let valor = document.createElement("h2");
    valor.innerHTML ="VALOR OPTIMO (APROX) = " + optimo;
    div = document.getElementById("balanceado");
    div.appendChild(valor);
}

const creaTablaBalanceada = ( origenesDatos, destinosDatos, ofertasDatos, demandasDatos, matrizPrincipal  ) =>{

    let divPrincipal = document.createElement("div");
    divPrincipal.setAttribute("class", "balanceado");
    divPrincipal.setAttribute("class", "contenedor balanceado");
    divPrincipal.setAttribute("id", "balanceado");



    let table = document.createElement("table");
    table.setAttribute("class", "table-balanceado");
    divPrincipal.appendChild(table);
    let caption = document.createElement("caption");
    caption.innerHTML = "Problema Balanceado";
    caption.setAttribute("class", "table-balanceado__titulo");
    table.appendChild(caption);


    for(let i = 0; i < origenesDatos.length + 2; i++ ){
        let filaTable = document.createElement("tr");
        filaTable.setAttribute("class", `fila${i}`);
        table.appendChild(filaTable);
        for(let j = 0; j < destinosDatos.length + 2; j++ ){

            if( i == 0){
                let columnaTable = document.createElement("th");

                if( j > 0 && j < destinosDatos.length + 1 ){
                    columnaTable.setAttribute("class", `destino${j}`)
                    columnaTable.innerHTML = destinosDatos[j-1];
                }else if( j == destinosDatos.length + 1){
                    columnaTable.setAttribute("class", `oferta`);
                    columnaTable.innerHTML = "Oferta";
                }else{
                    columnaTable.innerHTML = "---"
                }
                filaTable.appendChild(columnaTable);
            }else if(j==0){
                let columnaTable = document.createElement("th");

                if( i > 0 && i < origenesDatos.length + 1 ){
                    columnaTable.setAttribute("class", `destino${i}`)
                    columnaTable.innerHTML = origenesDatos[i-1];
                }else if( i == origenesDatos.length + 1){
                    columnaTable.setAttribute("class", `demanda`);
                    columnaTable.innerHTML = "Demanda";
                }
                filaTable.appendChild(columnaTable);
            }else if( i ==origenesDatos.length + 1  && j == destinosDatos.length + 1){
                let columnaTable = document.createElement("td");
                let total = 0;

                ofertasDatos.forEach( element => {
                    total = total + parseInt(element);
                })
                console.log("total: " + total);
                columnaTable.setAttribute("class", "total");
                columnaTable.innerHTML = total;

                filaTable.appendChild(columnaTable);
            }else{
                let columnaTable = document.createElement("td");

                if( j == destinosDatos.length + 1){
                    columnaTable.innerHTML = ofertasDatos[i-1];
                    columnaTable.setAttribute("class", `oferta${i-1}`);
                }else if ( i == origenesDatos.length + 1){
                    columnaTable.innerHTML = demandasDatos[j-1];
                    columnaTable.setAttribute("class", `oferta${j-1}`);
                }else{
                    columnaTable.innerHTML = matrizPrincipal[i-1][j-1];
                    columnaTable.setAttribute("class", `dato${i}${j}`);
                }
                filaTable.appendChild(columnaTable);
            }
        }

    }


    document.body.appendChild(divPrincipal);
}

const balancear = (origenesDatos, destinosDatos, ofertasDatos, demandasDatos, matrizPrincipal) => {

    let origenes = origenesDatos.length
    let destinos = destinosDatos.length;
    let totalOferta = 0, totalDemanda = 0;
    
    ofertasDatos.forEach(element => {
        totalOferta += parseInt(element);
    });

    demandasDatos.forEach(element => {
        totalDemanda += parseInt(element);
    });

    
    if( totalOferta !== totalDemanda){
        if( totalDemanda > totalOferta){
            let nuevaFila = [];
            let diferencia = totalDemanda - totalOferta;
            for( let i = 0; i < destinos; i++){
                nuevaFila.push(0);
            }
            matrizPrincipal.push(nuevaFila);
            ofertasDatos.push(diferencia);
            origenesDatos.push("Artificial");
            // console.log("oferta"); console.log(ofertasDatos);
            // console.log("Matriz principal"); console.log(matrizPrincipal);
        }else{
            let diferencia = totalOferta - totalDemanda;

            for(let i=0; i < origenes; i++){
                matrizPrincipal[i].push(0);
            }
            demandasDatos.push(diferencia);
            destinosDatos.push("Artificial");
            // console.log("demanda"); console.log(demandasDatos);
            // console.log("matriz Principal"); console.log(matrizPrincipal);
        }
        //Creando un  div para informar al usuario que su problema no estaba balanceado
        const nota = document.createElement("div");
        const h2Nota = document.createElement("h2");

        nota.setAttribute("class", "contenedor");
        nota.setAttribute("class", "nota");
        nota.appendChild(h2Nota);
        h2Nota.setAttribute("class", "nota__titulo");
        h2Nota.innerHTML = "Tu problema no estaba balanaceado";
        document.body.appendChild(nota);
    }
    // console.log(origenesDatos);
    // console.log(destinosDatos);
    creaTablaBalanceada( origenesDatos, destinosDatos, ofertasDatos, demandasDatos, matrizPrincipal  );
    algoritmoTransporte( origenesDatos, destinosDatos, ofertasDatos, demandasDatos, matrizPrincipal );
}

const leerOrigenes = ( origenes, origenesDatos ) => {
    for(let i = 0; i < origenes; i++){
        let dato = document.getElementById(`origen${i}`).value;
        // console.log(dato);
        origenesDatos.push(dato);
    }
}

const leerDestinos = ( destinos, destinosDatos) => {
    for(let i = 0; i < destinos; i++){
        let dato = document.getElementById(`destino${i}`).value;
        // console.log(dato);
        destinosDatos.push(dato);
    }
}

const leerOfertas = ( origenes, ofertasDatos ) => {
    for(let i = 0; i < origenes; i++){
        let dato = document.getElementById(`oferta${i}`).value;
        // console.log(dato);
        ofertasDatos.push(parseInt( dato) );
    }
}

const leerDemandas = ( destinos, demandasDatos) => {
    for(let i = 0; i < destinos; i++){
        let dato = document.getElementById(`demanda${i}`).value;
        // console.log(dato);
        demandasDatos.push(parseInt( dato ));
    }
}

const leerDatos = ( origenes, destinos, matrizPrincipal ) => {
    for(let i = 0; i < origenes; i++){
        let fila = []; //fila que se agregara a la matriz principal
        for(let j = 0; j< destinos; j++){
            let dato = document.getElementById(`tabla${i}${j}`).value;
            // console.log(dato);
            dato == 'M' ? dato = 999 : dato = dato;
            fila.push(parseInt( dato ));
        }
        matrizPrincipal.push(fila);
    }
}

const solver = () => {
    let origenes = document.getElementById("origenes").value;
    let destinos = document.getElementById("destinos").value;
    const matrizPrincipal = [];
    let origenesDatos = [] , destinosDatos = [];
    let ofertasDatos = [] , demandasDatos = [];
    const form2 = document.getElementById("tabla__datos");
    form2.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log(event);
    })

    leerDatos( origenes, destinos, matrizPrincipal );
    leerOrigenes( origenes, origenesDatos);
    leerDestinos( destinos, destinosDatos);
    leerOfertas( origenes, ofertasDatos );
    leerDemandas( destinos, demandasDatos );

    // console.log("MATRIZ PRINCIPAL:")
    // console.log(matrizPrincipal);

    // console.log("Nombre ORIGENES:")
    // console.log(origenesDatos);

    // console.log("Nombre DESTINOS:")
    // console.log(destinosDatos);

    // console.log("OFERTA")
    // console.log(ofertasDatos);

    // console.log("DEMANDA");
    // console.log(demandasDatos);

    balancear(origenesDatos, destinosDatos, ofertasDatos, demandasDatos, matrizPrincipal);
}


// Creando la tabla donde se ingresaran los datos
const generarTabla = ( origenes, destinos ) =>{
    let grid__tabla = document.getElementById("grid__tabla");
    let gridTC = `repeat( ${ parseInt(destinos)+2 } , 1fr )`; //Grid template Columns
    let gridTR = `repeat( ${ parseInt(origenes)+2 } , 5rem )`; //Grid template Rows

    // Modificando propiedades css desde js para crear el grid
    grid__tabla.style.gridTemplateRows = gridTR;
    grid__tabla.style.gridTemplateColumns = gridTC;

    //En los for se le esta sumando mas DOS porque un columna/renglon extra corresponde para el nombre de origenes y destinos, el otro renglo 
    //y columna extra es para la oferta y demanda
    for(let i = 0 ; i < parseInt(origenes) + 2 ; i++){ 
        for(let j = 0; j < parseInt(destinos) + 2 ; j++){
            let div = document.createElement("div");
                div.classList.add("grid__div");
                grid__tabla.appendChild(div);

            if( (i !== 0 || j !== 0 ) && (( i !== (parseInt(origenes) + 1) ) || ( j !==(parseInt(destinos) + 1) )) ){
                let input = document.createElement("input");
                input.classList.add("grid__input");

                if( i == 0){
                    (j == (parseInt(destinos) + 1)) ? 
                    input.setAttribute("placeholder", `Oferta`) : input.setAttribute("placeholder", `Destino ${parseInt(j)}`);
                    
                    (j == (parseInt(destinos) + 1)) ? 
                    console.log() : input.setAttribute("id", `destino${parseInt(j-1)}`);

                }else if( j == 0){
                    (i == (parseInt(origenes) + 1)) ? 
                    input.setAttribute("placeholder", `Demanda`) : input.setAttribute("placeholder", `Origen ${parseInt(i)}`);

                    (i == (parseInt(origenes) + 1)) ? 
                    console.log() : input.setAttribute("id", `origen${parseInt(i-1)}`);
                }else{
                    input.setAttribute("placeholder", `dato`)

                    if( ( i !== (parseInt(origenes) + 1) ) && ( j !==(parseInt(destinos) + 1) ) ){
                        input.setAttribute("id", `tabla${i-1}${j-1}`);
                    }else{
                        (j == (parseInt(destinos) + 1)) ?
                        input.setAttribute("id", `oferta${i-1}`) : input.setAttribute("id", `demanda${j-1}`);
                    }
                }
                div.appendChild(input)
            }
        }
    }
}

// Guardando el numero de origenes y destinos para poder generar una tabla
const generarModelo = () => {
    let origenes = 0
    origenes = document.getElementById("origenes").value;
    let destinos = 0
    destinos = document.getElementById("destinos").value;
    let boton = document.getElementById("grid__button");

    // console.log( origenes );
    // console.log( destinos );

    generarTabla( origenes , destinos );
    boton.style.display= "flex"
}