import { Meta, StoryObj } from '@storybook/react';
import ForgotPassword from './ForgotPassword';

const meta: Meta = {
    title: 'Pages/Customer/ForgotPasswordPage',
    component: ForgotPassword,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof ForgotPassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        email: 'example@example.com',
    },
};
