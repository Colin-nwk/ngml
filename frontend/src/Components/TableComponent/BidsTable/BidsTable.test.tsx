import { fireEvent, render, screen } from '@testing-library/react';
import BidsTable from './BidsTable';


describe('BidsTable Component', () => {

  test('filters rows based on search input', async () => {
    render(<BidsTable />);
    const searchInput = screen.getByLabelText(/search this list/i);

    fireEvent.change(searchInput, { target: { value: 'Some search text' } });

  });
});
