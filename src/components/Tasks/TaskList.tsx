import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import type { TimerAction } from '../../models/timer.actions';
import type { TimerState } from '../../models/timer.model';
import { useTasks } from '../../contexts/TasksContext';

interface TaskListProps {
  timerState: TimerState;
  timerAction: React.ActionDispatch<[action: TimerAction]>;
}
export default function TaskList({ timerAction, timerState }: TaskListProps) {
  const { tasks } = useTasks();

  return (
    <div className="flex flex-col gap-2 w-full pb-10">
      <p className="font-bold text-xl">Active Tasks</p>
      <TaskInput />
      <div className="tasks-con flex justify-center items-center gap-2 flex-col">
        {tasks.map((t) => (
          <TaskItem
            timerState={timerState}
            key={t.id}
            task={t}
            timerAction={timerAction}
          />
        ))}
      </div>
    </div>
  );
}
