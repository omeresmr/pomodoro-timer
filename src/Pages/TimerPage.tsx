import TimerContent from '../components/Timer/TimerContent';
import TaskList from '../components/Tasks/TaskList';
import { type TaskState } from '../models/task.model';
import reducer, { initialTimerState } from '../reducers/timer.reducer';
import { useReducer } from 'react';

interface TimerPageProps {
  tasks: TaskState[];
  setTasks: React.Dispatch<React.SetStateAction<TaskState[]>>;
}

export default function TimerPage({ tasks, setTasks }: TimerPageProps) {
  const [timerState, timerAction] = useReducer(reducer, initialTimerState);

  function handleCompletion() {
    timerAction({ type: 'COMPLETE_POMODORO' });
    const { activeTask } = timerState;

    if (!activeTask) return;

    // update the activeTask in tasks array
    setTasks((tasks) => [
      ...tasks.filter((t) => t.id !== activeTask.id),
      activeTask,
    ]);
  }

  return (
    <div className="timer-wrapper">
      <TimerContent
        timerState={timerState}
        timerAction={timerAction}
        handleCompletion={handleCompletion}
      />
      <TaskList setTasks={setTasks} tasks={tasks} timerAction={timerAction} />
    </div>
  );
}
