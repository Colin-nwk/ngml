import { fireEvent, render } from '@testing-library/react';
import DateCard from './DateCard';

describe('DateCard Component', () => {
  it('renders primary date card correctly', () => {
    const props = {
      cardType: 'primary' as const,
      day: 15,
      weekDay: 'Thur',
      month: 'January',
      isActive: false,
      onToggleActive: vitest.fn(),
      label: 'Sample Label',
    };

    const { getByText } = render(<DateCard {...props} />);

    expect(getByText('Thur')).toBeInTheDocument();
    expect(getByText('15')).toBeInTheDocument();
    expect(getByText('January')).toBeInTheDocument();
    expect(getByText('Sample Label')).toBeInTheDocument();
  });

  it('renders secondary date card correctly with different props', () => {
    const secondaryProps = {
      date: 25,
      businessName: 'Sample Business',
      month: 'February',
      businessIcon: <span>Business Icon</span>,
      locationIcon: <span>Location Icon</span>,
      location: 'Sample Location',
    };

    const props = {
      cardType: 'secondary' as const,
      isActive: true,
      onToggleActive: vitest.fn(),
      secondaryProps,
    };

    const { getByText, getByTestId } = render(<DateCard {...props} />);

    expect(getByText('25')).toBeInTheDocument();
    expect(getByText('Sample Business')).toBeInTheDocument();
    expect(getByText('February')).toBeInTheDocument();
    expect(getByTestId('business-icon')).toContainHTML('<span>Business Icon</span>');
    expect(getByTestId('location-icon')).toContainHTML('<span>Location Icon</span>');
    expect(getByText('Sample Location')).toBeInTheDocument();
  });

  it('calls onToggleActive when clicked', () => {
    const onToggleActive = vitest.fn();
    const props = {
      cardType: 'primary' as const,
      day: 15,
      weekDay: 'thur',
      month: 'January',
      isActive: false,
      onToggleActive,
      label: 'Sample Label',
    };

    const { getByTestId } = render(<DateCard {...props} />);
    fireEvent.click(getByTestId('date-card'));

    expect(onToggleActive).toHaveBeenCalledTimes(1);
  });
});
