/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Heading, Modal } from '@/Components';
import FormInput from '@/Components/Custominput/FormInput';
import { FormField, useGetFormByNameQuery, useSubmitFormMutation } from '@/Redux/Features/FormBuilder/formBuilderService';
import { convertFileToBase64 } from '@/Utils/base64Converter';
import colors from '@/Utils/colors';
import { areRequiredFieldsFilled } from '@/Utils/formValidation';
import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type CustomerData = {
    [key: string]: string | File | null;
};

const SiteVisitationPage = () => {
    const [customerForm, setCustomerForm] = useState<FormField[]>([]);
    const [customerData, setCustomerData] = useState<CustomerData>({});
    const [formError, setFormError] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayData, setDisplayData] = useState<{ date: string; file: string | null }>({ date: '', file: null });

    const { data, isSuccess, isLoading } = useGetFormByNameQuery('SiteVisitForm/0/0');
    const [submitForm, { isLoading: submitLoading }] = useSubmitFormMutation();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isSuccess && data) {
            try {
                const parsedForm = JSON.parse(data.data.json_form);
                setCustomerForm(parsedForm);

                const initialData = parsedForm.reduce((acc: CustomerData, field: FormField) => {
                    acc[`${field.name}`] = field.type === 'file' ? null : '';
                    return acc;
                }, {});

                setCustomerData(initialData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
    }, [data, isSuccess, submitForm]);

    const toggleModal = (open: boolean) => {
        setIsModalOpen(open);
        setFormError('');

        if (open) {
            // Append modal to URL
            navigate(`${location.pathname}?modal=sitevisit`);
        } else {
            // Restore original URL
            const newPath = location.pathname.replace(/\?modal=sitevisit$/, '');
            navigate(newPath, { replace: true });
        }
    };

    const handleInputChange = (field: string, value: string | File | null) => {
        setCustomerData((prev) => ({ ...prev, [field]: value }));
    };

    const updateSiteVisit = async () => {
        if (!areRequiredFieldsFilled(customerForm, customerData)) {
            setFormError('Please fill all required fields.');
            return;
        }

        try {
            setFormError('');
            const fileField = customerForm.find((field) => field.type === 'file');
            const dateField = customerForm.find((field) => field.type === 'date');

            const uploadedFile = fileField?.name && customerData[fileField.name] instanceof File
                ? await convertFileToBase64(customerData[fileField.name] as File)
                : null;

            const selectedDate = dateField?.name ? customerData[dateField.name] as string : '';

            setDisplayData({ date: selectedDate, file: uploadedFile });
            toast.success('Site Visit data saved successfully');
            toggleModal(false);
        } catch (error) {
            console.error('Error updating site visit:', error);
            setFormError('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <div className="mb-2 flex justify-end">
                <Button
                    type="primary"
                    label="Pick Site Visit Date"
                    radius="20px"
                    width="20%"
                    height="32px"
                    action={() => toggleModal(true)}
                />
            </div>
            <div className="p-[20px] rounded-[20px] w-[100%] h-fit" style={{ background: colors.dark[50] }}>
                <div className="border-2 border-nnpcdarkgreen-500 rounded-[20px] p-[20px] bg-dark-50">
                    <Heading as="h4" size="h6" color="primaryColor" className="font-[2px] text-dark-100">
                        PICK DATES FOR SITE VISITS
                    </Heading>
                    <div className="mt-[20px]">
                        {displayData.date && (
                            <p><strong>Selected Date:</strong> {displayData.date}</p>
                        )}
                        {displayData.file && (
                            <div className="mt-2">
                                <strong>Uploaded File:</strong>
                                <img src={displayData.file} alt="Uploaded File" className="mt-2 max-w-[200px]" />
                            </div>
                        )}
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => toggleModal(false)}
                        title="Save Site Visit Form"
                        buttons={[
                            <div key="buttons" className="flex gap-2 mb-[-10px]">
                                <div className="w-[120px]">
                                    <Button
                                        key="saveClose"
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
                                        key="saveContinue"
                                        type="secondary"
                                        label="Continue"
                                        action={updateSiteVisit}
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
                        ) : (
                            customerForm.map((form) => (
                                <Fragment key={form.id}>
                                    <FormInput
                                        type={form.type}
                                        label={form.label ?? form.name}
                                        value={customerData[form.name as keyof CustomerData] as string}
                                        required={form.required}
                                        onChange={(value: string | File | null) => handleInputChange(form?.name as string, value)}
                                        placeholder={form.placeholder}
                                        options={form.options?.map((opt) => (typeof opt === 'string' ? { label: opt, value: opt } : opt))}
                                        maxSizeMB={10}
                                    />
                                </Fragment>
                            ))
                        )}
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default SiteVisitationPage;

