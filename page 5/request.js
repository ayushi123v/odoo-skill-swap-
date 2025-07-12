// For demo: get skills from query params or use mock data
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Mock: you can replace with real data or pass via query string
const mySkills = (getQueryParam('mySkills') ? getQueryParam('mySkills').split(',') : ['JavaScript', 'Python', 'UI/UX']);
const theirSkills = (getQueryParam('theirSkills') ? getQueryParam('theirSkills').split(',') : ['Photoshop', 'Graphic Design', 'Marketing']);
const userId = getQueryParam('userId');

const mySkillSelect = document.getElementById('mySkill');
const theirSkillSelect = document.getElementById('theirSkill');

mySkills.forEach(skill => {
  const opt = document.createElement('option');
  opt.value = skill;
  opt.textContent = skill;
  mySkillSelect.appendChild(opt);
});
theirSkills.forEach(skill => {
  const opt = document.createElement('option');
  opt.value = skill;
  opt.textContent = skill;
  theirSkillSelect.appendChild(opt);
});

document.getElementById('swapForm').onsubmit = function(e) {
  e.preventDefault();
  const mySkill = mySkillSelect.value;
  const theirSkill = theirSkillSelect.value;
  const message = document.getElementById('message').value.trim();
  alert(`Swap Request Sent!\nYour Skill: ${mySkill}\nTheir Skill: ${theirSkill}\nMessage: ${message}`);
  // Redirect back to the profile page of the person after alert is closed
  if (userId) {
    setTimeout(function() {
      window.location.href = `../page 4/profile.html?userId=${userId}`;
    }, 10);
  }
}; 