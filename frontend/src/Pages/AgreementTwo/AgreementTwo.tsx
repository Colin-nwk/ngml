import { useState } from 'react';
import { Button, DocumentCardThree, FileUploadInput, Modal } from '../../Components/index';

import images from '../../assets/index';

/**
 * CostAnalysis Component
 *
 * This is a React functional component that displays a document card layout for cost analysis two.
 * It includes a section to upload or create CAPEX-related documents, as well as a list of existing document cards.
 *
 * @returns {JSX.Element} A JSX element representing the CostAnalysis layout.
 *
 * @structure
 * - A container `div` with class `w-full h-full p-4 bg-white rounded-xl flex flex-col justify-start items-start gap-4 md:gap-6`.
 * - A document section `div` with class `w-full h-96 bg-white rounded-xl border flex flex-col justify-start items-start`.
 * - Header section containing:
 *   - A title "Documents" with specific styles.
 *   - Buttons to "Upload Document".
 * - A flex-wrap section containing a `DocumentCardThree` with specific properties:
 *   - `title`: Title of the document (e.g., "Dangote Cement").
 *   - `subtitle`: Subtitle of the document (e.g., "Site Survey Report").
 *   - `linkText`: Text indicating a link (e.g., "Last edited").
 *   - `linkText2`: Additional text indicating date (e.g., "12/13/2023").
 *   - `icon`: Icon associated with the document card.
 *   - `width` and `height`: Dimensions of the document card.
 */

interface CardDataItem {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    linkText: string;
    linkText2: string;
    width: number | string;
    height: number | string;
}

const AgreementTwo: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCreateCustomer = () => {

    };

    const costAnalysisCardDataTwo: CardDataItem[] = [
        {
            title: 'GSPA',
            subtitle: 'Document',
            linkText: 'Status',
            linkText2: 'Unavailable',
            icon: <img src={images.files} alt="Copy Icon" className="w-5 h-5" />,
            width: '200px',
            height: '100%',
        },
    ]

    return (
        <div className="w-full h-full p-4 bg-white rounded-xl flex flex-col gap-4 md:gap-6">
            <div className="w-full h-full bg-white rounded-xl border flex flex-col justify-start items-start gap-4">
                <div className="w-full flex flex-col md:flex-row justify-between items-center p-4 bg-white border rounded-xl">
                    <div className="text-lg md:text-xl font-bold font-['Mulish']">
                        Documents
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="flex items-center border px-3 py-2 rounded-3xl hover:bg-gray-100" onClick={toggleModal}>
                            <img src={images.upload} alt="Upload" className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-sm md:text-base ml-2 cursor-pointer">Upload Document</span>
                        </div>
                    </div>
                </div>
                <div className=" flex-wrap w-full p-3 bg-[#FFFFFF] border-b items-center gap-3 flex">
                    {costAnalysisCardDataTwo.map((cards, index) => (
                        <div key={index} className="flex flex-1 min-w-[150px] max-w-[200px]">
                            <DocumentCardThree
                                title={cards.title}
                                subtitle={cards.subtitle}
                                linkText={cards.linkText}
                                linkText2={cards.linkText2}
                                icon={cards.icon}
                                height={cards.height}
                            />
                        </div>
                    ))}

                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={toggleModal}
                size='medium'
                title='CAPEX Sheet Upload'
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
    );
};

export default AgreementTwo;