import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, FileUploadInput, Heading, Modal } from '../../Components/index';
// import images from '../../assets/index';

// interface CardDataItem {
//     type: 'withLink' | 'withoutLink' | 'withReport';
//     title: string;
//     subtitle: string;
//     icon: React.ReactNode;
//     linkText: string;
//     linkText2: string;
//     width: number | string;
//     height: number | string;
// }

// const documentCardData = [
//     {
//         title: 'GSPA',
//         subtitle: 'Agreement',
//         buttonText: 'Use template',
//         height: '140px'
//     },
//     {
//         title: 'Supplement',
//         subtitle: 'Agreement',
//         buttonText: 'Use template',
//         height: '140px'
//     },
//     {
//         title: 'Addendum',
//         subtitle: 'Agreement',
//         buttonText: 'Use template',
//         height: '140px'
//     },
//     {
//         title: 'Side',
//         subtitle: 'Letter',
//         buttonText: 'Use template',
//         height: '140px'
//     },
//     {
//         title: 'Approval',
//         subtitle: 'Letter',
//         buttonText: 'Use template',
//         height: '140px'
//     },
// ];

// const documentCardDataTwo: CardDataItem[] = [
//     {
//         type: 'withLink',
//         title: 'Dangote Cement',
//         subtitle: 'Site Survey Report',
//         linkText: 'Last Updated',
//         linkText2: '12/13/2023',
//         icon: <img src={images.files} alt="Copy Icon" className="w-5 h-5" />,
//         width: '200px',
//         height: '100%',
//     }
// ];

const Agreement: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const modalParam = params.get('modal');
        if (modalParam === 'open') {
            setIsModalOpen(true);
        }
    }, [location.search]);

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

    const handleCreateCustomer = () => {
        // Your logic for handling the create customer action
    };

    return (
        <>
            <div className='flex items-end justify-end gap-2 mb-3'>
                <Button
                    type="primary"
                    label="UPLOAD AGREEMENT"
                    radius="20px"
                    width="190px"
                    height="32px"
                    columnGap="5px"
                    action={() => toggleModal()}
                />

            </div>
            <div className='p-4 bg-[#FFFFFF] rounded-[10px]'>
                <div className="w-full h-full border flex-col rounded-[10px]">
                    <div className="w-full px-4 py-2.5 bg-white border-b rounded-t-[10px] flex justify-between items-center">
                        <Heading as="h4" size="h6" color="primaryColor" className="font-[2px] text-dark-100">
                            AGREEMENT TEMPLATES
                        </Heading>
                        {/* <div className="text-xl font-bold font-['Mulish']">AGREEMENT TEMPLATES</div> */}
                        {/* <div className="flex items-center border px-3 py-2 rounded-3xl hover:bg-gray-100" onClick={toggleModal}>
                        <img src={images.upload} alt="Upload" className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-sm md:text-base ml-2 cursor-pointer">Upload Agreement</span>
                    </div> */}
                    </div>
                    {/* <div className="flex flex-wrap w-full p-3 bg-[#FFFFFF] items-center gap-3">
                    {documentCardData.map((card, index) => (
                        <div key={index} className="flex flex-1 min-w-[150px] max-w-[200px]">
                            <DocumentCardTwo
                                title={card.title}
                                subtitle={card.subtitle}
                                buttonText={card.buttonText}
                                icon={''}
                                height={card.height}
                            />
                        </div>
                    ))}
                </div> */}
                    {/* <div className="w-full px-3 py-2.5 bg-[#EAEEF2] border-t border-b justify-between items-center flex">
                    <div className="text-xs font-bold font-['Mulish'] leading-3">Agreement Documents</div>
                    <div className="p-2 bg-nnpcmediumgreen-850 rounded-3xl gap-2.5 inline-flex">
                        <div className="text-center text-xs font-medium font-['Mulish'] leading-3">01</div>
                    </div>
                </div> */}
                    {/* <div className="flex flex-wrap w-full p-3 bg-[#FFFFFF] items-center gap-3 rounded-b-[10px]">
                    {documentCardDataTwo.map((cards, index) => (
                        <div key={index} className="flex flex-1 min-w-[150px] max-w-[200px]">
                            <DocumentCard
                                type={cards.type}
                                title={cards.title}
                                subtitle={cards.subtitle}
                                linkText={cards.linkText}
                                linkText2={cards.linkText2}
                                icon={''}
                                height={cards.height}
                            />
                        </div>
                    ))}
                </div> */}
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onClose={toggleModal}
                    size='medium'
                    title='Upload Document'
                    subTitle=''
                    buttons={[
                        <div className='flex gap-2 mb-[-10px]'>
                            <div className='w-[120px]'>
                                <Button
                                    type="outline"
                                    label="Cancel"
                                    action={toggleModal}
                                    color="#FFFFFF"
                                    fontStyle="italic"
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
                                    action={handleCreateCustomer}
                                    color="#FFFFFF"
                                    fontStyle="italic"
                                    width="100%"
                                    height="40px"
                                    fontSize="16px"
                                    radius="20px"
                                />
                            </div>
                        </div>
                    ]}
                >
                    <FileUploadInput
                        title=''
                        maxSizeMB={25}
                        fileDescription="Only .xlxs file accepted"
                    />
                </Modal>
            </div>

        </>

    );
};

export default Agreement;