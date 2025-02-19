import { fireEvent, render, screen } from '@testing-library/react';
import CustomInput from './CustomInput';

describe('CustomInput', () => {
    it('renders input with label', () => {
        render(<CustomInput type="text" label="Username" value="" handleChangeEvent={() => { }} />);
        const labelElement = screen.getByText('Username');
        const inputElement = screen.getByRole('textbox');

        expect(labelElement).toBeInTheDocument();
        expect(inputElement).toBeInTheDocument();
    });

    it('calls onChange when input value changes', () => {
        const mockOnChange = vi.fn();
        render(<CustomInput type="text" label="Username" value="" handleChangeEvent={mockOnChange} />);
        const inputElement = screen.getByRole('textbox');

        fireEvent.change(inputElement, { target: { value: 'testUser' } });
        expect(mockOnChange).toHaveBeenCalledWith('testUser');
    });

    it('renders select with options', () => {
        render(
            <CustomInput type="select" label="Select Option" value="" handleChangeEvent={() => { }} options={['Option 1', 'Option 2']} />
        );
        const labelElement = screen.getByText('Select Option');
        const selectElement = screen.getByRole('combobox');

        expect(labelElement).toBeInTheDocument();
        expect(selectElement).toBeInTheDocument();
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('calls onChange when select value changes', () => {
        const mockOnChange = vi.fn();
        render(
            <CustomInput type="select" label="Select Option" value="" handleChangeEvent={mockOnChange} options={['Option 1', 'Option 2']} />
        );
        const selectElement = screen.getByRole('combobox');

        fireEvent.change(selectElement, { target: { value: 'Option 1' } });
        expect(mockOnChange).toHaveBeenCalledWith('Option 1');
    });

    it('renders textarea', () => {
        render(<CustomInput type="textarea" label="Description" value="" handleChangeEvent={() => { }} />);
        const labelElement = screen.getByText('Description');
        const textareaElement = screen.getByRole('textbox');

        expect(labelElement).toBeInTheDocument();
        expect(textareaElement).toBeInTheDocument();
    });

    it('calls onChange when textarea value changes', () => {
        const mockOnChange = vi.fn();
        render(<CustomInput type="textarea" label="Description" value="" handleChangeEvent={mockOnChange} />);
        const textareaElement = screen.getByRole('textbox');

        fireEvent.change(textareaElement, { target: { value: 'Test description' } });
        expect(mockOnChange).toHaveBeenCalledWith('Test description');
    });

    it('renders checkbox', () => {
        render(<CustomInput type="checkbox" label="Agree" value={false} handleChangeEvent={() => { }} />);
        const labelElement = screen.getByText('Agree');
        const checkboxElement = screen.getByRole('checkbox');

        expect(labelElement).toBeInTheDocument();
        expect(checkboxElement).toBeInTheDocument();
    });

    it('renders radio button', () => {
        render(<CustomInput type="radio" label="Radio" value="radioValue" handleChangeEvent={() => { }} options={['Option1', 'Option2']} />);
        const radioElement = screen.getByLabelText('Option1');
        expect(radioElement).toBeInTheDocument();
        expect(radioElement).toHaveAttribute('type', 'radio');
    });

    it('applies default styles to text input', () => {
        render(<CustomInput type="text" label="Username" value="" handleChangeEvent={() => { }} />);
        const inputElement = screen.getByRole('textbox');

        expect(inputElement).toHaveClass(
            'appearance-none',
            'block',
            'w-full',
            'px-3',
            'py-3',
            'border',
            'border-gray-300',
            'rounded-[13px]',
            'shadow-sm',
            'placeholder-gray-400',
            'placeholder:italic',
            'focus:outline-none',
            'focus:ring-gray-700',
            'focus:border-lime-200',
            'sm:text-[12px]'
        );
    });

    it('applies customStyle1 to select input', () => {
        render(
            <CustomInput
                type="select"
                label="Select Option"
                value=""
                handleChangeEvent={() => { }}
                options={['Option 1', 'Option 2']}
                styleVariant="customStyle1"
            />
        );
        const selectElement = screen.getByRole('combobox');

        expect(selectElement).toHaveClass(
            'border border-lime-500 text-[12px] h-[56px] placeholder:font-[400] font-[500] placeholder:italic placeholder-gray-400 rounded-full w-full px-4 py-2 focus:outline-none focus:ring-lime-500 focus:bg-gray-100 pl-3 appearance-none select-none'
        );
    });

    it('applies custom styles to checkbox', () => {
        render(<CustomInput type="checkbox" label="Agree" value={false} handleChangeEvent={() => { }} />);
        const checkboxElement = screen.getByRole('checkbox');

        expect(checkboxElement).toHaveClass('hidden');
    });

    it('applies custom styles to radio button', () => {
        render(<CustomInput type="radio" label="Radio" value="radioValue" handleChangeEvent={() => { }} options={['Option1', 'Option2']} />);
        const radioElement = screen.getByLabelText('Option1');

        expect(radioElement).toHaveClass('w-5', 'h-5');
    });

    it('applies default style', () => {
        render(<CustomInput type="text" label="Username" value="" handleChangeEvent={() => { }} />);
        const inputElement = screen.getByRole('textbox');

        expect(inputElement).toHaveClass(
            'appearance-none',
            'block',
            'w-full',
            'px-3',
            'py-3',
            'border',
            'border-gray-300',
            'rounded-[13px]',
            'shadow-sm',
            'placeholder-gray-400',
            'placeholder:italic',
            'focus:outline-none',
            'focus:ring-gray-700',
            'focus:border-lime-200',
            'sm:text-[12px]'
        );
    });

    it('applies customStyle1', () => {
        render(<CustomInput type="text" label="Username" value="" handleChangeEvent={() => { }} styleVariant="customStyle1" />);
        const inputElement = screen.getByRole('textbox');

        expect(inputElement).toHaveClass('rounded-full');
    });

    it('applies customStyle2', () => {
        render(<CustomInput type="text" label="Username" value="" handleChangeEvent={() => { }} styleVariant="customStyle2" />);
        const inputElement = screen.getByRole('textbox');

        expect(inputElement).toHaveClass('focus:bg-gray-200');
    });

    it('applies customStyle3', () => {
        render(<CustomInput type="text" label="Username" value="" handleChangeEvent={() => { }} styleVariant="customStyle3" />);
        const inputElement = screen.getByRole('textbox');

        expect(inputElement).toHaveClass('rounded-full');
        expect(inputElement).toHaveClass('w-full');
    });

    it('applies customStyle4', () => {
        render(<CustomInput type="text" label="Username" value="" handleChangeEvent={() => { }} styleVariant="customStyle4" />);
        const inputElement = screen.getByRole('textbox');

        expect(inputElement).not.toHaveClass('border');
    });


});