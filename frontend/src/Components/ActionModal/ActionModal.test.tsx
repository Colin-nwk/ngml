import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActionModal from './ActionModal'; 
import logo from '@/assets/images/png-icons/Done.png';

describe('ActionModal', () => {
    test('renders modal when isOpen is true', () => {
        render(<ActionModal isOpen={true} title="Test Title" onClose={() => {}} />);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    test('does not render modal when isOpen is false', () => {
        render(<ActionModal isOpen={false} title="Test Title" onClose={() => {}} />);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('applies correct size classes based on size prop', () => {
        const { rerender } = render(<ActionModal isOpen={true} size="small" title="Test Title" onClose={() => {}} />);
        expect(screen.getByRole('dialog')).toHaveClass('max-w-xs h-[75%]');
        
        rerender(<ActionModal isOpen={true} size="medium" title="Test Title" onClose={() => {}} />);
        expect(screen.getByRole('dialog')).toHaveClass('max-w-sm h-[80%]');
        
        rerender(<ActionModal isOpen={true} size="large" title="Test Title" onClose={() => {}} />);
        expect(screen.getByRole('dialog')).toHaveClass('max-w-lg h-[90%]');
    });

    test('displays title and subtitle correctly', () => {
        render(<ActionModal isOpen={true} title="Test Title" subTitle="Test Subtitle" onClose={() => {}} />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    test('does not display subtitle if not provided', () => {
        render(<ActionModal isOpen={true} title="Test Title" onClose={() => {}} />);
        expect(screen.queryByText('Test Subtitle')).not.toBeInTheDocument();
    });

    test('renders button if provided', () => {
        const mockButton = <button>Click Me</button>;
        render(<ActionModal isOpen={true} title="Test Title" button={mockButton} onClose={() => {}} />);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    test('does not render button if not provided', () => {
        render(<ActionModal isOpen={true} title="Test Title" onClose={() => {}} />);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    test('renders Done logo image correctly', () => {
        render(<ActionModal isOpen={true} title="Test Title" onClose={() => {}} />);
        const logoImage = screen.getByAltText('done logo');
        expect(logoImage).toBeInTheDocument();
        expect(logoImage).toHaveAttribute('src', logo);
    });
});