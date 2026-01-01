import TaskInput from './TaskInput';
import TaskCard from '../Card/TaskCard';

export default function TaskList() {
  return (
    <TaskCard className="flex gap-2 flex-col w-full pb-10">
      <p className="font-bold text-xl">Active Tasks</p>
      <TaskInput />
      <div className="tasks-con flex justify-center items-center gap-2 flex-col">
        {/* Change to rendering lists */}
      </div>
    </TaskCard>
  );
}
