// Mock user data (should match IDs from main listing)
const users = [
  {
    id: 1,
    name: "Marc Demo",
    makePublic: true,
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["Photoshop", "Graphic Design"],
    rating: 3.9,
    feedback: ["Great collaborator!", "Very skilled in JS."],
    photo: null
  },
  {
    id: 2,
    name: "Michell",
    makePublic: true,
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["Photoshop", "Graphic Design"],
    rating: 2.5,
    feedback: ["Quick learner."],
    photo: null
  },
  {
    id: 3,
    name: "Joe wills",
    makePublic: true,
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["Photoshop", "Graphic Design"],
    rating: 4.0,
    feedback: ["Awesome to work with!"],
    photo: null
  },
  // Add more users as needed
];

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function renderProfile(user, isOwnProfile) {
  const content = document.getElementById('profileContent');
  if (isOwnProfile) {
    // Editable form for own profile
    content.innerHTML = `
      <div class="profile-photo-large">
        ${user.photo ? `<img src="${user.photo}" alt="Profile Photo" />` : 'Profile Photo'}
      </div>
      <div class="profile-section"><span class="profile-label">Name:</span> <input type="text" id="editName" value="${user.name}" /></div>
      <div class="profile-section"><span class="profile-label">Skills Offered:</span> <input type="text" id="editSkillsOffered" value="${user.skillsOffered.join(', ')}" /></div>
      <div class="profile-section"><span class="profile-label">Skills Wanted:</span> <input type="text" id="editSkillsWanted" value="${user.skillsWanted.join(', ')}" /></div>
      <div class="profile-section"><span class="profile-label">Profile Photo:</span> <input type="file" id="editPhoto" accept="image/*" /></div>
      <div class="profile-section"><span class="profile-label">Public:</span> <select id="editMakePublic"><option value="true" ${user.makePublic ? 'selected' : ''}>Yes</option><option value="false" ${!user.makePublic ? 'selected' : ''}>No</option></select></div>
      <button id="saveProfileBtn">Save Changes</button>
    `;
    document.getElementById('saveProfileBtn').onclick = function() {
      user.name = document.getElementById('editName').value;
      user.skillsOffered = document.getElementById('editSkillsOffered').value.split(',').map(s => s.trim());
      user.skillsWanted = document.getElementById('editSkillsWanted').value.split(',').map(s => s.trim());
      user.makePublic = document.getElementById('editMakePublic').value === 'true';
      const photoInput = document.getElementById('editPhoto');
      if (photoInput.files && photoInput.files[0]) {
        if (photoInput.files[0].size > 2 * 1024 * 1024) {
          alert('Profile photo must be less than 2MB!');
          return;
        }
        user.photo = photoInput.files[0].name;
      }
      localStorage.setItem('profile', JSON.stringify(user));
      alert('Profile updated!');
      renderProfile(user, true);
    };
  } else {
    // Public view
    content.innerHTML = `
      <div class="profile-photo-large">
        ${user.photo ? `<img src="${user.photo}" alt="Profile Photo" />` : 'Profile Photo'}
      </div>
      <div class="profile-name">${user.name}</div>
      <div class="profile-section"><span class="profile-label">Skills Offered:</span> ${user.skillsOffered.map(skill => `<span class='skill-badge'>${skill}</span>`).join('')}</div>
      <div class="profile-section"><span class="profile-label">Skills Wanted:</span> ${user.skillsWanted.map(skill => `<span class='skill-badge'>${skill}</span>`).join('')}</div>
      <div class="profile-section rating"><span class="profile-label">Rating:</span> <b>${user.rating}/5</b></div>
      <div class="profile-section feedback"><span class="profile-label">Feedback:</span><br>${user.feedback.map(f => `<div>• ${f}</div>`).join('')}</div>
      <button class="request-btn">Request</button>
    `;
    // Enable/disable Request button based on login
    const reqBtn = content.querySelector('.request-btn');
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser || !loggedInUser.isLoggedIn) {
      reqBtn.onclick = function() {
        alert('Please log in to send a request.');
      };
    } else {
      reqBtn.onclick = function() {
        // Pass mySkills and theirSkills via query string
        const mySkills = encodeURIComponent(['JavaScript','Python','UI/UX'].join(',')); // Replace with real user skills
        const theirSkills = encodeURIComponent(user.skillsWanted.join(','));
        window.location.href = `../page 5/request.html?userId=${user.id}&mySkills=${mySkills}&theirSkills=${theirSkills}`;
      };
    }
  }
}

function showWarning() {
  const content = document.getElementById('profileContent');
  content.innerHTML = `<div class="warning">⚠️ This profile is private.<br>Redirecting to home...</div>`;
  setTimeout(() => {
    window.location.href = '../page 1/index.html';
  }, 2000);
}

window.onload = function() {
  const userId = parseInt(getQueryParam('userId'), 10);
  const user = users.find(u => u.id === userId);
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  // Check if this is the logged-in user's own profile
  let isOwnProfile = false;
  if (loggedInUser && loggedInUser.isLoggedIn && loggedInUser.id == userId) {
    // Try to load from localStorage profile if available
    const storedProfile = JSON.parse(localStorage.getItem('profile'));
    if (storedProfile) {
      Object.assign(user, storedProfile);
    }
    isOwnProfile = true;
  }
  if (!user) {
    showWarning();
    return;
  }
  if (!user.makePublic && !isOwnProfile) {
    showWarning();
    return;
  }
  renderProfile(user, isOwnProfile);
}; 