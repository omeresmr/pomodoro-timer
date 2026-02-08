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
import { useTasks } from '../../contexts/TasksContext';
import { useTimer } from '../../contexts/TimerContext';
import { toast } from 'sonner';

interface TaskItemProps {
  task: TaskState;
}

const MotionEdit = motion.create(EditTask);
const MotionCard = motion.create(TaskCard);

export default function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { pauseTask, completeTask, uncompleteTask, getTaskStatus, runTask } =
    useTasks();
  const { startTimer, pauseTimer, initActiveTask, resetTimer } = useTimer();

  function handleStartTask() {
    // Reset timer when a task gets started (Maybe change this later)
    resetTimer();
    startTimer();

    initActiveTask(task);
    runTask(task);

    toast.success(`${task.name} started.`);
  }

  function handleStopTask() {
    resetTimer();
    pauseTimer();

    initActiveTask(null);
    pauseTask(task);

    toast.success(`${task.name} paused.`);
  }

  function handleCheckTask(e: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;

    if (isChecked) {
      completeTask(task);

      toast.success(`${task.name} completed.`);
    } else {
      uncompleteTask(task);

      toast.success(`${task.name} uncompleted.`);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isEditing ? (
        <MotionEdit
          key="edit-mode"
          task={task}
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
