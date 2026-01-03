import { Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="logo">
      <Timer className="logo-gradient logo-icon" />
      <p className="logo-gradient logo-text">FocusFlow</p>
    </Link>
  );
}
