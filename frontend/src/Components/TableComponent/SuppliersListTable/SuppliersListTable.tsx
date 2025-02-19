/* eslint-disable react-hooks/exhaustive-deps */
import { SuppliersListData } from '@/Data';
import { FilterList, SearchOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



interface NavigateButtonProps {
    to: string; // This specifies that `to` must be a string.
}

/**
 * Defines the structure for Agreement properties used in the AgreementTable.
 * 
 * @interface
 * @property {number} id - Unique identifier for the agreement.
 * @property {string} companyname - Name of the company associated with the agreement.
 * @property {string} companyType - Type of the company (e.g., LLC, Inc., etc.).
 * @property {string[]} selectedDates - Optional. Dates selected for the agreement.
 * @property {string} status - Current status of the agreement (e.g., Signed, Unsigned).
 * @property {string} action - Action available for the agreement (e.g., View, Edit).
 * @property {string} deadline - Optional. Deadline for the agreement.
 * @property {string} companyEmail - Optional. Email address of the company.
 * @property {string} companyNumber - Optional. Contact number of the company.
 * @property {string} companyAddress - Optional. Physical address of the company.
 */

interface SuppliersListTableProps {
    id: number;
    companyname: string;
    selectedDates?: string[];
    status: string;
    action: string;
    deadline?: string;
    companyEmail?: string;
    companyNumber?: string;
    companyAddress?: string;

}

const rows = SuppliersListData




const SuppliersListTable = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [filteredRows, setFilteredRows] = useState<SuppliersListTableProps[]>(rows);
    const [selectedStatus, setSelectedStatus] = useState<string>('All Statuses');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    /**
     * useEffect hook to filter data whenever searchText or selectedAgreement changes.
     */
    useEffect(() => {
        filterData();
    }, [searchText, selectedStatus]);

    /**
     * Toggles the dropdown menu for the agreement filter.
     */
    const handleFilterClick = () => {
        setDropdownOpen(!dropdownOpen);
        setSelectedStatus('All Statuses');
    };

    const uniqueStatuses = [...new Set(rows.map(row => row.status))];


    /**
     * Handles changes to the search input field and updates the searchText state.
     * @param {React.ChangeEvent<HTMLInputElement>} event - The event triggered by changing the input field.
     */
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);
    };


    /**
    * Filters the rows based on the search text and selected agreement type.
    * @param {string} search - The current text in the search input field.
    */
    const filterData = () => {
        const lowercasedSearch = searchText.toLowerCase();
        let filtered = rows.filter(row =>
            row.companyname.toLowerCase().includes(lowercasedSearch) ||
            row.lastSupply.toLowerCase().includes(lowercasedSearch)
        );
        if (selectedStatus !== 'All Statuses') {
            filtered = filtered.filter(row => row.status === selectedStatus);
        }
        setFilteredRows(filtered);
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
                <div className='text-[12px] font-[400] text-[#49526A] leading-3 '>
                    {params.row.sn}
                </div>
            ),

        },
        {
            field: 'name',
            headerName: 'COMPANY NAME',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div>
                    <div className='text-[14px] font-[600] text-[#49526A]'>
                        {params.row.companyname}
                    </div>
                </div>
            ),
        },
        {
            field: 'email',
            headerName: 'EMAIL',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div
                    className='text-[12px] font-[400] text-[#49526A]'>
                    {params.row.companyEmail}
                </div>
            ),
        },

        {
            field: 'lastSupply',
            headerName: 'LAST SUPPLY DATE',
            flex: 1,
            renderCell: (params) => (
                <div className='text-[12px] font-[700] text-[#49526A] '>
                    {params.row.lastSupply}
                </div>
            )
        },
        {
            field: 'totalSupply',
            headerName: 'TOTAL SUPPLIED SCF',
            flex: 1,
            renderCell: (params) => (
                <div className='text-[12px] font-[700] text-[#49526A] leading-3 '>
                    {params.row.totalSupply}
                </div>
            )
        },
        {
            field: 'status',
            headerName: 'STATUS',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                let classNames = 'text-[12px] font-[500] h-[24px] rounded-full flex justify-center items-center px-2.5 ';

                switch (params.row.status) {
                    case 'Processing':
                        classNames += 'bg-[#FFD181] text-[#050505] ';
                        break;
                    case 'Active':
                        classNames += 'bg-[#D2F69E] text-[#005828] ';
                        break;
                    case 'In-Active':
                        classNames += 'border ';
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
            renderCell: (params: GridRenderCellParams) => {
                const supplierId = params.row.sn;
                const projectId = params.row.sn;
                return (
                    <NavigateButton to={`/admin/records/supplier/${supplierId}/${projectId}/overview`} />
                );
            },
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
                        <div className='text-[12px] font-[400] text-[#828DA9] '>All Customer</div>
                        <IconButton onClick={handleFilterClick}>
                            <FilterList />
                        </IconButton>
                        {dropdownOpen && (
                            <div className='absolute z-10 top-full -right-3 mt-2 h-[100px] w-[155px] bg-[#FFFFFF] border border-[#E2E4EB] rounded-md shadow-lg'>
                                {uniqueStatuses.map(status => (
                                    <div key={status} className='cursor-pointer p-2 hover:bg-[#D2F69E] text-[12px]' onClick={() => setSelectedStatus(status)}>
                                        {status}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='w-[100%]'>
                <DataGrid
                    data-testid="data-grid"
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
                                fontSize: '12px',

                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default SuppliersListTable


