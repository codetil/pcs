// Intensity Controller Class
class IntensityController {
  constructor() {
    this.currentIntensity = 0;
    this.currentFrequency = 0;
    this.isRunning = false;
    this.session = null;

    this.presets = {
      high: { intensity: 10, frequency: 150 },
      medium: { intensity: 5, frequency: 115 },
      low: { intensity: 1, frequency: 80 }
    };

    this.initializeControls();
    this.updateDisplay();
  }

  initializeControls() {
    const controls = document.querySelector('.intensity-controls');
    
    Object.entries(this.presets).forEach(([level, values]) => {
      const button = controls.querySelector(`.${level}-button`);
      if (button) {
        button.addEventListener('click', () => {
          this.setIntensity(values.intensity, values.frequency);
          this.updateActiveButton(level);
        });
      }
    });

    const startButton = document.querySelector('.start-session');
    if (startButton) {
      startButton.addEventListener('click', () => this.toggleSession());
    }
  }

  setIntensity(intensity, frequency) {
    this.currentIntensity = intensity;
    this.currentFrequency = frequency;
    this.updateDisplay();
  }

  updateDisplay() {
    const intensityValue = document.querySelector('.intensity-value');
    const frequencyValue = document.querySelector('.frequency-value');
    
    if (intensityValue) {
      intensityValue.textContent = this.currentIntensity;
    }
    if (frequencyValue) {
      frequencyValue.textContent = this.currentFrequency;
    }
  }

  updateActiveButton(level) {
    const buttons = document.querySelectorAll('.intensity-button');
    buttons.forEach(button => {
      button.classList.remove('active');
      if (button.classList.contains(`${level}-button`)) {
        button.classList.add('active');
      }
    });
  }

  toggleSession() {
    const startButton = document.querySelector('.start-session');
    if (!startButton) return;

    this.isRunning = !this.isRunning;
    startButton.textContent = this.isRunning ? 'Stop Session' : 'Start Session';
    startButton.classList.toggle('active', this.isRunning);

    if (this.isRunning) {
      this.startSession();
    } else {
      this.stopSession();
    }
  }

  startSession() {
    if (this.currentIntensity === 0 || this.currentFrequency === 0) {
      alert('Please select an intensity level before starting the session');
      this.isRunning = false;
      return;
    }

    // Simulate device communication
    console.log(`Starting session with intensity: ${this.currentIntensity}, frequency: ${this.currentFrequency}`);
    
    // Update status indicator
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.connection-status');
    if (statusDot && statusText) {
      statusDot.style.backgroundColor = '#22c55e';
      statusText.textContent = 'Active Session';
    }
  }

  stopSession() {
    // Simulate device communication
    console.log('Stopping session');
    
    // Update status indicator
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.connection-status');
    if (statusDot && statusText) {
      statusDot.style.backgroundColor = '#22c55e';
      statusText.textContent = 'Connected';
    }
  }
}

// Initialize controller
const intensityController = new IntensityController();