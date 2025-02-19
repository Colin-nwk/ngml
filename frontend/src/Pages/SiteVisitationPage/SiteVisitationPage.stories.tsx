
import { Meta, StoryObj } from '@storybook/react';
import SiteVisitationPage from './SiteVisitationPage';

const meta: Meta = {
    title: 'Pages/SiteVisitationPage',
    component: SiteVisitationPage,
    parameters: {
    },
    argTypes: {
    },
} satisfies Meta<typeof SiteVisitationPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <SiteVisitationPage />,
};
