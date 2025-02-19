import type { Meta, StoryObj } from '@storybook/react';
import BidsTable from './BidsTable';

const meta: Meta<typeof BidsTable> = {
    title: 'Tables/BidsTable',
    component: BidsTable,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

const mockTenderData = [
    {
        id: 1,
        companyname: 'Company A',
        companyType: 'LLC',
        selectedDates: ['2023-01-10', '2023-01-12'],
        status: 'Pending',
        action: 'View',
        deadline: '2023-01-15',
        companyEmail: 'contact@companya.com',
        companyNumber: '123-456-7890',
        companyAddress: '123 Main St, City, Country',
        details: [
            { type: 'Type1', type2: 'SubTypeA', dept: 'Department1' },
            { type: 'Type2', type2: 'SubTypeB', dept: 'Department2' }
        ]
    },
    {
        id: 2,
        companyname: 'Company B',
        companyType: 'Corporation',
        selectedDates: ['2023-02-05', '2023-02-07'],
        status: 'Approved',
        action: 'View',
        deadline: '2023-02-10',
        companyEmail: 'info@companyb.net',
        companyNumber: '098-765-4321',
        companyAddress: '456 Another Rd, Another City, Country',
        details: [
            { type: 'Type3', type2: 'SubTypeC', dept: 'Department3' },
            { type: 'Type4', type2: 'SubTypeD', dept: 'Department4' }
        ]
    }
];

export const DefaultView: Story = {
    args: {
        dataPropName: mockTenderData,
    },
};

export const EmptyState: Story = {
    args: {
        dataPropName: [],
    },
};
