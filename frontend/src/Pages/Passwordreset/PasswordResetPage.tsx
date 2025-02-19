import React, { useState } from 'react';
import images from '../../assets/index';
import { AuthContainer, Button, ContentContainer, CustomInput } from '../../Components/index';

const PasswordResetPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
        commonError: '',
    });

    const handleChange = (key: string) => (value: string) => {
        console.log(value)
        setFormData({ ...formData, [key]: value });
        setErrors({ ...errors, [`${key}Error`]: '' });
    };

    const handleResetPassword = () => {
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

        // Password validation
        if (!formData.password) {
            newErrors.passwordError = 'Password is required';
            valid = false;
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPasswordError = 'Confirm password is required';
            valid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPasswordError = 'Passwords do not match';
            valid = false;
        }

        if (valid) {
            // Call your password reset API or logic here
            console.log('Resetting password...');
            setFormData({ email: '', password: '', confirmPassword: '' });
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-nnpc-700">
            <div className="flex-1 flex items-center justify-center">
                <AuthContainer>
                    <h1 className='text-[25px] text-white font-semibold'>Set New Password</h1>
                    <div className='w-[100%] md:w-[350px] mx-auto space-y-4'>
                        <CustomInput
                            type="text"
                            value={formData.email}
                            handleChangeEvent={handleChange('email')}
                            placeholder="Enter your email"
                            styleVariant='customStyle1'
                            icon={<img src={images.email} alt='Email Icon' />}
                            error={errors.emailError}
                        />
                        <CustomInput
                            type="password"
                            value={formData.password}
                            handleChangeEvent={handleChange('password')}
                            placeholder="Enter a password"
                            styleVariant='customStyle1'
                            icon={<img src={images.password} alt='Password Icon' />}
                            error={errors.passwordError}
                        />
                        <CustomInput
                            type="password"
                            value={formData.confirmPassword}
                            handleChangeEvent={handleChange('confirmPassword')}
                            placeholder="Re-Enter the password"
                            styleVariant='customStyle1'
                            icon={<img src={images.password} alt='Password Icon' />}
                            error={errors.confirmPasswordError}
                        />
                        {errors.commonError && <p className="text-red-500">{errors.commonError}</p>}
                    </div>
                    <div className='mt-3 w-[98%] flex items-center justify-center'>
                        <Button
                            type="primary"
                            label="Save Password"
                            action={handleResetPassword}
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
                        <p className='text-center text-white text-[10px] md:text-sm'>This Portal is a Property of NNPC Gas Marketing Limited</p>
                    </div>
                </ContentContainer>
            </div>
        </div>
    );
};

export default PasswordResetPage;