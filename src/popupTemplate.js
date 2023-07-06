const template = (data, abilities, moves) => `
<div id="popup">
  <a href="#" id="closePop">
    <i class="fas fa-times fa-lg"></i>
  </a>
  <figure id="popPic">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      data.id
    }.svg" alt="${data.name}">
    <figcaption><h1>${data.name}</h1></figcaption>
  </figure>

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
  <div class="comment-section">
    <h4 id='comments-title'>Comments</h4>
    <div id="comments"></div>
  </div>
  <form id='form'>
    <h4>Add a comment</h4>
    <input type="text" id="name" name='name' placeholder="Your name">
    <textarea name="comment" id="comment" cols="30" rows="5" placeholder="Your insights"></textarea>
    <button type="submit" id='submit'>Comment</button>
  </form>
</div>
`;

export default template;
