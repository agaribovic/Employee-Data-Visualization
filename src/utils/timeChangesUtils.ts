import { TimeChange } from '../api';

export function workTimeInMinutes(workTime: { hours: number; minutes: number }): number {
  return workTime.hours * 60 + workTime.minutes;
}

export function aggregateAllocation(
  timeChanges: TimeChange[],
  allocationKey: 'projectAllocation' | 'workplaceAllocation'
): Record<string, number> {
  const totals: Record<string, number> = {};

  for (const entry of timeChanges) {
    const workMinutes = workTimeInMinutes(entry.workTime);

    for (const alloc of entry[allocationKey]) {
      const minutesForLabel = workMinutes * (alloc.percentage / 100);
      totals[alloc.label] = (totals[alloc.label] ?? 0) + minutesForLabel;
    }
  }

  return totals;
}

export const aggregateProjectAllocation = (timeChanges: TimeChange[]) =>
  aggregateAllocation(timeChanges, 'projectAllocation');

export const aggregateWorkplaceAllocation = (timeChanges: TimeChange[]) =>
  aggregateAllocation(timeChanges, 'workplaceAllocation');

export function averageTime(timeChanges: TimeChange[]) {
  if (!timeChanges.length) return null;

  const parseUTC = (s: string): number => new Date(s).getTime();
  const avgStart = new Date(timeChanges.reduce((sum, e) => sum + parseUTC(e.start), 0) / timeChanges.length);
  const avgEnd = new Date(timeChanges.reduce((sum, e) => sum + parseUTC(e.end), 0) / timeChanges.length);
  const avgWorkMinutes = timeChanges.reduce((sum, e) => sum + workTimeInMinutes(e.workTime), 0) / timeChanges.length;
  const avgPauseMinutes = timeChanges.reduce((sum, e) => sum + workTimeInMinutes(e.pauseTime), 0) / timeChanges.length;

  return { avgStart, avgEnd, avgWorkMinutes, avgPauseMinutes };
}
