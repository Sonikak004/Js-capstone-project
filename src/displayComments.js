export default (container, data) => {
  container.innerHTML = '';
  data.forEach((comment) => {
    const p = document.createElement('p');
    p.innerHTML = `${comment.creation_date} ${comment.username}: ${comment.comment}`;
    container.appendChild(p);
  });
};
