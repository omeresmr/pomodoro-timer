import Task from '../models/Task.js';
import { timer } from '../main.js';
import {
  toggleTaskInfo,
  showAlert,
  slideToSection,
  setTaskState,
} from '../utils/ui.js';

export const tasks = [];
const tasksSection = document.querySelector('.tasks-section');

const saveTasks = () => {
  const newTasks = JSON.stringify(tasks);

  localStorage.setItem('tasks', newTasks);
};

export const deleteTask = (taskId) => {
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

export const handleTaskCompletion = (task, mode = 'automatic') => {
  if (mode === 'automatic') {
    // Check if the estimated Pomodoros are done
    task.completeIfReady();
  }

  // TODO
  if (mode === 'manual') {
    task.isComplete = true;
  }

  if (!task.isComplete) return;

  // Hide task info on timer page
  toggleTaskInfo(task.id);

  // Change task UI on tasks page
  setTaskState(task.id, 'complete');
  showAlert(`${task.name} finished! 👏`);

  // Slide to Tasks Section
  slideToSection(tasksSection);
  timer.activeTask = null;
};
