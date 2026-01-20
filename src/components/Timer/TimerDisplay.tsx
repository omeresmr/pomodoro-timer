import formatMilliseconds from '../../util/formatMilliSeconds';

interface TimerDisplayProps {
  remainingMilliseconds: number;
  session: string;
}

export default function TimerDisplay({
  remainingMilliseconds,
  session,
}: TimerDisplayProps) {
  return (
    <div className="timer-display-wrapper">
      <p className="text-5xl font-extrabold">
        {formatMilliseconds(remainingMilliseconds)}
      </p>
      <p className="text-muted-foreground">Session {session}</p>
    </div>
  );
}
