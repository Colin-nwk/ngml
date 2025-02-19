import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import OperationPage from './OperationPage';


const meta: Meta = {
    title: 'Pages/OperationPage',
    component: OperationPage,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof OperationPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <MemoryRouter>
            <OperationPage />
        </MemoryRouter>
    ),
};

export const WithVolume: Story = {
    render: () => (
        <MemoryRouter>
            <OperationPage />
        </MemoryRouter>
    ),
};

export const WithModalOpen: Story = {
    render: () => (
        <MemoryRouter>
            <OperationPage />
        </MemoryRouter>
    ),
};
