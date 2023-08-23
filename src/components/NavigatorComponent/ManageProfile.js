import React from 'react';
import './style/ManageProfile.scss';
import { useAuth } from '../../hook/useAuthentication';

function ManageProfile() {
  const {logoutUser} = useAuth()

  const onSubmit = async () => {
		logoutUser();
	}

  return (
    <div className='manage-profile-component' aria-hidden='true' onClick={onSubmit}>
      <div className='avatar'>
        <img src='/account-logo.png' alt='' />
      </div>
      <div className='icon'>
        <i className='fal fa-chevron-down'></i>
      </div>
    </div>
  )
}

export default ManageProfile