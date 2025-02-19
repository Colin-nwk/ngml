import { Meta, StoryObj } from '@storybook/react';
import ActivityLogCard from './ActivityLogCard';

const meta: Meta = {
  title: 'Components/ActivityLogCard',
  component: ActivityLogCard,
  parameters: {
    layout: 'centered'
  }, tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    text: { control: 'text' },
    start_time: { control: 'date' },
    button: { control: 'text' },
  },

} satisfies Meta<typeof ActivityLogCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'EOI REQUEST',
    text: 'Johnson Alaba has updated the site survey findings for GET Technologies Limited.',
    start_time: new Date('2024-02-12T12:00:00'),
},

};

export const Custom: Story = {
  args: {

    title: 'EOI REQUEST',
    text: 'Johnson Alaba has updated the site survey findings for GET Technologies Limited.',
    start_time: new Date('2024-02-12T12:00:00'),
    button: <button className="bg-green-600 hover:bg-gray-100 text-white font-bold py-1 px-8 rounded-[30px]">View Request</button>
  },
};