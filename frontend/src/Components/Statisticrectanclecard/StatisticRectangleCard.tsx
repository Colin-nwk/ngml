import React, { useState } from 'react';
import { Link } from 'react-router-dom';


interface StatisticRectangleCardProps {
  icon?: React.ReactNode;
  title?: string;
  value?: string;
  valueColor?: string;
  backgroundColor?: string;
  color?: string;
  size?: string;
  iconBgColor?: string;
  iconSize?: string;
  to?: string;
}

const StatisticRectangleCard: React.FC<StatisticRectangleCardProps> = ({
  icon = null,
  title = 'new',
  value,
  valueColor = 'text-gray-700',
  backgroundColor = 'bg-white',
  color = 'text-gray-700',
  size,
  iconBgColor = 'bg-[#00AF50]',
  iconSize = 'w-[30px]',
  to = ''
}) => {
  const [iconHovered, setIconHovered] = useState(false);

  const handleIconHover = () => {
    setIconHovered(true);
  };

  const handleIconLeave = () => {
    setIconHovered(false);
  };

  return (
    <Link to={to} style={{ textDecoration: 'none', width: '100%' }}>
      <div
        style={{ width: '100%', height: '64px' }}
        className={`rounded-[12px] p-[8px] border border-[#E2E4EB] cursor-pointer
        ${backgroundColor} ${color} ${size} shadow-sm flex items-center
        justify-between transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md hover:bg-[#F5F7F9]`}
        aria-label={title}
      >
        <div className='flex items-center gap-2 w-[100%]'>
          <div
            data-testid="icon-container"
            className={`${iconBgColor} py-1`}
            onMouseEnter={handleIconHover}
            onMouseLeave={handleIconLeave}
            style={{ backgroundColor: iconHovered ? '#dddddd' : '' }}
          >
            {icon && <div className={`${iconSize} flex justify-center items-center`} style={{ fontSize: 'small' }}>{icon}</div>}
          </div>
          <h3 className="text-lg font-[400] text-[#828DA9]">{title}</h3>
        </div>
        <div>
          <h3 className={`text-lg font-bold mr-2 ${valueColor}`}>{value}</h3>
        </div>
      </div>
    </Link>
  );
};

export default StatisticRectangleCard;