'use strict';

////////////////////////////////////
// DOM Elements
const settingsButton = document.querySelector('.settings-button');
const closeSettingsButton = document.querySelector('.close-settings-modal');
const startTimerButton = document.querySelector('.start-timer');
const skipTimerButton = document.querySelector('.skip-timer');

const remainingTimeLabel = document.querySelector('.remaining-time');

const blurOverlay = document.querySelector('.overlay');
const settingsModal = document.querySelector('.settings-modal');

////////////////////////////////////
// Constants

////////////////////////////////////
// Variables
const settings = {
  timerTimes: { pomodoroTime: 25, shortBreakTime: 5, longBreakTime: 15 },
  autoStartBreaks: false,
  autoStartPomos: false,
  longBreakInterval: 4,
};

const pomodoro = {
  isBreakTime: false,
  pomodoroCount: 0,
  isTimerRunning: false,
  updateTimerTime() {
    if (this.isBreakTime) {
      remainingSeconds =
        this.pomodoroCount % settings.longBreakInterval === 0
          ? settings.timerTimes.longBreakTime * 60
          : settings.timerTimes.shortBreakTime * 60;
    } else remainingSeconds = settings.timerTimes.pomodoroTime * 60;
  },
};

let timer, remainingSeconds;

////////////////////////////////////
// Functions
const formatSecondsToTime = (seconds) =>
  `${String(Math.floor(seconds / 60)).padStart(2, 0)}:${String(seconds % 60).padStart(2, 0)}`;

const toggleSettingsModal = function () {
  blurOverlay.classList.toggle('hidden');
  settingsModal.classList.toggle('modal-hidden');
  settingsModal.classList.toggle('modal-visible');

  console.log(settingsModal.clientWidth);
};

const displayTime = function (seconds) {
  remainingTimeLabel.textContent = formatSecondsToTime(seconds);
};

const stopTimer = function () {
  clearInterval(timer);
  startTimerButton.textContent = 'start';
};

const switchTimerType = function () {
  pomodoro.isBreakTime = !pomodoro.isBreakTime;
  pomodoro.isTimerRunning = !pomodoro.isTimerRunning;
  if (pomodoro.isBreakTime) pomodoro.pomodoroCount++;
  pomodoro.updateTimerTime();
  stopTimer();
  displayTime(remainingSeconds);
  skipTimerButton.classList.toggle('collapse');
};

////////////////////////////////////
// Events
settingsButton.addEventListener('click', toggleSettingsModal);

settingsModal.addEventListener('click', function (e) {
  const clickedElement = e.target;
  // Select Toggle Button
  const toggleButton = clickedElement.closest('.toggle-button');

  // Check if the Toggle Button got clicked
  if (toggleButton) {
    // Select the Circle in the Toggle Button
    const circle = toggleButton.querySelector('.toggle-button-circle');

    // Change the Position of the Circle (left or right)
    circle.classList.toggle('toggle-inactive');
    circle.classList.toggle('toggle-active');

    // Change the Background-Color
    toggleButton.classList.toggle('bg-accent');
  }
});

startTimerButton.addEventListener('click', function () {
  // Check Running State
  if (!pomodoro.isTimerRunning) {
    timer = setInterval(function () {
      remainingSeconds--;
      displayTime(remainingSeconds);

      if (remainingSeconds <= 0) switchTimerType();
    }, 1000);

    startTimerButton.textContent = 'stop';
  } else stopTimer();

  pomodoro.isTimerRunning = !pomodoro.isTimerRunning;
  skipTimerButton.classList.toggle('collapse');
});

skipTimerButton.addEventListener('click', switchTimerType);

closeSettingsButton.addEventListener('click', toggleSettingsModal);

////////////////////////////////////
// Initialization
displayTime(settings.timerTimes.pomodoroTime * 60);

pomodoro.updateTimerTime();
