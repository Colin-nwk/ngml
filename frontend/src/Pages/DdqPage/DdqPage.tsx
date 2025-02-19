import FormInput from '@/Components/Custominput/FormInput';
import { FileType } from '@/Components/Fileuploadinput/FileTypes';
import { Button, Heading, Modal } from '@/Components/index';
import { useModalManagement } from '@/Hooks/useModalManagement';
import { FormField, useGetFormByNameQuery, useSubmitFormMutation } from '@/Redux/Features/FormBuilder/formBuilderService';
import { convertFileToBase64 } from '@/Utils/base64Converter';
import { areRequiredFieldsFilled } from '@/Utils/formValidation';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type CustomerData = Record<string, string | File | null>;

const DdqPage: React.FC = () => {
    const [customerForm, setCustomerForm] = useState<FormField[]>([]);
    const [customerData, setCustomerData] = useState<CustomerData>({});
    const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; url: string }>>([]);
    const [formError, setFormError] = useState<string>('');
    const [customerId, setCustomerId] = useState<number | null>(null);
    const [customerSiteId, setCustomerSiteId] = useState<number | null>(null);
    const { isModalOpen, toggleModal } = useModalManagement('uploadDdq');

    const location = useLocation();
    const navigate = useNavigate();

    const { data, isSuccess, isLoading } = useGetFormByNameQuery('DdqUpload/0/0');
    const [submitForm, { isLoading: submitLoading }] = useSubmitFormMutation();

    useEffect(() => {
        const customer = location.pathname.split('/');
        setCustomerId(Number(customer[4]));
        setCustomerSiteId(Number(customer[5]));
    }, [location]);

    useEffect(() => {
        if (isSuccess && data) {
            try {
                const parsedForm = JSON.parse(data.data.json_form);
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
    }, [data, isSuccess, submitForm, customerId, customerSiteId, navigate]);

    const handleInputChange = useCallback((field: string, value: string | File | null) => {
        setCustomerData(prev => ({ ...prev, [field]: value }));
    }, []);

    const uploadCustomerDdq = useCallback(async () => {
        if (!areRequiredFieldsFilled(customerForm, customerData)) {
            setFormError('Please fill all required fields.');
            return;
        }

        try {
            setFormError('');
            const fileField = customerForm.find(field => field.type === 'file');
            const file = fileField && customerData[fileField.name as keyof typeof customerData];

            if (file instanceof File) {
                const base64File = await convertFileToBase64(file);
                setUploadedFiles(prev => [...prev, { name: file.name, url: base64File }]);
                toast.success('File uploaded successfully');
                toggleModal(false);
            } else {
                throw new Error('No file uploaded');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setFormError('An error occurred while uploading the file. Please try again.');
        }
    }, [customerForm, customerData, toggleModal]);

    return (
        <>
            <div className="flex items-end justify-end gap-2 mb-3">
                <Button
                    type="primary"
                    label="UPLOAD DDQ"
                    radius="20px"
                    width="150px"
                    height="32px"
                    columnGap="5px"
                    action={() => toggleModal(true)}
                />
            </div>
            <div className="bg-[#FFFFFF] p-4 rounded-xl">
                <div className="rounded-xl border flex-col justify-start mt-2 items-start bg-[#FFFFFF]">
                    <div className="w-full h-[60px] px-3 py-2.5 bg-dark-50 border-b items-center flex">
                        {/* <div className="text text-xl font-bold font-['Mulish'] leading-tight">Due Diligence Questionnaire</div> */}
                        <Heading as="h4" size="h6" color="primaryColor" className="font-[2px] text-dark-100">
                            Due Diligence Questionaire
                        </Heading>
                    </div>
                    <div className="bg-dark-50 justify-between p-4">
                        {uploadedFiles.length > 0 ? (
                            uploadedFiles.map((file, index) => (
                                <div key={index} className="mb-2">
                                    <a
                                        href={URL.createObjectURL(
                                            new Blob([file.url], { type: 'application/pdf' })
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        {file.name}
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p>No files uploaded yet.</p>
                        )}
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => toggleModal(false)}
                        title="Upload DDQ"
                        buttons={[
                            <div key="buttons" className="flex gap-2 mb-[-10px]">
                                <div className="w-[120px]">
                                    <Button
                                        type="outline"
                                        label="Close"
                                        action={() => toggleModal(false)}
                                        color="#FFFFFF"
                                        fontStyle="italic"
                                        width="100%"
                                        height="40px"
                                        fontSize="16px"
                                        radius="20px"
                                    />
                                </div>
                                <div className="w-[260px]">
                                    <Button
                                        type="secondary"
                                        label="Save and Continue"
                                        action={uploadCustomerDdq}
                                        color="#FFFFFF"
                                        fontStyle="italic"
                                        width="100%"
                                        height="40px"
                                        fontSize="16px"
                                        radius="20px"
                                        disabled={submitLoading || !areRequiredFieldsFilled(customerForm, customerData)}
                                    />
                                </div>
                            </div>,
                        ]}
                    >
                        {formError && <p className="text-red-500 mb-4">{formError}</p>}
                        {isLoading ? (
                            <p>Loading form fields...</p>
                        ) : customerForm.length > 0 ? (
                            customerForm.map(form => (
                                <Fragment key={form.id}>
                                    <FormInput
                                        type={form?.type}
                                        label={form.label ?? form.name}
                                        value={(customerData[form.name as keyof typeof customerData] as string) || ''}
                                        required={form?.required}
                                        onChange={(value: string | File | null) =>
                                            handleInputChange(form?.name as string, value)
                                        }
                                        placeholder={form.placeholder}
                                        options={form.options?.map(opt =>
                                            typeof opt === 'string' ? { label: opt, value: opt } : opt
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
            </div>
        </>
    );
};

export default DdqPage;
