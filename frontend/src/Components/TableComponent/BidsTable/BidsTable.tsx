
/* eslint-disable react-hooks/exhaustive-deps */
import { TenderTitleData } from '@/Data';
import { SearchOutlined } from '@mui/icons-material';
import { InputAdornment, Modal, TextField, MenuItem, Select, FormControl, SelectChangeEvent } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import SelectedDateModal from '../SiteVistTable/SiteVistTableModal';
import { useNavigate } from 'react-router-dom';




interface NavigateButtonProps {
    to: string;
}


/**
 * Represents the properties of a single bid in the bids table.
 * @typeof {Object} BidsTableProps
 * @property {number} id - The unique identifier for the bid.
 * @property {string} companyname - The name of the company that submitted the bid.
 * @property {string} companyType - The type of the company (e.g., LLC, Corporation).
 * @property {string[]} [selectedDates] - Optional array of dates selected for the bid.
 * @property {string} status - The current status of the bid (e.g., Pending, Approved).
 * @property {string} action - The action to be taken on the bid (e.g., View, Edit).
 * @property {string} [deadline] - Optional deadline for the bid submission.
 * @property {string} [companyEmail] - Optional email address of the company.
 * @property {string} [companyNumber] - Optional contact number of the company.
 * @property {string} [companyAddress] - Optional physical address of the company.
 * @property {string} tenderTitle - The title of the tender.
 * @property {Detail[]} details - Array of details associated with the bid.
 * @property {string} [datesubmitted] - Date the bid was submitted.
 */
interface BidsTableProps {
    id: number;
    companyname: string;
    companyType: string;
    companyEmail?: string;
    companyNumber?: string;
    companyAddress?: string;
    tenderTitle: string;
    details: Detail[];
    datesubmitted?: string;
    action: string;
    deadline?: string;
}

/**
 * Represents additional details for a bid.
 * @typeof {Object} Detail
 * @property {string} type - The type of detail.
 * @property {string} type2 - An additional type of detail.
 * @property {string} dept - The department associated with the detail.
 */
interface Detail {
    type: string;
    type2: string;
    dept: string;
}

const rows = TenderTitleData as unknown as BidsTableProps[];

const BidsTable = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [filteredRows, setFilteredRows] = useState<BidsTableProps[]>(rows);
    const [open, setOpen] = useState(false);
    const [selectedRow] = useState<BidsTableProps | null>(null);
    const [selectedDetailType, setSelectedDetailType] = useState<string>('All Types');
    const [selectedDetailDept, setSelectedDetailDept] = useState<string>('All Departments');

    useEffect(() => {
        filterRows();
    }, [searchText, selectedDetailType, selectedDetailDept]);

    const filterRows = () => {
        let filtered = rows;

        if (searchText) {
            filtered = filtered.filter(row =>
                row.companyname.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        if (selectedDetailType !== 'All Types') {
            filtered = filtered.filter(row =>
                row.details.some(detail => detail.type === selectedDetailType)
            );
        }

        if (selectedDetailDept !== 'All Departments') {
            filtered = filtered.filter(row =>
                row.details.some(detail => detail.dept === selectedDetailDept)
            );
        }

        setFilteredRows(filtered);
    };


    const handleClose = () => setOpen(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleDetailTypeChange = (event: SelectChangeEvent<string>) => {
        setSelectedDetailType(event.target.value);
    };

    const handleDetailDeptChange = (event: SelectChangeEvent<string>) => {
        setSelectedDetailDept(event.target.value);
    };


    const NavigateButton: React.FC<NavigateButtonProps> = ({ to }) => {
        const navigate = useNavigate();
        return (
            <div
                onClick={() => navigate(to)}
                className='text-[12px] text-[#FFFFFF] rounded-[32px] bg-[#828DA9] h-[24px] w-[53px] flex items-center justify-center cursor-pointer'>
                View
            </div>
        );
    };

    const columns: GridColDef[] = [
        {
            field: 'sn',
            headerName: 'SN',
            width: 60,
            renderCell: (params: GridRenderCellParams) => (
                <div className='text-xs font-[600] text-[#49526A] leading-3'>
                    {params.row.sn}
                </div>
            ),
        },
        {
            field: 'name',
            headerName: 'COMPANY NAME',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div className='flex flex-col gap-[4px]'>
                    <div className='text-[14px] font-[600] text-[#49526A] leading-3'>
                        {params.row.companyname}
                    </div>
                    <div className='text-[10px] font-[400] text-[#828DA9] leading-3'>
                        {params.row.companyType}
                    </div>
                </div>
            ),
        },
        {
            field: 'tenderTitle',
            headerName: 'TITLE OF TENDER',
            flex: 3,
            renderCell: (params: GridRenderCellParams) => (
                <div className='text-[14px] font-[700] text-[#49526A] leading-3'>
                    {params.row.tenderTitle}
                </div>
            ),
        },
        {
            field: 'datesubmitted',
            headerName: 'DATE SUBMITTED',
            flex: 1,
            renderCell: (params) => (
                <div className='text-[12px] font-[700] text-[#49526A] leading-3 ml-4'>
                    {params.row.datesubmitted}
                </div>
            ),
        },
        {
            field: 'details',
            headerName: 'DETAILS',
            flex: 1.5,
            renderCell: (params) => (
                <ul className='text-[12px] font-[700] text-[#49526A] leading-3 '>
                    {params.row.details.map((detail: Detail, index: number) => (
                        <div key={index} className='text-[12px] font-[600] text-[#828DA9] flex flex-col gap-[10px] '>
                            <div className='gap-[14px] flex items-center'>
                                <div>TYPE</div>
                                <div className='bg-[#D2F69E] text-[12px] font-[700] text-[#050505] h-[24px] flex items-center justify-center p-[8px] rounded-[24px]'>{detail.type}</div>
                            </div>
                            <div className='gap-[10px] flex items-center'>
                                <div>TYPE2</div>
                                <div className='bg-[#EAEEF2] text-[12px] font-[700] text-[#050505] h-[24px] flex items-center justify-center p-[8px] rounded-[24px]'>{detail.type2}</div>
                            </div>
                            <div className='gap-[14px] flex items-center'>
                                <div>DEPT</div>
                                <div className='bg-[#EAEEF2] text-[12px] font-[700] text-[#050505] h-[24px] flex items-center justify-center p-[8px] rounded-[24px]'>{detail.dept}</div>
                            </div>
                        </div>
                    ))}
                </ul>
            ),
        },
        {
            field: 'action',
            headerName: 'ACTION',
            flex: 1,
            renderCell: () => {
                return (
                    <NavigateButton to={`/admin/records/bidspage`} />
                );
            },
        },
    ];

    return (
        <div className='mt-[20px] w-[100%]'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div>
                    {selectedRow && (
                        <SelectedDateModal
                            handleClose={handleClose}
                            dateTime={'09th, Nov, 2023; 09:23:44Am'}
                            status={selectedRow.tenderTitle || 'Default Status'}
                            companyName={selectedRow.companyname || 'Provide Company Name'}
                            companyEmail={selectedRow.companyEmail || 'Provide an email address'}
                            companyNumber={selectedRow.companyNumber || 'Provide a number'}
                            companyAddress={selectedRow.companyAddress || 'Provide an Address'}
                            statusHeading={selectedRow.tenderTitle}
                        />
                    )}
                </div>
            </Modal>
            <div className='flex flex-col md:flex-row items-center justify-between rounded-t-lg border bg-[#FFFFFF] border-[#CCD0DC] border-b-0 p-[18px] w-[100%]'>
                <div className='italic text-[12px] text-[#828DA9] w-[100%]'>
                    Showing {filteredRows.length} of {rows.length} site visits
                </div>
                <div className='flex flex-col md:flex-row justify-end gap-[8px] relative w-[100%]'>
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
                                fontSize: '12px',
                                fontStyle: 'italic',
                                '&.Mui-focused': {
                                    color: 'green',
                                },
                            },
                        }}
                    />
                    <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
                        <Select
                            value={selectedDetailType}
                            onChange={handleDetailTypeChange}
                            sx={{
                                borderRadius: '32px',
                                height: '35px',
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
                                '& .MuiMenuItem-root': {
                                    fontSize: '12px',
                                },
                            }}
                        >
                            <MenuItem value="All Types" sx={{ fontSize: '12px' }}>All Types</MenuItem>
                            <MenuItem value="Open Tender" sx={{ fontSize: '12px' }}>Open Tender</MenuItem>
                            <MenuItem value="Closed Tender" sx={{ fontSize: '12px' }}>Closed Tender</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
                        <Select
                            value={selectedDetailDept}
                            onChange={handleDetailDeptChange}
                            sx={{
                                borderRadius: '32px',
                                height: '35px',
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
                                '& .MuiMenuItem-root': {
                                    fontSize: '12px',
                                },
                            }}
                        >
                            <MenuItem value="All Departments" sx={{ fontSize: '12px' }}>All Departments</MenuItem>
                            <MenuItem value="COBD" sx={{ fontSize: '12px' }}>COBD</MenuItem>
                            <MenuItem value="ADMIN" sx={{ fontSize: '12px' }}>ADMIN</MenuItem>
                            <MenuItem value="HR" sx={{ fontSize: '12px' }}>HR</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div>
                <DataGrid
                    className="pointer-cursor-datagrid"
                    rows={filteredRows}
                    columns={columns}
                    rowHeight={104}
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
};

export default BidsTable;


