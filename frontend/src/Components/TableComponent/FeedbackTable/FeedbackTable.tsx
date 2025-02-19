/* eslint-disable react-hooks/exhaustive-deps */
import { FilterList } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { FeedbackData } from '../../../Data';



/**
* Interface representing the properties of a feedback entry.
* @typeof {Object} FeedbackTableProps
* @property {number} id - The unique identifier for the feedback entry.
* @property {string} [companyname] - The name of the company providing feedback.
* @property {string} [companyType] - The type of the company providing feedback.
* @property {string[]} [selectedDates] - Optional. Dates selected related to the feedback.
* @property {string} [status] - Optional. The current status of the feedback (e.g., Pending, Sent).
* @property {string} [action] - Optional. Actions that can be taken on the feedback.
* @property {string} [deadline] - Optional. Deadline associated with the feedback.
* @property {string} [companyEmail] - Optional. Email address of the company providing feedback.
* @property {string} [companyNumber] - Optional. Contact number of the company providing feedback.
* @property {string} [companyAddress] - Optional. Physical address of the company providing feedback.
*/
interface FeedbackTableProps {
    id: number;
    companyname?: string;
    companyType?: string;
    selectedDates?: string[];
    status?: string;
    action?: string;
    deadline?: string;
    companyEmail?: string;
    companyNumber?: string;
    companyAddress?: string;

}

const rows = FeedbackData




const FeedbackTable = () => {
    const [filteredRows, setFilteredRows] = useState<FeedbackTableProps[]>(rows);
    const [selectedStatus, setSelectedStatus] = useState<string>('All Status');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        filterData();
    }, [selectedStatus]);


    /**
     * Toggles the visibility of the status filter dropdown.
     */
    const handleFilterClick = () => {
        setDropdownOpen(!dropdownOpen);
        setSelectedStatus('All Status');
    };


    const status = [...new Set(rows.map(row => row.status))];


    /**
    * Filters the feedback entries based on the selected status.
    */
    const filterData = () => {
        let filtered = rows;
        if (selectedStatus !== 'All Status') {
            filtered = filtered.filter(row => row.status === selectedStatus);
        }
        setFilteredRows(filtered);
    };



    const columns: GridColDef[] = [
        {
            field: 'sn',
            headerName: 'SN',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div className='text-xs font-[600] text-[#49526A] leading-3'>
                    {params.row.sn}
                </div>
            ),

        },
        {
            field: 'datereceived',
            headerName: 'DATE SENT',
            flex: 1,
            renderCell: (params) => (
                <div className='text-[12px] font-[700] text-[#49526A] leading-3 '>
                    {params.row.datereceived}
                </div>
            )
        },
        {
            field: 'name',
            headerName: 'RECEIVER',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div className='text-[12px] font-[600] text-[#49526A] leading-3'>
                    {params.row.companyname}
                </div>

            ),
        },
        {
            field: 'subject',
            headerName: 'SUBJECT',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div
                    className='text-[12px] font-[400] text-[#49526A] leading-3 text-wrap '>
                    {params.row.subject}
                </div>
            ),
        },

        {
            field: 'status',
            headerName: 'STATUS',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                let classNames = 'text-[12px] font-[500] h-[24px] rounded-full flex justify-center items-center px-2.5 ';

                switch (params.row.status) {
                    case 'Feedback Pending':
                        classNames += 'bg-[#FFD181] text-[#050505] ';
                        break;
                    case 'Sent':
                        classNames += 'bg-[#D2F69E] text-[#005828] ';
                        break;
                    default:
                        classNames += 'text-[E2E4EB] ';
                }

                return (
                    <div className={classNames}>
                        {params.row.status}
                    </div>
                );
            }
        },

    ]




    return (
        <div className='mt-[20px] w-[100%] '>

            <div className='flex flex-col md:flex-row items-center justify-between border bg-[#FFFFFF] border-[#CCD0DC] border-b-0 p-[18px] w-[100%] '>
                <div className='italic text-[12px] text-[#828DA9] w-[100%]'>
                    Showing {filteredRows.length} of {rows.length} site visits
                </div>
                <div className='flex flex-col md:flex-row justify-end gap-[8px] relative w-[100%]' >
                    <div className='flex items-center gap-[10px] rounded-[32px] h-[32px] w-[149px] justify-center border border-[#CCD0DC] flex-row'>
                        <div className='text-[12px] font-[400] text-[#828DA9] '>All Forms</div>
                        <IconButton onClick={handleFilterClick}>
                            <FilterList />
                        </IconButton>
                        {dropdownOpen && (
                            <div className='absolute z-10 top-full -right-3 mt-2 h-[100px] w-[155px] bg-[#FFFFFF] border border-[#E2E4EB] rounded-md shadow-lg'>
                                {status.map(name => (
                                    <div key={name} className='cursor-pointer p-2 hover:bg-[#D2F69E] text-[12px]' onClick={() => setSelectedStatus(name)}>
                                        {name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <DataGrid
                    className="pointer-cursor-datagrid"
                    rows={filteredRows}
                    columns={columns}
                    rowHeight={64}
                    autoHeight
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 13 },
                        },
                    }}

                    sx={{
                        width: '100%',
                        background: '#FFFFFF',
                        '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus-within': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#F6FDEC',
                            '& .MuiDataGrid-columnHeaderTitle': {
                                color: '#050505',
                                fontWeight: '700',
                                fontSize: '12px',

                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default FeedbackTable


