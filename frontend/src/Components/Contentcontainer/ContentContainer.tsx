import React, { ReactNode } from 'react';

/**
 * Card Component
 *
 * A versatile card component with customizable styles and configurations.
 *
 * @component
 * @example
 * <Card>Card Content</Card>
 *
 * @example
 * <Card type="translucent" width="200px" height="150px" borderRadius={10}>
 *   Card Content
 * </Card>
 *
 * @param {object} props - The properties of the Card component.
 * @param {string} [props.type='solid'] - The type of card. Possible values: 'translucent', 'white', 'dashes', 'solid'.
 * @param {string} [props.width='100%'] - The width of the card.
 * @param {string} [props.height='100%'] - The height of the card.
 * @param {number} [props.borderWidth=3] - The border width of the card.
 * @param {string} [props.borderColor='green'] - The border color of the card.
 * @param {number} [props.borderRadius=5] - The border radius of the card.
 * @param {ReactNode} props.children - The content inside the card.
 * @returns {ReactElement} The rendered Card component.
 *
 * @throws {Error} Will throw an error if an unsupported type is provided.
 */

type CardType = 'translucent' | 'white' | 'dashes' | 'solid';

interface CardProps {
  type?: CardType;
  width?: string;
  height?: string;
  borderWidth?: number;
  borderColor?: string;
  borderRadius?: number;
  children: ReactNode;
}

const ContentContainer: React.FC<CardProps> = ({
  type = 'solid',
  width = '560px',
  height = '100%',
  borderWidth = 0,
  borderColor = 'green',
  borderRadius = 5,
  children,
}: CardProps) => {
  const getCardStyles = (): React.CSSProperties => {
    let styles: React.CSSProperties = {
      width,
      height,
      borderRadius,
      borderWidth,
      borderColor,
      padding: '14px',
      boxSizing: 'border-box',
    };

    switch (type) {
      case 'translucent':
        styles = { ...styles, backgroundColor: 'rgba(255, 255, 255, 0.2)' };
        break;
      case 'white':
        styles = { ...styles, backgroundColor: '#fff', border: '1px solid #ddd' };
        break;
      case 'dashes':
        styles = { ...styles, border: '1px dashed #aaa' };
        break;
      case 'solid':
        styles = { ...styles, backgroundColor: '#f0f0f0', border: '1px solid #ddd' };
        break;
      default:
        break;
    }

    return styles;
  };

  return <div style={getCardStyles()}>{children}</div>;
};

export default ContentContainer;