import React, { useState } from 'react';
import { useAuth } from '../../hook/useAuthentication';
import { useNavigate } from 'react-router';
import { callGetApiWithoutToken } from '../../helpers/request';
import './style/ProfilePopup.scss';

const apiDomain = process.env.REACT_APP_API_DOMAIN;


function ProfilePopup(props) {
    const navigate = useNavigate();
    const {logoutUser} = useAuth();

    const onSubmit = async () => {
		logoutUser();
	}

    const getUserProfile = async () => {
        const apiUrl = `${apiDomain}/v1/api/user/myProfile`;
        const reponse = await callGetApiWithoutToken(apiUrl);
        navigate(`/user-page/${reponse.metaData.userId}`)
    }

    return (
        <div className='manage-profile'>
            {/* Profile */}
            <div className='group-options content-text' onClick={getUserProfile}>
                <div className='icon'>
                    <i class="far fa-user"></i>
                </div>
            <div className='title'>
                <span>Profile</span>
            </div>
            </div>
            {/* Library */}
            <div className='group-options content-text'>
                <div className='icon'>
                    <i class="fal fa-bookmark"></i>
                </div>
                <div className='title'>
                    <span>Library</span>
                </div>
            </div>
            {/* Stories */}
            <div className='group-options content-text'>
                <div className='icon'>
                    <i class="fal fa-book"></i>
                </div>
                <div className='title'>
                    <span>Stories</span>
                </div>
            </div>
            {/* Divider */}
            <hr></hr>
            {/* Sign out */}
            <div className='group-options content-text'>
                <div className='icon'>
                    <i class="fal fa-sign-out-alt"></i>
                </div>
                <div className='title' onClick={onSubmit}>
                    <span>Sign out</span>
                </div>
            </div>
        </div>
    )
}

export default ProfilePopup