interface ProgressCircleProps {
  remainingMilliseconds: number;
  totalMilliseconds: number;
  onBreak: boolean;
}

export default function ProgressCircle({
  remainingMilliseconds,
  totalMilliseconds,
  onBreak,
}: ProgressCircleProps) {
  // a value between 0 - 1
  const progress = remainingMilliseconds / totalMilliseconds;

  // circle values
  const SIZE = 220;
  const STROKE_WIDTH = 8;
  const RADIUS = (SIZE - STROKE_WIDTH) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  // if onBreak -> full circle to empty circle. else -> empty circle to full circle
  const strokeDashoffset = onBreak
    ? CIRCUMFERENCE * (1 - progress)
    : CIRCUMFERENCE * progress;

  return (
    <svg width={SIZE} height={SIZE} className="transform -rotate-90">
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH}
        className="text-background"
      />

      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH}
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        className="text-brand-primary duration-100 ease-linear"
      />
    </svg>
  );
}
