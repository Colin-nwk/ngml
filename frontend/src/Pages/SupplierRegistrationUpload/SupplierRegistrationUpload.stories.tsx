
import { Meta, StoryObj } from '@storybook/react';
import SupplierRegistrationUpload from './SupplierRegistrationUpload';

const meta: Meta = {
    title: 'Pages/SupplierRegistrationUpload',
    component: SupplierRegistrationUpload,
    parameters: {
    },
    argTypes: {
    },
} satisfies Meta<typeof SupplierRegistrationUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <SupplierRegistrationUpload />,
};
