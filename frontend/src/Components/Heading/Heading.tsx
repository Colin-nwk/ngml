import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
// import { twMerge } from 'tailwind-merge';
import { cn } from '@/Utils';

const headingBase = cva(
    'font-bold text-nnpcdark-50 uppercase',
    {
        variants: {
            size: {
                h1: 'text-5xl',
                h2: 'text-4xl',
                h3: 'text-3xl',
                h4: 'text-2xl',
                h5: 'text-xl',
                h6: 'text-lg',
                p: 'text-base',
                small: 'text-sm'

            },
        },
        defaultVariants: {
            size: 'h3',
        },
    }
);

const textBase = cva('font-normal');

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingBase> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ as = 'h3', children, size, className, ...props }) => {
    const Component = as;
    // const classNames = twMerge(headingBase({ size, className }));
    const classNames = cn(headingBase({ size, className }));

    const renderTextElement = (element: React.ReactNode) => {
        if (typeof element === 'string') {
            return element;
        }

        if (React.isValidElement(element)) {
            if (element.type === 'span') {
                return <span className={textBase()}>{element.props.children}</span>;
            }

            if (element.type === 'p') {
                return <p className={textBase()}>{element.props.children}</p>;
            }
        }

        return element;
    };

    return (
        <Component className={classNames} {...props}>
            {React.Children.map(children, renderTextElement)}
        </Component>
    );
};

export default Heading;