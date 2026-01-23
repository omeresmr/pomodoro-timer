import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import { type TaskState } from '../../models/task.model';
import type { TimerAction } from '../../models/timer.actions';
import type { TaskAction } from '../../models/task.actions';

interface TaskListProps {
  tasksState: TaskState[];
  taskAction: React.ActionDispatch<[action: TaskAction]>;
  timerAction: React.ActionDispatch<[action: TimerAction]>;
}
export default function TaskList({
  timerAction,
  tasksState,
  taskAction,
}: TaskListProps) {
  return (
    <div className="flex flex-col gap-2 w-full pb-10">
      <p className="font-bold text-xl">Active Tasks</p>
      <TaskInput taskAction={taskAction} />
      <div className="tasks-con flex justify-center items-center gap-2 flex-col">
        {tasksState.map((t) => (
          <TaskItem
            key={t.id}
            task={t}
            tasksState={tasksState}
            taskAction={taskAction}
            timerAction={timerAction}
          />
        ))}
      </div>
    </div>
  );
}
