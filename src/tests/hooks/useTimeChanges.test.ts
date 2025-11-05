import { renderHook, waitFor } from '@testing-library/react';
import { useTimeChanges } from '../../hooks/useTimeChanges';
import { DefaultApi, TimeChange, Duration } from '../../api';

jest.mock('../../api');

describe('useTimeChanges hook', () => {
  const mockTimeChanges: TimeChange[] = [
    {
      id: 1,
      start: '09:00',
      end: '17:00',
      workTime: 480 as unknown as Duration,
      pauseTime: 60 as unknown as Duration,
      projectAllocation: [],
      workplaceAllocation: []
    }
  ];

  beforeEach(() => {
    jest.resetAllMocks();

    global.Notification = jest.fn() as unknown as jest.MockedClass<typeof Notification>;
  });

  it('fetches data successfully', async () => {
    // @ts-ignore
    DefaultApi.mockImplementation(() => ({
      listTimeChanges: jest.fn().mockResolvedValue({ data: mockTimeChanges })
    }));

    const { result } = renderHook(() => useTimeChanges());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockTimeChanges);
    expect(result.current.error).toBeNull();

    expect(global.Notification).toHaveBeenCalledWith('in-motion WiB Mitarbeiterdaten-Visualisierung', {
      body: 'Die Daten wurden erfolgreich in Kreisdiagrammen geladen.',
      silent: false
    });
  });

  it('handles API errors', async () => {
    // @ts-ignore
    DefaultApi.mockImplementation(() => ({
      listTimeChanges: jest.fn().mockRejectedValue(new Error('API Error'))
    }));

    const { result } = renderHook(() => useTimeChanges());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('API Error');

    expect(global.Notification).not.toHaveBeenCalled();
  });
});
