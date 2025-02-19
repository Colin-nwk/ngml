import { fireEvent, render, waitFor } from '@testing-library/react';
import ForgotPassword from './ForgotPassword';

describe('PortalEnrollment component', () => {
    it('should render without errors', () => {
        render(<ForgotPassword />);
    });

    it('should show error message when submitting with empty email', async () => {
        const { getByText } = render(<ForgotPassword />);
        const loginButton = getByText('Submit');

        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(getByText('Email is required')).toBeInTheDocument();
        });
    });

    it('should show error message when submitting with invalid email format', async () => {
        const { getByPlaceholderText, getByText } = render(<ForgotPassword />);
        const emailInput = getByPlaceholderText('Enter email here');
        const loginButton = getByText('Submit');

        fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(getByText('Invalid email address')).toBeInTheDocument();
        });
    });

    it('should call handleSubmit function when submitting with valid email', async () => {
        const { getByPlaceholderText, getByText } = render(<ForgotPassword />);
        const emailInput = getByPlaceholderText('Enter email here');
        const loginButton = getByText('Submit');

        fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
        fireEvent.click(loginButton);
    });


});