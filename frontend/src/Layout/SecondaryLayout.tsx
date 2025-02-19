import TopNavigationBar from '@/Components/TopNavigationBar/TopNavigationBar';
import { CustomerLinks } from '@/Links/CustomerLinks';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import NavigationBar from '../Components/NavigationMenu/NavigationBar';

const SecondaryLayout = ({ children }: { children: React.ReactNode }) => {

    const [isNavigationBarVisible, setIsNavigationBarVisible] = useState(true);

    const toggleNavigationBar = () => {
        setIsNavigationBarVisible(!isNavigationBarVisible);
    };

    return (
        <div className='w-full h-full fixed'>
            <TopNavigationBar />
            <ToastContainer />
            <div className='flex bg-[#CFE9A1] pt-[70px] w-[100%] h-[100vh]'>
                <div className='hidden sm:block'>
                    <NavigationBar
                        Navigationlinks={CustomerLinks}
                        isNavigationBarVisible={isNavigationBarVisible}
                        toggleNavigationBar={toggleNavigationBar}
                        sliceLength={2}
                    />
                </div>
                <main className='bg-[#ECF5CC] p-[32px] mt-[20px] rounded-[8px] mr-[10px] w-[100%] h-[100%] overflow-y-auto'>
                    {children}
                </main>
            </div>
        </div>

    );
};

export default SecondaryLayout;










