import { useTasks } from '../../contexts/TasksContext';
import { useTimer } from '../../contexts/TimerContext';
import IconButton from '../Buttons/IconButton';
import PrimaryButton from '../Buttons/PrimaryButton';
import { RotateCcw } from 'lucide-react';

export default function TimerControls() {
  const { startTimer, pauseTimer, resetTimer, timerState } = useTimer();
  const { pauseTask, tasks } = useTasks();
  const activeTask = tasks.find((t) => t.id === timerState.activeTaskId);

  function handleReset() {
    resetTimer();
    if (!activeTask) return;
    pauseTask(activeTask);
  }

  function handleToggleTimer() {
    if (timerState.isRunning) pauseTimer();
    else startTimer();
  }

  return (
    <div className="relative flex items-center justify-center">
      <PrimaryButton
        className="px-12 py-2.5 rounded-3xl min-w-44.25 "
        handleClick={handleToggleTimer}
      >
        {timerState.isRunning ? 'Pause' : 'Start Focus'}
      </PrimaryButton>
      <IconButton onClick={handleReset} className="absolute -right-12">
        <RotateCcw className="w-4 h-4" />
      </IconButton>
    </div>
  );
}
