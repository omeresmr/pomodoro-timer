import { useTasks } from '../../contexts/TasksContext';
import { useTimer } from '../../contexts/TimerContext';

export default function CurrentTask() {
  const { tasks } = useTasks();
  const { timerState } = useTimer();
  const activeTask = tasks.find((t) => t.id === timerState.activeTaskId);

  return (
    <div className="flex items-center justify-center flex-col text-center gap-1">
      <p className="text-muted-foreground text-sm">Current task</p>
      {activeTask ? (
        <p className="font-bold">{activeTask.name}</p>
      ) : (
        <p className="text-muted-foreground/60 italic text-sm">
          No task selected.
        </p>
      )}
    </div>
  );
}
