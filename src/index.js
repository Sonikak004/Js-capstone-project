import './styles.css';

const btn = document.getElementById('poke');

btn.addEventListener('click', async (e) => {
  e.preventDefault();
  const poke = e.target.name;
  console.log(poke);
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
  const data = await result.json();
  const weight = data.weight
  console.log(weight)
  const height = data.height
  console.log(height)
  const abilities = []
  const moves = []
  for (let i = 0; i < 5; i++){
    if (data.abilities[i] !== undefined) {
      abilities.push(data.abilities[i].ability.name)
    }
    if (data.moves[i] !== undefined) {
      moves.push(data.moves[i].move.name)
    }

  }
  console.log(abilities)
  console.log(moves)
})