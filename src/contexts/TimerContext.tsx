import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  type TimerState,
  createInitialTimerState,
} from '../models/timer.model';

interface TimerProviderProps {
  children: ReactNode;
}

const TimerContext = createContext<TimerState | null>(null);

export function TimerProvider({ children }: TimerProviderProps) {
  const [timer] = useState<TimerState>(createInitialTimerState());

  return (
    <TimerContext.Provider value={timer}>{children}</TimerContext.Provider>
  );
}

export const useTimer = () => {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error('useTimer must be used inside TimerProvider');
  return ctx;
};
