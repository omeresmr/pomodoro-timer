import FormField from './FormField';
import PomodoroCircles from '../shared/PomodoroCircles';
import FormActions from './FormActions';
import DeleteButton from '../../Buttons/DeleteButton';
import type { TaskState } from '../../../models/task.model';
import Modal from '../../Modal';
import { useEffect, useRef, useState } from 'react';

interface EditTaskProps {
  handleCancelEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  task: TaskState;
  setTasks: React.Dispatch<React.SetStateAction<TaskState[]>>;
  tasks: TaskState[];
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditTask({
  handleCancelEdit,
  tasks,
  setTasks,
  task,
  setIsEditing,
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
    setTasks((tasks) => tasks.filter((t) => t.id !== task.id));
  }

  function handleSaveTask() {
    setTasks((tasks) => [
      ...tasks.filter((t) => t.id !== task.id),
      { ...task, ...updatedTask },
    ]);
    setIsEditing(false);
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
        value={updatedTask.pomodorosDone}
        onChange={(e) =>
          setUpdatedTask({ ...updatedTask, pomodorosDone: +e.target.value })
        }
      />
      <FormField
        type="number"
        label="Estimated"
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
