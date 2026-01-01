import FormField from './FormField';
import PomodoroCircles from '../shared/PomodoroCircles';
import FormActions from './FormActions';
import DeleteButton from '../../Buttons/DeleteButton';

export default function EditTask() {
  return (
    <div className="edit-task-card">
      <FormField className="col-span-2" label="Task Name" />
      <FormField type="number" label="Completed" />
      <FormField type="number" label="Estimated" />

      <div className="col-span-2 flex items-center gap-1.5 rounded-md w-full p-3 border border-border bg-background">
        <PomodoroCircles total={4} completed={3} />
      </div>
      <DeleteButton />
      <FormActions />
    </div>
  );
}
