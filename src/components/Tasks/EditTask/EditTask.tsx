import { useEffect, useRef, useState, forwardRef } from 'react';

import FormField from './FormField';
import PomodoroCircles from '../shared/PomodoroCircles';
import FormActions from './FormActions';
import DeleteButton from '../../Buttons/DeleteButton';
import Modal from '../../Modal';
import type { TaskState } from '../../../models/task.model';
import type { TaskAction } from '../../../models/task.actions';
import type { TimerState } from '../../../models/timer.model';
import { useAlert } from '../../../contexts/AlertContext';

interface EditTaskProps extends React.HTMLAttributes<HTMLDivElement> {
  task: TaskState;
  taskAction: React.ActionDispatch<[TaskAction]>;
  timerState: TimerState;
  handleCancelEdit: (e: React.MouseEvent) => void;
  setIsEditing: (value: boolean) => void;
}

const EditTask = forwardRef<HTMLDivElement, EditTaskProps>((props, ref) => {
  const {
    task,
    handleCancelEdit,
    taskAction,
    timerState,
    setIsEditing,
    ...motionProps
  } = props;

  const [updatedTask, setUpdatedTask] = useState({
    name: task.name,
    estimatedPomodoros: task.estimatedPomodoros,
    pomodorosDone: task.pomodorosDone,
  });
  const [isOpen, setIsOpen] = useState(false);
  const taskNameInput = useRef<HTMLInputElement | null>(null);

  const alertCtx = useAlert();
  const { showAlert } = alertCtx;

  useEffect(() => {
    if (!taskNameInput.current) return;
    taskNameInput.current.focus();
  }, []);

  function handleDeleteTask() {
    taskAction({ type: 'DELETE', payload: task });

    showAlert(`${task.name} deleted successfully.`);
  }

  function handleSaveTask() {
    const newTask = { ...task, ...updatedTask };

    // update tasks state
    taskAction({ type: 'UPDATE', payload: newTask });

    setIsEditing(false);

    showAlert(`${newTask.name} saved.`);

    if (!timerState.activeTaskId) return;
  }

  function handleUpdateDonePomodoros(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = +e.target.value;

    setUpdatedTask((prev) => {
      let validatedValue = newValue;

      if (validatedValue > prev.estimatedPomodoros)
        validatedValue = prev.estimatedPomodoros;

      return { ...prev, pomodorosDone: validatedValue };
    });
  }

  return (
    <div ref={ref} {...motionProps} className="edit-task-card relative">
      <FormField
        className="col-span-2"
        label="Task Name"
        value={updatedTask.name}
        onChange={(e) =>
          setUpdatedTask({ ...updatedTask, name: e.target.value })
        }
        ref={taskNameInput}
      />
      <FormField
        type="number"
        label="Completed"
        min={0}
        value={updatedTask.pomodorosDone}
        onChange={handleUpdateDonePomodoros}
      />
      <FormField
        type="number"
        label="Estimated"
        min={updatedTask.pomodorosDone + 1}
        value={updatedTask.estimatedPomodoros}
        onChange={(e) =>
          setUpdatedTask({
            ...updatedTask,
            estimatedPomodoros: +e.target.value,
          })
        }
      />

      <div className="col-span-2 flex items-center gap-1.5 rounded-md w-full p-3 border border-border bg-background">
        <PomodoroCircles
          total={updatedTask.estimatedPomodoros}
          completed={updatedTask.pomodorosDone}
        />
      </div>
      <DeleteButton onClick={() => setIsOpen(true)} />
      <FormActions
        handleCancelEdit={handleCancelEdit}
        handleSaveTask={handleSaveTask}
      />
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        taskName={task.name}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
});

export default EditTask;
