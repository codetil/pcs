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

// Calendar functionality
class PeriodTracker {
  constructor() {
    this.currentDate = new Date();
    this.selectedMonth = this.currentDate.getMonth();
    this.selectedYear = this.currentDate.getFullYear();
    
    // Load period data from localStorage or use defaults
    this.periodData = JSON.parse(localStorage.getItem('periodData')) || {
      periods: [],
      cycleLength: 28,
      periodLength: 5
    };

    this.initializeCalendar();
    this.setupEventListeners();
    this.updateNextPeriodInfo();
  }

  initializeCalendar() {
    this.updateCalendarHeader();
    this.generateCalendarDays();
  }

  setupEventListeners() {
    const prevButton = document.querySelector('.calendar-nav:first-child');
    const nextButton = document.querySelector('.calendar-nav:last-child');

    prevButton.addEventListener('click', () => this.changeMonth(-1));
    nextButton.addEventListener('click', () => this.changeMonth(1));
  }

  changeMonth(delta) {
    this.selectedMonth += delta;
    
    if (this.selectedMonth > 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    } else if (this.selectedMonth < 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    }

    this.initializeCalendar();
  }

  updateCalendarHeader() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const headerText = `${monthNames[this.selectedMonth]} ${this.selectedYear}`;
    document.querySelector('.calendar-header h3').textContent = headerText;
  }

  getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  getFirstDayOfMonth(month, year) {
    return new Date(year, month, 1).getDay();
  }

  togglePeriodDay(date) {
    const dateStr = date.toISOString().split('T')[0];
    const periodIndex = this.periodData.periods.findIndex(p => p === dateStr);
    
    if (periodIndex === -1) {
      // Add new period day
      this.periodData.periods.push(dateStr);
    } else {
      // Remove period day
      this.periodData.periods.splice(periodIndex, 1);
    }
    
    // Sort periods chronologically
    this.periodData.periods.sort();
    
    // Save to localStorage
    localStorage.setItem('periodData', JSON.stringify(this.periodData));
    
    // Update calendar and predictions
    this.updateNextPeriodInfo();
    this.generateCalendarDays();
  }

  isPeriodDay(date) {
    const dateStr = date.toISOString().split('T')[0];
    return this.periodData.periods.includes(dateStr);
  }

  isPredictedPeriodDay(date) {
    if (this.periodData.periods.length === 0) return false;
    
    const dateTime = date.getTime();
    const lastPeriod = new Date(this.periodData.periods[this.periodData.periods.length - 1]);
    const daysSinceLastPeriod = Math.floor((dateTime - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    const cycleDay = ((daysSinceLastPeriod % this.periodData.cycleLength) + this.periodData.cycleLength) 
                    % this.periodData.cycleLength;
    
    // Only show predictions for future dates
    if (date < new Date()) return false;
    
    return cycleDay < this.periodData.periodLength;
  }

  updateNextPeriodInfo() {
    if (this.periodData.periods.length > 0) {
      const lastPeriod = new Date(this.periodData.periods[this.periodData.periods.length - 1]);
      const nextPeriod = new Date(lastPeriod);
      nextPeriod.setDate(nextPeriod.getDate() + this.periodData.cycleLength);
      
      const nextPeriodEl = document.querySelector('.next-period');
      if (nextPeriodEl) {
        nextPeriodEl.textContent = nextPeriod.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });
      }
    }
  }

  generateCalendarDays() {
    const calendarGrid = document.querySelector('.calendar-grid');
    calendarGrid.innerHTML = '';

    // Add weekday headers
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekdays.forEach(day => {
      const dayEl = document.createElement('div');
      dayEl.className = 'calendar-day header';
      dayEl.textContent = day;
      calendarGrid.appendChild(dayEl);
    });

    const daysInMonth = this.getDaysInMonth(this.selectedMonth, this.selectedYear);
    const firstDay = this.getFirstDayOfMonth(this.selectedMonth, this.selectedYear);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement('span');
      emptyDay.className = 'empty-day';
      calendarGrid.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(this.selectedYear, this.selectedMonth, day);
      const dayEl = document.createElement('span');
      dayEl.textContent = day;
      
      if (this.isPeriodDay(date)) {
        dayEl.className = 'period-day';
      } else if (this.isPredictedPeriodDay(date)) {
        dayEl.className = 'predicted-day';
      }
      
      // Highlight today
      if (date.toDateString() === new Date().toDateString()) {
        dayEl.classList.add('today');
      }
      
      // Add click handler for period tracking
      dayEl.addEventListener('click', () => this.togglePeriodDay(date));
      
      calendarGrid.appendChild(dayEl);
    }
  }
}

// Initialize calendar
const periodTracker = new PeriodTracker();

// Update current date
const dateEl = document.querySelector('.date');
dateEl.textContent = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});