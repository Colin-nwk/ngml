import { fireEvent, render, waitFor } from '@testing-library/react';
import PortalEnrollment from './PortalEnrollment';

describe('PortalEnrollment component', () => {
  it('should render without errors', () => {
    render(<PortalEnrollment />);
  });

  it('should show error message when submitting with empty email', async () => {
    const { getByText } = render(<PortalEnrollment />);
    const loginButton = getByText('Login');

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getByText('Email is required')).toBeInTheDocument();
    });
  });

  it('should show error message when submitting with invalid email format', async () => {
    const { getByPlaceholderText, getByText } = render(<PortalEnrollment />);
    const emailInput = getByPlaceholderText('Enter your Staff ID');
    const loginButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getByText('Invalid email address')).toBeInTheDocument();
    });
  });

  it('should call handleSubmit function when submitting with valid email', async () => {
    const { getByPlaceholderText, getByText } = render(<PortalEnrollment />);
    const emailInput = getByPlaceholderText('Enter your Staff ID');
    const loginButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.click(loginButton);

    // Add a waitFor assertion to check if handleSubmit is called
  });

  it('should call handleCancellation function when cancel button is clicked', () => {
    const { getByAltText } = render(<PortalEnrollment />);
    const cancelButton = getByAltText('cancel icon');

    fireEvent.click(cancelButton);
  });
});