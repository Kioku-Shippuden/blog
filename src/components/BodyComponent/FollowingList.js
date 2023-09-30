import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './style/FollowingList.scss'


function FollowingList() {
  return (
    <div className='following-list-component'>
        <div className='avatar'>
            <img src='/account-logo.png' alt='' />
        </div>
        <div className='username content-text'>
            <p>Lubomir Franko</p>
        </div>
        <div className='more'>
            <MoreHorizIcon />
        </div>
    </div>
  )
}

export default FollowingList