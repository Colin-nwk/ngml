/* eslint-disable @typescript-eslint/no-explicit-any */
import images from '@/assets';
import {
  DensityMedium,
  KeyboardArrowDown,
  KeyboardArrowLeft
} from '@mui/icons-material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { selectCurrentUser } from '../../Redux/Features/Auth/authSlice';
import { useAppSelector } from '../../Redux/hooks';

/**
 * Navigation bar item.
 *
 * @typedef {Object} INavigationBar
 * @property {'primary' | 'secondary'} [type] - Type of navigation bar.
 * @property {number} id - Unique identifier for the navigation bar item.
 * @property {string} [name] - Name of the navigation bar item.
 * @property {string} [to] - URL to navigate to.
 * @property {string} [icon] - Icon for the navigation bar item.
 * @property {INavigationBar[]} [subMenu] - Submenu items for the navigation bar.
 */
interface INavigationBar {
  type?: 'primary' | 'secondary';
  id: number;
  name?: string;
  to?: string;
  icon?: string;
  subMenu?: INavigationBar[];
}

export interface NavigationBarProps {
  Navigationlinks: any;
  sliceLength?: number;
  isNavigationBarVisible: boolean;
  toggleNavigationBar: () => void;
}

/**
 * User information.
 *
 * @typeof {Object} IUserInfo
 * @property {string} name - User's name.
 * @property {string} designation - User's designation.
 * @property {string} avatar - URL of the user's avatar.
 */
interface IUserType {
  name: string;
  designation: string;
  avatar: string;
}

/**
 * UserType component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {IUserInfo} props.userInfo - Information about the user.
 * @param {() => void} props.handleToggleNavigationBar - Function to handle toggling the navigation bar.
 * @returns {ReactElement} React component representing a user type.
 */

const capitalizeName = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const UserType: React.FC<{
  userInfo: IUserType;
  handleToggleNavigationBar: () => void;

}> = ({ userInfo, handleToggleNavigationBar }) => {
  return (
    <div className='w-[100%]'>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          flexDirection: 'row',
          borderRadius: '30px',
          padding: '3px 6px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%'
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <div>
              <img
                src={userInfo.avatar}
                alt="happyavatar"
                style={{ width: '32px', height: '32px' }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div
                style={{
                  color: '#050505',
                  fontSize: '12px',
                  fontWeight: '600',
                  lineHeight: '12px',
                  marginLeft: '8px'
                }}
              >
                {capitalizeName(userInfo.name)}
              </div>
              <div
                style={{
                  color: '#828DA9',
                  fontSize: '10px',
                  fontWeight: '600',
                  lineHeight: '10px',
                  marginLeft: '8px'
                }}
                className="uppercase"
              >
                {userInfo.designation}
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                backgroundColor: '#e8eaed',
                height: '24px',
                width: '24px',
                borderRadius: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onClick={handleToggleNavigationBar}
            >
              <KeyboardArrowLeft
                style={{ color: '#CCD0DC', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * NavigationBarItem component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {INavigationBar} props.item - Navigation bar item.
 * @param {boolean} props.isActive - Indicates whether the item is active.
 * @param {() => void} props.onClick - Function to handle item click.
 * @returns {ReactElement} React component representing a navigation bar item.
 */

const NavigationBarItem: React.FC<{
  item: INavigationBar;
  isActive: boolean;
  onClick: () => void;

}> = ({ item, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);
  const [hoveredSubMenuItemId, setHoveredSubMenuItemId] = useState<number | null>(null);
  const [activeSubMenuItemId, setActiveSubMenuItemId] = useState<number | null>(null);



  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleSubMenuToggle = () => {
    setSubMenuVisible(!isSubMenuVisible);
  };


  const backgroundColor = isHovered
    ? '#F6FDEC'
    : isActive
      ? item.type === 'primary'
        ? '#F6FDEC'
        : item.type === 'secondary'
          ? '#F9FAFB'
          : '#F9FAFB'
      : 'white';


  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex',
        columnGap: '16px',
        padding: '9px',
        borderRadius: '8px',
        backgroundColor: backgroundColor,
        width: '100%',
      }}
      className="flex flex-col transition ease-in-out hover:cursor-pointer hover:translate-x-1 "
    >
      <Link to={item.to ?? '#'}>
        <div
          className="flex gap-[10px]"
          style={{ alignItems: 'center', justifyContent: 'start', }}
        >
          <div
            style={{
              height: '24px',
              width: '24px',
              backgroundColor: isActive ? '#D2F69E' : 'transparent',
              borderRadius: isActive ? '4px' : '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span>
              <img
                style={{ height: '16px', width: '16px' }}
                src={item.icon}
                alt={item.name}
              />
            </span>
          </div>
          <div
            className="flex gap-[70px]"
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div>
              <span
                style={{
                  color: isActive ? '#050505' : '#49526A',
                  fontSize: '14px',
                  lineHeight: '12px'
                }}
              >
                {item.name}
              </span>
            </div>

            {item.subMenu && (
              <div
                onClick={handleSubMenuToggle}
                style={{ cursor: 'pointer' }}>
                {isSubMenuVisible ? (
                  <KeyboardArrowLeft style={{ color: '#CCD0DC' }} />
                ) : (
                  <KeyboardArrowDown style={{ color: '#CCD0DC' }} />
                )}
              </div>
            )}
          </div>
        </div>
      </Link>


      {isSubMenuVisible &&
        item.subMenu &&
        item.subMenu?.map((subItem) => (
          <Link to={subItem.to ?? '#'} key={subItem.id}>
            <div
              onClick={() => setActiveSubMenuItemId(subItem.id)}
              onMouseEnter={() => setHoveredSubMenuItemId(subItem.id)}
              onMouseLeave={() => setHoveredSubMenuItemId(null)}
              style={{
                background: hoveredSubMenuItemId === subItem.id ? '#F6FDEC' : 'white',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '9px',
                borderRadius: activeSubMenuItemId === subItem.id ? '10px' : '0px',
              }}
              className="gap-[10px] transition ease-in-out hover:cursor-pointer hover:translate-x-1 "
            >
              <span
                style={{
                  height: '24px',
                  width: '24px',
                  backgroundColor:
                    activeSubMenuItemId === subItem.id
                      ? '#D2F69E'
                      : 'transparent',
                  borderRadius: activeSubMenuItemId === subItem.id ? '4px' : '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img
                  style={{ height: '16px', width: '16px' }}
                  src={subItem.icon}
                  alt={subItem.name}
                />
              </span>
              <span
                style={{
                  color:
                    activeSubMenuItemId === subItem.id ? '#050505' : '#49526A',
                  fontSize: '14px',
                  lineHeight: '12px'
                }}
              >
                {subItem.name}
              </span>
            </div>
          </Link>

        ))}
    </div>
  );
};

/**
 * NavigationBar component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {INavigationBar[]} props.Navigationlinks - Array of navigation bar items.
 * @returns {ReactElement} React component representing a navigation bar.
 */
const NavigationBar: React.FC<NavigationBarProps> = ({
  Navigationlinks,
  sliceLength = 0,
  isNavigationBarVisible,
  toggleNavigationBar,

}) => {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const currentUser = useAppSelector(selectCurrentUser);

  const handleItemClick = (id: number) => {
    setActiveItemId(id);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userInfo = currentUser
    ? {
      name: currentUser.name,
      designation: '',
      avatar: images.avatarLogo,
    }
    : {
      name: 'Unknown',
      designation: 'Unknown User',
      avatar: images.avatarLogo,
    };


  const effectiveSliceLength =
    sliceLength > 0 ? sliceLength : Navigationlinks.length;

  return (
    <>
      {isNavigationBarVisible ? (
        <div
          style={{
            padding: '18px',
            width: '255px',
          }}
        >
          <div>
            <UserType
              userInfo={userInfo}
              handleToggleNavigationBar={toggleNavigationBar}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '14px',
              background: '#FFFFFF',
              width: '100%',
              marginTop: '16px',
              padding: '8px'
            }}
          >
            {Navigationlinks.slice(0, effectiveSliceLength).map((item: INavigationBar) => (
              <NavigationBarItem
                key={item.id}
                item={item}
                isActive={activeItemId === item.id}
                onClick={() => handleItemClick(item.id)}
              />
            ))}
          </div>

          {sliceLength > 0 && sliceLength < Navigationlinks.length && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '14px',
                background: 'white',
                width: '225px',
                marginTop: '16px',
                padding: '8px',
              }}
            >
              {Navigationlinks.slice(
                effectiveSliceLength,
                Navigationlinks.length
              ).map((item: INavigationBar) => (
                <NavigationBarItem
                  key={item.id}
                  item={item}
                  isActive={activeItemId === item.id}
                  onClick={() => handleItemClick(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      )
        : (
          <div
            style={{
              border: '2px solid #e8eaed',
              height: '24px',
              width: '24px',
              borderRadius: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              margin: '10px'
            }}
            className="cursor-pointer"
            onClick={toggleNavigationBar}
          >
            <DensityMedium
              style={{ color: '#CCD0DC', height: '18px', width: '18px' }}
            />
          </div>
        )

      }



    </>
  );
};

export default NavigationBar;