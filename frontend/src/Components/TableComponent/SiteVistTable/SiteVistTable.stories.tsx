// SelectedDateTable.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import SelectedDateTable from './SiteVistTable';

const meta: Meta<typeof SelectedDateTable> = {
    title: 'Tables/SelectedDateTable',
    component: SelectedDateTable,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        tableData: { control: 'object' },
        onRowClick: { action: 'rowClicked' },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {
    args: {
        tableData: [
            { date: '2021-01-01', event: 'Event 1', status: 'Completed' },
            { date: '2021-02-02', event: 'Event 2', status: 'Pending' },
            { date: '2021-03-03', event: 'Event 3', status: 'InProgress' },
        ],
        onRowClick: () => console.log('Row clicked'),
    },
};

export const EmptyTable: Story = {
    args: {
        tableData: [],
        onRowClick: () => console.log('Row clicked'),
    },
};
