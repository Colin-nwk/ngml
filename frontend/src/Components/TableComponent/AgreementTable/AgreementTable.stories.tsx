/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Meta, StoryObj } from '@storybook/react';
import AgreementTable from './AgreementTable';


const meta: Meta<typeof AgreementTable> = {
    title: 'Tables/AgreementTable',
    component: AgreementTable,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {
};

export const WithFilteredData: Story = {
    decorators: [
        (Story) => {
            return (
                <div>
                    <Story />
                </div>
            );
        },
    ],
};

