import React from 'react';

interface DateCardDetailsProps {
    type: 'withCompany' | 'withoutCompany';
    day?: number | string;
    to?: string;
    month?: string;
    year?: string;
    dateRange?: string;
    company?: string;
    distance?: string;
    text?: string;
    contractor?: string;
    icon1?: React.ReactNode;
    icon2?: React.ReactNode;
    width?: number | string;
    height?: number | string;
    backgroundColor?: string;
    textColor?: string;
}

const DateCardDetails: React.FC<DateCardDetailsProps> = ({
    type,
    day,
    to,
    month,
    year,
    dateRange,
    company,
    distance,
    text,
    contractor,
    icon1,
    icon2,
    width = '100%',
    height = '100%',
    backgroundColor = '',
    textColor
}) => {
    return (
        <div className={`w-full shadow border p-4 rounded-[20px] ${backgroundColor}`} style={{ width, height }}>
            {type === 'withCompany' ? (
                <div className='space-y-6'>
                    <div className='w-full'>
                        <div className='text-[50px] font-bold text-[#226844]'>{day}</div>
                        <div className='mt-[-15px] font-bold text-[25px] text-[#226844]'>{month} {year}</div>
                        <div className='mt-1 flex gap-2'>
                            <div className='font-[700] text-[#226844] text-[12px]'>{to}</div>
                            <span className='border font-[700] text-[#226844] text-[12px] flex items-center justify-center rounded-[20px] px-2 border-[#226844]'>{dateRange}</span>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <div className='flex gap-2'>
                            {icon1 && <div className='w-6'>{icon1}</div>}
                            <span className='font-bold text-[#9CA3AF]'>{company}</span>
                        </div>
                        <div className='flex gap-2 text-[#9CA3AF]'>
                            {icon2 && <div className='w-6'>{icon2}</div>}
                            <span>{distance}</span>
                        </div>
                    </div>
                    <div>
                        <div className='text-[#9CA3AF]'>{text}</div>
                        <div className='font-bold text-[#9CA3AF]'>{contractor}</div>
                    </div>
                </div>
            ) : (
                <div className='space-y-[100px]'>
                    <div className='w-full '>
                        <div className={`text-[50px] font-bold ${textColor}`}>{day}</div>
                        <div className={`mt-[-12px] font-bold text-[25px] ${textColor}`}>{month} {year}</div>
                    </div>
                    <div className='space-y-2'>
                        <div className='flex gap-2'>
                            {icon1 && <div className='w-6'>{icon1}</div>}
                            <span className='font-bold'>{company}</span>
                        </div>
                        <div className='flex gap-2'>
                            {icon2 && <div className='w-6'>{icon2}</div>}
                            <span>{distance}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateCardDetails;