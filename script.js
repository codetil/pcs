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

// Button click handlers
document.querySelector('.primary-button')?.addEventListener('click', () => {
  window.location.href = '/login.html';
});

document.querySelector('.secondary-button')?.addEventListener('click', () => {
  window.location.href = '/register.html';
});