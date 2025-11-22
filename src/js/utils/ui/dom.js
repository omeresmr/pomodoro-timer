export const dom = {
  // Settings
  pomodoroLengthInput: document.getElementById('pomodoro-time'),
  shortBreakLengthInput: document.getElementById('short-break-time'),
  longBreakLengthInput: document.getElementById('long-break-time'),
  longBreakIntervalInput: document.getElementById('long-break-interval'),
  autoStartBreaksBtn: document.querySelector('.auto-start-breaks'),
  autoStartPomodorosBtn: document.querySelector('.auto-start-pomos'),
  soundBtn: document.querySelector('.activate-sound-button'),
  settingsModal: document.querySelector('.settings-modal'),
  settingsBtn: document.querySelector('.settings-button'),

  // Timer
  startBtn: document.querySelector('.start-timer'),
  skipBtn: document.querySelector('.skip-timer'),
  remainingTimeLabel: document.querySelector('.remaining-time'),
  timerStateLabel: document.querySelector('.timer-state-text'),
  progressCircle: document.querySelector('.progress-circle'),

  // Task
  createTaskBtn: document.querySelector('.create-task'),
  taskNameInput: document.getElementById('task-name'),
  estPomosInput: document.getElementById('est-pomodoros'),
  deleteTaskModal: document.querySelector('.delete-task-modal'),
  tasksContainer: document.querySelector('.tasks'),

  // Navigation
  navigationMenu: document.querySelector('.navigation-menu'),
  sections: document.querySelectorAll('section'),
  pomodoroSection: document.querySelector('.pomodoro-section'),
  tasksSection: document.querySelector('.tasks-section'),

  // Alert
  alertContainer: document.querySelector('.alert-container'),
};
