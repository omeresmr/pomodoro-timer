export default class Task {
  pomodorosDone = 0;
  constructor(name, estimatedPomodoros) {
    this.name = name;
    this.estimatedPomodoros = estimatedPomodoros;
    this.id = Date.now();
    this.status = 'default';
  }

  complete() {
    this.stop();
    this.status = 'completed';
  }

  start() {
    this.status = 'active';
  }

  stop() {
    this.status = 'default';
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
    if (this.pomodorosDone >= this.estimatedPomodoros)
      this.status = 'completed';
  }
}
