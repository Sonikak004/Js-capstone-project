const template = (data, abilities, moves) => `
<div id="popup">
  <a href="#"><i class="fa-regular fa-circle-xmark fa-2xl" id="closePop"></i></a>
    <figure id="popPic">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
          data.id
        }.svg" alt="">
        <figcaption><h1>${data.name}</h1></figcaption>
    </figure>

    <div class="details">
        <div class="stats">Height: ${data.height}</div>
        <div class="stats">Weight: ${data.weight}</div>
        <div class="stats">Abilities:
            <ul>
            ${abilities
              .map((ability) => {
                `<li>${ability}</li>`;
              })
              .join('')}
            </ul>
        </div>
        <div class="stats">Moves:
            <ul>
            ${moves
              .map((move) => {
                `<li>${move}</li>`;
              })
              .join('')}
            </ul>
        </div>  
    </div>

    <div class="comment-section">
        <h4>Comments</h4>
        <div id="comments">
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet.</p>
        </div>
    </div>

    <form>
        <h4>Add a comment</h4>
        <input type="text" class="name" name=name placeholder="Your name">
        <textarea name="comment" id="comment" cols="30" rows="5" placeholder="Your insights"></textarea>
        <button type="submit">Comment</button>
    </form>
</div>
`;

export default template