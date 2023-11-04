import React, { useEffect } from 'react';
import './style/PublishPost.scss';

function PublishPost(props) {
  const { setShowPublishPopup, turnOffPopup, onSaveEdit } = props;

  const showPublishPopup = async () => {
    onSaveEdit()
    turnOffPopup();
    setShowPublishPopup(true);
  }

  return (
    <div className='publish-post-component'>
      <div className='publish-button tag-text' onClick={showPublishPopup}>Publish</div>
    </div>
  )
}

export default PublishPost