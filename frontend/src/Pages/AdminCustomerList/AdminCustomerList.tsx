// export default AdminCustomerList;
import images from '@/assets';
import FormInput from '@/Components/Custominput/FormInput';
import { FileType } from '@/Components/Fileuploadinput/FileTypes';
import { useGetCustomersQuery } from '@/Redux/Features/Customer/customerService';
import { FormField, useGetFormByNameQuery, useSubmitFormMutation } from '@/Redux/Features/FormBuilder/formBuilderService';
import { convertFileToBase64 } from '@/Utils/base64Converter';
import { areRequiredFieldsFilled } from '@/Utils/formValidation';
import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, CustomerListTable, Heading, Modal, StatisticRectangleCard } from '../../Components/index';
import { useModalManagement } from '@/Hooks/useModalManagement';

type CustomerData = {
    [key: string]: string | File | null;
};

const AdminCustomerList: React.FC = () => {
    const { isModalOpen, toggleModal } = useModalManagement('createCustomer');
    const [customerForm, setCustomerForm] = useState<FormField[]>([]);
    const [customerData, setCustomerData] = useState<CustomerData>({});
    const [formError, setFormError] = useState<string>('');

    const { data, isSuccess, isLoading } = useGetFormByNameQuery('CreateNewCustomer/0/0');
    const { data: customers } = useGetCustomersQuery();
    const [submitForm, { isLoading: submitLoading }] = useSubmitFormMutation();

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

    useEffect(() => {
        if (isModalOpen) {
            const allFilled = areRequiredFieldsFilled(customerForm, customerData);
            if (!allFilled) return;

        }
    }, [customerData, isModalOpen, customerForm]);


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

    const handleCreateCustomer = async () => {
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
                            console.log(`Attempting to convert file: ${field.name}`, value);
                            const base64File = await convertFileToBase64(value);
                            console.log(`Base64 for ${field.name} (first 100 chars):`, base64File.substring(0, 100));
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

            const payload = {
                form_builder_id: data?.data?.id?.toString() || '',
                name: data?.data?.name || '',
                process_flow_id: data?.data?.process_flow_id?.toString() || '',
                process_flow_step_id: data?.data?.process_flow_step_id?.toString() || '',
                tag_id: data?.data?.tag_id || '',
                form_field_answers: JSON.stringify(validFormFieldAnswers),
            };

            await submitForm(payload).unwrap();

            const result = await submitForm(payload).unwrap();

            if (result) {
                toast.success('Customer created successfully');
                const initialData = customerForm.reduce((acc: CustomerData, field: FormField) => {
                    if (field.name) {
                        acc[field.name] = field.type === 'file' ? null : '';
                    }
                    return acc;
                }, {});

                setCustomerData(initialData);
                toggleModal(false);
                const searchParams = new URLSearchParams(location.search);
                searchParams.delete('createCustomer');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormError('An error occurred while submitting the form. Please try again.');
        }
    };


    return (
        <div className="">
            <div className='mr-[25px]'>
                <div className='flex flex-col md:flex-row items-center justify-between'>
                    <Heading as="h4" size="h4" color='primaryColor' className="font-semibold text-gray-600">
                        CUSTOMERS
                    </Heading>
                    {isSuccess &&
                        <Button
                            type='outline'
                            label='Add Customer'
                            radius='20px'
                            width='150px'
                            height='30px'
                            action={() => toggleModal(true)}
                        />
                    }
                </div>

                <div className='flex flex-col md:flex-row items-center gap-4 mt-6'>
                    <StatisticRectangleCard
                        title='Total Customers'
                        icon={<img src={images.customers} alt="staff icon" />}
                        value={JSON.stringify(customers?.data.length) ?? ''}
                        valueColor='text-nnpcmediumgreen-700'
                        iconBgColor='rounded-[10px] bg-nnpcmediumgreen-500'
                    />
                    <StatisticRectangleCard
                        title='Active Customers'
                        icon={<img src={images.customers} alt="staff icon" />}
                        value={'0'}
                        valueColor='text-black'
                        iconBgColor='bg-nnpc-50 rounded-[10px]'
                    />
                    {/* <StatisticRectangleCard
                        title='Processing Customers'
                        icon={<img src={images.warning} alt="staff icon" />}
                        value={JSON.stringify(customers?.data.length) ?? ''}
                        valueColor='text-green-800'
                        backgroundColor='bg-nnpc-600'
                        iconBgColor='rounded-full bg-nnpc-700'
                    /> */}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => toggleModal(false)}
                size='medium'
                title='Create New Customer'
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
                                label={submitLoading ? 'Creating...' : 'Create customer'}
                                action={handleCreateCustomer}
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
                                onChange={(value) => handleChange(form?.name as string, value)}
                                placeholder={form.placeholder}
                                options={form.options?.map(opt =>
                                    typeof opt === 'string'
                                        ? { label: opt, value: opt }
                                        : opt
                                )}
                                url={form?.url}
                                maxSizeMB={10}
                                allowedFileTypes={[FileType.PDF]}
                            />
                        </Fragment>
                    ))
                ) : (
                    <p>No form fields available.</p>
                )}
            </Modal>
            <div className='w-full mt-10'>
                <CustomerListTable />
            </div>
        </div>
    );
};

export default AdminCustomerList;

