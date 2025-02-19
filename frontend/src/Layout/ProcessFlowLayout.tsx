

import { ArrowBack } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';

const ProcessFlowLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Link to={'/admin/settings'}>
                <div className='flex justify-center ml-3 mb-2 items-center border-2 h-[32px] w-[32px] rounded-[50%]'>
                    <ArrowBack color="success" style={{ fontSize: 'medium' }} />
                </div>
            </Link>
            <div className="h-fit w-100% overflow-hidden flex flex-col mt-3 mb-2">
                <div className="flex-grow w-full ">
                    <div className="w-full h-full relative bg-white rounded-2xl overflow-hidden">
                        {/* <div
                            className="w-full h-full bg-repeat absolute inset-0"
                            style={{
                                backgroundImage: `url(${images.paper})`,
                                backgroundSize: 'auto',
                                opacity: 0.5,
                            }}
                        /> */}
                        <div className="relative z-10 w-full h-full overflow-auto p-4">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessFlowLayout;



// import React from 'react';

// const ProcessFlowLayout = ({ children }: { children: React.ReactNode }) => {
//     return (
//         <div className="h-screen w-screen overflow-hidden flex flex-col">
//             <div className="flex-grow w-full bg-nnpc-100/10 p-4">
//                 <div className="w-full h-full relative bg-white rounded-lg overflow-hidden">

//                     <div className="relative z-10 w-full h-full overflow-auto p-4">
//                         {children}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProcessFlowLayout;