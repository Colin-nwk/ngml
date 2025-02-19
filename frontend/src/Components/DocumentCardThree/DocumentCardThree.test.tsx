import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DocumentCardThree from './DocumentCardThree';

describe('DocumentCardThree', () => {
    test('renders the component with all props', () => {
        const icon = <span>Icon</span>;
        const title = 'Document Title';
        const subtitle = 'Document Subtitle';
        const linkText = 'Link Text';
        const linkText2 = 'Link Text 2';
        const width = '50%';
        const height = '50%';

        render(
            <DocumentCardThree
                icon={icon}
                title={title}
                subtitle={subtitle}
                linkText={linkText}
                linkText2={linkText2}
                width={width}
                height={height}
            />
        );

        expect(screen.getByText('Icon')).toBeInTheDocument();
        expect(screen.getByText('Document Title')).toBeInTheDocument();
        expect(screen.getByText('Document Subtitle')).toBeInTheDocument();
        expect(screen.getByText('Link Text')).toBeInTheDocument();
        expect(screen.getByText('Link Text 2')).toBeInTheDocument();
    });

    test('renders the component with default width and height', () => {
        const icon = <span>Icon</span>;
        const title = 'Document Title';

        render(
            <DocumentCardThree
                icon={icon}
                title={title}
            />
        );

        const container = screen.getByText('Document Title').parentElement?.parentElement;
        expect(container).toHaveStyle('width: 100');
        expect(container).toHaveStyle('height: 100');
    });

    test('renders the upload section with correct text', () => {
        const icon = <span>Icon</span>;
        const title = 'Document Title';

        render(
            <DocumentCardThree
                icon={icon}
                title={title}
            />
        );

        expect(screen.getByText('Click to upload')).toBeInTheDocument();
    });

    test('handles optional subtitle and linkText correctly', () => {
        const icon = <span>Icon</span>;
        const title = 'Document Title';
        const linkText2 = 'Link Text 2';

        render(
            <DocumentCardThree
                icon={icon}
                title={title}
                linkText2={linkText2}
            />
        );

        expect(screen.queryByText('Document Subtitle')).not.toBeInTheDocument();
        expect(screen.queryByText('Link Text')).not.toBeInTheDocument();
        expect(screen.getByText('Link Text 2')).toBeInTheDocument();
    });
});