import { render } from '@testing-library/react';
import AuthContainer from './AuthContainer';

describe('AuthContainer', () => {
    it('renders with children', () => {
        const { getByText } = render(
            <AuthContainer>
                <p>Test Content</p>
            </AuthContainer>
        );

        expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('renders with custom width and height', () => {
        const { container } = render(
            <AuthContainer width="500px" height="300px">
                <p>Test Content</p>
            </AuthContainer>
        );

        const containerElement = container.firstChild as HTMLElement;
        expect(containerElement.style.width).toBe('');
        expect(containerElement.style.height).toBe('');
    });

    it('renders with custom background color', () => {
        const { container } = render(
            <AuthContainer backgroundcolor="red">
                <p>Test Content</p>
            </AuthContainer>
        );

        const containerElement = container.firstChild as HTMLElement;
        expect(containerElement.style.backgroundColor).toBe('');
    });
});