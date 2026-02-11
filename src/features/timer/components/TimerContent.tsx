import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

import { useTasks } from '../../tasks/contexts/TasksContext';
import { useTimer } from '../contexts/TimerContext';
import { useSettings } from '../../settings/contexts/SettingsContext';

import Card from '../../../shared/ui/card/Card';
import IconButton from '../../../shared/ui/buttons/IconButton';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import CurrentTask from './CurrentTask';
import {
  getCurrentDuration,
  getCurrentSession,
} from '../../../shared/utils/timer.utils';

export default function TimerContent() {
  const settings = useSettings();
  const { tasks, completeTaskPomodoro } = useTasks();
  const { timerState, timerTick, handleSessionCompletion } = useTimer();

  const activeTask = tasks.find((t) => t.id === timerState.activeTaskId);

  const totalMilliseconds = getCurrentDuration(timerState, settings);
  const currentSession = getCurrentSession(timerState, tasks);
  const remainingMilliseconds =
    totalMilliseconds - timerState.millisecondsPassed;

  // React to timerTick
  useEffect(() => {
    if (!timerState.isRunning) return;
    const id = setInterval(() => {
      timerTick();
      if (remainingMilliseconds <= 0)
        handleSessionCompletion(tasks, completeTaskPomodoro);
    }, 100);

    return () => clearInterval(id);
  }, [
    timerState.isRunning,
    remainingMilliseconds,
    handleSessionCompletion,
    timerTick,
    completeTaskPomodoro,
    tasks,
  ]);

  function handleSkipPhase() {
    handleSessionCompletion(tasks, completeTaskPomodoro);
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
      <TimerControls />
      <CurrentTask />
    </Card>
  );
}
