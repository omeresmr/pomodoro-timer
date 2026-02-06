import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import { useTasks } from '../../contexts/TasksContext';

export default function TaskList() {
  const { tasks } = useTasks();

  return (
    <div className="flex flex-col gap-2 w-full pb-10">
      <p className="font-bold text-xl">Active Tasks</p>
      <TaskInput />
      <div className="tasks-con flex justify-center items-center gap-2 flex-col">
        {tasks.map((t) => (
          <TaskItem key={t.id} task={t} />
        ))}
      </div>
    </div>
  );
}
