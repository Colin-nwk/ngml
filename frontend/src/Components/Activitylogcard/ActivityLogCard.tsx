import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders a card for displaying activity log information.
 * @param {object} props - The props for the ActivityLogCard component.
 * @param {string} props.title - The title of the activity log.
 * @param {string} props.text - The text content of the activity log.
 * @param {Date} [props.dateTime] - The date and time of the activity log (optional).
 * @param {React.ReactNode} [props.button] - JSX element for an optional button (optional).
 * @returns {JSX.Element} - The JSX element representing the ActivityLogCard component.
 */

interface ActivityLogCardProps {
  title?: string;
  route?: string;
  text?: string;
  start_time?: Date;
  button?: React.ReactNode;
}

const ActivityLogCard: React.FC<ActivityLogCardProps> = ({
  title,
  route = 'https://ngml.skillzserver.com/admin/records/customer/',
  text,
  start_time,
  button
}) => {
  const formattedDateTime = start_time ? format(start_time, 'dd MMM; hh:mma').toUpperCase() : null;

  const truncateTitle = (title?: string) => {
    if (!title) return '';
    return title.length > 18 ? `${title.substring(0, 18)}...` : title;
  };

  return (
    <Link to={route}>
      <div className='w-[100%] h-[100%] mt-[10px] cursor-pointer'>
        <div className={`bg-white w-[100%] h-[100%] border border-[#E2E4EB] rounded-[8px] ${button ? 'p-12 mb-4 relative' : 'p-2 mb-4 relative'}`}>
          <div className="flex justify-between mb-[3px]">
            {button ? (
              <div className="bg-customGreen text-gray-800 font-[300] mt-[-35px] ml-[-30px] rounded px-2 py-1">{truncateTitle(title)}</div>
            ) : (
              <div className="bg-[#53B052] text-white text-[12px] p-1 rounded-[5px] font-[700]">{truncateTitle(title)}</div>
            )}
            {formattedDateTime && (
              <div className={button ? 'text-[#828DA9] text-[13px] mt-[-40px] mr-[-40px]' : 'text-[#828DA9] text-[10px] font-[500]'}>
                {formattedDateTime}
              </div>
            )}
          </div>
          {button ? (
            <div className="text-gray-800 mt-[-10px] ml-[-30px]">{text}</div>
          ) : (
            <div className="text-[#49526A] text-[14px] font-[300]">{title}</div>
          )}
          {button && (
            <div className="absolute bottom-2 right-2">
              {button}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ActivityLogCard;
