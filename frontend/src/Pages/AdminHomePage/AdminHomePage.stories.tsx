import { Meta, StoryObj } from '@storybook/react';
import AdminHomePage from './AdminHomePage'; 

const meta: Meta = {
    title: 'Pages/AdminHomePage', 
    component: AdminHomePage,
    parameters: {
    },
    argTypes: {
    },
} satisfies Meta<typeof AdminHomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <AdminHomePage />, 
};
