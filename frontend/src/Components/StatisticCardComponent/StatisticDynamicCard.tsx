import React from 'react';

/**
 * Props for the StatisticDynamicCard component.
 * @typeof CardProps
 * @type {object}
 * @property {'primary' | 'secondary'} [type] - The type of the card, affecting its styling.
 * @property {string} [title] - The title of the card.
 * @property {React.ReactNode} [content] - The main content of the card.
 * @property {React.ReactNode} [icon] - An optional icon to display on the card.
 * @property {React.ReactNode} [dropdownIcon] - An icon to display in dropdown selectors.
 * @property {Function} [onSortChange] - Callback function to handle sort changes.
 * @property {Array<number>} [yearOptions] - Array of available years for sorting.
 * @property {Array<SelectOption>} [valueOptions] - Array of options for value-based sorting.
 */
interface CardProps {
    type?: 'primary' | 'secondary';
    title?: string;
    content?: React.ReactNode;
    icon?: React.ReactNode;
    dropdownIcon?: React.ReactNode;
    onSortChange?: (sortType: 'year' | 'value', value: string) => void;
    yearOptions?: Array<number>;
    valueOptions?: Array<SelectOption>;
}

/**
 * Defines the shape of the selection option for dropdowns.
 * @typeof SelectOption
 * @type {object}
 * @property {string} label - The display text of the option.
 * @property {string} value - The value of the option.
 */
interface SelectOption {
    label: string;
    value: string;
}

/**
 * A dynamic card component for displaying statistical information with customizable sorting options.
 * @param {CardProps} props - The properties passed to the component.
 * @returns {React.FC} A functional React component.
 */
const StatisticDynamicCard: React.FC<CardProps> = ({
    type = 'primary',
    title,
    content,
    icon,
    dropdownIcon,
    onSortChange,
    yearOptions = [],
    valueOptions = []
}) => {
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>, sortType: 'year' | 'value') => {
        if (onSortChange) {
            onSortChange(sortType, e.target.value);
        }
    };

    const getCardStyle = (type: 'primary' | 'secondary') => {
        switch (type) {
            case 'primary':
                return { backgroundColor: '#005828', color: '#ffffff' };
            case 'secondary':
                return { backgroundColor: '#F6FDEC', color: '#005828' };
            default:
                return { backgroundColor: 'green' };
        }
    };

    const getSelectStyle = (type: 'primary' | 'secondary') => {
        switch (type) {
            case 'primary':
                return {
                    backgroundColor: '#005828',
                    color: '#ffffff',
                    border: '1px solid #ffffff'
                };
            case 'secondary':
                return {
                    backgroundColor: '#F6FDEC',
                    color: '#005828',
                    border: '1px solid #005828'
                };
            default:
                return {
                    backgroundColor: 'blue',
                    color: 'black',
                    border: '1px solid green'
                };
        }
    };

    const cardStyle = getCardStyle(type);
    const selectStyle = getSelectStyle(type);
    const titleStyle = { color: type === 'primary' ? '#D2F69E' : '#005828' };
    const scfStyle = { color: type === 'primary' ? '#D2F69E' : '#005828' };

    return (
        <div style={cardStyle} className='w-full h-full p-8 rounded-[20px] shadow-md'>
            <div className='flex justify-between items-center'>
                {icon && <div className="card-icon">{icon}</div>}
                {yearOptions.length > 0 && (
                    <div className="select-container relative inline-block w-20">
                        <select
                            className='outline-none block w-full bg-inherit h-9 rounded-full text-xs leading-tight pl-2 pr-10 appearance-none'
                            aria-label="Sort by year"
                            onChange={(e) => handleSortChange(e, 'year')}
                            style={selectStyle}
                        >
                            {yearOptions.map(year => (
                                <option key={year} value={year} style={selectStyle}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            {dropdownIcon}
                        </div>
                    </div>
                )}
            </div>
            <div className='flex flex-col items-center pt-7'>
                <div className='tracking-wide text-lg font-bold' style={titleStyle}>{title}</div>
                <div className='tracking-wide text-sm' style={scfStyle}>(Scf)</div>
                <div className='text-2xl font-semibold mt-5'>{content}</div>
            </div>
            {valueOptions.length > 0 && (
                <div className='mt-5 relative inline-block w-full'>
                    <select
                        className='outline-none block w-full bg-inherit h-11 rounded-full text-xs leading-tight pl-4 pr-10 appearance-none'
                        aria-label="Sort by value"
                        onChange={(e) => handleSortChange(e, 'value')}
                        style={selectStyle}
                    >
                        {valueOptions.map(option => (
                            <option key={option.value} value={option.value} style={selectStyle}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        {dropdownIcon}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatisticDynamicCard;
