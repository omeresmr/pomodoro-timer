export default class Task {
  active = false;
  pomodorosDone = 0;
  constructor(name, estimatedPomodoros) {
    this.name = name;
    this.estimatedPomodoros = estimatedPomodoros;
    // Unique ID
    this.id = Date.now();
  }

  complete() {
    this.stop();
    this.isComplete = true;
  }

  start() {
    this.active = true;
  }

  stop() {
    this.active = false;
  }

  update({ newName, newEstimatedPomodoros, newPomodorosDone }) {
    this.name = newName;
    this.estimatedPomodoros = newEstimatedPomodoros;
    this.pomodorosDone = newPomodorosDone;
  }

  incrementPomo() {
    this.pomodorosDone++;
  }

  get progressPercentage() {
    if (this.pomodorosDone > this.estimatedPomodoros) return 100;
    return Math.floor((this.pomodorosDone / this.estimatedPomodoros) * 100);
  }

  get isComplete() {
    return this.pomodorosDone >= this.estimatedPomodoros;
  }
}
