
import type { Meta, StoryObj } from '@storybook/react';
import EoiRequestTemplate from './EoiRequestTemplate';

const meta: Meta<typeof EoiRequestTemplate> = {
    title: 'Components/EoiRequestTemplate',
    component: EoiRequestTemplate,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        dateTime: { control: 'text' },
        status: { control: 'select', options: ['New', 'Approved', 'Disapproved', 'Pending'] },
        companyName: { control: 'text' },
        companyEmail: { control: 'text' },
        companyNumber: { control: 'text' },
        statusHeading: { control: 'text' },
        statusStyle: { control: 'object' },
        approverName: { control: 'text' },
        disapprovalReason: { control: 'text' },
        handleClose: { action: 'handleClose' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NewRequest: Story = {
    args: {
        dateTime: '2023-04-01 10:00 AM',
        status: 'New',
        companyName: 'Example Company',
        companyEmail: 'example@example.com',
        companyNumber: '123456789',
        statusHeading: 'New',
        statusStyle: { backgroundColor: 'lightgreen' },
        approverName: '',
        disapprovalReason: '',
        handleClose: () => alert('Close button clicked'),
    },
};

export const ApprovedRequest: Story = {
    args: {
        ...NewRequest.args,
        status: 'Approved',
        approverName: 'John Doe',
    },
};

export const DisapprovedRequest: Story = {
    args: {
        ...NewRequest.args,
        status: 'Disapproved',
        disapprovalReason: 'Insufficient details provided.',
    },
};

export const PendingRequest: Story = {
    args: {
        ...NewRequest.args,
        status: 'Pending',
    },
};
