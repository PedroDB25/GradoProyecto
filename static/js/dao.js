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
        .then(json => json)
        //sacar json
        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores

}
function solicitarMxtr(sigla) {
    return fetch("mxtr/" + sigla)
        // Exito
        .then(response => response.json())  // convertir a json
        .then(json => json)    //sacar json
        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores

}
function solicitarMxrefl(sigla) {
    return fetch("mxrefl/" + sigla)
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

} function solicitarimagenes() {
    return fetch("imgs/")
        // Exito
        .then(response => response.json())  // convertir a json
        .then(json => json)    //sacar json
        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores

}