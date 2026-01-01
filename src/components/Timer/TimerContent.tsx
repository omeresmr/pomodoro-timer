import IconButton from '../Buttons/IconButton';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import CurrentTask from './CurrentTask';
import Card from '../Card/Card';
import { ArrowRight } from 'lucide-react';

export default function TimerContent() {
  return (
    <Card className="flex-col gap-4 self-start">
      <TimerDisplay time="25:00" session="1/4" />

      <IconButton>
        <ArrowRight className="w-4 h-4" />
      </IconButton>

      <TimerControls />

      <CurrentTask taskName="Refactor React" />
    </Card>
  );
}
