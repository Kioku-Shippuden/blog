import React, { useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import './style/ContentList.scss';

function ContentList(props) {
  const { data } = props;

  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    handlePostInfo(data)
  }, [data]);

  const navigateHome = (postId) => {
    navigate('/read-story/' + postId);
  } 

  const handlePostInfo = (data) => {
    let userAvatar = data.author.avatar ? data.author.avatar : '/account-logo.png';
    let userName = data.author.userName ? data.author.userName : 'Ammonius';
    let postId = data.postData.postId ;
    let postTitle = data.postData.title;
    let postSummarize = data.postData.summarize;
    let postThumbnail = data.postData.thumbnail !== null ?  data.postData.thumbnail : '/background.jpeg';
    let postCreatedTime = new Date(data.postData.created_at);
    let postUpdateTime = new Date(data.postData.updated_at);


    let postInfor = {
      userAvatar, userName, postId, postTitle, postSummarize, postThumbnail, postCreatedTime, postUpdateTime
    }
    setPostInfo(postInfor)
  }
  
  return (
    <div className='content-list-component'>
      {
        postInfo !== null &&
        <Fragment>
          <div className='information-content'>
            <div className='author-content'>
              <img src={postInfo.userAvatar} alt='' />
              <span className='title-text'>
                {postInfo.userName}
              </span>
            </div>
            <div className='sub-title-text' onClick={() => {navigateHome(postInfo.postId)}}>
              {postInfo.postTitle}
            </div>
            <div className='summary-content content-text' onClick={() => {navigateHome(postInfo.postId)}}>
              {postInfo.postSummarize}
            </div>
            <div className='footer-content'>
              <div className='other-information tag-text'>
                <div className='tag tag-text'>GIS</div>
                <div className='tag-text'>{postInfo.postUpdateTime.toLocaleString('default', { month: 'short', day: 'numeric' }) }</div>
              </div>
              <div className='save-content'>
                <div className='icon-save'>
                  <i class="far fa-bookmark"></i>
                </div>
              </div>
            </div>
          </div>
          <div className='image-contnent'>
            <img src={postInfo.postThumbnail} alt='' />
          </div>
        </Fragment>
      
      }
    </div>
  )
}

export default ContentList