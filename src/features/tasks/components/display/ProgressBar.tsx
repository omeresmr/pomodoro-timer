interface ProgressBarProps {
  progress: number; // 0-100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-1.5 w-full bg-secondary rounded-xl">
      <div
        className="h-1.5 bg-brand-primary rounded-xl"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
