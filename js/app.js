//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


console.log(contenedorCarrito);

cargarEventListeners();
function cargarEventListeners() {
    //cuando se agregas un curso al presionar agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);
}


//funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {

        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}


//Leer contenido del HTML  al que le damos click y extrae la información del curso
function leerDatosCurso(curso) {
    //crear un objeto con el contenido del curso actual

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    //Agregar elementos al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
    carritoHTML();
}

//Muestra el carrito de compras en el HTML

function carritoHTML() {
    limpiarHTML();
    articulosCarrito.forEach((curso) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <tr>
            <td>
                <img src="${curso.imagen}">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
        </tr>
        `;


        //agrega el curso al HTML
        contenedorCarrito.appendChild(row);
    });
}


//ELIMINA LOS CURSOS DEL TBODY
function limpiarHTML() {

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

    //forma lenta
    /* contenedorCarrito.innerHTML = ''; */
}