import PomodoroCircle from './PomodoroCircle';

interface PomodoroCirclesProps {
  completed: number;
  total: number;
}

export default function PomodoroCircles({
  completed,
  total,
}: PomodoroCirclesProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => {
        if (i >= 16) return;

        return (
          <PomodoroCircle
            key={i}
            className={i < completed ? 'bg-brand-primary' : 'bg-secondary'}
          />
        );
      })}

      <p className="text-muted-foreground text-xs">{`${completed}/${total}`}</p>
    </div>
  );
}
