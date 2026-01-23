import { type TaskState, type TaskStatus } from '../models/task.model';
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
      return tasksState.map((t) => (t.id === enteredTask.id ? enteredTask : t));
    case 'SET_ACTIVE':
      return tasksState.map((t) =>
        t.id === enteredTask.id
          ? { ...t, status: 'active' as TaskStatus }
          : { ...t, status: 'default' as TaskStatus }
      );
    case 'DELETE':
      return tasksState.filter((t) => t.id !== enteredTask.id);
    default:
      throw new Error('Unknown task action');
  }
}
