import { ContentPasteOutlined, HighlightOff } from '@mui/icons-material';
import { Box } from '@mui/material';
import Button from '../../ButtonComponent/Button';

interface SelectedDateModalprops {
  dateTime?: string;
  status?: string;
  companyName?: string;
  companyEmail?: string;
  companyNumber?: string;
  availableDates?: string[]; // Make availableDates optional
  companyAddress?: string;
  statusHeading?: string;
  handleClose: () => void;
  statusStyle?: React.CSSProperties;
}

const SiteVistTableModal: React.FC<SelectedDateModalprops> = ({
  dateTime,
  status,
  companyName,
  companyEmail,
  companyNumber,
  availableDates,
  companyAddress,
  statusHeading,
  handleClose,
  statusStyle,
}) => {

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[750px] bg-white shadow-2xl rounded-md">
      <Box>
        <div className='flex justify-between items-center h-[60px] p-[10px]'>
          <div className='text-[20px] text-[#49526A] font-[700]'>SITE VISIT</div>
          <div>
            <Button
              type='tertiary'
              label='Cancel'
              width='84px'
              height='32px'
              radius='32px'
              color='#828DA9'
              fontWeight='400'
              fontSize='8px'
              iconPosition='left'
              icon={<div><HighlightOff /></div>}
              iconColor='#828DA9'
              action={handleClose}
            />
          </div>
        </div>
      </Box>
      <div className='h-[44px] bg-[#F6FDEC] p-[10px]'>
        <div className='flex justify-between '>
          <div className='flex gap-[8px] items-center'>
            <div className='text-[#828DA9] text-[12px] font-[700]'>Dates Picked On</div>
            <div className='text-[#828DA9] text-[12px] font-[400]'>{dateTime}</div>
          </div>
          <div style={statusStyle}
            className='border border-[#E2E4EB] w-[115px] h-[24px] bg-[#EAEEF2] rounded-[24px] flex items-center justify-center text-[#050505] text-[12px]'>
            {statusHeading}
          </div>
        </div>
      </div>
      <div className='h-[94px] bg-[#F6F8FA] p-[10px]'>
        <div className='flex justify-between w-[100%]'>
          <div className='text-[#828DA9] text-[14px] font-[500] w-[50%] flex justify-between'>
            <div>
              <div>Company Name</div>
              <div>Company Email</div>
              <div>Company Number</div>
            </div>
            <div>
              <div>{companyName}</div>
              <div>{companyEmail}</div>
              <div>{companyNumber}</div>
            </div>
          </div>
          <div className='border border-[#CCD0DC] cursor-pointer h-[32px] w-[32px] rounded-[100%] flex items-center justify-center'>
            <ContentPasteOutlined style={{ height: '14px', width: '14px', color: '#828DA9' }} />
          </div>
        </div>
      </div>
      {availableDates && (
        <div className='h-[119px] bg-[#FFFFFF] flex items-center justify-center '>
          <div className='border border-[#E2E4EB] w-[726px] rounded-[12px] h-[95px] p-[20px] pt-[10px] flex flex-col gap-y-[10px]'>
            <div className='text-[#828DA9] text-[16px] font-[700]'>Available Dates</div>
            <ul className='flex gap-[10px]'>
              {availableDates.map((date, index) => (
                <li key={index} className='bg-[#EAEEF2] h-[24px] p-[8px] text-[12px] flex items-center justify-center rounded-[24px] text-[#49526A]'>{date}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className='h-[119px] bg-[#FFFFFF] flex items-center justify-center '>
        <div className='border border-[#E2E4EB] w-[726px] rounded-[12px] h-[95px] p-[20px] pt-[10px] flex flex-col gap-y-[10px]'>
          <div className='text-[#828DA9] text-[16px] font-[700]'>Address Provided by Customer</div>
          <div className='text-[#050505] text-[16px] font-[500]'>{companyAddress}</div>
        </div>
      </div>
      <div className='h-[48px] p-[20px] text-[#828DA9] text-[14px] font-[700] bg-[#FFF3D5] flex items-center justify-end'>
        {status}
      </div>
    </div>
  );
};

export default SiteVistTableModal;
