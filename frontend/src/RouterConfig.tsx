
import { createBrowserRouter } from 'react-router-dom';

import NotFound from './NotFound';
import Development from './Pages/Development';
import FormBuilderPage from './Pages/FormBuilderCroup/FormBuilderPage';
import GenerateToken from './Pages/GenerateToken/GenerateToken';
import Root from './Pages/Root';
import SSOCallback from './Pages/SSO/SSOCallback';
import SSOLogin from './Pages/SSO/SSOLogin';
import SSOUpdateUser from './Pages/SSO/SSOUpdateUser';
import SuccessToken from './Pages/SuccessToken/SuccessToken';
import { admin } from './Routes/Admin';
import { customer } from './Routes/Customer';
import Unauthorized from './Unauthorized';

const RouterConfig = () => {


    const router = createBrowserRouter([

        {
            path: '/admin',
            element: import.meta.env.VITE_NGML_DEV === 'development' ? <Development /> : <Root />,
            children: admin
        },
        {
            path: '/',
            element: <SSOLogin />
        },
        {
            path: '/sso',
            element: <SSOLogin />
        },
        {
            path: '/callback',
            element: <SSOCallback />
        },
        {
            path: '/sso/redirect',
            element: <SSOUpdateUser />
        },

        {

            path: '/unauthorized',
            element: <Unauthorized />
        },
        {
            path: '/customer',
            children: customer

        },
        {
            path: '*',
            element: <NotFound />,
        },
        {
            path: '/forms',
            element: <FormBuilderPage />
        },
        {
            path: '/generateToken',
            element: <GenerateToken />
        },
        {
            path: '/generateToken/success',
            element: <SuccessToken />
        },

    ]);
    return router;
};

export default RouterConfig;
