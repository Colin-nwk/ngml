import { AuthContainer, Button, ContentContainer, CustomInput } from '@/Components';
import { useGenerateTokenMutation } from '@/Redux/Features/Auth/authService';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import images from '../../assets/index';
import '../../index.css';

const GenerateToken: React.FC = () => {
  const [generateToken, { isLoading, data, isError, isSuccess }] =
    useGenerateTokenMutation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '' });
  const [errors, setErrors] = useState({ emailError: '' });

  useEffect(() => {
    if (isSuccess && data) {
      navigate('/generateToken/success');
      toast.success('Token generated successfully');
    }

    if (isError) {
      toast.error('Failed to generate token');
    }
  }, [isSuccess, isError, data, navigate]);

  const handleChange = (key: string) => (value: string) => {
    setFormData({ ...formData, [key]: value });
    setErrors({ ...errors, [`${key}Error`]: '' });
  };

  const validateForm = () => {
    let valid = true;
    if (!formData.email) {
      setErrors({ emailError: 'Email is required' });
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ emailError: 'Invalid email address' });
      valid = false;
    }
    return valid;
  };

  const handleGenerateToken = async () => {
    if (validateForm()) {
      try {
        await generateToken({ email: formData.email }).unwrap();
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
              Generate Token
            </h1>
            <div className="w-[100%] mt-2">
              <div className="mx-auto space-y-5">
                <CustomInput
                  type="text"
                  value={formData.email}
                  handleChangeEvent={handleChange('email')}
                  placeholder="Enter your email to receive token"
                  styleVariant="customStyle1"
                  icon={<img src={images.email} alt="Email Icon" />}
                />
                {errors.emailError && (
                  <p className="text-red-500 h-[1px] absolute top-[126px] text-[14px]">
                    {errors.emailError}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-center mt-4">
                <Button
                  type="primary"
                  label={isLoading ? 'Generating...' : 'Generate'}
                  action={handleGenerateToken}
                  color="#FFFFFF"
                  width="100%"
                  height="48px"
                  fontSize="16px"
                  radius="32px"
                  disabled={isLoading}
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

export default GenerateToken;
