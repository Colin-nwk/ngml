import type { Meta, StoryObj } from '@storybook/react';
import Cancelicon from '../../../public/assets/Cancelicon.png';
import Badge from './Badge';


const meta = {

    title: 'Components/BadgeComponent',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: { control: 'select', options: ['primary', 'secondary', 'transparent', 'outline'] },
        label: { control: 'text' },
        width: { control: 'text' },
        height: { control: 'text' },
        fontSize: { control: 'text' },
        radius: { control: 'text' },
        fontWeight: { control: 'text' },
        icon: { control: 'text' },
        iconHeight: { control: 'text' },
        iconWidth: { control: 'text' },
        iconColor: { control: 'color' },
        columnGap: { control: 'text' },
        onIconClick: { action: 'onIconClick' },
    },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        type: 'primary',
        label: 'Dangote sugar',
        width: '130px',
        height: '40px',
        fontSize: '16px',
        radius: '8px',
        fontWeight: 'bold',
    },
};

export const Secondary: Story = {
    args: {
        type: 'secondary',
        label: 'Approved',
        width: '150px',
        height: '40px',
        fontSize: '16px',
        radius: '20px',
        fontWeight: 'bold',
    },
};

export const Transparent: Story = {
    args: {
        type: 'transparent',
        label: 'Dangote sugar',
        width: '170px',
        height: '40px',
        fontSize: '16px',
        radius: '20px',
        fontWeight: 'bold',
        icon: <div><img src={Cancelicon} alt="Cancel Icon" /></div>,
        iconHeight: '20px',
        iconWidth: '20px',
        iconColor: '#333',
        columnGap: '8px',
        onIconClick: () => console.log('Icon clicked'),
    },
};

export const Outline: Story = {
    args: {
        type: 'outline',
        label: 'Dangote sugar',
        width: '170px',
        height: '40px',
        fontSize: '16px',
        radius: '4px',
        fontWeight: 'bold',
        icon: <div><img src={Cancelicon} alt="Cancel Icon" /></div>,
        iconHeight: '20px',
        iconWidth: '20px',
        iconColor: '#333',
        columnGap: '8px',
        onIconClick: () => console.log('Icon clicked'),

    },
};