
import { useChartFilter } from '@/Hooks/useChartFilter';
import { useCallback, useEffect } from 'react';
import {
    Area,
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    Pie,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { FilterRadioGroup, SelectDropdown } from './ChartFilters';

type ChartType = 'bar' | 'line' | 'area' | 'pie' | 'mixed';

interface FilterParams {
    filterType: 'month' | 'year';
    month?: string;
    year: number;
}

interface DataKeyConfig {
    key: string;
    type: 'bar' | 'line';
}



interface ComposedChartProps<T extends Record<string, unknown>> {
    data: any;
    chartType: ChartType;
    xAxisDataKey: keyof T;
    yAxisLabel?: string;
    colors: string[];
    title: string;
    onFilterChange: (params: FilterParams) => void;
    dataKeyConfig?: DataKeyConfig[];
}

const Chart = <T extends Record<string, unknown>>({
    data,
    chartType,
    xAxisDataKey,
    yAxisLabel,
    colors,
    title,
    onFilterChange,
    dataKeyConfig = []
}: ComposedChartProps<T>) => {
    const {
        filterParams,
        months,
        yearsRange,
        updateFilterType,
        updateMonth,
        updateYear
    } = useChartFilter();

    // Wrap onFilterChange in useCallback to prevent infinite updates
    const handleFilterChange = useCallback((params: FilterParams) => {
        onFilterChange(params);
    }, [onFilterChange]);

    // Add proper dependency array and use the memoized callback
    useEffect(() => {
        handleFilterChange(filterParams);
    }, [filterParams, handleFilterChange]);

    const renderChartComponent = (dataKey: string, color: string, index: number) => {

        if (chartType === 'mixed') {
            const config = dataKeyConfig.find(conf => conf.key === dataKey);
            // if (!config) return null;

            switch (config?.type) {
                case 'bar':
                    return (
                        <Bar
                            key={index}
                            dataKey={dataKey}
                            fill={color}
                            type="monotone"
                            stroke={color}
                            radius={[0, 0, 0, 0]}
                            stackId="a"
                        />
                    );
                case 'line':
                    return (
                        <Line
                            key={index}
                            type="monotone"
                            dataKey={dataKey}
                            stroke={color}
                            fill={color}
                            strokeWidth={2}
                            dot={{ fill: color, strokeWidth: 2 }}
                        />
                    );
                default:
                    return null;
            }
        }

        switch (chartType) {
            case 'bar':
                return (
                    <Bar
                        key={index}
                        dataKey={dataKey}
                        fill={color}
                        type="monotone"
                        stroke={color}
                        stackId="a"
                        radius={[0, 0, 0, 0]}
                    />
                );
            case 'line':
                return (
                    <Line
                        key={index}
                        type="monotone"
                        dataKey={dataKey}
                        stroke={color}
                        fill={color}
                        strokeWidth={2}
                        dot={{ fill: color, strokeWidth: 2 }}
                    />
                );
            case 'area':
                return (
                    <Area
                        key={index}
                        type="monotone"
                        dataKey={dataKey}
                        stackId="1"
                        stroke={color}
                        fill={color}
                        fillOpacity={0.6}
                    />
                );
            case 'pie':
                return (
                    <Pie
                        key={index}
                        dataKey={dataKey}
                        data={data}
                        outerRadius={80}
                        fill={color}
                        strokeWidth={2}
                        stroke="#fff"
                    />
                );
            default:
                return null;
        }
    };

    const FilterControls = () => {
        if (filterParams.filterType === 'month') {
            return (
                <div className="flex items-end gap-3 ">
                    <SelectDropdown
                        options={months}
                        value={filterParams.month!}
                        onChange={(value) => updateMonth(value as string)}
                        label="Month"
                    />
                    <SelectDropdown
                        options={yearsRange}
                        value={filterParams.year}
                        onChange={(value) => updateYear(Number(value))}
                        label="Year"
                    />
                </div>
            );
        }

        return (
            <div className="flex items-end gap-3">
                <SelectDropdown
                    options={yearsRange}
                    value={filterParams.year}
                    onChange={(value) => updateYear(Number(value))}
                    label="Year"
                />
            </div>
        );
    };

    return (
        <div className="mt-4 bg-white rounded-xl border border-gray-200 transition-shadow duration-300" data-testid="chart">
            <div className='flex flex-col gap-4 p-6 bg-gray-50/50 border-b border-gray-200'>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h6 className='text-gray-700 font-semibold text-lg sm:text-xl'>
                        {title}
                    </h6>
                    <FilterRadioGroup
                        filterType={filterParams.filterType}
                        onChange={updateFilterType}
                    />
                </div>

                <div className="flex flex-wrap items-center justify-end gap-4">
                    <FilterControls />
                </div>
            </div>

            <div className='p-6'>
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <ComposedChart
                            data={data}
                            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#f0f0f0"
                                vertical={false}
                            />
                            <XAxis
                                dataKey={xAxisDataKey as string}
                                tick={{ fill: '#6B7280' }}
                                tickLine={{ stroke: '#E5E7EB' }}
                            />
                            {yAxisLabel && (
                                <YAxis
                                    label={{
                                        value: yAxisLabel,
                                        angle: -90,
                                        position: 'insideLeft',
                                        style: { fill: '#6B7280' }
                                    }}
                                    tick={{ fill: '#6B7280' }}
                                    tickLine={{ stroke: '#E5E7EB' }}
                                />
                            )}
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                            />
                            <Legend
                                verticalAlign="top"
                                height={36}
                                wrapperStyle={{
                                    paddingBottom: '20px',
                                    fontSize: '14px',
                                }}
                                iconType="rect"
                            />
                            {Object.keys(data[0]).map((dataKey, index) => {
                                if (dataKey !== xAxisDataKey) {
                                    return renderChartComponent(dataKey, colors[index % colors.length], index);
                                }
                                return null;
                            })}
                        </ComposedChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-40 w-full flex flex-col justify-center items-center gap-2 bg-gray-50/50 rounded-lg" data-testid="no-chart-content">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <p className="text-gray-500 font-normal">
                            No data available for chart
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chart;