import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import DailyFrequencyTable from './DailyFrequencyTable';


const meta: Meta<typeof DailyFrequencyTable> = {
    title: 'Tables/DailyFrequencyTable',
    component: DailyFrequencyTable,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {
    render: () => (
        <MemoryRouter>
            <DailyFrequencyTable />
        </MemoryRouter>
    ),
};

