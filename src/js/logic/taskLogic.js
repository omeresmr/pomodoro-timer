import Task from '../models/Task.js';

export const tasks = [];

const saveTasks = () => {
  const newTasks = JSON.stringify(tasks);

  localStorage.setItem('tasks', newTasks);
};

const deleteTask = (taskId) => {
  const indexToDelete = tasks.findIndex((task) => task.id === taskId);

  if (indexToDelete === -1) return;

  tasks.splice(indexToDelete, 1);
};

export const addTask = (taskName, estPomos) => {
  const newTask = new Task(taskName, estPomos);
  tasks.push(newTask);
  saveTasks();

  return newTask;
};

export const findTask = (taskId) => tasks.find((task) => task.id === taskId);
