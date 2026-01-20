import type { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  className?: string;
  handleClick: () => void;
}

export default function PrimaryButton({
  className,
  children,
  handleClick,
}: PrimaryButtonProps) {
  return (
    <button onClick={handleClick} className={`btn-primary ${className}`}>
      {children}
    </button>
  );
}
