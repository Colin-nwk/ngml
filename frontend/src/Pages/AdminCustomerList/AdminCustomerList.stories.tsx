import { Meta, StoryObj } from '@storybook/react';
import AdminCustomerList from './AdminCustomerList';
import { MemoryRouter } from 'react-router-dom';


const meta: Meta = {
    title: 'Pages/AdminCustomerList',
    component: AdminCustomerList,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof AdminCustomerList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <MemoryRouter>
            <AdminCustomerList />
        </MemoryRouter>
    ),
};

export const WithCustomers: Story = {
    render: () => (
        <MemoryRouter>
            <AdminCustomerList/>
        </MemoryRouter>
    ),
};

export const WithModalOpen: Story = {
    render: () => (
        <MemoryRouter>
            <AdminCustomerList />
        </MemoryRouter>
    ),
};
