import React from 'react'
import './style/NotificationPopup.scss'

const NotificationElement = (data) => (
    <div className='notification-element'>
        <div className='image'>
            <img src='/account-logo.png' alt='' />
        </div>
        <div className='information'>
            <div className='main-infor'>
                <p>hunghoang follow you</p>
            </div>
            <div className='sub-infor'>
                56 hours ago
            </div>
        </div>
    </div>
);

function NotificationPopup() {
  return (
    <div className='notification-popup'>
        <div className='notification-header title-text'>
            <p>Notifications</p>
        </div>
        <div className='notification-body'>
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
            <NotificationElement />
        </div>
    </div>
  )
}

export default NotificationPopup