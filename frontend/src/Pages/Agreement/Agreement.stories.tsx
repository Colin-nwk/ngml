import { Meta, StoryObj } from '@storybook/react';
import Agreement from './Agreement';

const meta: Meta = {
    title: 'Pages/Agreement',
    component: Agreement,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof Agreement>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
