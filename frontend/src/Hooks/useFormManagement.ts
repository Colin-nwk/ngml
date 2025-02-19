/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormField } from '@/Redux/Features/FormBuilder/formBuilderService';
import { areRequiredFieldsFilled } from '@/Utils/formValidation';
import { useEffect, useState } from 'react';

export type CustomerData = {
  [key: string]: string | File | null;
};

export const useFormManagement = (formData: any, isSuccess: boolean) => {
  const [customerForm, setCustomerForm] = useState<FormField[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData>({});
  const [formError, setFormError] = useState<string>('');

  useEffect(() => {
    if (isSuccess && formData) {
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
  }, [formData, isSuccess]);

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

  const resetForm = () => {
    const initialData = customerForm.reduce((acc: CustomerData, field: FormField) => {
      if (field.name) {
        acc[field.name] = field.type === 'file' ? null : '';
      }
      return acc;
    }, {});
    setCustomerData(initialData);
    setFormError('');
  };

  return {
    customerForm,
    customerData,
    formError,
    setFormError,
    handleChange,
    resetForm,
    isFormValid: () => areRequiredFieldsFilled(customerForm, customerData),
  };
};
