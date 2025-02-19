import { Meta, StoryObj } from '@storybook/react';
import TopNavigationBar from './TopNavigationBar';

const meta: Meta<typeof TopNavigationBar> = {
    title: 'Components/TopNavigationBar',
    component: TopNavigationBar,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        logoSrc: { control: 'text' },
    },
} satisfies Meta<typeof TopNavigationBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        logoSrc: '../../assets/images/CompanyLogo.png',
    },
};
