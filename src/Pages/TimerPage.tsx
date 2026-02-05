import { useReducer } from 'react';

import TimerContent from '../components/Timer/TimerContent';
import TaskList from '../components/Tasks/TaskList';
import timerReducer, { initialTimerState } from '../reducers/timer.reducer';
import { useAlert } from '../contexts/AlertContext';
import { useTasks } from '../contexts/TasksContext';

export default function TimerPage() {
  const [timerState, timerAction] = useReducer(timerReducer, initialTimerState);

  const alertCtx = useAlert();
  const { showAlert } = alertCtx;
  const { tasks, completeTaskPomodoro } = useTasks();

  function handleCompletion() {
    timerAction({ type: 'COMPLETE_POMODORO' });

    const { onBreak, activeTaskId } = timerState;

    if (onBreak) showAlert('Break cycle ended.');
    else showAlert('Pomodoro cycle ended.');

    if (!activeTaskId) return;

    const activeTask = tasks.find((t) => t.id === timerState.activeTaskId);

    if (!activeTask) return;

    if (!onBreak) {
      completeTaskPomodoro(activeTask);

      // Check if the task would end after incrementing finished pomodoros
      // If yes, reset timer
      if (activeTask?.pomodorosDone + 1 >= activeTask?.estimatedPomodoros) {
        timerAction({ type: 'RESET' });
      }
    }
  }

  return (
    <div className="timer-wrapper">
      <TimerContent
        timerState={timerState}
        timerAction={timerAction}
        handleCompletion={handleCompletion}
      />
      <TaskList timerState={timerState} timerAction={timerAction} />
    </div>
  );
}
