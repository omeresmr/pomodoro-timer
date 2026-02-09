import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Toaster } from './shared/ui/sonner';

import Header from './shared/layout/header/Header';
import TimerPage from './pages/TimerPage';
import TasksPage from './pages/TasksPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
import ToggleDarkMode from './shared/layout/header/ToggleDarkMode';
import Navigation from './shared/layout/navigation/Navigation';

import { SettingsProvider } from './features/settings/contexts/SettingsContext';
import { TasksProvider } from './features/tasks/contexts/TasksContext';
import { TimerProvider } from './features/timer/contexts/TimerContext';

function App() {
  return (
    <>
      <SettingsProvider>
        <TimerProvider>
          <TasksProvider>
            <BrowserRouter>
              <Header>
                <Navigation />
                <ToggleDarkMode />
              </Header>
              <main>
                <section className="flex items-center justify-center">
                  <Routes>
                    <Route path="/" element={<TimerPage />} />
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/stats" element={<StatsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Routes>
                  <Toaster />
                </section>
              </main>
            </BrowserRouter>
          </TasksProvider>
        </TimerProvider>
      </SettingsProvider>
    </>
  );
}

export default App;
