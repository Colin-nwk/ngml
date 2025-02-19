import { fireEvent, render, screen } from '@testing-library/react';
import OperationPage from './OperationPage';

describe('OperationPage', () => {
    test('renders OperationPage and opens volume modal', () => {
        render(<OperationPage />);

        // Check if the heading is rendered
        expect(screen.getByText(/operations/i)).toBeInTheDocument();

        // Click the "Add New Volume" button to open the modal
        fireEvent.click(screen.getByText(/add new volume/i));

        // Check if the volume modal opens
        expect(screen.getByText(/daily volume entry form/i)).toBeInTheDocument();
    });

    test('submits the form when required fields are filled', () => {
        render(<OperationPage />);

        // Open the volume modal
        fireEvent.click(screen.getByText(/add new volume/i));

        // Click the Confirm button
        fireEvent.click(screen.getByText(/confirm/i));
    });

    test('displays alert when required fields are empty', () => {
        render(<OperationPage />);

        // Open the volume modal
        fireEvent.click(screen.getByText(/add new volume/i));

        // Click Confirm without filling the form
        fireEvent.click(screen.getByText(/confirm/i));
    });
});