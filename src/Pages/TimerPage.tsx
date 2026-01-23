import TimerContent from '../components/Timer/TimerContent';
import TaskList from '../components/Tasks/TaskList';
import { type TaskState } from '../models/task.model';
import reducer, { initialState } from '../reducers/timer.reducer';
import { useReducer } from 'react';

interface TimerPageProps {
  tasks: TaskState[];
  setTasks: React.Dispatch<React.SetStateAction<TaskState[]>>;
}

export default function TimerPage({ tasks, setTasks }: TimerPageProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleCompletion() {
    dispatch({ type: 'COMPLETE_POMODORO' });
    const { activeTask } = state;

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
        state={state}
        dispatch={dispatch}
        handleCompletion={handleCompletion}
      />
      <TaskList setTasks={setTasks} tasks={tasks} dispatch={dispatch} />
    </div>
  );
}
