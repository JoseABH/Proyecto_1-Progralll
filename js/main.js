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
        <a class="btnhero btn2" href="${seccionseccionhero.btnRedSocialUrl}">${seccionseccionhero.btnRedSocialTitulo}</a>
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
