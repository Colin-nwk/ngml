/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { DateCardDetails, SiteVistTable, Heading, Button, Notification } from '../../Components/index';
import images from '../../assets/index';
import { CalendarTodayOutlined } from '@mui/icons-material';

const SiteVisitePage: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<number | null>(0);

    const dateCards = [
        { type: 'withoutCompany' as const, day: '19', month: 'Dec', year: '2023', icon1: <img src={images.Businessicon} alt="icon1" />, icon2: <img src={images.zone} alt="icon2" />, company: 'Dangote Cement LTD', distance: '1 Alfred Riwane Rd, Ikoyi 106104, Lagos' },
        { type: 'withoutCompany' as const, day: '09', month: 'Dec', year: '2023', icon1: <img src={images.Businessicon} alt="icon2" />, icon2: <img src={images.zone} alt="icon3" />, company: 'Dangote Cement LTD', distance: '1 Alfred Riwane Rd, Ikoyi 106104, Lagos' },
        { type: 'withoutCompany' as const, day: '11', month: 'Dec', year: '2023', icon1: <img src={images.Businessicon} alt="icon3" />, icon2: <img src={images.zone} alt="icon4" />, company: 'Dangote Cement LTD', distance: '1 Alfred Riwane Rd, Ikoyi 106104, Lagos' },
        { type: 'withoutCompany' as const, day: '13', month: 'Dec', year: '2023', icon1: <img src={images.Businessicon} alt="icon4" />, icon2: <img src={images.zone} alt="icon5" />, company: 'Dangote Cement LTD', distance: '1 Alfred Riwane Rd, Ikoyi 106104, Lagos' }
    ];

    const handleCardClick = (index: number) => {
        setSelectedCard(index);
    };

    return (
        <div>
            <Heading as="h4" size="h4" color='primaryColor' className="font-bold text-gray-600">SITE VISITS</Heading>
            <div className='flex flex-col md:flex-row items-center justify-between mt-6 '>
                    <Heading as="h6" size="h6" color='primaryColor' className="font-semibold text-gray-600">Upcoming Site Visits</Heading>
                    <div className='flex gap-[16px]'>
                    <Notification
                    count={4}
                        headerTitle="Messages"
                        renderIcon={() => <div><CalendarTodayOutlined style={{ fontSize: 'medium' }} /></div>}
                    />
                            <Button
                                type='outline'
                                label='See All'
                                radius='20px'
                                width='96px'
                                height='32px'
                                action={() => { }}

                            />
                    </div>
                </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {dateCards.map((card, index) => (
                    <div key={index} onClick={() => handleCardClick(index)}>
                        <DateCardDetails
                            {...card}
                            backgroundColor={selectedCard === index ? 'bg-[#D2F69E]' : ''}
                            textColor={selectedCard === index ? 'text-[#226844]' : ''}
                        />
                    </div>
                ))}
            </div>
            <div className='w-full mt-10'>
                <SiteVistTable />
            </div>
        </div>
    );
};

export default SiteVisitePage;