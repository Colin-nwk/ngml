
import { ActivityLogCard, Chart, StatisticDynamicCard } from '@/Components';
import { FilterParams } from '@/Hooks/useChartFilter';
import { useTasksQuery } from '@/Redux/Features/Task/taskService';
import {
  ArrowOutwardOutlined,
  FileDownloadDoneOutlined,
  RestaurantMenuOutlined
} from '@mui/icons-material';
import React, { useCallback } from 'react';


interface SelectOption {
  label: string;
  value: string;
}

interface DynamicCardDataItem {
  type: 'primary' | 'secondary';
  title?: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  yearOptions?: Array<number>;
  valueOptions?: Array<SelectOption>;
}


const CustomerHomePage = () => {
  const handleFilterChange = useCallback((params: FilterParams) => {
    console.log('Filter params:', params);

  }, []);


  const { data, error, isError, isSuccess } = useTasksQuery();

  console.log(data, 'data___')



  const dataNNPC = [
    { month: 'Jan', 'Amount Sold': 100, Delivered: 80, Requests: 120, Revenue: 500 },
    { month: 'Feb', 'Amount Sold': 200, Delivered: 150, Requests: 180, Revenue: 800 },
    { month: 'Mar', 'Amount Sold': 150, Delivered: 120, Requests: 200, Revenue: 600 },
    { month: 'Apr', 'Amount Sold': 300, Delivered: 250, Requests: 280, Revenue: 1200 },
    { month: 'May', 'Amount Sold': 250, Delivered: 200, Requests: 320, Revenue: 1000 },
  ];

  const chartColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];



  const dynamicCardData: DynamicCardDataItem[] = [
    {
      type: 'primary',
      title: 'All Time',
      content: '0',
      icon: <RestaurantMenuOutlined />,

    },
    {
      type: 'secondary',
      title: 'Today ',
      content: '0',
      icon: <FileDownloadDoneOutlined />,

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
      <div>
        <div className='text-[30px] text-[#49526A] font-[700]'>Home</div>
      </div>
      <div className='mt-8 h-fit grid grid-cols-1 xl:grid-cols-7 gap-6 ' id="stat-card-chart-parent">
        <div className="xl:col-span-5 col-span-1  order-last lg:order-first xl:order-last" id="cards">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[100%] ">
            {dynamicCardData.map((card, index) => (
              <div key={index}>
                <StatisticDynamicCard
                  type={card.type}
                  title={card.title}
                  content={card.content}
                  icon={card.icon}
                />
              </div>
            ))}
          </div>
          <div >
            <Chart
              onFilterChange={handleFilterChange}
              data={dataNNPC}
              chartType="bar"
              yAxisLabel="NNPC"
              xAxisDataKey="month"
              colors={chartColors}
              title='Customer Consumption Chart'
            />
          </div>
        </div>
        <div className='w-[100%] h-[800px] bg-[#FFFFFF] border rounded-t-lg border-[#E2E4EB] rounded-b-lg hidden xl:order-last lg:order-last order-first md:block xl:col-span-2 col-span-1'>
          <div className='h-[48px] bg-[#F6F8FA] flex items-center p-[10px] justify-between'>
            <div className='text-[#828DA9] text-[20px] font-[400]'>Tasks Notification</div>
            <div className='border w-[32px] h-[32px] flex items-center justify-center rounded-full'>
              <ArrowOutwardOutlined color="disabled" style={{ fontSize: 'medium' }} />
            </div>
          </div>
          <div className='h-[1000px] overflow-y-auto'>
            <div className='w-[100%] p-[10px] pt-[0px] '>
              {isSuccess && Array.isArray(data?.data) && data.data.map((activity: any, index: number) => {
                return (
                  <ActivityLogCard
                    key={index}
                    title={activity.title}
                    text={activity.text}
                    start_time={activity.start_time}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerHomePage;
