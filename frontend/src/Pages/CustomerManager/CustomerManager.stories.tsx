import { Meta, StoryObj } from '@storybook/react';
import CustomerManager from './CustomerManager';

const meta: Meta = {
    title: 'Pages/CustomerManager',
    component: CustomerManager,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof CustomerManager>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
