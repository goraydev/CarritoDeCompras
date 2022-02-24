const carBuy = document.querySelector('.car__buy');
const containerTable = document.querySelector('.table__tbBody');
const emptyCar = document.querySelector('#emptyCarrito');
const listGames = document.querySelector('.games');
const table = document.querySelector('.table');
const priceTotal = document.querySelector('.car__priceT span');

let articlesCar = [];
let infoGame = {};


loadEventListeners();
function loadEventListeners() {
    listGames.addEventListener('click', addGame);
}

function addGame(e) {
    e.preventDefault();
    if (e.target.classList.contains('card__buy')) {
        const gameSelect = e.target.parentElement.parentElement;
        readDataGame(gameSelect);
        notificationAdd();

    }
}


function notificationAdd() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Game added to cart',
        showConfirmButton: false,
        timer: 1500
    })
}


function readDataGame(game) {


    infoGame = {
        id: game.querySelector('.card__buy').getAttribute('data-id'),
        image: game.querySelector('.card__img').src,
        gameName: game.querySelector('.card__title').textContent,
        price: Number(game.querySelector('.card__price span').textContent)
    }

    //revisa si un juego ya esta en el carrito
    const existGame = articlesCar.some(game => game.id === infoGame.id);

    if (existGame) { //true

        //games contiene el array con los juegos que se hayan repetido
        const games = articlesCar.map(game => {

            if (game.id === infoGame.id) {

                return game;
            } else {
                return game;
            }
        });


        articlesCar = [...games]; //agregamos solo una vez y evitamos la duplicación



    } else {
        articlesCar = [...articlesCar, infoGame];
    }

    addCarHTML();
}


/* mostrar los atributos de la compra de un juego */
function addCarHTML() {
    clearHTML();
    articlesCar.forEach(game => {
        const { id, image, gameName, price } = game;

        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${image}"></td>
        <td>${gameName}</td>
        <td>${price}</td>
        <td>
        <a href="#" class="deleteGame" data-id="${id}">❌</a>
        </td>
        `;
        containerTable.appendChild(row);
        sumPriceTotal(price);

    })
}

function sumPriceTotal(price) {
    let sumPriceTotal = 0;
    for (let i = 0; i < articlesCar.length; i++) {

        sumPriceTotal += articlesCar[i].price;
    }

    priceTotal.textContent = `${sumPriceTotal}`;

}

function clearHTML() {
    while (containerTable.firstChild) {
        containerTable.removeChild(containerTable.firstChild);
    }
}