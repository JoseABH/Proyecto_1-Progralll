const listaServicios = document.getElementById('listaServicios');
const modal = document.getElementById('modal');
const btnAbrirModal = document.getElementById('btnAbrirModal');
const btnCerrarModal = document.querySelector('.close');
const servicioForm = document.getElementById('servicioForm');
let modoEdicion = false;

// Cargar servicios
async function cargarServicios() {
    const response = await fetch('http://localhost:3000/servicios');
    const servicios = await response.json();

    listaServicios.innerHTML = ''; // Limpiar lista
    servicios.forEach(servicio => {
        const div = document.createElement('div');
        div.classList.add('servicio-item');
        div.innerHTML = `
     <img class="imgservicios" src="${servicio.imagen_url}" alt="imagen" />
      <span>${servicio.titulo}</span>
      <div>
        <button class="btn btn-editar" onclick="abrirModalEdicion(${servicio.id})">Editar</button>
        <button class="btn btn-eliminar" onclick="eliminarServicio(${servicio.id})">Eliminar</button>
      </div>
    `;
        listaServicios.appendChild(div);
    });
}

// Abrir modal para agregar
function abrirModalAgregar() {
    modoEdicion = false;
    document.getElementById('modalTitulo').textContent = 'Agregar Servicio';
    document.getElementById('submitButton').textContent = 'Agregar';
    servicioForm.reset();
    modal.style.display = 'flex';
}

// Abrir modal para editar
async function abrirModalEdicion(id) {
    modoEdicion = true;
    document.getElementById('modalTitulo').textContent = 'Editar Servicio';
    document.getElementById('submitButton').textContent = 'Guardar Cambios';

    const response = await fetch(`http://localhost:3000/servicios/${id}`);
    const servicio = await response.json();

    document.getElementById('servicioId').value = servicio.id;
    document.getElementById('titulo').value = servicio.titulo;
    document.getElementById('descripcion').value = servicio.descripcion;
    document.getElementById('imagen_url').value = servicio.imagen_url;
    document.getElementById('whatsapp').value = servicio.enlace_whatsapp;

    modal.style.display = 'flex';
}

// Guardar servicio (agregar o editar)
async function guardarServicio(event) {
    event.preventDefault();
    const id = document.getElementById('servicioId').value;
    const servicio = {
        titulo: document.getElementById('titulo').value,
        descripcion: document.getElementById('descripcion').value,
        imagen_url: document.getElementById('imagen_url').value,
        enlace_whatsapp: document.getElementById('whatsapp').value,
    };

    try {
        const response = await fetch(modoEdicion
            ? `http://localhost:3000/servicios/${id}`
            : 'http://localhost:3000/servicios',
            {
                method: modoEdicion ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(servicio),
            }
        );

        if (response.ok) {
            alert(modoEdicion ? 'Servicio actualizado' : 'Servicio agregado');
            cerrarModal();
            cargarServicios();
        } else {
            alert('Error al guardar servicio');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Eliminar servicio
async function eliminarServicio(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este servicio?')) return;

    try {
        const response = await fetch(`http://localhost:3000/servicios/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Servicio eliminado');
            cargarServicios();
        } else {
            alert('Error al eliminar servicio');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Cerrar modal
function cerrarModal() {
    modal.style.display = 'none';
}

// Event Listeners
btnAbrirModal.addEventListener('click', abrirModalAgregar);
btnCerrarModal.addEventListener('click', cerrarModal);
servicioForm.addEventListener('submit', guardarServicio);
window.addEventListener('click', (event) => { if (event.target === modal) cerrarModal(); });

// Cargar servicios al iniciar
// document.addEventListener('DOMContentLoaded', cargarServicios);



















const API_URL = "http://localhost:3000/comentarios"; // Reemplázalo con tu API real


async function cargarTestimonios() {
    try {
        const response = await fetch(API_URL);
        const testimonios = await response.json();
        const contenedor = document.getElementById("testimonios");
        contenedor.innerHTML = '';

        testimonios.forEach(testimonio => {
            const li = document.createElement("li");
            li.classList.add("testimonio-item");

            li.innerHTML = `
                <div class="testimonio-info">
                    <img src="${testimonio.imagen_url}" alt="${testimonio.nombre}" class="foto-perfil">
                    <div>
                        <p class="autor"><strong>${testimonio.nombre}</strong></p>
                        <p class="descripcion">${testimonio.comentario}</p>
                    </div>
                </div>
                <div>
                    <button class="btn-editar" onclick="abrirModal(${testimonio.id}, '${testimonio.nombre}', '${testimonio.comentario}', '${testimonio.imagen_url}')">Editar</button>
                    <button class="btn-eliminar" onclick="eliminarTestimonio(${testimonio.id})">Eliminar</button>
                </div>
            `;

            contenedor.appendChild(li);
        });
    } catch (error) {
        console.error("Error al cargar testimonios:", error);
    }
}

function abrirModal(id = "", nombre = "", comentario = "", imagen_url = "") {
    document.getElementById("testimonioId").value = id;
    document.getElementById("nombre").value = nombre;
    document.getElementById("comentario").value = comentario;
    document.getElementById("imagen_url2").value = imagen_url;
    document.getElementById("formTitle").innerText = id ? "Editar Testimonio" : "Nuevo Testimonio";

    document.getElementById("modal2").style.display = "flex";
}

function cerrarModal2() {
    document.getElementById("modal2").style.display = "none";
    document.getElementById("testimonioForm").reset();
    document.getElementById("testimonioId").value = "";
}

async function guardarTestimonio(event) {
    event.preventDefault();

    const id = document.getElementById("testimonioId").value;
    const nombre = document.getElementById("nombre").value;
    const comentario = document.getElementById("comentario").value;
    const imagen_url = document.getElementById("imagen_url2").value;

    const testimonio = { nombre, comentario, imagen_url };

    try {
        if (id) {
            await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(testimonio)
            });
        } else {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(testimonio)
            });
        }

        alert(id ? 'Comentario actualizado' : 'Comentario agregado');

        cerrarModal2();
        cargarTestimonios();
    } catch (error) {
        console.error("Error al guardar testimonio:", error);
    }
}

async function eliminarTestimonio(id) {
    if (confirm("¿Estás seguro de eliminar este comentario?")) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });
            cargarTestimonios();
        } catch (error) {
            console.error("Error al eliminar testimonio:", error);
        }
    }
}






























const API_URL3 = "http://localhost:3000/seccion-quienes-somos"; // Reemplázalo con tu API real


async function cargarSeccionQuienesSomos() {
    try {
        const response = await fetch(API_URL3);
        const quienesSomos = await response.json();
        const contenedor = document.getElementById("quienesSomos");
        contenedor.innerHTML = '';

        quienesSomos.forEach(quienesSomo => {
            const li = document.createElement("li");
            li.classList.add("quienesSomos-item");

            li.innerHTML = `
                <div class="quienesSomos-info">
                    <img src="${quienesSomo.imagen_url}" alt="${quienesSomo.titulo}" class="imagenQuienesSomo">
                    <div>
                        <p class="titulo"><strong>${quienesSomo.titulo}</strong></p>
                        <p class="descripcion">${quienesSomo.descripcion}</p>
                    </div>
                </div>
                <div>
                    <button class="btn-editar" onclick="abrirModal3(${quienesSomo.id}, '${quienesSomo.titulo}', '${quienesSomo.descripcion}', '${quienesSomo.imagen_url}')">Editar</button>
                    <button class="btn-eliminar" onclick="eliminarSeccionQuienesSomos(${quienesSomo.id})">Eliminar</button>
                </div>
            `;

            contenedor.appendChild(li);
        });
    } catch (error) {
        console.error("Error al cargar quienesSomo:", error);
    }
}


function abrirModal3(id = "", titulo = "", descripcion = "", imagen_url = "") {
    document.getElementById("quienesSomosId").value = id;
    document.getElementById("quienesSomosTitulo").value = titulo;
    document.getElementById("quienesSomosDescripcion").value = descripcion;
    document.getElementById("quienesSomosImagen_url2").value = imagen_url;
    document.getElementById("formTitle3").innerText = id ? "Editar Quienes Somos" : "Nuevo Quienes Somos";

    document.getElementById("modal3").style.display = "flex";
}


function cerrarModal3() {
    document.getElementById("modal3").style.display = "none";
    document.getElementById("quienesSomosForm").reset();
    document.getElementById("quienesSomosId").value = "";
}


async function guardarSeccionQuienesSomos(event) {
    event.preventDefault();

    const id = document.getElementById("quienesSomosId").value;
    const titulo = document.getElementById("quienesSomosTitulo").value;
    const descripcion = document.getElementById("quienesSomosDescripcion").value;
    const imagen_url = document.getElementById("quienesSomosImagen_url2").value;

    const seccionQuienesSomos = { titulo, descripcion, imagen_url };

    try {
        if (id) {
            await fetch(`${API_URL3}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(seccionQuienesSomos)
            });
            alert('Seccion Quienes Somos actualizado')
        } else {
            const response = await fetch(API_URL3, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(seccionQuienesSomos)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                let errorMessage = errorData.message || errorData.error || response.statusText;

                if (response.status === 409) {
                    errorMessage = "Ya existe una sección 'Quiénes Somos'. Solo se permite una.";
                }

                alert(errorMessage);
            } else {
                alert('Seccion Quienes Somos agregado');
            }

        }



        cerrarModal3();
        cargarSeccionQuienesSomos();


    } catch (error) {
        console.error("Error al guardar Seccion Quienes Somos:", error);
    }
}


async function eliminarSeccionQuienesSomos(id) {
    if (confirm("¿Estás seguro de eliminar esta seccion?")) {
        try {
            await fetch(`${API_URL3}/${id}`, {
                method: "DELETE"
            });
            cargarSeccionQuienesSomos();
        } catch (error) {
            console.error("Error al eliminar la seccion:", error);
        }
    }
}


















const API_URL4 = "http://localhost:3000/seccion-porque-elegirnos"; // Reemplázalo con tu API real


async function cargarSeccionPorqueElegirnos() {
    try {
        const response = await fetch(API_URL4);
        const porqueElegirnos = await response.json();
        const contenedor = document.getElementById("porqueElegirnos");
        contenedor.innerHTML = '';

        porqueElegirnos.forEach(porqueElegirno => {
            const li = document.createElement("li");
            li.classList.add("porqueElegirnosItem");

            li.innerHTML = `
                <div class="porqueElegirnos-info">
                    <img src="${porqueElegirno.icono}" alt="${porqueElegirno.titulo}" class="imagenPorqueElegirno">
                    <div>
                        <p class="titulo"><strong>${porqueElegirno.titulo}</strong></p>
                        <p class="descripcion">${porqueElegirno.descripcion}</p>
                    </div>
                </div>
                <div>
                    <button class="btn-editar4" onclick="abrirModal4(${porqueElegirno.id}, '${porqueElegirno.titulo}', '${porqueElegirno.descripcion}', '${porqueElegirno.icono}')">Editar</button>
                    <button class="btn-eliminar4" onclick="eliminarSeccionPorqueElegirnos(${porqueElegirno.id})">Eliminar</button>
                </div>
            `;

            contenedor.appendChild(li);
        });
    } catch (error) {
        console.error("Error al cargar porqueElegirno:", error);
    }
}

function abrirModal4(id = "", titulo = "", descripcion = "", icono = "") {
    document.getElementById("porqueElegirnosId").value = id;
    document.getElementById("porqueElegirnosTitulo").value = titulo;
    document.getElementById("porqueElegirnosDescripcion").value = descripcion;
    document.getElementById("porqueElegirnosImagen_url2").value = icono;
    document.getElementById("formTitle4").innerText = id ? "Editar Porque Elegirnos" : "Nuevo Porque Elegirnos";

    document.getElementById("modal4").style.display = "flex";
}

function cerrarModal4() {
    document.getElementById("modal4").style.display = "none";
    document.getElementById("porqueElegirnosForm").reset();
    document.getElementById("porqueElegirnosId").value = "";
}

async function guardarSeccionPorqueElegirnos(event) {
    event.preventDefault();

    const id = document.getElementById("porqueElegirnosId").value;
    const titulo = document.getElementById("porqueElegirnosTitulo").value;
    const descripcion = document.getElementById("porqueElegirnosDescripcion").value;
    const imagen_url = document.getElementById("porqueElegirnosImagen_url2").value;

    const seccionPorqueElegirnos = { titulo, descripcion, icono: imagen_url };

    try {
        if (id) {
            await fetch(`${API_URL4}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(seccionPorqueElegirnos)
            });
        } else {
            await fetch(API_URL4, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(seccionPorqueElegirnos)
            });
        }

        alert(id ? 'Porque Elegirnos actualizado' : 'Porque Elegirnos agregado');

        cerrarModal4();
        cargarSeccionPorqueElegirnos();
    } catch (error) {
        console.error("Error al guardar seccion:", error);
    }
}

async function eliminarSeccionPorqueElegirnos(id) {
    if (confirm("¿Estás seguro de eliminar esta seccion?")) {
        try {
            await fetch(`${API_URL4}/${id}`, {
                method: "DELETE"
            });
            cargarSeccionPorqueElegirnos();
        } catch (error) {
            console.error("Error al eliminar seccion:", error);
        }
    }
}


const API_URL5 = "http://localhost:3000/seccion-hero"; // Reemplázalo con tu API real


async function cargarSeccionHero() {
    try {
        const response = await fetch(API_URL5);
        const heros = await response.json();
        const contenedor = document.getElementById("hero");
        contenedor.innerHTML = '';

        heros.forEach(hero => {
            const li = document.createElement("li");
            li.classList.add("hero-item");

            li.innerHTML = `
                <div class="hero-info">
                    <video autoplay loop muted id="video">
                        <source src="../../${hero.video}" type="video/mp4">
                    </video>
                    <div>
                        <p class="titulo"><strong>${hero.titulo}</strong></p>
                        <p class="descripcion">${hero.descripcion}</p>
                    </div>
                </div>
                <div>
                    <button class="btn-editar" onclick="abrirModal5(${hero.id}, '${hero.titulo}', '${hero.descripcion}', '${hero.btnSectionTitulo}', '${hero.btnSectionUrl}', '${hero.btnRedSocialTitulo}', '${hero.btnRedSocialUrl}', '${hero.video}')">Editar</button>
                    <button class="btn-eliminar" onclick="eliminarSeccionHero(${hero.id})">Eliminar</button>
                </div>
            `;

            contenedor.appendChild(li);
        });
    } catch (error) {
        console.error("Error al cargar hero:", error);
    }
}


function abrirModal5(id = "", titulo = "", descripcion = "", btnSectionTitulo = "", btnSectionUrl = "", btnRedSocialTitulo = "", btnRedSocialUrl = "", video = "") {
    document.getElementById("heroId").value = id;
    document.getElementById("heroTitulo").value = titulo;
    document.getElementById("heroDescripcion").value = descripcion;
    document.getElementById("heroBtnSeccionTitulo").value = btnSectionTitulo;
    document.getElementById("heroBtnSeccionUrl").value = btnSectionUrl;
    document.getElementById("heroBtnRedSocialTitulo").value = btnRedSocialTitulo;
    document.getElementById("heroBtnRedSocialUrl").value = btnRedSocialUrl;
    document.getElementById("heroVideoUrl").value = video;
    document.getElementById("formTitle5").innerText = id ? "Editar Seccion hero" : "Nueva Seccion Hero";

    document.getElementById("modal5").style.display = "flex";
}

function cerrarModal5() {
    document.getElementById("modal5").style.display = "none";
    document.getElementById("heroForm").reset();
    document.getElementById("heroId").value = "";
}

async function eliminarSeccionHero(id) {
    if (confirm("¿Estás seguro de eliminar esta seccion?")) {
        try {
            await fetch(`${API_URL5}/${id}`, {
                method: "DELETE"
            });
            cargarSeccionHero();
        } catch (error) {
            console.error("Error al eliminar la seccion:", error);
        }
    }
}



async function guardarSeccionHero(event) {
    event.preventDefault();

    const id = document.getElementById("heroId").value;
    const titulo = document.getElementById("heroTitulo").value;
    const descripcion = document.getElementById("heroDescripcion").value;
    const btnSectionTitulo = document.getElementById("heroBtnSeccionTitulo").value;
    const btnSectionUrl = document.getElementById("heroBtnSeccionUrl").value;
    const btnRedSocialTitulo = document.getElementById("heroBtnRedSocialTitulo").value;
    const btnRedSocialUrl = document.getElementById("heroBtnRedSocialUrl").value;
    const video = document.getElementById("heroVideoUrl").value;

    const seccionHero = { titulo, descripcion, btnSectionTitulo, btnSectionUrl, btnRedSocialTitulo, btnRedSocialUrl, video };

    try {
        if (id) {
            await fetch(`${API_URL5}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(seccionHero)
            });
            alert('Sección Hero actualizada');
        } else {
            const response2 = await fetch(API_URL5, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(seccionHero)
            });

            if (!response2.ok) {
                const errorData = await response2.json().catch(() => ({}));
                let errorMessage2 = errorData.message || errorData.error || response2.statusText;

                if (response2.status === 409) {
                    errorMessage2 = "Ya existe una sección 'Hero'. Solo se permite una.";
                }

                alert(errorMessage2);
            } else {
                alert('Sección Hero agregada');
            }
        }

        cerrarModal5();
        cargarSeccionHero();

    } catch (error) {
        console.error("Error al guardar Sección Hero:", error);
    }
}

















document.addEventListener("DOMContentLoaded", () => {
    cargarServicios();
    cargarTestimonios();
    cargarSeccionQuienesSomos();
    cargarSeccionPorqueElegirnos();
    cargarSeccionHero();

    // Botón para abrir el modal de creación
    document.getElementById("btnAgregar3").addEventListener("click", () => abrirModal3());
    document.getElementById("btnAgregar4").addEventListener("click", () => abrirModal4());
    document.getElementById("btnAgregar5").addEventListener("click", () => abrirModal5());

    // Botón para abrir el modal de creación
    document.getElementById("btnAgregar2").addEventListener("click", () => abrirModal());


    // Cerrar modal
    document.querySelector(".close2").addEventListener("click", cerrarModal2);
    document.querySelector(".close3").addEventListener("click", cerrarModal3);
    document.querySelector(".close4").addEventListener("click", cerrarModal4);
    document.querySelector(".close5").addEventListener("click", cerrarModal5);

    // Manejo del formulario
    document.getElementById("testimonioForm").addEventListener("submit", guardarTestimonio);
    document.getElementById("quienesSomosForm").addEventListener("submit", guardarSeccionQuienesSomos);
    document.getElementById("porqueElegirnosForm").addEventListener("submit", guardarSeccionPorqueElegirnos);
    document.getElementById("heroForm").addEventListener("submit", guardarSeccionHero);

});