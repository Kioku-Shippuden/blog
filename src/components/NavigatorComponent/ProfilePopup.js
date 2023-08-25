import React from 'react';
import { useAuth } from '../../hook/useAuthentication';
import './style/ProfilePopup.scss';

function ProfilePopup() {
    const {logoutUser} = useAuth();

    const onSubmit = async () => {
		logoutUser();
	}

    return (
        <div className='manage-profile'>
            {/* Profile */}
            <div className='group-options content-text'>
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