/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { EoiRequestTable, Heading, StatisticRectangleCard } from '../../Components/index';
import images from '../../assets/index';

const RequestPage: React.FC = () => {

    const statisticRectangleCardData = [
        {
            title: 'Total Requests',
            icon: <img src={images.Requesticon} alt="staff icon" />,
            value: '720',
            valueColor: 'text-nnpcmediumgreen-700',
            iconBgColor: 'rounded-[10px] bg-nnpcmediumgreen-500',
        },
        {
            title: 'New Requests',
            icon: <img src={images.Requesticon} alt="staff icon" />,
            value: '12',
            valueColor: 'text-black',
            iconBgColor: 'bg-nnpc-50 rounded-[10px]',
        },
        {
            title: 'Pending Requests',
            icon: <img src={images.warning} alt="staff icon" />,
            value: '44',
            valueColor: 'text-green-800',
            backgroundColor: 'bg-nnpc-600',
            iconBgColor: 'rounded-full bg-nnpc-700',
        }
    ]

    return (
        <div className="">
            <div className=' mr-[25px]'>
                <div className='flex flex-col md:flex-row items-center justify-between'>
                    <Heading as="h4" size="h4" color='primaryColor' className="font-bold text-gray-600">EOI REQUESTS</Heading>
                </div>
                <div className='flex flex-col md:flex-row items-center gap-4 mt-6 ' >
                    {statisticRectangleCardData.map((card, index) => (
                        <StatisticRectangleCard
                            key={index}
                            title={card.title}
                            icon={card.icon}
                            value={card.value}
                            valueColor={card.valueColor}
                            iconBgColor={card.iconBgColor}
                            backgroundColor={card.backgroundColor}
                        />
                    ))}
                </div>
            </div>
            <div className='w-full mt-10'>
                <EoiRequestTable />
            </div>
        </div>
    );
};

export default RequestPage;