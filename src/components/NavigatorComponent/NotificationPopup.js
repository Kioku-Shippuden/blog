import React, { useEffect, useState } from 'react'
import { useAlert } from '../../hook/useAlert';
import NotificationElement from './NotificationElement';
import './style/NotificationPopup.scss'

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
                currentNotification.map((data, index) => {
                    return (<NotificationElement key={index} data={data}/>)
                })
            }
        </div>
    </div>
  )
}

export default NotificationPopup;