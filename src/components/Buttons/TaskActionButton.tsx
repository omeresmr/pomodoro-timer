import type { ReactNode } from 'react';

interface TaskActionButtonProps {
  className: string;
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function TaskActionButton({
  className,
  children,
  onClick,
}: TaskActionButtonProps) {
  return (
    <button onClick={onClick} className={`btn-task-action ${className}`}>
      {children}
    </button>
  );
}
