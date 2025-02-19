import { Meta, StoryObj } from '@storybook/react';
import RequestPage from './RequestPage';
import { MemoryRouter } from 'react-router-dom';


const meta: Meta = {
    title: 'Pages/RequestPage',
    component: RequestPage,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof RequestPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <MemoryRouter>
            <RequestPage />
        </MemoryRouter>
    ),
};
