
/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomDatePicker from '@/Components/DatePickers/CustomDatePicker';
import { Filters, useGetAllCustomersDailyVolumeQuery } from '@/Redux/Features/Customer/customerVolume';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { IoIosTrendingDown, IoIosTrendingUp } from 'react-icons/io';
import { MdTrendingFlat } from 'react-icons/md';
import { DateObject } from 'react-multi-date-picker';
import { useLocation } from 'react-router-dom';
import { format, subDays } from 'date-fns';



type RowType = {
    sn: string;
    customer_site: string;
    allocation: string;
    nomination: string;
    volume: string;
    temperature: string;
    inlet: string;
    outlet: string;
    abnormal_status: string;
    created_at: string;
};



const DailyVolumnHistoryTable = () => {

    const defaultDate = subDays(new Date(), 1);
    const defaultDateFormatted = format(defaultDate, 'yyyy-MM-dd');
    const [date, setDate] = useState<DateObject | null>(new DateObject(defaultDate));
    const [rows, setRows] = useState<RowType[]>([]);


    const [filters, setFilters] = useState<Filters>({
        page: '1',
        per_page: '20',
        created_at_from: defaultDateFormatted,
        created_at_to: defaultDateFormatted,
    });

    const handleDateRangeChange = (newDate: any | null) => {
        setDate(newDate as DateObject);
        setFilters((prevFilters) => ({
            ...prevFilters,
            created_at_from: newDate?.format('yyyy-MM-dd'),
            created_at_to: newDate?.format('yyyy-MM-dd'),
        }));
        console.log('Selected date :', newDate);
    };

    const location = useLocation();
    useEffect(() => {
        const customer = location.pathname.split('/');
        setFilters((prevFilters) => ({
            ...prevFilters,
            customer_id: customer[4],
            customer_site_id: customer[5],
        }));
    }, [location]);

    const { data, isSuccess, isError, error } = useGetAllCustomersDailyVolumeQuery(filters);

    useEffect(() => {
        if (isError) {
            console.error('Error fetching daily volume data:', error);
            // Display an error message to the user
        }
    }, [isError, error]);

    useEffect(() => {
        if (isSuccess) {
            setRows(data?.data || []);
            console.log('dailyvolumes Table', data);
        }
    }, [isSuccess, data]);

    const columns: GridColDef[] = [
        {
            field: 'sn',
            headerName: 'SN',
            filterable: false,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const pageIndex = Number(filters.page) - 1;
                const rowsPerPage = Number(filters.per_page);
                const rowIndex = rows.indexOf(params.row);
                const rowNumber = rowIndex + 1 + pageIndex * rowsPerPage;
                return (
                    <div className="text-[14px] font-[400] text-[#9297A1] leading-3">
                        {rowNumber}
                    </div>
                );
            },
        },

        {
            field: 'customer',
            headerName: 'Site Name',
            flex: 1,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <div className="text-[14px] font-[400] text-[#9297A1] leading-3">
                    {params.row.customer_site}
                </div>
            ),
        },
        {
            field: 'allocation',
            headerName: 'Allocation',
            sortable: false,
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div className="text-[14px] font-[400] text-[#9297A1] leading-3">
                    {params.row.allocation}
                </div>
            ),
        },
        {
            field: 'nomination',
            headerName: 'Nomination',
            sortable: false,
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div className="text-[14px] font-[400] text-[#9297A1] leading-3">
                    {params.row.nomination}
                </div>
            ),
        },
        {
            field: 'volume',
            headerName: 'Volume',
            sortable: false,
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div className="text-[14px] font-[400] text-[#9297A1] leading-3">
                    {params.row.volume}
                </div>
            ),
        },
        {
            field: 'temperature',
            headerName: 'Temperature',
            sortable: false,
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div className="text-[14px] font-[400] text-[#9297A1] leading-3">
                    {params.row.temperature}
                </div>
            ),
        },
        {
            field: 'inlet-pressure',
            headerName: 'Inlet Pressure',
            sortable: false,
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div className="text-[14px] font-[400] text-[#9297A1] leading-3 ">
                    <span>
                        {params.row.inlet}
                    </span>

                </div>
            ),
        },
        {
            field: 'outlet-pressure',
            headerName: 'Outlet Pressure',
            sortable: false,
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div className="text-[14px] font-[400] text-[#9297A1] leading-3 ">
                    <span>
                        {params.row.outlet}
                    </span>
                </div>
            ),
        },

        {
            field: 'abnormal_status',
            headerName: 'Status',
            sortable: false,
            flex: 1,
            renderCell: (params) => (
                <div className="text-[13px] font-[500] leading-3 p-2 rounded-md flex space-x-4 capitalize"
                >
                    <span style={{ color: params.row.status === 'approve' ? '#22c55e' : '#f59e0b' }}>
                        {params.row.status}
                    </span>
                    {params.row.abnormal_status === 'normal' && (
                        <MdTrendingFlat className='text-amber-500 size-4' />
                    )}

                    {params.row.abnormal_status === 'low' && (
                        <IoIosTrendingDown className='text-red-500 size-4' />

                    )}
                    {params.row.abnormal_status === 'high' && (

                        <IoIosTrendingUp className='text-green-500 size-4' />
                    )}

                </div>

            ),
        },
        {
            field: 'created_at',
            headerName: 'Date',
            sortable: false,
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div className="text-[13px] font-[400] text-[#9297A1] leading-3 ">
                    <span>

                        {
                            // format(subDays(new Date(), 4), params.row.created_at)

                            format(new Date(params.row.created_at), 'dd/MMM/yyyy')
                        }
                    </span>
                </div>
            ),
        },

    ];

    return (
        <div className="mt-[20px] w-[100%] ">
            <div className="flex flex-col md:flex-row justify-between border bg-[#FFFFFF] border-[#CCD0DC] border-b-0 pl-[18px] pr-[18px] w-[100%] ">
                <div className="flex items-center italic text-[12px] text-[#828DA9] w-[100%]">
                    Showing {data?.data.length} of {rows.length} Daily Volume
                </div>
                <div className="flex items-center justify-between h-[60px] gap-5">
                    <div className="flex items-center gap-5">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-[#CCD0DC] rounded-md px-4 py-2 text-sm"
                            value={filters.status || ''}
                            onChange={(e) =>
                                setFilters((prevFilters) => ({
                                    ...prevFilters,
                                    status: e.target.value,
                                }))
                            }
                        />
                        <CustomDatePicker
                            value={date}
                            onChange={handleDateRangeChange}
                            placeholder="Select date"
                            format="YYYY-MM-DD"
                        />
                    </div>
                </div>
            </div>
            <div className="w-[100%]">
                <DataGrid
                    className="pointer-cursor-datagrid"
                    rows={rows}
                    columns={columns}
                    rowHeight={48}
                    autoHeight
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 20 },
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

export default DailyVolumnHistoryTable;
