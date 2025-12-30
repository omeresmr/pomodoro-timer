import { Timer } from 'lucide-react';

export default function Logo() {
  return (
    <a className="logo" href="./index.html">
      <Timer className="logo-gradient logo-icon" />
      <p className="logo-gradient logo-text">FocusFlow</p>
    </a>
  );
}
