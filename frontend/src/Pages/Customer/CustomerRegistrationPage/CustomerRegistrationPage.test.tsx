import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import authReducer from '../../../Redux/Features/Auth/authSlice';
import CustomerRegistrationPage from './CustomerRegistrationPage';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

describe('CustomerRegistrationPage', () => {
    test('renders form fields and buttons correctly', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CustomerRegistrationPage />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByPlaceholderText(/enter the business name here/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter the business email here/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });

    test('displays validation errors for empty fields', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CustomerRegistrationPage />
                    <ToastContainer />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getByRole('button', { name: /register/i }));

    });

    test('handles login correctly with valid inputs', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CustomerRegistrationPage />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText(/enter the business name here/i), {
            target: { value: 'dangote' },
        });

        fireEvent.change(screen.getByPlaceholderText(/enter the business email here/i), {
            target: { value: 'test@example.com' },
        });

        fireEvent.click(screen.getByRole('button', { name: /register/i }));

    });
});