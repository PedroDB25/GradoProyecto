let mapeoRutas = new Map();

async function solicitudesAApi(opcion, id = "") {

    if (mapeoRutas.size == 0) {
        mapeoRutas.set("menu", solicitarMenu());
        mapeoRutas.set("mx", solicitarMx(id));
        mapeoRutas.set("gr", solicitarGr(id));
    }
    return mapeoRutas.get(opcion)
}

function solicitarMenu() {
    return fetch("menu")
        // Exito
        .then(response => response.json())  // convertir a json
        .then(json => json)    //sacar json
        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores

}
function solicitarMx(id) {
    return fetch("mxs/" + id)
        // Exito
        .then(response => response.json())  // convertir a json
        .then(json => json)    //sacar json
        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores

}
function solicitarGr(gr) {
    if(gr == ""){gr = 0}
    return fetch("gr/" + gr)
        // Exito
        .then(response => response.json())  // convertir a json
        .then(json => json)    //sacar json
        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores

}