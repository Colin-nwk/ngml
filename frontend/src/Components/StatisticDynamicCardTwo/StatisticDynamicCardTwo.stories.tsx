import { Meta, StoryObj } from '@storybook/react';
import StatisticDynamicCardTwo from './StatisticDynamicCardTwo';
import business from 'src/assets/images/png-icons/Business.png';

const meta: Meta = {
    title: 'Components/StatisticDynamicCardTwo',
    component: StatisticDynamicCardTwo,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: ['primary', 'secondary'],
            },
        },
        icon: { control: { disable: true } },
        value: { control: { type: 'number' } },
        yearOptions: { control: { type: 'array' } },
        content: { control: { type: 'text' } },
        subcontent: { control: { type: 'text' } },
        className: { control: { type: 'text' } },
        contentColor: { control: { type: 'color' } },
        subcontentColor: { control: { type: 'color' } },
        valueColor: { control: { type: 'color' } },
        iconColor: { control: { type: 'color' } },
        yearColor: { control: { type: 'color' } },
    },
} satisfies Meta<typeof StatisticDynamicCardTwo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        type: 'primary',
        icon: <img src={business} alt='icon' />,
        value: 123,
        yearOptions: [2021, 2022, 2023],
        content: 'Consumed Volume',
        subcontent: '(scf)',
    },
}

export const Secondary: Story = {
    args: {
        type: 'secondary',
        icon: <img src={business} alt='icon' />,
        value: 456,
        yearOptions: [2021, 2022, 2023],
        content: 'Yesterday Consumed Volume',
        subcontent: '(scf)',
    },
};
