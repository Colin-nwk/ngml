import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, DailyVolumnHistoryTable, Modal } from '../../Components/index';
import images from '../../assets/index';
import DailyVolumnUpload from './DailyVolumnUpload';

const Dailyvolumns: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDailyVolumnData, setDailyVolumnData] = useState({
        DataType: '',
        year: '',
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const modalParam = params.get('modal');
        if (modalParam === 'open') {
            setIsModalOpen(true);
        }
    }, [location.search]);

    const handleClose = () => {
        navigate(-1);
    };

    const toggleModal = () => {
        setIsModalOpen(prevState => {
            const newState = !prevState;
            const params = new URLSearchParams(location.search);
            if (newState) {
                params.set('modal', 'open');
            } else {
                params.delete('modal');
            }
            navigate(`${location.pathname}?${params.toString()}`, { replace: true });
            return newState;
        });
    };

    const handleUploadNewInvoice = () => {
        toggleModal();
    };

    const handleGenerateInvoice = () => {
        console.log('Upload I invoice:', newDailyVolumnData);
        toggleModal();
    };

    return (
        <div className="w-full h-full">
            <div className="w-100% h-full p-8 bg-[#FFFFFF] bg-opacity-50 rounded-lg flex-col justify-start items-start gap-8 flex">
                <div className="w-full justify-between items-center flex">

                    <div className="text-center text-3xl font-semibold">Daily Volumes History</div>
                    <div className="items-center gap-4 flex">
                        <div className="w-36 p-3 rounded-3xl border justify-center flex cursor-pointer" onClick={handleUploadNewInvoice}>
                            <div className="text-[14px] leading-none">Add New Volume</div>
                        </div>
                        <div className="w-38 p-2.5 rounded-3xl border justify-center items-center gap-1 flex cursor-pointer" onClick={handleClose}>
                            <div className="w-4 h-4 justify-center items-center flex">
                                <img src={images.upload} alt="close icon" width={'20px'} />
                            </div>
                            <div className="Close text-center text-[#808080] text-[14px] font-normal">Upload Data Sheet</div>
                        </div>
                        <div className="w-16 p-2.5 rounded-3xl border justify-center items-center gap-1 flex cursor-pointer" onClick={handleClose}>
                            <div className="w-4 h-4 justify-center items-center flex">
                                <img src={images.cancel} alt="close icon" width={'10px'} />
                            </div>
                            <div className="Close text-center text-[#808080] text-[12px] font-normal">Close</div>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <DailyVolumnHistoryTable />
                </div>
            </div>
            <div>
                <Modal
                    isOpen={isModalOpen}
                    onClose={toggleModal}
                    title="Daily Volume Sheet Upload"
                    buttons={[
                        <div className='flex gap-2 mb-[-10px] ' key="modal-buttons">
                            <div className='w-[120px]'>
                                <Button
                                    type="outline"
                                    label="Cancel"
                                    action={toggleModal}
                                    color="#FFFFFF"
                                    width="100%"
                                    height="40px"
                                    fontSize="16px"
                                    radius="20px"
                                />
                            </div>
                            <div className='w-[260px]'>
                                <Button
                                    type="secondary"
                                    label="Confirm"
                                    action={handleGenerateInvoice}
                                    color="#FFFFFF"
                                    width="100%"
                                    height="40px"
                                    fontSize="16px"
                                    radius="20px"
                                />
                            </div>
                        </div>
                    ]}
                >
                    <DailyVolumnUpload
                        DailyVolumnUploadData={newDailyVolumnData}
                        setDailyVolumnUploadData={setDailyVolumnData}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default Dailyvolumns;