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
      document.querySelector(".navbar-nav").appendChild(crearDesplegable(li,menuDescargado.grupoSilicatos))
      continue
    }
    if (li.search('reflejada') >= 0) { 
      document.querySelector(".navbar-nav").appendChild(crearDesplegable(li,menuDescargado.reflejado))
      continue
    }
    else {
      let aux = document.createElement("li")
      aux.className = "nav-item"


      let auxLink = document.createElement("a")
      auxLink.className = "nav-link"

      auxLink.href = "#"+li.replaceAll(" ", "_").replaceAll(".", "")
      auxLink.id = li.replaceAll(" ", "_").replaceAll(".", "")
      auxLink.addEventListener("click", mostrarInfo)
      auxLink.innerHTML = li
      aux.appendChild(auxLink)

      document.querySelector(".navbar-nav").appendChild(aux)
    }
  }
}

function crearDesplegable(li,opcion){
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
    auxAInterno.addEventListener("click", mostrarGrupo)
    auxliInterno.appendChild(auxAInterno)
    listaDesplegable.appendChild(auxliInterno)

  }

  botonBarra.appendChild(listaDesplegable)

  return botonBarra
}
async function mostrarGrupo(){
  let salida = await solicitarGr(this.id)
  document.querySelector(".body").innerHTML="";

  console.log(salida)
  //Mostrar cartas con los minerales recopilados
  for (const mx of salida.data) {
    let LinkParaPedirDatos = document.createElement("a")
    LinkParaPedirDatos.href = "#mx/"+ mx.sigla

    
    let cartablock = document.createElement("div");
    let cartadentro = document.createElement("div");
    let cartafront = document.createElement("div");
    let cartaback = document.createElement("div");

    cartablock.className = "flip-card";
    cartadentro.className = "flip-card-inner";
    cartafront.className = "flip-card-front";
    cartaback.className = "flip-card-back";

    //Frente de la carta
    let esquema = document.createElement("div");
    let nombreYsigla = document.createElement("h2");
    let formula = document.createElement("p");
    let sistemayGrupo = document.createElement("p");

    nombreYsigla.innerHTML = `${mx.nombre} (${mx.sigla})`;
    formula.innerHTML = mx.formula;
    sistemayGrupo.innerHTML = `${mx.sistema} - ${mx.grupo}`;

    cartafront.appendChild(esquema)
    cartafront.appendChild(nombreYsigla)
    cartafront.appendChild(formula)
    cartafront.appendChild(sistemayGrupo)

    //Atras de la carta
    let color = document.createElement("p");
    let relieve = document.createElement("p");
    let IRefraccion = document.createElement("p");
    let birrefringencia = document.createElement("p");
    let orientacion = document.createElement("p");
    let elongacion = document.createElement("p");
    let extincion = document.createElement("p");
    let signo = document.createElement("p");

    color.innerHTML = mx.color;
    relieve.innerHTML = mx.relieve;
    IRefraccion.innerHTML = mx.IRefraccion;
    birrefringencia.innerHTML = mx.birrefringencia;
    orientacion.innerHTML =  mx.orientacion;
    elongacion.innerHTML =  mx.elongacion;
    elongacion.innerHTML =  mx.elongacion;
    signo.innerHTML =  mx.signo;

    cartaback.appendChild(color)
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
    document.querySelector(".body").appendChild(LinkParaPedirDatos)
  }
}
async function mostrarInfo(){
  document.querySelector(".body").innerHTML = this.id
  console.log(this.id)
}

/*

    <back>

    
      <p>IRefraccion</p>
      <p>birrefringencia</p>
      <p>colorInter</p>
      <p>orientacion</p>
      <p>elongacion</p>
      <p>extincion</p>
      <p>signo</p>
      <p>otros</p>
      <p>asociaciones</p>
      <p>alteraciones</p>
*/