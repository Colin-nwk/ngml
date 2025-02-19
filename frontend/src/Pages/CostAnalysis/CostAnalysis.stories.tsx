import { Meta, StoryObj } from '@storybook/react';
import CostAnalysis from './CostAnalysis';

const meta: Meta = {
    title: 'Pages/CostAnalysis',
    component: CostAnalysis,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof CostAnalysis>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
