import { DollarRate } from '@/Redux/Features/Customer/customerService';
import React from 'react';


interface DollarRateDisplayProps {
    latestRate: DollarRate | null;
}

const DollarRateDisplay: React.FC<DollarRateDisplayProps> = ({ latestRate }) => {
    const formatCurrency = (value: string | number | null): string => {
        if (!value) return 'No rate set';
        const numericValue = typeof value === 'string' ? parseFloat(value) : value;
        return `₦${numericValue.toLocaleString()}`;
    };

    return (
        <div className="bg-white rounded-lg border px-8 py-3 shadow-sm">
            <div className="flex flex-col">
                <span className="text-[#56B45B] font-semibold text-[16px] mb-1 ">Monthly USD Rate</span>
                <span className="text-[16px] font-semibold text-gray-800">
                    {formatCurrency(latestRate?.rate ?? null)}
                </span>
                {latestRate?.updatedAt && (
                    <span className="text-xs text-gray-500 mt-1">
                        Last updated: {latestRate.updatedAt.toLocaleDateString()}
                    </span>
                )}
            </div>
        </div>
    );
};

export default DollarRateDisplay;