/* eslint-disable react-hooks/exhaustive-deps */
import { FilterList, SearchOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { ComplaintData } from '../../../Data';

/**
 * Interface for the props of the ComplaintTable component.
 * @interface ComplaintTableProps
 * @property {number} id - Unique identifier for a complaint.
 * @property {string} [companyname] - Name of the company associated with the complaint.
 * @property {string} [companyType] - Type of the company associated with the complaint.
 * @property {string[]} [selectedDates] - Array of dates relevant to the complaint.
 * @property {string} [status] - Current status of the complaint.
 * @property {string} [action] - Action taken or required for the complaint.
 * @property {string} [deadline] - Deadline for the complaint resolution.
 * @property {string} [companyEmail] - Email address of the company.
 * @property {string} [companyNumber] - Contact number of the company.
 * @property {string} [companyAddress] - Physical address of the company.
 */

interface ComplaintTableProps {
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

const rows = ComplaintData




const ComplaintTable = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [filteredRows, setFilteredRows] = useState<ComplaintTableProps[]>(rows);
    const [selectedStatus, setSelectedStatus] = useState<string>('All Status');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        filterData(searchText);
    }, [searchText, selectedStatus]);


    const handleFilterClick = () => {
        setDropdownOpen(!dropdownOpen);
        setSelectedStatus('All Status');
    };


    const status = [...new Set(rows.map(row => row.status))];


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);
    };


    /**
    * Filters the complaint data based on the search text and selected status.
    * @param {string} search - The search text used to filter complaints by company name or company type.
    */
    const filterData = (search: string) => {
        const lowercasedSearch = search.toLowerCase();
        let filtered = rows.filter((row) =>
            row.companyname.toLowerCase().includes(lowercasedSearch) ||
            row.companyType.toLowerCase().includes(lowercasedSearch)
        );
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
            headerName: 'DATE RECEIVED',
            flex: 1,
            renderCell: (params) => (
                <div className='text-[12px] font-[700] text-[#49526A] leading-3 '>
                    {params.row.datereceived}
                </div>
            )
        },
        {
            field: 'name',
            headerName: 'RECEIVED FROM',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div className='text-[12px] font-[600] text-[#49526A] leading-3'>
                    {params.row.companyname}
                </div>

            ),
        },
        {
            field: 'agreementType',
            headerName: 'ISSUE',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div
                    className='text-[12px] font-[400] text-[#49526A] leading-3 text-wrap '>
                    {params.row.issue}
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
                    case 'Resolving':
                        classNames += 'bg-[#FFD181] text-[#050505] ';
                        break;
                    case 'Resolved':
                        classNames += 'bg-[#D2F69E] text-[#005828] ';
                        break;
                    case 'New':
                        classNames += 'bg-[#EAEEF2] text-[#050505] ';
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
                    <div className='flex items-center gap-[10px] rounded-[32px] h-[32px] w-[149px] justify-center border border-[#CCD0DC] flex-row'>
                        <div className='text-[12px] font-[400] text-[#828DA9] '>Filter</div>
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
                            outline: 'none',                        },
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

export default ComplaintTable


