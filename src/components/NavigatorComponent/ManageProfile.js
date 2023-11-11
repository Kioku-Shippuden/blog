import React from 'react';
import './style/ManageProfile.scss';

function ManageProfile(props) {
  const {onClickManageProfileBtn, useProfile} = props;

  return (
    <div className='manage-profile-component' aria-hidden='true' onClick={onClickManageProfileBtn}>
      <div className='avatar'>
        <img src={(useProfile !== null && useProfile.AvatarUrl !== null) ? useProfile.AvatarUrl : '/account-logo.png'} alt='' />
      </div>
      <div className='icon'>
        <i className='fal fa-chevron-down'></i>
      </div>
    </div>
  )
}

export default ManageProfile