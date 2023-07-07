/**
 * @jest-environment jsdom
 */

describe('Fetched Pokemon Counter', () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <div id="poke-list">
          <div class="poke-grid">
            <div class="item">
              <h2>Pokemon 1</h2>
            </div>
            <div class="item">
              <h2>Pokemon 2</h2>
            </div>
          </div>
        </div>
        <div id="counter"></div>
      `;
  });

  test('should update the fetched count correctly', () => {
    const data = {
      results: [
        { name: 'Pikachu' },
        { name: 'Charizard' },
        { name: 'Bulbasaur' },
      ],
    };

    const fetchedCount = data.results.length;

    const counterElement = document.getElementById('counter');
    counterElement.textContent = `Pokémon(${fetchedCount})`;

    const updatedCount = parseInt(counterElement.textContent.match(/\d+/)[0], 10);

    expect(updatedCount).toBe(fetchedCount);
  });
});
