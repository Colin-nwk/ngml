/* eslint-disable react-hooks/exhaustive-deps */
import { TenderTypeData } from '@/Data';
import { FilterList } from '@mui/icons-material';
import { IconButton, Modal, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import SelectedDateModal from '../SiteVistTable/SiteVistTableModal';



/**
 * Properties for an individual tender entry in the tender table.
 * @typeof {Object} TenderTypeProps
 * @property {number} id - Unique identifier for the tender entry.
 * @property {string} companyname - Name of the company associated with the tender.
 * @property {string} companyType - Type of company (e.g., LLC, Corporation).
 * @property {string[]} [selectedDates] - Dates selected for the tender process, if any.
 * @property {string} [status] - Current status of the tender (e.g., Open, Closed).
 * @property {string} action - Action to be taken on the tender entry (e.g., View, Edit).
 * @property {string} [deadline] - Deadline for the tender submission, if applicable.
 * @property {string} [companyEmail] - Email address of the company.
 * @property {string} [companyNumber] - Contact number of the company.
 * @property {string} [companyAddress] - Physical address of the company.
 */



interface TenderTypeProps {
    id: number;
    companyname: string;
    companyType: string;
    selectedDates?: string[];
    status?: string;
    action: string;
    deadline?: string;
    companyEmail?: string;
    companyNumber?: string;
    companyAddress?: string;

}

const rows = TenderTypeData




const TenderTable = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [filteredRows, setFilteredRows] = useState<TenderTypeProps[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<TenderTypeProps | null>(null);
    const [selectedAgreement, setSelectedAgreement] = useState<string>('All Tender Types');
    const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
    const [tenderTypeDropdownOpen, setTenderTypeDropdownOpen] = useState(false);
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

    useEffect(() => {
        filterData(searchText);
    }, [searchText, selectedAgreement, selectedCategory]);

    useEffect(() => {
        filterData(searchText);
    }, []);

    const handleTenderTypeFilterClick = () => {
        setTenderTypeDropdownOpen(!tenderTypeDropdownOpen);
        setSelectedAgreement('All Tender Types');
    };

    const handleCategoryFilterClick = () => {
        setCategoryDropdownOpen(!categoryDropdownOpen);
        setSelectedCategory('All Categories');
    };

    const tenderType = [...new Set(rows.map(row => row.tenderType))];
    const category = [...new Set(rows.map(row => row.category))];


    /**
     * Opens a modal to display detailed information for a selected tender entry.
     * @param {TenderTypeProps} row - The tender entry to display in the modal.
     */
    const handleOpen = (row: TenderTypeProps) => {
        setSelectedRow(row);
        setOpen(true);
    };


    const handleClose = () => setOpen(false);


    /**
    * Updates the search text state based on user input in the search field.
    * Filters the tender rows based on the updated search text.
    * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the search input field.
    */
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);
    };


    /**
    * Filters the tender rows based on search text, selected tender type, and category.
    * @param {string} search - The current search text.
    */
    const filterData = (search: string) => {
        const lowercasedSearch = search.toLowerCase();
        let filtered = rows.filter((row) =>
            row.companyname.toLowerCase().includes(lowercasedSearch) ||
            row.companyType.toLowerCase().includes(lowercasedSearch)
        );
        if (selectedAgreement !== 'All Tender Types') {
            filtered = filtered.filter(row => row.tenderType === selectedAgreement);
        }
        if (selectedCategory !== 'All Categories') {
            filtered = filtered.filter(row => row.category === selectedCategory);
        }
        setFilteredRows(filtered);
    };


    const columns: GridColDef[] = [
        {
            field: 'sn',
            headerName: '',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div className='bg-[#D2F69E] rounded-[10px] w-[68px] h-[48px] items-center flex justify-center'>
                    <img src={params.row.sn} alt='jjjj' />
                </div>
            ),

        },
        {
            field: 'dateopened',
            headerName: 'DATE OPENED',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div
                    className='text-[12px] font-[700] text-[#49526A] leading-3'>
                    {params.row.dateopened}
                </div>
            ),
        },
        {
            field: 'tenderType',
            headerName: 'TENDER TYPE',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div
                    className='text-[12px] font-[700] text-[#49526A] leading-3'>
                    {params.row.tenderType}
                </div>
            ),
        },
        {
            field: 'titleDescription',
            headerName: 'TITLE AND DESCRIPTION',
            flex: 3,
            renderCell: (params) => (
                <div className='flex flex-col gap-[16px]'>
                    <div className='text-[14px] font-[700] text-[#49526A] leading-3 '>
                        {params.row.titleDescription}
                    </div>
                    <div className='text-[12px] font-[400] text-[#49526A] leading-4 text-wrap '>{params.row.description}</div>

                </div>
            )
        },
        {
            field: 'category',
            headerName: 'CATEGORY',
            flex: 1.5,
            renderCell: (params: GridRenderCellParams) => (
                <div className=' bg-[#EAEEF2] h-[24px] p-[8px] rounded-[24px] flex items-center justify-center'>
                    <div className='text-[#050505] font-[700] text-[12px]'>{params.row.category}</div>
                </div>
            )
        },


        {
            field: 'action',
            headerName: 'ACTION',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div
                    onClick={() => handleOpen(params.row)}
                    className='text-[12px] text-[#FFFFFF] rounded-[8px] bg-[#00AF50] h-[62px] w-[84px] flex items-center justify-center cursor-pointer'>
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
                            statusHeading={selectedRow.status || 'Provide a status'}
                        />
                    )}
                </div>
            </Modal>
            <div className='flex flex-col rounded-t-lg md:flex-row items-center justify-between border bg-[#FFFFFF] border-[#CCD0DC] border-b-0 p-[18px] w-[100%] '>
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
                            style: {
                                borderRadius: '32px',
                                width: '200px',
                                height: '35px',

                            }
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
                    <div className='flex items-center gap-[10px] rounded-[32px] h-[32px] w-[168px] justify-center border border-[#CCD0DC] flex-row'>
                        <div className='text-[12px] font-[400] text-[#828DA9] '>All Tender Types</div>
                        <IconButton onClick={handleTenderTypeFilterClick}>
                            <FilterList />
                        </IconButton>
                        {tenderTypeDropdownOpen && (
                            <div className='absolute z-10 top-full right-30 mt-2 h-[100px] w-[155px] bg-[#FFFFFF] border border-[#E2E4EB] rounded-md shadow-lg'>
                                {tenderType.map(name => (
                                    <div key={name} className='cursor-pointer p-2 hover:bg-[#D2F69E] text-[12px]' onClick={() => setSelectedAgreement(name)}>
                                        {name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className='flex items-center gap-[10px] rounded-[32px] h-[32px] w-[139px] justify-center border border-[#CCD0DC] flex-row'>
                        <div className='text-[12px] font-[400] text-[#828DA9] '>All Categories</div>
                        <IconButton onClick={handleCategoryFilterClick}>
                            <FilterList />
                        </IconButton>
                        {categoryDropdownOpen && (
                            <div className='absolute z-10 top-full -right-3 mt-2 h-[100px] w-[155px] bg-[#FFFFFF] border border-[#E2E4EB] rounded-md shadow-lg'>
                                {category.map(name => (
                                    <div key={name} className='cursor-pointer p-2 hover:bg-[#D2F69E] text-[12px]' onClick={() => setSelectedCategory(name)}>
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
                    rowHeight={96}
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

export default TenderTable


