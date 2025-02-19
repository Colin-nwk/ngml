import { MemoryRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';
import SupplierPaymentHistory from './SupplierPaymentHistory';

const meta: Meta = {
    title: 'Pages/SupplierPaymentHistory', 
    component: SupplierPaymentHistory,
    parameters: {
    },
    argTypes: {
    },
} satisfies Meta<typeof SupplierPaymentHistory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <MemoryRouter>
            <SupplierPaymentHistory />
        </MemoryRouter>
    ), 
};