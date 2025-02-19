import { PowerSettingsNewOutlined } from '@mui/icons-material';
import images from '../../assets/index';
import { Notification, SearchInput } from '../../Components/index';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/Features/Auth/authSlice';

/**
 * Represents the top navigation bar of the application.
 * It includes the company logo, a search input, and three types of notifications:
 * messages, alerts, and reminders.
 *
 * Each notification type is displayed using the `Notification` component with specific data.
 */
const TopNavigationBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
        dispatch(logout());
    };


    /**
     * Handles the search functionality in the top navigation bar.
     * @param {unknown} query - The search query entered by the user.
     */
    const handleSearch = (query: unknown) => {
        console.log('User searched for:', query);
    };


    return (

        <div className=" w-full flex items-center bg-[#FFFFFF] justify-between px-5 py-3  fixed top-0 left-0 z-50">
            <img src={images.newLogo} alt='nnpc logo' />
            <div className='flex  gap-4 justify-end w-[100%]'>
                <SearchInput
                    onSearch={handleSearch}
                    className="w-28 sm:w-36 md:w-48 lg:w-56 xl:w-1/3"
                />
                <div className='flex gap-4'>
                    <button type='button' onClick={handleLogout}>
                        <span className='sr-only'>logout</span>
                        <Notification
                            renderIcon={() => <div><PowerSettingsNewOutlined style={{ fontSize: 'medium' }} /></div>}
                        />
                    </button>
                </div>
            </div>
        </div>
    )

}
export default TopNavigationBar