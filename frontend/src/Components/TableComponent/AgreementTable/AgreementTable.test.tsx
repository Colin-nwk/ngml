import { AgreementData } from '@/Data';
import { fireEvent, render, screen } from '@testing-library/react';
import AgreementTable from './AgreementTable';


describe('AgreementTable', () => {
  test('renders the table with the correct initial number of rows', () => {
    render(<AgreementTable />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(14);
  });

  test('filters rows based on search input', () => {
    render(<AgreementTable />);
    const searchInput = screen.getByLabelText('Search this list');
    fireEvent.change(searchInput, { target: { value: 'Some Company Name' } });
    const filteredRows = screen.getAllByRole('row');
    expect(filteredRows.length).toBeLessThan(AgreementData.length + 1);
  });


});
