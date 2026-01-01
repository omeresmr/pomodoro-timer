interface TimerDisplayProps {
  time: string;
  session: string;
}

export default function TimerDisplay({ time, session }: TimerDisplayProps) {
  return (
    <div className="timer-display-wrapper">
      <p className="text-5xl font-extrabold">{time}</p>
      <p className="text-muted-foreground">Session {session}</p>
    </div>
  );
}
