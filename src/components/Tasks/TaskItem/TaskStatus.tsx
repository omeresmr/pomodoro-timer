interface TaskStatusProps {
  status: 'active' | 'completed' | 'pending';
}

export default function TaskStatus({ status }: TaskStatusProps) {
  return (
    <div className={`task-status capitalize task-status-${status}`}>
      {status}
    </div>
  );
}
