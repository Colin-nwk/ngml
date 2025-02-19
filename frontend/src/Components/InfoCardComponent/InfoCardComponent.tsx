
import React, { useState } from 'react';
// import { Divider } from '@mui/material';
import colors from '@/Utils/colors';

/**
 * Props for InfoCard component.
 * @interface
 * @property {string} title - The title to be displayed on the card.
 * @property {number|string} number - The number or text to be displayed. Can be a number or formatted string.
 * @property {string} [subtitle] - Optional subtitle to be displayed under the title.
 * @property {React.CSSProperties} [style] - Optional style object to override default styling.
 * @property {boolean} [showDropdown] - Flag to show/hide dropdown.
 * @property {Array<string>} [options] - Array of options for the dropdown.
 */
interface InfoCardProps {
  title: string;
  number: number | string;
  subtitle?: string;
  style?: React.CSSProperties;
  showDropdown?: boolean;
  options?: string[];
}

/**
 * InfoCard Component
 * Displays a card with a title, number/content, and an optional dropdown below it.
 * 
 * @component
 * @param {InfoCardProps} props - The props for the InfoCard component.
 * @returns {React.ReactElement} A styled card with a title, content section, and optional dropdown.
 */
const InfoCard: React.FC<InfoCardProps> = ({
  title, number, subtitle, style, showDropdown, options
}) => {
  const [selectedOption, setSelectedOption] = useState(options?.[0] || '');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div
      className='text-start sm:text-center '
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ...style,
      }}>
      <div
        className='border'
        style={{
          backgroundColor: '#EAEEF2',
          borderTopRightRadius: '12px',
          borderTopLeftRadius: '12px',
          display: 'flex',
          color: '#828DA9',
          fontSize: '20px',
          fontWeight: '600',
          flexDirection: 'column',
          gap: '8px',
          padding: '20px',
        }}>
        <h2>{title}</h2>
        <div className='text-[14px]'>{subtitle}</div>

      </div>
      {/* <Divider /> */}
      <div
        className='text-start sm:text-center border'
        style={{
          backgroundColor: '#F6F8FA',
          display: 'flex',
          justifyContent: 'center',
          fontWeight: '700',
          borderBottomRightRadius: '12px',
          borderBottomLeftRadius: '12px',
          padding: '20px',
          flexDirection: 'column',
        }}>
        <p className='text-[32px]' style={{ color: colors.nnpcdarkgreen[800] }}>{number}</p>
        {showDropdown && options && (
          <select
            value={selectedOption}
            onChange={handleSelectChange}
            style={{ color: colors.dark[200] }}
            className='mt-[10px] border w-[100%] h-[40px] rounded-[32px] p-[10px] text-[14px] outline-none'
          >
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default InfoCard;

