import type { ReactNode } from 'react';

interface NavigationListProps {
  className?: string;
  children: ReactNode;
}

export default function NavigationList({
  className,
  children,
}: NavigationListProps) {
  return (
    <li>
      <a className={`nav-link ${className}`}>{children}</a>
    </li>
  );
}
