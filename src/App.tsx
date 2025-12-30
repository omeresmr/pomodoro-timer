import Header from './components/Header/Header';
import NavigationList from './components/Navigation/NavigationList';
import NavigationItem from './components/Navigation/NavigationItem';
import ToggleDarkMode from './components/Header/ToggleDarkMode';
import { Timer, ListTodo, ChartColumn, Settings } from 'lucide-react';

function App() {
  return (
    <>
      <Header>
        <nav>
          <NavigationList>
            <NavigationItem className="active-link">
              <Timer />
              Timer
            </NavigationItem>
            <NavigationItem>
              <ListTodo />
              Tasks
            </NavigationItem>
            <NavigationItem>
              <ChartColumn />
              Stats
            </NavigationItem>
            <NavigationItem>
              <Settings />
              Settings
            </NavigationItem>
          </NavigationList>
        </nav>
        <ToggleDarkMode />
      </Header>
    </>
  );
}

export default App;
