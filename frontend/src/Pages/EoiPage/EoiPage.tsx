import { Button, EoiRequestTemplate, Modal } from '@/Components';
import FormInput from '@/Components/Custominput/FormInput';
import { useModalManagement } from '@/Hooks/useModalManagement';
import { useGetCustomerByIdQuery } from '@/Redux/Features/Customer/customerService';
import { FormField, useGetFormByNameQuery, useSubmitFormMutation } from '@/Redux/Features/FormBuilder/formBuilderService';
import { convertFileToBase64 } from '@/Utils/base64Converter';
import { areRequiredFieldsFilled } from '@/Utils/formValidation';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


type CustomerData = {
  [key: string]: string | File | null;
};

const EoiPage = () => {
  const { isModalOpen, toggleModal } = useModalManagement('Eoirquest');
  const [customerForm, setCustomerForm] = useState<FormField[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData>({});
  const [formError, setFormError] = useState<string>('');
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [customerSiteId, setCustomerSiteId] = useState<number | null>(null);
  const location = useLocation();


  const { data, isSuccess, isLoading } = useGetFormByNameQuery(
  //   `EOIform/customer/${customerId}/${customerSiteId}`, {
  //   skip: !customerId
  // }
  'EoiUpload/0/0'
);
  const [submitForm, { isLoading: submitLoading }] = useSubmitFormMutation();

  const navigate = useNavigate();


  const { data: customerDetails } = useGetCustomerByIdQuery(Number(customerId));


  useEffect(() => {
    const customer = location.pathname.split('/');
    setCustomerId(Number(customer[4]));
    setCustomerSiteId(Number(customer[5]))
  }, [location]);


  useEffect(() => {
    if (isSuccess && data) {
      let parsedForm;
      try {
        parsedForm = JSON.parse(data.data.json_form);
        setCustomerForm(parsedForm);

        const initialData = parsedForm.reduce((acc: CustomerData, field: FormField) => {
          if (field.name) {
            acc[field.name] = '';
            if (field.type === 'file') {
              acc[field.name] = null;
            }
          }
          return acc;
        }, {});

        setCustomerData(initialData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        setCustomerForm([]);
      }
    }
  }, [data, isSuccess, customerSiteId]);

  useEffect(() => {
    if (isModalOpen) {
      const allFilled = areRequiredFieldsFilled(customerForm, customerData);
      if (!allFilled) return;

    }
  }, [customerData, isModalOpen, customerForm]);

  const handleInputChange = (field: string, value: string | File | null) => {
    if (value instanceof File) {
      setCustomerData(prev => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setCustomerData(prev => ({ ...prev, [field]: value || '' }));
    }
  };

  const uploadEoiRequest = useCallback(async () => {
    if (!areRequiredFieldsFilled(customerForm, customerData)) {
      setFormError('Please fill all required fields.');
      return;
    }

    try {
      setFormError('');
      const formFieldAnswers = await Promise.all(
        customerForm.map(async (field) => {
          const value = customerData[field.name as keyof typeof customerData];

          if (field.type === 'file' && value instanceof File) {
            try {
              const base64File = await convertFileToBase64(value);
              return {
                id: field.id,
                elementType: field.type,
                name: field.name || field.id.toString(),
                placeholder: field.placeholder || '',
                key: field.name || '',
                value: base64File
              };
            } catch (error) {
              console.error(`Error converting ${field.name} to Base64:`, error);
              return null;
            }
          } else {
            return {
              id: field.id,
              elementType: field.type,
              name: field.name || field.id.toString(),
              placeholder: field.placeholder || '',
              key: field.name || '',
              value: value || ''
            };
          }
        })
      );

      const validFormFieldAnswers = formFieldAnswers.filter(Boolean);

      const payload = {
        form_builder_id: data?.data?.id?.toString() || '',
        name: data?.data?.name || '',
        process_flow_id: data?.data?.process_flow_id?.toString() || '',
        process_flow_step_id: data?.data?.process_flow_step_id?.toString() || '',
        tag_id: data?.data?.tag_id || '',
        form_field_answers: JSON.stringify(validFormFieldAnswers),
      };

      const result = await submitForm(payload).unwrap();

      if (result) {
        toast.success('EOI created successfully');
        setCustomerData({});
        toggleModal(false);
        const searchParams = new URLSearchParams(location.search);
        searchParams.delete('createCustomer');
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError('An error occurred while submitting the form. Please try again.');
    }
  }, [customerForm, customerData, data, submitForm, toggleModal, location, navigate]);

  return (
    <div>
      <div className='flex items-end justify-end gap-2 mb-3'>
        <Button
          type="primary"
          label="EOI UPLOAD"
          radius="20px"
          width="150px"
          height="32px"
          columnGap="5px"
          action={() => toggleModal(true)}
        />

      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => toggleModal(false)}
        size='medium'
        title='Reason For Request'
        subTitle='Only Use this Method if the Customer is an already Existing Customer of the NGML'
        buttons={[
          <div key="modal-buttons" className='flex gap-2 mb-[-10px]'>
            <div className='w-[120px]'>
              <Button
                type="outline"
                label="Cancel"
                action={() => toggleModal(false)}
                color="#FFFFFF"
                fontStyle="italic"
                width="100%"
                height="40px"
                fontSize="16px"
                radius="20px"
              />
            </div>
            <div className='w-[260px]'>
              <Button
                type="secondary"
                label={submitLoading ? 'Submitting...' : 'Submit EOI Request'}
                action={uploadEoiRequest}
                color="#FFFFFF"
                fontStyle="italic"
                width="100%"
                height="40px"
                fontSize="16px"
                radius="20px"
                disabled={submitLoading || !areRequiredFieldsFilled(customerForm, customerData)}
              />
            </div>
          </div>
        ]}


      >
        {formError && <p className="text-red-500 mb-4">{formError}</p>}
        {isLoading ? (
          <p>Loading form fields...</p>
        ) : customerForm.length > 0 ? (
          customerForm.map((form) => (
            <Fragment key={form.id}>
              <FormInput
                type={form?.type}
                label={form.label ?? form.name}
                value={
                  form.type === 'file'
                    ? (customerData[form.name as keyof typeof customerData] as string || '')
                    : (customerData[form.name as keyof typeof customerData] as string || '')
                }
                required={form?.required}
                onChange={(value: string | File | null) => handleInputChange(form?.name as string, value)}
                placeholder={form.placeholder}
                options={form.options?.map(opt =>
                  typeof opt === 'string'
                    ? { label: opt, value: opt }
                    : opt
                )}
                maxSizeMB={10}
              />
            </Fragment>
          ))
        ) : (
          <p>No form fields available.</p>
        )}
      </Modal>
      <EoiRequestTemplate
        handleClose={() => { }}
        status={customerDetails?.data?.status ? 'Approved' : 'Pending'}
        companyName={customerDetails?.data?.company_name || 'N/A'}
        companyEmail={customerDetails?.data?.email || 'N/A'}
        companyNumber={customerDetails?.data?.phone_number || 'N/A'}
        approverName={'Okoro Florish'}
      />
    </div>
  );
};

export default EoiPage;
