import { type TaskStatus } from '../../models/task.model';

interface TaskStatusProps {
  status: TaskStatus;
}

export default function TaskStatus({ status }: TaskStatusProps) {
  return (
    <div className={`task-status capitalize task-status-${status}`}>
      {status}
    </div>
  );
}
