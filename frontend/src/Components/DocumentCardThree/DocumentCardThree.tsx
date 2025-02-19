import React from 'react';
import images from '../../assets/index';

interface DocumentCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  linkText?: string;
  linkText2?: string;
  width?: number | string;
  height?: number | string;
}

const DocumentCardThree: React.FC<DocumentCardProps> = ({
  icon,
  title,
  subtitle,
  linkText,
  linkText2,
  width = '100%',
  height = '100%',
}) => {

  return (
    <div style={{ width, height }} className="w-full h-full p-4 bg-[#FFEDD5] rounded-xl  border space-y-8">
      <div className="w-8 h-8 p-2.5 bg-[#FB7185] rounded-full flex-col justify-center items-center flex">
        <div className="w-4 h-4 justify-center items-center flex">
          {icon &&
            <div>{icon}</div>
          }
        </div>
      </div>
      <div className="w-full px-6 rounded-xl border-dashed border justify-center items-center gap-2.5 flex">
        <div className="py-1 rounded-lg justify-center items-center gap-2.5 flex">
          <img src={images.Upload} className="w-6 h-6" alt="Upload Icon" />
        </div>
        <div className="text-neutral-400 text-xs font-normal font-['Mulish'] tracking-tight">Click to upload</div>
      </div>
      <div className="space-y-2">
        <div className="">
          <div className="text-[#4B5563] text-sm font-bold font-['Mulish']">{title}</div>
          <div className="italic text-[#9CA3AF] text-xs font-normal font-['Mulish']">{subtitle}</div>
        </div>
        <div className="w-full p-2 rounded border border-gray-200 justify-between items-center flex">
          <div className="text-[#9CA3AF] text-xs font-normal font-['Mulish']">{linkText}</div>
          <div className="text-[#4B5563] text-xs font-bold font-['Mulish']">{linkText2}</div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCardThree;