window.onload = () => {
  inicio()

}

async function inicio() {
  let menuDescargado = await solicitudesAApi("menu")
  cargarMenu(menuDescargado.data)
}

function cargarMenu(menuDescargado) {

  console.log(Object.keys(menuDescargado))
  console.log(menuDescargado)


  for (const li of menuDescargado.menu) {
    if (li.search("transmitida") >= 0) {
      //boton en barra
      let aux = document.createElement("li")
      aux.className = "nav-item dropdown"

      //link del boton
      let auxa = document.createElement("a")
      auxa.className = "nav-link dropdown-toggle"
      auxa.id = "navbarDropdownMenuLink"
      auxa.href = "#"
      auxa.role = "button"
      auxa.setAttribute("data-bs-toggle", "dropdown")
      auxa.setAttribute("aria-expanded", "false")
      auxa.innerHTML = li

      aux.appendChild(auxa)

      //Lista desplegable
      auxlu = document.createElement("ul")
      auxlu.className = "dropdown-menu"
      auxlu.setAttribute("aria-labelledby", "navbarDropdownMenuLink")

      for (const lis of menuDescargado.transmitado) {
        let auxliInterno = document.createElement("li")
        let auxAInterno = document.createElement("a")
        auxAInterno.className = "dropdown-item"
        auxAInterno.href = "#"
        auxAInterno.innerHTML = lis
        auxliInterno.appendChild(auxAInterno)
        auxlu.appendChild(auxliInterno)
      }

      aux.appendChild(auxlu)
      document.querySelector(".navbar-nav").appendChild(aux)

      continue

    }
    if (li.search('reflejada') >= 0) {
      continue
    }
    else {
      let aux = document.createElement("li")
      aux.className = "nav-item"


      let auxLink = document.createElement("a")
      auxLink.className = "nav-link"
      auxLink.href = li.replaceAll(" ", "_").replaceAll(".", "")
      auxLink.innerHTML = li
      aux.appendChild(auxLink)

      document.querySelector(".navbar-nav").appendChild(aux)
    }
  }


}


/*<li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */