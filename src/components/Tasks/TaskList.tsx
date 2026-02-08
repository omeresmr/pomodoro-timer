import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import { useTasks } from '../../contexts/TasksContext';

export default function TaskList() {
  const { tasks } = useTasks();

  const sortedTasks = tasks.toSorted((a, b) => {
    // isCompleted = 0, isActive = 2, pending = 1
    const statusA = a.isCompleted ? 0 : a.isActive ? 2 : 1;
    const statusB = b.isCompleted ? 0 : b.isActive ? 2 : 1;

    return statusB - statusA;
  });

  return (
    <div className="flex flex-col gap-2 w-full pb-10">
      <p className="font-bold text-xl">Active Tasks</p>
      <TaskInput />
      <div className="tasks-con flex justify-center items-center gap-2 flex-col">
        {sortedTasks.map((t) => (
          <TaskItem key={t.id} task={t} />
        ))}
      </div>
    </div>
  );
}
