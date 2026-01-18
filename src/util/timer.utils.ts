import { type TimerState } from '../models/timer.model';
import { type SettingsState } from '../models/settings.model';

// returns the next duration (25min, 5min or 15min by default)
export function getCurrentDuration(state: TimerState, settings: SettingsState) {
  const { onBreak, completedPomodoros } = state;
  const { longBreakInterval, durations } = settings;

  if (!onBreak) return durations.pomodoro * 60;

  const isLongBreak =
    completedPomodoros !== 0 && completedPomodoros % longBreakInterval === 0;
  return isLongBreak ? durations.longBreak * 60 : durations.shortBreak * 60;
}

// returns the current session number (1-based index)
export function getCurrentSession(state: TimerState): number {
  const { onBreak, completedPomodoros } = state;

  return onBreak ? completedPomodoros : completedPomodoros + 1;
}
