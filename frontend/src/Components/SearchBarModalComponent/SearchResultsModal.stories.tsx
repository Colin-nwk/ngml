import type { Meta, StoryObj } from '@storybook/react';
import SearchResultsModal from './SearchResultsModal';

const meta: Meta<typeof SearchResultsModal> = {
    title: 'Components/SearchResultsModal',
    component: SearchResultsModal,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        searchResults: { control: 'object' },
        onClose: { action: 'closed' },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithResults: Story = {
    args: {
        searchResults: [
            { userName: 'John Rose', userId: 15443939, indexedDate: '2021-01-01', status: 'Active', dateLabel: 'Date', idLabel: 'ID' },
            { userName: 'Jane Smith', userId: 2388399, indexedDate: '2021-02-02', status: 'Processing', dateLabel: 'Date', idLabel: 'ID' },
            { userName: 'Emily Johnson', userId: 3202838, indexedDate: '2021-03-03', status: 'Approved', dateLabel: 'Date', idLabel: 'ID' },
        ],
        onClose: () => console.log('Modal closed'),
    },
};

export const NoResults: Story = {
    args: {
        searchResults: [],
        onClose: () => console.log('Modal closed'),
    },
};
