import React from 'react'
import { callPostApiWithoutToken } from '../../helpers/request';

const apiDomain = process.env.REACT_APP_API_DOMAIN

function NotificationElement(props) {
    const {data} = props;

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
            {
                data.typeNotify === "friendRequest" &&
                <div className='footer'>
                    <div className='accept btn' onClick={ () => {
                        answereRequest(data, 'Accepted')
                    }}>
                        <p>Accpet</p>
                    </div>
                    <div className='reject btn' onClick={ () => {
                        answereRequest(data, 'Rejected')
                    }}>
                        <p>Reject</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default NotificationElement