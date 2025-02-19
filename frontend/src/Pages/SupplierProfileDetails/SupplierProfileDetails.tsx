import React, { useState } from 'react';
import { CustomInput, FileUploadInput } from '../../Components/index';
import colors from '@/Utils/colors';


type FormData = {
    supplierID: string;
    supplierName: string;
    supplierEmail: string;
    supplierPhoneNumber: string;
    agreementDate: string;
    agreementDuration: string;
    costPerScf: string;
    industrial: string;
    agreedVolumn: string;
    entryQuantity: string;
    exitQuantity: string;
};


const SupplierProfileDetails: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        supplierID: '',
        supplierName: '',
        supplierEmail: '',
        supplierPhoneNumber: '',
        agreementDate: '',
        agreementDuration: '',
        costPerScf: '',
        industrial: '',
        agreedVolumn: '',
        entryQuantity: '',
        exitQuantity: '',
    });


    const handleInputChange = (name: keyof FormData, value: unknown) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: String(value)  
        }));
    };
    


    const personalDetailsInputs = [
        { label: 'Supplier ID', name: 'supplierID', placeholder: 'GS/193/NGML' },
        { label: 'Company Registered Name', name: 'supplierName', placeholder: 'Falcons Corporation Ltd.' },
        { label: 'Company Email Address', name: 'supplierEmail', placeholder: 'sales@falconscorp.org' },
        { label: 'Company Phone Number', name: 'supplierPhoneNumber', placeholder: '090 0000 0001' },
    ];


    const agreementDetailsInputs = [
        { label: 'Date of agreement', name: 'agreementDate', placeholder: '22 NOV, 2021' },
        { label: 'Agreement Duration', name: 'agreementDuration', placeholder: '5 Years' },
        { label: 'Cost per Scf (NGN)', name: 'costPerScf', placeholder: '2,500.00' },
        { label: 'Agreed Volume (Scf)', name: 'agreedVolumn', placeholder: '5,000,000.00' },
        { label: 'Entry Quantity (Scf)', name: 'entryQuantity', placeholder: '5,000,000.00' },
        { label: 'Exit Quantity (Scf)', name: 'exitQuantity', placeholder: '4,500,000.00' },
    ];

    return (
        <div>
            <div className="p-[20px] rounded-[20px]" style={{ background: colors.dark[50] }}>
                <div className='border-2 border-nnpcdarkgreen-500 rounded-[20px] p-[20px] bg-dark-50'>
                    <div className='flex-col space-y-5'>
                        <h3 className='text-[#49526A] font-[700]'>PERSONAL DETAILS</h3>
                        {personalDetailsInputs.map((input, index) => (
                            <CustomInput
                                key={index}
                                type="text"
                                label={input.label}
                                value={formData[input.name as keyof FormData]}
                                handleChangeEvent={(value: string) => handleInputChange(input.name as keyof FormData, value)}
                                placeholder={input.placeholder}
                                styleVariant='customStyle5'
                            />
                        ))}
                    </div>
                </div>
                <div className="mt-[24px] rounded-[20px]" style={{ background: colors.dark[50] }}>
                    <div className='border-2 border-nnpcdarkgreen-500 rounded-[20px] p-[20px] bg-dark-50'>
                        <div className='flex-col space-y-5'>
                            <h3 className='text-[#49526A] font-[700]'>AGREEMENT DETAILS</h3>
                            {agreementDetailsInputs.map((input, index) => (
                                <CustomInput
                                    key={index}
                                    type="text"
                                    label={input.label}
                                    value={formData[input.name as keyof FormData]}
                                    handleChangeEvent={(value: string) => handleInputChange(input.name as keyof FormData, value)}
                                    placeholder={input.placeholder}
                                    styleVariant='customStyle5'
                                />
                            ))}

                        </div>
                    </div>
                </div>
                <div className="p-[20px] border-2 border-nnpcdarkgreen-500 mt-[24px] rounded-[20px]" style={{ background: colors.dark[50] }}>
                    <h3 className='text-[#49526A] font-[700]'>UPLOADS</h3>
                    <div className='mt-[20px]'>
                        <FileUploadInput
                            title='GSA Agreement'
                            fileDescription='Scan the copy of your original document (pdf,png,jpg)'
                            maxSizeMB={25}
                        />
                    </div>
                    <div className='mt-[30px]'>
                        <FileUploadInput
                            title='Entry and Exit agreement'
                            fileDescription='Scan the copy of your original document (pdf,png,jpg)'
                            maxSizeMB={25}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierProfileDetails;
