function updateLikeCountInPopup(pokemonName, likeCount) {
  const popupContainer = document.getElementById('container');
  if (popupContainer) {
    const likesCountElement = popupContainer.querySelector('#likesCount');
    if (likesCountElement && likesCountElement.getAttribute('data-pokemon') === pokemonName) {
      likesCountElement.textContent = likeCount.toString();
    }
  }
}

export default { updateLikeCountInPopup };