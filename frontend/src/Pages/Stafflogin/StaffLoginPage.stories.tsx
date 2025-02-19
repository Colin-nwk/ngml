import { Meta, StoryObj } from '@storybook/react';
import StaffLoginPage from './StaffLoginPage';

const meta: Meta = {
    title: 'Pages/StaffLoginPage',
    component: StaffLoginPage,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof StaffLoginPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
