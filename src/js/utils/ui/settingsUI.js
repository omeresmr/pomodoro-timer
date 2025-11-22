import { settings } from '../../main.js';
import { dom } from './dom.js';

// Changes toggleButton UI based on the value in settings
const updateToggleButton = (toggleElement, active) => {
  const circle = toggleElement.querySelector('.toggle-button-circle');

  if (active) toggleElement.classList.add('bg-accent');
  else toggleElement.classList.remove('bg-accent');

  circle.classList.add(`toggle-${active}`);
  circle.classList.remove(`toggle-${!active}`);
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

// Renders the Settings UI based on settings
export const renderSettings = () => {
  // Added a timeout, so the user can't see the toggle button toggling back ;D

  // Render Timer Settings
  setTimeout(() => {
    dom.pomodoroLengthInput.value = settings.durations.pomodoro;
    dom.shortBreakLengthInput.value = settings.durations.shortBreak;
    dom.longBreakLengthInput.value = settings.durations.longBreak;
    dom.longBreakIntervalInput.value = settings.longBreakInterval;

    updateToggleButton(dom.autoStartBreaksBtn, settings.autoStartBreaks);
    updateToggleButton(dom.autoStartPomodorosBtn, settings.autoStartPomodoros);

    renderSoundButton(dom.soundBtn);
  }, 100);
};
