import InfoCard from '@/Components/InfoCardComponent/InfoCardComponent';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Heading, StatisticRectangleCard, SuppliersListTable } from '../../Components/index';
import images from '../../assets/index';

const SuppliersPage: React.FC = () => {

    const dropdownOptions = ['All Suppliers', 'Option 2', 'Option 3'];


    const getIconStyles = (title: string) => {
        switch (title) {
            case 'Suppliers':
                return { bgColor: 'bg-[#00AF50]', iconColor: 'text-white' };
            case 'Active Suppliers':
                return { bgColor: 'bg-[#D2F69E]', iconColor: 'text-white' };
            case 'Processing Suppliers':
                return { bgColor: 'bg-[#FFD181]', iconColor: 'text-black', };
            default:
                return { bgColor: 'bg-gray-500', iconColor: 'text-white', };
        }
    };

    const cardData = [
        {
            title: 'Suppliers',
            value: '9',
            icon: <img src={images.customers} alt="staff icon" />,


        },
        {
            title: 'Active Suppliers',
            value: '9',
            icon: <img src={images.customers} alt="staff icon" />,


        },
        {
            title: 'Processing Suppliers',
            value: '2',
            icon: <img src={images.warning} alt="staff icon" />,

        },
    ];

    return (
        <div>
            <div>
                <div className='flex flex-col md:flex-row items-center justify-between '>
                    <Heading as="h4" size="h4" color='primaryColor' className="font-semibold text-gray-600">SUPPLIERS</Heading>
                    <div className='flex gap-[16px]'>
                        <Button
                            type='outline'
                            label='Create PDF'
                            radius='20px'
                            width='96px'
                            height='32px'
                            action={() => { }}
                        />
                        <Link to={'/admin/records/supplierregistration'}>
                            <Button
                                type='outline'
                                label='New Supplier'
                                radius='20px'
                                width='96px'
                                height='32px'
                                action={() => { }}

                            />
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-6 gap-4" >
                    {cardData.map((card, index) => {
                        const { bgColor, iconColor } = getIconStyles(card.title);
                        return (
                            <StatisticRectangleCard
                                key={index}
                                title={card.title}
                                value={card.value}
                                icon={React.cloneElement(card.icon, { className: `${iconColor} ${bgColor} rounded-[8px] w-[32px] h-[32px] p-1` })}
                                iconBgColor=''
                            />
                        );
                    })}
                </div>
            </div>
            <div className=' flex flex-col md:flex-row md:mt-[30px] gap-[16px] w-[100%] '>
                <InfoCard
                    title={'Aggregate Monthly Supply Volume'}
                    number={'472,593,854.00'}
                    subtitle={'(Scf)'}
                    showDropdown={true}
                    options={dropdownOptions}
                />
                <InfoCard
                    title={'Aggregate Daily Supply Volume'}
                    number={'793,854.00'}
                    subtitle={'(Scf)'}
                    showDropdown={true}
                    options={dropdownOptions}
                />

            </div>
            <div className='w-full mt-9'>
                <SuppliersListTable />
            </div>
        </div>
    );
};

export default SuppliersPage;