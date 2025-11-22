////////////////////////
// Imports
////////////////////////

// Logic
import { startTask, handleTaskCompletion } from './logic/tasks/taskState.js';
import { deleteTask, addTask, findTask } from './logic/tasks/taskActions.js';
import { TIMER_STATES } from './utils/constants.js';
import {
  updateLocalStorage,
  validateSettingsInputs,
  getToggleState,
} from './logic/settingsLogic.js';
import { handlePhaseEnd } from './logic/timer/timerPhase.js';
import { saveTasks } from './logic/tasks/taskStorage.js';

// UI
import { dom } from './utils/ui/dom.js';
import { slideToSection, highlightMenuElement } from './utils/ui/sectionUI.js';
import { setTimerState, renderTime } from './utils/ui/timerUI.js';
import {
  toggleTaskInfo,
  renderTask,
  setTaskState,
  renderEditTaskForm,
  removeTask,
} from './utils/ui/taskUI.js';
import { showAlert } from './utils/ui/alertUI.js';
import { renderSettings } from './utils/ui/settingsUI.js';
import { playSound, pauseSound, SOUND_TYPES } from './utils/sounds.js';

// Models
import { timer } from './main.js';
import { settings } from './main.js';

////////////////////////
// Variables
////////////////////////

////////////////////////
// Event Handler Functions
////////////////////////

////////////////////////
// Tasks Event Handler Functions
////////////////////////

const handleStartTask = (taskId) => {
  const task = findTask(taskId);
  if (!task) return;

  if (!task.active) {
    // Change active state
    startTask(task);

    // Reset Timer
    timer.reset();

    // Slide to Timer section
    slideToSection(dom.pomodoroSection);

    // Start Timer
    setTimerState(TIMER_STATES.START);
    timer.start();
    timer.initTask(task);

    // Show Task
    toggleTaskInfo(task);

    // Change task UI
    renderTask(task, true);
    setTaskState(taskId, 'active');
  } else {
    task.stop();

    renderTask(task, true);
    setTaskState(taskId, 'default');
  }
};

const handleShowDeleteModal = (task) => {
  // Show the task name, on that the delete btn got clicked
  dom.deleteTaskModal.querySelector('.task-to-delete').textContent = task.name;

  // Save the task id
  dom.deleteTaskModal.dataset.id = task.id;
  dom.deleteTaskModal.showModal();
};

const handleDeleteTask = (task) => {
  showAlert(`Task "${task.name}" got deleted. ✅`);
  dom.deleteTaskModal.close();

  // Remove task from UI
  removeTask(task);

  // Remove task from tasks array
  deleteTask(task.id);

  // Hide task on pomdoro page
  toggleTaskInfo(task);
};

const handleSaveTask = (task) => {
  const newName = dom.tasksContainer.querySelector('.text-input').value;
  const newEstimatedPomodoros =
    +dom.tasksContainer.querySelector('.new-est-pomos').value;
  const newPomodorosDone = +dom.tasksContainer.querySelector(
    '.new-completed-pomos',
  ).value;

  task.update({ newName, newEstimatedPomodoros, newPomodorosDone });

  task.isComplete;

  renderTask(task, true);
  showAlert(`Task "${task.name}" saved! ✅`);
  saveTasks();
};

const handleCreateTask = (e) => {
  e.preventDefault();

  playSound(SOUND_TYPES.CLICK);

  const taskName = dom.taskNameInput.value;
  const estimatedPomodoros = +dom.estPomosInput.value;

  const newTask = addTask(taskName, estimatedPomodoros);

  renderTask(newTask);

  showAlert(`Task "${newTask.name}" created! ✅`);

  dom.taskNameInput.value = '';

  dom.createTaskBtn.disabled = true;

  // Unfocus everything after creating a Task
  document.body.focus();
};

const isValidEstPomos = (value) => {
  const num = Number(value);
  return Number.isInteger(num) && num > 0;
};

const updateCreateTaskButtonState = () => {
  const name = dom.taskNameInput.value.trim();
  const estPomos = dom.estPomosInput.value;

  dom.createTaskBtn.disabled = !name || !isValidEstPomos(estPomos);
};

////////////////////////
// Timer Event Handler Functions
////////////////////////

// Handles the start/stop timer button logic
const handleTimerToggle = () => {
  playSound(SOUND_TYPES.CLICK);
  if (!SOUND_TYPES.RING.paused) {
    pauseSound(SOUND_TYPES.RING);
  }

  // isRunning is false at the beginning, so the timer starts on the first click
  if (!timer.isRunning) {
    setTimerState(TIMER_STATES.START);
    timer.start();
  }
  // Timer stops and isRunning gets true
  else {
    setTimerState(TIMER_STATES.STOP);
    timer.stop();
  }
};

// Handles the skip button logic
const handlePhaseSkip = () => {
  playSound(SOUND_TYPES.CLICK);

  // Switchs to next phase
  handlePhaseEnd();
};

// Handles start/stop timer via spacebar
const handleSpacebarToggle = (e) => {
  const currentSection = document.querySelector('.current-section');

  // If the user is on a different section, return
  if (!currentSection.classList.contains('pomodoro-section')) return;

  if (e.key !== ' ') return;

  // Click Start/Stop Button
  dom.startBtn.click();

  // Scale Button
  dom.startBtn.classList.add('button-active');

  // Remove the Scaling, so it feels like a real click
  setTimeout(() => dom.startBtn.classList.remove('button-active'), 200);
};

////////////////////////
// Settings Event Handler Functions
////////////////////////

// Handles the save logic
const handleSaveSettings = () => {
  // 1. Play Sound
  playSound(SOUND_TYPES.CLICK);

  // 2. Validate Inputs
  validateSettingsInputs();

  // 3. Get the bool value of the toggleButtons
  const autoStartBreaks = getToggleState(dom.autoStartBreaksBtn);
  const autoStartPomodoros = getToggleState(dom.autoStartPomodorosBtn);

  // 4. Update Settings
  settings.update(
    +dom.pomodoroLengthInput.value,
    +dom.shortBreakLengthInput.value,
    +dom.longBreakLengthInput.value,
    autoStartBreaks,
    autoStartPomodoros,
    +dom.longBreakIntervalInput.value,
  );

  updateLocalStorage();

  // 5. Close Window & Render new Settings
  dom.settingsModal.close();
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
  dom.settingsModal.close();

  // Reset Toggle Buttons based on the saved settings state
  renderSettings();
};

// Handles the open settings logic
const handleSettingsOpen = () => {
  playSound(SOUND_TYPES.CLICK);
  dom.settingsModal.showModal();
};

// Changes toggleButton UI on every click
const handleToggleButton = (toggleBtn) => {
  const toggleCircle = toggleBtn.querySelector('.toggle-button-circle');
  toggleCircle.classList.toggle('toggle-false');
  toggleCircle.classList.toggle('toggle-true');
  toggleBtn.classList.toggle('bg-accent');
};

const handleSoundToggle = () => {
  playSound(SOUND_TYPES.CLICK);

  // Change soundEnabled state
  settings.toggleSound();

  updateLocalStorage();

  // Show alert, based on soundEnabled state
  showAlert(`Sound ${!settings.soundEnabled ? 'de' : ''}activated! ✅`);

  // Show the other svg
  dom.soundBtn.children[0].classList.toggle('hidden');
  dom.soundBtn.children[1].classList.toggle('hidden');
};

////////////////////////
// Event Listeners
////////////////////////

////////////////////////
// Event Listener for tasks
////////////////////////

document.addEventListener('click', function (e) {
  const clickedElement = e.target;
  const taskContainer = clickedElement.closest('.task-container');

  if (!taskContainer) return;

  const taskId = +taskContainer.dataset.id;
  const task = findTask(taskId);

  const startTaskBtn = clickedElement.closest('.start-task');
  const deleteTaskBtn = clickedElement.closest('.delete-task');
  const completeTaskBtn = clickedElement.closest('.complete-task');
  const editTaskBtn = clickedElement.closest('.edit-task');
  const saveEditBtn = clickedElement.closest('.save-edited-task');
  const cancelEditBtn = clickedElement.closest('.cancel-edit-task');

  if (startTaskBtn) handleStartTask(taskId);
  if (deleteTaskBtn) handleShowDeleteModal(task);
  if (completeTaskBtn) handleTaskCompletion(task, 'manual');
  if (editTaskBtn) renderEditTaskForm(task);

  if (saveEditBtn) handleSaveTask(task);
  if (cancelEditBtn) renderTask(task, true);
});

dom.taskNameInput.addEventListener('input', updateCreateTaskButtonState);

dom.estPomosInput.addEventListener('input', updateCreateTaskButtonState);

dom.createTaskBtn.addEventListener('click', handleCreateTask);

dom.deleteTaskModal.addEventListener('click', function (e) {
  const clickedElement = e.target;
  const taskId = +this.dataset.id;
  const task = findTask(taskId);

  if (clickedElement.classList.contains('no-btn')) dom.deleteTaskModal.close();
  if (clickedElement.classList.contains('yes-btn')) handleDeleteTask(task);
});

////////////////////////
// Event Listeners for timer
////////////////////////
dom.startBtn.addEventListener('click', handleTimerToggle);

dom.skipBtn.addEventListener('click', handlePhaseSkip);

////////////////////////
// Event Listeners for settings
////////////////////////

dom.settingsBtn.addEventListener('click', handleSettingsOpen);

dom.settingsModal.addEventListener('click', (e) => {
  const clickedElement = e.target;
  const toggleBtn = clickedElement.closest('.toggle-button');
  const saveBtn = clickedElement.closest('.save-settings');
  const closeBtn = clickedElement.closest('.close-settings');

  // Event Delegation
  if (closeBtn) handleSettingsClose();
  if (toggleBtn) handleToggleButton(toggleBtn);
  if (saveBtn) handleSaveSettings();
});

dom.soundBtn.addEventListener('click', handleSoundToggle);

////////////////////////
// Other Event Listeners
////////////////////////

dom.navigationMenu.addEventListener('click', function (e) {
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

document.addEventListener('keydown', handleSpacebarToggle);
