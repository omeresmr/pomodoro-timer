import { useEffect } from 'react';
import IconButton from '../Buttons/IconButton';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import CurrentTask from './CurrentTask';
import Card from '../Card/Card';
import { ArrowRight } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { getCurrentDuration, getCurrentSession } from '../../util/timer.utils';
import type { TimerState } from '../../models/timer.model';
import type { TimerAction } from '../../models/timer.actions';

interface TimerContentProps {
  state: TimerState;
  dispatch: React.ActionDispatch<[action: TimerAction]>;
  handleCompletion: () => void;
}

export default function TimerContent({
  state,
  dispatch,
  handleCompletion,
}: TimerContentProps) {
  const settings = useSettings();

  const totalMilliseconds = getCurrentDuration(state, settings);
  const currentSession = getCurrentSession(state);
  const remainingMilliseconds = totalMilliseconds - state.millisecondsPassed;

  useEffect(() => {
    if (!state.isRunning) return;
    const id = setInterval(() => {
      dispatch({ type: 'TICK' });
      if (remainingMilliseconds <= 0) handleCompletion();
    }, 100);

    return () => clearInterval(id);
  }, [dispatch, state.isRunning, remainingMilliseconds, handleCompletion]);

  function handleToggleTimer() {
    if (state.isRunning) dispatch({ type: 'PAUSE' });
    else dispatch({ type: 'START' });
  }

  function handleSkipPhase() {
    handleCompletion();
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

      <CurrentTask task={state.activeTask} />
    </Card>
  );
}
