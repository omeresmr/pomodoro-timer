import type { TaskState } from './task.model';

export type TaskAction =
  | { type: 'CREATE'; payload: TaskState }
  | { type: 'UPDATE'; payload: TaskState }
  | { type: 'SET_ACTIVE'; payload: TaskState }
  | { type: 'DELETE'; payload: TaskState };
