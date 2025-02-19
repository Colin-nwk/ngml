import { Meta, StoryObj } from '@storybook/react';
import SearchInput from './SearchInput';

const meta: Meta = {
    title: 'Components/SearchInput',
    component: SearchInput,
    parameters: {
        layout: 'centered'
    }, tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
        onSearch: { action: 'searched' },
    },

} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onSearch: (query: string) => {
            console.log('Search query:', query);
        },
        placeholder: 'Search...',
    },
};
