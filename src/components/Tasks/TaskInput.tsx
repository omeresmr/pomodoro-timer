import PrimaryButton from '../Buttons/PrimaryButton';
import AddTaskInput from './shared/AddTaskInput';
import { Plus } from 'lucide-react';

export default function TaskInput() {
  return (
    <div className="flex items-center justify-center w-full gap-2">
      <AddTaskInput />
      <PrimaryButton
        handleClick={() => console.log('temp')}
        className="rounded-full p-2 flex items-center justify-center"
      >
        <Plus className="w-4 h-4" />
      </PrimaryButton>
    </div>
  );
}
