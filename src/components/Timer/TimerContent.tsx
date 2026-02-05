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
import { useTasks } from '../../contexts/TasksContext';

interface TimerContentProps {
  timerState: TimerState;
  handleCompletion: () => void;
  timerAction: React.ActionDispatch<[action: TimerAction]>;
}

export default function TimerContent({
  timerState,
  handleCompletion,
  timerAction,
}: TimerContentProps) {
  const settings = useSettings();
  const { tasks, pauseTask } = useTasks();
  const activeTask = tasks.find((t) => t.id === timerState.activeTaskId);

  const totalMilliseconds = getCurrentDuration(timerState, settings);
  const currentSession = getCurrentSession(timerState, tasks);
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

    if (!activeTask) return;

    // reset the status of activeTask
    pauseTask(activeTask);
  }

  return (
    <Card className="flex-col gap-4 self-start">
      <TimerDisplay
        onBreak={timerState.onBreak}
        totalMilliseconds={totalMilliseconds}
        remainingMilliseconds={remainingMilliseconds}
        session={`${currentSession}/${activeTask ? activeTask.estimatedPomodoros : settings.longBreakInterval}`}
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

      <CurrentTask task={activeTask} />
    </Card>
  );
}
