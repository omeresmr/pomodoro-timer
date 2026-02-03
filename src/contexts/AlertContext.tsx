import { createContext, useContext, useReducer } from 'react';

///////////////////////////////
// REDUCER
///////////////////////////////

// 1) action type
type AlertAction =
  | { type: 'ADD_ALERT'; payload: string }
  | { type: 'REMOVE_CUR_ALERT' };

// 2) state type
type AlertState = { currentAlert: string | null; alertQueue: string[] };

// 3) reducer function
function alertReducer(state: AlertState, action: AlertAction) {
  const { alertQueue } = state;

  switch (action.type) {
    case 'ADD_ALERT':
      // enqueue alert
      if (state.currentAlert)
        return { ...state, alertQueue: [...alertQueue, action.payload] };
      else return { ...state, currentAlert: action.payload };
    case 'REMOVE_CUR_ALERT':
      // dequeue next alert (or clear currentAlert)
      if (state.alertQueue.length === 0)
        return { ...state, currentAlert: null };

      return {
        currentAlert: state.alertQueue[0],
        alertQueue: alertQueue.slice(1),
      };
    default:
      throw new Error('Unknown alert action');
  }
}

///////////////////////////////
// CONTEXT
///////////////////////////////

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
