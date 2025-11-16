export const tasks = [];

export const saveTasks = () => {
  const newTasks = JSON.stringify(tasks);

  localStorage.setItem('tasks', newTasks);
};
