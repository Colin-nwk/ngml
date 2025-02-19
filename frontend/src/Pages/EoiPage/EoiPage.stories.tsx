
import { Meta, StoryObj } from '@storybook/react';
import EoiPage from './EoiPage';

const meta: Meta = {
    title: 'Pages/EoiPage', 
    component: EoiPage,
    parameters: {
    },
    argTypes: {
    },
} satisfies Meta<typeof EoiPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <EoiPage />, 
};
