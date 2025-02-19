import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ComplaintTable from './ComplaintTable';

describe('ComplaintTable', () => {

  it('renders correctly', () => {
    render(<ComplaintTable />);
    const companyElement = screen.getByText('Dangote Cement');
    expect(companyElement).toBeInTheDocument();
  });
});
