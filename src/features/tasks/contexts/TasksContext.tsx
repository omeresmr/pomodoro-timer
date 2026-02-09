import { createContext, useContext, useReducer } from 'react';

import { type TaskState, type TaskStatus } from '../models/task.model';
import reducer from '../reducers/task.reducer';

// 1) provider value type
type TasksProviderValue = {
  tasks: TaskState[];
  createTask: (name: string) => void;
  updateTask: (task: TaskState) => void;
  deleteTask: (task: TaskState) => void;
  runTask: (task: TaskState) => void;
  pauseTask: (task: TaskState) => void;
  completeTask: (task: TaskState) => void;
  uncompleteTask: (task: TaskState) => void;
  completeTaskPomodoro: (task: TaskState) => void;
  getTaskStatus: (task: TaskState) => TaskStatus;
};

// 2) prop interface
interface TasksProviderProps {
  children: React.ReactNode;
}

// 3) context
const TasksContext = createContext<TasksProviderValue | null>(null);

// 4) initialState
const initialState: TaskState[] = [];

// 5) provider component
function TasksProvider({ children }: TasksProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function createTask(name: string) {
    const newTask = {
      id: Date.now(),
      name,
      estimatedPomodoros: 4,
      pomodorosDone: 0,
      isActive: false,
      isCompleted: false,
    };

    dispatch({ type: 'task/created', payload: newTask });
  }

  function updateTask(task: TaskState) {
    dispatch({ type: 'task/updated', payload: task });
  }

  function deleteTask(task: TaskState) {
    dispatch({ type: 'task/deleted', payload: task });
  }

  function runTask(task: TaskState) {
    dispatch({ type: 'task/started', payload: task });
  }

  function pauseTask(task: TaskState) {
    dispatch({ type: 'task/paused', payload: task });
  }

  // Complete task manually (via checkbox)
  function completeTask(task: TaskState) {
    dispatch({ type: 'task/completed', payload: task });
  }

  // Uncomplete task manually (via checkbox)
  function uncompleteTask(task: TaskState) {
    dispatch({ type: 'task/uncompleted', payload: task });
  }

  // Increment pomodorosDone
  function completeTaskPomodoro(task: TaskState) {
    dispatch({ type: 'task/session_ended', payload: task });
  }

  // Derive task status (pending, completed, active)
  function getTaskStatus(task: TaskState): TaskStatus {
    const { isActive, isCompleted } = task;

    if (isCompleted) return 'completed';
    if (isActive) return 'active';

    return 'pending';
  }

  return (
    <TasksContext.Provider
      value={{
        tasks: state,
        createTask,
        updateTask,
        deleteTask,
        runTask,
        pauseTask,
        completeTask,
        uncompleteTask,
        completeTaskPomodoro,
        getTaskStatus,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

const useTasks = () => {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks can only be used in its provider.');
  return ctx;
};

export { TasksProvider, useTasks };
