// Settings Class
export default class Settings {
  soundEnabled = true;

  // Default Timer values
  durations = { pomodoro: 25, shortBreak: 5, longBreak: 15 };
  autoStartBreaks = false;
  autoStartPomodoros = false;
  longBreakInterval = 4;
  constructor() {
    const settings = JSON.parse(localStorage.getItem('settings'));
    if (!settings) return;

    // Overwrite settings
    this.durations = settings.durations;
    this.autoStartBreaks = settings.autoStartBreaks;
    this.autoStartPomodoros = settings.autoStartPomodoros;
    this.longBreakInterval = settings.longBreakInterval;
    this.soundEnabled = settings.soundEnabled;
  }

  update(
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
    autoStartBreaks,
    autoStartPomodoros,
    longBreakInterval,
  ) {
    this.durations.pomodoro = pomodoroDuration;
    this.durations.shortBreak = shortBreakDuration;
    this.durations.longBreak = longBreakDuration;
    this.autoStartBreaks = autoStartBreaks;
    this.autoStartPomodoros = autoStartPomodoros;
    this.longBreakInterval = longBreakInterval;
  }
}

// TODO Split Settings into sections
