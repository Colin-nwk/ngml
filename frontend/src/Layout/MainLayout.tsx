import { AdminLinks } from '@/Links/AdminLinks';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { NavigationBar, TopNavigationBar } from '../Components/index';

const MainLayout = ({ children }: { children: React.ReactNode }) => {

    const [isNavigationBarVisible, setIsNavigationBarVisible] = useState(true);

    const toggleNavigationBar = () => {
        setIsNavigationBarVisible(!isNavigationBarVisible);
    };

    return (
        <>
            <div className='w-full h-full fixed'>
                <TopNavigationBar />
                <ToastContainer />
                <div className='flex bg-[#EAEEF2] pt-[70px] w-[100%] h-[100vh]'>
                    <div className='hidden sm:block'>
                        <NavigationBar
                            Navigationlinks={AdminLinks}
                            sliceLength={5}
                            isNavigationBarVisible={isNavigationBarVisible}
                            toggleNavigationBar={toggleNavigationBar}
                        />
                    </div>
                    <main className='bg-[#F5F7F9] md:p-[32px] p-4 mt-[20px] rounded-[8px] mr-[10px] w-[100%] h-[100%] overflow-y-auto'>
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};

export default MainLayout;

