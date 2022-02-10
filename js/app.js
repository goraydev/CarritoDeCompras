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

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
}


//funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {

        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//eliminar cursos del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id'); //accedemos al id del curso para posteriomente eliminarlo


        //Eliminar dle arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML(); //volvemos a iterar sobre carrito y mostrar su html

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
    //revisa si un curso ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {

            if (curso.id === infoCurso.id) {
                //para modificar el precio
                let precioCurso = Number(infoCurso.precio.slice(1, infoCurso.precio.length));


                curso.cantidad++;

                //Actualizamos el precio
                curso.precio = `$${precioCurso * curso.cantidad}`;


                return curso;
            } else {
                return curso;
            }

        });
        articulosCarrito = [...cursos];
    } else {
        //agregamos el elemnto al arreglo de carrito

        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    carritoHTML();

}

//Muestra el carrito de compras en el HTML

function carritoHTML() {
    limpiarHTML();
    articulosCarrito.forEach((curso) => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
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