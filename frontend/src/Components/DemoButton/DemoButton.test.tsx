
import { render } from '@testing-library/react';
import Button from './DemoButton';

describe('Button', () => {
    it('renders correctly with default props', () => {
        const { getByText } = render(<Button>Click me</Button>);
        const button = getByText('Click me');
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('w-full rounded-md font-semibold focus:outline-none');
    });

    it('renders correctly with different variants', () => {
        const { getByText } = render(<Button variant="outline">Click me</Button>);
        const button = getByText('Click me');
        expect(button).toHaveClass('border-2');
    });


    it('disables the button when disabled prop is true', () => {
        const { getByText } = render(<Button disabled>Click me</Button>);
        const button = getByText('Click me');
        expect(button).toHaveAttribute('disabled');
        expect(button).toHaveClass('disabled:cursor-not-allowed');
    });
});