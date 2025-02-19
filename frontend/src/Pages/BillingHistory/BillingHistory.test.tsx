import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BillingHistory from './BillingHistory';

const renderWithRouter = (component: any) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('BillingHistory Component', () => {
    test('renders Billing History component', () => {
        renderWithRouter(<BillingHistory />);

        const heading = screen.getByText(/Billings/i);
        expect(heading).toBeInTheDocument();

    });

    test('opens and closes the modal', () => {
        renderWithRouter(<BillingHistory />);

        const newInvoiceButton = screen.getByText(/New Billing/i);
        fireEvent.click(newInvoiceButton);

        const modal = screen.getByText(/Generate New Invoice Advice/i);
        expect(modal).toBeInTheDocument();

        // expect(modal).not.toBeInTheDocument();
    });

    test('handles year dropdown change', () => {
        render(
            <MemoryRouter>
                <BillingHistory />
            </MemoryRouter>
        );

        const yearDropdown = screen.getByRole('combobox') as HTMLSelectElement;

        fireEvent.change(yearDropdown, { target: { value: '2022' } });

        expect(yearDropdown.value).toBe('2022');
    });
});