import { type TimerState } from '../models/timer.model';
import { type TimerAction } from '../models/timer.actions';
import { createInitialTimerState } from '../models/timer.model';

export const initialTimerState = createInitialTimerState();

export default function timerReducer(
  timerState: TimerState,
  action: TimerAction
) {
  const { onBreak, completedPomodoros, millisecondsPassed, activeTask } =
    timerState;

  switch (action.type) {
    case 'START':
      return { ...timerState, isRunning: true };
    case 'PAUSE':
      return { ...timerState, isRunning: false };
    case 'TICK':
      return {
        ...timerState,
        millisecondsPassed: millisecondsPassed + 100,
      };
    case 'RESET':
      return initialTimerState;
    case 'COMPLETE_POMODORO': {
      // only increase counter, after a break
      // if there is a selected task, use it's pomodorosDone count
      // if not, use timerState's completedPomodoros count
      const newCount = activeTask
        ? onBreak
          ? activeTask.pomodorosDone
          : activeTask.pomodorosDone + 1
        : onBreak
          ? completedPomodoros
          : completedPomodoros + 1;

      return {
        completedPomodoros: newCount,
        onBreak: !onBreak,
        millisecondsPassed: 0,
        isRunning: false,

        // update activeTask's count
        activeTask: activeTask
          ? { ...activeTask, pomodorosDone: newCount }
          : activeTask,
      };
    }

    case 'SET_ACTIVE_TASK':
      return {
        ...timerState,
        activeTask: action.payload,
      };
    default:
      throw new Error('Unknown timer action');
  }
}
