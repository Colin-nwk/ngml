import { ArrowBack } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';
import { TabLayout } from '../../Components/index';
import SupplierInformation from './SupplierInformation';
import SupplierRegistrationUpload from '../SupplierRegistrationUpload/SupplierRegistrationUpload';


/**
 * SupplierRegistrationLayout component represents the layout for supplier registration.
 * It includes tabs for supplier information and uploads.
 * @component
 * @example
 * // Usage:
 * <SupplierRegistrationLayout />
 */
const SupplierRegistrationLayout: React.FC = () => {

    /**
     * List of tabs for the supplier registration layout.
     * Each tab has a name, reference, and optionally a sublist.
     * @type {Array<{ name: string, ref: string, sublist?: Array<{ name: string, ref: string }> }>}
     */

    const tablist = [
        {
            name: '01 Supplier Information',
            ref: 'supplierinformation',
            sublist: [
                {
                    name: 'Personal Details',
                    ref: 'personaldetails'
                },
                {
                    name: 'Agreement Details',
                    ref: 'agreementdetails'
                }
            ]
           
        },
        {
            name: '02 Uploads',
            ref: 'uploads',
          
        },
       
       
    ]

   /**
     * Object containing the content or pages for each tab.
     * @type {{ [key: string]: JSX.Element }}
     */
    const tabContent: { [key: string]: JSX.Element; } = {   
        supplierinformation: <SupplierInformation/>,
        uploads: <SupplierRegistrationUpload/>,
        subdetail1: <p>tyfyufuyfifyt</p>
    };

    return (
        <div className='flex justify-end gap-[6px] ' >
            <Link to={'/admin/records/suppliers'}>
                <div className='flex justify-center items-center border-2 h-[32px] w-[32px] rounded-[50%]'>
                    <ArrowBack color="success" style={{ fontSize: 'medium' }} />
                </div>
            </Link>
            <TabLayout
                title="Supplier Registration"
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

export default SupplierRegistrationLayout;