
import { Meta, StoryObj } from '@storybook/react';
import SupplierInformation from './SupplierInformation';

const meta: Meta = {
    title: 'Pages/SupplierInformation',
    component: SupplierInformation,
    parameters: {
    },
    argTypes: {
    },
} satisfies Meta<typeof SupplierInformation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <SupplierInformation />,
};
