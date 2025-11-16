import {
  CIRCLE_CIRCUMFERENCE,
  ALERT_DURATION,
  TASK_ACTION_ICONS,
} from './constants.js';
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

const tasksContainer = document.querySelector('.tasks');

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

  // Render Timer Settings
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

export const renderTask = (task) => {
  const html = `
  <div class="task-container bg-secondary flex items-center flex-col justify-center p-5 w-9/10 max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl gap-4">
    <div class="text-center">
      <p class="text-accent font-semibold text-xl">${task.name}</p>
      <p class="font-semibold">${task.completedPomos} of ${task.estPomos}</p>
    </div>

    <div class="flex gap-4">
      <button class="start-task svg-button">${TASK_ACTION_ICONS.start}</button>
      <button class="edit-task svg-button">${TASK_ACTION_ICONS.edit}</button>
      <button class="delete-task svg-button">${TASK_ACTION_ICONS.delete}</button>
      <button class="complete-task svg-button">${TASK_ACTION_ICONS.complete}</button>
    </div>

    <div class="flex items-center justify-center flex-col w-full gap-2">
      <div class="h-4 border-2 border-text w-full overflow-hidden rounded-full">
        <div class="bg-green-500 h-3 w-full"></div>
      </div>
      <p class="text-xs font-bold">${task.progressPercentage}%</p>
      </div>
    </div>
  `;

  tasksContainer.insertAdjacentHTML('beforeend', html);
};

// Renders enable/disable Sound button
export const renderSoundButton = (button) => {
  const soundOnSvg = button.children[0];
  const soundOffSvg = button.children[1];

  if (settings.soundEnabled) {
    soundOnSvg.classList.remove('hidden');
    soundOffSvg.classList.add('hidden');
  } else {
    soundOffSvg.classList.remove('hidden');
    soundOnSvg.classList.add('hidden');
  }
};

// Starts or Stops the Timer, based on the state argument
export const setTimerState = (state) => {
  timer?.[state]();
  startBtn.textContent = state === 'start' ? 'stop' : 'start';

  // Only visible if timer is running
  skipBtn.classList.toggle('collapse');
};

// Animation for the navigation between sections
export const slideToSection = (currentSection, targetSection, sections) => {
  // Guard Clause
  if (currentSection === targetSection) return;

  const targetIndex = targetSection.dataset.index;

  // Set the current-section class (important for main.js)
  currentSection.classList.remove('current-section');
  targetSection.classList.add('current-section');

  // Toggle "inert" attribute, so that tabbing works as expected
  currentSection.toggleAttribute('inert');
  targetSection.toggleAttribute('inert');

  // I have 3 sections, so the range is from -200 to 200.
  const translateValues = [-200, -100, 0, 100, 200];

  sections.forEach((section) => {
    // 1. Remove every translate class from every section
    translateValues.forEach((v) =>
      section.classList.remove(`translate-x-[${v}vw]`),
    );
    // 2. Calculate the new position value
    const position = (section.dataset.index - targetIndex) * 100;

    // 3. Move the section to the new position
    section.classList.add(`translate-x-[${position}vw]`);
  });
};
