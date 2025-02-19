
import type { Meta, StoryObj } from '@storybook/react';
import Chart from './Chart';


const data: Record<string, unknown>[] = [
    { month: 'Jan', 'Amount Sold': 300, Delivered: 300, Requests: 400, Revenue: 500 },
    { month: 'Feb', 'Amount Sold': 200, Delivered: 150, Requests: 180, Revenue: 800 },
    { month: 'Mar', 'Amount Sold': 150, Delivered: 120, Requests: 270, Revenue: 600 },
    { month: 'Apr', 'Amount Sold': 500, Delivered: 250, Requests: 280, Revenue: 1200 },
    { month: 'May', 'Amount Sold': 280, Delivered: 250, Requests: 600, Revenue: 1000 },
];

const chartColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

const meta: Meta<typeof Chart> = {
    title: 'Components/Chart',
    component: Chart,
    parameters: {
        layout: 'fullscreen', 
    },
    tags: ['autodocs'],
    argTypes: {
        chartType: {
            control: {
                type: 'select',
                options: ['bar', 'line', 'area', 'pie'],
            },
        },
        yAxisLabel: {
            control: 'text',
        },
    },
};

export default meta;

type Story = StoryObj<typeof Chart>;

export const BarChart: Story = {
    render: (args) => <Chart {...args} />,
    args: {
        data,
        chartType: 'bar',
        xAxisDataKey: 'month',
        yAxisLabel: 'NNPC',
        colors: chartColors,
    },
};

export const LineChart: Story = {
    render: (args) => <Chart {...args} />,
    args: {
        data,
        chartType: 'line',
        xAxisDataKey: 'month',
        yAxisLabel: 'NNPC',
        colors: chartColors,
    },
};

export const AreaChart: Story = {
    render: (args) => <Chart {...args} />,
    args: {
        data,
        chartType: 'area',
        xAxisDataKey: 'month',
        yAxisLabel: 'NNPC',
        colors: chartColors,
    },
};

export const PieChart: Story = {
    render: (args) => <Chart {...args} />,
    args: {
        data,
        chartType: 'pie',
        xAxisDataKey: 'month',
        yAxisLabel: 'NNPC',
        colors: chartColors,
    },
};