import type { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  className?: string;
}

export default function PrimaryButton({
  className,
  children,
}: PrimaryButtonProps) {
  return <button className={`btn-primary ${className}`}>{children}</button>;
}
