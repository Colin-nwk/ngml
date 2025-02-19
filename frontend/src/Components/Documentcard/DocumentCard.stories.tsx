import { Meta, StoryObj } from '@storybook/react';
import DocumentCard from './DocumentCard';
import images from '@/assets';


const meta: Meta = {
  title: 'Components/DocumentCard',
  component: DocumentCard,
  parameters: {
    layout: 'centered'
  }, tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['withoutLink', 'withLink', 'withReport'],
      },
    },
    icon: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    linkText: { control: 'text' },
    linkText2: { control: 'text' },
  },

} satisfies Meta<typeof DocumentCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithoutLink: Story = {
  args: {
    type: 'withoutLink',
    icon: <img src={images.copy} alt='icon' />,
    title: 'Document Title',
    subtitle: 'Document Subtitle',
  },
};

export const WithLink: Story = {
  args: {

    type: 'withLink',
    icon: <img src={images.greenicon} alt='icon' />,
    title: 'Document Title',
    linkText: 'Link Text',
    linkText2: 'Link Text 2',
  },
};

export const WithReport: Story = {
  args: {
    type: 'withReport',
    icon: <img src={images.customers} alt='icon' />,
    title: 'Document Title',
  },
};