import PomodoroTimer from './models/Timer.js';
import Settings from './models/Settings.js';
import { TIMER_STATES } from './utils/constants.js';
import { handlePhaseEnd } from './logic/timerLogic.js';
import { playSound, pauseSound, SOUND_TYPES } from './utils/sounds.js';

import {
  settingsDialog,
  renderSettings,
  renderTime,
  setTimerState,
  toggleSettingsDialog,
  showAlert,
  slideToSection,
  renderSoundButton,
  renderTask,
  setTaskState,
  toggleTaskInfo,
} from './utils/ui.js';

import {
  updateLocalStorage,
  validateSettingsInputs,
  getToggleState,
  settingsInputs,
} from './logic/settingsLogic.js';
import { addTask, tasks, findTask } from './logic/taskLogic.js';

////////////////////////////////////
// DOM Elements
////////////////////////////////////
const settingsBtn = document.querySelector('.settings-button');
export const startBtn = document.querySelector('.start-timer');
export const skipBtn = document.querySelector('.skip-timer');
const soundBtn = document.querySelector('.activate-sound-button');
const createTaskBtn = document.querySelector('.create-task');

const navigationMenu = document.querySelector('.navigation-menu');
const taskNameInput = document.getElementById('task-name');
const estPomosInput = document.getElementById('est-pomodoros');

const sections = document.querySelectorAll('section');

////////////////////////////////////
// Functions
////////////////////////////////////

// Handles the start/stop timer button logic
const handleTimerToggle = () => {
  console.log(tasks);
  playSound(SOUND_TYPES.CLICK);
  if (!SOUND_TYPES.RING.paused) {
    pauseSound(SOUND_TYPES.RING);
  }

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

// Handles the save logic
const handleSaveSettings = () => {
  // 1. Play Sound
  playSound(SOUND_TYPES.CLICK);

  // 2. Validate Inputs
  validateSettingsInputs();

  // 3. Get the bool value of the toggleButtons
  const autoStartBreaks = getToggleState(settingsInputs.autoStartBreaks);
  const autoStartPomodoros = getToggleState(settingsInputs.autoStartPomodoros);

  // 4. Update Settings
  settings.update(
    +settingsInputs.pomodoro.value,
    +settingsInputs.shortBreak.value,
    +settingsInputs.longBreak.value,
    autoStartBreaks,
    autoStartPomodoros,
    +settingsInputs.longBreakInterval.value,
  );

  updateLocalStorage();

  // 5. Close Window & Render new Settings
  toggleSettingsDialog();
  renderSettings();

  // 6. Render Time
  // If remainingSeconds are 0, use currentDuration
  renderTime(timer.remainingSeconds || timer.currentDuration);

  // 7. Show Alert
  showAlert('Settings saved! ✅');
};

// Handles the close settings logic
const handleSettingsClose = () => {
  playSound(SOUND_TYPES.CLICK);
  toggleSettingsDialog();

  // Reset Toggle Buttons based on the saved settings state
  renderSettings();
};

// Handles the open settings logic
const handleSettingsOpen = () => {
  toggleSettingsDialog();
  playSound(SOUND_TYPES.CLICK);
};

// Changes toggleButton UI on every click
const handleToggleButton = (toggleBtn) => {
  const toggleCircle = toggleBtn.querySelector('.toggle-button-circle');
  toggleCircle.classList.toggle('toggle-false');
  toggleCircle.classList.toggle('toggle-true');
  toggleBtn.classList.toggle('bg-accent');
};

// Starts a Task
const handleStartTask = (taskId) => {
  const tasksSection = document.querySelector('.tasks-section');
  const pomodoroSection = document.querySelector('.pomodoro-section');
  const task = findTask(taskId);
  if (!task) return;

  // Change isActive state
  task.start();

  // Change task UI
  setTaskState(taskId, 'active'); // CHANGE

  // Reset Timer
  timer.reset();

  // Slide to Timer section
  slideToSection(tasksSection, pomodoroSection, sections);

  // Start Timer
  setTimerState(TIMER_STATES.START);
  timer.initTask(task);

  // Show Task
  toggleTaskInfo(taskId); // CHANGE
};

////////////////////////////////////
// Event Listeners
////////////////////////////////////
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

soundBtn.addEventListener('click', function () {
  playSound(SOUND_TYPES.CLICK);

  // Change soundEnabled state
  settings.soundEnabled = !settings.soundEnabled;

  updateLocalStorage();

  // Show alert, based on soundEnabled state
  showAlert(`Sound ${!settings.soundEnabled ? 'de' : ''}activated! ✅`);

  // Show the other svg
  soundBtn.children[0].classList.toggle('hidden');
  soundBtn.children[1].classList.toggle('hidden');
});

taskNameInput.addEventListener('input', function () {
  createTaskBtn.disabled = !taskNameInput.value;
});

estPomosInput.addEventListener('input', function () {
  const estPomos = estPomosInput.value;
  if (Number.isInteger(estPomos) || estPomos < 0) createTaskBtn.disabled = true;
});

createTaskBtn.addEventListener('click', function (e) {
  e.preventDefault();

  playSound(SOUND_TYPES.CLICK);

  const taskName = taskNameInput.value;
  const estPomos = +estPomosInput.value;

  const newTask = addTask(taskName.trim(), estPomos);

  renderTask(newTask);

  showAlert(`Task "${newTask.name}" created! ✅`);

  taskNameInput.value = '';

  this.disabled = true;

  // Unfocus everything after creating a Task
  document.body.focus();
});

// Event Listener for the space button on pomodoro page
document.addEventListener('keydown', function (e) {
  const currentSection = document.querySelector('.current-section');
  // If the user is on a different section, return
  if (!currentSection.classList.contains('pomodoro-section')) return;

  if (e.key === ' ') {
    // Click Start/Stop Button
    startBtn.click();

    // Scale Button
    startBtn.classList.add('button-active');

    // Remove the Scaling, so it feels like a real click
    setTimeout(() => startBtn.classList.remove('button-active'), 200);
  }
});

// Event Listener for the dynamically added tasks
document.addEventListener('click', function (e) {
  const clickedElement = e.target;
  const taskContainer = clickedElement.closest('.task-container');
  if (!taskContainer) return;

  const taskId = +taskContainer.dataset.id;
  taskId;
  const startTaskBtn = clickedElement.closest('.start-task');
  if (startTaskBtn) handleStartTask(taskId);
});

navigationMenu.addEventListener('click', function (e) {
  const clickedElement = e.target;
  const clickedMenuElement = clickedElement.closest('.menu-element');
  const menuElements = document.querySelectorAll('.menu-element');
  const currentSection = document.querySelector('.current-section');

  // Guard Clause
  if (!clickedMenuElement) return;

  // Unhighlight every menu element
  menuElements.forEach((el) => el.classList.remove('selected-menu'));

  // Highlight clicked menu element
  clickedMenuElement.classList.add('selected-menu');

  const targetSection = document.querySelector(
    `.${clickedMenuElement.dataset.target}-section`,
  );

  if (!targetSection) return;

  slideToSection(currentSection, targetSection, sections);
});

////////////////////////////////////
// Initialization
////////////////////////////////////
export const timer = new PomodoroTimer();
export const settings = new Settings();
renderSettings();
renderSoundButton(soundBtn);
renderTime(settings.durations.pomodoro * 60);
const newTask = addTask('Test1', 2);
renderTask(newTask);
const newTask2 = addTask('Test2', 2);
renderTask(newTask2);
const newTask3 = addTask('Test3', 2);
renderTask(newTask3);
const newTask4 = addTask('Test4', 2);
renderTask(newTask4);

(newTask.id, newTask2.id, newTask3.id, newTask4.id);
