import { useLocation, Link } from 'react-router-dom';
import NavigationList from './NavigationList';
import NavigationItem from './NavigationItem';
import { Timer, ListTodo, ChartColumn, Settings } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();

  return (
    <nav>
      <NavigationList>
        <NavigationItem
          className={location.pathname === '/' ? 'active-link' : ''}
        >
          <Link to="/">
            <Timer />
            Timer
          </Link>
        </NavigationItem>
        <NavigationItem
          className={location.pathname === '/tasks' ? 'active-link' : ''}
        >
          <Link to="/tasks">
            <ListTodo />
            Tasks
          </Link>
        </NavigationItem>
        <NavigationItem
          className={location.pathname === '/stats' ? 'active-link' : ''}
        >
          <Link to="/stats">
            <ChartColumn />
            Stats
          </Link>
        </NavigationItem>
        <NavigationItem
          className={location.pathname === '/settings' ? 'active-link' : ''}
        >
          <Link to="/settings">
            <Settings />
            Settings
          </Link>
        </NavigationItem>
      </NavigationList>
    </nav>
  );
}
