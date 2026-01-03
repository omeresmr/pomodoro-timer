import TaskCard from '../Card/TaskCard';
import PomodoroCircles from './shared/PomodoroCircles';
import CheckBox from './TaskItem/CheckBox';
import ProgressBar from './shared/ProgressBar';
import TaskStatus from './TaskItem/TaskStatus';
import TaskActions from './TaskItem/TaskActions';

export default function TaskItem() {
  return (
    <TaskCard className="task-card group">
      <CheckBox />

      <p className="font-bold text-base">Write Documentation</p>

      <PomodoroCircles total={4} completed={3} />

      <ProgressBar progress={75} />

      <div className="absolute flex flex-col items-end gap-2 right-4 top-4">
        <TaskStatus status="pending" />
        <TaskActions />
      </div>
    </TaskCard>
  );
}
