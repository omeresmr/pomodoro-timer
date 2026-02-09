export interface SettingsState {
  durations: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  };
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
  soundEnabled: boolean;
}

export const createDefaultSettings = (): SettingsState => ({
  durations: { pomodoro: 25, shortBreak: 5, longBreak: 15 },
  autoStartBreaks: false,
  autoStartPomodoros: false,
  longBreakInterval: 4,
  soundEnabled: true,
});
