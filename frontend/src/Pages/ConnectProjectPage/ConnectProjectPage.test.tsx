import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ConnectProjectPage from './ConnectProjectPage';

describe('ConnectProjectPage', () => {
    test('renders without crashing', () => {
        render(<ConnectProjectPage />);
        expect(screen.getByText('CONNECT PROJECTS')).toBeInTheDocument();
        expect(screen.getByText('Upcoming Projects')).toBeInTheDocument();
    });

    test('renders date cards correctly', () => {
        render(<ConnectProjectPage />);
        const dateCards = screen.getAllByText(/Dangote Cement LTD/i);
        expect(dateCards).toHaveLength(5);
    });

});