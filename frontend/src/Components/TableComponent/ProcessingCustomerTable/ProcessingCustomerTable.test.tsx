import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProcessingCustomerTable from './ProcessingCustomerTable';


vi.mock('@/Data', () => ({
  ProcessingCustomerData: [
    { id: 1, companyname: 'Company A', companyType: 'Type A', request: 'In Progress' },
    { id: 2, companyname: 'Company B', companyType: 'Type B', request: 'Approved' },
  ],
}));

describe('ProcessingCustomerTable Component', () => {
  beforeEach(() => {
    render(<ProcessingCustomerTable />);
  });

  it('renders correctly', () => {
    const tableElement = screen.getByRole('grid');
    expect(tableElement).toBeInTheDocument();
  });

  it('filters rows based on search input', async () => {
    const searchInput = screen.getByLabelText('Search this list');
    fireEvent.change(searchInput, { target: { value: 'Company A' } });

    const filteredRows = screen.getAllByRole('row');
    expect(filteredRows).toHaveLength(2);
    expect(filteredRows[1]).toHaveTextContent('Company A');
  });


});
