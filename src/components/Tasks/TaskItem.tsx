import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
  showAlert: (message: string) => void;
  tasksState: TaskState[];
}

const MotionEdit = motion.create(EditTask);
const MotionCard = motion.create(TaskCard);

export default function TaskItem({
  task,
  taskAction,
  timerAction,
  timerState,
  showAlert,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  function handleStartTask() {
    timerAction({ type: 'RESET' });
    timerAction({ type: 'START' });

    // initialize activeTask
    timerAction({ type: 'SET_ACTIVE_TASK', payload: task });

    // change task status to active
    taskAction({ type: 'SET_ACTIVE', payload: task });

    // show alert
    showAlert(`${task.name} started.`);
  }

  function handleStopTask() {
    timerAction({ type: 'RESET' });
    timerAction({ type: 'PAUSE' });

    timerAction({ type: 'SET_ACTIVE_TASK', payload: null });
    taskAction({ type: 'UPDATE', payload: task });

    showAlert(`${task.name} paused.`);
  }

  function handleCheckTask(e: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;

    if (isChecked) {
      taskAction({ type: 'COMPLETE_TASK', payload: task });

      showAlert(`${task.name} finished.`);
    } else {
      taskAction({ type: 'UNCOMPLETE_TASK', payload: task });

      showAlert(`${task.name} unfinished.`);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isEditing ? (
        <MotionEdit
          key="edit-mode"
          task={task}
          timerState={timerState}
          taskAction={taskAction}
          setIsEditing={setIsEditing}
          handleCancelEdit={() => setIsEditing(false)}
          showAlert={showAlert}
          // Animation
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        />
      ) : (
        <MotionCard
          key="view-mode"
          className="group relative"
          // Animation
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          layout
        >
          <CheckBox
            checked={task.status === 'completed'}
            onChange={handleCheckTask}
          />

          <p
            className={`font-bold text-base ${task.status === 'completed' ? 'line-through' : ''}`}
          >
            {task.name}
          </p>

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
              task={task}
              handleEdit={() => setIsEditing(true)}
              handleStartTask={handleStartTask}
              handleStopTask={handleStopTask}
            />
          </div>
        </MotionCard>
      )}
    </AnimatePresence>
  );
}
