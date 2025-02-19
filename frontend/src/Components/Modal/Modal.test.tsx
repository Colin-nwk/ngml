import { render } from '@testing-library/react';
import Modal from './Modal';

describe('Modal component', () => {
    it('renders with default medium size and title', () => {
        const { getByText } = render(
            <Modal isOpen={true} onClose={() => { }} title="Test Modal">
                <div>Modal Content</div>
            </Modal>
        );

        expect(getByText('Test Modal')).toBeInTheDocument();
        expect(getByText('Modal Content')).toBeInTheDocument();
    });

    it('renders with custom size and subtitle', () => {
        const { getByText } = render(
            <Modal isOpen={true} onClose={() => { }} title="Test Modal" subTitle="Subtitle" size="small">
                <div>Modal Content</div>
            </Modal>
        );

        expect(getByText('Test Modal')).toBeInTheDocument();
        expect(getByText('Subtitle')).toBeInTheDocument();
        expect(getByText('Modal Content')).toBeInTheDocument();
    });

    it('renders custom buttons', () => {
        const { getByText } = render(
            <Modal
                isOpen={true}
                onClose={() => { }}
                title="Test Modal"
                buttons={[<button key="1">Button 1</button>, <button key="2">Button 2</button>]}
            >
                <div>Modal Content</div>
            </Modal>
        );

        expect(getByText('Button 1')).toBeInTheDocument();
        expect(getByText('Button 2')).toBeInTheDocument();
    });
});