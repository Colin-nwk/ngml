// import NotFound from '@/NotFound';
import CustomerBusinessManagerPageLayout from '@/Pages/Customer/CustomerBusinessManagerPageLayout/CustomerBusinessManagerPageLayout';
import CustomerHomePage from '@/Pages/Customer/CustomerHomePage/CustomerHomePage';
import CustomerLoginPage from '@/Pages/Customer/CustomerLoginPage/CustomerLoginPage';
import CustomerOtpPage from '@/Pages/Customer/CustomerOtpPage/CustomerOtpPage';
import CustomerRegistrationPage from '@/Pages/Customer/CustomerRegistrationPage/CustomerRegistrationPage';
import ForgotPassword from '@/Pages/Customer/ForgotPassword/ForgotPassword';
import ResetPassword from '@/Pages/Customer/ResetPassword/ResetPassword';
import CustomerInvoiceAdviceLayout from '@/Pages/CustomerInvoiceAdvice/CustomerInvoiceAdviceLayout';
import Secondary from '@/Pages/Secondary';



export const customer = [



    {

        path: '',
        element: <Secondary />,
        children: [
            {
                path: '',
                index: true,
                element: <CustomerHomePage />
            },
            {

                path: '/customer/businessmanager',
                element: <CustomerBusinessManagerPageLayout />
            },
            {
                path: '/customer/invoice/:customerId/:locationId',
                element: <CustomerInvoiceAdviceLayout />,
            },

        ]

    },

    {

        path: '/customer/register',
        element: <CustomerRegistrationPage />
    },
    {
        path: '/customer/otp',
        element: <CustomerOtpPage />
    },
    {

        path: '/customer/login',
        element: <CustomerLoginPage />
    },
    {
        path: '/customer/forgotpassword',
        element: <ForgotPassword />
    },
    {

        path: '/customer/resetpassword',
        element: <ResetPassword />
    },

];