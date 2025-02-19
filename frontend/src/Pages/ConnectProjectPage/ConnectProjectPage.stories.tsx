import { Meta, StoryObj } from '@storybook/react';
import ConnectProjectPage from './ConnectProjectPage';
import { MemoryRouter } from 'react-router-dom';


const meta: Meta = {
    title: 'Pages/ConnectProjectPage',
    component: ConnectProjectPage,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof ConnectProjectPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <MemoryRouter>
            <ConnectProjectPage />
        </MemoryRouter>
    ),
};
