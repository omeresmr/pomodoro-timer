import { Play, Pencil } from 'lucide-react';
import TaskActionButton from '../../Buttons/TaskActionButton';

interface TaskActionProps {
  handleEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleStartTask: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function TaskActions({
  handleEdit,
  handleStartTask,
}: TaskActionProps) {
  return (
    <div className="flex justify-center gap-1 lg:opacity-0 duration-200 lg:group-hover:opacity-100">
      <TaskActionButton
        onClick={handleStartTask}
        className="hover:bg-success/10 hover:text-success"
      >
        <Play className="w-4 h-4" />
      </TaskActionButton>
      <TaskActionButton
        onClick={handleEdit}
        className="hover:bg-brand-accent/10 hover:text-brand-primary"
      >
        <Pencil className="w-4 h-4" />
      </TaskActionButton>
    </div>
  );
}
