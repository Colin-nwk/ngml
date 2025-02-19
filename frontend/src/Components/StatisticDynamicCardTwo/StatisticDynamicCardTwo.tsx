import React from 'react';

/**
 * @typedef {'primary' | 'secondary'} CardType - The type of the card.
 */

/**
 * Props for the StatisticDynamicCardTwo component.
 * @typedef {Object} StatCardProps
 * @property {CardType} type - The type of the card.
 * @property {JSX.Element} icon - The icon element to be displayed.
 * @property {number} value - The value to be displayed.
 * @property {number[]} [yearOptions] - Optional array of year options for selection.
 * @property {string} [content] - The main content to be displayed.
 * @property {string} [subcontent] - The subcontent to be displayed.
 * @property {string} [className] - Additional class name for customization.
 * @property {string} [contentColor] - Color of the content text.
 * @property {string} [subcontentColor] - Color of the subcontent text.
 * @property {string} [valueColor] - Color of the value text.
 * @property {string} [iconColor] - Color of the icon.
 * @property {string} [yearColor] - Color of the year select.
 */

/**
 * A dynamic statistic card component.
 * @param {StatCardProps} props - Props for the StatisticDynamicCardTwo component.
 * @returns {JSX.Element} A React component representing the statistic card.
 */

type CardType = 'primary' | 'secondary';

interface StatCardProps {
  type: CardType;
  icon: JSX.Element;
  value: number | string;
  yearOptions?: number[];
  content?: string;
  subcontent?: string;
  className?: string; // Add className prop
  contentColor?: string;
  subcontentColor?: string;
  valueColor?: string;
  iconColor?: string;
  yearColor?: string;
}

const StatisticDynamicCardTwo: React.FC<StatCardProps> = ({
  type,
  icon,
  value,
  yearOptions = [],
  content,
  subcontent,
  className,
  contentColor = 'text-white',
  subcontentColor = 'text-white',
  valueColor = 'text-white',
  iconColor = 'text-white',
  yearColor = 'text-white'
}) => {
    const backgroundColor = type === 'primary' ? 'bg-nnpc-300' : 'bg-nnpcyellow-50';

  return (
    <div
      className={`p-4 rounded-lg shadow-md ${className} ${backgroundColor}`}
    >
      <div className="">
        <div className="flex items-center justify-between">
          <div className={`mr-2 ${iconColor}`}>{icon}</div>
          {type === 'primary' && (
            <div className="relative border-2 rounded-[40px]">
              <select
                className={`appearance-none bg-transparent border-none outline-none py-1 px-2 pr-8 rounded ${yearColor}`}
                defaultValue={new Date().getFullYear()}
              >
                {yearOptions.map((year) => (
                  <option key={year} value={year} className={yearColor}>
                    {year}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className={`w-4 h-4 fill-current ${yearColor}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 14.707a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L10 12.586l-3.293-3.293a1 1 0 0 0-1.414 1.414l4 4z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='mt-6'>
        <div className={`mb-[-8px] font-[400] text-[20px] ${contentColor}`}>{content}</div>
        <div className={subcontentColor}>{subcontent}</div>
      </div>
      <div className={`text-[32px] font-[600] mt-6 ${valueColor}`}>{value}</div>
    </div>
  );
};

export default StatisticDynamicCardTwo;