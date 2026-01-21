import TaskCard from '../Card/TaskCard';
import PomodoroCircles from './shared/PomodoroCircles';
import CheckBox from './TaskItem/CheckBox';
import ProgressBar from './shared/ProgressBar';
import TaskStatus from './TaskItem/TaskStatus';
import TaskActions from './TaskItem/TaskActions';
import type { TaskState } from '../../models/task.model';

interface TaskItemProps {
  task: TaskState;
}

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <TaskCard className="group">
      <CheckBox />

      <p className="font-bold text-base">{task.name}</p>

      <PomodoroCircles total={4} completed={3} />

      <ProgressBar progress={75} />

      <div className="absolute flex flex-col items-end gap-2 right-4 top-4">
        <TaskStatus status="pending" />
        <TaskActions />
      </div>
    </TaskCard>
  );
}
