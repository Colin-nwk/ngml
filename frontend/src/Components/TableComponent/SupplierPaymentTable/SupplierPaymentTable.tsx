/* eslint-disable react-hooks/exhaustive-deps */
import { SuppliersPaymentHistoryData } from '@/Data';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



interface NavigateButtonProps {
    to: string;
}

const rows = SuppliersPaymentHistoryData


const SupplierPaymentTable = () => {
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [filteredRows, setFilteredRows] = useState(rows);


    useEffect(() => {
        filterData();
    }, [selectedYear]);


    const filterData = () => {
        const filtered = SuppliersPaymentHistoryData.filter(row => {
            const yearParts = row.dateofpayment.split('/');
            const rowYear = yearParts[1];
            return (
                (selectedYear ? rowYear === selectedYear : true)
            );
        });

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
                <div className='text-xs font-[500] text-[#49526A] leading-3'>
                    {params.row.sn}
                </div>
            ),

        },
        {
            field: 'paymentamount',
            headerName: 'PAYMENT AMOUNT (NGN) ',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div>
                    <div className='text-[14px] font-[500] text-[#49526A] leading-3'>
                        {params.row.paymentamount}
                    </div>
                </div>
            ),
        },
        {
            field: 'paymentmonth',
            headerName: 'PAYMENT MONTH',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div
                    className='text-[12px] font-[500] text-[#49526A] leading-3'>
                    {params.row.paymentmonth}
                </div>
            ),
        },

        {
            field: 'dateofpayment',
            headerName: 'DATE OF PAYMENT',
            flex: 1,
            renderCell: (params) => (
                <div className='text-[12px] font-[500] text-[#49526A] leading-3 '>
                    {params.row.dateofpayment}
                </div>
            )
        },
        {
            field: 'modeofpayment',
            headerName: 'MONTH OF PAYMENT',
            flex: 1,
            renderCell: (params) => (
                <div className='text-[12px] font-[500] text-[#49526A] leading-3 '>
                    {params.row.modeofpayment}
                </div>
            )
        },


        {
            field: 'action',
            headerName: 'ACTION',
            flex: 1,
            renderCell: () => (
                <NavigateButton to="/admin/records/supplier/id" />
            ),
        },
    ]




    return (
        <div className='mt-[20px] w-[100%] '>
            <div className='flex flex-col md:flex-row justify-between border bg-[#FFFFFF] border-[#CCD0DC] border-b-0 p-[18px] w-[100%] '>
                <div className=' text-[16px] font-[700] w-[100%] flex items-center '>
                    Payment History
                </div>
                <div className='mt-[6px]'>
                    <select
                        value={selectedYear}
                        onChange={e => setSelectedYear(e.target.value)}
                        className='border p-[5px] border-[#CCD0DC] outline-none text-[12px] font-[600] hover:border-[#00AF50] rounded-[32px] h-[32px] w-[106px]' >
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </select>

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

export default SupplierPaymentTable


