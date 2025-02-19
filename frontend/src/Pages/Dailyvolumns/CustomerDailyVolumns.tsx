
import FormInput from '@/Components/Custominput/FormInput';
import { FileType } from '@/Components/Fileuploadinput/FileTypes';
import { FormField, useGetFormByNameQuery, useSubmitFormMutation } from '@/Redux/Features/FormBuilder/formBuilderService';
import { convertFileToBase64 } from '@/Utils/base64Converter';
import { areRequiredFieldsFilled } from '@/Utils/formValidation';
import { ArrowBack } from '@mui/icons-material';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, DailyVolumnHistoryTable, Modal } from '../../Components/index';

type CustomerData = Record<string, string | File | null>;

const CustomerDailyVolumns: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
    const [customerForm, setCustomerForm] = useState<FormField[]>([]);
    const [customerData, setCustomerData] = useState<CustomerData>({});
    const [formError, setFormError] = useState<string>('');
    const [customerId, setCustomerId] = useState<number | null>(null);
    const [customerSiteId, setCustomerSiteId] = useState<number | null>(null);

    const { data, isSuccess, isLoading } = useGetFormByNameQuery(`DailyVolumnConsumption/customer/${customerId}/${customerSiteId}`, {
        skip: !customerId || !customerSiteId
    });

    // console.log(data?.task, 'DailyVolumnConsumption');


    const [submitForm, { isLoading: submitLoading }] = useSubmitFormMutation();

    useEffect(() => {
        const customer = location.pathname.split('/');
        setCustomerId(Number(customer[4]));
        setCustomerSiteId(Number(customer[5]));
    }, [location]);

    const toggleModal = useCallback((open: boolean) => {
        setIsModalOpen(open);
        const searchParams = new URLSearchParams(location.search);

        if (open) {
            searchParams.set('dailyvolumns', 'true');
        } else {
            searchParams.delete('dailyvolumns');
        }

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }, [location, navigate]);



    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const verify = searchParams.get('verifyVolume');
        if (verify) {
            setIsVerifyModalOpen(true)
        }

    }, [location.search])


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
    }, [data, isSuccess]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const dailyvolumns = searchParams.get('dailyvolumns');

        if (dailyvolumns === 'true') {
            setIsModalOpen(true);
        }
    }, [location.search]);

    const handleInputChange = useCallback((field: string, value: string | File | null) => {
        setCustomerData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleDailyVolumns = useCallback(async () => {
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

            validFormFieldAnswers.push({
                id: Number(data?.task?.entity_id),
                elementType: 'hidden',
                name: 'customer_id',
                value: data?.task?.entity_id || '',
                placeholder: 'customer_site_id',
                key: 'customer_id',
            })
            validFormFieldAnswers.push(
                {
                    id: Number(data?.task?.entity_site_id),
                    name: 'customer_site_id',
                    elementType: 'hidden',
                    value: data?.task?.entity_site_id || '',
                    placeholder: 'customer_site_id',
                    key: 'customer_site_id',

                }
            )

            const payload = {
                form_builder_id: data?.data?.id?.toString() || '',
                name: data?.data?.name || '',
                process_flow_id: data?.data?.process_flow_id?.toString() || '',
                process_flow_step_id: data?.data?.process_flow_step_id?.toString() || '',
                tag_id: data?.data?.tag_id || '',
                form_field_answers: JSON.stringify(validFormFieldAnswers),
                data_id: data?.task?.id,
                // customer_id: data?.task?.entity_id,
                // customer_site_id: data?.task?.entity_site_id
            };

            const result = await submitForm(payload).unwrap();

            if (result) {
                toast.success('Daily Volumns created successfully');
                setCustomerData({});
                toggleModal(false);
                const searchParams = new URLSearchParams(location.search);
                searchParams.delete('dailyvolumns');
                navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormError('An error occurred while submitting the form. Please try again.');
        }
    }, [customerForm, customerData, data, submitForm, toggleModal, location, navigate]);

    return (
        <div className="w-full h-full">
            <div className="w-100% h-full p-8 bg-[#FFFFFF] bg-opacity-50 rounded-lg flex-col justify-start items-start gap-8 flex">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center justify-center">
                        <Link to={`/admin/records/customer/${customerId}/${customerSiteId}/customermanager`}>
                            <div className='flex justify-center items-center border-2 h-[32px] w-[32px] rounded-[50%]'>
                                <ArrowBack color="success" style={{ fontSize: 'medium' }} />
                            </div>
                        </Link>

                        <div className="ml-3 text-3xl font-semibold text-center">Daily Volumes History</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex justify-center p-3 border cursor-pointer w-36 rounded-3xl" onClick={() => toggleModal(true)}>
                            <div className="text-[14px] leading-none">Add New Volume</div>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <DailyVolumnHistoryTable />
                </div>
            </div>
            <div>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => toggleModal(false)}
                    size='large'
                    title="Daily Volume Sheet Upload"
                    buttons={[
                        <div className='flex gap-2 mb-[-10px] ' key="modal-buttons">
                            <div className='w-[120px]'>
                                <Button
                                    type="outline"
                                    label="Cancel"
                                    action={() => toggleModal(false)}
                                    color="#FFFFFF"
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
                                    action={handleDailyVolumns}
                                    color="#FFFFFF"
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
                    {formError && <p className="mb-4 text-red-500">{formError}</p>}
                    {isLoading ? (
                        <p>Loading form fields...</p>
                    ) : customerForm.length > 0 ? (
                        customerForm.map((form) => (
                            <Fragment key={form.id}>
                                <FormInput
                                    type={form?.type}
                                    label={form.label ?? form.name}
                                    value={customerData[form.name as keyof typeof customerData] as string || ''}
                                    required={form?.required}
                                    onChange={(value: string | File | null) => handleInputChange(form?.name as string, value)}
                                    placeholder={form.placeholder}
                                    options={form.options?.map(opt =>
                                        typeof opt === 'string'
                                            ? { label: opt, value: opt }
                                            : opt
                                    )}
                                    url={form?.url}
                                    maxSizeMB={10}
                                    allowedFileTypes={[FileType.EXCEL, FileType.CSV]}
                                />
                            </Fragment>
                        ))
                    ) : (
                        <p>No form fields available.</p>
                    )}
                </Modal>

                {/* verify */}
                <Modal
                    isOpen={isVerifyModalOpen}
                    onClose={() => setIsVerifyModalOpen(false)}
                    size='medium'
                    title="Verify current volume"
                    buttons={[
                        <div className='flex gap-2 mb-[-10px] ' key="modal-buttons">
                            <div className='w-[120px]'>
                                <Button
                                    type="outline"
                                    label="Cancel"
                                    action={() => setIsVerifyModalOpen(false)}
                                    color="#FFFFFF"
                                    width="100%"
                                    height="40px"
                                    fontSize="16px"
                                    radius="20px"
                                />
                            </div>
                            <div className='w-[260px]'>
                                <Button
                                    type="secondary"
                                    label="Verify"
                                    action={() => setIsVerifyModalOpen(false)}
                                    color="#FFFFFF"
                                    width="100%"
                                    height="40px"
                                    fontSize="16px"
                                    radius="20px"
                                />
                            </div>
                        </div>
                    ]}
                >
                    Verify
                </Modal>
            </div>
        </div>
    );
};

export default CustomerDailyVolumns;
