import { useEffect, useReducer } from 'react';

import IconButton from '../Buttons/IconButton';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import CurrentTask from './CurrentTask';
import Card from '../Card/Card';
import { ArrowRight } from 'lucide-react';
import reducer, { initialState } from '../../reducers/timer.reducer';

export default function TimerContent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.isRunning) return;
    const id = setInterval(() => dispatch({ type: 'TICK' }), 1000);

    return () => clearInterval(id);
  }, [state.isRunning]);

  function handleToggleTimer() {
    if (state.isRunning) dispatch({ type: 'PAUSE' });
    else dispatch({ type: 'START' });
  }

  return (
    <Card className="flex-col gap-4 self-start">
      <TimerDisplay time="25:00" session="1/4" />

      <IconButton>
        <ArrowRight className="w-4 h-4" />
      </IconButton>

      <TimerControls handleToggleTimer={handleToggleTimer} />

      <CurrentTask taskName="Refactor React" />
    </Card>
  );
}
