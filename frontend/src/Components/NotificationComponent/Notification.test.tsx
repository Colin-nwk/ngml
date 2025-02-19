import { render } from '@testing-library/react';
import Notification from './Notification';

describe('Notification component', () => {
    const mockNotifications = [
        {
            title: 'Notification 1',
            date: '2024-02-08',
            content: 'This is notification 1.',
        },
        {
            title: 'Notification 2',
            date: '2024-02-07',
            content: 'This is notification 2.',
        },
    ];

    it('renders notification icon with count', () => {
        const { getByTestId, getByText } = render(
            <Notification count={mockNotifications.length} notifications={mockNotifications} />
        );

        const notificationIcon = getByTestId('notification-icon');
        expect(notificationIcon).toBeInTheDocument();

        const notificationCount = getByText(mockNotifications.length.toString());
        expect(notificationCount).toBeInTheDocument();
    });


});
