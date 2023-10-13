import React, { useState, useEffect, Fragment } from 'react'
import './style/RecommendFollower.scss';
import { callPostApiWithoutToken } from '../../helpers/request';
const apiDomain = process.env.REACT_APP_API_DOMAIN

function RecommendFollower(props) {
  const {data, updateRecommendList} = props;
  const [recommendUser, setRecommendUser] = useState(null);

  useEffect(() => {
    handleRecommendUser(data)
  }, [data]);

  const handleRecommendUser = (data) => {
    let userAvatar = data.avatar || '/account-logo.png';
    let userName = data.userName  || 'Ammonius';
    let userId = data.userId
    let bio = data.bio || "Nothing to descrip this person"
    
    let userInfo = {
      userAvatar,
      userName,
      userId,
      bio}
    setRecommendUser(userInfo)
  }

  const makeRequestFollow = async () => {
    console.log('following request')
    if(!recommendUser)
    {
      console.error(`recommendUser does not exist`)
      return
    }
    const apiUrl = `${apiDomain}/v1/api/user/friend_request/${recommendUser.userId}`
    await callPostApiWithoutToken(apiUrl);
    updateRecommendList()
  }

  return (
    <div className='recomment-follower-component'>
    {
      recommendUser !== null &&
      <Fragment>
          <div className='image-follower' aria-hidden='true'>
            <img src={recommendUser.userAvatar} alt='' />
          </div>
          <div className='information-follower'>
            <div className='name-follower sub-title-text'>{recommendUser.userName}</div>
            <div className='summary-follower content-text'>{recommendUser.bio}</div>
          </div>
          <div className='add-follow-component'>
            <div className='button-follow tag-text' onClick={() => {
              makeRequestFollow();
            }}>
              Follow
            </div>
          </div>
      </Fragment>
    }
    </div>
  )
}

export default RecommendFollower