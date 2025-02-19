import { BuildOutlined } from '@mui/icons-material';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import StatisticDynamicCard from './StatisticDynamicCard';

const YourIconComponent: React.FC = () => <span><BuildOutlined /></span>;

const statisticCardMeta: Meta<typeof StatisticDynamicCard> = {
    title: 'Components/StatisticCard',
    component: StatisticDynamicCard,
};

export default statisticCardMeta;

const Template: StoryObj<typeof StatisticDynamicCard> = {
    render: (args) => <StatisticDynamicCard {...args} />,
};

export const Primary: StoryObj<typeof StatisticDynamicCard> = {
    ...Template,
    args: {
        type: 'primary',
        title: 'Total Revenue',
        content: '12,129,243,990.00',
        icon: <YourIconComponent />,
        onSortChange: () => { },
        yearOptions: [2020, 2021, 2022],
        valueOptions: [
            { label: 'Revenue', value: 'revenue' },
            { label: 'Profit', value: 'profit' },
        ],
    },
};

export const Secondary: StoryObj<typeof StatisticDynamicCard> = {
    ...Template,
    args: {
        ...Primary.args,
        type: 'secondary',
        title: 'Total Consumption Volume ',
        content: '42,200,546,820.00',
    },
};
