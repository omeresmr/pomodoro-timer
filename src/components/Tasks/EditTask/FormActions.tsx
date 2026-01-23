import PrimaryButton from '../../Buttons/PrimaryButton';

interface FormActionsProps {
  handleCancelEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleSaveTask: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function FormActions({
  handleCancelEdit,
  handleSaveTask,
}: FormActionsProps) {
  return (
    <div className="flex gap-2 justify-self-end">
      <button onClick={handleCancelEdit} className="cancel-btn">
        Cancel
      </button>
      <PrimaryButton
        handleClick={handleSaveTask}
        className="py-1 px-8 rounded-lg"
      >
        Save
      </PrimaryButton>
    </div>
  );
}
