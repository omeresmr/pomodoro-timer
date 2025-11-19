import {
  CIRCLE_CIRCUMFERENCE,
  ALERT_DURATION,
  TASK_ACTION_ICONS,
  TRANSLATE,
} from './constants.js';
import { settings, timer, startBtn, skipBtn } from '../main.js';
import { settingsInputs } from '../logic/settingsLogic.js';
import { findTask } from '../logic/taskLogic.js';

////////////////////////////
// DOM ELEMENTS
////////////////////////////

const alertContainer = document.querySelector('.alert-container');
const progressCircle = document.querySelector('.progress-circle');

const timeLabel = document.querySelector('.remaining-time');
const timerStateLabel = document.querySelector('.timer-state-text');

const tasksContainer = document.querySelector('.tasks');

const sections = document.querySelectorAll('section');

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
    <div class="task-container bg-secondary flex items-center flex-col justify-center p-5 w-9/10 max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl gap-4 border border-transparent" data-id="${task.id}">
      <div class="text-center">
        <p class="task-name text-accent font-semibold text-xl">${task.name}</p>
        <p class="pomodoro-progress font-semibold">${task.completedPomos} of ${task.estPomos}</p>
      </div>

      <div class="flex gap-4">
        <button class="start-task svg-button">${TASK_ACTION_ICONS.start}</button>
        <button class="edit-task svg-button">${TASK_ACTION_ICONS.edit}</button>
        <button class="delete-task svg-button">${TASK_ACTION_ICONS.delete}</button>
        <button class="complete-task svg-button">${TASK_ACTION_ICONS.complete}</button>
      </div>

      <div class="flex items-center justify-center flex-col w-full gap-2">
        <div class="h-4 border-2 border-text w-full overflow-hidden rounded-full">
          <div class="progress-bar bg-text h-3 w-full"></div>
        </div>
        <p class="text-xs font-bold">${task.progressPercentage}%</p>
        </div>
      </div>
    `;

  tasksContainer.insertAdjacentHTML('beforeend', html);
};

export const updatePomodoroProgress = (task) => {
  const taskToChange = document.querySelector(`[data-id="${task.id}"]`);

  if (!taskToChange) return;

  console.log(taskToChange, taskToChange.querySelector('.pomodoro-progress'));

  taskToChange.querySelector('.pomodoro-progress').textContent =
    `${task.completedPomos} of ${task.estPomos}`;
};

export const setTaskState = (taskId, newState) => {
  const taskToChange = document.querySelector(`[data-id="${taskId}"]`);
  const progressBar = taskToChange.querySelector('.progress-bar');
  const nameLabel = taskToChange.querySelector('.task-name');
  const allTasks = document.querySelectorAll('.task-container');

  allTasks.forEach((task) => {
    const progressBar = task.querySelector('.progress-bar');
    task.classList.add('border-transparent');
    task.classList.remove('border-accent');
    progressBar.classList.remove('bg-accent');
    progressBar.classList.remove('bg-green-500');
    progressBar.classList.add('bg-text');
  });

  switch (newState) {
    case 'active':
      taskToChange.classList.add('border-accent');
      taskToChange.classList.remove('border-transparent');
      progressBar.classList.add('bg-accent');
      progressBar.classList.remove('bg-accent');
      tasksContainer.prepend(taskToChange);
      break;
    case 'complete':
      progressBar.classList.remove('bg-text');
      progressBar.classList.add('bg-green-500');
      nameLabel.classList.remove('text-accent');
      nameLabel.classList.add('text-gray-500');
      nameLabel.classList.add('line-through');
      tasksContainer.append(taskToChange);
      break;
    default:
      console.error('Wrong state input');
      break;
  }
};

// toggles task info on the timer section
export const toggleTaskInfo = (taskId) => {
  const task = findTask(taskId);

  if (!task) return;

  const taskInfoCon = document.querySelector('.task-info-container');
  const taskNameLabel = taskInfoCon.querySelector('.task-name');
  const estPomosLabel = taskInfoCon.querySelector('.est-pomos');

  if (task.isComplete) {
    taskInfoCon.classList.add('hidden');
    return;
  }

  taskInfoCon.classList.remove('hidden');
  taskNameLabel.textContent = task.name;
  estPomosLabel.textContent = `${task.completedPomos}/${task.estPomos}`;
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
export const slideToSection = (targetSection) => {
  const currentSection = document.querySelector('.current-section');

  // Guard Clause
  if (currentSection === targetSection) return;

  const targetIndex = targetSection.dataset.index;

  (currentSection, targetSection);

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
    section.classList.add(`${TRANSLATE[position]}`);
  });
};

// Find a way, to use this Method in slideToSection
export const highlightMenuElement = (targetElement, menuElements) => {
  // Unhighlight every menu element
  menuElements.forEach((el) => el.classList.remove('selected-menu'));

  // Highlight clicked menu element
  targetElement.classList.add('selected-menu');
};
