interface PomodoroCircleProps {
  className: string;
}

export default function PomodoroCircle({ className }: PomodoroCircleProps) {
  return <div className={`pomodoro-circle ${className}`}></div>;
}
