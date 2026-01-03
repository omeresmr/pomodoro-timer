import PrimaryButton from '../../Buttons/PrimaryButton';

export default function FormActions() {
  return (
    <div className="flex gap-2 justify-self-end">
      <button className="bg-background py-1 px-8 rounded-lg shadow-sm shadow-background">
        Cancel
      </button>
      <PrimaryButton className="py-1 px-8 rounded-lg">Save</PrimaryButton>
    </div>
  );
}
