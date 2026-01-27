import { forwardRef } from 'react';

const TaskCard = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, children, ...motionprops } = props;

  return (
    <div {...motionprops} ref={ref} className={`task-card ${className}`}>
      {children}
    </div>
  );
});

export default TaskCard;
