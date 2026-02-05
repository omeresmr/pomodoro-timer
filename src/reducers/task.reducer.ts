import { type TaskState } from '../models/task.model';

// 1) action type
export type TaskAction =
  | { type: 'task/created'; payload: TaskState }
  | { type: 'task/updated'; payload: TaskState }
  | { type: 'task/started'; payload: TaskState }
  | { type: 'task/paused'; payload: TaskState }
  | { type: 'task/session_ended'; payload: TaskState }
  | { type: 'task/completed'; payload: TaskState }
  | { type: 'task/uncompleted'; payload: TaskState }
  | { type: 'task/deleted'; payload: TaskState }
  | { type: 'task/resetted'; payload: TaskState };

// 2) reducer function

function reducer(tasksState: TaskState[], action: TaskAction) {
  const { payload: enteredTask } = action;

  switch (action.type) {
    case 'task/created':
      return [...tasksState, enteredTask];

    case 'task/updated':
      return tasksState.map((t) =>
        t.id === enteredTask.id
          ? {
              ...enteredTask,
              isCompleted: t.pomodorosDone >= t.estimatedPomodoros,
            }
          : t
      );

    case 'task/started':
      return tasksState.map((t) =>
        t.id === enteredTask.id ? { ...t, isActive: true } : t
      );

    case 'task/paused':
      return tasksState.map((t) =>
        t.id === enteredTask.id ? { ...t, isActive: false } : t
      );

    case 'task/session_ended': {
      return tasksState.map((t) =>
        t.id === enteredTask.id
          ? {
              ...t,
              pomodorosDone: t.pomodorosDone + 1,
              isCompleted:
                t.pomodorosDone + 1 >= t.estimatedPomodoros
                  ? true
                  : t.isCompleted,
            }
          : t
      );
    }

    case 'task/completed':
      return tasksState.map((t) =>
        t.id === enteredTask.id ? { ...t, isCompleted: true } : t
      );

    case 'task/uncompleted':
      return tasksState.map((t) =>
        t.id === enteredTask.id ? { ...t, isCompleted: false } : t
      );

    case 'task/deleted':
      return tasksState.filter((t) => t.id !== enteredTask.id);

    default:
      throw new Error('Unknown task action');
  }
}

export default reducer;
