import FormInput from '@/Components/Custominput/FormInput';
import { FormField, useGetFormByNameQuery } from '@/Redux/Features/FormBuilder/formBuilderService';
import React, { Fragment, useEffect, useState } from 'react';
import { areRequiredFieldsFilled } from '@/Utils/formValidation';
import { FileType } from '@/Components/Fileuploadinput/FileTypes';
import { useLocation } from 'react-router-dom';



type CustomerData = {
    [key: string]: string | File | null;
};


const EditDdqPage: React.FC = () => {
    const [customerForm, setCustomerForm] = useState<FormField[]>([]);
    const [customerData, setCustomerData] = useState<CustomerData>({});
    const [formError,] = useState<string>('');
    const [customerId, setSetCustomerId] = useState<number | null>(null)


    const location = useLocation()
    const { data, isSuccess, isLoading } = useGetFormByNameQuery(`Edditddqupload/customer/${customerId}`, {
        skip: !customerId
    });

    useEffect(() => {
        const customer = location.pathname.split('/')
        setSetCustomerId(Number(customer[4]))
    }, [location])


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
                            acc[`${field.name}`] = null;
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
    }, [data, isSuccess]);



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



    const checkRequiredFields = (customerForm: FormField[], customerData: CustomerData) => {
        const allFilled = areRequiredFieldsFilled(customerForm, customerData);
        if (!allFilled) {
            return false;
        }
        return true;
    };

    useEffect(() => {
        checkRequiredFields(customerForm, customerData);
    }, [customerData, customerForm]);



    return (
        <div>
            <div className='border-2 p-4 border-dashed border-dark-200 rounded-[10px] mt-2 space-y-4'>
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
                                allowedFileTypes={[FileType.PDF]}

                            />
                        </Fragment>
                    ))
                ) : (
                    <p>No form fields available.</p>
                )}
            </div>
        </div>
    );
};

export default EditDdqPage;