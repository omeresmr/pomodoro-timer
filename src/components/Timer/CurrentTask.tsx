import type { TaskState } from '../../models/task.model';

interface CurrentTaskProps {
  task: TaskState | null;
}

export default function CurrentTask({ task }: CurrentTaskProps) {
  return (
    <div className="flex items-center justify-center flex-col text-center gap-1">
      <p className="text-muted-foreground text-sm">Current task</p>
      {task ? (
        <p className="font-bold">{task.name}</p>
      ) : (
        <p className="text-muted-foreground/60 italic text-sm">
          No task selected.
        </p>
      )}
    </div>
  );
}
