import { Play, Pencil, Pause } from 'lucide-react';
import TaskActionButton from '../../Buttons/TaskActionButton';
import type { TaskState } from '../../../models/task.model';

interface TaskActionProps {
  handleEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleStartTask: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleStopTask: (e: React.MouseEvent<HTMLButtonElement>) => void;
  task: TaskState;
}

export default function TaskActions({
  handleEdit,
  handleStartTask,
  handleStopTask,
  task,
}: TaskActionProps) {
  const { status } = task;

  if (status === 'completed') {
    return (
      <div className="flex justify-center gap-1 lg:opacity-0 duration-200 lg:group-hover:opacity-100">
        <TaskActionButton
          onClick={handleEdit}
          className="hover:bg-brand-accent/10 hover:text-brand-primary"
        >
          <Pencil className="w-4 h-4" />
        </TaskActionButton>
      </div>
    );
  }
  return (
    <div className="flex justify-center gap-1 lg:opacity-0 duration-200 lg:group-hover:opacity-100">
      {status === 'active' ? (
        <TaskActionButton
          onClick={handleStopTask}
          className="hover:bg-chart-5/10 hover:text-chart-5"
        >
          <Pause className="w-4 h-4" />
        </TaskActionButton>
      ) : (
        <TaskActionButton
          onClick={handleStartTask}
          className="hover:bg-success/10 hover:text-success"
        >
          <Play className="w-4 h-4" />
        </TaskActionButton>
      )}

      <TaskActionButton
        onClick={handleEdit}
        className="hover:bg-brand-accent/10 hover:text-brand-primary"
      >
        <Pencil className="w-4 h-4" />
      </TaskActionButton>
    </div>
  );
}
