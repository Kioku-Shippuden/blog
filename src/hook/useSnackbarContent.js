import React from 'react'
import './style/useSnackBar.scss'

const SnackbarContent = ({message}) => (
    <div className='infomation-component'>
        <div className='infor-title'>
            <p>Friend Request</p>
        </div>
        <div className='infor-body'>
            <div className='image'>
                <img src='/account-logo.png' alt='' />
            </div>
            <div className='message'>
                <p>{message}</p>
            </div>
        </div>
    </div>
)

export default SnackbarContent