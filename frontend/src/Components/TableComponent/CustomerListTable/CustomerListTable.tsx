
import { CustomerData, useGetCustomersQuery } from '@/Redux/Features/Customer/customerService';
import { FilterList, SearchOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CustomerListTable = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [filteredRows, setFilteredRows] = useState<CustomerData[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('All Statuses');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 13,
    });

    const { data, error, isLoading } = useGetCustomersQuery();

    const filterData = () => {
        if (!data || !data.data) return;

        const lowercasedSearch = searchText.toLowerCase();
        let filtered = data.data.filter((row: CustomerData) =>
            row.company_name.toLowerCase().includes(lowercasedSearch)
        );
        if (selectedStatus !== 'All Statuses') {
            const isActive = selectedStatus === 'Active';
            filtered = filtered.filter((row: CustomerData) => row.status === isActive);
        }
        setFilteredRows(filtered);
    };

    useEffect(() => {
        if (data && data.data) {
            setFilteredRows(data.data);
        }
    }, [data]);

    useEffect(() => {
        if (data && data.data) {
            filterData();
        }
    }, [searchText, selectedStatus, data]);

    const handleFilterClick = () => {
        setDropdownOpen(!dropdownOpen);
        setSelectedStatus('All Statuses');
    };

    const handlePaginationChange = (model: GridPaginationModel) => {
        setPaginationModel(model);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading customer data.</div>;
    if (!data || !data.data) return <div>No data available.</div>;

    const uniqueStatuses = [...new Set(data.data.map((row: CustomerData) => row.status ? 'Active' : 'Inactive'))];

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);
    };

    const NavigateButton = ({ to }: { to: string }) => {
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
            field: 'serialNumber',
            headerName: 'S/N',
            width: 100,
            valueGetter: (params: GridValueGetterParams<CustomerData>) => {
                const currentPageRows = filteredRows.slice(
                    paginationModel.page * paginationModel.pageSize,
                    (paginationModel.page + 1) * paginationModel.pageSize
                );
                const index = currentPageRows.findIndex(row => row.id === params.row.id);
                return (paginationModel.page * paginationModel.pageSize) + index + 1;
            },
            renderCell: (params: GridRenderCellParams<CustomerData>) => (
                <div className='text-[12px] font-[700] text-[#49526A] leading-3'>
                    {params.value}
                </div>
            ),
        },
        // {
        //     field: 'sn',
        //     headerName: 'SN',
        //     filterable: false,
        //     flex: 1,
        //     renderCell: (params: GridRenderCellParams) => (
        //         <div className="text-[14px] font-[400] text-[#49526A] leading-3">
        //             {Number(params.api.getRowIndexRelativeToVisibleRows(params.id)) + 1}
        //             {/* {params.api.getRowId(params)} */}
        //         </div>
        //     ),
        // },
        {
            field: 'company_name',
            headerName: 'COMPANY NAME',
            flex: 2,
            renderCell: (params: GridRenderCellParams) => (
                <div className='flex flex-col gap-[4px]'>
                    <div className='text-[14px] font-[600] text-[#49526A] leading-3'>
                        {params.row.company_name}
                    </div>
                </div>
            ),
        },
        {
            field: 'email',
            headerName: 'EMAIL',
            flex: 2,
            renderCell: (params: GridRenderCellParams) => (
                <div className='flex flex-col gap-[4px]'>
                    <div className='text-[14px] font-[500] text-[#49526A] leading-3'>
                        {params.row.email}
                    </div>
                </div>
            ),
        },
        {
            field: 'phone_number',
            headerName: 'PHONE NUMBER',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div className='flex flex-col gap-[4px]'>
                    <div className='text-[14px] font-[500] text-[#49526A] leading-3'>
                        {params.row.phone_number}
                    </div>
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
                    case true:
                        classNames += 'bg-[#D2F69E] text-[#005828]';
                        break;
                    case false:
                        classNames += 'bg-[#FFD181] text-[#050505]';
                        break;
                    default:
                        classNames += 'text-[#E2E4EB]';
                }

                return (
                    <div className={classNames}>
                        {params.row.status ? 'Active' : 'Inactive'}
                    </div>
                );
            }
        },
        {
            field: 'action',
            headerName: 'ACTION',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <NavigateButton to={`/admin/records/customer/${params.row.id}`} />
            ),
        },
    ];

    const startRow = paginationModel.page * paginationModel.pageSize + 1;
    const endRow = Math.min((paginationModel.page + 1) * paginationModel.pageSize, filteredRows.length);

    return (
        <div className='mt-[20px] w-[100%]'>
            <div className='flex flex-col md:flex-row items-center justify-between border bg-[#FFFFFF] border-[#CCD0DC] border-b-0 p-[18px] w-[100%]'>
                <div className='italic text-[12px] text-[#828DA9] w-[100%]'>
                    {`Showing ${startRow}-${endRow} of ${filteredRows.length} customers`}
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
                                fontSize: '10px',
                                fontStyle: 'italic',
                                '&.Mui-focused': {
                                    color: 'green',
                                },
                            },
                        }}
                    />
                    <div className='flex items-center gap-[10px] rounded-[32px] h-[32px] w-[149px] justify-center border border-[#CCD0DC] flex-row'>
                        <div className='text-[12px] font-[400] text-[#828DA9]'>All Customer</div>
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
                    className="pointer-cursor-datagrid"
                    rows={filteredRows}
                    columns={columns}
                    rowHeight={48}
                    autoHeight
                    paginationModel={paginationModel}
                    onPaginationModelChange={handlePaginationChange}
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

export default CustomerListTable;


