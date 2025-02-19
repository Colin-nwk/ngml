import { Meta, StoryObj } from '@storybook/react';
import StatisticCard from './StatisticCard';

const meta: Meta = {
  title: 'Components/StatisticCardStatic',
  component: StatisticCard,
  parameters: {
    layout: 'centered'
  }, tags: ['autodocs'],
  argTypes: {
    primary: { control: 'boolean' },
    label: { control: 'text' },
    value: { control: 'text' },
    labelSpan: { control: 'text' },
  },

} satisfies Meta<typeof StatisticCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Total Users',
    value: 1000,
  },
}

export const Secondary: Story = {
  args: {
    label: 'Total Sales',
    value: 5000,
    primary: false,
  },
};

export const WithCustomLabelSpan: Story = {
  args: {
    label: 'Total Sales',
    value: 5000,
    labelSpan: <span>Monthly</span>,
  },
};
