import PomodoroTimer from './models/Timer.js';
import Settings from './models/Settings.js';
import { TIMER_STATES } from './utils/constants.js';
import { handlePhaseEnd } from './logic/timerLogic.js';
import { playSound, SOUND_TYPES } from './utils/sounds.js';

import {
  settingsDialog,
  renderSettings,
  renderTime,
  setTimerState,
  toggleSettingsDialog,
  showAlert,
} from './utils/ui.js';

import {
  updateLocalStorage,
  validateSettingsInputs,
  getToggleState,
  settingsInputs,
} from './logic/settingsLogic.js';

////////////////////////////////////
// DOM Elements
////////////////////////////////////
const settingsBtn = document.querySelector('.settings-button');
export const startBtn = document.querySelector('.start-timer');
export const skipBtn = document.querySelector('.skip-timer');

////////////////////////////////////
// Functions
////////////////////////////////////

// Handles the start/stop timer button logic
const handleTimerToggle = () => {
  playSound(SOUND_TYPES.CLICK);

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

document.addEventListener('keydown', function (e) {
  if (e.key === ' ') {
    // Click Start/Stop Button
    startBtn.click();

    // Scale Button
    startBtn.classList.add('button-active');

    // Remove the Scaling, so it feels like a real click
    setTimeout(() => startBtn.classList.remove('button-active'), 200);
  }
});

////////////////////////////////////
// Initialization
////////////////////////////////////
export const timer = new PomodoroTimer();
export const settings = new Settings();
renderSettings();
renderTime(settings.durations.pomodoro * 60);
