import React, { useState } from 'react';
import { Button, CustomInput, DailyFrequencyTable, FileUploadInput, Heading, Modal } from '../../../Components/index';
import images from '../../../assets/index';

const OperationPage: React.FC = () => {
    const [isVolumeModalOpen, setIsVolumeModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [VolumeData, setVolumeData] = useState({
        customer: '',
        date: '',
        volume: '',
        priceperscf: '',
        estimatedamount: ''
    });
    const [VolumeUpload, setVolumeUpload] = useState({
        customerUpload: '',
        dataType: '',
        year: '',
    });

    const toggleVolumeModal = (open: boolean) => {
        setIsVolumeModalOpen(open);
    };

    const toggleUploadModal = (open: boolean) => {
        setIsUploadModalOpen(open);
    };

    const handleVolumeInputChange = (value: string, key: string) => {
        setVolumeData({ ...VolumeData, [key]: value });
    };

    const handleUploadInputChange = (value: string, key: string) => {
        setVolumeUpload({ ...VolumeUpload, [key]: value });
    };

    const handleCreateCustomer = () => {
        if (VolumeData.customer.trim() === '' || VolumeData.date.trim() === '') {
            alert('Please fill in all required fields.');
            return;
        }
        console.log('Creating customer:', VolumeData);
        toggleVolumeModal(false);
        alert('Customer successfully registered!');
    };

    const options = ['Dangote Cement', 'BUA Cement', 'Fidelity Bank', 'Julius Berger', 'Nigerian Railway', 'Oando', 'Shell Nigeria', 'United Bank'];
    const options1 = ['Dangote Cement', 'BUA Cement', 'Fidelity Bank', 'Julius Berger', 'Nigerian Railway', 'Oando', 'Shell Nigeria', 'United Bank'];
    const options2 = ['Daily Data Sheet', 'Gas Certificate'];

    return (
        <div className="">
            <div className='mr-[25px]'>
                <div className='flex flex-col md:flex-row items-center justify-between'>
                    <Heading as="h4" size="h4" color='primaryColor' className="font-semibold text-gray-600">OPERATIONS</Heading>
                    <div className='flex gap-4 items-center'>
                        <div className="flex items-center border px-3 py-0.5 rounded-3xl hover:bg-gray-100" onClick={() => toggleVolumeModal(true)}>
                            <span className="text-sm md:text-base ml-2 text-[#49526A] cursor-pointer">Add New Volume</span>
                        </div>
                        <div className="flex items-center border px-3 py-0.5 rounded-3xl hover:bg-gray-100" onClick={() => toggleUploadModal(true)}>
                            <img src={images.upload} alt="Upload" className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-sm md:text-base ml-2 text-[#49526A] cursor-pointer">Upload Data Sheet</span>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isVolumeModalOpen}
                onClose={() => toggleVolumeModal(false)}
                size='medium'
                title='Daily Volume Entry Form'
                buttons={[
                    <div className='flex gap-2 mb-[-10px]'>
                        <div className='w-[120px]'>
                            <Button
                                type="outline"
                                label="Cancel"
                                action={() => toggleVolumeModal(false)}
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
                                label="Confirm"
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
                    type="select"
                    label='Customer'
                    value={VolumeData.customer}
                    handleChangeEvent={(value) => handleVolumeInputChange(value, 'customer')}
                    placeholder="Choose Customer"
                    options={options}
                />
                <CustomInput
                    required
                    type="date"
                    label='Date'
                    value={VolumeData.date}
                    handleChangeEvent={(value) => handleVolumeInputChange(value, 'date')}
                    placeholder="Choose date"
                />
                <CustomInput
                    required
                    type="text"
                    label='Volume(Scf)'
                    value={VolumeData.volume}
                    handleChangeEvent={(value) => handleVolumeInputChange(value, 'volume')}
                    placeholder="Input volume here"
                />
                <CustomInput
                    required
                    type="text"
                    label='Price Per Scf'
                    value={VolumeData.priceperscf}
                    handleChangeEvent={(value) => handleVolumeInputChange(value, 'priceperscf')}
                    placeholder="NGN 1,200"
                />
                <CustomInput
                    required
                    type="text"
                    label='Estimated Amount'
                    value={VolumeData.estimatedamount}
                    handleChangeEvent={(value) => handleVolumeInputChange(value, 'estimatedamount')}
                    placeholder="NGN 0.0"
                />
                <div className='text-sm text-[#808080] mb-2 italic'>This will be automatically generated</div>
            </Modal>
            <Modal
                isOpen={isUploadModalOpen}
                onClose={() => toggleUploadModal(false)}
                size='medium'
                title='Daily Volume Sheet Upload'
                buttons={[
                    <div className='flex gap-2 mb-[-10px]'>
                        <div className='w-[120px]'>
                            <Button
                                type="outline"
                                label="Cancel"
                                action={() => toggleUploadModal(false)}
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
                                label="Confirm"
                                action={() => alert('Upload confirmed!')}
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
                    type="select"
                    label='Customer'
                    value={VolumeUpload.customerUpload}
                    handleChangeEvent={(value) => handleUploadInputChange(value, 'customerUpload')}
                    placeholder="Choose Customer"
                    options={options1}
                />
                <CustomInput
                    required
                    type="select"
                    label='Date Type'
                    value={VolumeUpload.dataType}
                    handleChangeEvent={(value) => handleUploadInputChange(value, 'dataType')}
                    placeholder="Choose Date Type"
                    options={options2}
                />
                <CustomInput
                    required
                    type="date"
                    label='Year'
                    value={VolumeUpload.year}
                    handleChangeEvent={(value) => handleUploadInputChange(value, 'year')}
                    placeholder="Choose year"
                />
                <div className='mt-3'>
                    <FileUploadInput
                        title=''
                        maxSizeMB={25}
                        fileDescription="Only .xlsx file accepted"
                    />
                </div>
            </Modal>
            <div className='w-full mt-10'>
                <DailyFrequencyTable />
            </div>
        </div>
    );
};

export default OperationPage;