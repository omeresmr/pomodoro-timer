import type { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  className?: string;
}

export default function IconButton({ children, className }: IconButtonProps) {
  return <button className={`btn-icon ${className}`}>{children}</button>;
}
