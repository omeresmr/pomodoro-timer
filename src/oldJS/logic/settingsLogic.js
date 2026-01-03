import { MAX_MINUTES, MIN_MINUTES } from '../utils/constants.js';
import { dom } from '../utils/ui/dom.js';
import { settings } from '../main.js';

////////////////////////////
// DOM ELEMENTS
////////////////////////////

const settingsNumberInputs = [
  dom.pomodoroLengthInput,
  dom.shortBreakLengthInput,
  dom.longBreakLengthInput,
];

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
  settingsNumberInputs.forEach((input) => {
    if (input.value >= MAX_MINUTES) input.value = MAX_MINUTES;
    if (input.value < MIN_MINUTES) input.value = MIN_MINUTES;
  });
};
