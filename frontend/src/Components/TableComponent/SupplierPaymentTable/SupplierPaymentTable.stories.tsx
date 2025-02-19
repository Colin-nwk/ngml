import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import SupplierPaymentTable from './SupplierPaymentTable';


const meta: Meta<typeof SupplierPaymentTable> = {
    title: 'Tables/SupplierPaymentTable',
    component: SupplierPaymentTable,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {
    render: () => (
        <MemoryRouter>
            <SupplierPaymentTable />
        </MemoryRouter>
    ),
};

