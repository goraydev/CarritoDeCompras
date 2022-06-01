export function queryApi() {
    const url = 'db.json';
    fetch(url)
        .then(answer => answer.json())
        .then(resultado => cards(resultado))
        .catch(error => console.error(error));
}

function cards(resultado) {
    const store__grid = document.querySelector('.store__grid');
    resultado.forEach(game => {
        const { id, name, img, describe, price } = game;

        //scripting
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
        <img class="card__img" src="img/${img}.jpg" alt="${name}">
        <div class="card__container">
            <div class="card__central">
                <p class="card__title">${name}</p>
                <img class="card__stars" src="img/clasificacion.png" alt="stars">
            </div>
            <p class="card__paragraph">
                ${describe}
            </p>
            <p class="card__price">$<span>${price}</span></p>
            <a href="#" class="card__buy" data-id="${id}">Add to car</a>
        </div>
        `;

        store__grid.appendChild(card);
    });
}

export function searchGame() {
    const storeGrid = document.querySelector('.store__grid');
    const storeGridS = document.querySelector('.store__gridSearch');
    const url = 'db.json';
    const search = document.querySelector('#search');

    search.addEventListener('keyup', (e) => {
        if (e.target.value.length > 0) {

            storeGrid.style.display = 'none';
            for (let i = 0; i < storeGrid.children.length; i++) {
                storeGrid.children[i].style.display = 'none';
            }
            storeGridS.style.display = 'flex';
            for (let i = 0; i < storeGridS.children.length; i++) {
                storeGridS.children[i].style.display = 'block';
            }

            fetch(url)
                .then(answer => answer.json())
                .then(games => showGameSearch(games, e.target.value));

        } else {
            storeGrid.style.display = 'grid';
            for (let i = 0; i < storeGrid.children.length; i++) {
                storeGrid.children[i].style.display = 'block';
            }
            storeGridS.style.display = 'none';
        }
    });
}

function showGameSearch(games, write) {

    const storeGridS = document.querySelector('.store__gridSearch');
    let gameSearch = games.filter(game => game.name.toLowerCase() === write || game.name === write);
    let firstGames = games.filter(game => game.name.toLowerCase().charAt(0) === write.charAt(0));
    limpiarHTML();

    if (write.length === 1) {

        firstGames.forEach(card => {
            const { id, name, img, describe, price } = card;
            //scripting
            const divCard = document.createElement('div');
            divCard.className = 'card';

            divCard.innerHTML = `
           <img class="card__img" src="img/${img}.jpg" alt="${name}">
           <div class="card__container">
               <div class="card__central">
                   <p class="card__title">${name}</p>
                   <img class="card__stars" src="img/clasificacion.png" alt="stars">
               </div>
               <p class="card__paragraph">
                   ${describe}
               </p>
               <p class="card__price">$<span>${price}</span></p>
               <a href="#" class="card__buy" data-id="${id}">Add to car</a>
           </div>
           `;

            storeGridS.appendChild(divCard);
        });
    } else {
        gameSearch.forEach(card => {
            const { id, name, img, describe, price } = card;
            //scripting
            const divCard = document.createElement('div');
            divCard.className = 'card';

            divCard.innerHTML = `
           <img class="card__img" src="img/${img}.jpg" alt="${name}">
           <div class="card__container">
               <div class="card__central">
                   <p class="card__title">${name}</p>
                   <img class="card__stars" src="img/clasificacion.png" alt="stars">
               </div>
               <p class="card__paragraph">
                   ${describe}
               </p>
               <p class="card__price">$<span>${price}</span></p>
               <a href="#" class="card__buy" data-id="${id}">Add to car</a>
           </div>
           `;

            storeGridS.appendChild(divCard);
        });
    }
}

function limpiarHTML() {
    const storeGridS = document.querySelector('.store__gridSearch');
    while (storeGridS.firstChild) {
        storeGridS.removeChild(storeGridS.firstChild);
    }
}