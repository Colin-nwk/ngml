import type { Meta, StoryObj } from '@storybook/react';
import NavigationBar from './NavigationBar';

const meta = {

    title: 'Components/NavigationBar',
    component: NavigationBar,
    parameters: {
        layout: 'start',
    },
    tags: ['autodocs'],

    argTypes: {
        Navigationlinks: { control: 'object' },
        sliceLength: { control: { type: 'number', required: false } },
        isNavigationBarVisible: {control: 'boolean'},


    },
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        Navigationlinks: [
            {
                id: 1,
                name: 'Home',
                to: '/',
                icon: '../../../public/assets/png-icons/Home.png',
                type: 'primary'
            },
            {
                id: 2,
                name: 'Manger',
                to: '/profile',
                icon: '../../../public/assets/png-icons/Invoice.png',
                type: 'primary'
            },
            {
                id: 3,
                name: 'Record',
                to: '/profile',
                icon: '../../../public/assets/png-icons/Records.png',
                type: 'primary'
            },
            {
                id: 4,
                name: 'Report',
                to: '/profile',
                icon: '../../../public/assets/png-icons/Reports.png',
                type: 'primary'
            },
            {
                id: 5,
                name: 'Communication',
                to: '/profile',
                icon: '../../../public/assets/png-icons/Communication.png',
                type: 'primary'
            },
        ],
        isNavigationBarVisible: true,
        // sliceLength: 7
    },
};

export const Secondary: Story = {
    args: {
        Navigationlinks: [
            {
                id: 1,
                name: 'Home',
                to: '/',
                icon: '../../../public/assets/png-icons/Home.png',
                type: 'secondary',
                subMenu: [
                    {
                        id: 1, name: 'Forte oil',
                        to: '/customer/customerbusinesspage',
                        icon: '../../../public/assets/png-icons/Invoice.png',
                        type: 'primary'
                    },
                    { 
                        id: 2, 
                        name: 'Dangote', 
                        to: '/customer/customerbusinesspage', 
                        icon: '../../../public/assets/png-icons/Home.png',
                        type: 'primary' 
                    },
                    { 
                        id: 3, name: 'Shaffa', 
                        to: '/customer/customerbusinesspage', 
                        icon: '../../../public/assets/png-icons/Home.png', 
                        type: 'primary' }
                ]
            },
            {
                id: 2,
                name: 'Manger',
                to: '/profile',
                icon: '../../../public/assets/png-icons/Invoice.png',
                type: 'primary'
            },
            {
                id: 3,
                name: 'Record',
                to: '/profile',
                icon: '../../../public/assets/png-icons/Records.png',
                type: 'secondary',
                subMenu: [
                    {
                        id: 1, name: 'Forte oil',
                        to: '/customer/customerbusinesspage',
                        icon: '../../../public/assets/png-icons/Invoice.png',
                        type: 'primary'
                    },
                    { 
                        id: 2, 
                        name: 'Dangote', 
                        to: '/customer/customerbusinesspage', 
                        icon: '../../../public/assets/png-icons/Home.png',
                        type: 'primary' 
                    },
                    { 
                        id: 3, name: 'Shaffa', 
                        to: '/customer/customerbusinesspage', 
                        icon: '../../../public/assets/png-icons/Home.png', 
                        type: 'primary' }
                ]
            },
            {
                id: 4,
                name: 'Communication',
                to: '/profile',
                icon: '../../../public/assets/png-icons/Communication.png',
                type: 'primary'
            },
            {
                id: 5,
                name: 'Report',
                to: '/profile',
                icon: '../../../public/assets/png-icons/Records.png',
                type: 'secondary',
                subMenu: [
                    {
                        id: 1, name: 'Forte oil',
                        to: '/customer/customerbusinesspage',
                        icon: '../../../public/assets/png-icons/Invoice.png',
                        type: 'primary'
                    },
                    { 
                        id: 2, 
                        name: 'Dangote', 
                        to: '/customer/customerbusinesspage', 
                        icon: '../../../public/assets/png-icons/Home.png',
                        type: 'primary' 
                    },
                    { 
                        id: 3, name: 'Shaffa', 
                        to: '/customer/customerbusinesspage', 
                        icon: '../../../public/assets/png-icons/Home.png', 
                        type: 'primary' }
                ]
            },
            {
                id: 6,
                name: 'Manger',
                to: '/profile',
                icon: '../../../public/assets/png-icons/Invoice.png',
                type: 'primary'
            },
        ],
        sliceLength: 4,
        isNavigationBarVisible: true,

    },
};

export const Tertiary: Story = {
    args: {
        Navigationlinks: [
            {
                id: 1,
                name: 'Home',
                to: '/',
                icon: '../../../public/assets/png-icons/Home.png',
                type: 'primary'
            },
            {
                id: 2,
                name: 'Manger',
                to: '/profile',
                icon: '../../../public/assets/png-icons/Invoice.png',
                type: 'primary'
            },
            {
                id: 3,
                name: 'Record',
                to: '/profile',
                icon: '../../../public/assets/png-icons/Records.png',
                type: 'primary'
            },
            {
                id: 4,
                name: 'Report',
                to: '/profile',
                icon: '../../../public/assets/png-icons/Reports.png',
                type: 'primary'
            },
           
        ],
        sliceLength: 2,
        isNavigationBarVisible: true,
    },
};


