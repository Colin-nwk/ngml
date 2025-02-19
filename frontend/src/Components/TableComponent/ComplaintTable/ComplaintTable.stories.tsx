import type { Meta, StoryObj } from '@storybook/react';
import ComplaintTable from './ComplaintTable';

const meta: Meta<typeof ComplaintTable> = {
    title: 'Tables/ComplaintTable',
    component: ComplaintTable,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {};
