import { Meta, StoryObj } from '@storybook/react';
import SiteVisitPage from './SiteVisitPage';
import { MemoryRouter } from 'react-router-dom';


const meta: Meta = {
    title: 'Pages/SiteVisitPage',
    component: SiteVisitPage,
    parameters: {
    }, tags: ['autodocs'],
    argTypes: {},

} satisfies Meta<typeof SiteVisitPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <MemoryRouter>
            <SiteVisitPage />
        </MemoryRouter>
    ),
};
