'use strict';

////////////////////////////////////
// DOM Elements
const settingsBtn = document.querySelector('.settings-button');
const startBtn = document.querySelector('.start-timer');
const skipBtn = document.querySelector('.skip-timer');

const autoStartBreaksToggle = document.querySelector('.auto-start-breaks');
const autoStartPomodorosToggle = document.querySelector('.auto-start-pomos');

const pomodoroInput = document.getElementById('pomodoro-time');
const shortBreakInput = document.getElementById('short-break-time');
const longBreakInput = document.getElementById('long-break-time');
const longBreakIntervalInput = document.getElementById('long-break-interval');
const numberInputs = document.querySelectorAll('.number-input');

const timeLabel = document.querySelector('.remaining-time');
const timerStateLabel = document.querySelector('.timer-state-text');

const overlay = document.querySelector('.overlay');
const settingsDialog = document.querySelector('.settings-modal');

const mainContent = document.querySelector('main');
const header = document.querySelector('header');
const alertContainer = document.querySelector('.alert-container');
const progressCircle = document.querySelector('.progress-circle');

////////////////////////////////////
// Constants
const TIMER_INTERVAL = 1000;
const AUTO_START_DELAY = 3000;
const ALERT_DURATION = 1500;
const CIRCLE_CIRCUMFERENCE = 880;
const MAX_MINUTES = 100;
const MIN_MINUTES = 1;

const TIMER_STATES = {
  START: 'start',
  STOP: 'stop',
};

const SOUND_TYPES = {
  CLICK: 'click',
  RING: 'ring',
};

const SOUNDS = {
  click: new Audio('../Sounds/button-sound.mp3'),
  ring: new Audio('../Sounds/ring-sound.mp3'),
};

////////////////////////////////////
// Variables

// Declared a variable, so that I can clear the interval later in the code
let timerInterval;

////////////////////////////////////
// Timer Class
class PomodoroTimer {
  elapsedSeconds = 0;
  pomodoroCount = 0;
  isBreak = false;
  isRunning = false;
  constructor() {}

  get remainingSeconds() {
    return this.currentDuration - this.elapsedSeconds;
  }

  get currentDuration() {
    if (this.isBreak) {
      return this.pomodoroCount % settings.longBreakInterval === 0
        ? settings.durations.longBreak * 60
        : settings.durations.shortBreak * 60;
    } else return settings.durations.pomodoro * 60;
  }

  start() {
    // Start Timer and change isRunning state
    timerInterval = setInterval(timerLogic, TIMER_INTERVAL);
    this.isRunning = true;
  }

  stop() {
    // Stop Timer and change isRunning state
    clearInterval(timerInterval);
    this.isRunning = false;
  }

  nextPhase() {
    // Reset elapsed Seconds and isBreak state
    this.isBreak = !this.isBreak;
    this.elapsedSeconds = 0;
  }
}

// Settings Class
class Settings {
  // Default values
  durations = { pomodoro: 25, shortBreak: 5, longBreak: 15 };
  autoStartBreaks = false;
  autoStartPomodoros = false;
  longBreakInterval = 4;
  constructor() {
    const settings = JSON.parse(localStorage.getItem('settings'));

    // Overwrite settings, if there are settings saved in the localStorage
    if (settings) {
      this.durations = settings.durations;
      this.autoStartBreaks = settings.autoStartBreaks;
      this.autoStartPomodoros = settings.autoStartPomodoros;
      this.longBreakInterval = settings.longBreakInterval;
    }
  }

  update(
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
    autoStartBreaks,
    autoStartPomodoros,
    longBreakInterval,
  ) {
    this.durations.pomodoro = pomodoroDuration;
    this.durations.shortBreak = shortBreakDuration;
    this.durations.longBreak = longBreakDuration;
    this.autoStartBreaks = autoStartBreaks;
    this.autoStartPomodoros = autoStartPomodoros;
    this.longBreakInterval = longBreakInterval;
  }
}

////////////////////////////////////
// Timer Logic Functions

const timerLogic = () => {
  // 1. Increse elapsedSeconds
  timer.elapsedSeconds++;

  // 2. Get and render remainingSeconds
  renderTime(timer.remainingSeconds);

  // 3. Update Progress Circle
  updateCircleProgress(timer.currentDuration, timer.remainingSeconds);

  // 4. End Timer
  if (timer.remainingSeconds <= 0) {
    playSound(SOUND_TYPES.RING);
    handlePhaseEnd();
  }
};

// Starts or Stops the Timer, based on the state argument
const setTimerState = (state) => {
  timer?.[state]();
  startBtn.textContent = state === 'start' ? 'stop' : 'start';

  // Only visible if timer is running
  skipBtn.classList.toggle('collapse');
};

const completePhase = () => {
  // 1. Stop Timer
  setTimerState(TIMER_STATES.STOP);

  // 2. Show alert based on isBreak state
  if (timer.isBreak) {
    showAlert(`Break is over! 😑`);
  } else {
    showAlert(`Pomodoro is over! 🎉`);
    timer.pomodoroCount++;
  }

  // 2. switch Phase
  timer.nextPhase();

  // 4. Update UI
  resetCircleProgress();
  updateTimerStateLabel();
  console.log(timer.currentDuration);
  renderTime(timer.currentDuration);

  // 5. Play Sound
  playSound(SOUND_TYPES.RING);
};

// Handles Phase End based on the autoStart settings
const handlePhaseEnd = () => {
  if (timer.isBreak && settings.autoStartBreaks) autoStartNextPhase();
  else if (!timer.isBreak && settings.autoStartPomodoros) autoStartNextPhase();
  else completePhase();
};

// Starts the timer automatically after 1500 ms
const autoStartNextPhase = () => {
  completePhase();
  setTimeout(() => {
    setTimerState(TIMER_STATES.START);
  }, AUTO_START_DELAY);
};

////////////////////////////////////
// UI & Utility Functions

// Formats seconds into mm:ss format
const formatSeconds = (seconds) =>
  `${String(Math.floor(seconds / 60)).padStart(2, 0)}:${String(seconds % 60).padStart(2, 0)}`;

// Updates Time UI
const renderTime = (seconds) =>
  (timeLabel.textContent = formatSeconds(seconds));

// Updates timerState UI
const updateTimerStateLabel = () =>
  (timerStateLabel.textContent = timer.isBreak ? 'relax.' : 'focus.');

// Toggles the Settings Window
const toggleSettingsDialog = () => {
  overlay.classList.toggle('hidden');
  settingsDialog.classList.toggle('modal-hidden');
  settingsDialog.classList.toggle('modal-visible');
};

// Updates Circle Progress
const updateCircleProgress = (currentDuration, remainingDuration) => {
  const newOffset =
    CIRCLE_CIRCUMFERENCE * (remainingDuration / currentDuration);
  progressCircle.setAttribute('stroke-dashoffset', newOffset);
};

// Resets Circle Progress to 0
const resetCircleProgress = () =>
  progressCircle.setAttribute('stroke-dashoffset', CIRCLE_CIRCUMFERENCE);

// Shows an alert and hides it after 3000 ms
const showAlert = (text) => {
  alertContainer.textContent = text;
  alertContainer.classList.remove('alert-hidden');
  alertContainer.classList.add('alert-visible');

  setTimeout(() => {
    alertContainer.classList.remove('alert-visible');
    alertContainer.classList.add('alert-hidden');
  }, ALERT_DURATION);
};

// Wrapper Function for playing Sounds
const playSound = (soundName) => SOUNDS[soundName]?.play();

////////////////////////////////////
// Settings Handling

// Saves settings to localStorage
const updateLocalStorage = () => {
  const newSettings = JSON.stringify(settings);
  localStorage.setItem('settings', newSettings);
};

// Changes toggleButton UI based on the value in settings
const updateToggleButton = (toggleElement, isActive) => {
  const circle = toggleElement.querySelector('.toggle-button-circle');

  if (isActive) toggleElement.classList.add('bg-accent');
  else toggleElement.classList.remove('bg-accent');

  circle.classList.add(`toggle-${isActive}`);
  circle.classList.remove(`toggle-${!isActive}`);
};

// Renders the Settings UI based on settings
const renderSettings = () => {
  pomodoroInput.value = settings.durations.pomodoro;
  shortBreakInput.value = settings.durations.shortBreak;
  longBreakInput.value = settings.durations.longBreak;
  longBreakIntervalInput.value = settings.longBreakInterval;

  updateToggleButton(autoStartBreaksToggle, settings.autoStartBreaks);
  updateToggleButton(autoStartPomodorosToggle, settings.autoStartPomodoros);
};

// Returns bool value based on the toggleButton's state
const getToggleState = (toggleBtn) =>
  toggleBtn
    .querySelector('.toggle-button-circle')
    .classList.contains('toggle-true');

// Changes toggleButton UI on every click
const handleToggleButton = (toggleBtn) => {
  const toggleCircle = toggleBtn.querySelector('.toggle-button-circle');
  toggleCircle.classList.toggle('toggle-false');
  toggleCircle.classList.toggle('toggle-true');
  toggleBtn.classList.toggle('bg-accent');
};

// Allows values only between MIN_MINUTES and MAX_MINUTES
const validateSettingsInputs = () => {
  numberInputs.forEach((input) => {
    if (input.value >= MAX_MINUTES) input.value = MAX_MINUTES;
    if (input.value < MIN_MINUTES) input.value = MIN_MINUTES;
  });
};

// Handles the save logic
const handleSaveSettings = () => {
  // 1. Play Sound
  playSound(SOUND_TYPES.CLICK);

  // 2. Validate Inputs
  validateSettingsInputs();

  // 3. Get the bool value of the toggleButtons
  const autoStartBreaks = getToggleState(autoStartBreaksToggle);
  const autoStartPomodoros = getToggleState(autoStartPomodorosToggle);

  // 4. Update Settings
  settings.update(
    +pomodoroInput.value,
    +shortBreakInput.value,
    +longBreakInput.value,
    autoStartBreaks,
    autoStartPomodoros,
    +longBreakIntervalInput.value,
  );

  updateLocalStorage();

  // 5. Close Window & Render new Settings
  toggleSettingsDialog();
  renderSettings();

  // 6. Render Time
  // If remainingSeconds are 0, use currentDuration
  renderTime(timer.remainingSeconds || timer.currentDuration);

  // 8. Show Alert
  showAlert('Settings saved! ✅');
};

// Handles the close settings logic
const handleSettingsClose = () => {
  playSound(SOUND_TYPES.CLICK);
  toggleSettingsDialog();

  // TODO Reset Toggle Buttons based on the saved settings state

  // Remove Tabbing for settings dialog
  settingsDialog.setAttribute('inert', '');

  // TODO Bug Fixing
  // Allow Tabbing for the main page
  header.removeAttribute('inert');
  mainContent.removeAttribute('inert');
};

////////////////////////////////////
// Event Handling Functions

// Handles the open settings logic
const handleSettingsOpen = () => {
  toggleSettingsDialog();
  playSound(SOUND_TYPES.CLICK);

  // Allow Tabbing for Settings Dialog
  settingsDialog.removeAttribute('inert');

  // TODO Bug Fixing
  // Remove Tabbing for the main page
  header.setAttribute('inert', '');
  mainContent.setAttribute('inert', '');
};

// Handles the start/stop timer button logic
const handleTimerToggle = () => {
  playSound(SOUND_TYPES.CLICK);

  // isRunning is false at the beginning, so the timer starts on the first click
  if (!timer.isRunning) setTimerState(TIMER_STATES.START);
  // Timer stops and isRunning gets true
  else setTimerState(TIMER_STATES.STOP);
};

// Handles the skip button logic
const handlePhaseSkip = () => {
  playSound(SOUND_TYPES.CLICK);

  // Switchs to next phase
  handlePhaseEnd();
};

////////////////////////////////////
// Events
settingsBtn.addEventListener('click', handleSettingsOpen);

settingsDialog.addEventListener('click', (e) => {
  const clickedElement = e.target;
  const toggleBtn = clickedElement.closest('.toggle-button');
  const saveBtn = clickedElement.closest('.save-settings');
  const closeBtn = clickedElement.closest('.close-settings');

  // Event Delegation
  if (closeBtn) handleSettingsClose();
  if (toggleBtn) handleToggleButton(toggleBtn);
  if (saveBtn) handleSaveSettings();
});

startBtn.addEventListener('click', handleTimerToggle);

skipBtn.addEventListener('click', handlePhaseSkip);

document.addEventListener('keydown', function (e) {
  if (e.key === ' ') {
    // Click Start/Stop Button
    startBtn.click();

    // Scale Button
    startBtn.classList.add('button-active');

    // Remove the Scaling, so it feels like a real click
    setTimeout(() => startBtn.classList.remove('button-active'), 200);
  }
});

////////////////////////////////////
// Initialization
const timer = new PomodoroTimer();
const settings = new Settings();
renderSettings();
renderTime(settings.durations.pomodoro * 60);

// BUG Nachdem der user auf "save settings" klickt, kann er nichts mehr klicken
// BUG toggle button UI bleibt geändert, selbst wenn der user nicht auf save klickt
// TODO
// 2. Split Code into Modules
// 3. Implement Tasks Logic
