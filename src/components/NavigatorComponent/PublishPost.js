import React, { useEffect } from 'react';
import './style/PublishPost.scss';
import { callPostApiWithoutToken } from '../../helpers/request';

function PublishPost(props) {
  const {content, setIsPublish} = props;

  const onPublish = async () => {
    setIsPublish(true);
  }

  return (
    <div className='publish-post-component'>
      <div className='publish-button tag-text' onClick={onPublish}>Publish</div>
    </div>
  )
}

export default PublishPost