export default class Task {
  isComplete = false;
  isActive = false;
  completedPomos = 0;
  progressPercentage = 0;
  constructor(name, estPomos) {
    this.name = name;
    this.estPomos = estPomos;
    // Unique ID
    this.id = Date.now();
  }

  complete() {
    this.isComplete = true;
  }

  start() {
    this.isActive = true;
  }

  incrementPomo() {
    this.completedPomos++;
  }

  get progressPercentage() {
    return Math.floor((this.completedPomos / this.estPomos) * 100);
  }
}
