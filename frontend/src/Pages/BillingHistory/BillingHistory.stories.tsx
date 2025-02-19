import { Meta, StoryObj } from '@storybook/react';
import BillingHistory from './BillingHistory';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta = {
    title: 'Pages/BillingHistory',
    component: BillingHistory,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof BillingHistory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {
    render: () => (
        <MemoryRouter>
            <BillingHistory />
        </MemoryRouter>
    ),
};
;
