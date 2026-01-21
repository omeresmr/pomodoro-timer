import TimerContent from '../components/Timer/TimerContent';
import TaskList from '../components/Tasks/TaskList';
import { type TaskState } from '../models/task.model';

interface TimerPageProps {
  tasks: TaskState[];
  setTasks: React.Dispatch<React.SetStateAction<TaskState[]>>;
}

export default function TimerPage({ tasks, setTasks }: TimerPageProps) {
  return (
    <div className="timer-wrapper">
      <TimerContent />
      <TaskList setTasks={setTasks} tasks={tasks} />
    </div>
  );
}
