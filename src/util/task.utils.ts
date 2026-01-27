import type { TaskState } from '../models/task.model';

export const getActiveTask = (tasks: TaskState[], activeId: number | null) =>
  tasks.find((t) => t.id === activeId) || null;
