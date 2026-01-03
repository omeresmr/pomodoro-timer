import Task from '../../models/Task.js';
import { saveTasks } from './taskStorage.js';

export const tasks = [];

export const deleteTask = (taskId) => {
  const indexToDelete = tasks.findIndex((task) => task.id === taskId);

  if (indexToDelete === -1) return;

  tasks.splice(indexToDelete, 1);
  saveTasks();
};

export const addTask = (taskName, estimatedPomodoros) => {
  const newTask = new Task(taskName, estimatedPomodoros);
  tasks.push(newTask);
  saveTasks();

  return newTask;
};

export const findTask = (taskId) => tasks.find((task) => task.id === taskId);
