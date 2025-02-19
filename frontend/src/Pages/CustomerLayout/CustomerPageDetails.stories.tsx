import { Meta, StoryObj } from '@storybook/react';
import CustomerPageDetails from './CustomerPageDetails';

const meta: Meta = {
    title: 'Pages/CustomerPageDetails',
    component: CustomerPageDetails,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof CustomerPageDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
