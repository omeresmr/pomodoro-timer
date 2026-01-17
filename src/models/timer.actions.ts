import type { TaskState } from './task.model';

export type TimerAction =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'TICK' }
  | { type: 'RESET' }
  | { type: 'COMPLETE_POMODORO' }
  | { type: 'SET_ACTIVE_TASK'; payload: TaskState };
