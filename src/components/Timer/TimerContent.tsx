import { useEffect, useReducer } from 'react';

import IconButton from '../Buttons/IconButton';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import CurrentTask from './CurrentTask';
import Card from '../Card/Card';
import { ArrowRight } from 'lucide-react';
import reducer, { initialState } from '../../reducers/timer.reducer';
import { useSettings } from '../../contexts/SettingsContext';
import { getCurrentDuration, getCurrentSession } from '../../util/timer.utils';

export default function TimerContent() {
  const settings = useSettings();
  const [state, dispatch] = useReducer(reducer, initialState);

  const totalSeconds = getCurrentDuration(state, settings);
  const currentSession = getCurrentSession(state);
  const remainingSeconds = totalSeconds - state.secondsPassed;

  useEffect(() => {
    if (!state.isRunning) return;
    const id = setInterval(() => {
      dispatch({ type: 'TICK' });
      if (remainingSeconds <= 0) dispatch({ type: 'COMPLETE_POMODORO' });
    }, 1000);

    return () => clearInterval(id);
  }, [state.isRunning, remainingSeconds]);

  function handleToggleTimer() {
    if (state.isRunning) dispatch({ type: 'PAUSE' });
    else dispatch({ type: 'START' });
  }

  function handleSkipPhase() {
    dispatch({ type: 'COMPLETE_POMODORO' });
  }

  function handleReset() {
    dispatch({ type: 'RESET' });
  }

  return (
    <Card className="flex-col gap-4 self-start">
      <TimerDisplay
        remainingSeconds={remainingSeconds}
        session={`${currentSession}/${settings.longBreakInterval}`}
      />

      <IconButton
        onClick={handleSkipPhase}
        className={state.isRunning ? '' : 'collapse'}
      >
        <ArrowRight className="w-4 h-4" />
      </IconButton>

      <TimerControls
        isTimerRunning={state.isRunning}
        handleToggleTimer={handleToggleTimer}
        handleReset={handleReset}
      />

      <CurrentTask taskName="Refactor React" />
    </Card>
  );
}
