import type { Meta, StoryObj } from '@storybook/react';
import InfoCard from './InfoCardComponent';

const meta: Meta<typeof InfoCard> = {
  title: 'Components/InfoCard',
  component: InfoCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    title: { control: 'text' },
    number: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Active Users',
    number: '1,200',
  }
};


