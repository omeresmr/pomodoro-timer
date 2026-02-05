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
import type { TimerState } from '../../models/timer.model';
import { useAlert } from '../../contexts/AlertContext';
import { useTasks } from '../../contexts/TasksContext';

interface TaskItemProps {
  task: TaskState;
  timerState: TimerState;
  timerAction: React.ActionDispatch<[action: TimerAction]>;
}

const MotionEdit = motion.create(EditTask);
const MotionCard = motion.create(TaskCard);

export default function TaskItem({
  task,
  timerAction,
  timerState,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { showAlert } = useAlert();
  const { pauseTask, completeTask, uncompleteTask, getTaskStatus, runTask } =
    useTasks();

  function handleStartTask() {
    // Reset timer when a task gets started (Maybe change this later)
    timerAction({ type: 'RESET' });
    timerAction({ type: 'START' });

    // Initialize activeTask
    timerAction({ type: 'SET_ACTIVE_TASK', payload: task });

    runTask(task);

    showAlert(`${task.name} started.`);
  }

  function handleStopTask() {
    timerAction({ type: 'RESET' });
    timerAction({ type: 'PAUSE' });

    timerAction({ type: 'SET_ACTIVE_TASK', payload: null });
    pauseTask(task);

    showAlert(`${task.name} paused.`);
  }

  function handleCheckTask(e: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;

    if (isChecked) {
      completeTask(task);

      showAlert(`${task.name} completed.`);
    } else {
      uncompleteTask(task);

      showAlert(`${task.name} uncompleted.`);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isEditing ? (
        <MotionEdit
          key="edit-mode"
          task={task}
          timerState={timerState}
          setIsEditing={setIsEditing}
          handleCancelEdit={() => setIsEditing(false)}
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
          <CheckBox checked={task.isCompleted} onChange={handleCheckTask} />

          <p
            className={`font-bold text-base ${task.isCompleted ? 'line-through' : ''}`}
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
            <TaskStatus status={getTaskStatus(task)} />
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
