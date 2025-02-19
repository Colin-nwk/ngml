import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import DocumentCardTwo from './DocumentCardTwo';

describe('DocumentCardTwo Component', () => {
    it('renders with correct props', () => {
        render(
            <DocumentCardTwo
                icon={<span>📄</span>}
                title="Document Title"
                subtitle="Document Subtitle"
                buttonText="Click Me"
                width={200}
                height={100}
            />
        );

        expect(screen.getByText('Document Title')).toBeInTheDocument();
        expect(screen.getByText('Document Subtitle')).toBeInTheDocument();
        expect(screen.getByText('📄')).toBeInTheDocument();
    });

    it('changes style on hover and shows button', () => {
        render(
            <DocumentCardTwo
                icon={<span>📄</span>}
                title="Document Title"
                subtitle="Document Subtitle"
                buttonText="Click Me"
            />
        );

        const card = screen.getByText('Document Title').parentElement?.parentElement;

        if (card) {
            expect(screen.queryByText('Click Me')).toBeNull();

            fireEvent.mouseEnter(card);

            expect(screen.getByText('Click Me')).toBeInTheDocument();

            fireEvent.mouseLeave(card);

            expect(screen.queryByText('Click Me')).toBeNull();
        }
    });
});