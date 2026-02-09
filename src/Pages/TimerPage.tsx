import TimerContent from '../features/timer/components/TimerContent';
import TaskList from '../features/tasks/components/list/TaskList';
import { useTasks } from '../features/tasks/contexts/TasksContext';
import { useTimer } from '../features/timer/contexts/TimerContext';
import { toast } from 'sonner';

export default function TimerPage() {
  const { timerState, completeTimerPomodoro, resetTimer } = useTimer();
  const { tasks, completeTaskPomodoro } = useTasks();

  function handleCompletion() {
    completeTimerPomodoro();

    if (timerState.onBreak) toast.success('Break cycle ended.');
    else toast.success('Pomodoro cycle ended.');

    const activeTask = tasks.find((t) => t.id === timerState.activeTaskId);

    if (!activeTask) return;

    if (!timerState.onBreak) {
      completeTaskPomodoro(activeTask);

      // Check if the task would end after incrementing finished pomodoros
      // If yes, reset timer
      if (activeTask?.pomodorosDone + 1 >= activeTask?.estimatedPomodoros) {
        resetTimer();
      }
    }
  }

  return (
    <div className="timer-wrapper">
      <TimerContent handleCompletion={handleCompletion} />
      <TaskList />
    </div>
  );
}
