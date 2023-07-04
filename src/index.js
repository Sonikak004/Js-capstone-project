import './styles.css';

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

      const reservationsButton = document.createElement('button');
      reservationsButton.classList.add('button');
      reservationsButton.textContent = 'Reservations';

      const likesButton = document.createElement('button');
      likesButton.classList.add('fas');
      likesButton.classList.add('fa-heart');
      likesButton.textContent = '';

      buttonContainer.appendChild(likesButton);
      buttonContainer.appendChild(commentsButton);
      buttonContainer.appendChild(reservationsButton);

      item.appendChild(title);
      item.appendChild(image);
      item.appendChild(buttonContainer);
      itemGrid.appendChild(item);
    });

    itemList.appendChild(itemGrid);
  });