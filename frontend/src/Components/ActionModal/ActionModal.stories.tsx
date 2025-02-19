import { Meta, StoryObj } from '@storybook/react';
import ActionModal from './ActionModal';

const meta: Meta<typeof ActionModal> = {
    title: 'Components/ActionModal',
    component: ActionModal,

    argTypes: {
        isOpen: {
            control: { type: 'boolean' },
        },
        onClose: {
            action: 'closed',
        },
        size: {
            control: { type: 'select', options: ['small', 'medium', 'large'] },
        },
        title: { control: 'text' },
        subTitle: { control: 'text' },
        button: { control: 'node' },
    },

} satisfies Meta<typeof ActionModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        isOpen: true,
        onClose: () => { },
        size: 'medium',
        title: 'Example Modal',
        subTitle: 'This is a subtitle',
        button: <button className="bg-green-500 text-white px-4 py-2 rounded">Close</button>,
    },
};

export const SmallSize: Story = {
    args: {
        isOpen: true,
        size: 'small',
        title: 'Small Size Modal',
        button: <button className="bg-blue-500 text-white px-4 py-2 rounded">Close</button>,
    },
};

export const LargeSize: Story = {
    args: {
        isOpen: true,
        size: 'large',
        title: 'Large Size Modal',
        subTitle: 'This is a larger modal',
        button: <button className="bg-red-500 text-white px-4 py-2 rounded">Close</button>,
    },
};

export const WithoutSubtitle: Story = {
    args: {
        isOpen: true,
        size: 'medium',
        title: 'Modal without subtitle',
        button: <button className="bg-purple-500 text-white px-4 py-2 rounded">Close</button>,
    },
};