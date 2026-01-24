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
import type { TaskAction } from '../../models/task.actions';
import type { TimerState } from '../../models/timer.model';

interface TaskItemProps {
  task: TaskState;
  timerState: TimerState;
  taskAction: React.ActionDispatch<[action: TaskAction]>;
  timerAction: React.ActionDispatch<[action: TimerAction]>;
  tasksState: TaskState[];
}

export default function TaskItem({
  task,
  taskAction,
  timerAction,
  timerState,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  function startTask() {
    timerAction({ type: 'RESET' });
    timerAction({ type: 'START' });

    // initialize activeTask
    timerAction({ type: 'SET_ACTIVE_TASK', payload: task });

    // change task status to active
    taskAction({ type: 'SET_ACTIVE', payload: task });
  }

  if (isEditing)
    return (
      <EditTask
        timerState={timerState}
        task={task}
        taskAction={taskAction}
        timerAction={timerAction}
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
        <TaskStatus status={task.status} />
        <TaskActions
          handleEdit={() => setIsEditing(true)}
          handleStartTask={startTask}
        />
      </div>
    </TaskCard>
  );
}
