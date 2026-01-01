import type { ReactNode } from 'react';

interface TaskCardProps {
  className: string;
  children: ReactNode;
}

export default function TaskCard({ className, children }: TaskCardProps) {
  return <div className={`task-card ${className}`}>{children}</div>;
}
