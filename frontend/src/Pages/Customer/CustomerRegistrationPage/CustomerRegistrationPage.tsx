import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AuthContainer,
  Button,
  ContentContainer,
  CustomInput,
} from '../../../Components/index';
import { useRegisterMutation } from '../../../Redux/Features/Auth/authService';
import images from '../../../assets/index';
import '../../../index.css';

const CustomerRegistrationPage: React.FC = () => {
  const [register, { isLoading, error, data, isError, isSuccess }] = useRegisterMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    nameError: '',
    emailError: '',
  });

  useEffect(() => {
    if (isSuccess && data) {
      navigate('/otp-verification');  
      toast.success('Registration successful. OTP has been sent to your email.');
      console.log('Registration successful. OTP sent.');
    }
  }, [isSuccess, isError, data, error, navigate]);

  const handleChange = (key: string) => (value: string) => {
    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [`${key}Error`]: '' });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.name) {
      newErrors.nameError = 'Business name is required';
      valid = false;
    }

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

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        await register(formData).unwrap();
      } catch (err) {
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
              NGML CUSTOMER REGISTRATION
            </h1>
            <div className="w-[100%] mt-2 space-y-4">
              <div className="mx-auto space-y-4">
                <CustomInput
                  type="text"
                  value={formData.name}
                  handleChangeEvent={handleChange('businessName')}
                  placeholder="Enter the business name here"
                  styleVariant="customStyle1"
                  icon={<img src={images.Businessicon} alt="business Icon" />}
                />
                {errors.nameError && (
                  <p className="text-red-500 text-[14px]">
                    {errors.nameError}
                  </p>
                )}
                <CustomInput
                  type="text"
                  value={formData.email}
                  handleChangeEvent={handleChange('email')}
                  placeholder="Enter the business email here"
                  styleVariant="customStyle1"
                  icon={<img src={images.email} alt="email Icon" />}
                />
                {errors.emailError && (
                  <p className="text-red-500 text-[14px]">
                    {errors.emailError}
                  </p>
                )}
              </div>
              <div className='text-center italic'>A login OTP will be sent to your email for verification</div>

              <Link to='/customer/otp'>
                <div className="flex items-center justify-center mt-12">
                  <Button
                    type="primary"
                    label={isLoading ? 'Registering...' : 'Register'}
                    action={handleRegister}
                    color="#FFFFFF"
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

export default CustomerRegistrationPage;