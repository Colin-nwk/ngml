import { Message } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomInput, Notification } from '../../Components/index';

import images from '../../assets/index';

/**
 * The `Complaints` component is a React functional component that represents a complaint management interface.
 * It displays a list of complaint messages, allows the user to send a new message, and navigate to other parts of the application.
 * This component is part of a larger application for handling customer complaints or support tickets.
 *
 * @component
 * @example
 * // Render the Complaints component
 * <Complaints />
 */

const Complaints: React.FC = () => {


    const messageNotifications = [
        { title: 'New Message', date: '2024-03-29', content: 'Message content 1' },
    ];

    const navigate = useNavigate()

    const [complaintsMessage, setComplaintsMessage] = useState({
        message: '',
    });

    /**
    * Handles the change in the input field and updates the state with the new value.
    *
    * @param {string} value - The new value from the input field.
    * @param {string} key - The key in the state to update with the new value.
    */
    const handleInputChange = (value: string, key: string) => {
        console.log(value);
        setComplaintsMessage((prev) => ({ ...prev, [key]: value }));
    };

    /**
     * Handles the submission of a new complaint message.
     * Currently, this method doesn't perform any specific action but can be expanded to handle submissions.
     */
    const handleClose = () => {
        navigate(-1)
    };

    const handleSubmit = () => {

    }

    return (
        <div className="w-full h-full p-6 sm:p-8 bg-[#FFFFFF] bg-opacity-50 rounded-lg flex-col gap-8 flex">
            <div className="flex flex-wrap items-center justify-between w-full">
                <div className="text-center text-[#49526A] text-3xl font-bold font-['Mulish']">COMPLAINTS</div>
                <div className="flex items-center gap-4">
                    <Notification
                        count={messageNotifications.length}
                        headerTitle="Messages"
                        notifications={messageNotifications}
                        renderIcon={() => <div><Message style={{ fontSize: 'medium' }} /></div>}
                    />
                    <div className="flex justify-center px-3 py-2 border cursor-pointer rounded-2xl" onClick={handleClose}>
                        <img src={images.cancel} alt='cancel icon' className='w-4 h-4' />
                        <div className="text-center text-xs font-normal font-['Mulish']">Close</div>
                    </div>
                </div>
            </div>
            <div className='border rounded-[10px]'>
                <div className="w-full p-4 bg-[#f1f7ea] border justify-between items-center flex rounded-t-[10px] mb-20">
                    <div className="flex items-center justify-start gap-2">
                        <div className="flex items-center justify-center w-8 h-8">
                            <img className="w-8 h-8 rounded-full" src={images.avatarLogo} alt='avatar icon' />
                        </div>
                        <div className="text-[#49526A] text-base font-bold font-['Mulish'] leading-none">Dangote Cement Ltd.</div>
                    </div>
                    <div className="flex justify-center px-4 py-3 border rounded-3xl">
                        <div className="text-[#49526A] text-xs font-normal font-['Mulish']">Mark this issue as resolved</div>
                    </div>
                </div>
                <div className="w-full h-32 pl-4 pr-16 pb-4 bg-[#EAEEF2]">
                    <div className="h-28 py-2 border-t border-t-[#49526A]">
                        <div className="px-2 py-1 bg-[#D9DDDC] rounded-lg justify-start items-start gap-2.5 inline-flex">
                            <div className="text-[#49526A] text-xs font-bold font-['Red Hat Display']">DANGOTE CEMENT LTD</div>
                        </div>
                        <div className="text-[#808080] text-xs font-normal font-['Mulish'] mt-3">Gas Delivery timeline overdue be distracted by the readable content of a page when looking at its layout.The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here</div>
                        <div className="flex items-start justify-start gap-2">
                            <div className="text-[#808080] text-xs font-bold font-['Mulish']">1:22pm</div>
                            <div className="text-[#808080] text-xs font-bold font-['Mulish']">17/11/23</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end justify-start w-full h-32 gap-2 px-4 pb-4">
                    <div className="flex flex-col items-end justify-start gap-2 py-2 border-t h-28 border-nnpc-100">
                        <div className="px-2.5 py-1 bg-nnpc-100 rounded-lg justify-start items-start gap-2.5 inline-flex">
                            <div className="text-white text-xs font-bold font-['Red Hat Display']">You</div>
                        </div>
                        <div className="text-right text-xs font-normal font-['Mulish']">So sorry for the inconvenience,  we will attend to you shortly</div>
                        <div className="text-right text-xs font-normal font-['Mulish']">Thank you</div>
                        <div className="flex items-start justify-end gap-2">
                            <div className="text-[#808080] text-xs font-bold font-['Mulish']">2:22pm</div>
                            <div className="text-[#808080] text-xs font-bold font-['Mulish']">18/11/23</div>
                        </div>
                    </div>
                </div>
                <div className="w-full p-4 bg-white border-t border-gray-200 justify-start items-center border-b rounded-b-[10px] gap-2 inline-flex">
                    <div className="w-full">
                        <CustomInput
                            type="text"
                            value={complaintsMessage.message}
                            handleChangeEvent={(value) => handleInputChange(value, 'message')}
                            placeholder="Send a message"
                        />
                    </div>
                    <div className="flex items-center justify-center w-6 h-6 cursor-pointer">
                        <img src={images.send} alt='sendicon' className='w-20' onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Complaints;