import { Button } from "@/Components";
import { Modal } from "@mui/material";
import useScrollToId from "@/Utils/useScrollToId";
import { useState } from "react";
import { RiFileAddFill } from "react-icons/ri";
import CommentSection from "../CommentSection";
import { InvoiceAdviceDataType } from "../data";

interface BacklogType {
  sn: number;
  volume: number;
  date: string;
  other: string;
}

export default function AccountsInvoiceOne({
  invoiceAdviceData,
  onCreateInvoiceAdviceClick,
}: {
  invoiceAdviceData: InvoiceAdviceDataType;
  onCreateInvoiceAdviceClick: () => void;
}) {
  const scrollToId = useScrollToId();

  const [lineItems, setLineItems] = useState<BacklogType[]>(
    invoiceAdviceData.lineItems.slice(0, 3)
  );
  const [backlog, setBacklog] = useState<BacklogType[]>([]);
  const [selectedRow, setSelectedRow] = useState<BacklogType | null>();
  const [open, setOpen] = useState(false);

  const handleOpen = (rowId: string | number) => {
    const rowDetails = lineItems?.find((itm: BacklogType) => itm.sn == rowId);
    setSelectedRow(rowDetails);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const sortBySn = (arr: BacklogType[]) => {
    return arr.sort((a, b) => a.sn - b.sn);
  };

  const [comments] = useState<typeof invoiceAdviceData.comments>([]);

  const moveToLineItems = async (index: number) => {
    const rowToMove = backlog[index];
    setLineItems((prevLineItems) => sortBySn([...prevLineItems, rowToMove]));
    setBacklog((prevBacklog) =>
      sortBySn(prevBacklog.filter((_, idx) => idx !== index))
    );
  };


  return (
    <div className="flex flex-col items-start w-full gap-2 lg:flex-row">
      <CommentSection commentsData={comments} />
      <div className="container py-4 md:p-4 mx-auto space-y-8 w-full lg:w-[70%]">
        <div
          id="line-items"
          className="overflow-x-auto rounded-lg shadow tiny-scrollbar"
        >
          <table className="min-w-full bg-white">
            <caption className="p-4 text-lg font-semibold text-left bg-gray-100">
              ACCOUNTS INVOICE (1002734) FOR 16TH OCT. 2024
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
                    {row.volume}
                  </td>
                  <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                    {row.date}
                  </td>
                  <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                    {row.other}
                  </td>
                  <td className="flex items-center justify-end gap-0.5 p-4 text-sm text-right text-gray-500 whitespace-nowrap">
                    <button
                      className="bg-green-700 text-white px-2 py-1 rounded"
                      onClick={() => handleOpen(row.sn)}
                    >
                      view
                    </button>
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

        <div className="flex flex-col items-center gap-4">
          <Button
            type="primary"
            label="Create Invoice"
            action={async () => {
              await onCreateInvoiceAdviceClick();
              scrollToId("proceed");
            }}
            color="#FFFFFF"
            // fontStyle="italic"
            width="100%"
            height="35px"
            fontSize="16px"
            radius="20px"
          />
          <Button
            type="primary"
            label="Send Invoice"
            action={() => {}}
            color="#FFFFFF"
            // fontStyle="italic"
            width="100%"
            height="35px"
            fontSize="16px"
            radius="20px"
          />
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div className="flex h-full">
            {selectedRow && (
              <div className="bg-white p-8 rounded-lg z-10 max-w-md w-full m-auto relative">
                <h2 className="text-2xl font-bold mb-4">Invoice Details</h2>
                <p>
                  <strong>S/N:</strong> {selectedRow.sn}
                </p>
                <p>
                  <strong>Volume:</strong> {selectedRow.volume}
                </p>
                <p>
                  <strong>Date:</strong> {selectedRow.date}
                </p>
                <p>
                  <strong>Items:</strong> {selectedRow.other}
                </p>
                <button
                  onClick={handleClose}
                  className="bg-red-500 absolute top-4 font-bold right-3 text-white rounded-full w-6 h-6 pb-1 hover:shadow-lg text-lg items-center flex justify-center"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
}
