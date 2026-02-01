import { createContext, useContext, useReducer } from 'react';
import { alertReducer } from '../reducers/alert.reducer';

// 1) context value interface
interface AlertContextValue {
  currentAlert: string | null;
  showAlert: (message: string) => void;
  hideAlert: () => void;
}

// 2) prop interface
interface AlertProviderProps {
  children: React.ReactNode;
}

// 3) context
const AlertContext = createContext<AlertContextValue | null>(null);

// 4) initialState
const initialState = { currentAlert: null, alertQueue: [] };

// 5) provider component
export function AlertProvider({ children }: AlertProviderProps) {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  function showAlert(message: string) {
    dispatch({ type: 'ADD_ALERT', payload: message });
  }

  function hideAlert() {
    dispatch({ type: 'REMOVE_CUR_ALERT' });
  }

  return (
    <AlertContext.Provider
      value={{ currentAlert: state.currentAlert, showAlert, hideAlert }}
    >
      {children}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlert can only be used in its provider.');
  return ctx;
};
