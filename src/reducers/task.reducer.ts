import { type TaskState } from '../models/task.model';
import { type TaskAction } from '../models/task.actions';

export default function taskReducer(
  tasksState: TaskState[],
  action: TaskAction
) {
  const { payload: enteredTask } = action;

  switch (action.type) {
    case 'CREATE':
      return [...tasksState, enteredTask];
    case 'UPDATE':
      return tasksState.map((t) =>
        t.id === enteredTask.id
          ? {
              ...enteredTask,
              status:
                enteredTask.pomodorosDone < enteredTask.estimatedPomodoros
                  ? 'pending'
                  : enteredTask.status,
            }
          : t
      );
    case 'SET_ACTIVE':
      return tasksState.map((t) =>
        t.id === enteredTask.id
          ? { ...t, status: 'active' }
          : { ...t, status: 'pending' }
      );
    case 'INCREMENT_POMODORO': {
      return tasksState.map((t) =>
        t.id === enteredTask.id
          ? {
              ...t,
              pomodorosDone: t.pomodorosDone + 1,
              status:
                t.pomodorosDone + 1 >= t.estimatedPomodoros
                  ? 'completed'
                  : t.status,
            }
          : t
      );
    }
    case 'COMPLETE_TASK':
      return tasksState.map((t) =>
        t.id === enteredTask.id ? { ...t, status: 'completed' } : t
      );
    case 'UNCOMPLETE_TASK':
      return tasksState.map((t) =>
        t.id === enteredTask.id ? { ...t, status: 'pending' } : t
      );
    case 'DELETE':
      return tasksState.filter((t) => t.id !== enteredTask.id);
    case 'RESET':
      return tasksState.map((t) =>
        t.id === enteredTask.id ? { ...t, status: 'pending' } : { ...t }
      );
    default:
      throw new Error('Unknown task action');
  }
}
