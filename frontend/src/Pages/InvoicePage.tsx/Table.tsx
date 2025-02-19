

import { Button } from '@/Components';
import useScrollToId from '@/Utils/useScrollToId';
import { useState } from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';
import { MdCancel } from 'react-icons/md';
import { RiEdit2Fill, RiFileAddFill, RiSaveFill } from 'react-icons/ri';
import CommentSection from './CommentSection';
import { InvoiceAdviceDataType } from './data';

interface BacklogType {
  sn: number;
  volume: number;
  date: string;
  other: string;
}

export default function InventoryTable({
  invoiceAdviceData,
  onCreateInvoiceAdviceClick,
}: {
  invoiceAdviceData: InvoiceAdviceDataType;
  onCreateInvoiceAdviceClick: () => void;
}) {
  const scrollToId = useScrollToId();

  const [lineItems, setLineItems] = useState<BacklogType[]>(
    invoiceAdviceData.lineItems
  );
  const [backlog, setBacklog] = useState<BacklogType[]>([]);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [tempEditValues, setTempEditValues] = useState<Partial<BacklogType>>(
    {}
  );

  const sortBySn = (arr: BacklogType[]) => {
    return arr.sort((a, b) => a.sn - b.sn);
  };

  const moveToBacklog = async (row: BacklogType) => {
    setBacklog((prevBacklog) => sortBySn([...prevBacklog, row]));
    setLineItems((prevLineItems) =>
      sortBySn(prevLineItems.filter((item) => item.sn !== row.sn))
    );
  };

  const moveToLineItems = async (index: number) => {
    const rowToMove = backlog[index];
    setLineItems((prevLineItems) => sortBySn([...prevLineItems, rowToMove]));
    setBacklog((prevBacklog) =>
      sortBySn(prevBacklog.filter((_, idx) => idx !== index))
    );
  };

  const handleEditClick = (index: number, row: BacklogType) => {
    setEditingRow(index);
    setTempEditValues({ volume: row.volume, other: row.other });
  };

  const handleSaveClick = async (index: number, row: BacklogType) => {
    const updatedRow = { ...row, ...tempEditValues };

    // Assuming API call is made here to save the updated row
    // await apiCallToUpdateRow(updatedRow);

    setLineItems((prevLineItems) =>
      sortBySn(
        prevLineItems.map((item, idx) => (idx === index ? updatedRow : item))
      )
    );
    setEditingRow(null);
  };

  return (
    <div className="flex flex-col items-start w-full gap-2 lg:flex-row">
      <CommentSection commentsData={invoiceAdviceData.comments} />
      <div className="container py-4 md:p-4 mx-auto space-y-8 w-full lg:w-[70%]">
        <div
          id="line-items"
          className="overflow-x-auto rounded-lg shadow tiny-scrollbar"
        >
          <table className="min-w-full bg-white">
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
                <th className="p-4 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {lineItems.map((row, index) => (
                <tr id={`line-item${row.sn}`} key={index}>
                  <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {row.sn}
                  </td>
                  <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                    {editingRow === index ? (
                      <input
                        type="number"
                        value={tempEditValues.volume || ''}
                        onChange={(e) =>
                          setTempEditValues({
                            ...tempEditValues,
                            volume: Number(e.target.value),
                          })
                        }
                        className="px-2 py-1 border rounded max-w-[100px]"
                      />
                    ) : (
                      row.volume
                    )}
                  </td>
                  <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                    {row.date}
                  </td>
                  <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                    {editingRow === index ? (
                      <input
                        type="text"
                        value={tempEditValues.other || ''}
                        onChange={(e) =>
                          setTempEditValues({
                            ...tempEditValues,
                            other: e.target.value,
                          })
                        }
                        className="px-2 py-1 border rounded max-w-[150px]"
                      />
                    ) : (
                      row.other
                    )}
                  </td>
                  <td className="flex items-center justify-end gap-0.5 p-4 text-sm text-right text-gray-500 whitespace-nowrap">
                    {editingRow === index ? (
                      <span
                        className="flex items-center justify-center p-1 transition-all cursor-pointer hover:scale-110 animate-bounce"
                        onClick={() => handleSaveClick(index, row)}
                        title="Save Changes"
                      >
                        <RiSaveFill className="w-5 h-5 text-[#00AF50]" />
                      </span>
                    ) : (
                      <span
                        className="flex items-center justify-center p-1 transition-all cursor-pointer hover:scale-110"
                        title="Edit Line Item"
                        onClick={() => handleEditClick(index, row)}
                      >
                        <RiEdit2Fill className="w-5 h-5 text-[#FFA02E]" />
                      </span>
                    )}

                    <span
                      className="flex items-center justify-center p-1 transition-all cursor-pointer hover:scale-110"
                      onClick={async () => {
                        if (editingRow !== index) {
                          await moveToBacklog(row);
                          scrollToId('backlog');
                        } else {
                          setEditingRow(null);
                          setTempEditValues({});
                        }
                      }}
                      title={
                        editingRow !== index
                          ? 'Move to Backlog'
                          : 'Cancel changes'
                      }
                    >
                      {editingRow === index ? (
                        <MdCancel className="w-5 h-5 text-[#ED0027]" />
                      ) : (
                        <FaDeleteLeft className="w-5 h-5 text-[#ED0027]" />
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {backlog.length > 0 ? (
          <div id="backlog" className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <caption className="p-4 text-lg font-semibold text-left bg-gray-100">
                Line Items Backlog
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
                  <th className="p-4 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {backlog.map((row, index) => (
                  <tr key={index}>
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
                    <td className="flex items-center justify-end gap-0.5 p-4 text-sm text-right text-gray-500 whitespace-nowrap">
                      <span
                        className="flex items-center justify-center p-1 transition-all cursor-pointer hover:scale-110"
                        onClick={async () => {
                          await moveToLineItems(index);
                          scrollToId(`line-item${row.sn}`);
                        }}
                        title="Move to Line Items"
                      >
                        <RiFileAddFill className="w-5 h-5 text-[#00AF50]" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        <Button
          type="primary"
          label="Create Invoice Advice"
          action={async () => {
            await onCreateInvoiceAdviceClick();
            scrollToId('proceed');
          }}
          color="#FFFFFF"
          // fontStyle="italic"
          width="100%"
          height="35px"
          fontSize="16px"
          radius="20px"
        />

        {/* <button
          className="w-full px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={async () => {
            await onCreateInvoiceAdviceClick();
            scrollToId('proceed');
          }}
        >
          Create Invoice Advice
        </button> */}
      </div>
    </div>
  );
}


