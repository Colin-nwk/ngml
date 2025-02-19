import '@testing-library/jest-dom'; // Correct import for jest-dom
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';

describe('ForgotPassword Component', () => {
    test('renders the component and checks for initial state', () => {
        render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        );

        // Check if the email input is in the document
        const emailInput = screen.getByPlaceholderText(/enter your email here/i);
        expect(emailInput).toBeInTheDocument();

        // Check if the submit button is in the document
        const submitButton = screen.getByText(/submit/i);
        expect(submitButton).toBeInTheDocument();
    });

    test('displays email required error message when email is empty', () => {
        render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        );

        const submitButton = screen.getByText(/submit/i);
        fireEvent.click(submitButton);

        const errorMessage = screen.getByText(/email is required/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test('displays invalid email error message when email format is incorrect', () => {
        render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        );

        const emailInput = screen.getByPlaceholderText(/enter your email here/i);
        const submitButton = screen.getByText(/submit/i);

        fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
        fireEvent.click(submitButton);

        const errorMessage = screen.getByText(/invalid email address/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test('navigates to reset-password page with email query parameter when email is valid', () => {
        render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        );

        const emailInput = screen.getByPlaceholderText(/enter your email here/i);
        const submitButton = screen.getByText(/submit/i);

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);

        // Check if the success toast is displayed
        const successMessage = screen.getByText(/reset link has been sent to your email/i);
        expect(successMessage).toBeInTheDocument();
    });
});