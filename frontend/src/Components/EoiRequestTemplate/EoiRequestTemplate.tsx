
import { Heading } from '@/Components';
import colors from '@/Utils/colors';
import { ContentPasteOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';

interface EoiRequestTemplateprops {
    dateTime?: string;
    status?: string;
    companyName?: string;
    companyEmail?: string;
    companyNumber?: string;
    handleClose: () => void;
    statusHeading?: string;
    statusStyle?: React.CSSProperties;
    approverName?: string;
    disapprovalReason?: string;
}

const EoiRequestTemplate: React.FC<EoiRequestTemplateprops> = ({
    companyName,
    companyEmail,
    companyNumber,

}) => {

    return (
        <div className="  h-[100%] w-[100%] rounded-[6px]" style={{ background: colors.dark[50] }}>
            <Box>
                <div className='items-center h-[100%] p-4'>
                    <Heading as="h6" size="h6" color='primaryColor' className="font-[2px] text-dark-400">EOI</Heading>
                </div>
            </Box>

            <div className='h-fit bg-[#F6F8FA] p-4'>
                <div className='flex justify-between w-[100%]'>
                    <div className='text-[#828DA9] text-[14px] font-[500] w-[50%] flex justify-between'>
                        <div>
                            <div className='font-[800]'>Company Name :</div>
                            <div className='font-[800]'>Company Email :</div>
                            <div className='font-[800]' >Company Number :</div>

                        </div>
                        <div>
                            <div className='font-[600]'>{companyName}</div>
                            <div className='font-[600]'>{companyEmail}</div>
                            <div className='font-[600]'>{companyNumber}</div>
                        </div>

                    </div>
                    <div className='border border-[#CCD0DC] cursor-pointer h-[32px] w-[32px] rounded-[100%] flex items-center justify-center'>
                        <ContentPasteOutlined style={{ height: '14px', width: '14px', color: '#828DA9' }} />
                    </div>
                </div>
            </div>
            <div className='h-100% w-[100%] bg-[#FFFFFF] flex items-center justify-center p-[10px]'>

            </div>

        </div>
    );
};

export default EoiRequestTemplate;
