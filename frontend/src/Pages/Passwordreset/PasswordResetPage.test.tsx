import { fireEvent, render, screen } from '@testing-library/react';
import PasswordResetPage from './PasswordResetPage';

describe('PasswordResetPage', () => {
    it('renders without crashing', () => {
        render(<PasswordResetPage />);
    });

    it('handles email input change', () => {
        render(<PasswordResetPage />);
        const emailInput = screen.getByPlaceholderText('Enter your email') as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput.value).toBe('test@example.com');
    });

    it('handles password input change', () => {
        render(<PasswordResetPage />);
        const passwordInput = screen.getByPlaceholderText('Enter a password') as HTMLInputElement;
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        expect(passwordInput.value).toBe('testpassword');
    });

    it('handles confirm password input change', () => {
        render(<PasswordResetPage />);
        const confirmPasswordInput = screen.getByPlaceholderText('Re-Enter the password') as HTMLInputElement;
        fireEvent.change(confirmPasswordInput, { target: { value: 'testpassword' } });
        expect(confirmPasswordInput.value).toBe('testpassword');
    });

    it('displays error when passwords do not match', () => {
        render(<PasswordResetPage />);
        const passwordInput = screen.getByPlaceholderText('Enter a password') as HTMLInputElement;
        const confirmPasswordInput = screen.getByPlaceholderText('Re-Enter the password') as HTMLInputElement;

        fireEvent.change(passwordInput, { target: { value: 'password1' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password2' } });

        const saveButton = screen.getByText('Save Password');
        fireEvent.click(saveButton);

        expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
});