import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AuthContainer,
  Button,
  ContentContainer,
  CustomInput,
} from '../../Components/index';
import { useLoginMutation } from '../../Redux/Features/Auth/authService';
import images from '../../assets/index';
import '../../index.css';

const StaffLoginPage: React.FC = () => {
  const [login, { isLoading, error, data, isError, isSuccess }] =
    useLoginMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    scope: 'user'
  });

  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
  });

  useEffect(() => {
    if (isSuccess && data) {
      navigate('/admin');
      toast.success('Login successful');

    }
  }, [isSuccess, isError, data, error, navigate]);

  const handleChange = (key: string) => (value: string) => {
    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [`${key}Error`]: '' });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.email) {
      newErrors.emailError = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.emailError = 'Invalid email address';
      valid = false;
    }

    if (!formData.password) {
      newErrors.passwordError = 'Password is required';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        await login(formData).unwrap();
      } catch (err) {
      }
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password clicked');
  };

  const handleNewSignIn = () => {
    console.log('New Sign In clicked');
    setFormData({ email: '', password: '', scope: 'user' });
  };

  return (
    <div className="min-h-screen flex flex-col logingradient-bg w-[100%]">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center flex-1 p-10 mb-6">
        <div className="w-[100%]">
          <AuthContainer>
            <h1 className="text-[12px] md:text-[18px] font-semibold text-white">
              NGML STAFF LOGIN
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
                  <p className="text-red-500 h-[1px] absolute top-[126px] text-[14px]">
                    {errors.emailError}
                  </p>
                )}
                <CustomInput
                  type="password"
                  value={formData.password}
                  handleChangeEvent={handleChange('password')}
                  placeholder="Enter your password"
                  styleVariant="customStyle1"
                  icon={<img src={images.password} alt="Password Icon" />}
                />
                {errors.passwordError && (
                  <p className="text-red-500 h-[1px] absolute top-[198px] text-[14px]">
                    {errors.passwordError}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-center mt-4">
                <Button
                  type="primary"
                  label={isLoading ? 'Logging in...' : 'Login'}
                  action={handleLogin}
                  color="#FFFFFF"
                  width="100%"
                  height="48px"
                  fontSize="16px"
                  radius="32px"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="mt-6">
              <Button
                type="transparent"
                label="Forgot Password?"
                fontWeight="400"
                color="#E3EADA"
                fontStyle="italic"
                textDecoration="underline"
                action={handleForgotPassword}
              />
            </div>
          </AuthContainer>
        </div>
        <div className="flex justify-center w-[100%]">
          <ContentContainer type="translucent" borderRadius={32}>
            <div className="flex items-center justify-between h-full ml-2 mr-2">
              <p className="text-center text-[8px] md:text-[12px] text-[rgba(5, 5, 5, 1)]">
                New to the Portal, Sign in Here
              </p>
              <Button
                className="text-[8px] md:text-[12px]"
                type="outline"
                label="New Sign In"
                width="120px"
                height="30px"
                radius="32px"
                color="#E3EADA"
                fontWeight="300"
                lineHeight="24px"
                action={handleNewSignIn}
              />
            </div>
          </ContentContainer>
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

export default StaffLoginPage;
