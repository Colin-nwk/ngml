

import React, { ChangeEvent, useState } from 'react';
import images from '../../assets/index';

interface OptionType {
    label: string;
    value: string;
}

interface CustomInputProps {
    type: 'text' | 'password' | 'date' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'email' | 'location' | 'tel' | 'hidden';
    name?: string;
    label?: string;
    value?: string | number | boolean | readonly string[];
    handleChangeEvent: (value: string) => void;
    placeholder?: string;
    options?: (string | OptionType)[];
    error?: string;
    required?: boolean;
    icon?: React.ReactNode;
    styleVariant?: 'default' | 'customStyle1' | 'customStyle2' | 'customStyle3' | 'customStyle4' | 'customStyle5'
}

const CustomInput: React.FC<CustomInputProps> = ({
    name,
    type,
    label,
    value = '',
    handleChangeEvent,
    placeholder,
    options = [],
    error,
    required = false,
    icon,
    styleVariant = 'default',
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [touched, setTouched] = useState(false);

    const styleVariants = {
        default: `appearance-none block w-full px-3 py-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-[13px] shadow-sm placeholder-gray-400 placeholder:italic focus:outline-none focus:ring-gray-700 focus:border-lime-200 sm:text-[12px]`,
        customStyle1: 'border border-lime-500 text-[12px] h-[56px] placeholder:font-[400] font-[500] placeholder:italic placeholder-gray-400 rounded-full w-full px-4 py-2 focus:outline-none focus:ring-lime-500 focus:bg-gray-100',
        customStyle2: 'rounded-[13px] placeholder-gray-400 placeholder:italic placeholder:font-[400] font-[500] focus:outline-none focus:ring-gray-700 focus:bg-gray-200 sm:text-[12px] border solid w-full py-2',
        customStyle3: 'rounded-full placeholder-gray-300 placeholder:italic placeholder:font-[400] font-[500] px-6 focus:outline-none focus:border-lime-700 focus:bg-gray-100 sm:text-[12px] border solid w-full py-3',
        customStyle4: 'placeholder-black focus:outline-none font-[400] focus:border-lime-200 focus:bg-white-600 border-1 solid w-full py-2',
        customStyle5: 'rounded-[13px] placeholder-gray-400 placeholder:italic placeholder:font-[400] font-[500] focus:outline-none focus:ring-gray-700 sm:text-[12px] border w-full py-3',
    };

    const inputClasses = `${styleVariants[styleVariant]} ${icon ? 'pl-12' : 'pl-3'} ${touched && !value ? 'border-red-500' : ''}`;

    const handleBlur = () => setTouched(true);

    const renderError = () => {
        if (touched && !value && required) {
            return <p className="mt-[2px] text-sm text-red-600">This field is required</p>;
        }
        return error && <p className="mt-1 text-sm text-red-600">{error}</p>;
    };

    const commonInputProps = {
        value: value as string | number | undefined,
        onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => handleChangeEvent(e.target.value),
        onBlur: handleBlur,
        placeholder,
        className: inputClasses,
        name,
    };

    const renderInput = () => {
        switch (type) {
            case 'text':
            case 'date':
            case 'email':
            case 'hidden':
            case 'tel':
            case 'number':
                return <input type={type} {...commonInputProps} />;
            case 'password':
                return (
                    <div className="relative">
                        {icon && (
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <span className="p-1 text-gray-500 rounded-full sm:text-sm bg-lime-200">{icon}</span>
                            </div>)}
                        <input type={showPassword ? 'text' : 'password'} {...commonInputProps} />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none focus:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <img src={showPassword ? images.Eyeclosed : images.Eyeopen} alt={showPassword ? 'Hide password' : 'Show password'} />
                        </button>
                    </div>
                );
            case 'select':
            case 'location':
                return (
                    <div className="relative">
                        <select {...commonInputProps} className={`${inputClasses} appearance-none select-none`}>
                            <option value="" disabled hidden>{placeholder || 'Select an option'}</option>
                            {options.map((option, index) => {
                                if (typeof option === 'string') {
                                    return <option key={index} value={option}>{option}</option>;
                                } else {
                                    return <option key={index} value={option.value}>{option.label}</option>;
                                }
                            })}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <img src={images.AltDownArrow} alt='Alt down Arrow' />
                        </div>
                    </div>
                );
            case 'textarea':
                return <textarea {...commonInputProps} />;
            case 'checkbox':
                return (
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id={name}
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                            className="hidden"
                        />
                        <label
                            htmlFor={name}
                            className={`cursor-pointer relative w-8 h-4 rounded-full ${isChecked ? 'bg-green-500' : 'bg-gray-300'}`}
                        >
                            <div className={`toggle-dot absolute w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out ${isChecked ? 'transform translate-x-full' : 'transform translate-x-0'}`}></div>
                        </label>
                    </div>
                );
            case 'radio':
                return (
                    <div>
                        {options.map((option, index) => {
                            const optionValue = typeof option === 'string' ? option : option.value;
                            const optionLabel = typeof option === 'string' ? option : option.label;
                            return (
                                <div key={index} className="flex items-center p-2">
                                    <input
                                        type="radio"
                                        id={`${name}-${index}`}
                                        value={optionValue}
                                        checked={value === optionValue}
                                        onChange={() => handleChangeEvent(optionValue)}
                                        className="w-5 h-5"
                                    />
                                    <label htmlFor={`${name}-${index}`} className="ml-2">{optionLabel}</label>
                                </div>
                            );
                        })}
                    </div>
                );
        }
    };

    return (
        <div className="relative mt-2">
            {label && (
                <label htmlFor={name} className={`block text-[14px] ml-[6px] font-[400] ${required ? 'text-gray-700' : ''}`}>
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="p-1 text-gray-500 rounded-full sm:text-sm bg-lime-200">{icon}</span>
                    </div>
                )}
                {renderInput()}
            </div>
            {renderError()}
        </div>
    );
};

export default CustomInput;