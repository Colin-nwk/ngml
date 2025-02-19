import React from 'react';
import images from '../../assets/index';

/**
 * A customizable Location Card  component.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the statistic.
 * @param {string|number} props.value - The value for the Location.
 * @param {boolean} [props.primary=true] - Determines whether the card is of primary type. Defaults to true.
 * @param {React.ReactNode} [props.labelSpan] - Optional JSX element to be rendered directly under the label.
 * @param {string} [props.className] - Optional additional class names for the component.
 * @returns {JSX.Element} The rendered LocationCard component.
 */

interface LocationCardProps {
  label: string;
  value: string | number;
  primary?: boolean;
}

const LocationCard: React.FC<LocationCardProps> = ({
  label,
  value,
  primary = true,
}) => {
  const labelBgColor = primary ? 'bg-[#226844] text-[#FFFFFF]' : 'bg-[#EAEEF2] text-[#808080]';
  const valueBgColor = primary ? 'bg-[#00af50] text-[#FFFFFF]' : 'bg-[#FFFFFF]';

  return (
    <div className={`w-[100%] h-56 relative rounded-[20px] border ${!primary ? 'shadow-sm' : ''} `}>
      {primary ? 
        <img className="absolute w-[100%] h-[100%] inset-0 z-0 object-cover" src={images.cardicon} alt="card icon" /> 
         : 
        <img className="absolute w-[100%] h-[100%] inset-0 z-0 object-cover" src={images.DataBox} alt="data box" />
      }
      <div className={`p-3 w-full rounded-t-[20px] ${labelBgColor} h-2/5 flex flex-col justify-center items-center`}>
        <span className='md:text-2xl text-[16px] text-gray-700 text-center font-bold'>{label}</span>
      </div>
      <div className={`w-full h-3/5 ${valueBgColor} text-center rounded-b-[20px] flex justify-center items-center`}>
        <h4 className={primary ? 'md:text-[16px] text-[14px] font-medium' : 'md:text-[16px] text-[14px] font-500 '}>{value}</h4>
      </div>
    </div>
  );
};

export default LocationCard;
