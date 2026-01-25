import FormField from './FormField';
import PomodoroCircles from '../shared/PomodoroCircles';
import FormActions from './FormActions';
import DeleteButton from '../../Buttons/DeleteButton';
import type { TaskState } from '../../../models/task.model';
import Modal from '../../Modal';
import { useEffect, useRef, useState } from 'react';
import type { TaskAction } from '../../../models/task.actions';
import type { TimerAction } from '../../../models/timer.actions';
import type { TimerState } from '../../../models/timer.model';

interface EditTaskProps {
  task: TaskState;
  handleCancelEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  taskAction: React.ActionDispatch<[action: TaskAction]>;
  timerAction: React.ActionDispatch<[action: TimerAction]>;
  timerState: TimerState;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditTask({
  task,
  handleCancelEdit,
  taskAction,
  setIsEditing,
  timerState,
}: EditTaskProps) {
  const [updatedTask, setUpdatedTask] = useState({
    name: task.name,
    estimatedPomodoros: task.estimatedPomodoros,
    pomodorosDone: task.pomodorosDone,
  });
  const [isOpen, setIsOpen] = useState(false);
  const taskNameInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!taskNameInput.current) return;
    taskNameInput.current.focus();
  }, []);

  function handleDeleteTask() {
    taskAction({ type: 'DELETE', payload: task });
  }

  function handleSaveTask() {
    const newTask = { ...task, ...updatedTask };

    // update tasks state
    taskAction({ type: 'UPDATE', payload: newTask });

    setIsEditing(false);

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
    <div className="edit-task-card relative">
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
}
