import { type TimerState } from '../models/timer.model';
import { type TimerAction } from '../models/timer.actions';
import { createInitialTimerState } from '../models/timer.model';

export const initialState = createInitialTimerState();

export default function reducer(state: TimerState, action: TimerAction) {
  const { onBreak, completedPomodoros, millisecondsPassed } = state;

  switch (action.type) {
    case 'START':
      return { ...state, isRunning: true };
    case 'PAUSE':
      return { ...state, isRunning: false };
    case 'TICK':
      return {
        ...state,
        millisecondsPassed: millisecondsPassed + 100,
      };
    case 'RESET':
      return initialState;
    case 'COMPLETE_POMODORO':
      return {
        ...state,
        completedPomodoros: onBreak
          ? completedPomodoros
          : completedPomodoros + 1,
        onBreak: !onBreak,
        millisecondsPassed: 0,
        isRunning: false,
      };
    case 'SET_ACTIVE_TASK':
      return {
        ...state,
        activeTask: action.payload,
      };
    default:
      throw new Error('Unknown timer action');
  }
}
