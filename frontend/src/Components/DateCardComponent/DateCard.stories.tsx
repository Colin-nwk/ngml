import type { Meta, StoryObj } from '@storybook/react';
import DateCard from './DateCard';
import { LocationCity, ManageAccounts } from '@mui/icons-material';


const meta = {

  title: 'Components/DateCard',
  component: DateCard,
  parameters: {
    layout: 'start',
  },
  tags: ['autodocs'],

  argTypes: {
    cardType: { control: 'select', options: ['primary', 'secondary'] },
    day: { control: 'number' },
    weekDay: { control: 'text' },
    month: { control: 'text' },
    isActive: { control: 'boolean' },
    onToggleActive: { action: 'clicked' },
    secondaryProps: { control: 'object' },
  },

} satisfies Meta<typeof DateCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    cardType: 'primary',
    day: 10,
    weekDay: 'Fri',
    month: 'June',
    isActive: false,
    onToggleActive: () => { },
  }
};

export const Secondary: Story = {
  args: {
    cardType: 'secondary',
    secondaryProps: {
      date: 18,
      month: 'DEC 2023',
      businessName: 'Dangote Cement LTD',
      businessIcon: <div><ManageAccounts /></div>,
      locationIcon: <div><LocationCity/></div>,
      location: '1 Alfred Rewane Rd, Ikoyi 106104, Lagos'
    },

  }
};