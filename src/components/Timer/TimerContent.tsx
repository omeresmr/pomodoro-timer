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

  const totalMilliseconds = getCurrentDuration(state, settings);
  const currentSession = getCurrentSession(state);
  const remainingMilliseconds = totalMilliseconds - state.millisecondsPassed;

  useEffect(() => {
    if (!state.isRunning) return;
    const id = setInterval(() => {
      dispatch({ type: 'TICK' });
      if (remainingMilliseconds <= 0) dispatch({ type: 'COMPLETE_POMODORO' });
    }, 100);

    return () => clearInterval(id);
  }, [state.isRunning, remainingMilliseconds]);

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
        onBreak={state.onBreak}
        totalMilliseconds={totalMilliseconds}
        remainingMilliseconds={remainingMilliseconds}
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
