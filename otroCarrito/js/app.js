import { queryApi } from "./api.js";

const carBuy = document.querySelector('.car__buy');
const containerTable = document.querySelector('.table__tbBody');
const emptyCar = document.querySelector('#emptyCart');
const listGames = document.querySelector('.games');
const table = document.querySelector('.table');
const priceTotal = document.querySelector('.car__priceT span');
const notificationAmountTotal = document.querySelector('.header__notification');



let articlesCar = [];
let infoGame = {};


loadEventListeners();
function loadEventListeners() {
    listGames.addEventListener('click', addGame);
    //si le damos click a x en un carrito
    carBuy.addEventListener('click', deleteGame);

    emptyCar.addEventListener('click', emptyArticleCar);


    document.addEventListener('DOMContentLoaded', () => {
        queryApi();
        articlesCar = JSON.parse(localStorage.getItem('cart')) || [];
        addCarHTML();
       
    });
}

function createCard() {
    const storeGrid = document.querySelector('.store__grid');

    const search = document.querySelector('#search');

    search.addEventListener('keyup', (e) => {

        console.log(e.target.value.length);
        if (e.target.value.length) {
            //none all
            for (let i = 0; i < storeGrid.children.length; i++) {
                if (i < 12) {
                    storeGrid.children[i].style.display = 'none';
                }
            }

            const buscar = articlesCar.filter(article => article.gameName === e.target.value);
            console.log(buscar);
            buscar.forEach(card => {
                const { id, gameName, image, price } = card;
                const div = document.createElement('div');
                div.className = 'card search';
                div.innerHTML = `
                     <img class="card__img" src="${image}" alt="${gameName}">
                     <div class="card__container">
                         <div class="card__central">
                             <p class="card__title">${gameName}</p>
                             <img class="card__stars" src="img/clasificacion5.png" alt="">
                         </div>
                         <p class="card__paragraph">
                              Deserunt qui enim ex elit non est Lorem irure consequat ipsum Lorem ad. Dolore proident qui anim
                             laboris sit quis elit.
                         </p>
                         <p class="card__price">$<span>${price}</span></p>
                         <a href="#" class="card__buy" data-id="${id}">Add to car</a>
                     </div>
                 `;
                console.log(div);
                storeGrid.appendChild(div);
            });
        } else {
            //none all
            const getCardSearch = document.querySelector('.search');
            if (getCardSearch !== null) {
                getCardSearch.remove();
            }
            for (let i = 0; i < storeGrid.children.length; i++) {
                if (i < 11) {
                    storeGrid.children[i].style.display = 'block';
                }
            }
        }

    });

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

function emptyArticleCar() {
    notificacionEmpty();
    articlesCar = [];
    hidePricetAmount();
    addCarHTML();
    console.log(articlesCar);
}

function notificacionEmpty() {

    if (articlesCar.length > 0) {
        let timerInterval
        Swal.fire({
            title: 'Emptying cart',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        })
    }
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

function deleteGame(e) {

    e.preventDefault();
    if (e.target.classList.contains('deleteGame')) {
        //accedemos al id de ese juego al que queremos eliminar
        const gameId = e.target.getAttribute('data-id');

        //eliminamos el juego del array al que se haya dado click
        //para ello filtramos aquellos que sean diferentes al gameId
        articlesCar = articlesCar.filter(game => game.id !== gameId);

        //dejamos de mostrar el precio total en caso ya no quede ninguno
        hidePricetAmount();


        //mostramos en el carrito los que son diferentes al que se hizo click en X
        addCarHTML();

    }
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

    });
    sincronitationStorage();

}

function sincronitationStorage() {
    localStorage.setItem('cart', JSON.stringify(articlesCar));
}



function sumPriceTotal(price) {
    let sumPriceTotal = 0;
    for (let i = 0; i < articlesCar.length; i++) {

        sumPriceTotal += articlesCar[i].price;
    }
    if (articlesCar.length > 0) {
        priceTotal.textContent = `${sumPriceTotal.toFixed(2)}`;
        showPricetAmount();
        sumAmountTotal();
    }

}

function sumAmountTotal() {
    let amountTotal = 0;
    amountTotal += articlesCar.length;
    notificationAmountTotal.textContent = `${amountTotal}`;
}

function showPricetAmount() {
    if (articlesCar.length > 0) {
        priceTotal.parentElement.style.display = 'block';
        notificationAmountTotal.style.visibility = 'visible';
    }
}

function hidePricetAmount() {
    if (articlesCar.length == 0) {
        notificationAmountTotal.style.visibility = 'hidden';
        priceTotal.parentElement.style.display = 'none';
    }
}


function clearHTML() {
    while (containerTable.firstChild) {
        containerTable.removeChild(containerTable.firstChild);
    }
}
