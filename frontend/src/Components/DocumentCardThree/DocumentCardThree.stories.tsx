import images from '@/assets';
import { Meta, StoryObj } from '@storybook/react';
import DocumentCardThree from './DocumentCardThree';


const meta: Meta = {
    title: 'Components/DocumentCardThree',
    component: DocumentCardThree,
    parameters: {
        layout: 'centered'
    }, tags: ['autodocs'],
    argTypes: {
        icon: { control: 'object' },
        title: { control: 'text' },
        subtitle: { control: 'text' },
        linkText: { control: 'text' },
        linkText2: { control: 'text' },
        width: { control: 'text' },
        height: { control: 'text' },
    },

} satisfies Meta<typeof DocumentCardThree>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        icon: <img src={images.copy} alt='icon' />,
        title: 'Document Title',
        subtitle: 'Document Subtitle',
        linkText: 'Link Text',
        linkText2: 'Link Text 2',
    },
};

export const WithoutSubtitleAndLinkText: Story = {
    args: {

        icon: <img src={images.copy} alt='icon' />,
        title: 'Document Title',
        linkText2: 'Link Text 2',
    },
};

export const CustomDimensions: Story = {
    args: {
        icon: <img src={images.copy} alt='icon' />,
        title: 'Document Title',
        subtitle: 'Document Subtitle',
        linkText: 'Link Text',
        linkText2: 'Link Text 2',
        width: '300px',
        height: '400px',
    },
};