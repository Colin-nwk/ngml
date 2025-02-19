import { FilterList, SearchOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, Modal, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useState } from 'react';
import { fundersData } from '../../../Data';
import SelectedDateModal from './SiteVistTableModal';



/**
 * Interface representing the properties of a selected date entry for a company.
 * @typeof {Object} SelectedDateTableProps
 * @property {number} id - Unique identifier for the entry.
 * @property {string} companyname - Name of the company.
 * @property {string} companyType - Type of the company (e.g., LLC, Corporation).
 * @property {string[]} [selectedDates] - Dates selected by the company.
 * @property {string} status - Current status of the date selection (e.g., Date Approved, Request Approval).
 * @property {string} action - Action to be taken on the entry.
 * @property {string} [deadline] - Optional deadline associated with the date selection.
 * @property {string} [companyEmail] - Optional email address of the company.
 * @property {string} [companyNumber] - Optional contact number of the company.
 * @property {string} [companyAddress] - Optional physical address of the company.
 */

interface SelectedDateTableProps {
    id: number;
    companyname: string;
    companyType: string;
    selectedDates?: string[];
    status: string;
    action: string;
    deadline?: string;
    companyEmail?: string;
    companyNumber?: string;
    companyAddress?: string;

}

const rows = fundersData




const SiteVistTable = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [filteredRows, setFilteredRows] = useState<SelectedDateTableProps[]>(rows);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<SelectedDateTableProps | null>(null);

    const handleOpen = (row: SelectedDateTableProps) => {
        setSelectedRow(row);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);
        filterData(value);
    };

    const filterData = (search: string) => {
        const lowercasedSearch = search.toLowerCase();
        const filtered = rows.filter((row) =>
            row.companyname.toLowerCase().includes(lowercasedSearch) ||
            row.companyType.toLowerCase().includes(lowercasedSearch)
        );
        setFilteredRows(filtered);
    };

    const handleFilterClick = () => {
        console.log('Filter icon clicked');
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Date Approved':
                return { backgroundColor: '#D2F69E', color: '#005828' };
            case 'Request Approval':
                return { backgroundColor: '#FFF3D5', color: '#475467' };
            default:
                return {};
        }
    };



    const columns: GridColDef[] = [
        {
            field: 'sn',
            headerName: 'SN',
            renderCell: (params: GridRenderCellParams) => (
                <div className='text-xs font-[600] text-[#49526A] leading-3'>
                    {params.row.sn}
                </div>
            ),

        },
        {
            field: 'name',
            headerName: 'COMPANY NAME',
            flex: 1.5,
            renderCell: (params: GridRenderCellParams) => (
                <div className='text-xs font-[600] text-[#49526A] leading-3'>
                    {params.row.companyname}
                </div>
            ),
        },
        {
            field: 'companyType',
            headerName: 'COMPANY TYPE',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div
                    className='text-[12px] font-[400] text-[#49526A] leading-3'>
                    {params.row.companyType}
                </div>
            ),
        },
        {
            field: 'selectedDates',
            headerName: 'SELECTED DATES',
            flex: 2,
            renderCell: (params) => (
                <div className='text-[12px] font-[500] text-[#49526A] leading-3 flex gap-[10px]'>
                    {params.row.selectedDates ? params.row.selectedDates.map((date: string, index: number) => (
                        <div key={index} className='bg-[#EAEEF2] h-[24px] w-[92px] flex items-center justify-center rounded-[24px] '>
                            {date}
                        </div>
                    )) : 'No Dates Selected'}
                </div>
            )
        },
        {
            field: 'status',
            headerName: 'STATUS',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                let classNames = 'text-xs h-6 rounded-full flex justify-center items-center px-2.5 ';

                switch (params.row.status) {
                    case 'Date Approved':
                        classNames += 'bg-[#D2F69E] text-[#005828] ';
                        break;
                    case 'Request Approval':
                        classNames += 'bg-[#FFF3D5] text-[#475467] border border-[ #E2E4EB] ';
                        break;
                    case 'Dates Selected':
                        classNames += 'border border-[E2E4EB] ';
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


        {
            field: 'action',
            headerName: 'ACTION',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div
                    onClick={() => handleOpen(params.row)}
                    className='text-[12px] text-[#FFFFFF] rounded-[32px] bg-[#828DA9] h-[24px] w-[53px] flex items-center justify-center cursor-pointer'>
                    View
                </div>
            ),
        },
    ]




    return (
        <div className='mt-[20px] w-[100%] '>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div >
                    {selectedRow && (
                        <SelectedDateModal
                            handleClose={handleClose}
                            dateTime={'09th, Nov, 2023; 09:23:44Am'}
                            status={selectedRow.status || 'Default Status'}
                            companyName={selectedRow.companyname || 'Provide Company Name'}
                            companyEmail={selectedRow.companyEmail || 'Provide an email address'}
                            companyNumber={selectedRow.companyNumber || 'Provide a number'}
                            availableDates={selectedRow.selectedDates || ['No Dates Available']}
                            companyAddress={selectedRow.companyAddress || 'Provide an Address'}
                            statusHeading={selectedRow.status}
                            statusStyle={getStatusStyle(selectedRow.status)}

                        />
                    )}
                </div>
            </Modal>
            <div className='flex flex-col md:flex-row items-center justify-between border bg-[#FFFFFF] border-[#CCD0DC] border-b-0 p-[18px] w-[100%] '>
                <div className='italic text-[12px] text-[#828DA9] w-[100%]'>
                    Showing {filteredRows.length} of {rows.length} site visits
                </div>
                <div className='flex flex-col md:flex-row justify-end gap-[8px] relative w-[100%]' >
                    <TextField
                        id="search-input"
                        label="Search this list"
                        variant="outlined"
                        size="small"
                        value={searchText}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchOutlined />
                                </InputAdornment>
                            ),
                            style: {
                                borderRadius: '32px',
                                width: '200px',
                                height: '35px',
                            },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#CCD0DC',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#00AF50',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#00AF50',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'gray',
                                fontSize: '10px',
                                fontStyle: 'italic',
                                '&.Mui-focused': {
                                    color: 'green',
                                },
                            },
                        }}
                    />
                    <div className='flex items-center rounded-[32px]  h-[32px] w-[98px] justify-center border border-[#CCD0DC] flex-row'>
                        <div className='text-[10px] font-[400] text-[#828DA9] italic'>Filter</div>
                        <IconButton onClick={handleFilterClick}  >
                            <FilterList />
                        </IconButton>
                    </div>
                </div>
            </div>

            <div style={{ width: '100%' }}>
                <DataGrid
                    className="pointer-cursor-datagrid"
                    rows={filteredRows}
                    columns={columns}
                    rowHeight={48}
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
                                fontSize: '12px'
                            },
                        },

                    }}
                />
            </div>
        </div>
    );
}

export default SiteVistTable


