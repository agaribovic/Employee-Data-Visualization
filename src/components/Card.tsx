import { FC } from 'react';

interface AverageCardProps {
  label: string;
  value: string | number;
}

export const AverageCardComponent: FC<AverageCardProps> = ({ label, value }) => (
  <div className="min-w-[150px] text-center bg-gray-700 font-semibold rounded-lg shadow-md p-4">
    <p>{label}</p>
    <p className="mt-2 text-lg">{value}</p>
  </div>
);
