import { Meta, StoryObj } from '@storybook/react';
import BidPage from './BidPage';
import { MemoryRouter } from 'react-router-dom';


const meta: Meta = {
    title: 'Pages/BidPage',
    component: BidPage,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof BidPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <MemoryRouter>
            <BidPage />
        </MemoryRouter>
    ),
};
