import ProgressCircle from './ProgressCircle';
import formatMilliseconds from '../../lib/formatMilliSeconds';

interface TimerDisplayProps {
  remainingMilliseconds: number;
  totalMilliseconds: number;
  onBreak: boolean;
  session: string;
}

export default function TimerDisplay({
  remainingMilliseconds,
  totalMilliseconds,
  session,
  onBreak,
}: TimerDisplayProps) {
  return (
    <div className="timer-display-wrapper">
      <ProgressCircle
        remainingMilliseconds={remainingMilliseconds}
        totalMilliseconds={totalMilliseconds}
        onBreak={onBreak}
      />
      <div className="absolute flex gap-2 flex-col items-center justify-center">
        <p className="text-5xl font-extrabold">
          {formatMilliseconds(remainingMilliseconds)}
        </p>
        <p className="text-muted-foreground">Session {session}</p>
      </div>
    </div>
  );
}
