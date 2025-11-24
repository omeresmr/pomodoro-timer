import { TASK_ACTION_ICONS } from '../constants.js';
import { dom } from '../ui/dom.js';

const getTaskInnerHTML = (task) => `
  <div class="text-center">
    <p class="task-name ${task.isComplete ? 'text-gray-500 line-through' : 'text-accent'} font-semibold text-xl">${task.name}</p>
    <p class="pomodoro-progress font-semibold">${task.pomodorosDone} of ${task.estimatedPomodoros}</p>
  </div>

  <div class="flex gap-4">
    <button class="start-task svg-button ${task.isComplete ? 'hidden' : ''}">${task.isActive ? TASK_ACTION_ICONS.stop : TASK_ACTION_ICONS.start}</button>
    <button class="edit-task svg-button">${TASK_ACTION_ICONS.edit}</button>
    <button class="delete-task svg-button">${TASK_ACTION_ICONS.delete}</button>
    <button class="complete-task svg-button ${task.isComplete ? 'hidden' : ''}">${TASK_ACTION_ICONS.complete}</button>
  </div>

  <div class="flex items-center justify-center flex-col w-full gap-2">
    <div class="h-4 border-2 border-text w-full overflow-hidden rounded-full">
      <div class="progress-bar ${task.isComplete ? 'bg-green-500' : task.isActive ? 'bg-accent' : 'bg-text'} h-3" style="width: ${task.progressPercentage}%"></div>
    </div>
    <p class="text-xs font-bold">${task.progressPercentage}%</p>
  </div>
`;

const getTaskOuterHTML = (task, innerHTML) => `
  <div class="task-container bg-secondary flex items-center flex-col justify-center p-5 w-9/10 max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl gap-4" data-id="${task.id}">
    ${innerHTML}
  </div>
`;

export const renderTask = (task) => {
  const taskInnerHTML = getTaskInnerHTML(task);
  const taskOuterHTML = getTaskOuterHTML(task, taskInnerHTML);

  const taskEl = document.querySelector(
    `.task-container[data-id="${task.id}"]`,
  );
  const taskExists = !!taskEl;

  if (!taskExists) {
    dom.tasksContainer.insertAdjacentHTML('beforeend', taskOuterHTML);
    return;
  }

  taskEl.innerHTML = taskInnerHTML;
};

export const removeTask = (task) => {
  const taskToRemove = document.querySelector(`[data-id="${task.id}"]`);

  taskToRemove.remove();
};

export const renderEditTaskForm = (task) => {
  const taskToEdit = document.querySelector(`[data-id="${task.id}"]`);

  const html = `
        <div class="w-full">
          <input class="text-input text-center font-semibold text-xl w-full" type="text" value="${task.name}" placeholder="Enter task name"/>
        </div>

        <div class="w-full">
          <div class="flex items-center justify-center gap-3">
            <input class="new-completed-pomos font-semibold number-input text-center" type="number" value="${task.pomodorosDone}" min="0"/>
            <span class="font-semibold text-lg">of</span>
            <input class="new-est-pomos font-semibold number-input text-center" type="number" value="${task.estimatedPomodoros}" min="1"/>
          </div>
        </div>

        <div class="flex gap-3 w-full">
          <button class="save-edited-task button px-8 py-2 flex-1">Save</button>
          <button class="cancel-edit-task dialog-button bg-secondary border border-border-input flex-1 py-2 cancel-edit">Cancel</button>
        </div>
    `;

  taskToEdit.innerHTML = html;
};

// toggles task info on the timer section
export const toggleTaskInfo = (task) => {
  const taskInfoCon = document.querySelector('.task-info-container');
  const taskNameLabel = taskInfoCon.querySelector('.task-name');
  const estimatedPomodorosLabel = taskInfoCon.querySelector('.est-pomos');

  if (task.isComplete || !task.isActive || !task) {
    taskInfoCon.classList.add('hidden');
    return;
  }

  taskInfoCon.classList.remove('hidden');
  taskNameLabel.textContent = task.name;
  estimatedPomodorosLabel.textContent = `${task?.pomodorosDone}/${task?.estimatedPomodoros}`;
};
