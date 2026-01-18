import { type TimerState } from '../models/timer.model';
import { type SettingsState } from '../models/settings.model';
export function getCurrentDuration(state: TimerState, settings: SettingsState) {
  const { onBreak, completedPomodoros } = state;
  const { longBreakInterval, durations } = settings;

  if (!onBreak) return durations.pomodoro * 60;

  const isLongBreak = completedPomodoros % longBreakInterval === 0;
  return isLongBreak ? durations.longBreak * 60 : durations.shortBreak * 60;
}
