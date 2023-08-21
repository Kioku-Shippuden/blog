import React, { useEffect } from 'react';
import './style/PublishPost.scss';
import { callPostApiWithoutToken } from '../../helpers/request';

function PublishPost(props) {
  const {content} = props;

  const onPublish = async () => {
    if (content === '') return;
    try {
			const apiUrl = 'http://localhost:3000/v1/api/post/publish';
			const reponse = await callPostApiWithoutToken(apiUrl, {
				"postTitle": "Vu Anh Khoa",
        "postStatus": "publish",
        "postPermit": "private",
        "postCategory": "tech",
        "postContent": content
			});
      if (reponse.status === 200) {
        
      }
		} catch (err) {
			throw(err)
		}
  }

  return (
    <div className='publish-post-component'>
      <div className='publish-button tag-text' onClick={onPublish}>Publish</div>
    </div>
  )
}

export default PublishPost