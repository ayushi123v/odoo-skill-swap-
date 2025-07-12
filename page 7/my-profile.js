window.onload = function() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.isLoggedIn) {
    alert('Please log in to view your profile.');
    window.location.href = '../page 2/login.html';
    return;
  }
  // Mock fetch user info (replace with real fetch if backend exists)
  let profile = JSON.parse(localStorage.getItem('profile')) || {
    name: user.name,
    email: user.email,
    skillsOffered: '',
    skillsWanted: '',
    availability: '',
    password: '',
    photo: user.photo,
    makePublic: true
  };
  // Populate form
  document.getElementById('name').value = profile.name || '';
  document.getElementById('email').value = profile.email || user.email || '';
  document.getElementById('skillsOffered').value = profile.skillsOffered || '';
  document.getElementById('skillsWanted').value = profile.skillsWanted || '';
  document.getElementById('availability').value = profile.availability || '';
  document.getElementById('password').value = profile.password || '';
  document.getElementById('makePublic').value = profile.makePublic ? 'true' : 'false';
  // Photo preview
  const photoPreview = document.getElementById('photoPreview');
  if (profile.photo) {
    photoPreview.innerHTML = `<img src="${profile.photo}" alt="Profile Photo" />`;
  } else {
    photoPreview.innerHTML = 'Profile Photo';
  }
  document.getElementById('profilePhoto').onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Profile photo must be less than 2MB!');
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = function(evt) {
        photoPreview.innerHTML = `<img src="${evt.target.result}" alt="Profile Photo" />`;
        profile.photo = evt.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  document.getElementById('myProfileForm').onsubmit = function(ev) {
    ev.preventDefault();
    // Update profile object
    profile.name = document.getElementById('name').value;
    profile.skillsOffered = document.getElementById('skillsOffered').value;
    profile.skillsWanted = document.getElementById('skillsWanted').value;
    profile.availability = document.getElementById('availability').value;
    profile.password = document.getElementById('password').value;
    profile.makePublic = document.getElementById('makePublic').value === 'true';
    // Save to localStorage (simulate PUT request)
    localStorage.setItem('profile', JSON.stringify(profile));
    alert('Profile updated successfully!');
    // Optionally, send a PUT request to backend here
    // fetch(`/users/${user.id}`, { method: 'PUT', body: JSON.stringify(profile), headers: { 'Content-Type': 'application/json' } })
  };
}; 