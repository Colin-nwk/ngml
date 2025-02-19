import React from 'react';
import images from '../../assets/index';
import Button from '../ButtonComponent/Button';

/**
 * Props interface for the NotificationContents component
 */
interface NotificationProps {
    headerTitle?: string;
    notifications: {
        title: string;
        date: string;
        content: string;
    }[];
    onClose: () => void;

}


/**
 * NotificationContents component displays a list of notifications.
 * @param {NotificationContentsProps} props - Props for the NotificationContents component
 * @returns {JSX.Element} JSX representation of the NotificationContents component
 */
const NotificationContents: React.FC<NotificationProps> = ({ notifications, headerTitle, onClose }) => {


    return (
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '300px', borderRadius: '14px' }} >
            <div style={{ backgroundColor: '#F6FDEC', height: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                <header style={{ color: '#49526A', fontSize: '20px', fontWeight: '700', lineHeight: '25.1px' }}>{headerTitle}</header>
                <Button
                    type="tertiary"
                    label="Cancel"
                    width="102px"
                    height="32px"
                    radius="32px"
                    color="#49526A"
                    fontWeight="400"
                    lineHeight="24px"
                    icon={<div><img src={images.cancelIcon} alt="send Icon" /></div>}
                    columnGap="10px"
                    action={onClose}
                />

            </div>
            <div style={{ height: 'screen', display: 'flex', flexDirection: 'column', padding: '10px' }}>
                {notifications.map((notification, index) => (
                    <div key={index} style={{ border: '1px solid #E2E4EB', height: '58px', marginBottom: '10px', rowGap: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8px', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ backgroundColor: '#D2F69E', color: '#49526A', fontSize: '12px', fontWeight: '700', padding: '5px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> {notification.title}</div>
                            <div style={{ color: '#828DA9', fontSize: '10px', fontWeight: '500', }}> {notification.date}</div>
                        </div>
                        <div>
                            <div style={{ color: '#49526A', fontSize: '14px', fontWeight: '600', lineHeight: '14px' }}> {notification.content}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationContents;
