import { MemoryRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';
import SuppliersPage from './SuppliersPage';

const meta: Meta = {
    title: 'Pages/SuppliersPage', 
    component: SuppliersPage,
    parameters: {
    },
    argTypes: {
    },
} satisfies Meta<typeof SuppliersPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <MemoryRouter>
            <SuppliersPage />
        </MemoryRouter>
    ), 
};