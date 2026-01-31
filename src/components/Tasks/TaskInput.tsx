import { useState } from 'react';
import PrimaryButton from '../Buttons/PrimaryButton';
import AddTaskInput from './shared/AddTaskInput';
import { Plus } from 'lucide-react';
import { createTask, type TaskState } from '../../models/task.model';
import type { TaskAction } from '../../models/task.actions';

interface TaskInputProps {
  taskAction: React.ActionDispatch<[action: TaskAction]>;
  showAlert: (message: string) => void;
}

export default function TaskInput({ taskAction, showAlert }: TaskInputProps) {
  const [taskName, setTaskName] = useState('');

  function addTask() {
    if (!taskName) return;

    const newTask: TaskState = createTask(taskName);
    taskAction({ type: 'CREATE', payload: newTask });

    showAlert(`${taskName} created.`);

    setTaskName('');
  }

  return (
    <div className="flex items-center justify-center w-full gap-2">
      <AddTaskInput
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') addTask();
        }}
      />
      <PrimaryButton
        handleClick={() => addTask()}
        className="rounded-full p-2 flex items-center justify-center"
      >
        <Plus className="w-4 h-4" />
      </PrimaryButton>
    </div>
  );
}
