import { Button, Heading, LocationCard, Modal } from '@/Components';
import FormInput from '@/Components/Custominput/FormInput';
import { FileType } from '@/Components/Fileuploadinput/FileTypes';
import { useModalManagement } from '@/Hooks/useModalManagement';
import { useGetCustomerByIdQuery } from '@/Redux/Features/Customer/customerService';
import { FormField, useGetFormByNameQuery, useSubmitFormMutation } from '@/Redux/Features/FormBuilder/formBuilderService';
import { convertFileToBase64 } from '@/Utils/base64Converter';
import { areRequiredFieldsFilled } from '@/Utils/formValidation';
import { ArrowBack } from '@mui/icons-material';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type CustomerData = {
  [key: string]: string | File | null;
};

const CustomerLocation: React.FC = () => {
  const { isModalOpen, toggleModal } = useModalManagement('createLocationCustomer');
  const { customerId } = useParams<{ customerId: string }>();
  const [customerForm, setCustomerForm] = useState<FormField[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData>({});
  const [formError, setFormError] = useState<string>('');


  const navigate = useNavigate();
  const location = useLocation();

  const { data: customerLocation, error, isLoading } = useGetCustomerByIdQuery(Number(customerId));
  const { data: formData, isSuccess: formSuccess, isLoading: formLoading } = useGetFormByNameQuery('CreateNewCustomerSite/0/0');
  const [submitForm, { isLoading: submitLoading }] = useSubmitFormMutation();

  const handleLocationClick = (locationId?: number) => {
    navigate(`/admin/records/customer/${customerId}/${locationId}/details`);
  };

  useEffect(() => {
    if (formSuccess && formData) {
      let parsedForm;
      try {
        parsedForm = JSON.parse(formData.data.json_form);
        setCustomerForm(parsedForm);

        const initialData = parsedForm.reduce((acc: CustomerData, field: FormField) => {
          if (field.name) {
            acc[field.name] = field.type === 'file' ? null : '';
          }
          return acc;
        }, {});

        setCustomerData(initialData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        setCustomerForm([]);
      }
    }
  }, [formData, formSuccess]);


  const handleChange = (field: string, value: string | File | null) => {
    if (value instanceof File) {
      setCustomerData(prev => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setCustomerData(prev => ({ ...prev, [field]: value || '' }));
    }
  };

  const handleCreateLocation = async () => {
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

      const validFormFieldAnswers = formFieldAnswers.filter(answer => answer !== null);
      const fieldsWithCustomerId = [...validFormFieldAnswers, { elementType: 'text', name: 'customer_id', key: 'customer_id', value: customerId?.toString() as string, id: customerId }];

      const payload = {
        form_builder_id: formData?.data?.id?.toString() || '',
        name: formData?.data?.name || '',
        process_flow_id: formData?.data?.process_flow_id?.toString() || '',
        process_flow_step_id: formData?.data?.process_flow_step_id?.toString() || '',
        tag_id: formData?.data?.tag_id || '',
        form_field_answers: JSON.stringify(fieldsWithCustomerId),
      };

      const result = await submitForm(payload).unwrap();

      if (result) {
        toast.success('Customer site created successfully');
        const initialData = customerForm.reduce((acc: CustomerData, field: FormField) => {
          if (field.name) {
            acc[field.name] = field.type === 'file' ? null : '';
          }
          return acc;
        }, {});

        setCustomerData(initialData);
        toggleModal(false);
        const searchParams = new URLSearchParams(location.search);
        searchParams.delete('createLocationCustomer');
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError('An error occurred while submitting the form. Please try again.');
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const createLocationCustomer = searchParams.get('createLocationCustomer');

    if (createLocationCustomer === 'true') {
      toggleModal(true);
    }
  }, [location.search]);

  if (isLoading || formLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading customer data.</div>;

  return (
    <div className='mt-6'>

      <div className='flex justify-between items-center'>
        <div className='flex gap-4'>
          <Link to={'/admin/records/customer'}>
            <div className='flex justify-center items-center border-2 h-[32px] w-[32px] rounded-[50%]'>
              <ArrowBack color="success" style={{ fontSize: 'medium' }} />
            </div>
          </Link>
          <Heading color='primaryColor' className="font-bold text-gray-600 text-[23px]">
            {customerLocation?.data?.company_name.toUpperCase()}
          </Heading>
        </div>

        <Button
          type="primary"
          label="Add New Location"
          action={() => toggleModal(true)}
          color="#FFFFFF"
          fontStyle="italic"
          width="200px"
          height="35px"
          fontSize="16px"
          radius="20px"
        />
      </div>
      <div className='h-fit w-[100%] rounded-[20px] px-6'>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {customerLocation?.data?.sites.map((site) => (
            <div
              key={site.id}
              onClick={() => handleLocationClick(site.id)}
              className="cursor-pointer hover:shadow-lg rounded-[20px] transition-shadow duration-600 ease-in-out"
            >
              <LocationCard
                label={site.site_name}
                value={site.site_address}
                primary={false}
              />
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          toggleModal(false);

        }}
        size='large'
        title='Add New Location Address'
        subTitle=''
        buttons={[
          <div className='flex gap-2 mb-[-10px]' key="modal-buttons">
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
                label={submitLoading ? 'Adding....' : 'Add Location'}
                action={handleCreateLocation}
                color="#FFFFFF"
                fontStyle="italic"
                width="100%"
                height="40px"
                fontSize="14px"
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
                onChange={(value) => handleChange(form?.name as string, value)}
                placeholder={form.placeholder}
                options={form.options?.map(opt =>
                  typeof opt === 'string'
                    ? { label: opt, value: opt }
                    : opt
                )}
                url={form?.url}
                maxSizeMB={10}
                allowedFileTypes={[FileType.PDF, FileType.JPEG]}
              />
            </Fragment>
          ))
        ) : (
          <p>No form fields available.</p>
        )}
      </Modal>
    </div>
  );
};

export default CustomerLocation;
