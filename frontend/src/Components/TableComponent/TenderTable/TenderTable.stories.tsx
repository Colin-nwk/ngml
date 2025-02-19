import type { Meta, StoryObj } from '@storybook/react';
import TenderTable from './TenderTable';

const meta: Meta<typeof TenderTable> = {
    title: 'Tables/TenderTable',
    component: TenderTable,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {};
