import React from 'react';
import './style/ManageProfile.scss';

function ManageProfile(props) {
  const {showProfilePopup, setShowProfilePopup} = props;

  const handleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup);
  }
  return (
    <div className='manage-profile-component' aria-hidden='true' onClick={handleProfilePopup}>
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