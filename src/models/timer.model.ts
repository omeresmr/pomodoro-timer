import type { TaskState } from './task.model';

export interface TimerState {
  secondsPassed: number;
  completedPomodoros: number;
  onBreak: boolean;
  isRunning: boolean;
  activeTask: TaskState | null;
}

export const createInitialTimerState = (): TimerState => ({
  secondsPassed: 0,
  completedPomodoros: 0,
  onBreak: false,
  isRunning: false,
  activeTask: null,
});
