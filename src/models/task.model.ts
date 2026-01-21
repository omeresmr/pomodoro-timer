export type TaskStatus = 'default' | 'active' | 'completed';

export interface TaskState {
  id: number;
  name: string;
  estimatedPomodoros: number;
  pomodorosDone: number;
  status: TaskStatus;
}

export const createTask = (name: string): TaskState => ({
  id: Date.now(),
  name,
  estimatedPomodoros: 4,
  pomodorosDone: 0,
  status: 'default',
});
