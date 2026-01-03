import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

// TODO: add localStorage & system preferences
export default function ToggleDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [isDark]);

  return (
    <button
      className="toggle-dark rounded-full p-2 hover:bg-secondary"
      onClick={() => setIsDark(!isDark)}
    >
      <Moon className="w-5 h-5 block dark:hidden" />
      <Sun className="w-5 h-5 hidden dark:block" />
    </button>
  );
}
