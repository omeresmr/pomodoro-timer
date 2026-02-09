import { createContext, useContext, useReducer } from 'react';

import reducer, { initialTimerState } from '../reducers/timer.reducer';
import { type TimerState } from '../models/timer.model';
import { type TaskState } from '../../tasks/models/task.model';

// 1) provider value type
type TimerProviderValue = {
  timerState: TimerState;
  startTimer: () => void;
  pauseTimer: () => void;
  timerTick: () => void;
  completeTimerPomodoro: () => void;
  initActiveTask: (task: TaskState | null) => void;
  resetTimer: () => void;
};

// 2) prop interface
interface TimerProviderProps {
  children: React.ReactNode;
}

// 3) context
const TimerContext = createContext<TimerProviderValue | null>(null);

// 4) provider component
export function TimerProvider({ children }: TimerProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialTimerState);

  function startTimer() {
    dispatch({ type: 'timer/started' });
  }

  function pauseTimer() {
    dispatch({ type: 'timer/paused' });
  }

  function timerTick() {
    dispatch({ type: 'timer/ticked' });
  }

  function completeTimerPomodoro() {
    dispatch({ type: 'timer/pomodoro_completed' });
  }

  // null -> reset activeTask
  function initActiveTask(task: TaskState | null) {
    dispatch({ type: 'timer/active_task_changed', payload: task });
  }

  function resetTimer() {
    dispatch({ type: 'timer/reseted' });
  }

  return (
    <TimerContext.Provider
      value={{
        timerState: state,
        startTimer,
        pauseTimer,
        timerTick,
        completeTimerPomodoro,
        initActiveTask,
        resetTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export const useTimer = () => {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error('useTimer must be used inside TimerProvider');
  return ctx;
};
