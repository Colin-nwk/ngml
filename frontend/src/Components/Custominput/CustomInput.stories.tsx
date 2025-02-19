import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import CustomInput from './CustomInput';

const meta: Meta = {
    title: 'Components/CustomInput',
    component: CustomInput,
    argTypes: {
        type: { control: 'select', options: ['text', 'password', 'date', 'number', 'select', 'textarea', 'checkbox', 'radio'] },
        label: { control: 'text' },
        value: { control: 'text' },
        handleChangeEvent: { action: 'onChange' },
        placeholder: { control: 'text' },
        options: { control: 'array' },
        required: { control: 'boolean' },
        icon: { control: 'text' },
        styleVariant: { control: 'select', options: ['default', 'customStyle1', 'customStyle2', 'customStyle3', 'customStyle4'] },
    },
} satisfies Meta<typeof CustomInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        type: 'text',
        label: 'Username',
        value: '',
        onChange: action('onChange'),
        placeholder: 'Enter your username',
        required: true,
    },
};

export const PasswordInput: Story = {
    args: {
        type: 'password',
        label: 'Password',
        value: '',
        onChange: action('onChange'),
        placeholder: 'Enter your password',
        required: true,
    },
};

export const CheckboxInput: Story = {
    args: {
        type: 'checkbox',
        label: 'Agree to Terms',
        value: false,
        onChange: action('onChange'),
        required: true,
    },
};

export const TextareaInput: Story = {
    args: {
        type: 'textarea',
        label: 'Comments',
        value: '',
        onChange: action('onChange'),
        placeholder: 'Enter your comments',
        required: true,
    },
};

export const SelectInput: Story = {
    args: {
        type: 'select',
        label: 'Country',
        value: '',
        onChange: action('onChange'),
        placeholder: 'Select your country',
        options: ['USA', 'Canada', 'UK', 'Australia'],
        required: true,
    },
};

export const RadioInput: Story = {
    args: {
        type: 'radio',
        label: 'Gender',
        value: '',
        onChange: action('onChange'),
        options: ['Male', 'Female', 'Other'],
        required: true,
    },
};