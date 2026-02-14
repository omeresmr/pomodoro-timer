import CreateTaskForm from '../features/tasks/components/forms/CreateTaskForm';
import TaskList from '../features/tasks/components/list/TaskList';
import TasksContent from '../features/tasks/components/TasksContent';
import Description from '../shared/ui/description/Description';

export default function TasksPage() {
  return (
    <div className="tasks-wrapper">
      <TasksContent className="gap-3">
        <h2 className="font-bold text-2xl">All Tasks</h2>
        <Description text="Manage your focus sessions and track progress" />
        <CreateTaskForm />
        <TaskList showCompletedTasks={true} />
      </TasksContent>
    </div>
  );
}
// children Prop verwenden, weg von diese Khara Props
