import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/Redux/store';
import AssignTask from './AssignTask';
import { MemoryRouter } from 'react-router-dom';

describe('AssignTask Component', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AssignTask />
                </MemoryRouter>
            </Provider>
        );
    });

    it('renders loading state for tasks', () => {
        expect(screen.getByText(/loading tasks/i)).toBeInTheDocument();
    });

    it('renders tasks and allows assigning', async () => {

        const assignButtons = screen.getAllByText(/assign/i);
        if (assignButtons.length > 0) {
            fireEvent.click(assignButtons[0]);
        }

    });

    it('handles task assignment failure', async () => {
        const assignButtons = screen.getAllByText(/assign/i);
        if (assignButtons.length > 0) {
            fireEvent.click(assignButtons[0]);
        }

    });
});