import { settings } from '../main.js';
import { TIMER_INTERVAL } from '../utils/constants.js';
import { timerLogic } from '../logic/timer/timerCore.js';

let timerInterval;

export default class Timer {
  secondsPassed = 0;
  completedPomodoros = 0;
  onBreak = false;
  isRunning = false;
  activeTask = null;

  constructor() {}

  initTask(task) {
    this.activeTask = task;
  }

  get remainingSeconds() {
    return this.currentDuration - this.secondsPassed;
  }

  get currentDuration() {
    if (this.onBreak) {
      return this.completedPomodoros % settings.longBreakInterval === 0
        ? settings.durations.longBreak * 60
        : settings.durations.shortBreak * 60;
    } else return settings.durations.pomodoro * 60;
  }

  start() {
    // Start Timer and change isRunning state
    timerInterval = setInterval(timerLogic, TIMER_INTERVAL);
    this.isRunning = true;
  }

  stop() {
    // Stop Timer and change isRunning state
    clearInterval(timerInterval);
    this.isRunning = false;
  }

  reset() {
    this.onBreak = false;
    this.completedPomodoros = 0;
    this.secondsPassed = 0;
    this.activeTask = null;
    this.stop();
  }

  nextPhase() {
    // Reset elapsed Seconds and onBreak state
    this.onBreak = !this.onBreak;
    this.secondsPassed = 0;
  }
}
