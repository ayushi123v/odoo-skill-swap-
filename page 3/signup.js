const skills = ["Photoshop", "Excel", "JavaScript", "Cooking", "Drawing"];
const availabilityOptions = ["Weekends", "Evenings", "Mornings"];

function renderTags(containerId, values) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  values.forEach(skill => {
    const tag = document.createElement("div");
    tag.className = "tag";
    tag.innerText = skill;
    tag.onclick = () => tag.classList.toggle("selected");
    container.appendChild(tag);
  });
}

function showTab(tabId) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(tc => tc.style.display = "none");
  document.getElementById(tabId + '-tab').classList.add("active");
  document.getElementById(tabId).style.display = "block";
}

function saveProfile() {
  const name = document.getElementById('name').value;
  const location = document.getElementById('location').value;
  const skillsOffered = document.getElementById('offeredSkillsInput').value;
  const skillsWanted = document.getElementById('wantedSkillsInput').value;
  const availability = Array.from(document.getElementById('availability').children)
    .filter(tag => tag.classList.contains('selected')).map(tag => tag.innerText);
  const isPublic = document.getElementById('public').value === 'true';
  const photoInput = document.getElementById('profilePhoto');
  let photo = null;
  if (photoInput.files && photoInput.files[0]) {
    if (photoInput.files[0].size > 2 * 1024 * 1024) {
      alert('Profile photo must be less than 2MB!');
      return;
    }
    photo = photoInput.files[0].name;
  }
  const profile = { name, location, skillsOffered, skillsWanted, availability, isPublic, photo };
  localStorage.setItem('profile', JSON.stringify(profile));
  alert('Profile saved!');
}

// Only render tags for availability
renderTags("availability", availabilityOptions);