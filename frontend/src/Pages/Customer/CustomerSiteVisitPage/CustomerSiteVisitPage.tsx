import { SetStateAction, useState } from 'react';
import colors from '@/Utils/colors';

const CustomerSiteVisitPage = () => {

    const [selectedDate, setSelectedDate] = useState('');


    const availableDates = ['18/June/2023', '12/June/2023', '06/June/2023'];


    const handleDateSelection = (date: SetStateAction<string>) => {
        setSelectedDate(date);
    };

    return (
        <div className="p-[20px] flex flex-col gap-4 rounded-[20px] w-[100%] h-fit" style={{ background: colors.dark[50] }}>
            <div className='border-2 border-nnpcdarkgreen-500 rounded-[10px] p-[15px] bg-dark-50'>
                <div className='text-[18px] font-[600]'>Notice !!!</div>
                <div className='mt-2 text-[14px]'>
                    The NNPC Gas Marketing Limited will
                    be required to visit the premises of your
                    business operations, to carry out a preliminary feasibility
                    and site survey assessment. We therefore need you to pick
                    a date most convenient for that visit from the 3 available
                    dates provided below.
                </div>
            </div>
            <div className='border-2 border-nnpcdarkgreen-500 rounded-[10px] p-[15px] bg-dark-50'>
                <div className='font-[600]'>Available Dates</div>
                <div className='mt-2 flex gap-4'>
                    {availableDates.map((date) => (
                        <button
                            key={date}
                            onClick={() => handleDateSelection(date)}
                            className={`px-2 text-[12px] p-1 rounded-full ${selectedDate === date ? 'bg-[#53B052] text-white ' : 'bg-gray-200'}`}
                        >
                            {date}
                        </button>
                    ))}
                </div>
            </div>
                <div className='mt-2 flex justify-end'>
                    <button className='px-4 py-2 bg-[#53B052] text-white rounded-full text-[14px]'>
                        Select Preferred Date
                    </button>
                </div>
            
        </div>
    )
}

export default CustomerSiteVisitPage;
