import type { Meta, StoryObj } from '@storybook/react';
import DailyVolumnTable from './DailyVolumnTable';

const meta: Meta<typeof DailyVolumnTable> = {
    title: 'Tables/DailyVolumnTable',
    component: DailyVolumnTable,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {};
