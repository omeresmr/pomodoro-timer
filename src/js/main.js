import PomodoroTimer from './models/Timer.js';
import Settings from './models/Settings.js';
import { TIMER_STATES } from './utils/constants.js';
import { handlePhaseEnd } from './logic/timerLogic.js';
import { playSound, pauseSound, SOUND_TYPES } from './utils/sounds.js';

import {
  renderSettings,
  renderTime,
  setTimerState,
  showAlert,
  slideToSection,
  renderSoundButton,
  renderTask,
  setTaskState,
  toggleTaskInfo,
  highlightMenuElement,
  removeTask,
  renderEditTaskForm,
} from './utils/ui.js';

import {
  updateLocalStorage,
  validateSettingsInputs,
  getToggleState,
  settingsInputs,
} from './logic/settingsLogic.js';
import {
  addTask,
  tasks,
  findTask,
  deleteTask,
  handleTaskCompletion,
  startTask,
} from './logic/taskLogic.js';

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

const settingsModal = document.querySelector('.settings-modal');
const deleteTaskModal = document.querySelector('.delete-task-modal');

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
  settingsModal.close();
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
  settingsModal.close();

  // Reset Toggle Buttons based on the saved settings state
  renderSettings();
};

// Handles the open settings logic
const handleSettingsOpen = () => {
  playSound(SOUND_TYPES.CLICK);
  settingsModal.showModal();
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
  const pomodoroSection = document.querySelector('.pomodoro-section');
  const task = findTask(taskId);
  if (!task) return;

  if (!task.isActive) {
    // Change isActive state
    startTask(task);

    // Reset Timer
    timer.reset();

    // Slide to Timer section
    slideToSection(pomodoroSection);

    // Start Timer
    setTimerState(TIMER_STATES.START);
    timer.initTask(task);

    // Show Task
    toggleTaskInfo(taskId);

    // Change task UI
    renderTask(task, true);
    setTaskState(taskId, 'active');
  } else {
    task.stop();

    renderTask(task, true);
    setTaskState(taskId, 'default');
  }
};

////////////////////////////////////
// Event Listeners
////////////////////////////////////
settingsBtn.addEventListener('click', handleSettingsOpen);

settingsModal.addEventListener('click', (e) => {
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

document.addEventListener('click', function (e) {
  const clickedElement = e.target;
  const taskContainer = clickedElement.closest('.task-container');

  if (!taskContainer) return;

  const taskId = +taskContainer.dataset.id;

  const task = findTask(taskId);

  // Event Listener for the dynamically added tasks
  const startTaskBtn = clickedElement.closest('.start-task');
  const deleteTaskBtn = clickedElement.closest('.delete-task');
  const completeTaskBtn = clickedElement.closest('.complete-task');
  const editTaskBtn = clickedElement.closest('.edit-task');
  const saveEditBtn = clickedElement.closest('.save-edited-task');
  const cancelEditBtn = clickedElement.closest('.cancel-edit-task');

  if (startTaskBtn) handleStartTask(taskId);
  if (deleteTaskBtn) {
    // Show the task name, on that the delete btn got clicked
    deleteTaskModal.querySelector('.task-to-delete').textContent = task.name;

    // Save the task id
    deleteTaskModal.dataset.id = taskId;
    deleteTaskModal.showModal();
  }
  if (completeTaskBtn) handleTaskCompletion(task, 'manual');
  if (editTaskBtn) renderEditTaskForm(task);

  if (saveEditBtn) {
    const newTaskName = taskContainer.querySelector('.text-input').value;
    const newEstPomos = +taskContainer.querySelector('.new-est-pomos').value;
    const newCompletedPomos = +taskContainer.querySelector(
      '.new-completed-pomos',
    ).value;

    task.name = newTaskName;
    task.estPomos = newEstPomos;
    task.completedPomos = newCompletedPomos;

    task.checkNewCompleteState();

    renderTask(task, true);
    showAlert(`Task "${task.name}" saved! ✅`);
  }
  if (cancelEditBtn) renderTask(task, true);
});

deleteTaskModal.addEventListener('click', function (e) {
  const clickedElement = e.target;
  const taskId = +this.dataset.id;
  const task = findTask(taskId);

  if (clickedElement.classList.contains('no-btn')) deleteTaskModal.close();
  if (clickedElement.classList.contains('yes-btn')) {
    showAlert(`Task "${task.name}" got deleted. ✅`);
    deleteTaskModal.close();
    removeTask(task);

    deleteTask(taskId);

    // Hide task on pomdoro page
    toggleTaskInfo(taskId);
  }
});

navigationMenu.addEventListener('click', function (e) {
  const clickedElement = e.target;
  const clickedMenuElement = clickedElement.closest('.menu-element');
  const menuElements = document.querySelectorAll('.menu-element');

  // Guard Clause
  if (!clickedMenuElement) return;

  highlightMenuElement(clickedMenuElement, menuElements);

  const targetSection = document.querySelector(
    `.${clickedMenuElement.dataset.target}-section`,
  );

  if (!targetSection) return;

  slideToSection(targetSection);
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
setTimeout(() => {
  const newTask2 = addTask('Test2', 2);
  renderTask(newTask2);
}, 5);

setTimeout(() => {
  const newTask3 = addTask('Test3', 2);
  renderTask(newTask3);
}, 15);

setTimeout(() => {
  const newTask4 = addTask('Test4', 2);
  renderTask(newTask4);
}, 20);
