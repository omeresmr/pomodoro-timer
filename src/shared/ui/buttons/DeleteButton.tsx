import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="justify-self-start flex items-center justify-center text-destructive gap-3 hover:bg-destructive/10 p-2 rounded-md duration-200"
    >
      <Trash2 />
      <span className="hidden sm:inline">Delete</span>
    </button>
  );
}
