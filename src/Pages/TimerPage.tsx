import TimerContent from '../components/Timer/TimerContent';
import TaskList from '../components/Tasks/TaskList';

export default function TimerPage() {
  return (
    <div className="timer-wrapper">
      <TimerContent />
      <TaskList />
    </div>
  );
}
