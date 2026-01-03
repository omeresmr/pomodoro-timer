import Logo from './Logo';
import type { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header>
      <Logo />
      {children}
    </header>
  );
}
