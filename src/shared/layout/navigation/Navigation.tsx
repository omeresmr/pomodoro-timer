import { useLocation, NavLink } from 'react-router-dom';
import NavigationList from './NavigationList';
import NavigationItem from './NavigationItem';
import HighlightCon from './HighlightCon';
import { Timer, ListTodo, ChartColumn, Settings } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';

export default function Navigation() {
  const location = useLocation();
  const listRef = useRef<HTMLUListElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  // Used layoutEffect, so the UI doesn't flutter
  useLayoutEffect(() => {
    const updateHighlight = () => {
      const activeItem = listRef.current?.querySelector(
        '.active'
      ) as HTMLElement;

      if (activeItem && highlightRef.current) {
        highlightRef.current.style.left = `${activeItem.offsetLeft}px`;
        highlightRef.current.style.width = `${activeItem.offsetWidth}px`;
      }
    };

    // run instantly, as soon as the route changes
    updateHighlight();

    // ResizeObserver for automatic updates, if the element size changes
    const observer = new ResizeObserver(() => updateHighlight());

    if (listRef.current) observer.observe(listRef.current);

    // cleanup, stop observer
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <nav>
      <NavigationList listRef={listRef}>
        <HighlightCon highlightRef={highlightRef} />
        <NavigationItem>
          <NavLink to="/" className="nav-link">
            <Timer />
            Timer
          </NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink to="/tasks" className="nav-link">
            <ListTodo />
            Tasks
          </NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink to="/stats" className="nav-link">
            <ChartColumn />
            Stats
          </NavLink>
        </NavigationItem>
        <NavigationItem>
          <NavLink to="/settings" className="nav-link">
            <Settings />
            Settings
          </NavLink>
        </NavigationItem>
      </NavigationList>
    </nav>
  );
}
