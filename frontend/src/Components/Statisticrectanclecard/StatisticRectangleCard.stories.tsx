import { Meta, StoryObj } from '@storybook/react';
import StatisticRectangleCard from './StatisticRectangleCard';
import Records from '/assets/png-icons/Records.png';
import Warning from '/assets/png-icons/Warning.png'

const meta: Meta = {
  title: 'Components/StatisticRectangleCard',
  component: StatisticRectangleCard,
  parameters: {
    layout: 'centered'
  }, tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text' },
    title: { control: 'text' },
    value: { control: 'text' },
    valueColor: { control: 'color' },
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
    size: { control: 'text' },
    iconBgColor: { control: 'color' },
    iconSize: { control: 'text' },
  },

} satisfies Meta<typeof StatisticRectangleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story={
args: {
    title: 'Custom Title',
    value: '50',
    backgroundColor: 'bg-white-500',
    valueColor: 'text-gray-800',
    icon: <div><img src={Records} alt="record icon" /></div>
},
};

export const Custom: Story={
args: {
    
    title: 'Custom Title',
    value: '50',
    backgroundColor: 'bg-blue-500',
    valueColor: 'text-white',
    icon: <div><img src={Records} alt="record icon" /></div>,
    size: 'w-96'
},
};

export const WithIcon: Story ={
args: {
  icon: <div><img src={Warning} alt="Warning" /></div>,
  iconBgColor: 'bg-red-500 rounded-full',
},
};