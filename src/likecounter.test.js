/**
 * @jest-environment jsdom
 */

import likeCounter from './likecounter.js';

describe('likeCounter', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="testButton">Likes: <span id="likeCount"></span></button>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should return like count of 15 after being passed likesData object with value of 15', () => {
    const buttonId = 'testButton';
    const likesData = {
      testButton: 15,
    };

    const button = document.getElementById(buttonId);

    const updatedLikeCount = likeCounter(buttonId, likesData);

    expect(updatedLikeCount).toBe(15);
    expect(button.innerHTML).toBe('15');
  });

  it('should return like count of 0 after being passed empty likesData object', () => {
    const buttonId = 'testButton';
    const likesData = {};

    const button = document.getElementById(buttonId);

    const updatedLikeCount = likeCounter(buttonId, likesData);

    expect(updatedLikeCount).toBe(0);
    expect(button.innerHTML).toBe('0');
  });
});
