import './styles.css';
import template from './popupTemplate.js';
import updateLikeCountInPopup from './updatelike.js';

const itemList = document.getElementById('poke-list');
let likesData = {};
const itemGrid = document.createElement('div');
itemGrid.classList.add('poke-grid');
const apiKey = 'hY8Nz1dVpsdglVg97VQ1';

const getPokemonIdFromURL = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};

function updateLikeCount(likesButtonId) {
  const likesButton = document.getElementById(likesButtonId);
  if (likesButton) {
    const pokemonName = likesButton.getAttribute('id');
    const likeCount = likesData[pokemonName] || 0;
    likesButton.textContent = likeCount.toString();
  }
};

// Function to handle liking a Pokemon
async function likePokemon(pokemonName, likesButtonId) {
    try {
    if (Object.prototype.hasOwnProperty.call(likesData, pokemonName)) {
      // If the Pokemon name exists in likesData, proceed with the like operation
      const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiKey}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item_id: pokemonName }),
      });

      if (response.ok) {
        const existingLikesCount = likesData[pokemonName] || 0;
        const newLikesCount = existingLikesCount + 1; // Increment the existing likes count by 1
        likesData[pokemonName] = newLikesCount; // Update likesData with the new likes count
        updateLikeCount(likesButtonId); // Update like count in the UI
        updateLikeCountInPopup(pokemonName, newLikesCount); // Update like count in the popup
        localStorage.setItem('likesData', JSON.stringify(likesData)); // Store the updated likes data in local storage
      }
    }
    } catch (error) {
    // Handle error if needed
    }
  }

// Render the UI
const renderUI = () => {
  itemGrid.innerHTML = '';

fetch('https://pokeapi.co/api/v2/pokemon?offset=3&limit=6')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon data');
      }
      return response.json();
    })
    .then((data) => {
      const fetchedCount = data.results.length;
      // Counter for all the items fetched through
      const counterElement = document.getElementById('counter');
      counterElement.textContent = `Pokémon(${fetchedCount})`;

    data.results.forEach((pokemon) => {
      const item = document.createElement('div');
      item.classList.add('item');
      item.setAttribute('name', pokemon.name);

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
      buttonContainer.appendChild(likesCountElement);
      buttonContainer.appendChild(commentsButton);

      item.appendChild(title);
      item.appendChild(image);
      item.appendChild(buttonContainer);
      itemGrid.appendChild(item);
    });

    itemList.appendChild(itemGrid);
    updateCounts();

const fetchLikesData = async () => {
  const storedLikesData = localStorage.getItem('likesData');
  if (storedLikesData) {
    likesData = JSON.parse(storedLikesData);
    renderUI();
  } else {
        try {
      const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiKey}/likes`);
      if (response.ok) {
        const data = await response.json();
        data.forEach((like) => {
          likesData[like.item_id] = like.likes;
          });
        localStorage.setItem('likesData', JSON.stringify(likesData));
        renderUI();
      }
        } catch (error) {
      // Handle error if needed
        }
  }
};

// Fetch likes data and render the UI
fetchLikesData();

    document.addEventListener('DOMContentLoaded', () => {
      const container = document.createElement('div');
      container.id = 'container';
      container.className = 'hidden';

      document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('pokePop')) {
          console.log('Clicked on the comments button');
          const poke = e.target.parentNode.parentNode.getAttribute('name');
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
          const likesCount = likesCountMap[poke] || 0;
          container.innerHTML = template(data, abilities, moves, likesCount);
          document.body.appendChild(container);
          container.classList.remove('hidden');
          const close = document.getElementById('closePop');
          close.addEventListener('click', (e) => {
            e.preventDefault();
            container.classList.add('hidden');
          });
        }
      });
    });
  });
