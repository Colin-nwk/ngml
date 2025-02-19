
// import { useGetAllCustomersDailyVolumeQuery, useGetCustomersDailyVolumeByIdQuery } from '@/Redux/Features/Customer/customerVolume';
// import { Modal } from '@mui/material';
// import {
//     DataGrid,
//     GridColDef,
//     GridRenderCellParams,
//     GridValueGetterParams
// } from '@mui/x-data-grid';
// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';




// const DailyVolumnTable = () => {

//     const location = useLocation();


//     const [searchText] = useState<string>('');
//     const [open, setOpen] = useState(false);
//     const [selectedMonth, setSelectedMonth] = useState<string>('');
//     const [selectedYear, setSelectedYear] = useState<string>('');
//     const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 13 });
//     const [filteredRows] = useState<any[]>([]);
//     const [customerId, setCustomerId] = useState<number | null>(null);

//     useEffect(() => {
//         const customer = location.pathname.split('/');
//         setCustomerId(Number(customer[4]));
//     }, [location]);


//     const [queryParams] = useState<Record<string, string>>({
//         page: '1',
//         per_page: '50',
//         created_at_from: dayBeforeToday(),
//         created_at_to: dayBeforeToday(),
//         updated_at_from: dayBeforeToday(),
//         updated_at_to: dayBeforeToday(),
//         status: 'active',
//         customer_id: '1'
//     });


//     function dayBeforeToday() {
//         const today = new Date();
//         today.setDate(today.getDate() - 1);
//         const year = today.getFullYear();
//         const month = String(today.getMonth() + 1).padStart(2, '0');
//         const day = String(today.getDate()).padStart(2, '0');

//         return `${year}-${month}-${day}`;
//     }


//     const { data, error, isLoading } = useGetAllCustomersDailyVolumeQuery(queryParams);

//     const { data: dataQuery, isSuccess, isError, error: queryError } = useGetCustomersDailyVolumeByIdQuery(customerId as number);

//     useEffect(() => {
//         console.log(dataQuery, 'hhhhhhhhhhhdataQuery');
//         if (isSuccess) console.log(dataQuery, 'dataQuery');
//         if (isError) console.log(queryError, 'error');


//     }, [])





//     // const handleOpen = (row: DailyVolumnProps) => {
//     //     setSelectedRow(row);
//     //     setOpen(true);
//     // };

//     const handleClose = () => setOpen(false);

//     const filterData = () => {
//         if (!data?.data) return [

//         ];
//         const lowercasedSearch = searchText.toLowerCase();

//         return data?.data?.filter((customer) => {
//             return (
//                 customer.customerId?.toLowerCase().includes(lowercasedSearch) ||
//                 customer.dailyVolumes?.some((vol) => vol.date.includes(selectedMonth) && vol.date.includes(selectedYear))
//             );
//         });
//     };




//     const columns: GridColDef[] = [
//         // {
//         //     field: 'sn',
//         //     headerName: 'SN',
//         //     width: 60,
//         //     renderCell: (params: GridRenderCellParams) => (
//         //         <div className='text-xs font-[600] text-[#49526A] leading-3'>
//         //             {params.row.customer_id}
//         //         </div>
//         //     ),
//         // },

//         {
//             field: 'serialNumber',
//             headerName: 'S/N',
//             width: 100,
//             valueGetter: (params: GridValueGetterParams) => {
//                 const currentPageRows = filteredRows.slice(
//                     paginationModel.page * paginationModel.pageSize,
//                     (paginationModel.page + 1) * paginationModel.pageSize
//                 );
//                 const index = currentPageRows.findIndex(row => row.id === params.row.id);
//                 return (paginationModel.page * paginationModel.pageSize) + index + 1;
//             },
//             renderCell: (params: GridRenderCellParams) => (
//                 <div className='text-[12px] font-[700] text-[#49526A] leading-3'>
//                     {params.value}
//                 </div>
//             ),
//         },
//         {
//             field: 'name',
//             headerName: 'COMPANY NAME',
//             flex: 1,
//             renderCell: (params: GridRenderCellParams) => (
//                 <div className='flex flex-col gap-[4px]'>
//                     <div className='text-[14px] font-[600] text-[#49526A] leading-3'>
//                         {params.row.companyname}
//                     </div>
//                     <div className='text-[10px] font-[400] text-[#828DA9] leading-3'>
//                         {params.row.companyType}
//                     </div>
//                 </div>
//             ),
//         },
//         {
//             field: 'date',
//             headerName: 'DATE',
//             flex: 1,
//             renderCell: (params: GridRenderCellParams) => (
//                 <div className='text-[12px] font-[400] text-[#49526A] leading-3 '>
//                     {params.row.datesent}
//                 </div>
//             ),
//         },
//         {
//             field: 'volume',
//             headerName: 'VOL (MSCF)',
//             flex: 1,
//             renderCell: (params: GridRenderCellParams) => (
//                 <div className='text-[12px] font-[400] text-[#49526A] leading-3'>
//                     {params.row.volume}
//                 </div>
//             ),
//         },
//         // {
//         //     field: 'created_at',
//         //     headerName: 'DATE',
//         //     flex: 1,
//         //     renderCell: (params: GridRenderCellParams) => (
//         //         <div className='text-[12px] font-[400] text-[#49526A] leading-3'>
//         //             {params.row.created_at}
//         //         </div>
//         //     ),
//         // },
//         // {
//         //     field: 'updated_at',
//         //     headerName: 'VALUE',
//         //     flex: 1,
//         //     renderCell: (params: GridRenderCellParams) => (
//         //         <div className='text-[12px] font-[400] text-[#49526A] leading-3'>
//         //             {params.row.updated_at}
//         //         </div>
//         //     ),
//         // },
//         {
//             field: 'status',
//             headerName: 'STATUS',
//             flex: 1,
//             renderCell: (params: GridRenderCellParams) => {
//                 let classNames = 'text-[12px] font-[500] h-[24px] rounded-full flex justify-center items-center px-2.5 ';

//                 switch (params.row.abnormal_status) {
//                     case 'low':
//                         classNames += 'bg-orange-200';
//                         break;
//                     case 'high':
//                         classNames += 'bg-green-200';
//                         break;
//                     default:
//                         classNames += 'bg-gray-200';
//                         break;
//                 }

//                 return (
//                     <div className={classNames}>
//                         {params.value}
//                     </div>
//                 );
//             }
//         },
//     ];

//     useEffect(() => {
//         filterData();
//     }, [data, selectedMonth, selectedYear]);

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error loading data</div>;

//     return (
//         <div className='mt-[20px] w-[100%]'>
//             <Modal open={open} onClose={handleClose}>
//                 <div>
//                     {/* {selectedRow && (
//                         <SelectedDateModal
//                             handleClose={handleClose}
//                             dateTime={'09th, Nov, 2023; 09:23:44Am'}
//                             status={selectedRow.status || 'Default Status'}
//                             companyName={selectedRow.companyname || 'Provide Company Name'}
//                             companyEmail={selectedRow.companyEmail || 'Provide an email address'}
//                             companyNumber={selectedRow.companyNumber || 'Provide a number'}
//                             availableDates={selectedRow.selectedDates || ['No Dates Available']}
//                             companyAddress={selectedRow.companyAddress || 'Provide an Address'}
//                             statusHeading={''}
//                         />
//                     )} */}
//                 </div>
//             </Modal>

//             <div className='flex flex-col md:flex-row justify-between border bg-[#FFFFFF] border-[#CCD0DC] border-b-0 pl-[18px] pr-[18px] w-[100%]'>
//                 <div className='flex items-center italic text-[12px] text-[#828DA9] w-[100%]'>
//                     Showing {filterData().length} of {data?.data?.length} site visits
//                 </div>
//                 <div className='flex items-center justify-between h-[60px]'>
//                     <div className='flex gap-[10px]'>
//                         <select
//                             value={selectedMonth}
//                             onChange={e => setSelectedMonth(e.target.value)}
//                             className='border border-[#CCD0DC] pl-1 outline-none text-[12px] text-gray-400 font-[600] hover:border-[#00AF50] rounded-[32px] h-[32px] w-[100px]'
//                         >
//                             <option value="">Month</option>
//                             <option value="Jan">January</option>
//                             <option value="Feb">February</option>
//                             <option value="Mar">March</option>
//                             <option value="Apr">April</option>
//                             <option value="May">May</option>
//                             <option value="Jun">June</option>
//                             <option value="Jul">July</option>
//                             <option value="Aug">August</option>
//                             <option value="Sep">September</option>
//                             <option value="Oct">October</option>
//                             <option value="Nov">November</option>
//                             <option value="Dec">December</option>
//                         </select>

//                         <select
//                             value={selectedYear}
//                             onChange={e => setSelectedYear(e.target.value)}
//                             className='border border-[#CCD0DC] outline-none text-gray-400 pl-1 rounded-[32px] hover:border-[#00AF50] text-[12px] font-[600] h-[32px] w-[77px]'
//                         >
//                             <option value="">Year</option>
//                             <option value="2022">2022</option>
//                             <option value="2023">2023</option>
//                             <option value="2024">2024</option>
//                             <option value="2025">2025</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>

//             <div className='w-[100%]'>
//                 <DataGrid
//                     className="pointer-cursor-datagrid"
//                     rows={filterData()}
//                     columns={columns}
//                     rowHeight={48}
//                     // getRowClassName={getRowClassName}
//                     autoHeight
//                     paginationModel={paginationModel}
//                     onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
//                     pagination
//                     initialState={{
//                         pagination: {
//                             paginationModel: paginationModel,
//                         },
//                     }}
//                     sx={{
//                         width: '100%',
//                         background: '#FFFFFF',
//                         '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus-within': {
//                             outline: 'none',
//                         },
//                         '& .MuiDataGrid-columnHeaders': {
//                             backgroundColor: '#F6FDEC',
//                             '& .MuiDataGrid-columnHeaderTitle': {
//                                 color: '#050505',
//                                 fontWeight: '700',
//                                 fontSize: '12px',
//                             },
//                         },
//                     }}
//                 />
//             </div>
//         </div>
//     );
// };

// export default DailyVolumnTable;

const DailyVolumnTable = () => {
    return (
        <div>DailyVolumnTable</div>
    )
}

export default DailyVolumnTable


