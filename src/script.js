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

const alertContainer = document.querySelector('.alert-container');

const progressCircle = document.querySelector('.progress-circle');

////////////////////////////////////
// Constants
const CIRCUMFERENCE = 880;

////////////////////////////////////
// Variables
const defaultSettings = {
  durations: { pomodoro: 25, shortBreak: 5, longBreak: 15 },
  autoStartBreaks: false,
  autoStartPomodoros: false,
  longBreakInterval: 4,
};

// If there are saved settings in the localStorage, use them. If not, use the Default Settings
let appSettings =
  JSON.parse(localStorage.getItem('settings')) || defaultSettings;

const timer = {
  currentDuration: appSettings.durations.pomodoro * 60,
  elapsedSeconds: 0,
  pomodoroCount: 0,
  isBreak: false,
  isRunning: false,
  remainingSeconds: 0,
  updateDuration() {
    if (this.isBreak) {
      this.currentDuration =
        this.pomodoroCount % appSettings.longBreakInterval === 0
          ? appSettings.durations.longBreak * 60
          : appSettings.durations.shortBreak * 60;
    } else this.currentDuration = appSettings.durations.pomodoro * 60;
  },
};

let timerInterval;

const ringSound = new Audio('../Sounds/ring-sound.mp3');
const buttonSound = new Audio('../Sounds/button-sound.mp3');

////////////////////////////////////
// Functions
const formatSeconds = (seconds) =>
  `${String(Math.floor(seconds / 60)).padStart(2, 0)}:${String(seconds % 60).padStart(2, 0)}`;

const toggleSettingsDialog = function () {
  overlay.classList.toggle('hidden');
  settingsDialog.classList.toggle('modal-hidden');
  settingsDialog.classList.toggle('modal-visible');
};

const renderTime = function (seconds) {
  timeLabel.textContent = formatSeconds(seconds);
};

const stopTimer = function () {
  clearInterval(timerInterval);
  startBtn.textContent = 'start';
};

const startTimer = function () {
  timerInterval = setInterval(timerLogic, 1000);
  startBtn.textContent = 'stop';
};

const timerLogic = function () {
  timer.elapsedSeconds++;
  timer.remainingSeconds = timer.currentDuration - timer.elapsedSeconds;
  renderTime(timer.remainingSeconds);
  updateCircleProgress(timer.currentDuration, timer.remainingSeconds);

  if (timer.remainingSeconds <= 0) {
    ringSound.play();
    if (timer.isBreak && appSettings.autoStartBreaks) {
      startNextPhase();
    } else if (!timer.isBreak && appSettings.autoStartPomodoros) {
      startNextPhase();
    } else switchPhase();
  }
};

const switchPhase = function () {
  timer.isBreak = !timer.isBreak;
  if (!timer.isBreak) {
    showAlert(`Break is over! 😑`);
  } else {
    showAlert(`Pomodoro is over! 🎉`);
    timer.pomodoroCount++;
  }
  updateTimerStateLabel();
  timer.isRunning = !timer.isRunning;
  timer.elapsedSeconds = 0;
  console.log(timer);
  timer.updateDuration();
  stopTimer();
  renderTime(timer.currentDuration);
  skipBtn.classList.toggle('collapse');
  resetCircleProgress();
};

const startNextPhase = function () {
  // Logic for Auto Starting next Phase

  if (timer.isBreak) {
    showAlert(`Break is over! 😑`);
  } else {
    showAlert(`Pomodoro is over! 🎉`);
    timer.pomodoroCount++;
  }

  timer.isBreak = !timer.isBreak;
  updateTimerStateLabel();
  timer.elapsedSeconds = 0;
  timer.updateDuration();
  renderTime(timer.currentDuration);

  // Stop Timer
  stopTimer();
  resetCircleProgress();

  // Start it again after 5 seconds
  setTimeout(() => {
    startTimer();
  }, 3000);
};

const updateTimerStateLabel = function () {
  timerStateLabel.textContent = timer.isBreak ? 'relax.' : 'focus.';
};

const updateLocalStorage = function () {
  const settings = JSON.stringify(appSettings);
  localStorage.setItem('settings', settings);
};

const loadLocalStorage = function () {
  const settings = JSON.parse(localStorage.getItem('settings'));
  if (settings) {
    appSettings = settings;
  }
};

const loadAndRenderSettings = function () {
  if (appSettings && appSettings !== defaultSettings) {
    const autoStartBreaksBtn = autoStartBreaksToggle.querySelector(
      '.toggle-button-circle',
    );

    const autoStartPomodorosBtn = autoStartPomodorosToggle.querySelector(
      '.toggle-button-circle',
    );

    pomodoroInput.value = appSettings.durations.pomodoro;
    shortBreakInput.value = appSettings.durations.shortBreak;
    longBreakInput.value = appSettings.durations.longBreak;
    longBreakIntervalInput.value = appSettings.longBreakInterval;

    if (appSettings.autoStartBreaks)
      autoStartBreaksToggle.classList.add('bg-accent');
    else autoStartBreaksToggle.classList.remove('bg-accent');

    autoStartBreaksBtn.classList.add(`toggle-${appSettings.autoStartBreaks}`);
    autoStartBreaksBtn.classList.remove(
      `toggle-${!appSettings.autoStartBreaks}`,
    );

    if (appSettings.autoStartPomodoros)
      autoStartPomodorosToggle.classList.add('bg-accent');
    else autoStartPomodorosToggle.classList.remove('bg-accent');

    autoStartPomodorosBtn.classList.add(
      `toggle-${appSettings.autoStartPomodoros}`,
    );
    autoStartPomodorosBtn.classList.remove(
      `toggle-${!appSettings.autoStartPomodoros}`,
    );
  }
};

const showAlert = function (text) {
  alertContainer.textContent = text;
  alertContainer.classList.remove('alert-hidden');
  alertContainer.classList.add('alert-visible');

  setTimeout(() => {
    alertContainer.classList.toggle('alert-visible');
    alertContainer.classList.toggle('alert-hidden');
  }, 1500);
};

const updateCircleProgress = function (currentDuration, remainingDuration) {
  const newOffset = CIRCUMFERENCE * (remainingDuration / currentDuration);

  progressCircle.setAttribute('stroke-dashoffset', newOffset);
};

const resetCircleProgress = () =>
  progressCircle.setAttribute('stroke-dashoffset', 880);

////////////////////////////////////
// Events
settingsBtn.addEventListener('click', function () {
  toggleSettingsDialog();
  buttonSound.play();
});

settingsDialog.addEventListener('click', function (e) {
  const clickedElement = e.target;
  // Select Toggle Button
  const toggleBtn = clickedElement.closest('.toggle-button');

  // Select Save Settings Button
  const saveBtn = clickedElement.closest('.save-settings');

  // Select Close Settings Button
  const closeBtn = clickedElement.closest('.close-settings');

  if (closeBtn) {
    buttonSound.play();
    toggleSettingsDialog();
  }

  // Update the Toggle Button UI
  if (toggleBtn) {
    // Select the Circle in the Toggle Button
    const knob = toggleBtn.querySelector('.toggle-button-circle');

    // Change the Position of the Circle (left or right)
    knob.classList.toggle('toggle-false');
    knob.classList.toggle('toggle-true');

    // Change the Background-Color
    toggleBtn.classList.toggle('bg-accent');
  }

  // Save Settings
  if (saveBtn) {
    buttonSound.play();

    // If the user entered a number bigger than 100, reduce it to 100
    numberInputs.forEach((input) =>
      input.value >= 100 ? (input.value = 100) : input.value,
    );

    // Get the Boolean Value of the Toggle Button Settings
    const autoStartBreaks = autoStartBreaksToggle
      .querySelector('.toggle-button-circle')
      .classList.contains('toggle-true');

    const autoStartPomodoros = autoStartPomodorosToggle
      .querySelector('.toggle-button-circle')
      .classList.contains('toggle-true');

    // Overwrite Settings Object
    appSettings.durations.pomodoro = +pomodoroInput.value;
    appSettings.durations.shortBreak = +shortBreakInput.value;
    appSettings.durations.longBreak = +longBreakInput.value;
    appSettings.longBreakInterval = +longBreakIntervalInput.value;
    appSettings.autoStartBreaks = autoStartBreaks;
    appSettings.autoStartPomodoros = autoStartPomodoros;

    // Hide Settings Modal
    toggleSettingsDialog();

    // Save to localStorage
    updateLocalStorage();

    loadAndRenderSettings();

    // Update new Timer Time
    timer.updateDuration();

    renderTime(timer.currentDuration * 60);

    // Update Time UI
    timer.remainingSeconds
      ? renderTime(timer.remainingSeconds)
      : renderTime(timer.currentDuration);

    // Show Alert
    showAlert('Settings saved! ✅');
  }
});

startBtn.addEventListener('click', function () {
  buttonSound.play();
  // Check Running State
  if (!timer.isRunning) startTimer();
  else stopTimer();

  timer.isRunning = !timer.isRunning;
  skipBtn.classList.toggle('collapse');
});

skipBtn.addEventListener('click', function () {
  buttonSound.play();

  if (timer.isBreak && appSettings.autoStartBreaks) startNextPhase();
  else if (!timer.isBreak && appSettings.autoStartPomodoros) startNextPhase();
  else switchPhase();
});

////////////////////////////////////
// Initialization
loadLocalStorage();
loadAndRenderSettings();

renderTime(appSettings.durations.pomodoro * 60);

timer.updateDuration();

// TODO
// 5. Leertaste soll den Timer Starten/Beenden
// 5.1 Focusable von allen Elementen entfernen
// 5.2 TabStops implementieren
// 6. Code säubern, Kommentarzeilen hinzufügen
// 6.1 Jeden DRY Code entfernen
// 6.2 Große Zeilenblöcke in eigene Funktionen Packen (Lesbarkeit erhöhen)
// 6.3 Kommentarzeilen hinzufügen
