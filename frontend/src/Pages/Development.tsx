import MainLayout from '@/Layout/MainLayout';
import { Outlet } from 'react-router-dom';

const Development = () => {

    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
};

export default Development;
