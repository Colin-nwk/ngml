import { Modal } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import NotificationContents from './NotificationContents';


/**
 * Props interface for the Notification component
 */
interface NotificationProps {
    count?: number;
    headerTitle?: string;
    notifications?: {
        title: string;
        date: string;
        content: string;
    }[];
    onClick?: () => void;
    renderIcon?: () => JSX.Element;

}


/**
 * Notification component displays notification icon with count and notifications when clicked.
 * @param {NotificationProps} props - Props for the Notification component
 * @returns {JSX.Element} JSX representation of the Notification component
 */

const Notification: React.FC<NotificationProps> = ({
    count,
    headerTitle,
    notifications = [],
    onClick,
    renderIcon,

}) => {

    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);


    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };


    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target as Node) &&
                event.target !== notificationRef.current.querySelector('.notification-icon') &&
                !notificationRef.current.contains(event.target as Node)
            ) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleIconClick = () => {
        setIsNotificationOpen((prevIsOpen) => !prevIsOpen);
        if (onClick) {
            onClick();
        }
    };

    return (
        <div ref={notificationRef} data-testid='notification-icon'>
            <div
                className='notification-icon'
                style={{
                    border: isHovering ? '1px solid #005828' : '1px solid #CCD0DC',
                    height: '32px',
                    width: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '100%',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease-in-out',
                    backgroundColor: isNotificationOpen ? '#D2F69E' : 'transparent',
                }}
                onClick={handleIconClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {renderIcon && renderIcon()}
                {notifications && notifications.length > 0 && (
                    <div>
                        <span className='notification-count'>{count}</span>
                    </div>
                )}
            </div>

            {isNotificationOpen && notifications && notifications.length > 0 && (
                <Modal
                    open={isNotificationOpen}
                    onClose={() => setIsNotificationOpen(false)}
                    aria-labelledby="notification-modal-title"
                    aria-describedby="notification-modal-description"
                    style={{
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent: 'flex-end',
                        overflow: 'visible',
                    }}
                >
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        transform: 'translateX(0)',
                        margin: '20px',
                    }}>
                        <NotificationContents
                            headerTitle={headerTitle}
                            notifications={notifications}
                            onClose={() => setIsNotificationOpen(false)}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
};


export default Notification;
