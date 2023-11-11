import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from '../../hook/useAlert';
import NotificationElement from './NotificationElement';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './style/NotificationPopup.scss'

const MIN_NOTIFICATION_SHOW = 0;
const MAX_NOTIFICATION_SHOW = 9;

function NotificationPopup() {
    const {notificationState, updateCurrentStatus, removeNotify} = useAlert();
    const [showAll, setShowAll] = useState(false)
    const [currentNotification, setCurrentNotification] = useState([]);

    const setStateShowAll = (option) => {
        setShowAll(option);
    }

    useEffect(() => {
        setCurrentNotification(notificationState);
    }, [notificationState])
    
    return (
        <div className='notification-popup'>
            <div className='notification-header title-text'>
                <p>Notifications</p>
            </div>
            {
                showAll === false
                ?
                <Fragment>
                    <div className='notification-body'>
                        {
                            currentNotification.length === 0 &&
                            <div className='content-text'>No Notifications to display</div>
                        }
                        {
                            currentNotification.length > MIN_NOTIFICATION_SHOW &&
                            currentNotification.slice(MIN_NOTIFICATION_SHOW, MAX_NOTIFICATION_SHOW).map((data, index) => {
                                return (
                                    <NotificationElement 
                                        key={index} 
                                        data={data} 
                                        removeNotify = {removeNotify}
                                        updateCurrentStatus={updateCurrentStatus}
                                    />
                                )
                            })
                        }
                        {
                            currentNotification.length > MAX_NOTIFICATION_SHOW &&
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <ExpandMoreIcon onClick={() => {
                                    setStateShowAll(true)
                                }}/>
                            </Box>
                        }
                    </div>
                </Fragment>
                :
                <Fragment>
                    <div className='notification-body'>
                        {  
                            currentNotification.length > MIN_NOTIFICATION_SHOW &&
                            currentNotification.map((data, index) => {
                                return (
                                    <NotificationElement 
                                        key={index} 
                                        data={data} 
                                        removeNotify = {removeNotify}
                                        updateCurrentStatus={updateCurrentStatus}
                                    />
                                )
                            })
                        }
                    </div>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <ExpandLessIcon onClick={() => {
                            setStateShowAll(false)
                        }}/>
                    </Box>
                </Fragment>
            }
        
    </div>
  )
}

export default NotificationPopup;