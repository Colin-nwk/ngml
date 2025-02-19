import colors from '@/Utils/colors';

const CustomerConnectProject = () => {
    const milestones = [
        {
            sn: '01',
            title: 'Transport Pipes and Valves to metering location',
            duration: '1 Week',
            details: 'Execute gas connection project through expanding high-pressure pipelines, metering, reduction and filtration stations, monitoring & controlling systems for the customer to other consuming sector (electricity, industrial, commercial residential, etc.).'
        },
        {
            sn: '02',
            title: 'Transport Pipes and Valves to metering location',
            duration: '1 Week',
            details: 'Execute gas connection project through expanding high-pressure pipelines, metering, reduction and filtration stations, monitoring & controlling systems for the customer to other consuming sector (electricity, industrial, commercial residential, etc.).'
        }
    ];

    return (
        <div className="p-[20px] flex flex-col gap-4 rounded-[20px] w-[100%] h-fit" style={{ background: colors.dark[50] }}>
            <div className='border-2 border-[#E9EBF1] rounded-[10px] p-[15px] bg-dark-50'>
                <div className='text-[18px] font-[600]'>Notice !!!</div>
                <div className='mt-2 text-[14px]'>
                    The NNPC Gas Marketing Limited will
                    be required to visit the premises of your
                    business operations, to carry out a preliminary feasibility
                    and site survey assessment. We therefore need you to pick
                    a date most convenient for that visit from the 3 available
                    dates provided below.
                </div>
            </div>
            <div className='flex justify-between border-2 border-[#E9EBF1] rounded-[10px] p-[15px] bg-dark-50'>
                <div className='font-[600]'>Project Period</div>
                <div className='flex gap-1'>
                    <div className='flex items-center justify-center text-[12px] font-[700] bg-[#D2F69E] text-[#35763F] p-1 rounded-[40px] w-[100px]'>
                        19/Dec/2023
                    </div>
                    <div>to</div>
                    <div className='flex items-center justify-center text-[12px] font-[700] bg-[#D2F69E] text-[#35763F] p-1 rounded-[40px] w-[100px]'>
                        01/Dec/2024
                    </div>
                </div>
            </div>
            <div className='border-2 border-[#E9EBF1] rounded-[10px]  bg-dark-50'>
                <div className='font-[600] border-b p-2 bg-[#F6FDEC]'>
                    <div className=' ml-2'>Milestones</div>
                </div>
                <div className=' p-[10px]'>
                    <table className='w-full'>
                        <thead>
                            <tr className='text-[14px]'>
                                <th className='border-b text-left p-2'>S/N</th>
                                <th className='border-b text-left p-2'>TITLE</th>
                                <th className='border-b text-left p-2'>DURATION</th>
                                <th className='border-b text-left p-2'>DETAILS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {milestones.map((milestone, index) => (
                                <tr key={index}>
                                    <td className='border-b p-2 text-[12px] '>{milestone.sn}</td>
                                    <td className='border-b p-2 text-[12px]'>{milestone.title}</td>
                                    <td className='border-b p-2 text-[12px]'>{milestone.duration}</td>
                                    <td className='border-b p-2 text-[12px] ml-4'>{milestone.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CustomerConnectProject;
