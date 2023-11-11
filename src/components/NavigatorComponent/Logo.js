import React from 'react'
import './style/Logo.scss';
function Logo(props) {
  const { navigateHome, useProfile} = props;
  return (
    <div className='logo-component' aria-hidden='true' onClick={navigateHome}>
      <img src={(useProfile !== null && useProfile.AvatarUrl !== null) ? useProfile.AvatarUrl : '/account-logo.png'} alt='' />
    </div>
  )
}

export default Logo