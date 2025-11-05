import { FC, useMemo } from 'react';
import { useTimeChanges } from '../hooks/useTimeChanges';
import { aggregateProjectAllocation, aggregateWorkplaceAllocation, averageTime } from '../utils/timeChangesUtils';
import { PieChartComponent } from './Chart';
import { AverageCardComponent } from './Card';

export const DashboardComponent: FC = () => {
  const { data, loading, error } = useTimeChanges();

  const projectTotals = useMemo(() => aggregateProjectAllocation(data), [data]);
  const workplaceTotals = useMemo(() => aggregateWorkplaceAllocation(data), [data]);
  const averages = useMemo(() => averageTime(data), [data]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-20 h-20 border-8 border-gray-700 border-t-[#FFB20A] rounded-full animate-spin shadow-lg"></div>
      </div> 
    );
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
  if (!data.length) return <p className="text-center text-gray-400 mt-10">No data available</p>;

  return (
    <div className="p-6 flex flex-col items-center gap-10">
      <h2 className="text-2xl font-extrabold text-center text-amberCustom mb-6">⏳ Time, Divided & Conquered 🗡️</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
        <PieChartComponent data={projectTotals} title="Project Allocation" />
        <PieChartComponent data={workplaceTotals} title="Workplace Allocation" />
      </div>
      {averages && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <AverageCardComponent label="Average Start" value={averages.avgStart.toLocaleTimeString('en-US', { timeZone: 'UTC' })} />
          <AverageCardComponent label="Average End" value={averages.avgEnd.toLocaleTimeString('en-US', { timeZone: 'UTC' })} />
          <AverageCardComponent label="Average Work" value={`${(averages.avgWorkMinutes / 60).toFixed(2)} hours`} />
          <AverageCardComponent label="Average Break" value={`${(averages.avgPauseMinutes / 60).toFixed(2)} hours`} />
        </div>
      )}
    </div>
  );
};
