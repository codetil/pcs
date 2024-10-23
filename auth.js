// Theme functionality
const themeToggle = document.querySelector('.theme-toggle');
const isDarkStored = localStorage.getItem('darkMode') === 'true';

function setTheme(isDark) {
  localStorage.setItem('darkMode', isDark);
  document.documentElement.classList.toggle('dark', isDark);
  themeToggle.textContent = isDark ? '🌙' : '☀️';
}

// Initialize theme
setTheme(isDarkStored);

themeToggle.addEventListener('click', () => {
  const isDark = !document.documentElement.classList.contains('dark');
  setTheme(isDark);
});

// Form submission handlers
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    console.log('Login attempt:', { email, password, remember });
    // Add your login logic here
  });
}

if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    console.log('Register attempt:', { name, email, password });
    // Add your registration logic here
  });
}