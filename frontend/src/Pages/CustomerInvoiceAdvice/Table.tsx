
import { Button } from '@/Components';
import { useState } from 'react';
import { InvoiceAdviceDataType } from '../InvoicePage.tsx/data';
import CommentSection from './CommentSection';

interface BacklogType {
    sn: number;
    volume: number;
    date: string;
    other: string;
}

export default function Table({
    invoiceAdviceData,
}: {
    invoiceAdviceData: InvoiceAdviceDataType;
}) {
    const [lineItems,] = useState<BacklogType[]>(invoiceAdviceData.lineItems);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; 

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = lineItems.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(lineItems.length / itemsPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="flex flex-col items-start w-full gap-2 lg:flex-row">
            <CommentSection commentsData={invoiceAdviceData.comments} />
            <div className="container py-4 md:p-4 mx-auto space-y-8 w-full lg:w-[70%]">
                <div id="line-items" className="overflow-x-auto rounded-lg shadow tiny-scrollbar">
                    <table className="min-w-full bg-white ">
                        <caption className="p-4 text-lg font-semibold text-left bg-gray-100">
                            Line Items
                        </caption>
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    SN
                                </th>
                                <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Volume
                                </th>
                                <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Date
                                </th>
                                <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Other
                                </th>

                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentItems.map((row, index) => (
                                <tr id={`line-item${row.sn}`} key={index}>
                                    <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                        {row.sn}
                                    </td>
                                    <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                                        {row.volume}
                                    </td>
                                    <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                                        {row.date}
                                    </td>
                                    <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                                        {row.other}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <Button
                        type="outline"
                        label="Previous"
                        action={handlePrevPage}
                        disabled={currentPage === 1}
                        width="100px"
                        height="35px"
                        fontSize="14px"
                        radius="20px"
                    />
                    <span className='text-xs text-nnpcdark-200'>Page {currentPage} of {totalPages}</span>
                    <Button
                        type="outline"
                        label="Next"
                        action={handleNextPage}
                        disabled={currentPage === totalPages}
                        width="100px"
                        height="35px"
                        fontSize="14px"
                        radius="20px"
                    />
                </div>
                <div className="mt-auto">

                    <Button
                        type="primary"
                        label="Approve"
                        action={() => { }}
                        color="#FFFFFF"
                        width="120px"
                        height="35px"
                        fontSize="16px"
                        radius="20px"
                    />
                </div>
            </div>
        </div>
    );
}