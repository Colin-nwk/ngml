import type { Meta, StoryObj } from '@storybook/react';
import FeedbackTable from './FeedbackTable';

const meta: Meta<typeof FeedbackTable> = {
    title: 'Tables/FeedbackTable',
    component: FeedbackTable,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {};
