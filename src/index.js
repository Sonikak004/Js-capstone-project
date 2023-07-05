import './styles.css';
import template from './popupTemplate';

const btn = document.getElementById('poke');
const container = document.createElement('div')
container.id="container"

btn.addEventListener('click', async (e) => {
  e.preventDefault();
  const poke = e.target.name;
  console.log(poke);
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
  const data = await result.json();
  const abilities = []
  const moves = []
  for (let i = 0; i < 4; i++){
    if (data.abilities[i] !== undefined) {
      abilities.push(data.abilities[i].ability.name)
    }
    if (data.moves[i] !== undefined) {
      moves.push(data.moves[i].move.name)
    }
  }
  container.innerHTML = template(data, abilities, moves)
  document.body.appendChild(container)
})