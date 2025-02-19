import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import React, { useState } from 'react';

interface PaginationProps {
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    return (
        <div className="flex justify-center items-center space-x-2">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-green-300 hover:bg-green-400 text-green-800 font-bold py-2 px-4 rounded-[40px]"
            >
                <KeyboardArrowLeft/>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`${currentPage === page ? 'bg-green-500' : 'bg-green-300'
                        } hover:bg-green-400 text-white font-bold py-2 px-4 rounded`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-green-300 hover:bg-green-400 text-green-800 font-bold py-2 px-4 rounded"
            >
                <KeyboardArrowRight/>
            </button>
        </div>
    );
};

export default Pagination;