import IconButton from '../Buttons/IconButton';
import PrimaryButton from '../Buttons/PrimaryButton';
import { RotateCcw } from 'lucide-react';

interface TimerControlsProps {
  handleToggleTimer: () => void;
  isTimerRunning: boolean;
}

export default function TimerControls({
  handleToggleTimer,
  isTimerRunning,
}: TimerControlsProps) {
  return (
    <div className="relative flex items-center justify-center">
      <PrimaryButton
        className="px-12 py-2.5 rounded-3xl min-w-44.25 "
        handleClick={handleToggleTimer}
      >
        {isTimerRunning ? 'Pause' : 'Start Focus'}
      </PrimaryButton>
      <IconButton className="absolute -right-12">
        <RotateCcw className="w-4 h-4" />
      </IconButton>
    </div>
  );
}
