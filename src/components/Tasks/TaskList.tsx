import TaskInput from './TaskInput';
import TaskItem from './TaskItem';
import { type TaskState } from '../../models/task.model';
import type { TimerAction } from '../../models/timer.actions';
import type { TaskAction } from '../../models/task.actions';
import type { TimerState } from '../../models/timer.model';

interface TaskListProps {
  tasksState: TaskState[];
  timerState: TimerState;
  taskAction: React.ActionDispatch<[action: TaskAction]>;
  timerAction: React.ActionDispatch<[action: TimerAction]>;
  showAlert: (message: string) => void;
}
export default function TaskList({
  timerAction,
  tasksState,
  taskAction,
  timerState,
  showAlert,
}: TaskListProps) {
  return (
    <div className="flex flex-col gap-2 w-full pb-10">
      <p className="font-bold text-xl">Active Tasks</p>
      <TaskInput taskAction={taskAction} showAlert={showAlert} />
      <div className="tasks-con flex justify-center items-center gap-2 flex-col">
        {tasksState.map((t) => (
          <TaskItem
            timerState={timerState}
            key={t.id}
            task={t}
            tasksState={tasksState}
            taskAction={taskAction}
            timerAction={timerAction}
            showAlert={showAlert}
          />
        ))}
      </div>
    </div>
  );
}
