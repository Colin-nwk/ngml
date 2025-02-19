import React, { useState } from 'react';


/**
 * @typeof {'primary' | 'secondary' | 'tertiary' | 'icon' | 'outline' | 'transparent'} ButtonType
 *
 * @typeof {Object} ButtonProps
 * @property {ButtonType} type - The type of the button.
 * @property {string} [label] - The label text for the button.
 * @property {string} [color] - The color of the button.
 * @property {string} [fontStyle] - The font style of the button.
 * @property {() => void} action - The callback function to be executed on button click.
 * @property {boolean} [disabled] - Indicates whether the button is disabled.
 * @property {React.ReactNode | string} [icon] - The icon to be displayed on the button.
 * @property {'left' | 'right'} [iconPosition] - The position of the icon relative to the label.
 * @property {string} [iconWidth] - The width of the icon.
 * @property {string} [iconHeight] - The height of the icon.
 * @property {string} [iconColor] - The color of the icon.
 * @property {string} [width] - The width of the button.
 * @property {string} [height] - The height of the button.
 * @property {string} [fontSize] - The font size of the button.
 * @property {string} [radius] - The border radius of the button.
 * @property {string} [fontWeight] - The font weight of the button.
 * @property {boolean} [underline] - Indicates whether the label text should be underlined.
 * @property {string} [columnGap] - The column gap for secondary and tertiary buttons.
 * @property {string} [lineHeight] - The line height of the button.
 * @property {string} [textDecoration] - The text decoration of the label text.
 */


interface ButtonProps {
    type: 'primary' | 'secondary' | 'tertiary' | 'icon' | 'outline' | 'transparent' | 'newest';
    label?: string;
    color?: string;
    fontStyle?: string;
    action: () => void;
    disabled?: boolean;
    icon?: React.ReactNode | string;
    iconPosition?: 'left' | 'right';
    iconWidth?: string;
    iconHeight?: string;
    iconColor?: string;
    width?: string;
    height?: string;
    fontSize?: string;
    radius?: string;
    fontWeight?: string;
    underline?: boolean;
    columnGap?: string;
    lineHeight?: string;
    textDecoration?: string;
    backgroundColor?: string
    borderColor?: string
    className?: string;
}


/**
 * Button component.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @returns {React.ReactElement} - The rendered Button component.
 */

const Button: React.FC<ButtonProps> = ({
    type,
    label,
    action,
    color,
    fontStyle,
    disabled = false,
    icon,
    iconPosition = 'left',
    iconWidth,
    iconHeight,
    iconColor,
    width,
    height,
    fontSize,
    radius,
    fontWeight,
    underline,
    columnGap,
    lineHeight,
    textDecoration,
    backgroundColor,
    borderColor,
    className
}: ButtonProps): React.ReactElement => {

    const [isHovered, setIsHovered] = useState(false);

    /**
    * Get the styles for the button based on its type.
    *
    * @returns {React.CSSProperties} - The CSS properties for the button.
    */
    const getButtonStyles = (): React.CSSProperties => {
        switch (type) {
            case 'newest':
                return { backgroundColor: isHovered ? '#FFFFFF' : '#00AF50', color: isHovered ? '#414242' : '#E3EADA', width, height, fontSize, borderRadius: radius, fontWeight, lineHeight, };
            case 'primary':
                return { backgroundColor: isHovered ? '#00903e' : '#00AF50', color: '#FFFFFF', width, height, fontSize, borderRadius: radius, fontWeight, lineHeight, };
            case 'secondary':
                return { backgroundColor: isHovered ? '#00903e' : '#00AF50', color: '#FFFFFF', width, height, fontSize, borderRadius: radius, fontWeight, lineHeight, columnGap };
            case 'tertiary':
                return { border: '1px solid #DCDFE4', color: '#49526A', width, height, fontSize: isHovered ? '15.5px' : '15px', borderRadius: radius, fontWeight };
            case 'icon':
                return { backgroundColor: isHovered ? '#00903e' : '#F9FAFB', color, width, height, borderRadius: radius, };
            case 'outline':
                return { border: '1px solid #DCDFE4', color: '#49526A', width, height, fontSize: isHovered ? '13px' : '12.5px', borderRadius: radius, fontWeight };
            case 'transparent':
                return { fontSize: isHovered ? '12.5px' : '12px', fontWeight, lineHeight };
            default:
                return { backgroundColor: isHovered ? 'darkgreen' : 'green', color: 'white' };
        }
    };

    /**
    * Render the icon element based on its type.
    *
    * @returns {React.ReactElement} - The rendered icon element.
    */

    const renderIcon = (): React.ReactElement => {
        if (typeof icon === 'string') {
            return <img src={icon} alt="icon" style={{ width: isHovered ? '30px' : '24px', height: isHovered ? '30px' : '24px', color: iconColor }} />;
        } else {
            return <div style={{ width: iconWidth, height: iconHeight, color: iconColor }}>{icon}</div>;
        }
    };


    return (
        <button
            className={`button ${isHovered ? 'hovered' : ''} ${className}`}
            onClick={action}
            disabled={disabled}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: disabled ? 'not-allowed' : 'pointer',
                outline: 'none',
                textDecoration: underline ? 'underline' : 'none',
                columnGap,
                backgroundColor,
                fontSize,
                color,
                border: borderColor,
                ...getButtonStyles(),
            }}
        >
            {icon && iconPosition === 'left' && renderIcon()}
            <span style={{ color, fontStyle, textDecoration }}>{label}</span>
            {icon && iconPosition === 'right' && renderIcon()}
        </button>
    );
};

export default Button;
