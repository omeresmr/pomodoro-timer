// Timer Class
import { settings } from '../main.js';
import { TIMER_INTERVAL } from '../utils/constants.js';
import { timerLogic } from '../logic/timerLogic.js';

let timerInterval;

export default class Timer {
  elapsedSeconds = 0;
  pomodoroCount = 0;
  isBreak = false;
  isRunning = false;

  activeTask = {};

  constructor() {}

  initTask(task) {
    this.activeTask = task;
  }

  get remainingSeconds() {
    return this.currentDuration - this.elapsedSeconds;
  }

  get currentDuration() {
    if (this.isBreak) {
      return this.pomodoroCount % settings.longBreakInterval === 0
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
    this.isBreak = false;
    this.pomodoroCount = 0;
    this.elapsedSeconds = 0;
    this.stop();
  }

  nextPhase() {
    // Reset elapsed Seconds and isBreak state
    this.isBreak = !this.isBreak;
    this.elapsedSeconds = 0;
  }
}
