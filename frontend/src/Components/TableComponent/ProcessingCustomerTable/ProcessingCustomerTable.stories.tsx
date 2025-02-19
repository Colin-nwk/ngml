import type { Meta, StoryObj } from '@storybook/react';
import ProcessingCustomerTable from './ProcessingCustomerTable';

const meta: Meta<typeof ProcessingCustomerTable> = {
    title: 'Tables/ProcessingCustomerTable',
    component: ProcessingCustomerTable,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {};
