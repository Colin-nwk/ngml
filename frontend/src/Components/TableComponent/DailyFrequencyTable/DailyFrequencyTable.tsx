import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DailyFrequencyData } from '../../../Data';
import { Button, CustomInput, Modal } from '../../../Components/index';

interface DailyFrequencyProps {
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
    datesent?: string;
    frequency?: string;
    value?: string;
    rate?: string;
    amount?: string;
}

const rows = DailyFrequencyData;

const DailyFrequencyTable: React.FC = () => {
    const [filteredRows, setFilteredRows] = useState<DailyFrequencyProps[]>(rows);
    const [isVolumeModalOpen, setIsVolumeModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<DailyFrequencyProps | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');

    useEffect(() => {
        filterData();
    }, [selectedMonth, selectedYear]);

    const handleOpen = (row: DailyFrequencyProps) => {
        setSelectedRow(row);
        setIsVolumeModalOpen(true);
    };

    const handleClose = () => {
        setIsVolumeModalOpen(false);
        setSelectedRow(null);
    };

    const filterData = () => {
        const filtered = DailyFrequencyData.filter(row => {
            const dateParts = row.datesent?.split('/');
            const rowMonth = dateParts ? dateParts[1] : '';
            const rowYear = dateParts ? dateParts[2] : '';
            return (
                (selectedMonth ? rowMonth === selectedMonth : true) &&
                (selectedYear ? rowYear === selectedYear : true)
            );
        });

        setFilteredRows(filtered);
    };

    const columns: GridColDef[] = [
        { field: 'sn', headerName: 'SN', width: 60 },
        { field: 'companyname', headerName: 'COMPANY NAME', flex: 1 },
        { field: 'companyType', headerName: 'TYPE', flex: 1 },
        { field: 'frequency', headerName: 'FREQUENCY', flex: 1 },
        { field: 'datesent', headerName: 'DATE', flex: 1 },
        { field: 'value', headerName: 'VALUE (MILLION CUBIC FEET)', flex: 1 },
        { field: 'rate', headerName: 'RATE (NGN)', flex: 1 },
        { field: 'amount', headerName: 'AMOUNT', flex: 1 },
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

    return (
        <div className='mt-[20px] w-[100%]'>
            <Modal
                isOpen={isVolumeModalOpen}
                onClose={handleClose}
                size='medium'
                title='Daily Volume Record'
                buttons={[
                    <div className='flex gap-2 mb-[-10px]' key="buttons">
                        <div className='w-[120px]'>
                            <Button
                                type="outline"
                                label="Cancel"
                                action={handleClose}
                                color="#FFFFFF"
                                fontStyle="italic"
                                width="100%"
                                height="40px"
                                fontSize="16px"
                                radius="20px"
                            />
                        </div>
                        <div className='w-[260px]'>
                            <Button
                                type="secondary"
                                label="Modify"
                                action={() => alert('Data saved!')}
                                color="#FFFFFF"
                                fontStyle="italic"
                                width="100%"
                                height="40px"
                                fontSize="16px"
                                radius="20px"
                            />
                        </div>
                    </div>
                ]}
            >
                {selectedRow && (
                    <>
                        <CustomInput
                            required
                            type="text"
                            label='Company Name'
                            value={selectedRow.companyname || ''}
                            handleChangeEvent={() => {}}
                            placeholder="Company Name"
                        />
                        <CustomInput
                            required
                            type="text"
                            label='Date'
                            value={selectedRow.datesent || ''}
                            handleChangeEvent={() => {}}
                            placeholder="Date"
                        />
                        <CustomInput
                            required
                            type="text"
                            label='Volume (Scf)'
                            value={selectedRow.value || ''}
                            handleChangeEvent={() => {}}
                            placeholder="Volume"
                        />
                        <CustomInput
                            required
                            type="text"
                            label='Rate (NGN)'
                            value={selectedRow.rate || ''}
                            handleChangeEvent={() => {}}
                            placeholder="Rate"
                        />
                        <CustomInput
                            required
                            type="text"
                            label='Amount'
                            value={selectedRow.amount || ''}
                            handleChangeEvent={() => {}}
                            placeholder="Amount"
                        />
                    </>
                )}
            </Modal>

            <div className='flex flex-col md:flex-row justify-between border bg-[#FFFFFF] border-[#CCD0DC] border-b-0 p-[18px] w-[100%]'>
                <div className='flex items-center italic text-[12px] text-[#828DA9] w-[100%]'>
                    Showing {filteredRows.length} of {rows.length} site visits
                </div>
                <div className='flex items-center justify-between h-[60px]'>
                    <div className='flex gap-[10px]'>
                        <select
                            value={selectedMonth}
                            onChange={e => setSelectedMonth(e.target.value)}
                            className='border border-[#CCD0DC] outline-none text-[12px] font-[600] hover:border-[#00AF50] rounded-[32px] h-[32px] w-[100px]'
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
                            className='border border-[#CCD0DC] outline-none rounded-[32px] hover:border-[#00AF50] text-[12px] font-[600] h-[32px] w-[77px]'
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

            <div>
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
                    pageSizeOptions={[5, 10]}
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

export default DailyFrequencyTable;