import { AuthContainer, Button, ContentContainer } from '@/Components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuccessToken = () => {
  // const [formData, setFormData] = useState({
  //   token: '',
  // });

  // const [errors, setErrors] = useState({
  //   tokenError: '',
  // });

  // const handleChange = (key: string) => (value: string) => {
  //   setFormData({ ...formData, [key]: value });
  //   setErrors({ ...errors, [`${key}Error`]: '' });
  // };

  // const validateForm = () => {
  //   let valid = true;
  //   const newErrors = { ...errors };

  //   if (!formData.token) {
  //     newErrors.tokenError = 'Token is required';
  //     valid = false;
  //   }

  //   setErrors(newErrors);
  //   return valid;
  // };

  // const handleTokenSubmission = async () => {
  //   if (validateForm()) {
  //     try {
  //       toast.success('Token submitted successfully!');
  //     } catch (err) {
  //       toast.error('Error submitting token');
  //     }
  //   }
  // };

  return (
    <div className="min-h-screen flex flex-col logingradient-bg w-[100%]">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center flex-1 p-10 mb-6">
        <div className="w-[100%]">
          <AuthContainer>
            <h1 className="text-[12px] md:text-[18px] font-semibold text-white">
              Enter Token
            </h1>
            <div className="w-[100%] mt-2">
              <div className="mx-auto space-y-5">
                {/* <CustomInput
                  type="text"
                  value={formData.token}
                  handleChangeEvent={handleChange('token')}
                  placeholder="Enter the token you received"
                  styleVariant="customStyle1"
                  icon={<img src={images.email} alt="Token Icon" />}
                /> */}
                {/* {errors.tokenError && (
                  <p className="text-red-500 h-[1px] absolute top-[126px] text-[14px]">
                    {errors.tokenError}
                  </p>
                )} */}
              </div>
              <div className="flex items-center justify-center mt-4">
                <Button
                  type="primary"
                  label="Submit"
                  action={() => { console.log('success') }}
                  color="#FFFFFF"
                  width="100%"
                  height="48px"
                  fontSize="16px"
                  radius="32px"
                  disabled={false}
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

export default SuccessToken;
