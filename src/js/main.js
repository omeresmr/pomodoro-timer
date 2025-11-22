import './events.js';
import Settings from './models/Settings.js';
import PomodoroTimer from './models/Timer.js';
import { renderSettings } from './utils/ui/settingsUI.js';
import { renderTime } from './utils/ui/timerUI.js';
import { renderTask } from './utils/ui/taskUI.js';
import { tasks } from './logic/tasks/taskActions.js';
import { loadTasks } from './logic/tasks/taskStorage.js';

////////////////////////////////////
// Initialization
////////////////////////////////////
export const timer = new PomodoroTimer();
export const settings = new Settings();

loadTasks();

tasks.forEach((task) => renderTask(task));
renderSettings();
renderTime(settings.durations.pomodoro * 60);
