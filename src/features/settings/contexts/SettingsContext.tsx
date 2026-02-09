import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  type SettingsState,
  createDefaultSettings,
} from '../models/settings.model';

interface SettingsProviderProps {
  children: ReactNode;
}

const SettingsContext = createContext<SettingsState | null>(null);

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings] = useState<SettingsState>(createDefaultSettings());

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings can only be used in its provider.');
  return ctx;
};
