import { FC, memo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, TooltipItem } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: Record<string, number>;
  title: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

export const PieChartComponent: FC<PieChartProps> = memo(({ data, title }) => {
  const labels = Object.keys(data);
  const values = Object.values(data).map((v) => Math.round((v / 60) * 100) / 100);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: COLORS.slice(0, labels.length),
        borderWidth: 1,
        hoverOffset: 15
      }
    ]
  };

  const options: ChartOptions<'pie'> = {
    animation: {
      animateRotate: true,
      duration: 800
    },
    plugins: {
      legend: { position: 'bottom', labels: { color: 'white' } },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'pie'>): string =>
            `${tooltipItem.label}: ${tooltipItem.formattedValue} hours`,
          title: (): string => ''
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 p-4 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
      <Pie data={chartData} options={options} />
    </div>
  );
});
