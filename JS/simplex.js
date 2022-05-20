const buscaHolguras= ( matrizPrincipal, basePrimera ) => {

    

}

const baseInicial = (origenesDatos, destinosDatos, ofertasDatos, demandasDatos, matrizPrincipal) => {
    let arregloOrdenado = [];
    let ofertasDatosAux = [...ofertasDatos];
    let demandasDatosAux = [...demandasDatos];
    let base = [];

    console.log("Matriz Principal desde la funcion de baseinicial");
    console.log(matrizPrincipal);
    //Guardando la matriz en un arreglo unidimensional
    for(let i = 0 ; i < origenesDatos.length; i++){
        for(let j = 0; j < destinosDatos.length; j++){
            arregloOrdenado.push( matrizPrincipal[i][j] );
        }
    }
    //Generando un arreglo ordenado para poder hacer la asignacion de costo minimo
    console.log("arreglo NO ordenado");
    console.log(arregloOrdenado);
    arregloOrdenado.sort(function(a,b){return a-b});

    console.log("arreglo ordenado");
    console.log(arregloOrdenado);

    //Creando una matriz de puros ceros para luego en el siguiente do while meter solo los valores de la asignacion, es decir
    // la matriz tendra n + m + 1 datos diferentes de ceros 
    for(let i = 0 ; i < ofertasDatosAux.length; i++){
        let filas = []
        for(let j = 0; j < demandasDatosAux.length; j++){
            filas.push(0);
        }
        console.log("filas: " + filas);
        base.push(filas);
    }

    console.log("BASE CON CEROS");
    console.log(base);

    let numeroAsignaciones = 0;
    let indiceAO = 0; //Esta variable corresponde al indice del arreglo Ordenado

    do{
        
        // let mayor = 0; // Esta variable nos va permitir saber la asignaion mayor que podemos hacer en cada variable no basica
        let bandera = false;

        for(let i = 0; i < ofertasDatosAux.length; i++){
            for(let j = 0; j < demandasDatosAux.length; j++){
                
                if( (arregloOrdenado[indiceAO] == matrizPrincipal[i][j] ) && (bandera === false) ){

                    if( (ofertasDatosAux[i] > 0 && demandasDatosAux[j] > 0 ) ){
                        if( demandasDatosAux[j] > ofertasDatosAux[i] ){
                            base[i][j] = ofertasDatosAux[i]; 
                            demandasDatosAux[j] = demandasDatosAux[j] - ofertasDatosAux[i];
                            ofertasDatosAux[i] = ofertasDatosAux[i] - ofertasDatosAux[i];
                            // numeroAsignaciones++;
                            console.log("Demanda modiifcada (if) " + demandasDatosAux +  " " + ofertasDatosAux );
                            // bandera = true;
                        }else{
                            base[i][j] = demandasDatosAux[j]; 
                            ofertasDatosAux[i] = ofertasDatosAux[i] - demandasDatosAux[j];
                            demandasDatosAux[j] = demandasDatosAux[j] - demandasDatosAux[j];
                            console.log("Ofertas mayor else " + ofertasDatosAux + " " + demandasDatosAux );
                            // numeroAsignaciones++;
                        
                            // bandera = true;
                        }
                        // console.log( base[i][j] );
                    }
                    console.log(base[i][j]);
                    bandera = true;
                }
            }
        }

        // console.log("indice " + indiceAO);
        // console.log("numero de asignaciones" + numeroAsignaciones);
        indiceAO++;
    }while( indiceAO != arregloOrdenado.length  );

    console.log("BASE INICIAL");
    console.log(base);
    
    return base;
}

const algoritmoTransporte = ( origenesDatos, destinosDatos, ofertasDatos, demandasDatos, matrizPrincipal ) => {

    let basePrimera = [];
    let baseNueva = [];
    let holguras = []
    console.log("Matriz Principal desde la funcion de algoritmoTransporte");
    console.log(matrizPrincipal);

    basePrimera = baseInicial( origenesDatos, destinosDatos, ofertasDatos, demandasDatos, matrizPrincipal);

    console.log(basePrimera);

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
            console.log("oferta"); console.log(ofertasDatos);
            console.log("Matriz principal"); console.log(matrizPrincipal);
        }else{
            let diferencia = totalOferta - totalDemanda;

            for(let i=0; i < origenes; i++){
                matrizPrincipal[i].push(0);
            }
            demandasDatos.push(diferencia);
            destinosDatos.push("Artificial");
            console.log("demanda"); console.log(demandasDatos);
            console.log("matriz Principal"); console.log(matrizPrincipal);
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
    console.log(origenesDatos);
    console.log(destinosDatos);
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