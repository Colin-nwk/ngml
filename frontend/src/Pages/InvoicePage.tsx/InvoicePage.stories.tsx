import { Meta, StoryObj } from '@storybook/react';
import InvoicePage from './InvoicePage';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta = {
    title: 'Pages/InvoicePage',
    component: InvoicePage,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof InvoicePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {
    render: () => (
        <MemoryRouter>
            <InvoicePage />
        </MemoryRouter>
    ),
};
;
