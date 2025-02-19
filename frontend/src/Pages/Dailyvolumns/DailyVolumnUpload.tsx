/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { CustomInput, FileUploadInput } from '../../Components/index';

interface DailyVolumnUploadProps {
    DailyVolumnUploadData: any;
    setDailyVolumnUploadData: React.Dispatch<React.SetStateAction<any>>;
}

const DailyVolumnUpload: React.FC<DailyVolumnUploadProps> = ({ DailyVolumnUploadData, setDailyVolumnUploadData }) => {

    const handleInputChange = (value: string, key: string) => {
        console.log(value)
        setDailyVolumnUploadData({ ...DailyVolumnUploadData, [key]: value });
    };

    const yearOptions = ['2023', '2024', '2025', '2026'];
    const datatype = ['Daily Volume Data Sheet', 'Gas Certificate']

    const displayContent = () => {
        if (DailyVolumnUploadData.datatype === 'Daily Volume Data Sheet') {
            return <p className='text-[12px]'>Selected Daily Volume Data Sheet. Please upload the corresponding file.</p>;
        } else if (DailyVolumnUploadData.datatype === 'Gas Certificate') {
            return <p className='text-[12px]'>Selected Gas Certificate. Please upload the certificate file.</p>;
        } else {
            return <p>Please select a data type.</p>;
        }
    };



    return (

        <div className='p-4 rounded-[10px] space-y-4'>
            <CustomInput
                required
                type="select"
                label='Data Type'
                value={DailyVolumnUploadData.datatype}
                handleChangeEvent={(value) => handleInputChange(value, 'datatype')}
                placeholder="Choose Data type"
                options={datatype}
            />
            <CustomInput
                required
                type="select"
                label='Year'
                value={DailyVolumnUploadData.year}
                handleChangeEvent={(value) => handleInputChange(value, 'year')}
                placeholder="Choose Year"
                options={yearOptions}
            />
            <div className='mt-[30px]'>
                <FileUploadInput
                    fileDescription='Only .xlxs file accepted'
                    maxSizeMB={25}
                />
            </div>
            {displayContent()}
        </div>

    );
};

export default DailyVolumnUpload;