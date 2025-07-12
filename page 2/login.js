document.getElementById('loginForm').onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  if (!email.includes('@')) {
    alert('🛑 You entered an invalid Gmail address!');
    return false;
  }
  // Mock user info
  const user = {
    isLoggedIn: true,
    email: email,
    name: email.split('@')[0],
    photo: '../assets/avatar.png' // Replace with real photo if available
  };
  localStorage.setItem('user', JSON.stringify(user));
  alert('Login successful!');
  window.location.href = '../page 1/index.html';
  return false;
};
document.querySelector('.signup-link a').onclick = function(e) {
  e.preventDefault();
  window.location.href = '../page 3/signup.html';
}; 