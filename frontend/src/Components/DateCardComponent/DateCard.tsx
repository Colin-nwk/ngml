import React from 'react';


/**
 * @typedof {'primary' | 'secondary'} CardType - Type of the date card.
 */

/**
 * @typedof {Object} DateCardProps - Props for the DateCard component.
 * @property {CardType} cardType - Type of the date card (primary or secondary).
 * @property {number} day - The day to be displayed on the card.
 * @property {string} week - The week to be displayed on the card.
 * @property {string} month - The month to be displayed on the card.
 * @property {boolean} isActive - Indicates whether the card is active or not.
 * @property {Function} onToggleActive - Callback function to toggle the active state of the card.
 * @property {React.ReactNode|string} [icon] - Optional icon to be displayed on the card.
 */

export interface DateCardProps {
    cardType?: 'primary' | 'secondary';
    day?: number;
    weekDay?: string;
    month?: string;
    isActive?: boolean;
    onToggleActive?: () => void;
    icon?: React.ReactNode | string;
    label?: string;
    secondaryProps?: {
        date?: number;
        businessName?: string;
        month?: string;
        businessIcon?: React.ReactNode | string;
        locationIcon?: React.ReactNode | string;
        location?: string;
    };
}

/**
 * DateCard component displays a date card with specific information.
 * @param {DateCardProps} props - Props for the DateCard component.
 * @returns {React.ReactElement} React component representing the date card.
 */

const DateCard: React.FC<DateCardProps> = ({
    cardType,
    day,
    weekDay,
    month,
    isActive,
    onToggleActive,
    label,
    secondaryProps = {},
}: DateCardProps): React.ReactElement => {


    const primaryCardContent = (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: isActive ? '#D2F69E' : '#FFFFFF',
                width: '169.14px',
                height: '147px',
                borderRadius: '10px',

            }}>
            <span style={{ fontSize: '20px', color: '#828DA9', lineHeight: '20px', fontWeight: '700', }}>
                {weekDay}
            </span>
            <span style={{ fontSize: '64px', color: '#49526A', lineHeight: '60px', fontWeight: '700' }}>
                {day}
            </span>
            <span style={{ fontSize: '12px', color: '#49526A', lineHeight: '12px', fontWeight: '700', }}>
                {month}
            </span>
            <span style={{ fontSize: '12px', color: '#49526A', lineHeight: '12px', fontWeight: '700', }}>
                {label}
            </span>
        </div>
    );

    const secondaryCardContent = (
        <div
            style={{
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'space-between',
                flexDirection: 'column',
                backgroundColor: isActive ? '#D2F69E' : '#F6F8FA',
                width: '266px',
                height: '290px',
                borderRadius: '10px',
                padding: '24px'

            }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '64px', color: '#49526A', lineHeight: '60px', fontWeight: '700' }}>
                    {secondaryProps.date}
                </span>
                <span style={{ fontSize: '20px', color: '#49526A', lineHeight: '20px', fontWeight: '600', marginTop: '6px' }}>
                    {secondaryProps.month}
                </span>
            </div>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', columnGap: '4px' }}>
                    {secondaryProps.businessIcon && <div data-testid="business-icon">{secondaryProps.businessIcon}</div>}
                    <span style={{ fontSize: '12px', color: '#49526A', lineHeight: '14.4px', fontWeight: '700' }}>
                        {secondaryProps.businessName}
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', columnGap: '4px', marginTop: '2px' }}>
                    {secondaryProps.locationIcon && <div data-testid="location-icon" >{secondaryProps.locationIcon}</div>}
                    <span style={{ fontSize: '12px', color: '#49526A', lineHeight: '14.4px', fontWeight: '400' }}>
                        {secondaryProps.location}
                    </span>
                </div>
            </div>

        </div>
    );

    return (

        <div style={{ backgroundColor: '#EAECF0', padding: '10px' }}>
            <div
                className={`date-card ${isActive ? 'active' : 'inactive'}`}
                data-testid="date-card"
                onClick={onToggleActive}
            >
                {cardType === 'primary' ? primaryCardContent : null}
                {cardType === 'secondary' && secondaryProps ? secondaryCardContent : null}
            </div>
        </div>


    );
};

export default DateCard;
