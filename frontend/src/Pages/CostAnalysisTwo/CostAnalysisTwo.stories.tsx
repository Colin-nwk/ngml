import { Meta, StoryObj } from '@storybook/react';
import CostAnalysisTwo from './CostAnalysisTwo';

const meta: Meta = {
    title: 'Pages/CostAnalysisTwo',
    component: CostAnalysisTwo,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof CostAnalysisTwo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
