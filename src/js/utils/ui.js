import { CIRCLE_CIRCUMFERENCE, ALERT_DURATION } from './constants.js';
import { settings, timer, startBtn, skipBtn } from '../main.js';
import { settingsInputs } from '../logic/settingsLogic.js';

////////////////////////////
// DOM ELEMENTS
////////////////////////////

const alertContainer = document.querySelector('.alert-container');
const progressCircle = document.querySelector('.progress-circle');

const timeLabel = document.querySelector('.remaining-time');
const timerStateLabel = document.querySelector('.timer-state-text');

const overlay = document.querySelector('.overlay');
export const settingsDialog = document.querySelector('.settings-modal');

const mainContent = document.querySelector('main');
const header = document.querySelector('header');

////////////////////////////
// FUNCTIONS
////////////////////////////
// Updates Circle Progress
export const updateCircleProgress = (currentDuration, remainingDuration) => {
  const newOffset =
    CIRCLE_CIRCUMFERENCE * (remainingDuration / currentDuration);
  progressCircle.setAttribute('stroke-dashoffset', newOffset);
};

// Resets Circle Progress to 0
export const resetCircleProgress = () =>
  progressCircle.setAttribute('stroke-dashoffset', CIRCLE_CIRCUMFERENCE);

// Shows an alert and hides it after 3000 ms
export const showAlert = (text) => {
  alertContainer.textContent = text;
  alertContainer.classList.remove('alert-hidden');
  alertContainer.classList.add('alert-visible');

  setTimeout(() => {
    alertContainer.classList.remove('alert-visible');
    alertContainer.classList.add('alert-hidden');
  }, ALERT_DURATION);
};

// Changes toggleButton UI based on the value in settings
const updateToggleButton = (toggleElement, isActive) => {
  const circle = toggleElement.querySelector('.toggle-button-circle');

  if (isActive) toggleElement.classList.add('bg-accent');
  else toggleElement.classList.remove('bg-accent');

  circle.classList.add(`toggle-${isActive}`);
  circle.classList.remove(`toggle-${!isActive}`);
};

// Formats seconds into mm:ss format
const formatSeconds = (seconds) =>
  `${String(Math.floor(seconds / 60)).padStart(2, 0)}:${String(seconds % 60).padStart(2, 0)}`;

// Updates Time UI
export const renderTime = (seconds) =>
  (timeLabel.textContent = formatSeconds(seconds));

// Updates timerState UI
export const updateTimerStateLabel = () =>
  (timerStateLabel.textContent = timer.isBreak ? 'relax.' : 'focus.');

// Toggles the Settings Window
export const toggleSettingsDialog = () => {
  overlay.classList.toggle('hidden');
  settingsDialog.classList.toggle('modal-hidden');
  settingsDialog.classList.toggle('modal-visible');

  // Toggle the inert Attribute, so that tabbing works the correct way
  settingsDialog.toggleAttribute('inert');
  header.toggleAttribute('inert');
  mainContent.toggleAttribute('inert');
};

// Renders the Settings UI based on settings
export const renderSettings = () => {
  // Added a timeout, so the user can't see the toggle button toggling back ;D
  setTimeout(() => {
    settingsInputs.pomodoro.value = settings.durations.pomodoro;
    settingsInputs.shortBreak.value = settings.durations.shortBreak;
    settingsInputs.longBreak.value = settings.durations.longBreak;
    settingsInputs.longBreakInterval.value = settings.longBreakInterval;

    updateToggleButton(
      settingsInputs.autoStartBreaks,
      settings.autoStartBreaks,
    );
    updateToggleButton(
      settingsInputs.autoStartPomodoros,
      settings.autoStartPomodoros,
    );
  }, 100);
};

// Starts or Stops the Timer, based on the state argument
export const setTimerState = (state) => {
  timer?.[state]();
  startBtn.textContent = state === 'start' ? 'stop' : 'start';

  // Only visible if timer is running
  skipBtn.classList.toggle('collapse');
};
