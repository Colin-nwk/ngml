import { Meta, StoryObj } from '@storybook/react';
import Complaints from './Complaints';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta = {
    title: 'Pages/Complaints',
    component: Complaints,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof Complaints>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {
    render: () => (
        <MemoryRouter>
            <Complaints />
        </MemoryRouter>
    ),
};
;
