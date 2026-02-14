import { useRef, useEffect } from 'react';
import PrimaryButton from '../buttons/PrimaryButton';
import Icon from '../icon/Icon';
import { TriangleAlert } from 'lucide-react';

interface ModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteTask: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isOpen: boolean;
  taskName: string;
  heading: string;
}

export default function Modal({
  isOpen,
  setIsOpen,
  taskName,
  handleDeleteTask,
  heading,
}: ModalProps) {
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) dialog.showModal();
    else dialog.close();
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-layout">
        <div className="flex flex-col items-center justify-center gap-2.5">
          <Icon className="w-10 h-10 p-1 bg-destructive/10">
            <TriangleAlert className="text-destructive w-7 h-7" />
          </Icon>
          <h2 className="text-xl font-bold">{heading}</h2>
          <p className="text-md text-muted-foreground leading-relaxed">
            Are you sure you want to delete task{' '}
            <span className="text-foreground">{taskName}</span>?
          </p>
        </div>
        <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-border/50">
          <button onClick={() => setIsOpen(false)} className="cancel-btn">
            Cancel
          </button>
          <PrimaryButton
            className="py-1 px-8 rounded-lg"
            handleClick={handleDeleteTask}
          >
            Delete
          </PrimaryButton>
        </div>
      </div>
    </dialog>
  );
}
