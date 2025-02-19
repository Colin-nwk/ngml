import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    AuthContainer,
    Button,
    ContentContainer,
    CustomInput,
} from '../../../Components/index';
import '../../../index.css';
import images from '../../../assets/index';

const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const email = queryParams.get('email');
        if (email) {
            setFormData(prevState => ({ ...prevState, email }));
        }
    }, [location.search]);

    const handleChange = (key: string) => (value: string) => {
        setFormData({ ...formData, [key]: value });
        setErrors({ ...errors, [`${key}Error`]: '' });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!formData.password) {
            newErrors.passwordError = 'Password is required';
            valid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPasswordError = 'Confirm password is required';
            valid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPasswordError = 'Passwords do not match';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleResetPassword = () => {
        if (validateForm()) {
            navigate('/login');  // Navigate to the login page
            toast.success('Password has been reset successfully.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col logingradient-bg w-[100%]">
            <ToastContainer />
            <div className="flex flex-col items-center justify-center flex-1 p-10 mb-6">
                <div className="w-[100%]">
                    <AuthContainer>
                        <h1 className="text-[12px] md:text-[18px] font-semibold text-white">
                            RESET PASSWORD
                        </h1>
                        <div className="w-[100%] mt-2 space-y-4">
                            <div className="mx-auto space-y-4">
                                <CustomInput
                                    type="text"
                                    value={formData.email}
                                    handleChangeEvent={handleChange('email')}
                                    placeholder="Enter email here"
                                    styleVariant="customStyle1"
                                    icon={<img src={images.email} alt="password Icon" />}
                                    // disabled
                                />
                                {errors.emailError && (
                                    <p className="text-red-500 text-[14px]">
                                        {errors.emailError}
                                    </p>
                                )}
                                <CustomInput
                                    type="password"
                                    value={formData.password}
                                    handleChangeEvent={handleChange('password')}
                                    placeholder="Enter password"
                                    styleVariant="customStyle1"
                                    icon={<img src={images.password} alt="password" />}
                                />
                                {errors.passwordError && (
                                    <p className="text-red-500 text-[14px]">
                                        {errors.passwordError}
                                    </p>
                                )}
                                <CustomInput
                                    type="password"
                                    value={formData.confirmPassword}
                                    handleChangeEvent={handleChange('confirmPassword')}
                                    placeholder="Re-enter password"
                                    styleVariant="customStyle1"
                                    icon={<img src={images.password} alt="password Icon" />}
                                />
                                {errors.confirmPasswordError && (
                                    <p className="text-red-500 text-[14px]">
                                        {errors.confirmPasswordError}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center justify-center mt-12">
                                <Button
                                    type="primary"
                                    label="Save Password"
                                    action={handleResetPassword}
                                    color="#FFFFFF"
                                    width="100%"
                                    height="48px"
                                    fontSize="16px"
                                    radius="32px"
                                />
                            </div>
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

export default ResetPassword;