export default class Task {
  isActive = false;
  pomodorosDone = 0;
  _manualComplete = null;
  constructor(name, estimatedPomodoros) {
    this.name = name;
    this.estimatedPomodoros = estimatedPomodoros;
    // Unique ID
    this.id = Date.now();
  }

  complete() {
    this.stop();
    this._manualComplete = true;
  }

  start() {
    this.isActive = true;
  }

  stop() {
    this.isActive = false;
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
    return (
      this.pomodorosDone >= this.estimatedPomodoros || this._manualComplete
    );
  }
}
