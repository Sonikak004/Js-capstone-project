export default async (container, id, key) => {
  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${key}/comments?item_id=${id}`;
  const result = await fetch(url);
  const data = await result.json();
  container.innerHTML = '';
  data.forEach((comment) => {
    const p = document.createElement('p');
    p.innerHTML = `${comment.creation_date} ${comment.username}: ${comment.comment}`;
    container.appendChild(p);
  });
};
