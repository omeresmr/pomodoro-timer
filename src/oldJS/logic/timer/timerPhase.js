import { TIMER_STATES, AUTO_START_DELAY } from '../../utils/constants.js';
import { playSound, SOUND_TYPES } from '../../utils/sounds.js';
import { timer } from '../../main.js';
import { settings } from '../../main.js';
import {
  resetCircleProgress,
  updateTimerStateLabel,
  renderTime,
  setTimerState,
} from '../../utils/ui/timerUI.js';
import { toggleTaskInfo, renderTask } from '../../utils/ui/taskUI.js';
import { handleTaskCompletion } from '../tasks/taskState.js';
import { showAlert } from '../../utils/ui/alertUI.js';
import { sortTasks } from '../../events.js';

// Starts the timer automatically after 1500 ms
const autoStartNextPhase = () => {
  completePhase();

  setTimeout(() => {
    if (timer.isRunning) return;
    timer.start();
    setTimerState(TIMER_STATES.START);
  }, AUTO_START_DELAY);
};

// Decides whether to auto-start the next phase or just complete the current one.
export const handlePhaseEnd = () => {
  if (timer.onBreak && settings.autoStartBreaks) autoStartNextPhase();
  else if (!timer.onBreak && settings.autoStartPomodoros) autoStartNextPhase();
  else completePhase();
};

const completePhase = () => {
  playSound(SOUND_TYPES.RING);
  showAlert(`${timer.onBreak ? 'Break' : 'Pomodoro'} ended!`);

  const currentTask = timer.activeTask;

  setTimerState(TIMER_STATES.STOP);
  timer.stop();
  if (!timer.onBreak) timer.completedPomodoros++;

  // if (currentTask && !timer.onBreak) {
  //   currentTask.incrementPomo();
  //   renderTask(currentTask);

  //   // Show Task info on timer page
  //   toggleTaskInfo(currentTask);

  //   handleTaskCompletion(currentTask);
  // }

  // currentTask?.completed ? timer.reset() : timer.nextPhase();

  resetCircleProgress();
  updateTimerStateLabel(timer);
  renderTime(timer.currentDuration);
};
