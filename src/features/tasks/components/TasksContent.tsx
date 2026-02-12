interface TasksContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function TasksContent({
  children,
  className,
}: TasksContentProps) {
  return (
    <div className={`flex flex-col w-full pb-10 ${className}`}>{children}</div>
  );
}
