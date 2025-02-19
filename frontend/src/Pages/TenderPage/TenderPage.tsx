import React, { useState, useEffect } from 'react';
import { Button, CustomInput, Heading, Modal, OpenTenderTable, StatisticRectangleCard } from '../../Components/index';
import images from '../../assets/index';
import { useNavigate, useLocation } from 'react-router-dom';

const TenderPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        location: '',
        type: '',
        phoneNumber: ''
    });

    const navigate = useNavigate();
    const location = useLocation();

    const toggleModal = (open: boolean) => {
        setIsModalOpen(open);
        const searchParams = new URLSearchParams(location.search);

        if (open) {
            searchParams.set('createCustomer', 'true');
        } else {
            searchParams.delete('createCustomer');
        }

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    const handleInputChange = (value: string, key: string) => {
        setCustomerData({ ...customerData, [key]: value });
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const createCustomer = searchParams.get('createCustomer');

        if (createCustomer === 'true') {
            setIsModalOpen(true);
        }
    }, [location.search]);

    const handleCreateCustomer = () => {
        if (customerData.name.trim() === '' || customerData.email.trim() === '') {
            alert('Please fill in all required fields.');
            return;
        }
        console.log('Creating customer:', customerData);
        toggleModal(false);
        alert('Customer successfully registered!');
        window.location.href = '/admin/records/customernewregistration';
    };

    const options = ['Option 1', 'Option 2', 'Option 3'];

    return (
        <div className="">
            <div className=' mr-[25px]'>
                <div className='flex flex-col md:flex-row items-center justify-between'>
                    <Heading as="h4" size="h4" color='primaryColor' className="font-semibold text-gray-600">TENDERS</Heading>
                    <Button
                        type='outline'
                        label='New Tender'
                        radius='20px'
                        fontSize='22px'
                        width='120px'
                        height='30px'
                        action={() => toggleModal(true)}
                    />
                </div>
                <div className='flex flex-col md:flex-row items-center gap-4 mt-6 '>
                    <StatisticRectangleCard
                        title='All Tenders'
                        icon={<img src={images.customers} alt="staff icon" />}
                        value='72'
                        valueColor='text-nnpcmediumgreen-700'
                        iconBgColor='rounded-[10px] bg-nnpcmediumgreen-500'
                    />
                    <StatisticRectangleCard
                        title='Open Tenders'
                        icon={<img src={images.customers} alt="staff icon" />}
                        value='60'
                        valueColor='text-black'
                        iconBgColor='bg-nnpc-50 rounded-[10px]'
                    />
                    <StatisticRectangleCard
                        title='Drafts'
                        icon={<img src={images.warning} alt="staff icon" />}
                        value='12'
                        valueColor='text-green-800'
                        backgroundColor='bg-nnpc-600'
                        iconBgColor='rounded-full bg-nnpc-700'
                    />
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => toggleModal(false)}
                size='medium'
                title='Create New Customer'
                subTitle='Only Use this Method if the Customer is an already Existing Customer of the NGML'
                buttons={[
                    <div className='flex gap-2 mb-[-10px]'>
                        <div className='w-[120px]'>
                            <Button
                                type="outline"
                                label="Cancel"
                                action={() => toggleModal(false)}
                                color="#FFFFFF"
                                fontStyle="italic"
                                width="100%"
                                height="40px"
                                fontSize="16px"
                                radius="20px"
                            />
                        </div>
                        <div className='w-[260px]'>
                            <Button
                                type="secondary"
                                label="Create Customer"
                                action={handleCreateCustomer}
                                color="#FFFFFF"
                                fontStyle="italic"
                                width="100%"
                                height="40px"
                                fontSize="16px"
                                radius="20px"
                            />
                        </div>
                    </div>
                ]}
            >
                <CustomInput
                    required
                    type="text"
                    label='Name of Customer'
                    value={customerData.name}
                    handleChangeEvent={(value) => handleInputChange(value, 'name')}
                    placeholder="Enter Name of Customer"
                />
                <CustomInput
                    required
                    type="text"
                    label='Email'
                    value={customerData.email}
                    handleChangeEvent={(value) => handleInputChange(value, 'email')}
                    placeholder="Enter email"
                />
                <CustomInput
                    type="select"
                    label='Customer Location'
                    value={customerData.location}
                    handleChangeEvent={(value) => handleInputChange(value, 'location')}
                    placeholder="Choose Type"
                    options={options}
                />
                <CustomInput
                    type="select"
                    label='Customer Type'
                    value={customerData.type}
                    handleChangeEvent={(value) => handleInputChange(value, 'type')}
                    placeholder="Choose Type"
                    options={options}
                />
                <CustomInput
                    type="text"
                    label='Customer Phone Number'
                    value={customerData.phoneNumber}
                    handleChangeEvent={(value) => handleInputChange(value, 'phoneNumber')}
                    placeholder="Enter Phone Number"
                />
            </Modal>
            <div className='w-[100%] mt-10' >
                <OpenTenderTable />
            </div>
        </div>
    );
};

export default TenderPage;