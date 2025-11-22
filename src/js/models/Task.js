export default class Task {
  isComplete = false;
  isActive = false;
  completedPomos = 0;
  constructor(name, estPomos) {
    this.name = name;
    this.estPomos = estPomos;
    // Unique ID
    this.id = Date.now();
  }

  complete() {
    this.stop();
    this.isComplete = true;
  }

  start() {
    this.isActive = true;
  }

  stop() {
    this.isActive = false;
  }

  incrementPomo() {
    this.completedPomos++;
  }

  get progressPercentage() {
    if (this.completedPomos > this.estPomos) return 100;
    return Math.floor((this.completedPomos / this.estPomos) * 100);
  }

  completeIfReady() {
    if (this.completedPomos >= this.estPomos) this.complete();
  }

  checkNewCompleteState() {
    if (this.completedPomos < this.estPomos) this.isComplete = false;
  }
}
