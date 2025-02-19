
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import CustomerListTable from './CustomerListTable';

const meta: Meta<typeof CustomerListTable> = {
    title: 'Tables/CustomerListTable',
    component: CustomerListTable,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {
    render: () => (
        <MemoryRouter>
            <CustomerListTable />
        </MemoryRouter>
    ),
};

