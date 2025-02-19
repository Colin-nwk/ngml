import AdminCustomerList from '@/Pages/AdminCustomerList/AdminCustomerList';
import AdminHomePage from '@/Pages/AdminHomePage/AdminHomePage';
import AssignTask from '@/Pages/AssignTask/AssignTask';
import BidPage from '@/Pages/BidPage/BidPage';
import BillingHistory from '@/Pages/BillingHistory/BillingHistory';
import Complaints from '@/Pages/Complaints/Complaints';
import ConnectProjectPage from '@/Pages/ConnectProjectPage/ConnectProjectPage';
import { default as AdminCustomerPageLayout, default as CustomerPageLayout } from '@/Pages/CustomerDetail/CustomerPageLayout';
import CustomerLocation from '@/Pages/CustomerLocation/CustomerLocation';
import CustomerNewRegistration from '@/Pages/CustomerNewRegistration/CustomerNewRegistration';
import CustomerDailyVolumns from '@/Pages/Dailyvolumns/CustomerDailyVolumns';
import FormBuilderPage from '@/Pages/FormBuilderCroup/FormBuilderPage';
import HeadofUnits from '@/Pages/HeadofUnits/HeadofUnits';
import InvoiceLayoutPage from '@/Pages/InvoicePage.tsx/InvoiceLayoutPage';
import InvoicePage from '@/Pages/InvoicePage.tsx/InvoicePage';
import OperationPage from '@/Pages/Manager/OperationPage/OperationPage';
import ProcessFlowGenerator from '@/Pages/ProcessFlowGroup/ProcessFlowGenerator';
import RequestPage from '@/Pages/RequestPage/RequestPage';
import RouteBuilder from '@/Pages/RouteBuilder/RouteBuilder';
import SettingsPage from '@/Pages/SettingsPage/SettingsPage';
import SiteVisitPage from '@/Pages/SiteVisitPage/SiteVisitPage';
import SupplierOverviewLayout from '@/Pages/SupplierOverview/SupplierOverviewLayout';
import SupplierRegistrationLayout from '@/Pages/SupplierRegistration/SupplierRegistrationLayout';
import SuppliersPage from '@/Pages/SuppliersPage/SuppliersPage';
import TenderPage from '@/Pages/TenderPage/TenderPage';
import UserSettings from '@/Pages/UserSettingsGroup/UserSettings';

import { RouteObject } from 'react-router-dom';


export const admin: RouteObject[] = [
    {

        path: '',
        element: <AdminHomePage />,
        index: true

    },
    {
        path: '/admin/manager/operation',
        element: <OperationPage />,

    },
    {
        path: '/admin/records/customer',
        element: <AdminCustomerList />,

    },
    {

        path: '/admin/records/customer/:customerId/:projectId/:tabId',
        element: <CustomerPageLayout />,

    },
    {
        path: '/admin/records/customernewregistration',
        element: <CustomerNewRegistration />,

    },
    {
        path: '/admin/records/suppliers',
        element: <SuppliersPage />,

    },
    {
        path: '/admin/records/supplierregistration',
        element: <SupplierRegistrationLayout />,

    },
    {

        path: '/admin/records/supplier/:supplierId/:projectId/:tabId',
        element: <SupplierOverviewLayout />,

    },
    {
        path: '/admin/records/requestpage',
        element: <RequestPage />,

    },
    {
        path: '/admin/records/billinghistory/:customerId/:siteId',
        element: <BillingHistory />,

    },
    {
        path: '/admin/records/complaints',
        element: <Complaints />,

    },
    {
        path: '/admin/records/dailyvolumns/:customerId/:siteId',
        // element: <Dailyvolumns />,
        element: <CustomerDailyVolumns />

    },
    {
        path: '/admin/records/invoice',
        element: <InvoicePage />,

    },
    {
        path: '/admin/records/invoice/:customerId/:locationId',
        element: <InvoiceLayoutPage />,

    },
    {
        path: '/admin/records/requestpage',
        element: <RequestPage />,

    },
    {
        path: '/admin/records/customer/:customerId',
        element: <CustomerLocation />,

    },
    {
        path: '/admin/records/customer/:tabId',
        element: <AdminCustomerPageLayout />,

    },
    {
        path: '/admin/records/sitevisit',
        element: <SiteVisitPage />,

    },
    {

        path: '/admin/records/connectprojectpage',
        element: <ConnectProjectPage />,

    },
    {
        path: '/admin/records/bidspage',
        element: <BidPage />,

    },
    {
        path: '/admin/records/bidspage/opentender',
        element: <TenderPage />,

    },
    {
        path: '/admin/settings',
        element: <SettingsPage />,

    },
    {
        path: '/admin/settings/formbuilder',
        element: <FormBuilderPage />,

    },

    {
        path: '/admin/settings/processflow',
        element: <ProcessFlowGenerator />
    },
    {
        path: '/admin/settings/routebuilder',
        element: <RouteBuilder />
    },
    {
        path: '/admin/settings/assigntasks',
        element: <AssignTask />
    },
    {
        path: '/admin/settings/usersettings',
        element: <UserSettings />
    },
    {
        path: '/admin/settings/hou',
        element: <HeadofUnits />
    },

]

export const getRouteLists = (): { [key: string]: string } => {
    return admin.reduce((acc, route) => {
        if (route.path) {
            const label = route.path.replace(/^\//, '').replace(/\//g, ' ') || 'home';
            acc[label] = route.path;
        }
        return acc;
    }, {} as { [key: string]: string });
};

