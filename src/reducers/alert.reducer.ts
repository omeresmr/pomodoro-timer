type AlertAction =
  | { type: 'ADD_ALERT'; payload: string }
  | { type: 'REMOVE_CUR_ALERT' };

type AlertState = { currentAlert: string | null; alertQueue: string[] };

export function alertReducer(state: AlertState, action: AlertAction) {
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
