import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import InvoicePage from './InvoicePage';

describe('InvoicePage', () => {
    it('should render without crashing', () => {
        render(
            <MemoryRouter initialEntries={['/invoice']}>
                <InvoicePage />
            </MemoryRouter>
        );
        expect(screen.getByText('October Invoice Advice')).toBeInTheDocument();
    });

    it('should render the initial page correctly', () => {
        render(
            <MemoryRouter initialEntries={['/invoice']}>
                <InvoicePage />
            </MemoryRouter>
        );
        expect(screen.getByText('Page 1 of 68 showing')).toBeInTheDocument();
    });

    it('should navigate to the next page when Next is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/invoice']}>
                <InvoicePage />
            </MemoryRouter>
        );

        const nextButton = screen.getByRole('button', { name: /right arrow icon/i });
        fireEvent.click(nextButton);

        expect(screen.getByText('Page 2 of 68 showing')).toBeInTheDocument();
    });

    it('should not allow navigation past the last page', () => {
        render(
            <MemoryRouter initialEntries={['/invoice']}>
                <InvoicePage />
            </MemoryRouter>
        );

        const lastPageButton = screen.getByRole('button', { name: /right arrow icon/i });

        for (let i = 0; i < 68; i++) {
            fireEvent.click(lastPageButton);
        }

        expect(lastPageButton).toBeDisabled();
    });

    it('should navigate to the previous page when Previous is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/invoice']}>
                <InvoicePage />
            </MemoryRouter>
        );

        const nextButton = screen.getByRole('button', { name: /right arrow icon/i });
        fireEvent.click(nextButton);

        const prevButton = screen.getByRole('button', { name: /left arrow icon/i });
        fireEvent.click(prevButton);

        expect(screen.getByText('Page 1 of 68 showing')).toBeInTheDocument();
    });
});