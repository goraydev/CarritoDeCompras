const carBuy = document.querySelector('.car__buy');
const containerTable = document.querySelector('.table__tbBody');
const emptyCar = document.querySelector('#emptyCarrito');
const listGames = document.querySelector('.games');
const table = document.querySelector('.table');

let articlesCar = [];
let infoGame = {};


loadEventListeners();
function loadEventListeners() {
    listGames.addEventListener('click', addGame);
}

function addGame(e) {
    e.preventDefault();
    if (e.target.classList.contains('card__buy')) {
        //seleccionamos todos los nodos importante para ingresar al carrito
        const gameSelect = e.target.parentElement.parentElement;
        readDataGame(gameSelect);
    }
}

function readDataGame(game) {

    /* creamos un objeto con el juego en el que se hizo click */
    infoGame = {
        id: game.querySelector('.card__buy').getAttribute('data-id'),
        image: game.querySelector('.card__img').src,
        gameName: game.querySelector('.card__title').textContent,
        price: Number(game.querySelector('.card__price span').textContent)
    }

    //Agregamos el elemento del objeto al array de articlesGame
    articlesCar = [...articlesCar, infoGame];

    console.log(articlesCar);
    addCarHTML();
}

/* mostrar los atributos de la compra de un juego */
function addCarHTML() {
    clearHTML();
    articlesCar.forEach(game => {
        const { id, image, gameName, price } = game;

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${image}</td>
        <td>${gameName}</td>
        <td>${price}</td>
        <td>
        <a href="#" class="deleteGame" data-id="${id}">❌</a>
        </td>
        `;
        containerTable.appendChild(row);

    })
}

function clearHTML() {
    while (containerTable.firstChild) {
        containerTable.removeChild(containerTable.firstChild);
    }
}