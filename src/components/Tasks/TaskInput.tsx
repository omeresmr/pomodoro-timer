import { useState } from 'react';
import { Plus } from 'lucide-react';

import PrimaryButton from '../Buttons/PrimaryButton';
import AddTaskInput from './shared/AddTaskInput';
import { useTasks } from '../../contexts/TasksContext';
import { toast } from 'sonner';

export default function TaskInput() {
  const [taskName, setTaskName] = useState('');

  const { createTask } = useTasks();

  function addTask() {
    // If user didn't type anything, return
    if (!taskName) return;

    // Create task
    createTask(taskName);

    // Show alert
    toast.success(`${taskName} created.`);

    // Reset input value
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
