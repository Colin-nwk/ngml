import { AgreementData } from '@/Data';
import { FilterList, SearchOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, Modal, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridPaginationModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import SelectedDateModal from '../SiteVistTable/SiteVistTableModal';

interface AgreementTableProps {
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

const rows = AgreementData;

const AgreementTable = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [filteredRows, setFilteredRows] = useState<AgreementTableProps[]>(rows);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<AgreementTableProps | null>(null);
    const [selectedAgreement, setSelectedAgreement] = useState<string>('All Contracts');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 13,
    });

    useEffect(() => {
        filterData(searchText);
    }, [searchText, selectedAgreement]);

    const handleFilterClick = () => {
        setDropdownOpen(!dropdownOpen);
        setSelectedAgreement('All Contracts');
    };

    const agreementNames = [...new Set(rows.map(row => row.agreementType))];

    const handleOpen = (row: AgreementTableProps) => {
        setSelectedRow(row);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

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
        if (selectedAgreement !== 'All Contracts') {
            filtered = filtered.filter(row => row.agreementType === selectedAgreement);
        }
        setFilteredRows(filtered);
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Signed':
                return { backgroundColor: '#D2F69E', color: '#005828' };
            case 'Unsigned':
                return { backgroundColor: '#FFD181', color: '#475467' };
            default:
                return {};
        }
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
                    <div className='text-[10px] font-[400] text-[#828DA9] leading-3'>
                        {params.row.companyType}
                    </div>
                </div>
            ),
        },
        {
            field: 'agreementType',
            headerName: 'AGREEMENT NAME',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div className='text-[12px] font-[700] text-[#49526A] leading-3'>
                    {params.row.agreementType}
                </div>
            ),
        },
        {
            field: 'datesent',
            headerName: 'DATE SENT',
            flex: 1,
            renderCell: (params) => (
                <div className='text-[12px] font-[700] text-[#49526A] leading-3 '>
                    {params.row.datesent}
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
                    case 'Unsigned':
                        classNames += 'bg-[#FFD181] text-[#050505] ';
                        break;
                    case 'Signed':
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
    ];

    const handlePaginationChange = (model: GridPaginationModel) => {
        setPaginationModel(model);
    };

    const startRow = paginationModel.page * paginationModel.pageSize + 1;
    const endRow = Math.min((paginationModel.page + 1) * paginationModel.pageSize, filteredRows.length);

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
            <div className='flex flex-col md:flex-row items-center justify-between border border-[#CCD0DC] border-b-0 p-[20px] w-[100%]'>
                <div className='italic text-[12px] text-[#828DA9] w-[100%]'>
                    {`Showing ${startRow}-${endRow} of ${filteredRows.length} site visits`}
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
                        <div className='text-[12px] font-[400] text-[#828DA9] '>Filter</div>
                        <IconButton onClick={handleFilterClick}>
                            <FilterList />
                        </IconButton>
                        {dropdownOpen && (
                            <div className='absolute z-10 top-full -right-3 mt-2 h-[100px] w-[155px] bg-[#FFFFFF] border border-[#E2E4EB] rounded-md shadow-lg'>
                                {agreementNames.map(name => (
                                    <div key={name} className='cursor-pointer p-2 hover:bg-[#D2F69E] text-[12px]' onClick={() => setSelectedAgreement(name)}>
                                        {name}
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

export default AgreementTable;
