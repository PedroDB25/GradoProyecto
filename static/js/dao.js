async function solicitudesAApi(opcion) {

    let mapeoRutas = new Map();
    mapeoRutas.set("menu", solicitarMenu());

    return mapeoRutas.get(opcion)
}

function solicitarMenu() {
    return fetch("menu")
        // Exito
        .then(response => response.json())  // convertir a json
        .then(json => json)    //sacar json
        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores

}