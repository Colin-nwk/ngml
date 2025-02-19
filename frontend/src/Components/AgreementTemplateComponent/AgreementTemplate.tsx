import React, { useState } from 'react';
import AgreementModal from './AgreementModal';
import { Divider } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';


/**
 * Represents a template card for agreements. It allows users to add new templates dynamically and
 * view them in a list. Each template can be clicked to open a modal with more details.
 * 
 * @component
 * @param {Object} props
 * @param {JSX.Element} props.icon - The icon displayed on each template card.
 * @param {string} props.heading - The heading text for each template card.
 * @param {string} props.title - The title text displayed on each template card.
 * @param {string} props.modalTitle - The title for the modal that opens when a template is clicked.
 * @param {string | JSX.Element} props.modalContent - The content displayed inside the modal when a template is clicked.
 */

type AgreementTemplateProps = {
    icon: JSX.Element;
    heading: string;
    title: string;
    modalTitle: string;
    modalContent: string | JSX.Element;
};

const AgreementTemplate: React.FC<AgreementTemplateProps> = ({ icon, heading, title, modalTitle, modalContent }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [templates, setTemplates] = useState<string[]>([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const addTemplate = () => {
        const newTemplate = `Template ${templates.length + 1}`;
        setTemplates([...templates, newTemplate]);
    };

    return (
        <div className='h-[200px] w-[1152px] border border-[#E2E4EB] ml-[20px] rounded-[12px] '>
            <div className='h-[56px] bg-[#F6F8FA] flex justify-between items-center p-[16px]	'>
                <div className='text-[#49526A] font-[700] text-[20px]'>TEMPLATES</div>
                <div className='flex items-center gap-[8px]'>
                    <div className='text-[#828DA9]' onClick={addTemplate}><AddCircleOutline /> </div>
                    <div className='h-[24px] w-[31px] text-[12px] rounded-[24px] bg-[#EAEEF2] text-[#050505] font-[500] flex justify-center items-center'>
                        {templates.length}
                    </div>
                </div>
            </div>
            <Divider />
            <div className='h-[114px] p-[10px] flex flex-wrap gap-[12px]'>
                {templates.map((_template, index) => (
                    <div key={index} className="border border-[#E2E4EB] bg-[#FBFDFF] rounded-md h-[120px] w-[100px] flex flex-col justify-center items-center ">
                        <div className="text-[#CCD0DC] rounded-[40px] p-[10px] cursor-pointer h-[32px] w-[32px] border border-[#CCD0DC] flex justify-center items-center" onClick={openModal}>
                            {icon}
                        </div>
                        <div className="text-[12px] font-[700] text-[#49526A]">{heading}</div>
                        <div className="text-[10px] font-[400] text-[#828DA9] italic">{title}</div>
                    </div>
                ))}
                <AgreementModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={modalTitle}
                    content={modalContent}
                    modalTitle={''}>
                </AgreementModal>
            </div>
        </div>
    );
};





export default AgreementTemplate;






