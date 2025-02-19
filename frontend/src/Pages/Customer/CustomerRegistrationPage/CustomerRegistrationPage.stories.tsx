import { Meta, StoryObj } from '@storybook/react';
import CustomerRegistrationPage from './CustomerRegistrationPage';

const meta: Meta = {
    title: 'Pages/CustomerRegistrationPage',
    component: CustomerRegistrationPage,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof CustomerRegistrationPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
