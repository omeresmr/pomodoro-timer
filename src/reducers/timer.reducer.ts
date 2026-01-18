import { type TimerState } from '../models/timer.model';
import { type TimerAction } from '../models/timer.actions';

export const initialState = {
  secondsPassed: 0,
  completedPomodoros: 0,
  onBreak: false,
  isRunning: false,
  activeTask: null,
};

export default function reducer(state: TimerState, action: TimerAction) {
  const { onBreak, completedPomodoros, secondsPassed } = state;

  switch (action.type) {
    case 'START':
      return { ...state, isRunning: true };
    case 'PAUSE':
      return { ...state, isRunning: false };
    case 'TICK':
      return {
        ...state,
        secondsPassed: secondsPassed + 1,
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
        secondsPassed: 0,
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
