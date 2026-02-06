import TimerContent from '../components/Timer/TimerContent';
import TaskList from '../components/Tasks/TaskList';
import { useAlert } from '../contexts/AlertContext';
import { useTasks } from '../contexts/TasksContext';
import { useTimer } from '../contexts/TimerContext';

export default function TimerPage() {
  const { showAlert } = useAlert();
  const { timerState, completeTimerPomodoro, resetTimer } = useTimer();
  const { tasks, completeTaskPomodoro } = useTasks();

  function handleCompletion() {
    completeTimerPomodoro();

    if (timerState.onBreak) showAlert('Break cycle ended.');
    else showAlert('Pomodoro cycle ended.');

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
