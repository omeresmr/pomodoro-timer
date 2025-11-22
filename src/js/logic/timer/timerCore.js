import { timer } from '../../main.js';

import { renderTime, updateCircleProgress } from '../../utils/ui/timerUI.js';

export const timerLogic = () => {
  // 1. Increse secondsPassed
  timer.secondsPassed++;

  // 2. Get and render remainingSeconds
  renderTime(timer.remainingSeconds);

  // 3. Update Progress Circle
  updateCircleProgress(timer.currentDuration, timer.remainingSeconds);

  // 4. End Timer
  if (timer.remainingSeconds <= 0) handlePhaseEnd();
};
