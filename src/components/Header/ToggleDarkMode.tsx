import { Sun, Moon } from 'lucide-react';

export default function ToggleDarkMode() {
  return (
    <button className="toggle-dark rounded-full p-2 hover:bg-secondary">
      <Moon className="w-5 h-5 block dark:hidden" />
      <Sun className="w-5 h-5 hidden dark:block" />
    </button>
  );
}
