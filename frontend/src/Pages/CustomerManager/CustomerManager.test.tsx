import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CustomerManager from './CustomerManager';

describe('CustomerManager', () => {
    const renderWithRouter = (ui: any) => {
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    it('renders without crashing', () => {
        renderWithRouter(<CustomerManager />);
    });

    it('renders the correct number of DocumentCards', () => {
        renderWithRouter(<CustomerManager />);
        const documentCards = screen.getAllByText(/Last Updated/);
        expect(documentCards.length).toBe(2);
    });

    it('checks for specific card titles', () => {
        renderWithRouter(<CustomerManager />);

        expect(screen.getByText('Daily Volumes')).toBeInTheDocument();
        expect(screen.getByText('Billing')).toBeInTheDocument();
        expect(screen.getByText('Complaints')).toBeInTheDocument();
    });

    it('checks for specific images by alt text', () => {
        renderWithRouter(<CustomerManager />);

        const petrolIcon = screen.getByAltText('Report Icon');
        expect(petrolIcon).toBeInTheDocument();

        const callmadeIcons = screen.getAllByAltText('callmade Icon');
        expect(callmadeIcons.length).toBe(1);
    });
});