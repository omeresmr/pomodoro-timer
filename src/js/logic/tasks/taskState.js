import { tasks } from './taskActions.js';
import {
  toggleTaskInfo,
  setTaskState,
  renderTask,
} from '../../utils/ui/taskUI.js';
import { slideToSection } from '../../utils/ui/sectionUI.js';
import { showAlert } from '../../utils/ui/alertUI.js';
import { dom } from '../../utils/ui/dom.js';
import { saveTasks } from './taskStorage.js';

export const startTask = (task) => {
  tasks.forEach((task) => (task.active = false));

  task.start();
};

// TODO optimize this function
export const handleTaskCompletion = (task, mode = 'automatic') => {
  if (mode === 'automatic') task.isComplete;
  if (mode === 'manual') task.complete();

  // Change task UI on tasks page
  renderTask(task, true);

  task.stop();
  saveTasks();
  task.start();

  if (!task.isComplete) return;

  task.stop();
  renderTask(task, true);

  // Hide task info on timer page
  toggleTaskInfo(task);

  setTaskState(task.id, 'complete');
  showAlert(`${task.name} finished! 👏`);

  // Slide to Tasks Section
  slideToSection(dom.tasksSection);
};
