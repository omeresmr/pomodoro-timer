import TaskInput from '../forms/CreateTaskForm';
import TaskItem from './TaskItem';
import { useTasks } from '../../contexts/TasksContext';

interface TaskListProps {
  showCompletedTasks?: boolean;
}

export default function TaskList({
  showCompletedTasks = false,
}: TaskListProps) {
  const { tasks } = useTasks();

  const sortedTasks = tasks.toSorted((a, b) => {
    // isCompleted = 0, isActive = 2, pending = 1
    const statusA = a.isCompleted ? 0 : a.isActive ? 2 : 1;
    const statusB = b.isCompleted ? 0 : b.isActive ? 2 : 1;

    return statusB - statusA;
  });

  const tasksToRender = showCompletedTasks
    ? sortedTasks
    : sortedTasks.filter((t) => !t.isCompleted);

  return (
    <div className="flex flex-col gap-2 w-full pb-10">
      <p className="font-bold text-xl">Active Tasks</p>
      <TaskInput />
      <div className="tasks-con flex justify-center items-center gap-2 flex-col">
        {tasksToRender.map((t) => (
          <TaskItem key={t.id} task={t} />
        ))}
      </div>
    </div>
  );
}
