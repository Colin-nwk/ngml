import { ArrowBack } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';
import { TabLayout } from '../../Components/index';
import CostAnalysisTwo from '../CostAnalysisTwo/CostAnalysisTwo';
import CustomerPageDetails from '../CustomerLayout/CustomerPageDetails';
import DdqPage from '../DdqPage/DdqPage';
import EoiPage from '../EoiPage/EoiPage';
import SiteVisitationPage from '../SiteVisitationPage/SiteVisitationPage';
import ConnectProject from '../ConnectProject/ConnectProject';
import BillingHistory from '../BillingHistory/BillingHistory';
import AgreementTwo from '../AgreementTwo/AgreementTwo';
import Dailyvolumns from '../Dailyvolumns/Dailyvolumns';


const CustomerNewRegistration: React.FC = () => {

    const tablist = [
        {
            name: 'overview',
            ref: 'overview',
        },
    
        {
            name: 'Eoi request',
            ref: 'eoirequest',
        },
        {
            name: 'DDQ',
            ref: 'ddq',
        },
        {
            name: 'site visit',
            ref: 'sitevisit',
        },
        {
            name: 'cost analysis',
            ref: 'costanalysistwo',
        },
        {
            name: 'agreement',
            ref: 'agreement',
        },
       
        {
            name: 'connect project',
            ref: 'connectproject',
        },
        {
            name: 'Daily Volumns',
            ref: 'dailyvolumns',
        },
        {
            name: 'billing history',
            ref: 'billinghistory',
        }
    ]

    const tabContent = {
        overview: <CustomerPageDetails />,
        eoirequest: <EoiPage />,
        ddq: <DdqPage />,
        sitevisit: <SiteVisitationPage />,
        costanalysistwo: <CostAnalysisTwo />,
        agreement: <AgreementTwo />,
        connectproject: <ConnectProject />,
        dailyvolumns: <Dailyvolumns />,
        billinghistory:<BillingHistory />,

    };

    return (
        <div className='flex justify-end gap-[6px]'>
            <Link to={'/admin/records/customer'}>
                <div className='flex justify-center items-center border-2 h-[32px] w-[32px] rounded-[50%]'>
                    <ArrowBack color="success" style={{ fontSize: 'medium' }} />
                </div>
            </Link>
            <TabLayout
                title="Bucketfull Industries"
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

export default CustomerNewRegistration;