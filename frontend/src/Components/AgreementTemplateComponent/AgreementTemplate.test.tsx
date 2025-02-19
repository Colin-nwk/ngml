import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AgreementTemplate from './AgreementTemplate';

describe('AgreementTemplate Component', () => {
    it('renders correctly and displays the initial UI', () => {
        render(<AgreementTemplate icon={<div>Icon</div>}
            heading="Test Heading" title="Test Title"
            modalTitle="Test Modal Title"
            modalContent={<div>Test Modal Content</div>} />);
        expect(screen.getByText('TEMPLATES')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
    });

});
