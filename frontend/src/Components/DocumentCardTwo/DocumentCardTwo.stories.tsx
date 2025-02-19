import images from '@/assets';
import { Meta, StoryObj } from '@storybook/react';
import DocumentCardTwo from './DocumentCardTwo';


const meta: Meta = {
    title: 'Components/DocumentCardTwo',
    component: DocumentCardTwo,
    parameters: {
        layout: 'centered'
    }, tags: ['autodocs'],
    argTypes: {
        icon: { control: 'element' },
        title: { control: 'text' },
        subtitle: { control: 'text' },
        buttonText: { control: 'text' },
        width: { control: 'text' },
        height: { control: 'text' },

    },

} satisfies Meta<typeof DocumentCardTwo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        icon: <img src={images.copy} alt='icon' />,
        title: 'Document Title',
        subtitle: 'Document Subtitle',
        buttonText: 'View',
        width: 200,
        height: 150,
    },
};

export const HoverEffect: Story = {
    args: {
        icon: <img src={images.copy} alt='icon' />,
        title: 'Hover over me',
        subtitle: 'See what happens',
        buttonText: 'Open',
        width: 250,
        height: 150,
    },
};