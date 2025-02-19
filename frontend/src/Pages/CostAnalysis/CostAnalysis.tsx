import { FormField, useGetFormByNameQuery, useSubmitFormMutation } from '@/Redux/Features/FormBuilder/formBuilderService';
import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Modal } from '../../Components/index';
// import images from '../../assets/index';
import FormInput from '@/Components/Custominput/FormInput';
import { FileType } from '@/Components/Fileuploadinput/FileTypes';
import { convertFileToBase64 } from '@/Utils/base64Converter';
import { areRequiredFieldsFilled } from '@/Utils/formValidation';
import { useModalManagement } from '@/Hooks/useModalManagement';


type CustomerData = {
    [key: string]: string | File | null;
};

const CostAnalysis: React.FC = () => {
    const { isModalOpen, toggleModal } = useModalManagement('uploadCapex');
    const [customerForm, setCustomerForm] = useState<FormField[]>([]);
    const [customerData, setCustomerData] = useState<CustomerData>({});
    const [formError, setFormError] = useState<string>('');

    const [customerId, setCustomerId] = useState<number | null>(null);
    const [customerSiteId, setCustomerSiteId] = useState<number | null>(null);
    const location = useLocation();

    const { data, isSuccess, isLoading } = useGetFormByNameQuery(`customeranalysisform/customer/${customerId}/${customerSiteId}`, {
        skip: !customerId
    });

    const [submitForm, { isSuccess: submitSuccess }] = useSubmitFormMutation();


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

    useEffect(() => {
        const customer = location.pathname.split('/');
        setCustomerId(Number(customer[4]));
        setCustomerSiteId(Number(customer[5]))
    }, [location]);

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

    const handleUploadCapex = async () => {
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

            console.log('Form Field Answers:', validFormFieldAnswers);

            const payload = {
                form_builder_id: data?.data?.id?.toString() || '',
                name: data?.data?.name || '',
                process_flow_id: data?.data?.process_flow_id?.toString() || '',
                process_flow_step_id: data?.data?.process_flow_step_id?.toString() || '',
                tag_id: data?.data?.tag_id || '',
                form_field_answers: JSON.stringify(validFormFieldAnswers),
            };

            console.log('Payload:', payload);

            await submitForm(payload).unwrap();

            if (submitSuccess) toggleModal(false);
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormError('An error occurred while submitting the form. Please try again.');
        }
    };
    return (
        <>
            <div className='flex items-end justify-end gap-2 mb-3'>
                <Button
                    type="primary"
                    label="UPLOAD DOCUMENT"
                    radius="20px"
                    width="185px"
                    height="32px"
                    columnGap="5px"
                    action={() => toggleModal(true)}
                />

            </div>
            <div className="w-full h-full p-4 bg-white rounded-xl flex flex-col gap-4 md:gap-6">
                <div className="w-full h-full bg-white rounded-xl border flex flex-col justify-start items-start gap-4">
                    <div className="w-full flex flex-col md:flex-row justify-between items-center p-4 bg-white border rounded-xl">
                        <div className="text-lg md:text-xl font-bold font-['Mulish']">
                            Documents
                        </div>
                        {/* <div className="flex items-center gap-2 md:gap-4">
                        <div className="flex items-center border px-3 py-2 rounded-3xl hover:bg-gray-100" onClick={() => toggleModal(true)}>
                            <img src={images.upload} alt="Upload" className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-sm md:text-base ml-2 cursor-pointer">Upload Document</span>
                        </div>
                    </div> */}
                    </div>
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => toggleModal(false)}
                    size='medium'
                    title='Upload Document'
                    subTitle=''
                    buttons={[
                        <div className='flex gap-2 mb-[-10px]'>
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
                                    label="Confirm"
                                    action={handleUploadCapex}
                                    color="#FFFFFF"
                                    fontStyle="italic"
                                    width="100%"
                                    height="40px"
                                    fontSize="16px"
                                    radius="20px"
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
                                    maxSizeMB={10}
                                    allowedFileTypes={[FileType.PDF]}
                                />
                            </Fragment>
                        ))
                    ) : (
                        <p>No form fields available.</p>
                    )}
                </Modal>
            </div>
        </>

    );
};

export default CostAnalysis;