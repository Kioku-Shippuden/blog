import React, { useEffect, useState } from 'react'
import { useAlert } from '../../hook/useAlert';
import './style/NotificationPopup.scss'

const calculateTimeDifference = (dateTimeString) => {
    const now = new Date();
    const pastDate = new Date(dateTimeString);
  
    const timeDifference = now - pastDate;
  
    // Calculate time units
    const milliseconds = timeDifference;
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(weeks / 52);
  
    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''}`;
    } else if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? 's' : ''}`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
        return `${seconds} second${seconds > 1 ? 's' : ''}`;
    }
}
  
const NotificationElement = (data) => (
    <div className='notification-element'>
        <div className='image'>
            <img src='/account-logo.png' alt='' />
        </div>
        <div className='information'>
            <div className='main-infor'>
                <p>{data.notifyMessage}</p>
            </div>
            <div className='sub-infor'>
                <p>{calculateTimeDifference(data.updatedAt)} ago</p>
            </div>
        </div>
        <div className='footer'>
            <div className='accept btn'>
                <p>Accpet</p>
            </div>
            <div className='reject btn'>
                <p>Reject</p>
            </div>
        </div>
    </div>
);

function NotificationPopup() {
    const {notificationState} = useAlert();
    const [currentNotification, setCurrentNotification] = useState([]);

    useEffect(() => {
        setCurrentNotification(notificationState);
    }, [notificationState])
    
    return (
        <div className='notification-popup'>
            <div className='notification-header title-text'>
                <p>Notifications</p>
            </div>
        <div className='notification-body'>
            {
                currentNotification.length > 0 &&
                currentNotification.map((data, index) => (
                    <NotificationElement key={index} {...data} />
                ))
            }
        </div>
    </div>
  )
}

export default NotificationPopup