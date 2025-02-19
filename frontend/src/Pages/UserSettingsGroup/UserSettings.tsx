// import { useParams } from 'react-router-dom';
// import { useGetCustomerByIdQuery } from '@/Redux/Features/Customer/customerService';
import { TabLayout } from '../../Components/index';
import { ArrowBack } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import DepartmentGroup from './DepartmentGroup'
import Designation from './DesignationGroup'
import LocationGroup from './LocationGroup'
import Unit from './Unit'

/**
 * UserSettings component displays a settings page where users can navigate through different tabs,
 * such as Unit, Location, Designation, and Department Group.
 * 
 * The component renders a back button to return to the admin settings page and includes a tab layout
 * for the different settings groups. Each tab's content is rendered dynamically based on the selected tab.
 *
 * @component
 * @returns {JSX.Element} The rendered user settings component.
 *
 * @example
 * // To render the UserSettings component:
 * <UserSettings />
 *
 */

const UserSettings = () => {

    // const { customerId } = useParams<{ customerId: string }>();

    // const { data: customer, error, isLoading } = useGetCustomerByIdQuery(Number(customerId));
  
    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error loading customer data.</div>;
  
    const tablist = [
      { name: 'unit', ref: 'unit' },
      { name: 'location', ref: 'location' },
      { name: 'designation', ref: 'designation' },
      { name: 'department group', ref: 'departmentgroup' },
    ];
  
    const tabContent = {
      unit: <Unit />,
      location: <LocationGroup />,
      designation: <Designation />,
      departmentgroup: <DepartmentGroup />,
    };
    return (
        <div className="">
            <Link to={'/admin/settings'}>
                <div className='flex justify-center items-center border-2 h-[32px] w-[32px] rounded-[50%]'>
                    <ArrowBack color="success" style={{ fontSize: 'medium' }} />
                </div>
            </Link>
             <div className='flex justify-end gap-[6px]'>
      <TabLayout
        title=""
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
        </div>
    )
}

export default UserSettings