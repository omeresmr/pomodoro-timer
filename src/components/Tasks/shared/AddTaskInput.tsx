interface AddTaskInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AddTaskInput({ value, onChange }: AddTaskInputProps) {
  return (
    <input
      value={value}
      onChange={onChange}
      type="text"
      placeholder="Add a new task..."
      className="task-name-input"
    />
  );
}
