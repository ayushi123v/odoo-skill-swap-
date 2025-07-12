// Mock data: 20 public user profiles
const users = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: ["Marc Demo", "Michell", "Joe wills"][i % 3] + (i > 2 ? ` ${i+1}` : ''),
  makePublic: true,
  skillsOffered: ["Java Script", "Python"],
  skillsWanted: ["Photoshop", "Graphic designer"],
  rating: (Math.random() * 2 + 3).toFixed(1),
}));

const PROFILES_PER_PAGE = 3;
let currentPage = 1;
let isLoggedIn = false; // Change to true to simulate logged-in state

function renderProfiles(page) {
  const list = document.querySelector('.profile-list');
  list.innerHTML = '';
  const start = (page - 1) * PROFILES_PER_PAGE;
  const end = start + PROFILES_PER_PAGE;
  const profiles = users.filter(u => u.makePublic).slice(start, end);
  profiles.forEach(user => {
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.innerHTML = `
      <div class="profile-photo" style="cursor:pointer">Profile Photo</div>
      <div class="profile-info">
        <div class="profile-name" style="cursor:pointer">${user.name}</div>
        <div class="skills-offered">Skills Offered =&gt; ${user.skillsOffered.map(skill => `<span class='skill-badge'>${skill}</span>`).join('')}</div>
        <div class="skills-wanted">Skill wanted =&gt; ${user.skillsWanted.map(skill => `<span class='skill-badge'>${skill}</span>`).join('')}</div>
        <div class="rating">rating <b>${user.rating}/5</b></div>
      </div>
      <button class="request-btn">Request</button>
    `;
    // Add click handlers for photo and name
    card.querySelector('.profile-photo').onclick = () => {
      window.location.href = `../page 4/profile.html?userId=${user.id}`;
    };
    card.querySelector('.profile-name').onclick = () => {
      window.location.href = `../page 4/profile.html?userId=${user.id}`;
    };
    card.querySelector('.request-btn').onclick = () => {
      if (!isLoggedIn) showModal();
      // else: handle request action
    };
    list.appendChild(card);
  });
}

function renderPagination() {
  const totalPages = Math.ceil(users.filter(u => u.makePublic).length / PROFILES_PER_PAGE);
  const pag = document.querySelector('.pagination');
  pag.innerHTML = '';
  const prev = document.createElement('button');
  prev.className = 'page-btn';
  prev.innerHTML = '&lt;';
  prev.disabled = currentPage === 1;
  prev.onclick = () => { if (currentPage > 1) { currentPage--; update(); } };
  pag.appendChild(prev);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
    btn.textContent = i;
    btn.onclick = () => { currentPage = i; update(); };
    pag.appendChild(btn);
  }
  const next = document.createElement('button');
  next.className = 'page-btn';
  next.innerHTML = '&gt;';
  next.disabled = currentPage === totalPages;
  next.onclick = () => { if (currentPage < totalPages) { currentPage++; update(); } };
  pag.appendChild(next);
}

function showModal() {
  document.getElementById('modal').classList.remove('hidden');
}
function hideModal() {
  document.getElementById('modal').classList.add('hidden');
}
document.querySelector('.modal .close-btn').onclick = hideModal;
window.onclick = function(event) {
  if (event.target === document.getElementById('modal')) hideModal();
};

function updateHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userHeader = document.querySelector('.user-header');
  const loginBtn = document.querySelector('.login-btn');
  if (user && user.isLoggedIn) {
    isLoggedIn = true;
    userHeader.style.display = 'flex';
    loginBtn.style.display = 'none';
    // Set avatar if available
    const avatarImg = document.querySelector('.avatar-img');
    if (user.photo) {
      avatarImg.src = user.photo;
    } else {
      avatarImg.src = '../assets/avatar.png';
    }
  } else {
    isLoggedIn = false;
    userHeader.style.display = 'none';
    loginBtn.style.display = 'inline-block';
  }
}

// Bell icon click
if (document.querySelector('.bell-icon')) {
  document.querySelector('.bell-icon').onclick = function() {
    window.location.href = '../page 6/notifications.html';
  };
}
// Logout button click
if (document.querySelector('.logout-btn')) {
  document.querySelector('.logout-btn').onclick = function() {
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    document.querySelector('.user-header').style.display = 'none';
    document.querySelector('.login-btn').style.display = 'inline-block';
    location.reload();
  };
}

function update() {
  updateHeader();
  renderProfiles(currentPage);
  renderPagination();
}

document.querySelector('.login-btn').onclick = function() {
  window.location.href = '../page 2/login.html';
};

update(); 