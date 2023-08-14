import React from 'react'
import './style/RecommendFollower.scss';

function RecommendFollower() {
  return (
    <div className='recomment-follower-component'>
      <div className='image-follower' aria-hidden='true'>
        <img src='/account-logo.png' alt='' />
      </div>
      <div className='information-follower'>
        <div className='name-follower sub-title-text'>Radiant Earth Foundation</div>
        <div className='summary-follower content-text'>Increasing shared understanding of our world ...</div>
      </div>
      <div className='add-follow-component'>
        <div className='button-follow tag-text'>
          Follow
        </div>
      </div>
    </div>
  )
}

export default RecommendFollower