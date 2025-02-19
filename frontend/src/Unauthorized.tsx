import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
    return (
        <div className="flex flex-col p-6 items-center justify-center min-h-screen bg-[#EEEEF0]">
            <h1 className="text-[24px] md:text-5xl  font-bold text-gray-600 mb-4">401 - Unauthorized</h1>
            <p className="text-[16px] md:text-xl text-gray-600 text-center">You do not have permission to view this page.</p>
            <Link to={'/'}>
                <div className='mt-5'>
                    <button className='border bg-[#53B052] text-white hover:bg-[#265929] text-[16px] h-[44px] w-[180px] rounded-[6px]'>Back To Login Page</button>
                </div>
            </Link>
        </div>
    );
};

export default Unauthorized;
