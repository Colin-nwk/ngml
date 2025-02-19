import type { Meta, StoryObj } from '@storybook/react';
import AgreementTemplate from './AgreementTemplate';
import { AddCircleOutline } from '@mui/icons-material';

const meta: Meta<typeof AgreementTemplate> = {
    title: 'Components/AgreementTemplate',
    component: AgreementTemplate,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        icon: { control: false }, 
        heading: { control: 'text' },
        title: { control: 'text' },
        modalTitle: { control: 'text' },
        modalContent: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        icon: <AddCircleOutline />,
        heading: 'Addendum',
        title: 'Agreement',
        modalTitle: 'Agreement Samples',
        modalContent: 'Here are the details of your basic agreement...',
    }
};

export const WithCustomContent: Story = {
    args: {
        icon: <AddCircleOutline />,
        heading: 'Supplement',
        title: 'Agreement',
        modalTitle: 'Custom Agreement Terms',
        modalContent: (<div><p>This is a custom agreement with special terms. Please read carefully.</p></div>),
    }
};
