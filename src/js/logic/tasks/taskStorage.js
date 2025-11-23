import Task from '../../models/Task.js';
import { tasks } from './taskActions.js';

// local storage
export const saveTasks = () => {
  const newTasks = JSON.stringify(tasks);

  localStorage.setItem('tasks', newTasks);
};

export const loadTasks = () => {
  const savedTasks = localStorage.getItem('tasks');
  if (!savedTasks) return;

  const parsedTasks = JSON.parse(savedTasks);
  parsedTasks.forEach((t) => {
    const task = new Task(t.name, t.estimatedPomodoros);
    task.pomodorosDone = t.pomodorosDone;
    task.isActive = t.isActive;
    task.id = t.id;

    tasks.push(task);
  });
};
