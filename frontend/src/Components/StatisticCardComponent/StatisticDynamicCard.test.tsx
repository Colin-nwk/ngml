import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import StatisticCard from './StatisticDynamicCard';

describe('StatisticDynamicCard', () => {
  const mockOnSortChange = vi.fn();
  const yearOptions = [2020, 2021];
  const valueOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ];

  beforeEach(() => {
    render(
      <StatisticCard
        type="primary"
        title="Test Title"
        content={<div>Test Content</div>}
        icon={<div>Test Icon</div>}
        onSortChange={mockOnSortChange}
        yearOptions={yearOptions}
        valueOptions={valueOptions}
      />
    );
  });

  it('renders title, content, and icon', () => {
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Icon')).toBeInTheDocument();
  });

  it('calls onSortChange with correct parameters when year is changed', () => {
    fireEvent.change(screen.getByLabelText('Sort by year'), { target: { value: '2021' } });
    expect(mockOnSortChange).toHaveBeenCalledWith('year', '2021');
  });

  it('calls onSortChange with correct parameters when value is changed', () => {
    fireEvent.change(screen.getByLabelText('Sort by value'), { target: { value: '2' } });
    expect(mockOnSortChange).toHaveBeenCalledWith('value', '2');
  });
});
