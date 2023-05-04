window.onload = () => {
  inicio()

}

async function inicio() {
  let menuDescargado = await solicitarMenu()
  cargarMenu(menuDescargado.data)
}

function cargarMenu(menuDescargado) {

  console.log(Object.keys(menuDescargado))
  console.log(menuDescargado)


  for (const li of menuDescargado.menu) {
    //link para
    if (li.search("transmitida") >= 0) {
      document.querySelector(".navbar-nav").appendChild(crearDesplegable(li,menuDescargado.transmitado))
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
  contador = 1;
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
  document.querySelector(".body").innerHTML = this.id
  let salida = await solicitarGr(this.id)
  console.log(salida)
}
async function mostrarInfo(){
  document.querySelector(".body").innerHTML = this.id
  console.log(this.id)
}