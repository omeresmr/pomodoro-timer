import TimerContent from '../features/timer/components/TimerContent';
import TasksContent from '../features/tasks/components/TasksContent';

export default function TimerPage() {
  return (
    <div className="timer-wrapper">
      <TimerContent />
      <TasksContent />
    </div>
  );
}
