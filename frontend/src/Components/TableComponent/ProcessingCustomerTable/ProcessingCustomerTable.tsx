/* eslint-disable react-hooks/exhaustive-deps */
// import Pagination from '@/Components/Pagination/Pagination';
import { ProcessingCustomerData } from '@/Data';
import { FilterList, SearchOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';



/**
 * Interface representing the properties of a processing customer entry.
 * @typeof {Object} ProcessingCustomerTableProps
 * @property {number} id - Unique identifier for the processing customer entry.
 * @property {string} sn - Serial number of the processing customer entry.
 * @property {string} companyname - Name of the company.
 * @property {string} companyType - Type of the company (e.g., LLC, Corporation).
 * @property {string} request - Current status of the request (e.g., In Progress, Approved).
 * @property {string} ddqform - Status of the Due Diligence Questionnaire form (e.g., In Progress, Completed).
 * @property {string} sitevisits - Status of site visits (e.g., In Progress, Completed).
 * @property {string} analysis - Status of the analysis phase (e.g., In Progress, Completed).
 * @property {string} agreement - Status of the agreement phase (e.g., In Progress, Completed).
 * @property {string} connectProject - Indicates if the project is connected.
 * @property {string} statusUpdate - Latest status update on the processing customer entry.
 * @property {string} action - Actions that can be taken on the entry.
 */
interface ProcessingCustomerTableProps {
    id: number;
    sn: string;
    companyname: string;
    companyType: string;
    request: string;
    ddqform: string;
    sitevisits: string;
    analysis: string;
    agreement: string;
    connectProject: string;
    statusUpdate: string;
    action: string;

}

const rows = ProcessingCustomerData


const ProcessingCustomerTable = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [filteredRows, setFilteredRows] = useState<ProcessingCustomerTableProps[]>(rows);
    const [selectedProcessingCustomer, setSelectedProcessingCustomer] = useState<string>('Processing Customer');
    const [dropdownOpen, setDropdownOpen] = useState(false);


    useEffect(() => {
        filterData(searchText);
    }, [searchText, selectedProcessingCustomer]);

    /**
     * Toggles the visibility of the request filter dropdown.
     */
    const handleFilterClick = () => {
        setDropdownOpen(!dropdownOpen);
        setSelectedProcessingCustomer('Processing Customer');
    };


    const agreementNames = [...new Set(rows.map(row => row.request))];


    /**
     * Handles changes in the search input field, updating the search text state.
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the search input field.
     */
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);
    };

    const filterData = (search: string) => {
        const lowercasedSearch = search.toLowerCase();
        let filtered = rows.filter((row) =>
            row.companyname.toLowerCase().includes(lowercasedSearch) ||
            row.companyType.toLowerCase().includes(lowercasedSearch)
        );
        if (selectedProcessingCustomer !== 'Processing Customer') {
            filtered = filtered.filter(row => row.request === selectedProcessingCustomer);
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
            field: 'name',
            headerName: 'COMPANY NAME',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div className='flex flex-col gap-[4px]'>
                    <div className='text-[14px] font-[600] text-[#49526A] leading-3'>
                        {params.row.companyname}
                    </div>
                    <div
                        className='text-[10px] font-[400] text-[#828DA9] leading-3'>
                        {params.row.companyType}
                    </div>
                </div>
            ),
        },
        {
            field: 'request',
            headerName: 'REQUEST',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                let classNames = 'text-[12px] font-[500] h-[24px] flex justify-center items-center px-2.5 ';

                switch (params.row.request) {
                    case 'In Progress':
                        classNames += 'bg-[#FFD181] text-[#49526A] w-[110px] h-[48px]';
                        break;
                    case 'Approved':
                        classNames += 'bg-[#D2F69E] text-[#49526A] w-[110px] h-[48px]';
                        break;
                    case 'Disapproved':
                        classNames += 'bg-[#FD838F] text-[#FFFFFF] w-[110px] h-[48px]';
                        break;
                    default:
                        classNames += 'text-[E2E4EB] ';
                }
                return (
                    <div className={classNames}>
                        {params.row.request}
                    </div>
                );
            }
        },

        {
            field: 'ddqform',
            headerName: 'DDQ FORM',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                let classNames = 'text-[12px] font-[500] h-[24px] flex justify-center items-center px-2.5 ';

                switch (params.row.ddqform) {
                    case 'In Progress':
                        classNames += 'bg-[#FFD181] text-[#49526A] w-[110px] h-[48px]';
                        break;
                    case 'Completed':
                        classNames += 'bg-[#D2F69E] text-[#49526A] w-[110px] h-[48px]';
                        break;
                    default:
                        classNames += 'text-[E2E4EB] ';
                }
                return (
                    <div className={classNames}>
                        {params.row.ddqform}
                    </div>
                );
            }
        },
        {
            field: 'sitevisits',
            headerName: 'SITE VISITS',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                let classNames = 'text-[12px] font-[500] h-[24px] flex justify-center items-center px-2.5 ';

                switch (params.row.sitevisits) {
                    case 'In Progress':
                        classNames += 'bg-[#FFD181] text-[#49526A] w-[110px] h-[48px]';
                        break;
                    case 'Completed':
                        classNames += 'bg-[#D2F69E] text-[#49526A] w-[110px] h-[48px]';
                        break;
                    default:
                        classNames += 'text-[E2E4EB] ';
                }
                return (
                    <div className={classNames}>
                        {params.row.sitevisits}
                    </div>
                );
            }
        },
        {
            field: 'analysis',
            headerName: 'ANALYSIS',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                let classNames = 'text-[12px] font-[500] h-[24px] flex justify-center items-center px-2.5 ';

                switch (params.row.analysis) {
                    case 'In Progress':
                        classNames += 'bg-[#FFD181] text-[#49526A] w-[110px] h-[48px]';
                        break;
                    case 'Completed':
                        classNames += 'bg-[#D2F69E] text-[#49526A] w-[110px] h-[48px]';
                        break;
                    default:
                        classNames += 'text-[E2E4EB] ';
                }
                return (
                    <div className={classNames}>
                        {params.row.analysis}
                    </div>
                );
            }
        },
        {
            field: 'agreement',
            headerName: 'AGREEMENT',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                let classNames = 'text-[12px] font-[500] h-[24px] flex justify-center items-center px-2.5 ';

                switch (params.row.agreement) {
                    case 'In Progress':
                        classNames += 'bg-[#FFD181] text-[#49526A] w-[110px] h-[48px]';
                        break;
                    case 'Completed':
                        classNames += 'bg-[#D2F69E] text-[#49526A] w-[110px] h-[48px]';
                        break;
                    default:
                        classNames += 'text-[E2E4EB] ';
                }
                return (
                    <div className={classNames}>
                        {params.row.agreement}
                    </div>
                );
            }
        },
        {
            field: 'connectProject',
            headerName: 'CONNECT PROJECT',
            flex: 1,
            renderCell: (params) => (
                <div className='text-[12px] font-[500] text-[#49526A] leading-3 '>
                    {params.row.connectProject}
                </div>
            )
        },
        {
            field: 'statusUpdate',
            headerName: 'STATUS UPDATES',
            flex: 1,
            renderCell: (params) => (
                <div className='text-[12px] font-[500] text-[#49526A] leading-3 text-wrap'>
                    {params.row.statusUpdate}
                </div>
            )
        },

    ]




    return (
        <div className=' mt-[20px] w-[100%] '>
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
                    <div className='flex items-center gap-[10px] rounded-[32px] h-[32px] w-[205px] justify-center border border-[#CCD0DC] flex-row'>
                        <div className='text-[12px] font-[400] text-[#828DA9] '>Processing Customers</div>
                        <IconButton onClick={handleFilterClick}>
                            <FilterList />
                        </IconButton>
                        {dropdownOpen && (
                            <div className='absolute z-10 top-full -right-3 mt-2 h-[100px] w-[155px] bg-[#FFFFFF] border border-[#E2E4EB] rounded-md shadow-lg'>
                                {agreementNames.map(name => (
                                    <div key={name} className='cursor-pointer p-2 hover:bg-[#D2F69E] text-[12px]' onClick={() => setSelectedProcessingCustomer(name)}>
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
            {/* <div>
            <Pagination
                totalPages={Math.ceil(filteredRows.length / itemsPerPage)}
                onPageChange={setCurrentPage}
            />
            </div> */}

        </div>
    );
}

export default ProcessingCustomerTable


