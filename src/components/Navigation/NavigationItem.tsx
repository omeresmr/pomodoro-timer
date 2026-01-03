import type { ReactNode } from 'react';

interface NavigationItemProps {
  className?: string;
  children: ReactNode;
}

export default function NavigationItem({ children }: NavigationItemProps) {
  return <li>{children}</li>;
}
