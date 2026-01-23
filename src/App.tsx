import { useReducer } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import TimerPage from './pages/TimerPage';
import TasksPage from './pages/TasksPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
import ToggleDarkMode from './components/Header/ToggleDarkMode';
import Navigation from './components/Navigation/Navigation';
import { SettingsProvider } from './contexts/SettingsContext';
import taskReducer from './reducers/task.reducer';

function App() {
  const [tasksState, taskAction] = useReducer(taskReducer, []);

  return (
    <>
      <SettingsProvider>
        <BrowserRouter>
          <Header>
            <Navigation />
            <ToggleDarkMode />
          </Header>
          <main>
            <section className="flex items-center justify-center">
              <Routes>
                <Route
                  path="/"
                  element={
                    <TimerPage
                      tasksState={tasksState}
                      taskAction={taskAction}
                    />
                  }
                />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/stats" element={<StatsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </section>
          </main>
        </BrowserRouter>
      </SettingsProvider>
    </>
  );
}

export default App;
