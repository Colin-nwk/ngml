import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import authReducer from '../../../Redux/Features/Auth/authSlice';
import CustomerOtpPage from './CustomerOtpPage';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

describe('CustomerOtpPage', () => {
    test('renders form fields and buttons correctly', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CustomerOtpPage />
                    <ToastContainer />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByPlaceholderText(/enter otp sent to email/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /proceed/i })).toBeInTheDocument();
    });

    test('displays validation error for empty OTP field', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CustomerOtpPage />
                    <ToastContainer />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.click(screen.getByRole('button', { name: /proceed/i }));

        expect(await screen.findByText(/otp is required/i)).toBeInTheDocument();
    });

});
