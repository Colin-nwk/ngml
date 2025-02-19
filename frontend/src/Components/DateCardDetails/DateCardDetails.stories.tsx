import images from '@/assets';
import { Meta, StoryObj } from '@storybook/react';
import DateCardDetails from './DateCardDetails';


const meta: Meta = {
    title: 'Components/DateCardDetails',
    component: DateCardDetails,
    parameters: {
        layout: 'centered'
    }, tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['withCompany', 'withoutCompany'],
        },
        day: {
            control: { type: 'text' },
        },
        to: {
            control: { type: 'text' },
        },
        month: {
            control: { type: 'text' },
        },
        year: {
            control: { type: 'text' },
        },
        dateRange: {
            control: { type: 'text' },
        },
        company: {
            control: { type: 'text' },
        },
        distance: {
            control: { type: 'text' },
        },
        text: {
            control: { type: 'text' },
        },
        contractor: {
            control: { type: 'text' },
        },
        icon1: {
            control: { type: 'element' },
        },
        icon2: {
            control: { type: 'element' },
        },
        width: {
            control: { type: 'text' },
        },
        height: {
            control: { type: 'text' },
        },
        backgroundColor: {
            control: { type: 'text' },
        },
    },

} satisfies Meta<typeof DateCardDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithCompany: Story = {
    args: {
        type: 'withCompany',
        day: '15',
        to: 'to',
        month: 'July',
        year: '2024',
        dateRange: '15-20',
        company: 'Company ABC',
        distance: '5 km',
        text: 'Some text',
        contractor: 'John Doe',
        icon1: <img src={images.Businessicon} alt='icon' />,
        icon2: <img src={images.zone} alt='icon' />,
        width: '300px',
        height: '400px',
        backgroundColor: 'bg-gray-100',
    },
};

export const withoutCompany: Story = {
    args: {

        type: 'withoutCompany',
        day: '15',
        month: 'July',
        year: '2024',
        company: 'Company ABC',
        distance: '5 km',
        icon1: <img src={images.Businessicon} alt='icon' />,
        icon2: <img src={images.filterIcon} alt='icon' />,
        width: '300px',
        height: '400px',
        backgroundColor: 'bg-gray-100',
    },
};
