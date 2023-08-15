import React from 'react'
import './style/Logo.scss';
function Logo(props) {
  const {navigateHome} = props;
  return (
    <div className='logo-component' aria-hidden='true' onClick={navigateHome}>
      <img src='/account-logo.png' alt='' />
    </div>
  )
}

export default Logo