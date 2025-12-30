import HighlightCon from './HighlightCon';
import type { ReactNode } from 'react';

interface NavigationListProps {
  children: ReactNode;
}

export default function NavigationList({ children }: NavigationListProps) {
  return (
    <ul className="nav-list">
      <HighlightCon />
      {children}
    </ul>
  );
}
