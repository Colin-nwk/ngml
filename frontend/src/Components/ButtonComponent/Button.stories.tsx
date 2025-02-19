import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import sendIcon from '../../../public/assets/png-icons/SendIcon.png'
import uploadIcon from '../../../public/assets/png-icons/UploadIcon.png'
import { HighlightOffOutlined } from '@mui/icons-material';



const meta = {

    title: 'Components/ButtonComponent',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'icon', 'outline', 'transparent'] },
        label: { control: 'text' },
        action: { action: 'onClick' },
        disabled: { control: 'boolean' },
        icon: { control: 'text' },
        iconPosition: { control: 'select', options: ['left', 'right'] },
        iconWidth: { control: 'text' },
        iconHeight: { control: 'text' },
        iconColor: { control: 'color' },
        width: { control: 'text' },
        height: { control: 'text' },
        fontSize: { control: 'text' },
        radius: { control: 'text' },
        fontWeight: { control: 'text' },
        underline: { control: 'boolean' },
        columnGap: { control: 'text' },
        lineHeight: { control: 'text' },
        textDecoration: { control: 'text' },
        color: { control: 'color' },
        fontStyle: { control: 'text' },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        type: 'primary',
        label: 'Confirm',
        width: '480px',
        height: '48px',
        fontSize: '16px',
        radius: '32px',
        fontWeight: '400',
        lineHeight: '24px',
        action: () => console.log('Comfirmed'),
    },
};

export const Secondary: Story = {
    args: {
        type: 'secondary',
        label: 'Send Email',
        width: '220px',
        height: '48px',
        fontSize: '16px',
        radius: '32px',
        fontWeight: '400',
        lineHeight: '24px',
        icon: <div><img src={sendIcon} alt="send Icon" /></div>,
        columnGap: '10px',
        action: () => console.log('Email Sent'),
    },
};

export const Transparent: Story = {
    args: {
        type: 'transparent',
        label: 'Forgot Password?',
        lineHeight: '12px',
        fontWeight: '400',
        color: '#49526A',
        fontStyle: 'italic',
        textDecoration: 'underline',
        action: () => console.log('Sent'),
    },
};

export const Outline: Story = {
    args: {
        type: 'outline',
        label: 'Cancel',
        width: '102px',
        height: '32px',
        fontSize: '12px',
        radius: '32px',
        color: '#49526A',
        fontWeight: '400',
        lineHeight: '24px',
        action: () => console.log('Cancel'),
    },
};

export const Tertiary: Story = {
    args: {
        type: 'tertiary',
        label: 'Upload Data Sheet',
        width: '193px',
        height: '32px',
        radius: '32px',
        color: '#49526A',
        fontWeight: '400',
        lineHeight: '24px',
        icon: <div><img src={uploadIcon} alt="send Icon" /></div>,
        iconColor: 'red',
        columnGap: '10px',
        action: () => console.log('Cancel'),
    },
};

export const Icon: Story = {
    args: {
        type: 'icon',
        icon: <div><HighlightOffOutlined /></div>,
        height: '80px',
        width: '80px',
        radius: '100%',
        iconColor: '#E2E4EB'

    },
}