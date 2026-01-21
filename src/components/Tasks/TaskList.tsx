import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import { type TaskState } from '../../models/task.model';

interface TaskListProps {
  tasks: TaskState[];
  setTasks: React.Dispatch<React.SetStateAction<TaskState[]>>;
}
export default function TaskList({ tasks, setTasks }: TaskListProps) {
  return (
    <div className="flex flex-col gap-2 w-full pb-10">
      <p className="font-bold text-xl">Active Tasks</p>
      <TaskInput tasks={tasks} setTasks={setTasks} />
      <div className="tasks-con flex justify-center items-center gap-2 flex-col">
        {tasks.map((t) => (
          <TaskItem key={t.id} task={t} />
        ))}
      </div>
    </div>
  );
}
