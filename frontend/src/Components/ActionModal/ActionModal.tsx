import logo from '@/assets/images/png-icons/Done.png';
import { FC, ReactNode } from 'react';

/**
 * Props for the ActionModal component.
 * @interface
 */
interface ActionModalProps {
    /**
     * Whether the modal is open or closed.
     * @type {boolean}
     */
    isOpen: boolean;

    /**
     * Function to close the modal.
     * @type {() => void}
     */
    onClose: () => void;

    /**
     * Size of the modal.
     * @type {'small' | 'medium' | 'large'}
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';

    /**
     * Title of the modal.
     * @type {string}
     */
    title: string;

    /**
     * Optional subtitle of the modal.
     * @type {string}
     * @default undefined
     */
    subTitle?: string;

    /**
     * Optional button to display at the bottom of the modal.
     * @type {ReactNode}
     * @default undefined
     */
    button?: ReactNode;
}

/**
 * A modal component for displaying action-related messages.
 * @component
 * @param {ActionModalProps} props - The props for the ActionModal component.
 * @returns {JSX.Element} The ActionModal component.
 */
const ActionModal: FC<ActionModalProps> = ({
    isOpen,
    size = 'medium',
    title,
    subTitle,
    button,
}) => {
    /**
     * Determines the size class for the modal based on the provided size prop.
     * @function
     * @returns {string} The size class for the modal.
     */
    const getSizeClass = () => {
        switch (size) {
            case 'small':
                return 'max-w-xs h-[75%]';
            case 'large':
                return 'max-w-lg h-[90%]';
            default:
                return 'max-w-sm h-[80%]';
        }
    };

    return (
        <>
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-visible outline-none">
                        <div className="absolute inset-0 bg-black opacity-20"></div>
                        <div className="relative z-50 w-full max-h-screen overflow-visible">
                            <div
                                className={`space-y-10 relative z-50 mx-auto bg-white shadow-lg rounded-[20px] ${getSizeClass()} pt-16`}
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="modal-headline"
                            >
                                {/* Done Image Container */}
                                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-60">
                                    <div className="w-[130px] h-[130px] rounded-full bg-[rgba(210,246,158,0.2)] flex items-center justify-center">
                                        <div className="w-[105px] h-[105px] rounded-full bg-[rgba(210,246,158,0.5)] flex items-center justify-center">
                                            <div className="w-[80px] h-[80px] rounded-full bg-[#D2F69E] flex items-center justify-center">
                                                <img src={logo} alt="done logo" className="w-12 h-12" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="">
                                    <div className="overflow-y-auto max-h-96 px-10">
                                        <h1 id="modal-headline" className="text-xl text-center font-bold">
                                            {title}
                                        </h1>
                                        {subTitle && (
                                            <h3 className="text-sm text-[#9CA3AF] text-center">
                                                {subTitle}
                                            </h3>
                                        )}
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 bg-white w-4 h-4 -rotate-45"></div>
                                </div>
                                <div className="bg-green-500 px-20 py-10 rounded-b-[20px]">
                                    <div className="flex justify-center">
                                        {button}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ActionModal;