import TaskInput from './TaskInput';
import TaskItem from './TaskItem';

export default function TaskList() {
  return (
    <div className="flex flex-col gap-2 w-full pb-10">
      <p className="font-bold text-xl">Active Tasks</p>
      <TaskInput />
      <div className="tasks-con flex justify-center items-center gap-2 flex-col">
        <TaskItem />
      </div>
    </div>
  );
}
