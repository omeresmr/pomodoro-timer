interface CurrentTaskProps {
  taskName: string;
}

export default function CurrentTask({ taskName }: CurrentTaskProps) {
  return (
    <div className="flex items-center justify-center flex-col text-center gap-1">
      <p className="text-muted-foreground text-sm">Current task</p>
      <p className="font-bold">{taskName}</p>
    </div>
  );
}
