import TaskInput from './forms/CreateTaskForm';
import TaskList from './list/TaskList';

export default function TasksContent() {
  return (
    <div className="flex flex-col gap-2 w-full pb-10">
      <p className="font-bold text-xl">Active Tasks</p>
      <TaskInput />
      <TaskList />
    </div>
  );
}
