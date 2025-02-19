import { Meta, StoryObj } from '@storybook/react';
import ResetPassword from './ResetPassword';

const meta: Meta = {
    title: 'Pages/ResetPassword',
    component: ResetPassword,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof ResetPassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        email: 'example@example.com',
    },
};
