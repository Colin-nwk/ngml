
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import DailyVolumnHistoryTable from './DailyVolumnHistoryTable';


const meta: Meta<typeof DailyVolumnHistoryTable> = {
    title: 'Tables/DailyVolumnHistoryTable',
    component: DailyVolumnHistoryTable
    ,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {
    render: () => (
        <MemoryRouter>
            <DailyVolumnHistoryTable />
        </MemoryRouter>
    ),
};



