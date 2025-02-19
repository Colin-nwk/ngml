import type { Meta, StoryObj } from '@storybook/react';
import Notification from './Notification';
import { NotificationImportantOutlined } from '@mui/icons-material';

const meta: Meta<typeof Notification> = {
    title: 'Components/Notification',
    component: Notification,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        count: { control: 'number' },
        onClick: { action: 'clicked' },
        renderIcon: { control: null }, 
    },
};

export default meta;

// Define the type for the story using StoryObj
type Story = StoryObj<typeof meta>;

// Sample story with basic props
export const Sample: Story = {
    args: {
        count: 5,
        headerTitle: 'Notifications',
        notifications: [
            { title: 'New Message', date: '2023-01-01', content: 'You have a new message from John.' },
            { title: 'System Update', date: '2023-01-02', content: 'System update is scheduled for 2 AM.' },
            { title: 'Meeting Reminder', date: '2023-01-03', content: 'Reminder: Meeting with the team at 10 AM.' },
        ],
        onClick: () => console.log('Notification icon clicked'),
        renderIcon: () => <NotificationImportantOutlined />,
    },
};
