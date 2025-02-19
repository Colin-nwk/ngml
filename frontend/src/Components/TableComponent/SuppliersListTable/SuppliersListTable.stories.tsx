import type { Meta, StoryObj } from '@storybook/react';
import SuppliersListTable from './SuppliersListTable';
import { MemoryRouter } from 'react-router-dom';


const meta: Meta<typeof SuppliersListTable> = {
    title: 'Tables/SuppliersListTable',
    component: SuppliersListTable,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {
    render: () => (
        <MemoryRouter>
            <SuppliersListTable />
        </MemoryRouter>
    ),
};

