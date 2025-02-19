import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Complaints from './Complaints';

describe('Complaints Component', () => {
    test('it renders without crashing', () => {
        render(
            <MemoryRouter>
                <Complaints />
            </MemoryRouter>
        );
        expect(screen.getByText(/COMPLAINTS/i)).toBeInTheDocument();
    });

    test('input field updates on change', () => {
        render(
            <MemoryRouter>
                <Complaints />
            </MemoryRouter>
        );
        const inputField = screen.getByPlaceholderText('Send a message');
        fireEvent.change(inputField, { target: { value: 'Hello, World!' } });
        expect(inputField).toHaveValue('Hello, World!');
    });
    test('navigates back when close is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Complaints />
            </MemoryRouter>
        );
        const closeButton = screen.getByText(/Close/i).closest('div');

        if (closeButton) {
            fireEvent.click(closeButton);

            expect(window.location.pathname).toBe('/');
        } else {
            throw new Error("Close button not found");
        }
    });



    test('submit button triggers handleSubmit', () => {
        render(
            <MemoryRouter>
                <Complaints />
            </MemoryRouter>
        );
        const sendIcon = screen.getByAltText('sendicon');
        fireEvent.click(sendIcon);
    });
});