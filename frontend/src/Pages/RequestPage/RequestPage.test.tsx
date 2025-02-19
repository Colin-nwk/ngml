import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import RequestPage from './RequestPage';

describe('RequestPage', () => {
    test('renders the heading', () => {
        render(
            <MemoryRouter>
                <RequestPage />
            </MemoryRouter>
        );
        const headingElement = screen.getByText(/EOI REQUESTS/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('renders statistic rectangle cards', () => {
        render(
            <MemoryRouter>
                <RequestPage />
            </MemoryRouter>
        );

        const totalRequestsCard = screen.getByText(/Total Requests/i);
        const newRequestsCard = screen.getByText(/New Requests/i);
        const pendingRequestsCard = screen.getByText(/Pending Requests/i);

        expect(totalRequestsCard).toBeInTheDocument();
        expect(newRequestsCard).toBeInTheDocument();
        expect(pendingRequestsCard).toBeInTheDocument();
    });
});
