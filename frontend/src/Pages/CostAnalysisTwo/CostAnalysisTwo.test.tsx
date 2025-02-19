import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import CostAnalysisTwo from './CostAnalysisTwo';

describe('CostAnalysisTwo Component', () => {
    test('renders the component correctly', () => {
        render(<CostAnalysisTwo />);

        // Check for the Documents header
        expect(screen.getByText('Documents')).toBeInTheDocument();

        // Check for the Upload Document button
        const uploadButton = screen.getByText('Upload Document');
        expect(uploadButton).toBeInTheDocument();

        // Check if DocumentCardThree components are rendered
        expect(screen.getByText('Site Survey')).toBeInTheDocument();
        expect(screen.getByText('Bucketfull CAPEX')).toBeInTheDocument();
    });

    test('opens and closes the modal when Upload Document button is clicked', () => {
        render(<CostAnalysisTwo />);

        // Check that the modal is initially not in the document
        expect(screen.queryByText('CAPEX Sheet Upload')).not.toBeInTheDocument();

        // Click the Upload Document button
        const uploadButton = screen.getByText('Upload Document');
        fireEvent.click(uploadButton);

        // Check that the modal is now in the document
        expect(screen.getByText('CAPEX Sheet Upload')).toBeInTheDocument();

        // Click the Cancel button in the modal
        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);

        // Check that the modal is no longer in the document
        expect(screen.queryByText('CAPEX Sheet Upload')).not.toBeInTheDocument();
    });

    test('renders DocumentCardThree components with correct props', () => {
        render(<CostAnalysisTwo />);

        // Check the Site Survey card
        const siteSurveyCard = screen.getByText('Site Survey').closest('div');
        expect(siteSurveyCard).toHaveTextContent('Site Survey');

        // Check the Bucketfull CAPEX card
        const bucketfullCAPEXCard = screen.getByText('Bucketfull CAPEX').closest('div');
        expect(bucketfullCAPEXCard).toHaveTextContent('Bucketfull CAPEX');
    });
});