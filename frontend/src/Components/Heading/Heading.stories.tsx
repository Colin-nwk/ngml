// Heading.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Heading from './Heading';

const meta: Meta<typeof Heading> = {
    title: 'Components/Heading',
    component: Heading,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const H1: Story = {
    args: {
        as: 'h1',
        size: 'h1',
        children: 'This is an H1 Heading',
    },
};

export const H2: Story = {
    args: {
        as: 'h2',
        size: 'h2',
        children: 'This is an H2 Heading',
    },
};

export const H3: Story = {
    args: {
        as: 'h3',
        size: 'h3',
        children: 'This is an H3 Heading',
    },
};

export const H4: Story = {
    args: {
        as: 'h4',
        size: 'h4',
        children: 'This is an H4 Heading',
    },
};

export const H5: Story = {
    args: {
        as: 'h5',
        size: 'h5',
        children: 'This is an H5 Heading',
    },
};

export const H6: Story = {
    args: {
        as: 'h6',
        size: 'h6',
        children: 'This is an H6 Heading',
    },
};

export const Paragraph: Story = {
    args: {
        as: 'p',
        size: 'p',
        children: 'This is a paragraph',
    },
};
export const DIV: Story = {
    args: {
        as: 'div',
        size: 'h1',
        children: 'This is a Div',
    },
};
export const SPAN: Story = {
    args: {
        as: 'span',
        size: 'small',
        children: 'This is a span',
    },
};

export const WithCustomStyles: Story = {
    args: {
        as: 'h3',
        size: 'h3',
        className: 'text-blue-500',
        children: 'This is an H3 Heading with custom styles',
    },
};

export const WithTextElements: Story = {
    args: {
        as: 'h2',
        size: 'h2',
        children: (
            <>
                This is a heading with <span>a span</span> and <p>a paragraph</p>
            </>
        ),
    },
};