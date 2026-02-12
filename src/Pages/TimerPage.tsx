import TimerContent from '../features/timer/components/TimerContent';
import TasksContent from '../features/tasks/components/TasksContent';
import CreateTaskForm from '../features/tasks/components/forms/CreateTaskForm';
import TaskList from '../features/tasks/components/list/TaskList';

export default function TimerPage() {
  return (
    <div className="timer-wrapper">
      <TimerContent />
      <TasksContent className="gap-2">
        <h2 className="font-bold text-2xl">All Tasks</h2>
        <CreateTaskForm />
        <TaskList />
      </TasksContent>
    </div>
  );
}
