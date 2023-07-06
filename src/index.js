import './styles.css';
import template from './popupTemplate.js';
import display from './fetchComments'

// HOME PAGE
const itemList = document.getElementById('poke-list');
const apiKey = 'hY8Nz1dVpsdglVg97VQ1';

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
      commentsButton.setAttribute('id', pokemonId + 'c');
      commentsButton.classList.add('pokePop');

      const likesButton = document.createElement('button');
      likesButton.classList.add('fas');
      likesButton.classList.add('fa-heart');
      likesButton.setAttribute('id', pokemonId + 'l');
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

// POPUP
document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.id = 'container';
  container.className = 'hidden';

  document.querySelector('main').addEventListener('click', async (e) => {
    if (e.target.classList.contains('pokePop')) {
      // Getting Pokemon data from PokeAPI
      const poke = e.target.name;
      const commentsID = e.target.id.toString();
      const pokeResult = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${poke}`
      );
      const pokeData = await pokeResult.json();
      const abilities = [];
      const moves = [];
      for (let i = 0; i < 4; i += 1) {
        if (pokeData.abilities[i] !== undefined) {
          abilities.push(pokeData.abilities[i].ability.name);
        }
        if (pokeData.moves[i] !== undefined) {
          moves.push(pokeData.moves[i].move.name);
        }
      }
      container.innerHTML = template(pokeData, abilities, moves);
      document.body.appendChild(container);
      container.classList.remove('hidden');

      // Getting comments from InvolvementAPI
      const comments = document.getElementById('comments');
      display(comments, commentsID, apiKey)

      // Close the Pop-up
      const close = document.getElementById('closePop');
      close.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add('hidden');
      });
    }
  });
});
