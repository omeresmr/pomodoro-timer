import PomodoroCircle from './PomodoroCircle';

interface PomodoroCirclesProps {
  completed: number;
  total: number;
}

export default function PomodoroCircles({
  completed,
  total,
}: PomodoroCirclesProps) {
  const MAX_CIRCLES = 16;
  const displayCircles = Array.from({ length: total }).map((_, i) => ({
    id: i,
    isCompleted: i < completed,
  }));

  // WENN: mehr als 16 total, DANN : displayCircles.slice
  // Start Index -> Total - MAX_CIRCLES. Beispiel 23 - 16 = 7, bis Ende
  const visibleCircles =
    total > MAX_CIRCLES
      ? displayCircles.slice(total - MAX_CIRCLES, displayCircles.length)
      : displayCircles;

  return (
    <div className="flex items-center gap-2">
      {visibleCircles.map((circle) => {
        return (
          <PomodoroCircle
            key={circle.id}
            className={circle.isCompleted ? 'bg-brand-primary' : 'bg-secondary'}
          />
        );
      })}

      <p className="text-muted-foreground text-xs">{`${completed}/${total}`}</p>
    </div>
  );
}
