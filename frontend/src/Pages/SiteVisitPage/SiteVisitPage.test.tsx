import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SiteVisitPage from './SiteVisitPage';

describe('SiteVisitPage', () => {
    test('renders without crashing', () => {
        render(<SiteVisitPage />);
        expect(screen.getByText('SITE VISITS')).toBeInTheDocument();
        expect(screen.getByText('Upcoming Site Visits')).toBeInTheDocument();
    });

    test('renders date cards correctly', () => {
        render(<SiteVisitPage />);
        const dateCards = screen.getAllByText(/Dangote Cement LTD/i);
        expect(dateCards).toHaveLength(5);
    });

});