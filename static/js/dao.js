function solicitarMenu() {
    return fetch("menu")
        // Exito
        .then(response => response.json())  // convertir a json
        .then(json => json)    //sacar json
        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores

}
function solicitarHTML(id) {
    return fetch(`html?id=${id}`)
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
    return fetch("gr/" + gr)
        // Exito
        .then(response => response.json())  // convertir a json
        .then(json => json)    //sacar json
        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores

}
function solicitarGrRefl(gr) {
    return fetch("grrefle/" + gr)
        // Exito
        .then(response => response.json())  // convertir a json
        .then(json => json)    //sacar json
        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores

}