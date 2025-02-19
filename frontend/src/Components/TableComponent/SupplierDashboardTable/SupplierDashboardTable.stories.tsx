import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import SupplierDashboardTable from './SupplierDashboardTable';


const meta: Meta<typeof SupplierDashboardTable> = {
    title: 'Tables/SupplierDashboardTable',
    component: SupplierDashboardTable,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {
    render: () => (
        <MemoryRouter>
            <SupplierDashboardTable />
        </MemoryRouter>
    ),
};

