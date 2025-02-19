import { FilterParams } from '@/Hooks/useChartFilter';
import { Chart, StatisticDynamicCardTwo } from '../../Components/index';
import images from '../../assets/index';

import { useCallback } from 'react';


const CustomerPageDetails = () => {

    const currentYear = new Date().getFullYear();
    const yearRange = Array.from({ length: 6 }, (_, i) => currentYear - i).reverse();
    // const yearRange = Array.from({ length: currentYear - 2019 + 1 }, (_, i) => 2020 + i);

    const handleFilterChange = useCallback((params: FilterParams) => {
        console.log('Filter params:', params);

    }, []);

    const lineDataGraph = [
        { month: 'Jan', 'Daily Volume': 120, 'Consumed Volume': 110, },
        { month: 'Feb', 'Daily Volume': 120, 'Consumed Volume': 130, },
        { month: 'Mar', 'Daily Volume': 120, 'Consumed Volume': 140, },
        { month: 'Apr', 'Daily Volume': 120, 'Consumed Volume': 140, },
        { month: 'May', 'Daily Volume': 120, 'Consumed Volume': 130, },
        { month: 'Jun', 'Daily Volume': 120, 'Consumed Volume': 120, },
        { month: 'Jul', 'Daily Volume': 120, 'Consumed Volume': 120, },
        { month: 'Aug', 'Daily Volume': 120, 'Consumed Volume': 140, },
        { month: 'Sep', 'Daily Volume': 120, 'Consumed Volume': 120, },
        { month: 'Oct', 'Daily Volume': 120, 'Consumed Volume': 150, },
        { month: 'Nov', 'Daily Volume': 120, 'Consumed Volume': 130, },
        { month: 'Dec', 'Daily Volume': 120, 'Consumed Volume': 170, },
    ];

    const chartColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

    return (
        <div className="grid grid-cols-1" >
            <div className="flex flex-col md:flex-row gap-6">
                <StatisticDynamicCardTwo
                    type='primary'
                    icon={<img src={images.firewood} alt="firewood icon" width='30px' />}
                    value={0}
                    yearOptions={yearRange}
                    content="Total Consumed Volume"
                    subcontent="(MMscf)"
                    className="w-full md:w-[50%]"
                    iconColor="#ffff"
                />
                <StatisticDynamicCardTwo
                    type='secondary'
                    icon={<img src={images.firewood2} alt="firewood2 icon" width='30px' />}
                    value={0}
                    content="⁠Yesterday's Consumed Volume"
                    subcontent="(MMscf)"
                    className="w-full md:w-[50%]"
                    iconColor="text-black"
                    contentColor='text-nnpc-100 text-[2xl]'
                    subcontentColor='text-nnpc-100'
                    valueColor='text-nnpc-100'
                />
            </div>

            <div className="mt-6 md:mt-0">
                <div className='mt-[28px]'>
                    <Chart
                        data={lineDataGraph}
                        chartType="line"
                        yAxisLabel="⁠Volume (MMscf)"
                        xAxisDataKey="month"
                        colors={chartColors}
                        title='Customer Consumption Chart'
                        onFilterChange={handleFilterChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default CustomerPageDetails;