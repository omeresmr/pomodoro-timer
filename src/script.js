'use strict';

////////////////////////////////////
// DOM Elements
const settingsBtn = document.querySelector('.settings-button');
const closeSettingsBtn = document.querySelector('.close-settings-modal');
const startBtn = document.querySelector('.start-timer');
const skipBtn = document.querySelector('.skip-timer');

const timeLabel = document.querySelector('.remaining-time');

const overlay = document.querySelector('.overlay');
const settingsDialog = document.querySelector('.settings-modal');

////////////////////////////////////
// Constants

////////////////////////////////////
// Variables
const appSettings = {
  durations: { pomodoro: 25, shortBreak: 5, longBreak: 15 },
  autoStartBreaks: false,
  autoStartPomodoros: false,
  longBreakInterval: 4,
};

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

const switchPhase = function () {
  timer.isBreak = !timer.isBreak;
  timer.isRunning = !timer.isRunning;
  timer.elapsedSeconds = 0;
  if (timer.isBreak) timer.pomodoroCount++;
  timer.updateDuration();
  stopTimer();
  renderTime(timer.currentDuration);
  skipBtn.classList.toggle('collapse');
};

const startNextPhase = function () {
  timer.isBreak = !timer.isBreak;
  timer.elapsedSeconds = 0;
  if (timer.isBreak) timer.pomodoroCount++;
  timer.updateDuration();
};

////////////////////////////////////
// Events
settingsBtn.addEventListener('click', toggleSettingsDialog);

settingsDialog.addEventListener('click', function (e) {
  const clickedElement = e.target;
  // Select Toggle Button
  const toggleBtn = clickedElement.closest('.toggle-button');

  // Select Save Settings Button
  const saveBtn = clickedElement.closest('.save-settings');

  // Update the Toggle Button UI
  if (toggleBtn) {
    // Select the Circle in the Toggle Button
    const knob = toggleBtn.querySelector('.toggle-button-circle');

    // Change the Position of the Circle (left or right)
    knob.classList.toggle('toggle-inactive');
    knob.classList.toggle('toggle-active');

    // Change the Background-Color
    toggleBtn.classList.toggle('bg-accent');
  }

  // Save Settings
  if (saveBtn) {
    // Get all the Settings
    const numberInputs = document.querySelectorAll('.number-input');

    const pomodoroInput = document.getElementById('pomodoro-time');
    const shortBreakInput = document.getElementById('short-break-time');
    const longBreakInput = document.getElementById('long-break-time');
    const longBreakIntervalInput = document.getElementById(
      'long-break-interval',
    );

    const autoStartBreaksToggle = document.querySelector('.auto-start-breaks');
    const autoStartPomodorosToggle =
      document.querySelector('.auto-start-pomos');

    // If the user entered a number bigger than 100, reduce it to 100
    numberInputs.forEach((input) =>
      input.value >= 100 ? (input.value = 100) : input.value,
    );

    // Get the Boolean Value of the Toggle Button Settings
    const autoStartBreaks = autoStartBreaksToggle
      .querySelector('.toggle-button-circle')
      .classList.contains('toggle-active');

    const autoStartPomodoros = autoStartPomodorosToggle
      .querySelector('.toggle-button-circle')
      .classList.contains('toggle-active');

    // Overwrite Settings Object
    appSettings.durations.pomodoro = pomodoroInput.value;
    appSettings.durations.shortBreak = shortBreakInput.value;
    appSettings.durations.longBreak = longBreakInput.value;
    appSettings.longBreakInterval = longBreakIntervalInput.value;
    appSettings.autoStartBreaks = autoStartBreaks;
    appSettings.autoStartPomodoros = autoStartPomodoros;

    // TODO Show Alert

    // Update new Timer Time
    timer.updateDuration();

    // Update Time UI
    renderTime(timer.remainingSeconds);

    // Hide Settings Modal
    toggleSettingsDialog();
  }
});

startBtn.addEventListener('click', function () {
  // Check Running State
  if (!timer.isRunning) {
    timerInterval = setInterval(function () {
      timer.elapsedSeconds++;
      timer.remainingSeconds = timer.currentDuration - timer.elapsedSeconds;
      renderTime(timer.remainingSeconds);

      if (timer.remainingSeconds <= 0) {
        if (timer.isBreak && appSettings.autoStartBreaks) {
          startNextPhase();
        } else if (!timer.isBreak && appSettings.autoStartPomodoros) {
          startNextPhase();
        } else switchPhase();
      }
    }, 1000);

    startBtn.textContent = 'stop';
  } else stopTimer();

  timer.isRunning = !timer.isRunning;
  skipBtn.classList.toggle('collapse');
});

skipBtn.addEventListener('click', function () {
  if (timer.isBreak && appSettings.autoStartBreaks) startNextPhase();
  else if (!timer.isBreak && appSettings.autoStartPomodoros) startNextPhase();
  else switchPhase();
});

closeSettingsBtn.addEventListener('click', toggleSettingsDialog);

////////////////////////////////////
// Initialization
renderTime(appSettings.durations.pomodoro * 60);

timer.updateDuration();

// TODO
// 1. Settings implementieren DONE
// 2. LocalStorage implementieren
// 2. Alerts implementieren
// 3. Sounds implementieren
// 4. Der Kreis soll sich füllen.. 💀💀💀
// 5. Leertaste soll den Timer Starten/Beenden, Focusable von allen Elementen entfernen
// 6. Code säubern, Kommentarzeilen hinzufügen

// TODO Update Ideas
// 1. Let the Timer "AutoStart" but stop it first and then start it in 5 seconds automatically
