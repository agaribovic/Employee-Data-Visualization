import { render, screen } from '@testing-library/react';
import { AverageCardComponent } from '../../components/Card';

describe('AverageCardComponent', () => {
  it('renders label and value correctly', () => {
    const label = 'Employees';
    const value = 42;
    render(<AverageCardComponent label={label} value={value} />);
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(value.toString())).toBeInTheDocument();
  });

  it('renders string value correctly', () => {
    const label = 'Department';
    const value = 'Engineering';
    render(<AverageCardComponent label={label} value={value} />);
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(value)).toBeInTheDocument();
  });
});
