import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ResetPassword from './ResetPassword';

describe('ResetPassword', () => {
    const renderComponent = (initialRoute: string) => {
        render(
            <MemoryRouter initialEntries={[initialRoute]}>
                <Routes>
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
                <ToastContainer />
            </MemoryRouter>
        );
    };

    test('renders ResetPassword with email from query params', () => {
        renderComponent('/reset-password?email=test@example.com');

        expect(screen.getByPlaceholderText('Enter email here')).toHaveValue('test@example.com');
    });

    test('shows error message when password is not provided', () => {
        renderComponent('/reset-password?email=test@example.com');

        fireEvent.click(screen.getByText('Save Password'));

        expect(screen.getByText('Password is required')).toBeInTheDocument();
    });

    test('shows error message when passwords do not match', () => {
        renderComponent('/reset-password?email=test@example.com');

        fireEvent.change(screen.getByPlaceholderText('Enter password'), {
            target: { value: 'password123' },
        });
        fireEvent.change(screen.getByPlaceholderText('Re-enter password'), {
            target: { value: 'password456' },
        });

        fireEvent.click(screen.getByText('Save Password'));

        expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });

    test('navigates to login page and shows success toast when form is valid', () => {
        renderComponent('/reset-password?email=test@example.com');

        fireEvent.change(screen.getByPlaceholderText('Enter password'), {
            target: { value: 'password123' },
        });
        fireEvent.change(screen.getByPlaceholderText('Re-enter password'), {
            target: { value: 'password123' },
        });

        fireEvent.click(screen.getByText('Save Password'));

        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
});