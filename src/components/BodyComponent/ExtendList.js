import React from 'react'
import './style/ExtendList.scss'
function ExtendList() {
  return (
    <div className='extend-list-component'>
        <div className='avatar' aria-hidden='true'>
            <img src='/account-logo.png' alt='' />
        </div>
        <div className='information'>
            <div className='name-follower sub-title-text'>Processing Foundation</div>
            <div className='summary-follower content-text'>The Processing Foundation promotes software literacy within the visual arts, and visual literacy within technology-related fields.</div>
        </div>
        <div className='button'>
            <div className='button-follow tag-text'>
            Follow
            </div>
        </div>
    </div>
  )
}

export default ExtendList