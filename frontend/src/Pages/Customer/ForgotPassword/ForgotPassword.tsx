import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AuthContainer,
  Button,
  ContentContainer,
  CustomInput,
} from '../../../Components/index';
import images from '../../../assets/index';
import '../../../index.css';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleChange = (value: string) => {
    setEmail(value);
    setEmailError('');
  };

  const validateForm = () => {
    let valid = true;
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
      valid = false;
    }
    return valid;
  };

  const handleForgotPassword = () => {
    if (validateForm()) {
      navigate(`/customer/reset-password?email=${encodeURIComponent(email)}`);
      toast.success('Reset link has been sent to your email.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col logingradient-bg w-[100%]">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center flex-1 p-10 mb-6">
        <div className="w-[100%]">
          <AuthContainer>
            <h1 className="text-[12px] md:text-[18px] font-semibold text-white">
              FORGOT PASSWORD
            </h1>
            <div className="w-[100%] mt-2 space-y-4">
              <div className="mx-auto space-y-4">
                <CustomInput
                  type="text"
                  value={email}
                  handleChangeEvent={handleChange}
                  placeholder="Enter your email here"
                  styleVariant="customStyle1"
                  icon={<img src={images.email} alt="email Icon" />}
                />
                {emailError && (
                  <p className="text-red-500 text-[14px]">
                    {emailError}
                  </p>
                )}
              </div>
              <div className='text-center italic text-white'>A login OTP will be sent to your email for verification</div>
              <div className="flex items-center justify-center mt-12">
                <Button
                  type="primary"
                  label="Submit"
                  action={handleForgotPassword}
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

export default ForgotPassword;