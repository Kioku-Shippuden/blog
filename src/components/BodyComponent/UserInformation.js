import React from 'react'
import './style/UserInformation.scss'

function UserInformation(props) {
    const {setShowEditProfile} = props

    const editProfile = () => {
        setShowEditProfile(true);
    }
    return (
        <div className='user-information-component'>
            <div className='avatar-component'>
                <img src='/account-logo.png' alt='' />
            </div>
            <div className='title-text'>
                Anh Khoa Vu
            </div>
            <div className='sub-title-text'>
                3 Followers
            </div>
            <div className='content-text btn' onClick={editProfile}>
                Edit Profile
            </div>
        </div>
    )
}

export default UserInformation