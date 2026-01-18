import formatSeconds from '../../util/formatSeconds';

interface TimerDisplayProps {
  remainingSeconds: number;
  session: string;
}

export default function TimerDisplay({
  remainingSeconds,
  session,
}: TimerDisplayProps) {
  return (
    <div className="timer-display-wrapper">
      <p className="text-5xl font-extrabold">
        {formatSeconds(remainingSeconds)}
      </p>
      <p className="text-muted-foreground">Session {session}</p>
    </div>
  );
}
