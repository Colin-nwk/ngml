import { Meta, StoryObj } from '@storybook/react';
import ConnectProject from './ConnectProject';

const meta: Meta = {
    title: 'Pages/ConnectProject',
    component: ConnectProject,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof ConnectProject>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
