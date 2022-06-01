export function queryApi() {
    const url = 'db.json';
    fetch(url)
        .then(answer => answer.json())
        .then(resultado => cards(resultado))
        .catch(error => console.error(error));
}

function cards(resultado) {
    const store__grid = document.querySelector('.store__grid');
    console.log(resultado);
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
    });
}

