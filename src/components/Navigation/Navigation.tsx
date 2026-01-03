import { useLocation, Link } from 'react-router-dom';
import NavigationList from './NavigationList';
import NavigationItem from './NavigationItem';
import HighlightCon from './HighlightCon';
import { Timer, ListTodo, ChartColumn, Settings } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';

export default function Navigation() {
  const location = useLocation();
  const listRef = useRef<HTMLUListElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const updateHighlight = () => {
      const activeItem = listRef.current?.querySelector(
        '.active-link'
      ) as HTMLElement;

      if (activeItem && highlightRef.current) {
        highlightRef.current.style.left = `${activeItem.offsetLeft}px`;
        highlightRef.current.style.width = `${activeItem.offsetWidth}px`;
      }
    };

    // run instantly, as soon as the route changes
    updateHighlight();

    // ResizeObserver for precise updates
    const observer = new ResizeObserver(() => updateHighlight());

    if (listRef.current) observer.observe(listRef.current);

    // cleanup, stop observer
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <nav>
      <NavigationList listRef={listRef}>
        <HighlightCon highlightRef={highlightRef} />
        <NavigationItem
          className={`${location.pathname === '/' ? 'active-link' : ''}`}
        >
          <Link
            to="/"
            className={`${location.pathname === '/' ? 'active-link' : ''} nav-link`}
          >
            <Timer />
            Timer
          </Link>
        </NavigationItem>
        <NavigationItem>
          <Link
            to="/tasks"
            className={`${location.pathname === '/tasks' ? 'active-link' : ''} nav-link`}
          >
            <ListTodo />
            Tasks
          </Link>
        </NavigationItem>
        <NavigationItem>
          <Link
            to="/stats"
            className={`${location.pathname === '/stats' ? 'active-link' : ''} nav-link`}
          >
            <ChartColumn />
            Stats
          </Link>
        </NavigationItem>
        <NavigationItem>
          <Link
            to="/settings"
            className={`${location.pathname === '/settings' ? 'active-link' : ''} nav-link`}
          >
            <Settings />
            Settings
          </Link>
        </NavigationItem>
      </NavigationList>
    </nav>
  );
}
