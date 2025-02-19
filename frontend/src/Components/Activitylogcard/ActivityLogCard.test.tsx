import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ActivityLogCard from './ActivityLogCard';

describe('ActivityLogCard', () => {
    test('renders card with title, text, and start_time', () => {
        const title = 'Test Title';
        const text = 'Test Text';
        const start_time = new Date('2024-02-12T12:00:00');

        render(
            <MemoryRouter>
                <ActivityLogCard title={title} text={text} start_time={start_time} />
            </MemoryRouter>
        );

        // Use a regular expression to match the format of the date and time
        expect(screen.getByText(/(\d{1,2} \w{3}); (\d{1,2}:\d{2}[ap]m)/i)).toBeInTheDocument();
    });

    test('renders card with button', () => {
        const title = 'Test Title';
        const text = 'Test Text';
        const start_time = new Date('2024-02-12T12:00:00');
        const buttonLabel = 'Click Me';
        const button = <button>{buttonLabel}</button>;

        render(
            <MemoryRouter>
                <ActivityLogCard title={title} text={text} start_time={start_time} button={button} />
            </MemoryRouter>
        );

        expect(screen.getByText(buttonLabel)).toBeInTheDocument();
    });

    test('renders card without button', () => {
        const title = 'Test Title';
        const text = 'Test Text';
        const start_time = new Date('2024-02-12T12:00:00');

        render(
            <MemoryRouter>
                <ActivityLogCard title={title} text={text} start_time={start_time} />
            </MemoryRouter>
        );

        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
});
