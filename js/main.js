async function cargarServicios() {
  const response = await fetch("http://localhost:3000/servicios");
  const servicios = await response.json();

  const contenedorServicios = document.getElementById("contenedor-servicios");
  contenedorServicios.innerHTML = ""; // Resetear las tarjetas

  servicios.forEach((servicio) => {
    const card = document.createElement("div");
    card.classList.add("card-servicios");
    card.innerHTML = `
        <img src="${servicio.imagen_url}" alt="imagen" />
        <h3>${servicio.titulo}</h3>
        <p>${servicio.descripcion}</p>
        <a href="${servicio.enlace_whatsapp}" target="_blank"><i class="bi bi-whatsapp"></i> <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" class="bi bi-dot" viewBox="0 0 8 8">
  
</svg>Cotizar servicio</a>
      `;
    contenedorServicios.appendChild(card);
  });
}


async function cargarTestimonios() {
  const response = await fetch("http://localhost:3000/comentarios");
  const comentarios = await response.json();

  const contenedor = document.querySelector(".testimonios");
  if (!contenedor) {
    console.error("No se encontró el contenedor de testimonios.");
    return;
  }

  contenedor.innerHTML = "";

  comentarios.forEach((comentario) => {
    const testimonioDiv = document.createElement("div");
    testimonioDiv.classList.add("testimonio");

    testimonioDiv.innerHTML = `
            <img src="${comentario.imagen_url}" alt="${comentario.nombre}" class="foto-perfil" />
            <p class="descripcion">"${comentario.comentario}"</p>
            <p class="autor">- ${comentario.nombre}</p>
        `;

    contenedor.appendChild(testimonioDiv);
  });
}


async function cargarSeccionQuienesSomos() {
  const response = await fetch("http://localhost:3000/seccion-quienes-somos");
  const seccionQuienesSomos = await response.json();

  const contenedorSeccionQuienesSomos = document.getElementById("quienes-somos");
  contenedorSeccionQuienesSomos.innerHTML = ""; // Resetear las tarjetas

  seccionQuienesSomos.forEach((seccionQuienesSomo) => {
    contenedorSeccionQuienesSomos.innerHTML = `
        <img class="imagen-quienes-somos" src="${seccionQuienesSomo.imagen_url}" alt="Imagen">
        <div class="contenido-quienes-somos">
          <h5 class="titulo-quienes-somos">${seccionQuienesSomo.titulo}</h5>
          <p class="texto-quienes-somos">${seccionQuienesSomo.descripcion}</p>
        </div>
      `;

  });
}





async function cargarSeccionHero() {
  const response = await fetch("http://localhost:3000/seccion-hero");
  const seccionSeccionHero = await response.json();

  const contenedorSeccionQuienesSomos = document.getElementById("hero");
  contenedorSeccionQuienesSomos.innerHTML = ""; // Resetear las tarjetas

  seccionSeccionHero.forEach((seccionseccionhero) => {
    contenedorSeccionQuienesSomos.innerHTML = `
      <video autoplay loop muted id="video">
         <source src="${seccionseccionhero.video}" type="video/mp4">
      </video>
      <div id="content">
        <h1>${seccionseccionhero.titulo}</h1>
        <p>${seccionseccionhero.descripcion}</p>
        <a class="btnhero btn1" href="${seccionseccionhero.btnSectionUrl}">${seccionseccionhero.btnSectionTitulo}</a>
        <a class="btnhero btn2" href="${seccionseccionhero.btnRedSocialUrl}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
</svg>${seccionseccionhero.btnRedSocialTitulo}</a>
      </div>
      `;

  });
}




async function cargarPorqueElegirnos() {
    
  const response = await fetch('http://localhost:3000/seccion-porque-elegirnos');
  const porqueelegirnos = await response.json();

  console.log("Datos recibidos:", porqueelegirnos); // Verifica la respuesta

  const contenedor = document.querySelector('.derecha');
  if (!contenedor) {
      console.error("No se encontró el contenedor de opciones.");
      return;
  }

  contenedor.innerHTML = '';

  porqueelegirnos.forEach(porqueelegirno => {
      const opcionesDiv = document.createElement('div');
      opcionesDiv.classList.add('opciones');

      opcionesDiv.innerHTML = `
         <div class="porque-elegirnos-derecha">
          <img src="${porqueelegirno.icono}" alt="${porqueelegirno.titulo}" class="icono" />
          <h5>${porqueelegirno.titulo}:</h5>
        </div>
        <p>${porqueelegirno.descripcion}</p>

      `;

      contenedor.appendChild(opcionesDiv);
  });

}



async function cargarEquipoRecursos() {
  const response = await fetch("http://localhost:3000/equipo-recursos");
  const listaequipos = await response.json();

  const contenedorlistaequipos = document.getElementById("listaequipos");
  contenedorlistaequipos.innerHTML = ""; // Resetear las tarjetas

  listaequipos.forEach((equipoRecursos) => {

      const list = document.createElement("li"); 

      list.innerHTML = `
     <img src="${equipoRecursos.iconos}" alt="">
      ${equipoRecursos.texto}`
      ;
      contenedorlistaequipos.appendChild(list);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarSeccionHero();
  cargarEquipoRecursos(); 

});






// Llamar a la función de cargar las secciones cuando se cargue la página
document.addEventListener("DOMContentLoaded", () => {
  cargarSeccionHero();
  cargarServicios();
  cargarTestimonios();
  cargarSeccionQuienesSomos();
  cargarPorqueElegirnos();
  cargarEquipoRecursos();

});
