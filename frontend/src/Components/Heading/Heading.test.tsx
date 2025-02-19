// Heading.test.tsx
import { render, screen } from '@testing-library/react';
import Heading from './Heading';

describe('Heading', () => {
    it('renders with the correct heading level and styles', () => {
        render(
            <Heading as="h1" size="h1">
                This is an H1 Heading
            </Heading>
        );

        const heading = screen.getByText('This is an H1 Heading');
        expect(heading).toBeInTheDocument();
        expect(heading.tagName).toBe('H1');
        expect(heading).toHaveClass('font-bold', 'uppercase', 'text-5xl');
    });

    it('renders with the default heading level and styles when `as` prop is not provided', () => {
        render(<Heading>This is an H3 Heading</Heading>);

        const heading = screen.getByText('This is an H3 Heading');
        expect(heading).toBeInTheDocument();
        expect(heading.tagName).toBe('H3');
        expect(heading).toHaveClass('font-bold', 'uppercase', 'text-3xl');
    });

    it('renders with additional custom classes', () => {
        render(
            <Heading as="h2" size="h2" className="text-blue-500">
                This is an H2 Heading
            </Heading>
        );

        const heading = screen.getByText('This is an H2 Heading');
        expect(heading).toBeInTheDocument();
        expect(heading.tagName).toBe('H2');
        expect(heading).toHaveClass('uppercase', 'text-4xl', 'text-blue-500');
    });

    it('renders as a paragraph when `as="p"` is provided', () => {
        render(
            <Heading as="p" size="p">
                This is a paragraph
            </Heading>
        );

        const paragraph = screen.getByText('This is a paragraph');
        expect(paragraph).toBeInTheDocument();
        expect(paragraph.tagName).toBe('P');
        expect(paragraph).toHaveClass('font-bold', 'uppercase', 'text-base');
    });

    it('renders text elements with correct styles', () => {
        render(
            <Heading as="h3" size="h3">
                This is an <span>H3</span> Heading with <p>a paragraph</p>
            </Heading>
        );

        const headingElement = screen.getByRole('heading', {
            level: 3, name: (content: string, element: Element) => {
                content;
                const hasSpan = element.querySelector('span')?.textContent === 'H3';
                const hasParagraph = element.querySelector('p')?.textContent === 'a paragraph';
                return hasSpan && hasParagraph;
            }
        });
        expect(headingElement).toBeInTheDocument();
        expect(headingElement).toHaveClass('font-bold', 'uppercase', 'text-3xl');

        const span = screen.getByText('H3');
        expect(span).toBeInTheDocument();
        expect(span.tagName).toBe('SPAN');
        expect(span).toHaveClass('font-normal');

        const paragraph = screen.getByText('a paragraph');
        expect(paragraph).toBeInTheDocument();
        expect(paragraph.tagName).toBe('P');
        expect(paragraph).toHaveClass('font-normal');
    });

});