/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { CustomInput } from '../../Components/index';

interface AddNewInvoiceProps {
    newInvoiceData: any;
    setNewInvoiceData: React.Dispatch<React.SetStateAction<any>>;
}

const AddNewInvoice: React.FC<AddNewInvoiceProps> = ({ newInvoiceData, setNewInvoiceData }) => {

    const handleInputChange = (value: string, key: string) => {
        console.log(value)
        setNewInvoiceData({ ...newInvoiceData, [key]: value });
    };

    const yearOptions = ['2023', '2024', '2025', '2026'];
    const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August']

    return (

            <div className='p-4 rounded-[10px] mt-2 space-y-4'>
                <CustomInput
                    required
                    type="select"
                    label='Year'
                    value={newInvoiceData.year}
                    handleChangeEvent={(value) => handleInputChange(value, 'year')}
                    placeholder="Choose Year"
                    options={yearOptions}
                />
                <CustomInput
                    required
                    type="select"
                    label='Month'
                    value={newInvoiceData.month}
                    handleChangeEvent={(value) => handleInputChange(value, 'month')}
                    placeholder="Choose Month"
                    options={monthOptions}
                />
                <CustomInput
                    required
                    type="text"
                    label='Rate/Scf(NGN)'
                    value={newInvoiceData.rate}
                    handleChangeEvent={(value) => handleInputChange(value, 'rate')}
                    placeholder="Input rate"
                />

                <div className='italic text-xs font-[Mulish] text-[#808080]'>This will be automatically generated based on Daily volume data</div>
                
        </div>
    );
};

export default AddNewInvoice;