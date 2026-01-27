import type { TaskState } from './task.model';

export type TaskAction =
  | { type: 'CREATE'; payload: TaskState }
  | { type: 'UPDATE'; payload: TaskState }
  | { type: 'SET_ACTIVE'; payload: TaskState }
  | { type: 'INCREMENT_POMODORO'; payload: TaskState }
  | { type: 'COMPLETE_TASK'; payload: TaskState }
  | { type: 'UNCOMPLETE_TASK'; payload: TaskState }
  | { type: 'DELETE'; payload: TaskState }
  | { type: 'RESET'; payload: TaskState };
