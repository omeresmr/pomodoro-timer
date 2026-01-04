import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import TimerPage from './pages/TimerPage';
import TasksPage from './pages/TasksPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
import ToggleDarkMode from './components/Header/ToggleDarkMode';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <>
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
          </section>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
