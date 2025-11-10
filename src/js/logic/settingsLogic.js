import { MAX_MINUTES, MIN_MINUTES } from '../utils/constants.js';
import { settings } from '../main.js';

////////////////////////////
// DOM ELEMENTS
////////////////////////////

export const settingsInputs = {
  pomodoro: document.getElementById('pomodoro-time'),
  shortBreak: document.getElementById('short-break-time'),
  longBreak: document.getElementById('long-break-time'),
  longBreakInterval: document.getElementById('long-break-interval'),
  autoStartBreaks: document.querySelector('.auto-start-breaks'),
  autoStartPomodoros: document.querySelector('.auto-start-pomos'),
};

const numberInputs = document.querySelectorAll('.number-input');

////////////////////////////
// Functions
////////////////////////////
// Saves settings to localStorage

export const updateLocalStorage = () => {
  const newSettings = JSON.stringify(settings);
  localStorage.setItem('settings', newSettings);
};

// Returns bool value based on the toggleButton's state
export const getToggleState = (toggleBtn) =>
  toggleBtn
    .querySelector('.toggle-button-circle')
    .classList.contains('toggle-true');

// Allows values only between MIN_MINUTES and MAX_MINUTES
export const validateSettingsInputs = () => {
  numberInputs.forEach((input) => {
    if (input.value >= MAX_MINUTES) input.value = MAX_MINUTES;
    if (input.value < MIN_MINUTES) input.value = MIN_MINUTES;
  });
};
