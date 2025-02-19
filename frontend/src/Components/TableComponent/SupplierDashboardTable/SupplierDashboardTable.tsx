/* eslint-disable react-hooks/exhaustive-deps */
import { SupplierDashboardData } from '@/Data';
import { MoreHorizOutlined } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';


interface SupplierDashboardProps {
    id: number;
    selectedDates?: string[];
    status?: string;
    deadline?: string;
    datesent?: string;
}

const rows = SupplierDashboardData


const SupplierDashboardTable = () => {
    const [filteredRows, setFilteredRows] = useState<SupplierDashboardProps[]>(rows);
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');



    useEffect(() => {
        filterData();
    }, [selectedMonth, selectedYear]);



    /**
     * Filters the data based on selected month and year upon changing any of those.
     */
    const filterData = () => {
        const filtered = SupplierDashboardData.filter(row => {
            const dateParts = row.datesent.split('/');
            const rowMonth = dateParts[1];
            const rowYear = dateParts[2];
            return (
                (selectedMonth ? rowMonth === selectedMonth : true) &&
                (selectedYear ? rowYear === selectedYear : true)
            );
        });

        setFilteredRows(filtered);
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
            field: 'date',
            headerName: 'DATE',
            flex: 2,
            renderCell: (params) => (
                <div className='text-[12px] font-[400] text-[#49526A] leading-3 '>
                    {params.row.datesent}
                </div>
            )
        },

        {
            field: 'firm',
            headerName: 'FIRM',
            flex: 1.5,
            renderCell: (params: GridRenderCellParams) => (
                <div
                    className='text-[12px] font-[400] text-[#49526A] leading-3'>
                    {params.row.firm}
                </div>
            ),
        },

        {
            field: 'rate',
            headerName: 'INTERRUPTIBLE (Scf)',
            flex: 1,
            renderCell: (params) => (
                <div className='text-[12px] font-[400] text-[#49526A] leading-3 '>
                    {params.row.rate}
                </div>
            )
        },
        {
            field: 'action',
            headerName: '',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div
                    onClick={() => (params.row)}
                    className='text-[12px] ml-6 text-[#828DA9] flex items-center justify-end cursor-pointer'>
                    <MoreHorizOutlined />
                </div>
            ),
        },

    ]

    return (
        <div className='mt-[20px] w-[100%] '>
            <div className='flex flex-col md:flex-row justify-between border bg-[#FFFFFF] border-[#CCD0DC] border-b-0 pl-[18px] pr-[18px]  w-[100%] '>
                <div className='flex items-center italic text-[12px] text-[#828DA9] w-[100%]'>
                    Showing {filteredRows.length} of {rows.length} site visits
                </div>
                <div className='flex items-center h-[60px] gap-5 ' >
                    <div className='flex gap-[10px]'>
                        <select
                            value={selectedMonth}
                            onChange={e => setSelectedMonth(e.target.value)}
                            className='border p-1 border-[#CCD0DC] outline-none text-[12px] font-[600] hover:border-[#00AF50] rounded-[32px] h-[32px] w-[100px]'
                        >
                            <option value="">Month</option>
                            <option value="Jan">January</option>
                            <option value="Feb">February</option>
                            <option value="Mar">March</option>
                            <option value="Apr">April</option>
                            <option value="May">May</option>
                            <option value="Jun">June</option>
                            <option value="Jul">July</option>
                            <option value="Aug">August</option>
                            <option value="Sep">September</option>
                            <option value="Oct">October</option>
                            <option value="Nov">November</option>
                            <option value="Dec">December</option>
                        </select>

                        <select
                            value={selectedYear}
                            onChange={e => setSelectedYear(e.target.value)}
                            className='border border-[#CCD0DC] p-1 outline-none rounded-[32px] hover:border-[#00AF50] text-[12px] font-[600]  h-[32px]  w-[77px]'
                        >
                            <option value="">Year</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </select>
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

export default SupplierDashboardTable


