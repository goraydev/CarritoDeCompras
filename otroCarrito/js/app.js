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

    })
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