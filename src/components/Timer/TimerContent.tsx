import { useEffect, useReducer } from 'react';

import IconButton from '../Buttons/IconButton';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import CurrentTask from './CurrentTask';
import Card from '../Card/Card';
import { ArrowRight } from 'lucide-react';
import reducer, { initialState } from '../../reducers/timer.reducer';
import { useSettings } from '../../contexts/SettingsContext';
import { getCurrentDuration } from '../../util/timer.utils';

export default function TimerContent() {
  const settings = useSettings();
  const [state, dispatch] = useReducer(reducer, initialState);

  const totalSeconds = getCurrentDuration(state, settings);

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
      <TimerDisplay
        remainingSeconds={totalSeconds - state.secondsPassed}
        session="1/4"
      />

      <IconButton>
        <ArrowRight className="w-4 h-4" />
      </IconButton>

      <TimerControls
        isTimerRunning={state.isRunning}
        handleToggleTimer={handleToggleTimer}
      />

      <CurrentTask taskName="Refactor React" />
    </Card>
  );
}
