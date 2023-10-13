import React, { useState, useEffect, Fragment } from 'react'
import { callPostApiWithoutToken, callPutApiWithoutToken } from '../../helpers/request';
// import { useAlert } from '../../hook/useAlert';
const apiDomain = process.env.REACT_APP_API_DOMAIN
const UNREADSTYLE = {
    backgroundColor: 'gray'
};

const READSTYLE = {

};

// FIXME
// THis component has some issue currently
// The state was not stored when turn of the pop up, lead to when read the notify done but still
// gray if turn on the notify dialog again

function NotificationElement(props) {
    const {data} = props;
    const [notifyData, setNotifyData] = useState(null)
    const [readStatus, setReadStatus] = useState(false)

    const handlingNotifyData = (data) => {
        setNotifyData(data)
    }
    const readNotify = async () => {
        if(readStatus)
        {
            console.warn("This notify have read before")
            return
        }
        try {
            const apiUrl = `${apiDomain}/v1/api/user/readNotify/${notifyData._id}`
            await callPutApiWithoutToken(apiUrl)
            setReadStatus(true)
        } catch (error) {
            console.error(`Issue when update status read for the notify ${error}`)
        }
    }
    useEffect(() => {
        // This log for tracing FIXME
        console.log('the notify mounted')
        // Specify the cleanup code to run when the component is unmounted
        return () => {
            // This code runs when the component is unmounted
            // You can perform cleanup tasks here
            console.log('Component is unmounted');
        };
    }, []);

    useEffect(() => {
        handlingNotifyData(data)
      }, [data]);
    
    
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

    const answereRequest = async (data, option) => {
        const senderId = data.sender.userId
        try {
            const apiUrl = `${apiDomain}/v1/api/user/answere_request/${senderId}?ans=${option}`;
            await callPostApiWithoutToken(apiUrl);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='notification-element'>
            {   notifyData !== null &&
                <Fragment>
                    <div className='image'>
                        <img src='/account-logo.png' alt='' />
                    </div>
                    <div className='information' style={readStatus? READSTYLE: UNREADSTYLE} onClick={() => {
                        readNotify()
                    }}>
                        <div className='main-infor'>
                            <p>{notifyData.notifyMessage}</p>
                        </div>
                        <div className='sub-infor'>
                            <p>{calculateTimeDifference(notifyData.createdAt)} ago</p>
                        </div>
                    </div>
                    {
                        notifyData.typeNotify === "friendRequest" &&
                        <div className='footer'>
                            <div className='accept btn' onClick={ () => {
                                answereRequest(data, 'Accepted')
                            }}>
                                <p>Accept</p>
                            </div>
                            <div className='reject btn' onClick={ () => {
                                answereRequest(data, 'Rejected')
                            }}>
                                <p>Reject</p>
                            </div>
                        </div>
                    }
                </Fragment>
            }
        </div>
    )
}

export default NotificationElement