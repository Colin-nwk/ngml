import { Meta, StoryObj } from '@storybook/react';
import FileUploadInput from '../Fileuploadinput/FileUploadInput';
import Modal from './Modal';

const meta: Meta = {
    title: 'Components/Modal',
    component: Modal,

    argTypes: {
        isOpen: {
            control: { type: 'boolean' },
        },
        onClose: {
            action: 'closed',
        },
        size: {
            control: { type: 'select', options: ['small', 'medium', 'large'] },
        },
        title: { control: 'text' },
        subTitle: { control: 'text' },
        children: { control: <div></div> },
        buttons: { control: { disable: true } },
    },

} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        isOpen: true,
        onClose: () => { },
        title: 'Example Modal',
        subTitle: 'This is a subtitle',
        children: <FileUploadInput
            maxSizeMB={1}
            required title="Passport Photograph"
            fileDescription='Scan the copy of your original document (pdf, png, jpg)'
        />,
        buttons: [<button key="1">Button 1</button>, <button key="2">Button 2</button>]
    },
};
