import { Meta, StoryObj } from '@storybook/react';
import DdqPage from './DdqPage';

const meta: Meta = {
    title: 'Pages/DdqPage',
    component: DdqPage,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof DdqPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
