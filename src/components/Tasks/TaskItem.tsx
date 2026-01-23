import { useState } from 'react';
import TaskCard from '../Card/TaskCard';
import PomodoroCircles from './shared/PomodoroCircles';
import CheckBox from './TaskItem/CheckBox';
import ProgressBar from './shared/ProgressBar';
import TaskStatus from './TaskItem/TaskStatus';
import TaskActions from './TaskItem/TaskActions';
import EditTask from './EditTask/EditTask';
import type { TaskState } from '../../models/task.model';
import type { TimerAction } from '../../models/timer.actions';

interface TaskItemProps {
  task: TaskState;
  setTasks: React.Dispatch<React.SetStateAction<TaskState[]>>;
  tasks: TaskState[];
  dispatch: React.ActionDispatch<[action: TimerAction]>;
}

export default function TaskItem({
  task,
  tasks,
  setTasks,
  dispatch,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  function startTask() {
    dispatch({ type: 'RESET' });
    dispatch({ type: 'START' });
    dispatch({ type: 'SET_ACTIVE_TASK', payload: task });
  }

  if (isEditing)
    return (
      <EditTask
        task={task}
        tasks={tasks}
        setTasks={setTasks}
        setIsEditing={setIsEditing}
        handleCancelEdit={() => setIsEditing(false)}
      />
    );

  return (
    <TaskCard className="group">
      <CheckBox />

      <p className="font-bold text-base">{task.name}</p>

      <PomodoroCircles
        total={task.estimatedPomodoros}
        completed={task.pomodorosDone}
      />

      <ProgressBar
        progress={(task.pomodorosDone / task.estimatedPomodoros) * 100}
      />

      <div className="absolute flex flex-col items-end gap-2 right-4 top-4">
        <TaskStatus status="pending" />
        <TaskActions
          handleEdit={() => setIsEditing(true)}
          handleStartTask={startTask}
        />
      </div>
    </TaskCard>
  );
}
