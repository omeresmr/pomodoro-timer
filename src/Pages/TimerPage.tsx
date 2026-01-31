import TimerContent from '../components/Timer/TimerContent';
import TaskList from '../components/Tasks/TaskList';
import { type TaskState } from '../models/task.model';
import timerReducer, { initialTimerState } from '../reducers/timer.reducer';
import { type TaskAction } from '../models/task.actions';
import { useReducer } from 'react';
import { getActiveTask } from '../util/task.utils';

interface TimerPageProps {
  tasksState: TaskState[];
  taskAction: React.ActionDispatch<[action: TaskAction]>;
  showAlert: (message: string) => void;
}

export default function TimerPage({
  tasksState,
  taskAction,
  showAlert,
}: TimerPageProps) {
  const [timerState, timerAction] = useReducer(timerReducer, initialTimerState);

  function handleCompletion() {
    timerAction({ type: 'COMPLETE_POMODORO' });

    const { onBreak, activeTaskId } = timerState;

    if (onBreak) showAlert('Break cycle ended.');
    else showAlert('Pomodoro cycle ended.');

    if (!activeTaskId) return;

    const activeTask = getActiveTask(tasksState, activeTaskId);

    if (!activeTask) return;

    if (!onBreak) {
      taskAction({ type: 'INCREMENT_POMODORO', payload: activeTask });

      // check if the next value would be greater then est. pomos.
      if (activeTask?.pomodorosDone + 1 >= activeTask?.estimatedPomodoros) {
        timerAction({ type: 'RESET' });
      }
    }
  }

  return (
    <div className="timer-wrapper">
      <TimerContent
        timerState={timerState}
        tasksState={tasksState}
        taskAction={taskAction}
        timerAction={timerAction}
        handleCompletion={handleCompletion}
      />
      <TaskList
        timerState={timerState}
        taskAction={taskAction}
        tasksState={tasksState}
        timerAction={timerAction}
        showAlert={showAlert}
      />
    </div>
  );
}
