import { type TimerState } from '../models/timer.model';
import { type TimerAction } from '../models/timer.actions';
import { createInitialTimerState } from '../models/timer.model';

export const initialTimerState = createInitialTimerState();

export default function timerReducer(
  timerState: TimerState,
  action: TimerAction
) {
  const { onBreak, completedPomodoros, millisecondsPassed, activeTaskId } =
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
      // only increase counter after a pomodoro
      const newCount = !onBreak ? completedPomodoros + 1 : completedPomodoros;

      return {
        completedPomodoros: newCount,
        onBreak: !onBreak,
        millisecondsPassed: 0,
        isRunning: false,
        activeTaskId: activeTaskId,
      };
    }
    case 'SET_ACTIVE_TASK':
      return {
        ...timerState,
        activeTaskId: action.payload.id,
      };
    default:
      throw new Error('Unknown timer action');
  }
}
