import './styles.css';
import template from './popupTemplate.js';
import updateLikeCountInPopup from './updatelike.js';
import likeCounter from './likecounter.js';
import logo from './PokeFiles-Logo.png';
import display from './fetchComments.js';

// HOME PAGE
const pokeLogo = new Image();
pokeLogo.src = logo;
pokeLogo.alt = 'logo';
document.getElementById('logo').appendChild(pokeLogo);

const itemList = document.getElementById('poke-list');
let likesData = {};
const itemGrid = document.createElement('div');
itemGrid.classList.add('poke-grid');
const apiKey = 'J5DvxD332GJ3W0sJ0ALC';

const getPokemonIdFromURL = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};

const updateLikeCount = (likesButtonId) => {
  const likesButton = document.getElementById(likesButtonId);
  if (likesButton) {
    const pokemonName = likesButton.getAttribute('id');
    const likeCount = likesData[pokemonName] || 0;
    likesButton.textContent = likeCount.toString();
  }
}

// Function to handle liking a Pokemon
const likePokemon = async (pokemonName, likesButtonId) => {
  try {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiKey}/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_id: pokemonName }),
    });

    if (response.ok) {
      const existingLikesCount = likesData[pokemonName] || 0;
      const newLikesCount = existingLikesCount + 1;
      likesData[pokemonName] = newLikesCount;
      updateLikeCount(likesButtonId); // Update the like count in the UI
      updateLikeCountInPopup(pokemonName, newLikesCount); // Update the like count in the popup
      localStorage.setItem('likesData', JSON.stringify(likesData)); // Save the updated likes data in local storage
      // Update the like count in the button
      likeCounter(likesButtonId, likesData);
    }
  } catch (error) {
    // Handle errors
  }
}

const renderUI = () => {
  itemGrid.innerHTML = '';

  fetch('https://pokeapi.co/api/v2/pokemon?limit=40')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon data');
      }
      return response.json();
    })
    .then((data) => {
      const fetchedCount = data.results.length;
      const counterElement = document.getElementById('counter');
      counterElement.textContent = `Pokémon(${fetchedCount})`;

      data.results.forEach((pokemon) => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.classList.add('pokes');

        const title = document.createElement('h2');
        title.textContent = pokemon.name;

        const image = document.createElement('img');
        const pokemonId = getPokemonIdFromURL(pokemon.url);
        image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
        image.classList.add('pokemon');
        image.alt = pokemon.name;

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const commentsButton = document.createElement('button');
        commentsButton.classList.add('button');
        commentsButton.classList.add('button-hov');
        commentsButton.textContent = 'Comments';
        commentsButton.setAttribute('name', pokemon.name);
        commentsButton.setAttribute('id', `${pokemonId}c`);
        commentsButton.classList.add('pokePop');

        const likesButton = document.createElement('button');
        likesButton.classList.add('fas');
        likesButton.classList.add('fa-heart');
        likesButton.setAttribute('id', pokemon.name);

        const likeCount = likesData[pokemon.name] || 0;
        likesButton.textContent = likeCount;

        likesButton.addEventListener('click', async () => {
          await likePokemon(pokemon.name, pokemon.name);
        });

        buttonContainer.appendChild(likesButton);
        buttonContainer.appendChild(commentsButton);

        item.appendChild(title);
        item.appendChild(image);
        item.appendChild(buttonContainer);
        itemGrid.appendChild(item);
      });

      itemList.appendChild(itemGrid);
    })
    .catch(() => {
      // Handle errors
    });
};

const fetchLikesData = async () => {
  try {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiKey}/likes`);
    if (response.ok) {
      const data = await response.json();
      likesData = {};
      data.forEach((like) => {
        likesData[like.item_id] = like.likes;
      });
      localStorage.setItem('likesData', JSON.stringify(likesData));
      renderUI();
    }
  } catch (error) {
    // Handle errors
  }
};

fetchLikesData();

// POPUP
document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.id = 'container';
  container.className = 'hidden';

  document.querySelector('main').addEventListener('click', async (e) => {
    if (e.target.classList.contains('pokePop')) {
      const poke = e.target.name;
      const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
      const data = await result.json();
      const abilities = [];
      const moves = [];
      for (let i = 0; i < 4; i += 1) {
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

      // Getting comments from InvolvementAPI
      const title = document.getElementById('comments-title');
      const comments = document.getElementById('comments');
      const commentsID = e.target.id.toString(); // Define commentsID here
      display(comments, commentsID, apiKey, title);

      // Sending comments to InvolvementAPI
      const form = document.getElementById('form');
      form.addEventListener('click', async (e) => {
        if (e.target.id === 'submit') {
          e.preventDefault();
          const input = document.getElementById('name');
          const textArea = document.getElementById('comment');
          const payload = {
            item_id: commentsID,
            username: input.value,
            comment: textArea.value,
          };
          const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiKey}/comments`;
          await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }).then((result) => JSON.stringify(result));
          display(comments, commentsID, apiKey, title);
          form.reset();
        }
      });

      // Close the Pop-up
      const close = document.getElementById('closePop');
      close.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add('hidden');
      });
    }
  });
});
