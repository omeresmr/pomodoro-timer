import { useEffect, useRef, useState, forwardRef } from 'react';
import { toast } from 'sonner';

import { useTasks } from '../../contexts/TasksContext';
import { useTimer } from '../../../timer/contexts/TimerContext';
import FormField from './FormField';
import FormActions from './FormActions';
import PomodoroCircles from '../display/PomodoroCircles';
import DeleteButton from '../../../../shared/ui/buttons/DeleteButton';
import Modal from '../../../../shared/ui/modal/Modal';
import type { TaskState } from '../../models/task.model';

interface EditTaskFormProps extends React.HTMLAttributes<HTMLDivElement> {
  task: TaskState;
  handleCancelEdit: (e: React.MouseEvent) => void;
  setIsEditing: (value: boolean) => void;
}

const EditTaskForm = forwardRef<HTMLDivElement, EditTaskFormProps>(
  (props, ref) => {
    const { task, handleCancelEdit, setIsEditing, ...motionProps } = props;

    const [updatedTask, setUpdatedTask] = useState({
      name: task.name,
      estimatedPomodoros: task.estimatedPomodoros,
      pomodorosDone: task.pomodorosDone,
    });
    const [isOpen, setIsOpen] = useState(false);
    const taskNameInput = useRef<HTMLInputElement | null>(null);

    const { updateTask, deleteTask } = useTasks();
    const { timerState } = useTimer();

    useEffect(() => {
      if (!taskNameInput.current) return;
      taskNameInput.current.focus();
    }, []);

    function handleDeleteTask() {
      deleteTask(task);
      toast.success(`${task.name} deleted successfully.`);
    }

    function handleSaveTask() {
      const newTask = { ...task, ...updatedTask };

      updateTask(newTask);
      setIsEditing(false);

      toast.success(`${newTask.name} saved.`);

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
          heading="Delete task"
          handleDeleteTask={handleDeleteTask}
        />
      </div>
    );
  }
);

export default EditTaskForm;
