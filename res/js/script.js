const JSONBIN_URL = "https://api.jsonbin.io/v3/b/68ff9e9543b1c97be9850496/latest";
const LOCAL_JSON = './prueba.json';

// Global posts array
let posts = [];

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('posts');
  if (!container) return;

  const res = await fetch(JSONBIN_URL);
  const json = await res.json();
  posts = Array.isArray(json.record) ? json.record : json.record.posts;
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  renderPosts(posts, container);
});

function renderPosts(postsArray, container) {
  container.innerHTML = '';
  const defaultAvatar = 'res/images/user.png';

  postsArray.forEach(p => {
    const article = document.createElement('article');
    article.className = 'post';

    // Header
    const header = document.createElement('div');
    header.className = 'post-header';

    const profile = document.createElement('div');
    profile.className = 'profile';

    const avatar = document.createElement('img');
    avatar.src = defaultAvatar;
    avatar.alt = 'Profile';
    avatar.width = 40;

    const userSpan = document.createElement('strong');
    userSpan.textContent = p.username || 'user';
    userSpan.style.marginLeft = '8px';

    const dateSpan = document.createElement('span');
    dateSpan.className = 'date';
    dateSpan.style.marginLeft = '8px';
    dateSpan.textContent = new Date(p.date).toLocaleString();

    profile.appendChild(avatar);
    profile.appendChild(userSpan);
    header.appendChild(profile);
    header.appendChild(dateSpan);

    // Body
    const body = document.createElement('div');
    body.className = 'post-body';

    if (p.photo) {
      const img = document.createElement('img');
      img.src = p.photo;
      img.alt = 'post image';
      img.width = 300;
      body.appendChild(img);
    }

    if (p.text) {
      const pEl = document.createElement('p');
      pEl.innerHTML = p.text.replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                            .replace(/"/g, '&quot;')
                            .replace(/'/g, '&#039;')
                            .replace(/\n/g, '<br>');
      body.appendChild(pEl);
    }

    // Footer
    const footer = document.createElement('div');
    footer.className = 'post-footer';
    const likeBtn = document.createElement('button');
    likeBtn.textContent = '👍 Like';
    likeBtn.addEventListener('click', () => {
      likeBtn.textContent = likeBtn.textContent === '👍 Like' ? '❤️ Liked' : '👍 Like';
    });
    footer.appendChild(likeBtn);

    // Assemble
    article.appendChild(header);
    if(p.photo) article.appendChild(document.createElement('br'));
    article.appendChild(body);
    article.appendChild(footer);

    container.appendChild(article);
  });
}
