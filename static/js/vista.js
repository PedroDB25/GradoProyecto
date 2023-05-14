window.onload = () => {
  inicio()
}

async function inicio() {
  let menuDescargado = await solicitarMenu()
  cargarMenu(menuDescargado.data)
}

function cargarMenu(menuDescargado) {
  for (const li of menuDescargado.menu) {
    //link para
    if (li.search("transmitida") >= 0) {
      document.querySelector(".navbar-nav").appendChild(crearDesplegable(li, menuDescargado.grupoSilicatos, 0))
      continue
    }
    if (li.search('reflejada') >= 0) {
      document.querySelector(".navbar-nav").appendChild(crearDesplegable(li, menuDescargado.reflejado, 1))
      continue
    }
    if (li.search('opticas') >= 0) {
      document.querySelector(".navbar-nav").appendChild(crearDesplegable(li, menuDescargado.opticas, 2))
      continue
    }
    if (li.search('mineralogicas') >= 0) {
      document.querySelector(".navbar-nav").appendChild(crearDesplegable(li, menuDescargado.mineralogicas, 3))
      continue
    }
    else {
      let aux = document.createElement("li")
      aux.className = "nav-item"


      let auxLink = document.createElement("a")
      auxLink.className = "nav-link"

      auxLink.href = "#" + li.replaceAll(" ", "_").replaceAll(".", "")
      auxLink.id = li.replaceAll(" ", "_").replaceAll(".", "")
      auxLink.addEventListener("click", mostrarInfo)
      auxLink.innerHTML = li
      aux.appendChild(auxLink)

      document.querySelector(".navbar-nav").appendChild(aux)
    }
  }
}

function crearDesplegable(li, opcion, indice) {
  contador = 0;
  //boton en barra
  let botonBarra = document.createElement("li")
  botonBarra.className = "nav-item dropdown"

  //link del boton
  let botonDesplegable = document.createElement("a")
  botonDesplegable.className = "nav-link dropdown-toggle"
  botonDesplegable.id = "navbarDropdownMenuLink"
  botonDesplegable.href = "#"
  botonDesplegable.role = "button"
  botonDesplegable.setAttribute("data-bs-toggle", "dropdown")
  botonDesplegable.setAttribute("aria-expanded", "false")
  botonDesplegable.innerHTML = li

  botonBarra.appendChild(botonDesplegable)

  //Lista desplegable
  listaDesplegable = document.createElement("ul")
  listaDesplegable.className = "dropdown-menu"
  listaDesplegable.setAttribute("aria-labelledby", "navbarDropdownMenuLink")

  for (const lis of opcion) {
    let auxliInterno = document.createElement("li")
    let auxAInterno = document.createElement("a")
    auxAInterno.className = "dropdown-item"
    auxAInterno.href = "#" + lis.replaceAll(" ", "_").replaceAll(".", "")
    auxAInterno.id = contador++
    auxAInterno.innerHTML = lis

    if (indice == 0) {
      auxAInterno.addEventListener("click", mostrarGrupoTransmitida)
    }
    if (indice == 1) {
      auxAInterno.addEventListener("click", mostrarGrupoReflejada)
    }

    auxliInterno.appendChild(auxAInterno)
    listaDesplegable.appendChild(auxliInterno)

  }

  botonBarra.appendChild(listaDesplegable)

  return botonBarra
}
async function mostrarGrupoReflejada() {
  let salida = await solicitarGrRefl(this.id)

  document.querySelector(".body").innerHTML = "";
  for (const mx of salida.data) {
    if (mx.grupo != `${this.id}`) continue

    let LinkParaPedirDatos = document.createElement("a")
    LinkParaPedirDatos.href = "#mx/" + mx.sigla

    let cartablock = document.createElement("div");
    let cartadentro = document.createElement("div");
    let cartafront = document.createElement("div");
    let cartaback = document.createElement("div");

    cartablock.className = "flip-card";
    cartadentro.className = "flip-card-inner";
    cartafront.className = "flip-card-front";
    cartaback.className = "flip-card-back";

    //Frente de la carta
    let img = document.createElement("img");
    let esquema = document.createElement("div");
    let nombreYsigla = document.createElement("h2");
    let formula = document.createElement("p");
    let grupo = document.createElement("p");
    let sistema = document.createElement("p");

    img.src = `/static/img/0${mx.sigla}.png`
    nombreYsigla.innerHTML = `${mx.nombre}(${mx.sigla})`;
    formula.innerHTML = `<code>${mx.formula.replaceAll(" ", "")}</code>`;
    grupo.innerHTML = `${traduccion(2,mx.grupo.toString())}`;

    img.className = "img-fluid imagen";
    img.setAttribute("onerror", `this.src="/static/img/error.png"`)
    cartablock.dataset.bsToggle = "modal"
    cartablock.dataset.bsTarget = "#exampleModal"

    formula.className = "formula";

    esquema.appendChild(nombreYsigla)
    esquema.appendChild(formula)
    esquema.appendChild(grupo)
    esquema.appendChild(sistema)
    cartafront.appendChild(esquema)
    cartafront.appendChild(img)

    //Atras de la carta
    /*
    let relieve = document.createElement("p");
    let IRefraccion = document.createElement("p");
    let birrefringencia = document.createElement("p");
    let orientacion = document.createElement("p");
    let elongacion = document.createElement("p");
    let extincion = document.createElement("p");
    let signo = document.createElement("p");

    relieve.innerHTML = mx.relieve;
    IRefraccion.innerHTML = mx.IRefraccion;
    birrefringencia.innerHTML = mx.birrefringencia;
    orientacion.innerHTML = mx.orientacion;
    elongacion.innerHTML = mx.elongacion;
    elongacion.innerHTML = mx.elongacion;
    signo.innerHTML = mx.signo;

    cartaback.appendChild(relieve)
    cartaback.appendChild(IRefraccion)
    cartaback.appendChild(birrefringencia)
    cartaback.appendChild(orientacion)
    cartaback.appendChild(elongacion)
    cartaback.appendChild(extincion)
    cartaback.appendChild(signo)
    */

    cartadentro.appendChild(cartafront)
    cartadentro.appendChild(cartaback)
    cartablock.appendChild(cartadentro)
    LinkParaPedirDatos.appendChild(cartablock)
    cartablock.addEventListener("click", mostrarDatosMineral)
    document.querySelector(".body").appendChild(LinkParaPedirDatos)
  }

}
async function mostrarGrupoTransmitida() {
  let salida = await solicitarGr(this.id)
  document.querySelector(".body").innerHTML = "";
  //Mostrar cartas con los minerales recopilados
  for (const mx of salida.data) {

    if (mx.grupo != `[${this.id}]`) continue

    let LinkParaPedirDatos = document.createElement("a")
    LinkParaPedirDatos.href = "#mx/" + mx.sigla

    let cartablock = document.createElement("div");
    let cartadentro = document.createElement("div");
    let cartafront = document.createElement("div");
    let cartaback = document.createElement("div");

    cartablock.className = "flip-card";
    cartadentro.className = "flip-card-inner";
    cartafront.className = "flip-card-front";
    cartaback.className = "flip-card-back";

    //Frente de la carta
    let img = document.createElement("img");
    let esquema = document.createElement("div");
    let nombreYsigla = document.createElement("h2");
    let formula = document.createElement("p");
    let grupo = document.createElement("p");
    let sistema = document.createElement("p");

    img.src = `/static/img/0${mx.sigla}.png`
    nombreYsigla.innerHTML = `${mx.nombre}(${mx.sigla})`;
    formula.innerHTML = `<code>${mx.formula.replaceAll(" ", "")}</code>`;
    grupo.innerHTML = `${traduccion(0,mx.grupo)}`;
    sistema.innerHTML = `${traduccion(1,mx.sistema)}`;

    img.className = "img-fluid imagen";
    img.setAttribute("onerror", `this.src="/static/img/error.png"`)
    cartablock.dataset.bsToggle = "modal"
    cartablock.dataset.bsTarget = "#exampleModal"


    formula.className = "formula";

    esquema.appendChild(nombreYsigla)
    esquema.appendChild(formula)
    esquema.appendChild(grupo)
    esquema.appendChild(sistema)
    cartafront.appendChild(esquema)
    cartafront.appendChild(img)

    //Atras de la carta
    let relieve = document.createElement("p");
    let IRefraccion = document.createElement("p");
    let birrefringencia = document.createElement("p");
    let orientacion = document.createElement("p");
    let elongacion = document.createElement("p");
    let extincion = document.createElement("p");
    let signo = document.createElement("p");

    relieve.innerHTML = mx.relieve;
    IRefraccion.innerHTML = mx.IRefraccion;
    birrefringencia.innerHTML = mx.birrefringencia;
    orientacion.innerHTML = mx.orientacion;
    elongacion.innerHTML = mx.elongacion;
    elongacion.innerHTML = mx.elongacion;
    signo.innerHTML = mx.signo;

    cartaback.appendChild(relieve)
    cartaback.appendChild(IRefraccion)
    cartaback.appendChild(birrefringencia)
    cartaback.appendChild(orientacion)
    cartaback.appendChild(elongacion)
    cartaback.appendChild(extincion)
    cartaback.appendChild(signo)

    cartadentro.appendChild(cartafront)
    cartadentro.appendChild(cartaback)
    cartablock.appendChild(cartadentro)
    LinkParaPedirDatos.appendChild(cartablock)
    cartablock.addEventListener("click", mostrarDatosMineral)
    document.querySelector(".body").appendChild(LinkParaPedirDatos)
  }
}
async function mostrarDatosMineral() {
  console.log(this)
}
async function mostrarInfo() {
  document.querySelector(".body").innerHTML = this.id
  console.log(this.id)
}
function traduccion (n, texto){
  let salida = ""
  texto = texto.replaceAll(/[\[\] ,-]/g, "")
  if(n==0){
    return `${maps(0).get(parseInt(texto))}`
  }
  if(n==1){
    for (const str of texto.split("")) {
      salida = `${salida}, ${maps(1).get(parseInt(str))}`
    }
    return salida.substring(2)
  }
  if(n==2){
    return `${maps(2).get(parseInt(texto))}`
  }
}

function maps(n) {
  const map1 = new Map();
  if (n == 0) {
    map1.set(0, "Nesosilicatos");
    map1.set(1, "Sorosilicatos");
    map1.set(2, "Ciclosilicatos ");
    map1.set(3, "Inosilicatos simple");
    map1.set(4, "Inosilicatos doble");
    map1.set(5, "Filosilicatos");
    map1.set(6, "Tectosilicatos");
    map1.set(7, "Haluros");
    map1.set(8, "Carbonatos");
    map1.set(9, "Fosfatos");
    map1.set(10, "Óxidos e hidróxidos");
    return map1
  }
  if (n == 1) {
    map1.set(0, "Cubico");
    map1.set(1, "Tetragonal");
    map1.set(2, "Hexagonal");
    map1.set(3, "Trigonal");
    map1.set(4, "Rombico");
    map1.set(5, "Monoclinico");
    map1.set(6, "Triclinico");

    return map1
  }
  if (n == 2) {
    map1.set(0, "Sulfuros y sulfosales");
    map1.set(1, "Oxidos e hidroxidos");
    map1.set(2, "Nativos");
    map1.set(3, "Silicatos");
    map1.set(4, "Otros");

    return map1
  }
  
}
