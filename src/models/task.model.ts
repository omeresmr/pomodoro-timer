export type TaskStatus = 'default' | 'active' | 'completed';

export interface TaskData {
  id: number;
  name: string;
  estimatedPomodoros: number;
  pomodorosDone: number;
  status: TaskStatus;
}

export const createTask = (
  name: string,
  estimatedPomodoros: number
): TaskData => ({
  id: Date.now(),
  name,
  estimatedPomodoros,
  pomodorosDone: 0,
  status: 'default',
});
