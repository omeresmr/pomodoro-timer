import { type ReactNode, type RefObject } from 'react';

interface NavigationListProps {
  children: ReactNode;
  listRef: RefObject<null | HTMLUListElement>;
}

export default function NavigationList({
  children,
  listRef,
}: NavigationListProps) {
  return (
    <ul className="nav-list" ref={listRef}>
      {children}
    </ul>
  );
}
