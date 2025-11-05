import { render, screen } from '@testing-library/react';
import { PieChartComponent } from '../../components/Chart';
import '@testing-library/jest-dom';

jest.mock('react-chartjs-2', () => ({
  Pie: () => <div data-testid="pie-chart" />
}));

describe('PieChart Component', () => {
  it('renders pie chart with provided data', () => {
    const testDataArray = [
      { label: 'Engineering', value: 10 },
      { label: 'HR', value: 5 },
      { label: 'Sales', value: 8 }
    ];

    const testData = testDataArray.reduce<Record<string, number>>((acc, curr) => {
      acc[curr.label] = curr.value;
      return acc;
    }, {});

    render(<PieChartComponent data={testData} title="Test Chart" />);
    const chartElement = screen.getByTestId('pie-chart');
    expect(chartElement).toBeInTheDocument();
  });
});
