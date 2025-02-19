
import { Meta, StoryObj } from '@storybook/react';
import SupplierProfileDetails from './SupplierProfileDetails';

const meta: Meta = {
    title: 'Pages/SupplierProfileDetails',
    component: SupplierProfileDetails,
    parameters: {
    },
    argTypes: {
    },
} satisfies Meta<typeof SupplierProfileDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <SupplierProfileDetails />,
};
