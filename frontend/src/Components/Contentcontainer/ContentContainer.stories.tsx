import { Meta, StoryObj } from '@storybook/react';
import ContentContainer from './ContentContainer';

const meta: Meta = {
  title: 'Components/ContentContainer',
  component: ContentContainer,
  argTypes: {

  },
}satisfies Meta<typeof ContentContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Translucent: Story = {
  args: {
    type: 'translucent',
  },
};

export const White: Story = {
  args: {
    type: 'white',
  },
};

export const Dashes: Story = {
  args: {
    type: 'dashes',
  },
};

export const Solid: Story = {
  args: {
    type: 'solid',
  },
};

export const CustomStyles: Story = {
  args: {
    type: 'solid',
    width: '200px',
    height: '150px',
    borderRadius: 10,
  },
};