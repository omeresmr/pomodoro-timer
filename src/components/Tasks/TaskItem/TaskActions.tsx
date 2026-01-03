import { Play, Pencil } from 'lucide-react';
import TaskActionButton from '../../Buttons/TaskActionButton';

export default function TaskActions() {
  return (
    <div className="flex justify-center gap-1 lg:opacity-0 duration-200 lg:group-hover:opacity-100">
      <TaskActionButton className="hover:bg-success/10 hover:text-success">
        <Play className="w-4 h-4" />
      </TaskActionButton>
      <TaskActionButton className="hover:bg-brand-accent/10 hover:text-brand-primary">
        <Pencil className="w-4 h-4" />
      </TaskActionButton>
    </div>
  );
}
