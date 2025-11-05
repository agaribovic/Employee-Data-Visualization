import { render, screen } from '@testing-library/react';
import { DashboardComponent } from '../../components/Dashboard';
import * as useTimeChangesHook from '../../hooks/useTimeChanges';
import * as timeUtils from '../../utils/timeChangesUtils';
import '@testing-library/jest-dom';

jest.mock('../../components/Chart', () => ({
  PieChartComponent: ({ title }: { title: string }) => <div data-testid={`pie-${title}`}>{title}</div>
}));

jest.mock('../../components/Card', () => ({
  AverageCardComponent: ({ label, value }: { label: string; value: string }) => (
    <div data-testid={`card-${label}`}>
      {label}: {value}
    </div>
  )
}));

describe('DashboardComponent', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders loading state', () => {
    jest.spyOn(useTimeChangesHook, 'useTimeChanges').mockReturnValue({
      data: [],
      loading: true,
      error: null
    });

    render(<DashboardComponent />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    jest.spyOn(useTimeChangesHook, 'useTimeChanges').mockReturnValue({
      data: [],
      loading: false,
      error: 'Failed to fetch'
    });

    render(<DashboardComponent />);
    expect(screen.getByText(/error: Failed to fetch/i)).toBeInTheDocument();
  });

  it('renders no data state', () => {
    jest.spyOn(useTimeChangesHook, 'useTimeChanges').mockReturnValue({
      data: [],
      loading: false,
      error: null
    });
    render(<DashboardComponent />);
    expect(screen.getByText(/no data available/i)).toBeInTheDocument();
  });

  it('renders charts and cards when data is available', () => {
    jest.spyOn(useTimeChangesHook, 'useTimeChanges').mockReturnValue({
      data: [
        {
          id: 1,
          start: '09:00',
          end: '17:00',
          project: 'A',
          workplace: 'Office',
          workTime: 480 as any,
          pauseTime: 60 as any,
          projectAllocation: [{ label: 'A', value: 1 } as any],
          workplaceAllocation: [{ label: 'Office', value: 1 } as any]
        } as any
      ],
      loading: false,
      error: null
    });

    jest.spyOn(timeUtils, 'aggregateProjectAllocation').mockReturnValue([{ label: 'A', value: 1 }] as any);
    jest.spyOn(timeUtils, 'aggregateWorkplaceAllocation').mockReturnValue([{ label: 'Office', value: 1 }] as any);
    jest.spyOn(timeUtils, 'averageTime').mockReturnValue({
      avgStart: new Date('1970-01-01T09:00:00Z'),
      avgEnd: new Date('1970-01-01T17:00:00Z'),
      avgWorkMinutes: 480,
      avgPauseMinutes: 60
    });

    render(<DashboardComponent />);
    expect(screen.getByTestId('pie-Project Allocation')).toBeInTheDocument();
    expect(screen.getByTestId('pie-Workplace Allocation')).toBeInTheDocument();
    expect(screen.getByTestId('card-Average Start')).toBeInTheDocument();
    expect(screen.getByTestId('card-Average End')).toBeInTheDocument();
    expect(screen.getByTestId('card-Average Work')).toBeInTheDocument();
    expect(screen.getByTestId('card-Average Break')).toBeInTheDocument();
  });
});
