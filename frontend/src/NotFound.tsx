import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col p-6 items-center justify-center min-h-screen bg-[#EEEEF0]">
            <h1 className="text-[24px] md:text-5xl  font-bold text-gray-600 mb-4">404 - Not Found</h1>
            <p className="text-[16px] md:text-xl text-gray-600 text-center">Sorry, the page you are looking for does not exist.</p>
            <Link to={'./admin'}>
                <div className='mt-5'>
                    <button className='border bg-[#53B052] hover:bg-[#265929] text-[16px] text-white h-[44px] w-[180px] rounded-[6px]'>Back To Home Page</button>
                </div>
            </Link>
        </div>
    );
};

export default NotFound;
