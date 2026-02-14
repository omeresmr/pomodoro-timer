import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

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
export function TasksProvider({ children }: TasksProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createTask = useCallback((name: string) => {
    const newTask = {
      id: Date.now(),
      name,
      estimatedPomodoros: 4,
      pomodorosDone: 0,
      isActive: false,
      isCompleted: false,
    };

    dispatch({ type: 'task/created', payload: newTask });
  }, []);

  const updateTask = useCallback((task: TaskState) => {
    dispatch({ type: 'task/updated', payload: task });
  }, []);

  const deleteTask = useCallback((task: TaskState) => {
    dispatch({ type: 'task/deleted', payload: task });
  }, []);

  const runTask = useCallback((task: TaskState) => {
    dispatch({ type: 'task/started', payload: task });
  }, []);

  const pauseTask = useCallback((task: TaskState) => {
    dispatch({ type: 'task/paused', payload: task });
  }, []);

  // Complete task manually (via checkbox)
  const completeTask = useCallback((task: TaskState) => {
    dispatch({ type: 'task/completed', payload: task });
  }, []);

  // Uncomplete task manually (via checkbox)
  const uncompleteTask = useCallback((task: TaskState) => {
    dispatch({ type: 'task/uncompleted', payload: task });
  }, []);

  // Increment pomodorosDone
  const completeTaskPomodoro = useCallback((task: TaskState) => {
    dispatch({ type: 'task/session_ended', payload: task });
  }, []);

  // Derive task status (pending, completed, active)
  const getTaskStatus = useCallback((task: TaskState): TaskStatus => {
    const { isActive, isCompleted } = task;

    if (isCompleted) return 'completed';
    if (isActive) return 'active';

    return 'pending';
  }, []);

  const tasksValue = useMemo(() => {
    return {
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
    };
  }, [
    state,
    createTask,
    updateTask,
    deleteTask,
    runTask,
    pauseTask,
    completeTask,
    uncompleteTask,
    completeTaskPomodoro,
    getTaskStatus,
  ]);

  return (
    <TasksContext.Provider value={tasksValue}>{children}</TasksContext.Provider>
  );
}

export const useTasks = () => {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks must be used inside TasksProvider');
  return ctx;
};
