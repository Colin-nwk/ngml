/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import images from '../../assets/index';
import '../../index.css';
import { AuthContainer, Button, ContentContainer, CustomInput } from '../../Components/index';

const ForgotPassword: React.FC = () => {
    const [formData, setFormData] = useState({ email: '' });
    const [errors, setErrors] = useState({
        emailError: '',
    });
    const [submitted, setSubmitted] = useState(false);

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
            setSubmitted(true);
            setFormData({ email: '' });
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="h-screen flex flex-col logingradient-bg relative">
            <div className="flex-1 flex items-center justify-center">
                <AuthContainer>
                    <h1 className='text-[20px]  font-semibold text-white'>FORGOT PASSWORD</h1>
                    <div className='w-[100%] md:w-[350px] mx-auto space-y-4'>
                        <CustomInput
                            type="text"
                            value={formData.email}
                            handleChangeEvent={handleChange('email')}
                            placeholder="Enter email here"
                            styleVariant='customStyle1'
                            icon={<img src={images.emailicons} alt='Email' />}
                        />
                        {errors.emailError && <p className="text-red-500 h-[1px] absolute top-[106px] text-[14px]">{errors.emailError}</p>}
                    </div>
                    {/* Conditional rendering of the message */}
                    {submitted && (
                        <p className="text-white mt-6 text-[12px]">We will send you an email to enable you to create a new password.</p>
                    )}
                    <div className='mt-10 w-[98%] flex items-center justify-center'>
                        <Button
                            type="primary"
                            label="Submit"
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
                        <p className='text-center text-[10px] md:text-[12px] text-white'>This Portal is a Property of NNPC Gas Marketing Limited</p>
                    </div>
                </ContentContainer>
            </div>
        </div>
    );
};

export default ForgotPassword;