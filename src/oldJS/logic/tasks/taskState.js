import { tasks } from './taskActions.js';
import { sortTasks } from '../../events.js';
import { toggleTaskInfo, renderTask } from '../../utils/ui/taskUI.js';
import { navigateToSection } from '../../utils/ui/sectionUI.js';
import { showAlert } from '../../utils/ui/alertUI.js';
import { dom } from '../../utils/ui/dom.js';
import { saveTasks } from './taskStorage.js';

export const startTask = (task) => {
  // Reset status of the active tasks to default
  tasks.forEach((task) =>
    task.status === 'active' ? (task.status = 'default') : task.status,
  );

  // Set task state to active
  task.start();
};

export const handleTaskCompletion = (task, mode = 'automatic') => {
  // Change status to default
  task.stop();

  // Change status to complete
  if (mode === 'manual') task.complete();

  // Check if task is complete, if yes, status -> complete
  if (mode === 'automatic') task.isComplete;

  saveTasks();

  if (task.status !== 'completed') return;

  renderTask(task);
  sortTasks();

  // Hide task info on timer page
  toggleTaskInfo(task);

  showAlert(`${task.name} finished! 👏`);

  // Slide to Tasks Section
  navigateToSection(dom.navigationTasks);
};
