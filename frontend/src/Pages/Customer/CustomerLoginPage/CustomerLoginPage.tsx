
'use client'

import images from '@/assets';
import { AuthContainer, Button, ContentContainer, CustomInput } from '@/Components';
import { useLoginMutation } from '@/Redux/Features/Auth/authService';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../index.css';


const CustomerLoginPage: React.FC = () => {
    const [login, { isLoading, data, isSuccess }] = useLoginMutation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        scope: 'customer',
    });

    const [errors, setErrors] = useState({
        emailError: '',
    });

    useEffect(() => {
        if (isSuccess && data) {
            navigate('/optPage');
            toast.success('OTP Sent');
        }
    }, [isSuccess, data, navigate]);

    const handleChange = (key: string) => (value: string) => {
        setFormData({ ...formData, [key]: value });
        setErrors({ ...errors, [`${key}Error`]: '' });
    };

    const validateForm = (): boolean => {
        let valid = true;
        const newErrors = { ...errors };

        if (!formData.email) {
            newErrors.emailError = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.emailError = 'Invalid email address';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSendOtp = async () => {
        if (validateForm()) {
            try {
                await login(formData).unwrap();
            } catch (err) {
                console.log(err)
            }
        }
    };


    return (
        <div className="min-h-screen flex flex-col logingradient-bg w-[100%]">
            <ToastContainer />
            <div className="flex flex-col items-center justify-center flex-1 p-10 mb-6">
                <div className="w-[100%]">
                    <AuthContainer>
                        <h1 className="text-[12px] md:text-[18px] font-semibold text-white">
                            BUSINESS LOGIN
                        </h1>
                        <div className="w-[100%] mt-2">
                            <div className="mx-auto space-y-4">
                                <CustomInput
                                    type="text"
                                    value={formData.email}
                                    handleChangeEvent={handleChange('email')}
                                    placeholder="Enter your email"
                                    styleVariant="customStyle1"
                                    icon={<img src={images.email} alt="Email Icon" />}
                                />
                                {errors.emailError && (
                                    <p className="text-red-500 text-sm">{errors.emailError}</p>
                                )}
                                <p className="text-[#E3EADA] text-center italic text-sm">An OTP will be sent to this email for verification</p>
                            </div>
                            <Link to='/customer'>
                                <div className="flex items-center justify-center mt-24">
                                    <Button
                                        type="newest"
                                        label={isLoading ? 'Sending OTP...' : 'Proceed'}
                                        action={handleSendOtp}
                                        width="100%"
                                        height="48px"
                                        fontSize="16px"
                                        radius="32px"
                                        disabled={isLoading}
                                    />
                                </div>
                            </Link>
                        </div>
                    </AuthContainer>
                </div>

            </div>
            <div className="mb-6 ml-6 mr-6">
                <ContentContainer
                    type="translucent"
                    width="100%"
                    height="30px"
                    borderRadius={32}
                >
                    <div className="flex items-center justify-center w-full h-full">
                        <p className="text-center text-[8px] md:text-[10px] text-[#E3EADA]">
                            This Portal is a Property of NNPC Gas Marketing Limited
                        </p>
                    </div>
                </ContentContainer>
            </div>
        </div>
    );
};

export default CustomerLoginPage;


