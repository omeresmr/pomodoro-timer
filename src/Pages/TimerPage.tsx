import TimerContent from '../components/Timer/TimerContent';
import TaskList from '../components/Tasks/TaskList';
import { type TaskState } from '../models/task.model';
import timerReducer, { initialTimerState } from '../reducers/timer.reducer';
import { type TaskAction } from '../models/task.actions';
import { useReducer } from 'react';

interface TimerPageProps {
  tasksState: TaskState[];
  taskAction: React.ActionDispatch<[action: TaskAction]>;
}

export default function TimerPage({ tasksState, taskAction }: TimerPageProps) {
  const [timerState, timerAction] = useReducer(timerReducer, initialTimerState);

  function handleCompletion() {
    timerAction({ type: 'COMPLETE_POMODORO' });
    const { activeTask } = timerState;

    if (!activeTask) return;

    // update activeTask
    taskAction({ type: 'UPDATE', payload: activeTask });
  }

  return (
    <div className="timer-wrapper">
      <TimerContent
        timerState={timerState}
        taskAction={taskAction}
        timerAction={timerAction}
        handleCompletion={handleCompletion}
      />
      <TaskList
        timerState={timerState}
        taskAction={taskAction}
        tasksState={tasksState}
        timerAction={timerAction}
      />
    </div>
  );
}
