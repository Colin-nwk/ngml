import { Meta, StoryObj } from '@storybook/react';
import AuthContainer from './AuthContainer';

const meta: Meta = {
    title: 'Components/AuthContainer',
    component: AuthContainer,
    parameters: {
        layout: 'centered'
    }, tags: ['autodocs'],
    argTypes: {
        backgroundcolor: { control: 'color' },
        width: { control: 'text' },
        height: { control: 'text' },
        children: {control: 'text'}
    },

} satisfies Meta<typeof AuthContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <p>Content goes here</p>,
    },
}