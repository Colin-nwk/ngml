import FormInput from '@/Components/Custominput/FormInput';
// import DollarRateDisplay from '@/Components/DollarRateDisplay/DollarRateDisplay';
import { FileType } from '@/Components/Fileuploadinput/FileTypes';
import { FilterParams } from '@/Hooks/useChartFilter';
import { useModalManagement } from '@/Hooks/useModalManagement';
import { useGetCustomersQuery } from '@/Redux/Features/Customer/customerService';
import { FormField, useGetFormByNameQuery, useSubmitFormMutation } from '@/Redux/Features/FormBuilder/formBuilderService';
import { useTasksQuery } from '@/Redux/Features/Task/taskService';
import { useGetAllStaffQuery } from '@/Redux/Features/UserSettings/staffService';
import { convertFileToBase64 } from '@/Utils/base64Converter';
import { areRequiredFieldsFilled } from '@/Utils/formValidation';
import { generateLineGraphData, generateNNPCData } from '@/Utils/sampleData';
import {
  ArrowOutwardOutlined,
} from '@mui/icons-material';
import
// React, 
{ Fragment, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  ActivityLogCard, Button, Chart, DailyVolumnHistoryTable, Modal, StatisticCard,
} from '../../Components/index';
import { selectCurrentUser } from '../../Redux/Features/Auth/authSlice';
import { useAppSelector } from '../../Redux/hooks';
import images from '../../assets/index';
import DollarDisplay from '@/Components/DollarRateDisplay/DollarDisplay';

type DollarData = {
  [key: string]: string | File | null;
};

interface DataKeyConfig {
  key: string;
  type: 'bar' | 'line';
}


const AdminHomePage = () => {
  const { isModalOpen, toggleModal } = useModalManagement('addRate');
  const [chartData, setChartData] = useState(generateLineGraphData());
  const [chartDataOne, setChartDataOne] = useState(generateNNPCData());
  const [formError, setFormError] = useState<string>('');
  const [dollarData, setDollarData] = useState<DollarData>({});
  const [dollarForm, setDollarForm] = useState<FormField[]>([]);
  // const [latestRate] = useState<DollarRate | null>(null);


  const navigate = useNavigate();

  const currentUser = useAppSelector(selectCurrentUser);
  const { data, error, isError, isSuccess, isLoading } = useTasksQuery();
  const { data: customers } = useGetCustomersQuery();

  const { data: staff } = useGetAllStaffQuery()
  const [submitForm, { isLoading: submitLoading }] = useSubmitFormMutation();
  const { data: rateData, isSuccess: rateSuccess, isLoading: rateIsLoading } = useGetFormByNameQuery('CreateNewCustomer/0/0');

  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0];
  };


  useEffect(() => {
    if (rateSuccess && rateData) {
      try {
        const parsedForm = JSON.parse(rateData.data.json_form);
        setDollarForm(parsedForm);


        const initialData = parsedForm.reduce((acc: DollarData, field: FormField) => {
          if (field.name) {
            acc[field.name] = field.type === 'file' ? null : '';
          }
          return acc;
        }, {});

        setDollarData(initialData);

      } catch (error) {
        console.error('Error parsing JSON:', error);
        setDollarForm([]);
        setDollarData({});
      }
    }
  }, [rateData, rateSuccess]);

  useEffect(() => {
    if (isModalOpen) {
      const allFilled = areRequiredFieldsFilled(dollarForm, dollarData);
      if (!allFilled) return;

    }
  }, [dollarData, isModalOpen, dollarForm]);


  const handleChange = (field: string, value: string | File | null) => {
    if (value instanceof File) {
      setDollarData(prev => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setDollarData(prev => ({ ...prev, [field]: value || '' }));
    }
  };


  const handleAddRate = async () => {
    if (!areRequiredFieldsFilled(dollarForm, dollarData)) {
      setFormError('Please fill all required fields.');
      return;
    }

    try {
      setFormError('');
      const formFieldAnswers = await Promise.all(
        dollarForm.map(async (field) => {
          const value = dollarData[field.name as keyof typeof dollarData];

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
        form_builder_id: rateData?.data?.id?.toString() || '',
        name: rateData?.data?.name || '',
        process_flow_id: rateData?.data?.process_flow_id?.toString() || '',
        process_flow_step_id: rateData?.data?.process_flow_step_id?.toString() || '',
        tag_id: rateData?.data?.tag_id || '',
        form_field_answers: JSON.stringify(validFormFieldAnswers),
      };

      await submitForm(payload).unwrap();

      const result = await submitForm(payload).unwrap();

      if (result) {
        toast.success('Dollar rate updated successfully');

        const initialData = dollarForm.reduce((acc: DollarData, field: FormField) => {
          if (field.name) {
            acc[field.name] = field.type === 'file' ? null : '';
          }
          return acc;
        }, {});

        setDollarData(initialData);
        toggleModal(false);

        const searchParams = new URLSearchParams(location.search);
        searchParams.delete('addRate');
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError('An error occurred while submitting the form. Please try again.');
    }
  };


  const handleFilterChange = useCallback((params: FilterParams) => {
    console.log('Filter params:', params);

    const newData = generateLineGraphData(
      params.filterType === 'month' ? 'daily' : 'monthly'
    );
    setChartData(newData);
  }, []);
  const handleFilterChangeOne = useCallback((params: FilterParams) => {
    console.log('Filter params:', params);

    const newData = generateNNPCData(
      params.filterType === 'month' ? 'daily' : 'monthly'
    );
    setChartDataOne(newData);
  }, []);



  const dataKeyConfig: DataKeyConfig[] = [
    { key: 'Direct Consumption', type: 'bar' as const },
    { key: 'UJV/BOT Consumption', type: 'bar' as const },
    { key: 'Volume Target', type: 'line' as const }
  ];

  // const cardData = [
  //   {
  //     title: 'Staff',
  //     value: '0',
  //     icon: <img src={images.contact} alt="staff icon" />,

  //   },
  //   {
  //     title: 'Pending Requests',
  //     value: '0',
  //     icon: <img src={images.Requesticon} alt="request icon" />,

  //   },
  //   {
  //     title: 'Upcoming Site Visits',
  //     value: '0',
  //     icon: <img src={images.zone} alt="zone icon" />,
  //   },
  // ];


  // const getIconStyles = (title: string) => {
  //   switch (title) {
  //     case 'Staff':
  //       return { bgColor: 'bg-[#005828]', iconColor: 'text-white', };
  //     case 'Pending Requests':
  //       return { bgColor: 'bg-[#00AF50]', iconColor: 'text-white' };
  //     case 'Upcoming Site Visits':
  //       return { bgColor: 'bg-[#FFD181]', iconColor: 'text-black' };
  //     default:
  //       return { bgColor: 'bg-gray-500', iconColor: 'text-white' };
  //   }
  // };

  const statisticCardData = [
    {
      label: 'Customers',
      value: JSON.stringify(customers?.data.length) ?? '',
      primary: true,
    },
    // {
    //   label: 'Suppliers',
    //   value: '0',
    //   primary: false,
    // },
    {
      label: 'Staff',
      value: JSON.stringify(staff?.data.data.length) ?? '',
      primary: false,
    },
  ];

  if (isError) {
    console.log('error', error)
    console.log('error', isError)
  }

  if (isSuccess) {
    console.log('tasks', data)
  }


  return (
    <div className="h-fit w-full" >
      <div className='flex justify-between items-center'>
        <div>
          <div className='text-[30px] text-[#49526A] font-[700]'>Welcome {currentUser && (
            <span className="text-[30px] text-[#49526A] font-[700] capitalize">
              {getFirstName(currentUser.name)}
            </span>
          )}
          </div>
        </div>
        {/* <div>
          <DollarRateDisplay latestRate={latestRate} />
        </div> */}
         <div>
          <DollarDisplay />
        </div>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 mt-6 gap-4">
        {cardData.map((card, index) => {
          const { bgColor, iconColor } = getIconStyles(card.title);
          return (
            <StatisticRectangleCard
              key={index}
              title={card.title}
              value={card.value}
              icon={React.cloneElement(card.icon, { className: `${iconColor} ${bgColor} rounded-[10px] w-[50px] h-[32px] p-2` })}
              iconBgColor=''
            />
          );
        })}
      </div> */}
      <div className='mt-8 h-fit grid grid-cols-1 xl:grid-cols-7 gap-6 ' id="stat-card-chart-parent">
        <div className="xl:col-span-5 col-span-1  order-last lg:order-first xl:order-last" id="cards">
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 lg:gap-4">
            {statisticCardData.map((card, index) => (
              <StatisticCard
                key={index}
                label={card.label}
                value={card.value}
                primary={card.primary}
              />
            ))}
          </div>
          <div >
            <Chart
              chartType="mixed"
              dataKeyConfig={dataKeyConfig}
              data={chartData}
              xAxisDataKey="date"
              yAxisLabel="Volume (Mmscf)"
              colors={['#ec0000',
                '#005828', '#888a88'
              ]}
              title="Customer Consumption Chart"
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
        <div className='w-full max-h-[60rem] bg-[#FFFFFF] border rounded-t-lg border-[#E2E4EB] rounded-b-lg hidden xl:order-last lg:order-last order-first md:block xl:col-span-2 col-span-1'>
          <div className='h-[48px] bg-[#F6F8FA] flex items-center p-[10px] justify-between'>
            <div className='text-[#828DA9] text-[20px] font-[400]'>Available Tasks</div>
            <div className='border size-[32px] flex items-center justify-center rounded-full'>
              <ArrowOutwardOutlined color="disabled" style={{ fontSize: 'medium' }} />
            </div>
          </div>
          {/* Make this div scrollable */}
          <div
            className='w-[100%] p-[10px] pt-[0px] max-h-[45rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
            {isLoading && (
              <img src={images.ngmlPortrait} className='w-full h-full' alt="loader" />
            )}
            {isSuccess && Array.isArray(data?.data) && data.data.map((activity: any, index: number) => {
              return (
                <ActivityLogCard
                  key={index}
                  route={activity.route}
                  title={activity.title}
                  text={activity.text}
                  start_time={activity.start_time}
                />
              );
            })}
          </div>
        </div>


      </div>

      <div>
        <div className='mt-[28px]'>
          <Chart
            data={chartDataOne}
            chartType="line"
            yAxisLabel="Volume (Mmscf)"
            xAxisDataKey="date"
            colors={['#0c6f22']}
            title='Customer Consumption Chart'
            onFilterChange={handleFilterChangeOne}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => toggleModal(false)}
        size='medium'
        title='Monthly Dollar Conversion Rate'
        subTitle='Enter the average monthly dollar rate'
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
                label={submitLoading ? 'Updating...' : 'Edit Rate'}
                action={handleAddRate}
                color="#FFFFFF"
                fontStyle="italic"
                width="100%"
                height="40px"
                fontSize="16px"
                radius="20px"
                disabled={submitLoading || !areRequiredFieldsFilled(dollarForm, dollarData)}
              />
            </div>
          </div>
        ]}
      >
        {formError && <p className="text-red-500 mb-4">{formError}</p>}
        {rateIsLoading ? (
          <p>Loading form fields...</p>
        ) : dollarForm.length > 0 ? (
          dollarForm.map((form) => (
            <Fragment key={form.id}>
              <FormInput
                type={form?.type}
                label={form.label ?? form.name}
                value={
                  form.type === 'file'
                    ? (dollarData[form.name as keyof typeof dollarData] as string || '')
                    : (dollarData[form.name as keyof typeof dollarData] as string || '')
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
      <div className='w-[100%] mt-[28px]'>
        <DailyVolumnHistoryTable />
      </div>
    </div>
  );
}

export default AdminHomePage;