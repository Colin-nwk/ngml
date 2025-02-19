import React from 'react';

type AgreementModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    modalTitle: string;
    content: string | JSX.Element;
};

const AgreementModal: React.FC<AgreementModalProps> = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-lg max-w-md w-full">
                <h3 className="text-lg font-semibold">{title}</h3>
                <div className="mt-2">{content}</div>
                <button onClick={onClose} className="mt-4 bg-green-500 text-white rounded-[10px] px-4 py-2 hover:bg-green-700">
                    Close
                </button>
            </div>
        </div>
    );
};

export default AgreementModal;
