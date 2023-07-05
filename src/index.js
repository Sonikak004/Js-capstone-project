import './styles.css';

import template from './popupTemplate';

const btn = document.getElementById('poke');
const container = document.createElement('div');
container.id = 'container';
container.className = 'hidden';

btn.addEventListener('click', async (e) => {
  e.preventDefault();
  const poke = e.target.name;
  console.log(poke);
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
  const data = await result.json();
  const abilities = [];
  const moves = [];
  for (let i = 0; i < 4; i++) {
    if (data.abilities[i] !== undefined) {
      abilities.push(data.abilities[i].ability.name);
    }
    if (data.moves[i] !== undefined) {
      moves.push(data.moves[i].move.name);
    }
  }
  container.innerHTML = template(data, abilities, moves);
  document.body.appendChild(container);
  container.classList.remove('hidden');
  const close = document.getElementById('closePop');
  close.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.add('hidden');
  });
});


const itemList = document.getElementById('poke-list');

const getPokemonIdFromURL = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};

fetch('https://pokeapi.co/api/v2/pokemon?offset=3&limit=6')
  .then((response) => response.json())
  .then((data) => {
    const itemGrid = document.createElement('div');
    itemGrid.classList.add('poke-grid');

    data.results.forEach((pokemon) => {
      const item = document.createElement('div');
      item.classList.add('item');

      const title = document.createElement('h2');
      title.textContent = pokemon.name;

      const image = document.createElement('img');
      const pokemonId = getPokemonIdFromURL(pokemon.url);
      image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
      image.alt = pokemon.name;

      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('button-container');

      const commentsButton = document.createElement('button');
      commentsButton.classList.add('button');
      commentsButton.textContent = 'Comments';
      commentsButton.setAttribute('name', pokemon.name);

      const likesButton = document.createElement('button');
      likesButton.classList.add('fas');
      likesButton.classList.add('fa-heart');
      likesButton.textContent = '';

      buttonContainer.appendChild(likesButton);
      buttonContainer.appendChild(commentsButton);

      item.appendChild(title);
      item.appendChild(image);
      item.appendChild(buttonContainer);
      itemGrid.appendChild(item);
    });

    itemList.appendChild(itemGrid);
  });
