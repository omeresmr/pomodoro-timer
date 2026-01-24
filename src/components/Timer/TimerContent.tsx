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
import type { TaskAction } from '../../models/task.actions';

interface TimerContentProps {
  timerState: TimerState;
  taskAction: React.ActionDispatch<[action: TaskAction]>;
  timerAction: React.ActionDispatch<[action: TimerAction]>;
  handleCompletion: () => void;
}

export default function TimerContent({
  timerState,
  timerAction,
  taskAction,
  handleCompletion,
}: TimerContentProps) {
  const settings = useSettings();

  const totalMilliseconds = getCurrentDuration(timerState, settings);
  const currentSession = getCurrentSession(timerState);
  const remainingMilliseconds =
    totalMilliseconds - timerState.millisecondsPassed;

  useEffect(() => {
    if (!timerState.isRunning) return;
    const id = setInterval(() => {
      timerAction({ type: 'TICK' });
      if (remainingMilliseconds <= 0) handleCompletion();
    }, 100);

    return () => clearInterval(id);
  }, [
    timerAction,
    timerState.isRunning,
    remainingMilliseconds,
    handleCompletion,
  ]);

  function handleToggleTimer() {
    if (timerState.isRunning) timerAction({ type: 'PAUSE' });
    else timerAction({ type: 'START' });
  }

  function handleSkipPhase() {
    handleCompletion();
  }

  function handleReset() {
    timerAction({ type: 'RESET' });

    if (!timerState.activeTask) return;

    // reset the status of activeTask
    taskAction({ type: 'RESET', payload: timerState.activeTask });
  }

  return (
    <Card className="flex-col gap-4 self-start">
      <TimerDisplay
        onBreak={timerState.onBreak}
        totalMilliseconds={totalMilliseconds}
        remainingMilliseconds={remainingMilliseconds}
        session={`${currentSession}/${timerState.activeTask ? timerState.activeTask.estimatedPomodoros : settings.longBreakInterval}`}
      />

      <IconButton
        onClick={handleSkipPhase}
        className={timerState.isRunning ? '' : 'collapse'}
      >
        <ArrowRight className="w-4 h-4" />
      </IconButton>

      <TimerControls
        isTimerRunning={timerState.isRunning}
        handleToggleTimer={handleToggleTimer}
        handleReset={handleReset}
      />

      <CurrentTask task={timerState.activeTask} />
    </Card>
  );
}
