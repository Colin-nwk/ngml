import { fireEvent, render, screen } from '@testing-library/react';
import TenderTable from './TenderTable';


describe('TenderTable Component', () => {

  test('filters rows based on search input', () => {
    render(<TenderTable />);
    const searchInput = screen.getByLabelText(/search this list/i);

    fireEvent.change(searchInput, { target: { value: 'Some search text' } });

  });

});
