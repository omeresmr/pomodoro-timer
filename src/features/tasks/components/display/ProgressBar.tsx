interface ProgressBarProps {
  progress: number; // 0-100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-1.5 w-full max-w-62.5 bg-secondary rounded-xl">
      <div
        className="h-1.5 bg-brand-primary max-w-62.5 rounded-xl"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
