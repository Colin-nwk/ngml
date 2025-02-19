import React from 'react';
import colors from '../../Utils/colors';
/**
 * Badge Component
 *
 * A custom dynamic badge component that supports various styles, icons, and customization options.

 *
 * @param {Object} props - The properties of the Badge component.
 * @param {string} props.type - The type of the badge. Possible values are "primary", "secondary", "transparent", "outline".
 * @param {string} [props.label] - The label or text to be displayed inside the badge.
 * @param {string} [props.width] - The width of the badge container.
 * @param {string} [props.height] - The height of the badge container.
 * @param {string} [props.fontSize] - The font size of the label text.
 * @param {string} [props.radius] - The border-radius of the badge container.
 * @param {string} [props.fontWeight] - The font weight of the label text.
 * @param {React.ReactNode} [props.icon] - The icon to be displayed alongside the label.
 * @param {string} [props.iconHeight] - The height of the icon.
 * @param {string} [props.iconWidth] - The width of the icon.
 * @param {string} [props.iconColor] - The color of the icon.
 * @param {string} [props.columnGap] - The column gap between the icon and the label.
 * @param {Function} [props.onIconClick] - The callback function to be executed when the icon is clicked.
 *
 * @returns {React.ReactNode} Returns the JSX representation of the Badge component.
 */

interface BadgeProps {
    type?: 'primary' | 'secondary' | 'transparent' | 'outline'
    label?: string
    width?: string
    height?: string
    fontSize?: string
    fontWeight?: string
    radius?: string
    icon?: React.ReactNode
    iconHeight?: string
    iconWidth?: string
    iconColor?: string
    columnGap?: string
    onIconClick?: () => void;

}

const Badge: React.FC<BadgeProps> = ({
    type,
    label,
    width,
    height,
    fontSize,
    radius,
    fontWeight,
    icon,
    iconHeight,
    iconWidth,
    iconColor,
    columnGap,
    onIconClick
}: BadgeProps) => {

    /**
    * Get the inline styles based on the badge type.
    *
    * @function
    * @private
    * @returns {React.CSSProperties} Returns the inline styles for the badge container.
    */

    // const primaryColor = useColor('nnpc', 100);

    const getBadgeStyles = (): React.CSSProperties => {
        switch (type) {
            case 'primary':
                return { backgroundColor: colors.nnpc[100], color: colors.dark[50], width, height, fontSize, borderRadius: radius, fontWeight }
            case 'secondary':
                return { backgroundColor: colors.nnpc[50], color: colors.nnpc[100], width, height, fontSize, borderRadius: radius, fontWeight }
            case 'transparent':
                return { backgroundColor: '#E2E4EB', color: colors.dark[200], width, height, fontSize, borderRadius: radius, fontWeight }
            case 'outline':
                return { border: '2px solid #DCDFE4', color: colors.dark[200], width, height, fontSize, borderRadius: radius, fontWeight }

            default:
                return { backgroundColor: 'green', color: colors.dark[50] }
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap, ...getBadgeStyles() }}        >
            {icon && (
                <div
                    style={{
                        marginRight: '4px',
                        height: iconHeight,
                        width: iconWidth,
                        color: iconColor,
                        cursor: onIconClick ? 'pointer' : 'auto'
                    }}
                    onClick={onIconClick}
                >
                    {icon}
                </div>
            )}
            {label}
        </div>
    )
}

export default Badge;
