import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import authReducer from '../../Redux/Features/Auth/authSlice';
import StaffLoginPage from './StaffLoginPage';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

describe('StaffLoginPage', () => {
  test('renders form fields and buttons correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StaffLoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /forgot password/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /new sign in/i })).toBeInTheDocument();
  });

  test('displays validation errors for empty fields', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StaffLoginPage />
          <ToastContainer />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  test('handles login correctly with valid inputs', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StaffLoginPage />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

  });

  test('handles forgot password and new sign in buttons', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StaffLoginPage />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /forgot password/i }));
    fireEvent.click(screen.getByRole('button', { name: /new sign in/i }));

  });
});