import { timer, settings } from '../main.js';
import { AUTO_START_DELAY, TIMER_STATES } from '../utils/constants.js';
import { playSound, SOUND_TYPES } from '../utils/sounds.js';

import {
  renderTime,
  updateCircleProgress,
  resetCircleProgress,
  updateTimerStateLabel,
  setTimerState,
  showAlert,
} from '../utils/ui.js';

export const timerLogic = () => {
  // 1. Increse elapsedSeconds
  timer.elapsedSeconds++;

  // 2. Get and render remainingSeconds
  renderTime(timer.remainingSeconds);

  // 3. Update Progress Circle
  updateCircleProgress(timer.currentDuration, timer.remainingSeconds);

  // 4. End Timer
  if (timer.remainingSeconds <= 0) {
    playSound(SOUND_TYPES.RING);
    handlePhaseEnd();
  }
};

const completePhase = () => {
  // 1. Stop Timer
  setTimerState(TIMER_STATES.STOP);

  // 2. Show alert based on isBreak state
  if (timer.isBreak) {
    showAlert(`Break is over! 😑`);
  } else {
    showAlert(`Pomodoro is over! 🎉`);
    timer.pomodoroCount++;
  }

  // 2. switch Phase
  timer.nextPhase();

  // 4. Update UI
  resetCircleProgress();
  updateTimerStateLabel();
  renderTime(timer.currentDuration);

  // 5. Play Sound
  playSound(SOUND_TYPES.RING);
};

// Handles Phase End based on the autoStart settings
export const handlePhaseEnd = () => {
  if (timer.isBreak && settings.autoStartBreaks) autoStartNextPhase();
  else if (!timer.isBreak && settings.autoStartPomodoros) autoStartNextPhase();
  else completePhase();
};

// Starts the timer automatically after 1500 ms
const autoStartNextPhase = () => {
  completePhase();
  setTimeout(() => {
    setTimerState(TIMER_STATES.START);
  }, AUTO_START_DELAY);
};
