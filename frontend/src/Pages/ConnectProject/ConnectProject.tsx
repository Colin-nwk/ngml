
import { useState } from 'react';
import { Button, CustomInput, Modal } from '../../Components/index';
import images from '@/assets';

/**
 * ConnectProject component for handling project date selection and other project-related operations.
 *
 * @component
 * @example
 * <ConnectProject />
 *
 * @returns {React.FC} The ConnectProject component.
 */
const ConnectProject: React.FC = () => {
    const [projectDate, setProjectDate] = useState({
        startdate: '',
        enddate: '',
    });
    const [firstGasDate, setFirstGasDate] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    // const [isTenderingVisible, setIsTenderingVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    // const [isTenderingComplete, setIsTenderingComplete] = useState(false);
    // const [isStrategyVisible, setIsStrategyVisible] = useState(false);
    // const [selectedStrategy, setSelectedStrategy] = useState('');
    const [areDatesConfirmed, setAreDatesConfirmed] = useState(false); 



    const handleConfirmDates = () => {
        setAreDatesConfirmed(true); 
    };

    const handleInputChange = (value: string, key: string) => {
        setProjectDate({ ...projectDate, [key]: value });
    };


    const handleClose = () => {
        setIsModalOpen(false);
    };


    const areDatesSelected = projectDate.startdate && projectDate.enddate;

    return (
        <div className="inline-flex flex-col items-start justify-start w-full h-full gap-2">
            <div className="flex flex-col items-start justify-start w-full h-full gap-6 p-4 bg-white rounded-xl">
                <div className="w-full justify-end items-center flex">
                    <div className="items-center gap-4 flex">
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="p-2 rounded-3xl border justify-center flex cursor-pointer"
                        >
                            <div className="text-[12px] leading-none">
                                {firstGasDate ? 'Adjust First Gas Date' : 'Set First Gas Date'}
                            </div>
                        </div>
                        <div className="p-1 rounded-3xl border justify-center items-center gap-1 flex cursor-pointer" onClick={handleClose}>
                            <div className="w-4 h-4 justify-center items-center flex">
                                <img src={images.cancel} alt="close icon" width={'10px'} />
                            </div>
                            <div className="Close text-center text-[#808080] text-[12px] font-normal">Close</div>
                        </div>
                    </div>
                </div>
                <div className="flex p-2 py-3 items-center justify-between w-full border rounded-xl">
                    <div className="text-[#808080] text-base font-600 font-['Mulish'] ml-4">First Gas Date</div>
                    <div className="mr-2 bg-[#D2F69E] px-2 py-1 rounded-[20px]">
                        <div className='text-[#266425] text-[12px] font-[700]'>{firstGasDate || 'Add a date'}</div>
                    </div>
                </div>
                {!areDatesConfirmed && (
                    <div className="w-full h-full p-5 space-y-6 border rounded-xl">
                        <div className="text-base font-bold font-['Mulish'] leading-none">SET PROJECT DATES</div>
                        <div>
                            <CustomInput
                                type="date"
                                label='Proposed Project Start Date'
                                value={projectDate.startdate}
                                handleChangeEvent={(value) => handleInputChange(value, 'startdate')}
                                placeholder="Select start date"
                            />
                        </div>
                        <div>
                            <CustomInput
                                type="date"
                                label='Proposed Project End Date'
                                value={projectDate.enddate}
                                handleChangeEvent={(value) => handleInputChange(value, 'enddate')}
                                placeholder="Select end date"
                            />
                        </div>
                        <div className='flex items-end justify-end'> 
                            <div className="w-[30%]">
                            {areDatesSelected && (
                                <Button
                                    type="secondary"
                                    label="Confirm Selection"
                                    action={handleConfirmDates}
                                    color="#FFFFFF"
                                    width="100%"
                                    height="40px"
                                    fontSize="16px"
                                    radius="20px"
                                />
                            )}
                        </div></div>
                       
                    </div>
                )}

                {areDatesConfirmed && (
                    <div className="w-full h-full p-5 space-y-6 border rounded-xl">
                        <div className="text-base font-bold font-['Mulish'] leading-none">SELECTED PROJECT DATES</div>
                        <div className="text-[#266425] text-[16px]">
                            <p className='mb-2'><strong>Start Date:</strong> {projectDate.startdate}</p>
                            <p><strong>End Date:</strong> {projectDate.enddate}</p>
                        </div>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleClose}
                title="Select First Gas Date"
                buttons={[
                    <Button
                        key="cancel"
                        type="outline"
                        label="Cancel"
                        action={handleClose}
                        color="#FFFFFF"
                        width="100px"
                        height="40px"
                        fontSize="16px"
                        radius="20px"
                    />,
                    <Button
                        key="confirm"
                        type="secondary"
                        label="Confirm"
                        action={() => {
                            setFirstGasDate(selectedDate);
                            setIsModalOpen(false);
                        }}
                        color="#FFFFFF"
                        width="100px"
                        height="40px"
                        fontSize="16px"
                        radius="20px"
                    />,
                ]}
            >
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full"
                />
            </Modal>
        </div>
    );
};

export default ConnectProject;


















