import './events.js';
import Settings from './models/Settings.js';
import PomodoroTimer from './models/Timer.js';
import { sortTasks } from './events.js';
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
sortTasks();
renderSettings();
renderTime(timer.currentDuration);

// TODO List:
// Was passiert, wenn ein User eine Task abschließt, aber dann doch wieder _manualComplete weg haben möchte? -> Uncomplete Button
// Wenn alle Tasks beendet sind -> Alert anzeigen -> Clear Tasks Button
// Timer und active Task im Footer anzeigen
// Add Timer to document.title
// Reset Settings Button
// Split Settings into Sections (capsulate in more objects e.g timer, general, tasks)
// Sound Volume Setting
