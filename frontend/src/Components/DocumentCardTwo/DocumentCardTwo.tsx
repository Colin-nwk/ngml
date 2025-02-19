import React, { useState } from 'react';

interface DocumentCardTwoProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    buttonText?: string;
    width?: number | string;
    height?: number | string;
}

const DocumentCardTwo: React.FC<DocumentCardTwoProps> = ({ icon, title, subtitle, buttonText, width, height }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{ width, height }}
            className={`w-full h-full px-2.5 py-4 rounded-xl border flex-col justify-start items-center gap-2.5 inline-flex transition-all duration-200 ${isHovered ? 'bg-[#EAEEF2] border-[#EAEEF2]' : 'bg-[#FFFFFF] border-[#EAEEF2]'
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {icon &&
                <div className="w-8 h-8 p-2 rounded-3xl border flex justify-center items-center">
                    <div>{icon}</div>
                </div>
            }
            <div className="">
                <div className="text-center text-xs font-bold">{title}</div>
                <div className="text-xs text-center font-normal italic">{subtitle}</div>
            </div>
            {isHovered && (
                <div className="flex justify-center items-center">
                    <div className="py-1.5 px-8 bg-nnpclightgreen-600 hover:bg-[#FFFFFF] hover:text-[#808080] text-[#FFFFFF] text-xs rounded-[20px] text-center tracking-tight">
                        {buttonText}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentCardTwo;