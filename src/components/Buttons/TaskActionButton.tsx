import type { ReactNode } from 'react';

interface TaskActionButtonProps {
  className: string;
  children: ReactNode;
}

export default function TaskActionButton({
  className,
  children,
}: TaskActionButtonProps) {
  return <button className={`btn-task-action ${className}`}>{children}</button>;
}
