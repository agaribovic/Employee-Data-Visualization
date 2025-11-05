import {
  workTimeInMinutes,
  aggregateAllocation,
  aggregateProjectAllocation,
  aggregateWorkplaceAllocation,
  averageTime
} from '../../utils/timeChangesUtils';
import { TimeChange } from '../../api';

describe('timeChangesUtils', () => {
  describe('workTimeInMinutes', () => {
    it('converts hours and minutes to total minutes', () => {
      expect(workTimeInMinutes({ hours: 2, minutes: 30 })).toBe(150);
      expect(workTimeInMinutes({ hours: 0, minutes: 45 })).toBe(45);
    });
  });

  describe('aggregateAllocation', () => {
    const timeChanges: TimeChange[] = [
      {
        id: 1,
        start: '09:00',
        end: '17:00',
        workTime: { hours: 8, minutes: 0 },
        pauseTime: { hours: 1, minutes: 0 },
        projectAllocation: [
          { label: 'Project A' as any, percentage: 50 },
          { label: 'Project B' as any, percentage: 50 }
        ],
        workplaceAllocation: [{ label: 'Office' as any, percentage: 100 }]
      }
    ];

    it('aggregates project allocation correctly', () => {
      const result = aggregateAllocation(timeChanges, 'projectAllocation');
      expect(result['Project A']).toBe(240);
      expect(result['Project B']).toBe(240);
    });

    it('aggregates workplace allocation correctly', () => {
      const result = aggregateAllocation(timeChanges, 'workplaceAllocation');
      expect(result['Office']).toBe(480);
    });
  });

  describe('aggregateProjectAllocation / aggregateWorkplaceAllocation', () => {
    const timeChanges: TimeChange[] = [
      {
        id: 1,
        start: '09:00',
        end: '17:00',
        workTime: { hours: 8, minutes: 0 },
        pauseTime: { hours: 1, minutes: 0 },
        projectAllocation: [{ label: 'Project A' as any, percentage: 100 }],
        workplaceAllocation: [{ label: 'Office' as any, percentage: 100 }]
      }
    ];

    it('aggregates project allocation', () => {
      expect(aggregateProjectAllocation(timeChanges)['Project A']).toBe(480);
    });

    it('aggregates workplace allocation', () => {
      expect(aggregateWorkplaceAllocation(timeChanges)['Office']).toBe(480);
    });
  });

  describe('averageTime', () => {
    it('returns null for empty array', () => {
      expect(averageTime([])).toBeNull();
    });

    it('calculates averages correctly', () => {
      const timeChanges: TimeChange[] = [
        {
          id: 1,
          start: '2025-11-04T08:00:00Z',
          end: '2025-11-04T16:00:00Z',
          workTime: { hours: 8, minutes: 0 },
          pauseTime: { hours: 1, minutes: 0 },
          projectAllocation: [],
          workplaceAllocation: []
        },
        {
          id: 2,
          start: '2025-11-04T10:00:00Z',
          end: '2025-11-04T18:00:00Z',
          workTime: { hours: 8, minutes: 0 },
          pauseTime: { hours: 0, minutes: 30 },
          projectAllocation: [],
          workplaceAllocation: []
        }
      ];
      const result = averageTime(timeChanges);
      expect(result).not.toBeNull();
      expect(result!.avgWorkMinutes).toBe(480);
      expect(result!.avgPauseMinutes).toBe(45);
    });
  });
});
