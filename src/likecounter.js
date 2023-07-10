export default (buttonId, likesData) => {
  const button = document.getElementById(buttonId);
  if (button) {
    const pokemonName = button.getAttribute('id');
    const likeCount = likesData[pokemonName] || 0;
    button.innerHTML = likeCount.toString();
    return likeCount;
  }
  return 0;
};
