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

// Profile functionality
document.querySelector('.secondary-button').addEventListener('click', () => {
  // Add edit profile logic here
  console.log('Edit profile clicked');
});

document.querySelector('.danger-button').addEventListener('click', () => {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    console.log('Account deletion confirmed');
    // Add account deletion logic here
  }
});