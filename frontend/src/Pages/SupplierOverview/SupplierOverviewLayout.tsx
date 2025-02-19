import { ArrowBack } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';
import { TabLayout } from '../../Components/index';
import SupplierOverviewPage from './SupplierOverviewPage';
import SupplierPaymentHistory from '../SupplierPaymentHistory/SupplierPaymentHistory';
import SupplierProfileDetails from '../SupplierProfileDetails/SupplierProfileDetails';



const SupplierOverviewLayout: React.FC = () => {

   
    const tablist = [
        {
            name: 'Overview',
            ref: 'overview',
           
        },
        {
            name: 'Payment History',
            ref: 'paymenthistory',
          
        },
        {
            name: 'Profile Details',
            ref: 'profiledetails',
          
        },
       
        
    ]

  
    const tabContent: { [key: string]: JSX.Element; } = {   
        overview: <SupplierOverviewPage/>,
        paymenthistory: <SupplierPaymentHistory/>,
        profiledetails: <SupplierProfileDetails/>
    };
    
    return (
        <div className='flex justify-end gap-[6px] ' >
            <Link to={'/admin/records/suppliers'}>
                <div className='flex justify-center items-center border-2 h-[32px] w-[32px] rounded-[50%]'>
                    <ArrowBack color="success" style={{ fontSize: 'medium' }} />
                </div>
            </Link>
            <TabLayout
                title="Dangote Sugar"
                width=""
                height=""
                backgroundColor="#F5F7F9"
                color="#49526A"
                borderColor=""
                borderWidth=""
                borderRadius=""
                tablist={tablist}
                tabContent={tabContent}
                showButtons={false}
            />
        </div>
    )
}

export default SupplierOverviewLayout;