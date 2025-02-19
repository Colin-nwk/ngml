import MainLayout from '@/Layout/MainLayout';
import { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentUser, selectToken } from '../Redux/Features/Auth/authSlice';

const Root = () => {
    const location = useLocation();
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectToken);

    useLayoutEffect(() => {
        // This will run synchronously before the browser paints
        setIsAuthChecked(true);
    }, []);

    if (!isAuthChecked) {
        return null; // Return nothing while checking auth
    }

    const isAuthenticated = Boolean(token && user);

    return (
        <MainLayout>
            {isAuthenticated ? (
                <Outlet />
            ) : (
                <Navigate to="/" state={{ from: location }} replace />
            )}
        </MainLayout>
    );
};

export default Root;

