export type TaskStatus = 'default' | 'active' | 'completed';

export interface TaskState {
  id: number;
  name: string;
  estimatedPomodoros: number;
  pomodorosDone: number;
  status: TaskStatus;
}

export const createTask = (
  name: string,
  estimatedPomodoros: number
): TaskState => ({
  id: Date.now(),
  name,
  estimatedPomodoros,
  pomodorosDone: 0,
  status: 'default',
});
