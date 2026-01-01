import Header from './components/Header/Header';
import NavigationList from './components/Navigation/NavigationList';
import NavigationItem from './components/Navigation/NavigationItem';
import ToggleDarkMode from './components/Header/ToggleDarkMode';
import TimerContent from './components/Timer/TimerContent';
import TaskList from './components/Tasks/TaskList';
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
      <main>
        <section className="flex items-center justify-center">
          <div className="timer-wrapper">
            <TimerContent />
            <TaskList />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
