export type TaskStatus = 'active' | 'completed' | 'pending';

export interface TaskState {
  id: number;
  name: string;
  estimatedPomodoros: number;
  pomodorosDone: number;
  isActive: boolean;
  isCompleted: boolean;
}
