/**
 * @jest-environment jsdom
 */
import counter from './commentCounter.js';

describe('testing the comment counting function', () => {
  test('the comment container returns count of 1 after appending comment element', () => {
    const container = document.createElement('div');
    const comment = document.createElement('p');
    comment.innerText = 'Easy peasy lemon squeazy';
    container.appendChild(comment);
    expect(counter(container)).toBe(1);
  });
});
