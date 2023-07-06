import counter from './commentCounter';
export default async (container, id, key, title) => {
  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${key}/comments?item_id=${id}`;
  const result = await fetch(url);
  const data = await result.json();
  container.innerHTML = '';
  data.forEach((comment) => {
    const p = document.createElement('p');
    p.innerHTML = `${comment.creation_date} ${comment.username}: ${comment.comment}`;
    container.appendChild(p);
  });
  const count = counter(container);
  title.innerText = `Comments (${count})`;
};
