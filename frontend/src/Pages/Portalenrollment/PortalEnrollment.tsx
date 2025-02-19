import React, { useState } from 'react';

import images from '../../assets/index';
import { AuthContainer, Button, ContentContainer, CustomInput } from '../../Components/index';

const PortalEnrollment: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
    });
    const [errors, setErrors] = useState({
        emailError: '',
    });

    const handleChange = (key: string) => (value: string) => {
        setFormData({ ...formData, [key]: value });
        setErrors({ ...errors, [`${key}Error`]: '' });
    };

    const handleSubmit = () => {
        let valid = true;
        const newErrors = { ...errors };

        // Email validation
        if (!formData.email) {
            newErrors.emailError = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.emailError = 'Invalid email address';
            valid = false;
        }

        if (valid) {
            console.log('Submitting Staff ID....');
            setFormData({ email: '' });
        } else {
            setErrors(newErrors);
        }
    };

    const handleCancellation = () => {
        // Add cancellation logic here
        console.log('Cancellation action triggered');
        // Reset form data and clear errors
        setFormData({ email: '' });
        setErrors({ emailError: '' });
    };

    return (
        <div className="h-screen flex flex-col bg-nnpc-700 relative">
            <div className="absolute top-20 right-20">
                <Button
                    icon={<img src={images.cancelicon} alt="cancel icon" />}
                    type="icon"
                    action={handleCancellation}
                    iconColor="#E2E4EB"
                    radius="100%"
                    width="40px"
                    height="40px"
                />
            </div>
            <div className="flex-1 flex items-center justify-center">
                <AuthContainer>
                    <h1 className='text-[20px] font-semibold text-white'>PORTAL ENROLLMENT</h1>
                    <div className='w-[100%] md:w-[350px] mx-auto space-y-4'>
                        <CustomInput
                            type="text"
                            value={formData.email}
                            handleChangeEvent={handleChange('email')}
                            placeholder="Enter your Staff ID"
                            styleVariant='customStyle1'
                            icon={<img src={images.profile} alt='Profile Icon' />}
                        />
                        {errors.emailError && <p className="text-red-500 h-[1px] absolute top-[106px] text-[14px]">{errors.emailError}</p>}
                    </div>
                    <div className='mt-10 w-[98%] flex items-center justify-center'>
                        <Button
                            type="primary"
                            label="Login"
                            action={handleSubmit}
                            color="#FFFFFF"
                            fontStyle="italic"
                            width="100%"
                            height="40px"
                            fontSize="16px"
                            radius="20px"
                        />
                    </div>
                </AuthContainer>
            </div>
            <div className='mb-10 mr-6 ml-6'>
                <ContentContainer type="translucent" width="100%" height="30px" borderRadius={20}>
                    <div className="w-full h-full flex justify-center items-center">
                        <p className='text-center text-[10px] md:text-sm text-white'>This Portal is a Property of NNPC Gas Marketing Limited</p>
                    </div>
                </ContentContainer>
            </div>
        </div>
    );
};

export default PortalEnrollment;