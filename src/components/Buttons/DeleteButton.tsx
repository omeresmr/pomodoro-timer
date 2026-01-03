import { Trash2 } from 'lucide-react';

export default function DeleteButton() {
  return (
    <button className="justify-self-start flex items-center justify-center text-destructive gap-3 hover:bg-destructive/10 p-2 rounded-md duration-200">
      <Trash2 />
      Delete
    </button>
  );
}
