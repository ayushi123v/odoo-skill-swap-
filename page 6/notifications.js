// Mock swap requests
const mockRequests = [
  {
    senderName: 'Alice',
    senderPhoto: '../assets/avatar.png',
    offeredSkill: 'JavaScript',
    message: 'Let’s swap skills!'
  },
  {
    senderName: 'Bob',
    senderPhoto: '../assets/avatar.png',
    offeredSkill: 'Python',
    message: 'Interested in your design skills.'
  }
];

const user = JSON.parse(localStorage.getItem('user'));
const notifList = document.getElementById('notifList');

if (!user || !user.isLoggedIn) {
  notifList.innerHTML = '<div style="color:#b91c1c;text-align:center;">Please log in to view your notifications.</div>';
} else {
  notifList.innerHTML = '';
  mockRequests.forEach(req => {
    const card = document.createElement('div');
    card.className = 'notif-card';
    card.innerHTML = `
      <span class="sender-avatar"><img src="${req.senderPhoto}" alt="Sender" /></span>
      <div class="notif-info">
        <div class="sender-name">${req.senderName}</div>
        <div class="offered-skill">Offered Skill: <b>${req.offeredSkill}</b></div>
        <div class="notif-message">${req.message}</div>
      </div>
      <div class="notif-actions">
        <button class="accept-btn">Accept</button>
        <button class="reject-btn">Reject</button>
      </div>
    `;
    notifList.appendChild(card);
  });
} 