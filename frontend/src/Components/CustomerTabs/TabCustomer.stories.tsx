import { Meta, StoryObj } from '@storybook/react';
import TabCustomer from './TabCustomer';
import { action } from '@storybook/addon-actions';

const meta: Meta = {
  title: 'Components/TabCustomer',
  component: TabCustomer,
  argTypes: {

  },
}satisfies Meta<typeof TabCustomer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeTab: 'default',
  setActiveTab: action('setActiveTab'),
  tablist: [
    {
      name: 'Tab 1',
      ref: 'tab1',
      children: [
        { name: 'Child 1', ref: 'child1' },
        { name: 'Child 2', ref: 'child2' },
      ],
    },
    {
      name: 'Tab 2',
      ref: 'tab2',
    },
  ],
  tabContent: {
    tab1: <div>Tab 1 Content</div>,
    tab2: <div>Tab 2 Content</div>,
    child1: <div>Child 1 Content</div>,
    child2: <div>Child 2 Content</div>,
  },
  },
};