import { FC, ReactNode } from 'react';

/**
 * Modal component that displays a dialog box on top of the content with an optional backdrop.
 * @param {Object} props - Component props.
 * @param {boolean} props.isOpen - Flag indicating whether the modal is open.
 * @param {Function} props.onClose - Function to handle closing the modal.
 * @param {'small' | 'medium' | 'large'} [props.size='medium'] - Optional size of the modal.
 * @param {string} props.title - Title of the modal.
 * @param {string} [props.subTitle] - Subtitle of the modal.
 * @param {ReactNode[]} [props.buttons] - Custom buttons to be displayed in the modal.
 * @param {ReactNode} props.children - Child components to be rendered within the modal.
 * @returns {JSX.Element} Modal component.
 */

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: 'small' | 'medium' | 'large';
  title: string;
  subTitle?: string;
  buttons?: ReactNode[];
  children?: ReactNode;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  size = 'medium',
  title,
  subTitle,
  buttons = [],
  children,
}) => {
  const getSizeClass = () => {

    
 /**
     * Get the CSS class based on the modal size.
     * @returns {string} CSS class for modal size.
     */
    
    switch (size) {
      case 'small':
        return 'max-w-sm';
      case 'large':
        return 'max-w-3xl';
      default:
        return 'max-w-md';
    }
  };

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative z-50 w-full max-h-screen overflow-auto">
              <div
                className={`relative z-50 mx-auto bg-white shadow-lg rounded-[20px] ${getSizeClass()}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="p-3">
                  <div className="mb-4">
                    <h2 id="modal-headline" className="text-lg font-semibold text-center mt-[20px]">
                      {title}
                    </h2>
                    <h3 className="text-sm text-gray-300 text-center">
                      {subTitle}
                    </h3>
                  </div>
                  <div className="overflow-y-auto max-h-96">
                    {children}
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 bg-white w-4 h-4 -rotate-45"></div>
                </div>
                <div className="bg-green-500 p-6 rounded-b-[20px]">
                  <div className="flex justify-center sm:justify-end flex-wrap">
                    {buttons.map((button, index) => (
                      <div key={index} className={`mr-2 mb-2 sm:mb-0 ${index === 0 ? 'order-2 sm:order-1' : 'order-1 sm:order-2'}`}>
                        {button}
                      </div>
                    ))}
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

export default Modal;