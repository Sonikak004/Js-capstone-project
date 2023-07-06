const template = (data, abilities, moves) => `
<div id="popup">
  <a href="#" id="closePop">
        <i class="fas fa-times fa-lg"></i></a>
    <figure id="popPic">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
  data.id
}.svg" alt="${data.name}">
        <figcaption><h1>${data.name}</h1></figcaption>
    </figure>
    <div class="likes-container">
      <button class="like-button">
        <i class="fas fa-heart"></i>
      </button>
      <span id="likesCount">${likesCount}</span>
    </div>
    <div class="details">
        <div class="stats">Height: ${data.height}</div>
        <div class="stats">Weight: ${data.weight}</div>
        <div class="stats">Abilities:
            <ul>
            ${abilities.map((ability) => `<li>${ability}</li>`).join('')}
            </ul>
        </div>
        <div class="stats">Moves:
            <ul>
            ${moves.map((move) => `<li>${move}</li>`).join('')}
            </ul>
        </div>  
    </div>
`;

export default template;
