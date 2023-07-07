/**
 * @jest-environment jsdom
 */

import likeCounter from './likecounter.js';

describe('likeCounter', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="testButton">Likes: <span id="likeCount">0</span></button>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should update the button inner HTML and return the like count', () => {
    const buttonId = 'testButton';
    const likesData = {
      testButton: 15,
    };

    const button = document.getElementById(buttonId);

    const updatedLikeCount = likeCounter(buttonId, likesData);

    expect(updatedLikeCount).toBe(15);
    expect(button.innerHTML).toBe('15');
  });
});
