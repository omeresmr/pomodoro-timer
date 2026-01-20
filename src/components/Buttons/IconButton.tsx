import type { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function IconButton({
  children,
  className,
  onClick,
}: IconButtonProps) {
  return (
    <button onClick={onClick} className={`btn-icon ${className}`}>
      {children}
    </button>
  );
}
