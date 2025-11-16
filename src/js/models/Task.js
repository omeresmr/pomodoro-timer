export default class Task {
  constructor(name, estPomodoros) {
    this.name = name;
    this.estPomodoros = estPomodoros;
    // Unique ID
    this.id = Date.now();
  }
}
