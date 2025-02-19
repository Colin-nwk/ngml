import { Meta, StoryObj } from '@storybook/react';
import PortalEnrollment from './PortalEnrollment';

const meta: Meta = {
    title: 'Pages/PortalEnrollment',
    component: PortalEnrollment,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof PortalEnrollment>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        email: 'example@example.com',
    },
};
