
import { useGetCustomerByIdQuery } from '@/Redux/Features/Customer/customerService';
import { ArrowBack } from '@mui/icons-material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { TabLayout } from '../../Components/index';
import Agreement from '../Agreement/Agreement';
// import ConnectProject from '../ConnectProject/ConnectProject';
import CostAnalysis from '../CostAnalysis/CostAnalysis';
import CustomerPageDetails from '../CustomerLayout/CustomerPageDetails';
import CustomerManager from '../CustomerManager/CustomerManager';
import DdqPage from '../DdqPage/DdqPage';
import EoiPage from '../EoiPage/EoiPage';
import SiteVisitationPage from '../SiteVisitationPage/SiteVisitationPage';
import CustomerDetail from './CustomerDetail';

const AdminCustomerPageLayout: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const { data: customer, error: customerError, isLoading: isCustomerLoading } = useGetCustomerByIdQuery(Number(customerId));
  const { data: customerLocation, error: locationError, isLoading: isLocationLoading } = useGetCustomerByIdQuery(Number(customerId));

  if (isCustomerLoading || isLocationLoading) return <div>Loading...</div>;
  if (customerError || locationError) return <div>Error loading customer data.</div>;

  // Dynamically determine title
  const firstSiteName = customerLocation?.data?.sites?.[0]?.site_name;
  const title = firstSiteName
    ? firstSiteName.toUpperCase()
    : customer?.data?.company_name.toUpperCase() || 'Customer Details';

  const tablist = [
    { name: 'Overview', ref: 'overview' },
    { name: 'Customer details', ref: 'customerdetails' },
    { name: 'EOI', ref: 'eoirequest' },
    { name: 'DDQ', ref: 'ddq' },
    { name: 'Site visit', ref: 'sitevisit' },
    { name: 'Cost analysis', ref: 'costanalysis' },
    { name: 'Agreement', ref: 'agreement' },
    { name: 'Customer manager', ref: 'customermanager' },
  ];

  const tabContent = {
    overview: <CustomerPageDetails />,
    customerdetails: <CustomerDetail />,
    eoirequest: <EoiPage />,
    ddq: <DdqPage />,
    sitevisit: <SiteVisitationPage />,
    costanalysis: <CostAnalysis />,
    agreement: <Agreement />,
    customermanager: <CustomerManager />,
  };

  return (
    <div className="flex justify-end gap-[6px]">
      <Link to={`/admin/records/customer/${customerId}`}>
        <div className="flex justify-center items-center border-2 h-[32px] w-[32px] rounded-[50%]">
          <ArrowBack color="success" style={{ fontSize: 'medium' }} />
        </div>
      </Link>
      <TabLayout
        title={title} // Dynamically set title
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
  );
};

export default AdminCustomerPageLayout;

