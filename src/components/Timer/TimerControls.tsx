import IconButton from '../Buttons/IconButton';
import PrimaryButton from '../Buttons/PrimaryButton';
import { RotateCcw } from 'lucide-react';

export default function TimerControls() {
  return (
    <div className="relative flex items-center justify-center">
      <PrimaryButton className="px-12 py-2.5 rounded-3xl">
        Start Focus
      </PrimaryButton>
      <IconButton className="absolute -right-12">
        <RotateCcw className="w-4 h-4" />
      </IconButton>
    </div>
  );
}
