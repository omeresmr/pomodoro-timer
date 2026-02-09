import { useRef, useEffect } from 'react';
import PrimaryButton from '../buttons/PrimaryButton';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taskName: string;
  handleDeleteTask: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Modal({
  isOpen,
  setIsOpen,
  taskName,
  handleDeleteTask,
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
        <p className="text-lg">
          Delete task <span className="font-bold">{taskName}</span>?
        </p>
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setIsOpen(false)} className="cancel-btn">
            Cancel
          </button>
          <PrimaryButton
            className="py-1 px-8 rounded-lg"
            handleClick={handleDeleteTask}
          >
            OK
          </PrimaryButton>
        </div>
      </div>
    </dialog>
  );
}
