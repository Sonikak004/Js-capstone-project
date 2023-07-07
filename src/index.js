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

const updateLikeCount = async (item, likesCount) => {
  const likesCountElement = document.getElementById(`likesCount-${item}`);
  if (likesCountElement) {
    likesCountElement.textContent = likesCount || 0;

    try {
      await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiKey}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: item,
        }),
      });
    } catch (error) {
      console.log('Error recording like:', error);
    }
  }
};

const updateCounts = async () => {
  const likesCountMap = await fetchAllLikesCount();
  const items = Array.from(document.getElementsByClassName('item'));
  items.forEach((item) => {
    const itemName = item.getAttribute('name');
    updateLikeCount(itemName, likesCountMap[itemName]);
  });
};

const storeLikesCount = (likesCountMap) => {
  localStorage.setItem('likesCountMap', JSON.stringify(likesCountMap));
};

const retrieveLikesCount = () => {
  const likesCountMap = localStorage.getItem('likesCountMap');
  return likesCountMap ? JSON.parse(likesCountMap) : {};
};

fetch('https://pokeapi.co/api/v2/pokemon?offset=3&limit=6')
  .then((response) => response.json())
  .then(async (data) => {
    const likesCountMap = retrieveLikesCount();

    const itemGrid = document.createElement('div');
    itemGrid.classList.add('poke-grid');

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
      likesButton.textContent = '';

      const likesCount = likesCountMap[pokemon.name] || 0;

      const likesCountElement = document.createElement('span');
      likesCountElement.id = `likesCount-${pokemon.name}`;
      likesCountElement.textContent = likesCount;

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

    const likeButtons = document.getElementsByClassName('fas fa-heart');
    Array.from(likeButtons).forEach((likeButton) => {
      likeButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const item = e.target.parentNode.parentNode.getAttribute('name');
        const likesCountElement = document.getElementById(`likesCount-${item}`);
        if (likesCountElement) {
          let likesCount = parseInt(likesCountElement.textContent, 10) || 0;
          likesCount += 1;
          likesCountElement.textContent = likesCount;
          likesCountMap[item] = likesCount;
          storeLikesCount(likesCountMap);
        }

        try {
          await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiKey}/likes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              item_id: item,
            }),
          });
        } catch (error) {
          console.log('Error recording like:', error);
        }
      });
    });

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
