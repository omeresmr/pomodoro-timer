import { dom } from './dom.js';
import { CIRCLE_CIRCUMFERENCE } from '../constants.js';

// Formats seconds into mm:ss format
const formatSeconds = (seconds) =>
  `${String(Math.floor(seconds / 60)).padStart(2, 0)}:${String(seconds % 60).padStart(2, 0)}`;

// Updates Time UI
export const renderTime = (seconds) =>
  (dom.remainingTimeLabel.textContent = formatSeconds(seconds));

// Updates timerState UI
export const updateTimerStateLabel = (timer) =>
  (dom.timerStateLabel.textContent = timer.onBreak ? 'relax.' : 'focus.');

// Updates Circle Progress
export const updateCircleProgress = (currentDuration, remainingDuration) => {
  const newOffset =
    CIRCLE_CIRCUMFERENCE * (remainingDuration / currentDuration);
  dom.progressCircle.setAttribute('stroke-dashoffset', newOffset);
};

// Resets Circle Progress to 0
export const resetCircleProgress = () =>
  dom.progressCircle.setAttribute('stroke-dashoffset', CIRCLE_CIRCUMFERENCE);

// Starts or Stops the Timer, based on the state argument
export const setTimerState = (state) => {
  dom.startBtn.textContent = state === 'start' ? 'stop' : 'start';

  // Only visible if timer is running
  dom.skipBtn.classList.toggle('collapse');
};
