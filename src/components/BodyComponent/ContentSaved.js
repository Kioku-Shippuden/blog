import React from 'react';
import './style/ContentSaved.scss';
function ContentSaved() {
  return (
    <div className='content-saved-component'>
      <div className='author-content'>
        <img src='/account-logo.png' alt='' />
        <span className='title-text'>Kioku</span>
      </div>
      <div className='name-follower sub-title-text'>Build a geospatial dashboard in Python using Greppo</div>
      <div className='estimate-time-component tag-text'>
        Jul 14 . 6 min read
      </div>
    </div>
  )
}

export default ContentSaved