import { tasks } from './taskActions.js';
import { sortTasks } from '../../events.js';
import { toggleTaskInfo, renderTask } from '../../utils/ui/taskUI.js';
import { navigateToSection } from '../../utils/ui/sectionUI.js';
import { showAlert } from '../../utils/ui/alertUI.js';
import { dom } from '../../utils/ui/dom.js';
import { saveTasks } from './taskStorage.js';

export const startTask = (task) => {
  tasks.forEach((task) => (task.isActive = false));

  task.start();
};

// TODO optimize this function
export const handleTaskCompletion = (task, mode = 'automatic') => {
  if (mode === 'automatic') task.isComplete;
  if (mode === 'manual') task.complete();

  // Change task UI on tasks page
  renderTask(task);

  // TODO
  task.stop();
  saveTasks();
  sortTasks();
  task.start();

  if (!task.isComplete) return;

  task.stop();
  renderTask(task);

  // Hide task info on timer page
  toggleTaskInfo(task);

  showAlert(`${task.name} finished! 👏`);

  // Slide to Tasks Section
  navigateToSection(dom.navigationTasks);
};
