import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import authReducer from '../../../Redux/Features/Auth/authSlice';
import CustomerLoginPage from './CustomerLoginPage';

const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });
  

describe('CustomerLoginPage', () => {
  test('renders form fields and buttons correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CustomerLoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /proceed/i })).toBeInTheDocument();
  });

  test('displays validation errors for empty email field', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CustomerLoginPage />
          <ToastContainer />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /proceed/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  test('displays validation error for invalid email format', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CustomerLoginPage />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: /proceed/i }));

    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
  });

});
